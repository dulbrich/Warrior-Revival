"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/role";
import { formDataToObject } from "@/lib/events/schema";
import { fetchVolunteerById } from "@/lib/volunteers/queries";
import { volunteerFormSchema } from "@/lib/volunteers/schema";
import {
  deleteVolunteerImage,
  uploadVolunteerImage
} from "@/lib/volunteers/storage";

function revalidate() {
  revalidatePath("/about");
  revalidatePath("/admin/volunteers");
}

function getImageFile(formData: FormData): File | null {
  const value = formData.get("image");
  if (value && value instanceof File && value.size > 0) return value;
  return null;
}

export async function createVolunteerAction(formData: FormData) {
  await requireAdmin();
  const parsed = volunteerFormSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) {
    throw new Error(
      parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")
    );
  }

  // New rows land at the end of the public list. Sort_order is incremented in
  // steps of 10 so admins can squeeze entries in without renumbering.
  const supabase = createSupabaseServerClient();
  const { data: maxRow, error: maxErr } = await supabase
    .from("volunteers")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (maxErr) throw new Error(`Lookup failed: ${maxErr.message}`);
  const nextSortOrder = (maxRow?.sort_order ?? -10) + 10;

  const { data: inserted, error: insertErr } = await supabase
    .from("volunteers")
    .insert({
      first_name: parsed.data.first_name,
      last_initial: parsed.data.last_initial,
      branch: parsed.data.branch,
      sort_order: nextSortOrder
    })
    .select("id")
    .single();
  if (insertErr) throw new Error(`Insert failed: ${insertErr.message}`);

  const file = getImageFile(formData);
  if (file) {
    const path = await uploadVolunteerImage(file, inserted.id);
    const { error: imgErr } = await supabase
      .from("volunteers")
      .update({ image_path: path })
      .eq("id", inserted.id);
    if (imgErr) {
      // Roll back the orphan storage object — leaving it would clutter the
      // bucket without any DB row pointing to it.
      await deleteVolunteerImage(path);
      throw new Error(`Image attach failed: ${imgErr.message}`);
    }
  }

  revalidate();
  redirect("/admin/volunteers");
}

const updateInputSchema = volunteerFormSchema.extend({
  id: z.string().uuid()
});

export async function updateVolunteerAction(formData: FormData) {
  await requireAdmin();
  const parsed = updateInputSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) {
    throw new Error(
      parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")
    );
  }
  const { id, ...textFields } = parsed.data;

  const existing = await fetchVolunteerById(id);
  if (!existing) throw new Error("Volunteer not found.");

  const removeImage = formData.get("remove_image") === "on";
  const file = getImageFile(formData);

  // Image lifecycle: when an admin replaces or removes the image, the old
  // storage object MUST be deleted (the user explicitly asked for this).
  // Order: upload new (if any) → patch row → delete old. That way if upload
  // fails we never lose the existing image; if delete-old fails the DB still
  // points at the new (correct) object.
  let newImagePath: string | null | undefined; // undefined = leave column alone
  if (file) {
    newImagePath = await uploadVolunteerImage(file, id);
  } else if (removeImage) {
    newImagePath = null;
  }

  const supabase = createSupabaseServerClient();
  const updatePayload: Record<string, unknown> = { ...textFields };
  if (newImagePath !== undefined) updatePayload.image_path = newImagePath;
  const { error: updErr } = await supabase
    .from("volunteers")
    .update(updatePayload)
    .eq("id", id);
  if (updErr) {
    // If we already uploaded a new image but the DB update failed, drop the
    // orphan to keep the bucket clean.
    if (file && newImagePath) await deleteVolunteerImage(newImagePath);
    throw new Error(`Update failed: ${updErr.message}`);
  }

  // Now the row is consistent — safe to drop the predecessor object.
  if (newImagePath !== undefined && existing.image_path && existing.image_path !== newImagePath) {
    await deleteVolunteerImage(existing.image_path);
  }

  revalidate();
  redirect("/admin/volunteers");
}

const idOnlySchema = z.object({ id: z.string().uuid() });

export async function deleteVolunteerAction(formData: FormData) {
  await requireAdmin();
  const parsed = idOnlySchema.safeParse(formDataToObject(formData));
  if (!parsed.success) throw new Error("Invalid id.");
  const existing = await fetchVolunteerById(parsed.data.id);
  if (!existing) return; // already gone — idempotent

  const supabase = createSupabaseServerClient();
  const { error: delErr } = await supabase
    .from("volunteers")
    .delete()
    .eq("id", parsed.data.id);
  if (delErr) throw new Error(`Delete failed: ${delErr.message}`);

  await deleteVolunteerImage(existing.image_path);
  revalidate();
}

const reorderSchema = z.object({
  id: z.string().uuid(),
  direction: z.enum(["up", "down"])
});

// Swap this row's sort_order with its immediate neighbor in the requested
// direction. No-op if there's no neighbor (already at the end). Doing this as
// a swap means sort_order stays small and dense; we don't have to renumber
// the entire table on every nudge.
export async function reorderVolunteerAction(formData: FormData) {
  await requireAdmin();
  const parsed = reorderSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) throw new Error("Invalid reorder request.");

  const supabase = createSupabaseServerClient();
  const { data: self, error: selfErr } = await supabase
    .from("volunteers")
    .select("id, sort_order")
    .eq("id", parsed.data.id)
    .maybeSingle();
  if (selfErr) throw new Error(`Lookup failed: ${selfErr.message}`);
  if (!self) return;

  const neighborQuery = supabase
    .from("volunteers")
    .select("id, sort_order")
    .limit(1);
  if (parsed.data.direction === "up") {
    neighborQuery
      .lt("sort_order", self.sort_order)
      .order("sort_order", { ascending: false });
  } else {
    neighborQuery
      .gt("sort_order", self.sort_order)
      .order("sort_order", { ascending: true });
  }
  const { data: neighbor, error: neighborErr } = await neighborQuery.maybeSingle();
  if (neighborErr) throw new Error(`Lookup failed: ${neighborErr.message}`);
  if (!neighbor) return; // already at the edge

  // Three-step swap so unique-ish sort_orders stay valid mid-flight (the
  // column isn't unique but the temp value avoids surprises if it ever is).
  const temp = -1 * Math.abs(neighbor.sort_order) - 1;
  await supabase.from("volunteers").update({ sort_order: temp }).eq("id", neighbor.id);
  await supabase
    .from("volunteers")
    .update({ sort_order: neighbor.sort_order })
    .eq("id", self.id);
  await supabase
    .from("volunteers")
    .update({ sort_order: self.sort_order })
    .eq("id", neighbor.id);

  revalidate();
}
