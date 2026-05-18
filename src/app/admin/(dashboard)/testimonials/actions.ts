"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/role";
import { formDataToObject } from "@/lib/events/schema";
import { testimonialFormSchema } from "@/lib/testimonials/schema";

function revalidate() {
  revalidatePath("/veterans");
  revalidatePath("/admin/testimonials");
}

export async function createTestimonialAction(formData: FormData) {
  await requireAdmin();
  const parsed = testimonialFormSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) {
    throw new Error(
      parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")
    );
  }

  // Land at the end of the list. sort_order steps of 10 leave room to
  // squeeze entries in without renumbering.
  const supabase = createSupabaseServerClient();
  const { data: maxRow, error: maxErr } = await supabase
    .from("testimonials")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (maxErr) throw new Error(`Lookup failed: ${maxErr.message}`);
  const nextSortOrder = (maxRow?.sort_order ?? -10) + 10;

  const { error } = await supabase
    .from("testimonials")
    .insert({ quote: parsed.data.quote, sort_order: nextSortOrder });
  if (error) throw new Error(`Insert failed: ${error.message}`);

  revalidate();
  redirect("/admin/testimonials");
}

const updateInputSchema = testimonialFormSchema.extend({
  id: z.string().uuid()
});

export async function updateTestimonialAction(formData: FormData) {
  await requireAdmin();
  const parsed = updateInputSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) {
    throw new Error(
      parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")
    );
  }
  const { id, quote } = parsed.data;

  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from("testimonials")
    .update({ quote })
    .eq("id", id);
  if (error) throw new Error(`Update failed: ${error.message}`);

  revalidate();
  redirect("/admin/testimonials");
}

const idOnlySchema = z.object({ id: z.string().uuid() });

export async function deleteTestimonialAction(formData: FormData) {
  await requireAdmin();
  const parsed = idOnlySchema.safeParse(formDataToObject(formData));
  if (!parsed.success) throw new Error("Invalid id.");
  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from("testimonials")
    .delete()
    .eq("id", parsed.data.id);
  if (error) throw new Error(`Delete failed: ${error.message}`);
  revalidate();
}

const reorderSchema = z.object({
  id: z.string().uuid(),
  direction: z.enum(["up", "down"])
});

// Same neighbor-swap pattern as the volunteers reorder action.
export async function reorderTestimonialAction(formData: FormData) {
  await requireAdmin();
  const parsed = reorderSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) throw new Error("Invalid reorder request.");

  const supabase = createSupabaseServerClient();
  const { data: self, error: selfErr } = await supabase
    .from("testimonials")
    .select("id, sort_order")
    .eq("id", parsed.data.id)
    .maybeSingle();
  if (selfErr) throw new Error(`Lookup failed: ${selfErr.message}`);
  if (!self) return;

  const neighborQuery = supabase
    .from("testimonials")
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
  if (!neighbor) return;

  const temp = -1 * Math.abs(neighbor.sort_order) - 1;
  await supabase
    .from("testimonials")
    .update({ sort_order: temp })
    .eq("id", neighbor.id);
  await supabase
    .from("testimonials")
    .update({ sort_order: neighbor.sort_order })
    .eq("id", self.id);
  await supabase
    .from("testimonials")
    .update({ sort_order: self.sort_order })
    .eq("id", neighbor.id);

  revalidate();
}
