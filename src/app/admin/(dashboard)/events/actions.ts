"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  eventFormSchema,
  eventStatusSchema,
  formDataToObject
} from "@/lib/events/schema";

function revalidatePublicEventPages() {
  revalidatePath("/events");
  revalidatePath("/");
}

export async function createEventAction(formData: FormData) {
  const parsed = eventFormSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "));
  }
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("events")
    .insert([parsed.data])
    .select("id")
    .single();
  if (error) throw new Error(`Insert failed: ${error.message}`);
  revalidatePublicEventPages();
  redirect(`/admin/events/${data.id}`);
}

const updateInputSchema = eventFormSchema.extend({
  id: z.string().uuid()
});

export async function updateEventAction(formData: FormData) {
  const parsed = updateInputSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "));
  }
  const { id, ...row } = parsed.data;
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("events").update(row).eq("id", id);
  if (error) throw new Error(`Update failed: ${error.message}`);
  revalidatePublicEventPages();
  redirect(`/admin/events/${id}`);
}

const statusChangeSchema = z.object({
  id: z.string().uuid(),
  status: eventStatusSchema
});

export async function setEventStatusAction(formData: FormData) {
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
