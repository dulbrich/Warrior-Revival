"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  uploadGalleryFileWithProgress,
  validateGalleryFile
} from "@/lib/gallery/clientUpload";
import { revalidateGalleryAction } from "./actions";

type Status = "pending" | "uploading" | "done" | "error";
type Item = {
  id: string;
  file: File;
  status: Status;
  percentage: number;
  message?: string;
};

// Cap concurrent uploads so a "select 30 photos" batch doesn't saturate
// the browser's connection budget; per-file progress still shows for the
// in-flight ones.
const CONCURRENCY = 3;

export default function GalleryUploadForm() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [topLevelError, setTopLevelError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setTopLevelError(null);
    setItems(
      files.map((file) => {
        const issue = validateGalleryFile(file);
        return {
          id: crypto.randomUUID(),
          file,
          status: issue ? "error" : "pending",
          percentage: 0,
          message: issue ?? undefined
        };
      })
    );
  }

  async function handleUpload() {
    setTopLevelError(null);

    const supabase = createSupabaseBrowserClient();
    const {
      data: { session }
    } = await supabase.auth.getSession();
    if (!session?.access_token) {
      setTopLevelError("Your session expired. Sign in again.");
      return;
    }
    const accessToken: string = session.access_token;

    const queue = items
      .map((it, idx) => ({ it, idx }))
      .filter(({ it }) => it.status === "pending");
    if (queue.length === 0) {
      setTopLevelError("Nothing to upload — fix or remove the failed files first.");
      return;
    }

    setIsUploading(true);

    // Worker pool: each "worker" pulls the next pending item until the queue
    // is empty. CONCURRENCY workers run in parallel.
    let cursor = 0;
    async function next() {
      while (cursor < queue.length) {
        const { it, idx } = queue[cursor++];
        updateItem(idx, { status: "uploading", percentage: 0, message: undefined });
        try {
          await uploadGalleryFileWithProgress(it.file, {
            supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
            accessToken,
            onProgress: (p) =>
              updateItem(idx, { status: "uploading", percentage: p.percentage })
          });
          updateItem(idx, { status: "done", percentage: 100 });
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          updateItem(idx, { status: "error", message: msg });
        }
      }
    }
    await Promise.all(Array.from({ length: CONCURRENCY }, () => next()));

    // Tell the server to revalidate so the admin grid + public /gallery
    // re-render with the new files included. router.refresh() then pulls
    // fresh data into this page without a full reload.
    try {
      await revalidateGalleryAction();
      router.refresh();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setTopLevelError(`Uploads finished but revalidate failed: ${msg}`);
    }

    setIsUploading(false);
  }

  function updateItem(index: number, patch: Partial<Item>) {
    setItems((prev) =>
      prev.map((row, i) => (i === index ? { ...row, ...patch } : row))
    );
  }

  function reset() {
    setItems([]);
    setTopLevelError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  const allDone =
    items.length > 0 &&
    !isUploading &&
    items.every((it) => it.status === "done" || it.status === "error");
  const summarySuccessCount = items.filter((it) => it.status === "done").length;
  const summaryErrorCount = items.filter((it) => it.status === "error").length;

  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-card">
      <h2 className="font-heading text-lg font-semibold text-primary">
        Upload photos
      </h2>
      <p className="mt-1 text-sm text-textSecondary">
        Pick one or many at once. JPEG, PNG, WebP, or GIF; 5 MB per file.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileChange}
          disabled={isUploading}
          className="block w-full text-sm text-textSecondary file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-wide file:text-white hover:file:bg-primary/90 disabled:opacity-50"
        />
        <button
          type="button"
          onClick={handleUpload}
          disabled={isUploading || items.length === 0 || items.every((it) => it.status !== "pending")}
          className="rounded-md bg-accent px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUploading ? "Uploading…" : "Upload"}
        </button>
      </div>

      {topLevelError ? (
        <p className="mt-3 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-600">
          {topLevelError}
        </p>
      ) : null}

      {items.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {items.map((it) => (
            <li
              key={it.id}
              className="rounded-md border border-border bg-light px-3 py-2 text-sm"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="truncate font-semibold text-textPrimary">
                  {it.file.name}
                </span>
                <span className="shrink-0 text-xs text-textSecondary">
                  <StatusLabel item={it} />
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
                <div
                  className={`h-full transition-all ${
                    it.status === "error"
                      ? "bg-red-500"
                      : it.status === "done"
                        ? "bg-success"
                        : "bg-accent"
                  }`}
                  style={{
                    width: `${
                      it.status === "done"
                        ? 100
                        : it.status === "error"
                          ? 100
                          : it.percentage
                    }%`
                  }}
                />
              </div>
              {it.message ? (
                <p
                  className={`mt-1 text-xs ${
                    it.status === "error" ? "text-red-600" : "text-textSecondary"
                  }`}
                >
                  {it.message}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}

      {allDone ? (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-md border border-success/40 bg-success/10 px-3 py-2 text-sm text-success">
          <span>
            {summarySuccessCount} uploaded
            {summaryErrorCount > 0 ? `, ${summaryErrorCount} failed` : ""}.
          </span>
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-success/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide hover:bg-success/20"
          >
            Clear
          </button>
        </div>
      ) : null}
    </section>
  );
}

function StatusLabel({ item }: { item: Item }) {
  if (item.status === "pending") return <>Ready</>;
  if (item.status === "uploading")
    return <>{Math.round(item.percentage)}%</>;
  if (item.status === "done") return <>✓ Done</>;
  return <>✗ Failed</>;
}
