// Shared types/constants for the JSON event importer. Kept out of actions.ts
// because that file carries the "use server" directive, under which EVERY
// export must be an async server action — exporting a plain object/type there
// turns it into a server-action reference (undefined on the client).

export type ImportState = {
  status: "idle" | "success" | "error";
  // Top-level message (fatal parse error, auth error, or summary headline).
  message: string | null;
  // Per-category counts for the result summary.
  summary: {
    total: number;
    created: number;
    duplicatesInFile: number;
    duplicatesExisting: number;
    invalid: number;
  } | null;
  // Detailed per-entry problems so the admin can fix and re-upload.
  invalid: { label: string; messages: string[] }[];
  duplicates: { label: string; reason: "in-file" | "already-exists" }[];
};

export const initialImportState: ImportState = {
  status: "idle",
  message: null,
  summary: null,
  invalid: [],
  duplicates: []
};
