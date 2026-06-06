"use client";

import { useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { IMAGE_KEYS } from "@/lib/events/imageKeys";
import { bulkImportEventsAction } from "./actions";
import { initialImportState, type ImportState } from "./types";

// A copy-paste starting point that exercises every column. Kept in sync with
// eventFormSchema — name/event_date/location are required, the rest optional.
const SAMPLE = JSON.stringify(
  [
    {
      name: "Veterans Coffee Social",
      event_date: "2026-07-15",
      start_time: "09:00",
      end_time: "10:30",
      timezone: "America/Denver",
      location: "Draper, UT",
      address: "123 Main St",
      city: "Draper",
      state: "UT",
      zip: "84020",
      audience: "Veteran + Family",
      image_key: "coffee",
      description: "Casual morning coffee and connection.",
      cost: "Free",
      register_link: "https://example.com/register",
      host_name: "Warrior Revival",
      contact_name: "Jane Doe",
      contact_phone: "801-555-0100"
    },
    {
      name: "Summit Hike",
      event_date: "2026-07-22",
      location: "American Fork Canyon, UT",
      image_key: "hike",
      audience: "Veteran"
    }
  ],
  null,
  2
);

export default function ImportClient({ canPublish }: { canPublish: boolean }) {
  const [state, formAction] = useFormState<ImportState, FormData>(
    bulkImportEventsAction,
    initialImportState
  );
  const [payload, setPayload] = useState("");
  const [fileError, setFileError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    setFileError(null);
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPayload(String(reader.result ?? ""));
    reader.onerror = () => setFileError("Could not read that file.");
    reader.readAsText(file);
  }

  return (
    <div className="space-y-8">
      <form action={formAction} className="space-y-6">
        <section className="rounded-2xl border border-border bg-surface p-6 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-heading text-lg font-semibold text-primary">
              Paste or upload JSON
            </h2>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPayload(SAMPLE)}
                className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-textSecondary transition hover:border-primary hover:text-primary"
              >
                Load sample
              </button>
              <button
                type="button"
                onClick={() => {
                  setPayload("");
                  setFileError(null);
                  if (fileRef.current) fileRef.current.value = "";
                }}
                className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-textSecondary transition hover:border-primary hover:text-primary"
              >
                Clear
              </button>
            </div>
          </div>

          <label className="mt-4 block">
            <span className="text-sm font-semibold text-textPrimary">
              Upload a .json file
            </span>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              onChange={handleFile}
              className="mt-1 block w-full text-sm text-textSecondary file:mr-3 file:rounded-md file:border file:border-border file:bg-white file:px-3 file:py-1.5 file:text-xs file:font-semibold file:uppercase file:tracking-wide file:text-textSecondary hover:file:border-primary hover:file:text-primary"
            />
          </label>
          {fileError ? (
            <p className="mt-2 text-sm text-warning">{fileError}</p>
          ) : null}

          <label className="mt-4 block">
            <span className="text-sm font-semibold text-textPrimary">
              JSON payload
            </span>
            <textarea
              name="payload"
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              rows={16}
              spellCheck={false}
              placeholder='[ { "name": "…", "event_date": "2026-07-15", "location": "…" } ]'
              className="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 font-mono text-sm text-textPrimary placeholder:text-textSecondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            />
          </label>
        </section>

        <div className="flex items-center justify-end gap-3">
          <a
            href="/admin/events"
            className="rounded-md border border-border px-4 py-2 text-sm font-semibold uppercase tracking-wide text-textSecondary transition hover:border-primary hover:text-primary"
          >
            Cancel
          </a>
          <SubmitButton disabled={payload.trim().length === 0} />
        </div>
      </form>

      <ResultPanel state={state} />

      <HelpPanel canPublish={canPublish} />
    </div>
  );
}

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="rounded-md bg-accent px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Importing…" : "Import events"}
    </button>
  );
}

