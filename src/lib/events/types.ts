// TypeScript projection of the events table (see supabase/migrations/0001_events.sql)
// plus a render-shape (EventForDisplay) that the UI components consume — produced
// by `eventRowToDisplay` so all label-formatting / image-key resolution happens
// once, server-side, before the data reaches React.

import { formatEventDate, formatEventTime } from "./format";
import { resolveEventImage } from "./imageKeys";

export type EventStatus = "pending" | "approved" | "removed";

export type EventRow = {
  id: string;
  status: EventStatus;
  name: string;
  description: string | null;
  event_date: string;        // YYYY-MM-DD
  start_time: string | null; // HH:MM:SS
  end_time: string | null;   // HH:MM:SS
  timezone: string;          // IANA, e.g. "America/Denver"
  location: string;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  audience: string | null;
  image_key: string | null;
  register_link: string | null;
  cost: string | null;
  host_name: string | null;
  contact_name: string | null;
  contact_phone: string | null;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type EventForDisplay = {
  id: string;
  status: EventStatus;
  name: string;
  dateIso: string;
  dateLabel: string;
  timeLabel: string;
  location: string;
  category: string;       // audience label shown as chip on cards
  address: string | null;
  notes: string | null;   // prefers description; falls back to notes
  image: string;          // resolved path (image-key → asset), never null
  contact: { name: string; phone: string } | null;
  register_link: string;
  createdBy: string | null;  // user id; used by /admin to decide who can edit
};

export function eventRowToDisplay(row: EventRow): EventForDisplay {
  const contact =
    row.contact_name || row.contact_phone
      ? { name: row.contact_name ?? "", phone: row.contact_phone ?? "" }
      : null;
  return {
    id: row.id,
    status: row.status,
    name: row.name,
    dateIso: row.event_date,
    dateLabel: formatEventDate(row.event_date),
    timeLabel: formatEventTime(row.start_time, row.end_time, row.event_date, row.timezone),
    location: row.location,
    category: row.audience ?? "",
    address: row.address,
    notes: row.description ?? row.notes,
    image: resolveEventImage(row.image_key),
    contact,
    register_link: row.register_link ?? "",
    createdBy: row.created_by
  };
}
