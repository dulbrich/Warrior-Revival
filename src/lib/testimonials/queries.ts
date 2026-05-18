import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { TestimonialRow } from "./types";

// Public-facing list. Ordered by sort_order asc, ties broken by created_at
// for determinism. Returns just the quote strings — the VeteransPageClient
// carousel uses array index for animation tracking, so a plain string[] is
// the cleanest drop-in for the existing testimonialCards array.
export async function fetchTestimonials(): Promise<string[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("quote")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw new Error(`Failed to fetch testimonials: ${error.message}`);
  return (data ?? []).map((row) => row.quote as string);
}

// Admin-facing list. Returns full rows so the management UI can show
// sort_order, ids, etc.
export async function fetchTestimonialsRaw(): Promise<TestimonialRow[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw new Error(`Failed to fetch testimonials: ${error.message}`);
  return data as TestimonialRow[];
}

export async function fetchTestimonialById(
  id: string
): Promise<TestimonialRow | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`Failed to fetch testimonial: ${error.message}`);
  return data as TestimonialRow | null;
}
