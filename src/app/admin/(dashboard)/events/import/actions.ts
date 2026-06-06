"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/role";
import { parseBulkEvents, eventDedupeKey } from "@/lib/events/bulkImport";
import type { ImportState } from "./types";

// useFormState action: validate a pasted/uploaded JSON array of events, drop
// duplicates (both within the file and against rows already in the DB), and
// batch-insert the rest. Returns a structured report rather than redirecting
// so the UI can show exactly what happened to each entry.
export async function bulkImportEventsAction(
  _prev: ImportState,
  formData: FormData
): Promise<ImportState> {
  const user = await requireRole(["admin", "contributor"]);

  const rawText = String(formData.get("payload") ?? "");
  const parsed = parseBulkEvents(rawText);

  if (parsed.fatalError) {
    return {
      status: "error",
      message: parsed.fatalError,
      summary: null,
      invalid: [],
      duplicates: []
    };
  }

  const invalid = parsed.invalid.map((e) => ({
    label: e.label,
    messages: e.messages
  }));
  const duplicates: ImportState["duplicates"] = parsed.duplicatesInFile.map(
    (e) => ({ label: e.label, reason: "in-file" as const })
  );

  const supabase = createSupabaseServerClient();

  // Pull existing (name, event_date) pairs once and dedupe against them in
  // memory. The events table is small and this avoids a per-row round trip.
  const { data: existingRows, error: existingError } = await supabase
    .from("events")
    .select("name, event_date");
  if (existingError) {
    return {
      status: "error",
      message: `Could not read existing events: ${existingError.message}`,
      summary: null,
      invalid,
      duplicates
    };
  }
  const existingKeys = new Set(
    (existingRows ?? []).map((r) => eventDedupeKey(r.name, r.event_date))
  );

  const toInsert: typeof parsed.valid = [];
  for (const entry of parsed.valid) {
    if (existingKeys.has(entry.dedupeKey)) {
      duplicates.push({ label: entry.label, reason: "already-exists" });
    } else {
      toInsert.push(entry);
    }
  }

  let created = 0;
  if (toInsert.length > 0) {
    // Contributors can never publish directly — force pending regardless of
    // any status set in the JSON (server-side enforced; RLS also blocks it).
    const rows = toInsert.map((entry) => ({
      ...entry.value,
      status: user.role === "admin" ? entry.value.status : "pending",
      created_by: user.id
    }));

    // ignoreDuplicates uses the (name, event_date) UNIQUE constraint as a final
    // backstop against anything our in-memory check missed (e.g. a concurrent
    // upload). .select() returns only the rows actually inserted.
    const { data: inserted, error: insertError } = await supabase
      .from("events")
      .upsert(rows, { onConflict: "name,event_date", ignoreDuplicates: true })
      .select("id");
    if (insertError) {
      return {
        status: "error",
        message: `Insert failed: ${insertError.message}`,
        summary: null,
        invalid,
        duplicates
      };
    }
    created = inserted?.length ?? 0;

    // Any rows the DB constraint silently dropped were duplicates we didn't
    // catch in memory — reflect that in the count so the summary stays honest.
    const droppedByDb = rows.length - created;
    if (droppedByDb > 0) {
      duplicates.push(
        ...toInsert
          .slice(created)
          .map((entry) => ({ label: entry.label, reason: "already-exists" as const }))
      );
    }
  }

  if (created > 0) {
    revalidatePath("/events");
    revalidatePath("/");
    revalidatePath("/admin/events");
  }

  const duplicatesExisting = duplicates.filter(
    (d) => d.reason === "already-exists"
  ).length;
  const duplicatesInFile = duplicates.filter((d) => d.reason === "in-file").length;

  return {
    status: "success",
    message:
      created > 0
        ? `Imported ${created} event${created === 1 ? "" : "s"}.`
        : "No new events were imported.",
    summary: {
      total: parsed.total,
      created,
      duplicatesInFile,
      duplicatesExisting,
      invalid: invalid.length
    },
    invalid,
    duplicates
  };
}
