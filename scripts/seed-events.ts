// One-off seed: migrate src/data/events.ts into the Supabase events table.
//
//   npm run seed:events
//
// Idempotent on the (name, event_date) unique constraint defined in
// supabase/migrations/0001_events.sql — re-running upserts rather than
// duplicating. Uses the service-role key from .env.local to bypass RLS.

import { config as loadEnv } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { events, type EventItem } from "../src/data/events";

loadEnv({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false }
});

type EventRowInsert = {
  status: "approved";
  name: string;
  description: string | null;
  event_date: string;
  start_time: string | null;
  end_time: string | null;
  timezone: string;
  location: string;
  address: string | null;
  audience: string | null;
  image_key: string | null;
  register_link: string | null;
  contact_name: string | null;
  contact_phone: string | null;
  notes: string | null;
};

function mapEvent(event: EventItem): EventRowInsert {
  const { start, end } = parseTimeRange(event.timeLabel);
  const description = composeDescription(event, start, end);
  return {
    status: "approved",
    name: event.name,
    description,
    event_date: event.dateIso,
    start_time: start,
    end_time: end,
    timezone: "America/Denver",
    location: event.location,
    address: event.address ?? null,
    audience: event.category,
    image_key: guessImageKey(event.image),
    register_link: event.register_link || null,
    contact_name: event.contact?.name ?? null,
    contact_phone: event.contact?.phone ?? null,
    notes: event.notes ?? null
  };
}

function guessImageKey(path: string | undefined): string | null {
  if (!path) return null;
  if (path.includes("hiking")) return "hike";
  if (path.includes("coffee")) return "coffee";
  if (path.includes("lunch")) return "lunch";
  if (path.includes("books")) return "book";
  return null;
}

// "6:00 pm - 7:30 pm MDT" → { start: "18:00:00", end: "19:30:00" }
// Returns nulls for non-clock labels like "All day" / "Multi-day".
function parseTimeRange(label: string): {
  start: string | null;
  end: string | null;
} {
  if (!label) return { start: null, end: null };
  const range = label.match(
    /^(\d{1,2}(?::\d{2})?\s*[ap]m)\s*-\s*(\d{1,2}(?::\d{2})?\s*[ap]m)/i
  );
  if (range) return { start: to24h(range[1]), end: to24h(range[2]) };
  const single = label.match(/^(\d{1,2}(?::\d{2})?\s*[ap]m)/i);
  if (single) return { start: to24h(single[1]), end: null };
  return { start: null, end: null };
}

function to24h(input: string): string {
  const m = input.trim().toLowerCase().match(/^(\d{1,2})(?::(\d{2}))?\s*([ap])m$/);
  if (!m) return input;
  let h = parseInt(m[1], 10);
  const minute = m[2] ? parseInt(m[2], 10) : 0;
  if (m[3] === "p" && h !== 12) h += 12;
  if (m[3] === "a" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`;
}

// Preserve the original schedule string in `description` for events whose
// time label can't be parsed (e.g. "All day", "Multi-day"). Admins can edit
// the start/end fields and tidy the description later.
function composeDescription(
  event: EventItem,
  start: string | null,
  end: string | null
): string | null {
  const parts: string[] = [];
  if (event.notes) parts.push(event.notes);
  if (!start && !end && event.timeLabel) {
    parts.push(`Schedule: ${event.timeLabel}`);
  }
  return parts.length ? parts.join("\n\n") : null;
}

async function main() {
  console.log(`Seeding ${events.length} events...`);
  const rows = events.map(mapEvent);

  // Upsert in batches; supabase-js handles arrays but Postgres has parameter
  // limits, and 79 rows is well within them.
  const { data, error } = await supabase
    .from("events")
    .upsert(rows, { onConflict: "name,event_date", ignoreDuplicates: false })
    .select("id, name");

  if (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
  console.log(`Done. ${data?.length ?? 0} rows upserted.`);
}

main();
