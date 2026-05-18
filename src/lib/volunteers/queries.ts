import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  volunteerRowToDisplay,
  type VolunteerForDisplay,
  type VolunteerRow
} from "./types";

// Ordered by sort_order asc, ties broken by created_at asc so the order is
// always deterministic. Public — works with the anon key.
export async function fetchVolunteers(): Promise<VolunteerForDisplay[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("volunteers")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw new Error(`Failed to fetch volunteers: ${error.message}`);
  return (data as VolunteerRow[]).map(volunteerRowToDisplay);
}

// Admin list reads the raw row shape because the admin UI needs first/last
// fields separately for prefill and image_path for the storage actions.
export async function fetchVolunteersRaw(): Promise<VolunteerRow[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("volunteers")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw new Error(`Failed to fetch volunteers: ${error.message}`);
  return data as VolunteerRow[];
}

export async function fetchVolunteerById(id: string): Promise<VolunteerRow | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("volunteers")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`Failed to fetch volunteer: ${error.message}`);
  return data as VolunteerRow | null;
}
