// Shared constants for the events admin status filter. Lives in a neutral
// (no "use client") module so both the server page and the client board can
// import it — values exported from a "use client" module become client
// references and can't be called from server code.

import type { EventStatus } from "@/lib/events/types";

export type StatusTab = "all" | EventStatus;
export const STATUS_TABS: readonly StatusTab[] = [
  "all",
  "pending",
  "approved",
  "removed"
];
