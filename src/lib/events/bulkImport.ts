// Pure helpers for the JSON mass-event uploader (/admin/events/import).
//
// Parsing/validation/dedup logic lives here (no DB, no React) so it stays
// easy to reason about and test. The server action in
// src/app/admin/(dashboard)/events/import/actions.ts wires this to Supabase.
//
// Duplicates are keyed on (name, event_date) — the same pair the events table
// enforces a UNIQUE constraint on (see supabase/migrations/0001_events.sql).
// We normalize the name (trim + lowercase + collapse internal whitespace) so
// near-identical titles ("Coffee  Social" vs "coffee social") are treated as
// the same event, which is stricter than the DB's exact-match constraint and
// therefore safe to pre-filter on.

import { eventFormSchema, type EventFormValues } from "./schema";

// A canonical key for duplicate detection. Used both to dedupe entries within
// a single uploaded file and to compare against events already in the DB.
export function eventDedupeKey(name: string, eventDate: string): string {
  const normalizedName = name.trim().toLowerCase().replace(/\s+/g, " ");
  return `${normalizedName}|${eventDate.trim()}`;
}

// Coerce one raw JSON object into the shape eventFormSchema expects. JSON can
// carry nulls and empty strings where the form would simply omit a field;
// fold those to `undefined` and trim strings so optional fields validate the
// same way they do for the single-event form. Unknown keys are left in place —
// zod strips them. Non-string scalars are passed through untouched so zod can
// surface a clear type error rather than us silently mangling them.
function normalizeRawEntry(raw: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (value === null || value === undefined) continue;
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed === "") continue;
      out[key] = trimmed;
    } else {
      out[key] = value;
    }
  }
  return out;
}

// Best-effort human label for an entry that failed to parse, so the error
// report can point the admin at the right object even when validation fails.
function entryLabel(raw: unknown, index: number): string {
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const name = (raw as Record<string, unknown>).name;
    if (typeof name === "string" && name.trim()) return name.trim();
  }
  return `Entry #${index + 1}`;
}

export type ValidEntry = {
  index: number;
  label: string;
  value: EventFormValues;
  dedupeKey: string;
};

export type InvalidEntry = {
  index: number;
  label: string;
  messages: string[];
};

export type ParseResult = {
  // Total number of entries found in the parsed array.
  total: number;
  // Entries that passed schema validation and survived in-file dedup.
  valid: ValidEntry[];
  // Entries that failed schema validation.
  invalid: InvalidEntry[];
  // Valid entries that duplicated an earlier valid entry in the same file.
  duplicatesInFile: ValidEntry[];
  // A top-level problem with the document itself (not valid JSON, not an
  // array of objects, empty, …). When set, the other arrays are empty.
  fatalError: string | null;
};

// Accept either a bare array of event objects or an object wrapping one under
// an `events` key, since both are natural things to paste.
function extractEntries(parsed: unknown): unknown[] | { error: string } {
  if (Array.isArray(parsed)) return parsed;
  if (parsed && typeof parsed === "object") {
    const events = (parsed as Record<string, unknown>).events;
    if (Array.isArray(events)) return events;
    return {
      error:
        'Expected a JSON array of events, or an object with an "events" array.'
    };
  }
  return { error: "Expected a JSON array of events at the top level." };
}

// Parse + validate + in-file dedup. Does no DB work.
export function parseBulkEvents(rawText: string): ParseResult {
  const empty: ParseResult = {
    total: 0,
    valid: [],
    invalid: [],
    duplicatesInFile: [],
    fatalError: null
  };

  const trimmed = rawText.trim();
  if (!trimmed) {
    return { ...empty, fatalError: "No JSON provided." };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    return { ...empty, fatalError: `Invalid JSON: ${detail}` };
  }

  const entries = extractEntries(parsed);
  if (!Array.isArray(entries)) {
    return { ...empty, fatalError: entries.error };
  }
  if (entries.length === 0) {
    return { ...empty, fatalError: "The JSON contained zero events." };
  }

  const valid: ValidEntry[] = [];
  const invalid: InvalidEntry[] = [];
  const duplicatesInFile: ValidEntry[] = [];
  const seenKeys = new Set<string>();

  entries.forEach((rawEntry, index) => {
    const label = entryLabel(rawEntry, index);

    if (!rawEntry || typeof rawEntry !== "object" || Array.isArray(rawEntry)) {
      invalid.push({
        index,
        label,
        messages: ["Each event must be a JSON object."]
      });
      return;
    }

    const normalized = normalizeRawEntry(rawEntry as Record<string, unknown>);
    const result = eventFormSchema.safeParse(normalized);
    if (!result.success) {
      invalid.push({
        index,
        label,
        messages: result.error.issues.map((i) =>
          i.path.length ? `${i.path.join(".")}: ${i.message}` : i.message
        )
      });
      return;
    }

    const key = eventDedupeKey(result.data.name, result.data.event_date);
    const entry: ValidEntry = { index, label, value: result.data, dedupeKey: key };
    if (seenKeys.has(key)) {
      duplicatesInFile.push(entry);
      return;
    }
    seenKeys.add(key);
    valid.push(entry);
  });

  return {
    total: entries.length,
    valid,
    invalid,
    duplicatesInFile,
    fatalError: null
  };
}
