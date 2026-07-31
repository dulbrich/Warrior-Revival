import { buildEventsCalendar } from "@/lib/events/calendarFeed";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { EventRow } from "@/lib/events/types";

export const revalidate = 300;

export async function GET() {
  const supabase = createSupabaseServerClient();
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("status", "approved")
    .gte("event_date", today)
    .order("event_date", { ascending: true });

  if (error) {
    return new Response("Unable to load the events calendar.", { status: 503 });
  }

  return new Response(buildEventsCalendar(data as EventRow[]), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": "inline; filename=warrior-revival-events.ics",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600"
    }
  });
}
