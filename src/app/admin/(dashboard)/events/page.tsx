import Image from "next/image";
import { fetchAllEventsForAdmin } from "@/lib/events/queries";
import { formatEventDate } from "@/lib/events/format";
import { resolveEventImage } from "@/lib/events/imageKeys";
import { EVENT_STATUSES } from "@/lib/events/schema";
import type { EventRow, EventStatus } from "@/lib/events/types";
import { setEventStatusAction } from "./actions";

type StatusTab = "all" | EventStatus;
const STATUS_TABS: StatusTab[] = ["all", "pending", "approved", "removed"];

export default async function AdminEventsPage({
  searchParams
}: {
  searchParams?: { status?: string };
}) {
  const events = await fetchAllEventsForAdmin();

  const requestedTab = (searchParams?.status ?? "pending") as StatusTab;
  const activeTab: StatusTab = STATUS_TABS.includes(requestedTab) ? requestedTab : "pending";

  const counts = events.reduce(
    (acc, e) => {
      acc.all += 1;
      acc[e.status] += 1;
      return acc;
    },
    { all: 0, pending: 0, approved: 0, removed: 0 }
  );

  const visible = activeTab === "all" ? events : events.filter((e) => e.status === activeTab);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-accent text-sm uppercase tracking-[0.3em] text-secondary">
            Events
          </p>
          <h1 className="mt-2 font-blackOps text-3xl font-normal text-primary md:text-4xl">
            Manage events
          </h1>
        </div>
        <a
          href="/admin/events/new"
          className="rounded-md bg-accent px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-accent/90"
        >
          + New event
        </a>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 border-b border-border">
        {STATUS_TABS.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <a
              key={tab}
              href={`/admin/events?status=${tab}`}
              className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold uppercase tracking-wide transition ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-textSecondary hover:text-primary"
              }`}
            >
              {tab} <span className="ml-1 text-xs opacity-70">({counts[tab]})</span>
            </a>
          );
        })}
      </div>

      <div className="mt-6 space-y-3">
        {visible.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border bg-surface px-5 py-8 text-center text-sm text-textSecondary">
            No {activeTab === "all" ? "" : activeTab + " "}events.
          </p>
        ) : (
          visible.map((event) => <Row key={event.id} event={event} />)
        )}
      </div>
    </main>
  );
}

function Row({ event }: { event: EventRow }) {
  const image = resolveEventImage(event.image_key);
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 shadow-soft sm:flex-row sm:items-center">
      <Image
        src={image}
        alt=""
        width={64}
        height={64}
        className="h-16 w-16 flex-shrink-0 rounded-md border border-border bg-white object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <StatusPill status={event.status} />
          <p className="text-xs font-semibold uppercase tracking-wide text-textSecondary">
            {formatEventDate(event.event_date)}
          </p>
        </div>
        <a
          href={`/admin/events/${event.id}`}
          className="mt-1 block truncate font-heading text-lg font-semibold text-primary hover:underline"
        >
          {event.name}
        </a>
        <p className="truncate text-sm text-textSecondary">{event.location}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={`/admin/events/${event.id}`}
          className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-textSecondary transition hover:border-primary hover:text-primary"
        >
          Edit
        </a>
        <StatusButtons event={event} />
      </div>
    </div>
  );
}

function StatusButtons({ event }: { event: EventRow }) {
  switch (event.status) {
    case "pending":
      return (
        <>
          <StatusButton id={event.id} next="approved" label="Approve" variant="primary" />
          <StatusButton id={event.id} next="removed" label="Reject" variant="muted" />
        </>
      );
    case "approved":
      return (
        <StatusButton id={event.id} next="removed" label="Take down" variant="muted" />
      );
    case "removed":
      return (
        <StatusButton id={event.id} next="approved" label="Restore" variant="primary" />
      );
  }
}

function StatusButton({
  id,
  next,
  label,
  variant
}: {
  id: string;
  next: EventStatus;
  label: string;
  variant: "primary" | "muted";
}) {
  const cls =
    variant === "primary"
      ? "rounded-md bg-success px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:opacity-90"
      : "rounded-md border border-border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-textSecondary transition hover:border-primary hover:text-primary";
  return (
    <form action={setEventStatusAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={next} />
      <button type="submit" className={cls}>
        {label}
      </button>
    </form>
  );
}

function StatusPill({ status }: { status: EventStatus }) {
  const cls = {
    pending: "bg-warning/15 text-warning",
    approved: "bg-success/15 text-success",
    removed: "bg-textSecondary/15 text-textSecondary"
  }[status];
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${cls}`}
    >
      {status}
    </span>
  );
}
