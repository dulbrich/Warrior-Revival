import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { SessionUser } from "@/lib/auth/role";
import { eventRowToDisplay, type EventForDisplay, type EventRow } from "./types";

// All approved events, sorted oldest → newest. The public events page applies
// past/future filtering, month-banding, and search client-side.
export async function fetchApprovedEvents(): Promise<EventForDisplay[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("status", "approved")
    .order("event_date", { ascending: true });
  if (error) {
    throw new Error(`Failed to fetch events: ${error.message}`);
  }
  return (data as EventRow[]).map(eventRowToDisplay);
}

// Next `limit` approved events from today forward. Used by the homepage strip.
export async function fetchUpcomingEvents(limit: number): Promise<EventForDisplay[]> {
  const supabase = createSupabaseServerClient();
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("status", "approved")
    .gte("event_date", today)
    .order("event_date", { ascending: true })
    .limit(limit);
  if (error) {
    throw new Error(`Failed to fetch upcoming events: ${error.message}`);
  }
  return (data as EventRow[]).map(eventRowToDisplay);
}

// All events regardless of status, newest first. Used by the /admin events
// list. Requires an authenticated session (RLS gates anon role to approved
// only); the calling page is already auth-gated by middleware.
export async function fetchAllEventsForAdmin(): Promise<EventRow[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: false });
  if (error) {
    throw new Error(`Failed to fetch admin events: ${error.message}`);
  }
  return data as EventRow[];
}

// Fetch a single event by id for the edit page.
export async function fetchEventById(id: string): Promise<EventRow | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    throw new Error(`Failed to fetch event: ${error.message}`);
  }
  return data as EventRow | null;
}

// Fetch a single event only if the caller is allowed to edit it. Admins
// always pass through; contributors get back the row only when they are the
// creator AND the row is still pending. Returns null otherwise so callers
// can render notFound() consistently. RLS would also reject a contributor's
// attempt to update someone else's row — this exists so the edit page never
// renders a form the user can't submit.
export async function fetchEventByIdForUser(
  id: string,
  user: SessionUser
): Promise<EventRow | null> {
  const row = await fetchEventById(id);
  if (!row) return null;
  if (user.role === "admin") return row;
  if (
    user.role === "contributor" &&
    row.created_by === user.id &&
    row.status === "pending"
  ) {
    return row;
  }
  return null;
}
