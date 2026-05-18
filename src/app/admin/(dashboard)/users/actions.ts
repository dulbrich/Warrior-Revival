"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/role";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { formDataToObject } from "@/lib/events/schema";

const roleSchema = z.enum(["admin", "contributor"]);

const inviteSchema = z.object({
  email: z.string().email(),
  role: roleSchema
});

const setRoleSchema = z.object({
  id: z.string().uuid(),
  role: roleSchema
});

const deleteSchema = z.object({
  id: z.string().uuid()
});

// Count current admins. Used by setUserRoleAction to refuse the last
// demotion-to-contributor, and by deleteUserAction to refuse the last delete.
async function countAdmins(): Promise<number> {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (error) throw new Error(`Admin count failed: ${error.message}`);
  return data.users.filter((u) => {
    const meta = (u.app_metadata ?? {}) as { role?: string };
    return meta.role === "admin";
  }).length;
}

export async function inviteUserAction(formData: FormData) {
  await requireAdmin();
  const parsed = inviteSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "));
  }
  const admin = createSupabaseAdminClient();
  // inviteUserByEmail sends the magic-link email and creates the user row.
  const { data, error } = await admin.auth.admin.inviteUserByEmail(parsed.data.email);
  if (error) throw new Error(`Invite failed: ${error.message}`);
  const newUser = data.user;
  if (!newUser) throw new Error("Invite succeeded but no user was returned.");
  // Attach the role via a follow-up update — inviteUserByEmail doesn't accept
  // app_metadata directly.
  const { error: roleError } = await admin.auth.admin.updateUserById(newUser.id, {
    app_metadata: { ...(newUser.app_metadata ?? {}), role: parsed.data.role }
  });
  if (roleError) throw new Error(`Role assignment failed: ${roleError.message}`);
  revalidatePath("/admin/users");
}

export async function setUserRoleAction(formData: FormData) {
  const me = await requireAdmin();
  const parsed = setRoleSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "));
  }
  if (parsed.data.id === me.id) {
    throw new Error("You can't change your own role.");
  }
  const admin = createSupabaseAdminClient();
  // If we're demoting an admin, ensure they're not the last one.
  if (parsed.data.role === "contributor") {
    const { data: targetData, error: targetErr } = await admin.auth.admin.getUserById(parsed.data.id);
    if (targetErr) throw new Error(`Lookup failed: ${targetErr.message}`);
    const targetMeta = (targetData.user.app_metadata ?? {}) as { role?: string };
    if (targetMeta.role === "admin") {
      const adminCount = await countAdmins();
      if (adminCount <= 1) {
        throw new Error("Can't demote the last administrator.");
      }
    }
  }
  const { data: existing, error: existingErr } = await admin.auth.admin.getUserById(parsed.data.id);
  if (existingErr) throw new Error(`Lookup failed: ${existingErr.message}`);
  const { error } = await admin.auth.admin.updateUserById(parsed.data.id, {
    app_metadata: { ...(existing.user.app_metadata ?? {}), role: parsed.data.role }
  });
  if (error) throw new Error(`Update failed: ${error.message}`);
  revalidatePath("/admin/users");
}

export async function deleteUserAction(formData: FormData) {
  const me = await requireAdmin();
  const parsed = deleteSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "));
  }
  if (parsed.data.id === me.id) {
    throw new Error("You can't delete yourself.");
  }
  const admin = createSupabaseAdminClient();
  // If deleting an admin, ensure they're not the last one.
  const { data: targetData, error: targetErr } = await admin.auth.admin.getUserById(parsed.data.id);
  if (targetErr) throw new Error(`Lookup failed: ${targetErr.message}`);
  const targetMeta = (targetData.user.app_metadata ?? {}) as { role?: string };
  if (targetMeta.role === "admin") {
    const adminCount = await countAdmins();
    if (adminCount <= 1) {
      throw new Error("Can't delete the last administrator.");
    }
  }
  const { error } = await admin.auth.admin.deleteUser(parsed.data.id);
  if (error) throw new Error(`Delete failed: ${error.message}`);
  revalidatePath("/admin/users");
}
