// Builds display strings (dateLabel / timeLabel) from structured DB fields,
// matching what the legacy hard-coded events.ts produced so the existing UI
// does not need to change its rendering of dates and times.

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export function formatEventDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${MONTHS_SHORT[m - 1]} ${d}, ${y}`;
}

export function formatEventTime(
  startTime: string | null,
  endTime: string | null,
  isoDate: string,
  timezone = "America/Denver"
): string {
  if (!startTime && !endTime) return "";
  const tz = resolveTimezoneAbbreviation(isoDate, timezone);
  if (startTime && endTime) {
    return `${formatClock(startTime)} - ${formatClock(endTime)} ${tz}`.trim();
  }
  const lone = formatClock(startTime ?? endTime ?? "");
  return tz ? `${lone} ${tz}`.trim() : lone;
}

function formatClock(hms: string): string {
  if (!hms) return "";
  const [hStr, mStr] = hms.split(":");
  const h = Number(hStr);
  const m = mStr !== undefined ? Number(mStr) : 0;
  if (Number.isNaN(h)) return hms;
  const period = h >= 12 ? "pm" : "am";
  const hour12 = ((h + 11) % 12) + 1;
  return m
    ? `${hour12}:${String(m).padStart(2, "0")} ${period}`
    : `${hour12}:00 ${period}`;
}

// "America/Denver" + a date during DST returns "MDT"; outside DST, "MST".
function resolveTimezoneAbbreviation(isoDate: string, timezone: string): string {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "short"
    });
    const date = new Date(`${isoDate}T12:00:00Z`);
    const parts = formatter.formatToParts(date);
    return parts.find((p) => p.type === "timeZoneName")?.value ?? "";
  } catch {
    return "";
  }
}
