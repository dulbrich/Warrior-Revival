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

const foldLine = (line: string) => {
  const chunks: string[] = [];
  let remaining = line;
  while (remaining.length > 73) {
    chunks.push(remaining.slice(0, 73));
    remaining = remaining.slice(73);
  }
  chunks.push(remaining);
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
    const start = `${date}T${compactTime(event.start_time)}`;
    const end = event.end_time ? `${date}T${compactTime(event.end_time)}` : start;
    dateLines = [
      `DTSTART;TZID=${event.timezone}:${start}`,
      `DTEND;TZID=${event.timezone}:${end}`
    ];
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
