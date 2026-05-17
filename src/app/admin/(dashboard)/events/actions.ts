"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin, requireRole } from "@/lib/auth/role";
import {
  eventFormSchema,
  eventStatusSchema,
  formDataToObject
} from "@/lib/events/schema";
import { fetchEventById } from "@/lib/events/queries";

function revalidatePublicEventPages() {
  revalidatePath("/events");
  revalidatePath("/");
}

export async function createEventAction(formData: FormData) {
  const user = await requireRole(["admin", "contributor"]);
  const parsed = eventFormSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "));
  }
  // Contributors can never publish directly — server-side enforced even if a
  // crafted POST tries to set status=approved. RLS will also block it.
  const status = user.role === "admin" ? parsed.data.status : "pending";
  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from("events")
    .insert([{ ...parsed.data, status, created_by: user.id }]);
  if (error) throw new Error(`Insert failed: ${error.message}`);
  revalidatePublicEventPages();
  revalidatePath("/admin/events");
  redirect(`/admin/events?status=${status}`);
}

const updateInputSchema = eventFormSchema.extend({
  id: z.string().uuid()
});

export async function updateEventAction(formData: FormData) {
  const user = await requireRole(["admin", "contributor"]);
  const parsed = updateInputSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "));
  }
  const { id, ...rest } = parsed.data;

  // Contributors are limited to their own pending events; double-check here
  // before issuing the update so we return a clear error rather than letting
  // RLS swallow it. Admins are not constrained.
  if (user.role === "contributor") {
    const existing = await fetchEventById(id);
    if (!existing || existing.created_by !== user.id || existing.status !== "pending") {
      throw new Error("You can only edit your own pending events.");
    }
  }
  const status = user.role === "admin" ? rest.status : "pending";

  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from("events")
    .update({ ...rest, status })
    .eq("id", id);
  if (error) throw new Error(`Update failed: ${error.message}`);

  revalidatePublicEventPages();
  revalidatePath("/admin/events");
  redirect(`/admin/events?status=${status}`);
}

const statusChangeSchema = z.object({
  id: z.string().uuid(),
  status: eventStatusSchema
});

export async function setEventStatusAction(formData: FormData) {
  await requireAdmin();
  const parsed = statusChangeSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "));
  }
  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from("events")
    .update({ status: parsed.data.status })
    .eq("id", parsed.data.id);
  if (error) throw new Error(`Status update failed: ${error.message}`);
  revalidatePublicEventPages();
  revalidatePath("/admin/events");
}
