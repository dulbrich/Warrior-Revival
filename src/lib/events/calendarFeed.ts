import type { EventRow } from "./types";

const escapeIcsText = (value: string) =>
  value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");

const compactDate = (value: string) => value.replaceAll("-", "");
const compactTime = (value: string) => value.replaceAll(":", "").slice(0, 6).padEnd(6, "0");

const utcStamp = (value: string | Date) =>
  new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");

// RFC 5545 line folding is measured in octets, and a multi-octet character
// must never be split across a fold. Folding by JS string length (UTF-16 code
// units) can split an emoji's surrogate pair mid-character and corrupt the
// feed, so we iterate by code point and count UTF-8 bytes. Continuation lines
// begin with a leading space (1 octet), so their content budget is 74.
const encoder = new TextEncoder();
const foldLine = (line: string) => {
  const chunks: string[] = [];
  let current = "";
  let currentBytes = 0;
  let isFirst = true;
  for (const ch of line) {
    const chBytes = encoder.encode(ch).length;
    const limit = isFirst ? 75 : 74;
    if (currentBytes + chBytes > limit) {
      chunks.push(current);
      current = "";
      currentBytes = 0;
      isFirst = false;
    }
    current += ch;
    currentBytes += chBytes;
  }
  chunks.push(current);
  return chunks.join("\r\n ");
};

const eventLines = (event: EventRow) => {
  const date = compactDate(event.event_date);
  const location = [event.location, event.address, event.city, event.state, event.zip]
    .filter(Boolean)
    .join(", ");
  const description = [event.description ?? event.notes, event.register_link]
    .filter(Boolean)
    .join("\n\n");

  let dateLines: string[];
  if (event.start_time) {
    const startTime = compactTime(event.start_time);
    const endTime = event.end_time ? compactTime(event.end_time) : null;
    dateLines = [`DTSTART;TZID=${event.timezone}:${date}T${startTime}`];
    // Only emit DTEND when it is strictly after DTSTART. A zero- or negative-
    // duration timed event (DTEND <= DTSTART, e.g. a 9:00–9:00 entry) is invalid
    // per RFC 5545 and makes Google reject the entire feed with "Unable to add
    // calendar." Omitting DTEND yields a valid zero-duration event instead.
    if (endTime && endTime > startTime) {
      dateLines.push(`DTEND;TZID=${event.timezone}:${date}T${endTime}`);
    }
  } else {
    const nextDate = new Date(`${event.event_date}T00:00:00Z`);
    nextDate.setUTCDate(nextDate.getUTCDate() + 1);
    dateLines = [
      `DTSTART;VALUE=DATE:${date}`,
      `DTEND;VALUE=DATE:${compactDate(nextDate.toISOString().slice(0, 10))}`
    ];
  }

  return [
    "BEGIN:VEVENT",
    `UID:${event.id}@warriorrevival.org`,
    `DTSTAMP:${utcStamp(event.created_at)}`,
    `LAST-MODIFIED:${utcStamp(event.updated_at)}`,
    ...dateLines,
    `SUMMARY:${escapeIcsText(event.name)}`,
    `LOCATION:${escapeIcsText(location)}`,
    description ? `DESCRIPTION:${escapeIcsText(description)}` : null,
    event.register_link ? `URL:${event.register_link}` : null,
    "STATUS:CONFIRMED",
    "END:VEVENT"
  ].filter((line): line is string => Boolean(line));
};

export function buildEventsCalendar(events: EventRow[]) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Warrior Revival//Upcoming Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Warrior Revival Events",
    "X-WR-CALDESC:Upcoming events from Warrior Revival",
    ...events.flatMap(eventLines),
    "END:VCALENDAR"
  ];

  return `${lines.map(foldLine).join("\r\n")}\r\n`;
}