function ResultPanel({ state }: { state: ImportState }) {
  if (state.status === "idle") return null;

  if (state.status === "error") {
    return (
      <div className="rounded-2xl border border-warning/40 bg-warning/10 p-5">
        <p className="font-heading text-base font-semibold text-warning">
          Import failed
        </p>
        <p className="mt-1 text-sm text-textPrimary">{state.message}</p>
        {state.invalid.length > 0 ? <InvalidList invalid={state.invalid} /> : null}
      </div>
    );
  }

  const s = state.summary;
  return (
    <div className="space-y-4 rounded-2xl border border-border bg-surface p-5 shadow-card">
      <div>
        <p className="font-heading text-base font-semibold text-primary">
          {state.message}
        </p>
        {s ? (
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
            <Stat label="In file" value={s.total} />
            <Stat label="Created" value={s.created} tone="success" />
            <Stat label="Dup in file" value={s.duplicatesInFile} />
            <Stat label="Already existed" value={s.duplicatesExisting} />
            <Stat label="Invalid" value={s.invalid} tone={s.invalid ? "warning" : undefined} />
          </div>
        ) : null}
      </div>

      {state.duplicates.length > 0 ? (
        <div>
          <p className="text-sm font-semibold text-textPrimary">
            Skipped duplicates
          </p>
          <ul className="mt-2 space-y-1 text-sm text-textSecondary">
            {state.duplicates.map((d, i) => (
              <li key={`${d.label}-${i}`} className="flex items-start gap-2">
                <span aria-hidden="true">•</span>
                <span>
                  <span className="font-medium text-textPrimary">{d.label}</span>{" "}
                  —{" "}
                  {d.reason === "in-file"
                    ? "duplicated earlier in this file"
                    : "already exists in the calendar"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {state.invalid.length > 0 ? <InvalidList invalid={state.invalid} /> : null}

      {s && s.created > 0 ? (
        <a
          href="/admin/events"
          className="inline-flex rounded-md border border-primary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/10"
        >
          View events
        </a>
      ) : null}
    </div>
  );
}

function InvalidList({
  invalid
}: {
  invalid: { label: string; messages: string[] }[];
}) {
  return (
    <div className="mt-3">
      <p className="text-sm font-semibold text-textPrimary">
        Entries with errors (not imported)
      </p>
      <ul className="mt-2 space-y-2 text-sm text-textSecondary">
        {invalid.map((e, i) => (
          <li key={`${e.label}-${i}`}>
            <span className="font-medium text-textPrimary">{e.label}</span>
            <ul className="ml-4 list-disc">
              {e.messages.map((m, j) => (
                <li key={j}>{m}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stat({
  label,
  value,
  tone
}: {
  label: string;
  value: number;
  tone?: "success" | "warning";
}) {
  const valueClass =
    tone === "success"
      ? "text-success"
      : tone === "warning"
        ? "text-warning"
        : "text-primary";
  return (
    <div className="rounded-xl border border-border bg-light px-3 py-2 text-center">
      <p className={`font-heading text-2xl font-semibold ${valueClass}`}>{value}</p>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-textSecondary">
        {label}
      </p>
    </div>
  );
}

function HelpPanel({ canPublish }: { canPublish: boolean }) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-card">
      <h2 className="font-heading text-lg font-semibold text-primary">Format</h2>
      <p className="mt-2 text-sm text-textSecondary">
        Provide a JSON array of event objects (or an object with an{" "}
        <code className="rounded bg-light px-1">events</code> array). Each object
        uses these fields:
      </p>
      <ul className="mt-3 space-y-1 text-sm text-textSecondary">
        <li>
          <strong className="text-textPrimary">Required:</strong>{" "}
          <code className="rounded bg-light px-1">name</code>,{" "}
          <code className="rounded bg-light px-1">event_date</code> (YYYY-MM-DD),{" "}
          <code className="rounded bg-light px-1">location</code>
        </li>
        <li>
          <strong className="text-textPrimary">Times:</strong>{" "}
          <code className="rounded bg-light px-1">start_time</code> /{" "}
          <code className="rounded bg-light px-1">end_time</code> as{" "}
          <code className="rounded bg-light px-1">HH:MM</code>,{" "}
          <code className="rounded bg-light px-1">timezone</code> (defaults to
          America/Denver)
        </li>
        <li>
          <strong className="text-textPrimary">Optional:</strong> description,
          address, city, state, zip, audience, cost, register_link, host_name,
          contact_name, contact_phone
        </li>
        <li>
          <strong className="text-textPrimary">image_key:</strong> one of{" "}
          {IMAGE_KEYS.map((k, i) => (
            <span key={k}>
              <code className="rounded bg-light px-1">{k}</code>
              {i < IMAGE_KEYS.length - 1 ? ", " : ""}
            </span>
          ))}
        </li>
      </ul>
      <p className="mt-3 text-sm text-textSecondary">
        Events that share a name and date with another entry — or with an event
        already in the calendar — are skipped automatically.
        {canPublish ? (
          <>
            {" "}
            Set <code className="rounded bg-light px-1">&quot;status&quot;</code>{" "}
            to <code className="rounded bg-light px-1">approved</code> to publish
            immediately; it defaults to{" "}
            <code className="rounded bg-light px-1">pending</code>.
          </>
        ) : (
          " All imported events are saved as pending for an administrator to approve."
        )}
      </p>
    </section>
  );
}
