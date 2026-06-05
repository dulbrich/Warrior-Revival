"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Fuse from "fuse.js";
import type { EventForDisplay, EventStatus } from "@/lib/events/types";
import type { Role } from "@/lib/auth/role";
import { setEventStatusAction } from "./actions";
import { STATUS_TABS, type StatusTab } from "./statusTabs";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const weekdayLabels = ["S", "M", "T", "W", "Th", "F", "S"];

const fuseOptions = {
  keys: ["name", "location", "category", "timeLabel", "dateLabel", "address", "notes"],
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2
};

const formatDateKey = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const getMonthKey = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
};

const formatMonthLabel = (date: Date) =>
  `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

const buildCalendarCells = (monthDate: Date) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const startWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<{ dateKey: string; day: number } | null> = [];
  for (let i = 0; i < startWeekday; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) {
    cells.push({ dateKey: formatDateKey(new Date(year, month, d)), day: d });
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
};

type EventWithDate = EventForDisplay & { dateValue: Date };

type Props = {
  events: EventForDisplay[];
  initialStatus: StatusTab;
  viewerId: string;
  viewerRole: Role;
};

function canEditEvent(event: EventForDisplay, role: Role, viewerId: string): boolean {
  if (role === "admin") return true;
  return event.createdBy === viewerId && event.status === "pending";
}

export default function AdminEventsBoard({
  events,
  initialStatus,
  viewerId,
  viewerRole
}: Props) {
  const [selectedStatus, setSelectedStatus] = useState<StatusTab>(initialStatus);
  const [query, setQuery] = useState("");
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const eventsWithDate = useMemo<EventWithDate[]>(
    () =>
      events.map((e) => ({
        ...e,
        dateValue: new Date(`${e.dateIso}T00:00:00`)
      })),
    [events]
  );

  // Counts shown on the status tabs are over the entire dataset, ignoring the
  // current past-events / month / search filters, so admins can see the full
  // queue size at a glance regardless of what's currently visible.
  const statusCounts = useMemo(
    () =>
      events.reduce(
        (acc, e) => {
          acc.all += 1;
          acc[e.status] += 1;
          return acc;
        },
        { all: 0, pending: 0, approved: 0, removed: 0 }
      ),
    [events]
  );

  const statusFiltered = useMemo(() => {
    if (selectedStatus === "all") return eventsWithDate;
    return eventsWithDate.filter((e) => e.status === selectedStatus);
  }, [eventsWithDate, selectedStatus]);

  const dateFiltered = useMemo(() => {
    if (showPastEvents) return statusFiltered;
    return statusFiltered.filter((e) => e.dateValue >= today);
  }, [statusFiltered, showPastEvents, today]);

  const monthOptions = useMemo(() => {
    const map = new Map<string, { key: string; label: string; dateValue: Date }>();
    dateFiltered.forEach((e) => {
      const key = getMonthKey(e.dateValue);
      if (!map.has(key)) {
        map.set(key, {
          key,
          label: formatMonthLabel(e.dateValue),
          dateValue: new Date(
            e.dateValue.getFullYear(),
            e.dateValue.getMonth(),
            1
          )
        });
      }
    });
    return Array.from(map.values()).sort(
      (a, b) => a.dateValue.getTime() - b.dateValue.getTime()
    );
  }, [dateFiltered]);

  useEffect(() => {
    if (selectedMonth !== "all" && !monthOptions.some((o) => o.key === selectedMonth)) {
      setSelectedMonth("all");
    }
  }, [monthOptions, selectedMonth]);

  const monthFiltered = useMemo(() => {
    if (selectedMonth === "all") return dateFiltered;
    return dateFiltered.filter((e) => getMonthKey(e.dateValue) === selectedMonth);
  }, [dateFiltered, selectedMonth]);

  const fuse = useMemo(() => new Fuse(monthFiltered, fuseOptions), [monthFiltered]);
  const visible = useMemo(() => {
    const trimmed = query.trim();
    const base = trimmed ? fuse.search(trimmed).map((r) => r.item) : monthFiltered;
    return [...base].sort((a, b) => a.dateValue.getTime() - b.dateValue.getTime());
  }, [monthFiltered, fuse, query]);

  const listItems = useMemo(() => {
    const items: Array<
      | { type: "month"; key: string; label: string }
      | { type: "event"; event: EventWithDate }
    > = [];
    let currentMonthKey = "";
    visible.forEach((e) => {
      const k = getMonthKey(e.dateValue);
      if (k !== currentMonthKey) {
        items.push({ type: "month", key: k, label: formatMonthLabel(e.dateValue) });
        currentMonthKey = k;
      }
      items.push({ type: "event", event: e });
    });
    return items;
  }, [visible]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, EventWithDate[]>();
    visible.forEach((e) => {
      const list = map.get(e.dateIso) ?? [];
      list.push(e);
      map.set(e.dateIso, list);
    });
    return map;
  }, [visible]);

  useEffect(() => {
    if (visible.length === 0) {
      setSelectedEventId(null);
      return;
    }
    const exists = selectedEventId && visible.some((e) => e.id === selectedEventId);
    if (!exists) setSelectedEventId(visible[0].id);
  }, [visible, selectedEventId]);

  const selectedEvent = selectedEventId
    ? visible.find((e) => e.id === selectedEventId) ?? null
    : visible[0] ?? null;

  useEffect(() => {
    if (!selectedEvent) return;
    const d = new Date(`${selectedEvent.dateIso}T00:00:00`);
    setCalendarMonth(new Date(d.getFullYear(), d.getMonth(), 1));
  }, [selectedEvent]);

  useEffect(() => {
    if (selectedMonth === "all") return;
    const [y, m] = selectedMonth.split("-");
    setCalendarMonth(new Date(Number(y), Number(m) - 1, 1));
  }, [selectedMonth]);

  const handleMonthNav = (delta: number) => {
    const next = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth() + delta,
      1
    );
    setCalendarMonth(next);
    if (selectedMonth !== "all") setSelectedMonth(getMonthKey(next));
  };

  const handleCalendarSelect = (dateKey: string, openDetail = false) => {
    const evs = eventsByDate.get(dateKey);
    if (!evs || evs.length === 0) return;
    setSelectedEventId(evs[0].id);
    if (openDetail) setIsDetailOpen(true);
  };

  const calendarCells = useMemo(
    () => buildCalendarCells(calendarMonth),
    [calendarMonth]
  );

  return (
    <main className="mx-auto max-w-screen-2xl px-4 py-8 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-accent text-sm uppercase tracking-[0.3em] text-secondary">
            Events
          </p>
          <h1 className="mt-2 font-blackOps text-3xl font-normal text-primary md:text-4xl">
            Manage events
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/admin/events/import"
            className="rounded-md border border-primary px-4 py-2 text-sm font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/10"
          >
            Import JSON
          </a>
          <a
            href="/admin/events/new"
            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-accent/90"
          >
            + New event
          </a>
        </div>
      </div>

      <div className="mt-6 lg:grid lg:grid-cols-[220px_minmax(0,1fr)_360px] lg:items-start lg:gap-6">
        {/* LEFT — calendar + month list + past toggle (desktop) */}
        <aside className="hidden space-y-4 lg:block">
          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleMonthNav(-1)}
                aria-label="Previous month"
                className="rounded-md border border-border px-2 py-1 text-xs font-semibold text-textSecondary transition hover:bg-primary/10 hover:text-primary"
              >
                {"<"}
              </button>
              <p className="text-sm font-semibold text-primary">
                {formatMonthLabel(calendarMonth)}
              </p>
              <button
                type="button"
                onClick={() => handleMonthNav(1)}
                aria-label="Next month"
                className="rounded-md border border-border px-2 py-1 text-xs font-semibold text-textSecondary transition hover:bg-primary/10 hover:text-primary"
              >
                {">"}
              </button>
            </div>
            <div className="mt-4 grid grid-cols-7 text-[11px] font-semibold text-textSecondary">
              {weekdayLabels.map((label) => (
                <span key={label} className="text-center">
                  {label}
                </span>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-7 gap-1 text-xs">
              {calendarCells.map((cell, index) => {
                if (!cell) return <span key={`empty-${index}`} />;
                const has = eventsByDate.has(cell.dateKey);
                if (!has) {
                  return (
                    <span
                      key={cell.dateKey}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-textSecondary/50"
                    >
                      {cell.day}
                    </span>
                  );
                }
                return (
                  <button
                    key={cell.dateKey}
                    type="button"
                    onClick={() => handleCalendarSelect(cell.dateKey)}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-accent text-accent transition hover:bg-accent/10"
                  >
                    {cell.day}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-textSecondary">
              Months
            </p>
            <div className="mt-3 flex flex-col gap-2">
              <button
                type="button"
                className={`rounded-md border px-3 py-2 text-left text-sm font-semibold transition ${
                  selectedMonth === "all"
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border text-textSecondary hover:bg-primary/10 hover:text-primary"
                }`}
                onClick={() => setSelectedMonth("all")}
              >
                All months
              </button>
              {monthOptions.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  className={`rounded-md border px-3 py-2 text-left text-sm font-semibold transition ${
                    selectedMonth === option.key
                      ? "border-primary/50 bg-primary/10 text-primary"
                      : "border-border text-textSecondary hover:bg-primary/10 hover:text-primary"
                  }`}
                  onClick={() => setSelectedMonth(option.key)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface p-4 text-sm font-semibold text-textPrimary">
            <span>Show past events</span>
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-accent"
              checked={showPastEvents}
              onChange={(e) => setShowPastEvents(e.target.checked)}
            />
          </label>
        </aside>

        {/* MIDDLE — search + status tabs + list */}
        <div className="min-w-0">
          {/* Mobile filters trigger */}
          <div className="mb-4 flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setIsFiltersOpen(true)}
              className="rounded-md border border-border px-3 py-2 text-xs font-semibold uppercase tracking-wide text-textSecondary transition hover:border-primary hover:text-primary"
            >
              ☰ Filters
            </button>
            <p className="text-xs text-textSecondary">
              {visible.length} shown · past {showPastEvents ? "on" : "off"}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="search"
              className="h-11 w-full rounded-md border border-border bg-white px-3 text-sm text-textPrimary placeholder:text-textSecondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:flex-1"
              placeholder="Search events…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setQuery("")}
              className="h-11 rounded-md border border-primary px-4 text-xs font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Clear
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 border-b border-border">
            {STATUS_TABS.map((tab) => {
              const isActive = tab === selectedStatus;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSelectedStatus(tab)}
                  className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold uppercase tracking-wide transition ${
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-textSecondary hover:text-primary"
                  }`}
                >
                  {tab}{" "}
                  <span className="ml-1 text-xs opacity-70">
                    ({statusCounts[tab]})
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-3 hidden text-xs text-textSecondary lg:block">
            Showing {visible.length} of {dateFiltered.length} in this status
          </p>

          <div className="mt-3 space-y-3">
            {listItems.length === 0 ? (
              <p className="rounded-xl border border-dashed border-border bg-surface px-5 py-8 text-center text-sm text-textSecondary">
                No events match the current filters.
              </p>
            ) : (
              listItems.map((item, index) => {
                if (item.type === "month") {
                  return (
                    <div
                      key={`month-${item.key}`}
                      className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-textSecondary ${
                        index === 0 ? "" : "mt-6"
                      }`}
                    >
                      <span className="whitespace-nowrap">{item.label}</span>
                      <span className="h-px flex-1 bg-border" />
                    </div>
                  );
                }
                const event = item.event;
                const isSelected = event.id === selectedEventId;
                return (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => {
                      setSelectedEventId(event.id);
                      setIsDetailOpen(true);
                    }}
                    className={`flex w-full gap-4 rounded-xl p-4 text-left shadow-soft transition ${
                      isSelected
                        ? "border-2 border-primary/60 bg-primary/5"
                        : "border border-border bg-surface hover:-translate-y-0.5 hover:border-primary/40"
                    }`}
                  >
                    <Image
                      src={event.image}
                      alt=""
                      width={56}
                      height={56}
                      className="h-14 w-14 flex-shrink-0 rounded-md border border-border bg-white object-cover"
                    />
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusPill status={event.status} />
                        <p className="text-xs font-semibold uppercase tracking-wide text-textSecondary">
                          {event.dateLabel}
                        </p>
                      </div>
                      <p className="truncate font-heading text-base font-semibold text-primary">
                        {event.name}
                      </p>
                      <p className="truncate text-xs text-textSecondary">
                        {event.location}
                        {event.timeLabel ? ` · ${event.timeLabel}` : ""}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT — detail pane (desktop) */}
        <aside className="hidden lg:sticky lg:top-[7.25rem] lg:block">
          <div className="rounded-xl border border-border bg-surface p-5 shadow-soft">
            {selectedEvent ? (
              <EventDetailPanel
                event={selectedEvent}
                viewerRole={viewerRole}
                viewerId={viewerId}
              />
            ) : (
              <p className="text-sm text-textSecondary">
                Select an event to see details.
              </p>
            )}
          </div>
        </aside>
      </div>

      {/* MOBILE — filters drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          isFiltersOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          aria-hidden="true"
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            isFiltersOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsFiltersOpen(false)}
        />
        <div
          className={`absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl border border-border bg-surface p-5 shadow-2xl transition-transform duration-300 ${
            isFiltersOpen ? "translate-y-0" : "translate-y-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Event filters"
        >
          <div className="flex items-center justify-between">
            <p className="font-heading text-xl font-semibold text-primary">Filters</p>
            <button
              type="button"
              onClick={() => setIsFiltersOpen(false)}
              className="rounded-full border border-border px-3 py-2 text-xs font-semibold uppercase tracking-wide text-textSecondary"
            >
              Close
            </button>
          </div>

          <div className="mt-5 space-y-4">
            <label className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-white p-4 text-sm font-semibold text-textPrimary">
              <span>Show past events</span>
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-accent"
                checked={showPastEvents}
                onChange={(e) => setShowPastEvents(e.target.checked)}
              />
            </label>

            <div className="rounded-2xl border border-border bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-textSecondary">
                Months
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <button
                  type="button"
                  className={`rounded-md border px-3 py-2 text-left text-sm font-semibold transition ${
                    selectedMonth === "all"
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border text-textSecondary"
                  }`}
                  onClick={() => {
                    setSelectedMonth("all");
                    setIsFiltersOpen(false);
                  }}
                >
                  All months
                </button>
                {monthOptions.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    className={`rounded-md border px-3 py-2 text-left text-sm font-semibold transition ${
                      selectedMonth === option.key
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-border text-textSecondary"
                    }`}
                    onClick={() => {
                      setSelectedMonth(option.key);
                      setIsFiltersOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-white p-4">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleMonthNav(-1)}
                  aria-label="Previous month"
                  className="rounded-full border border-border px-3 py-2 text-xs font-semibold text-textSecondary"
                >
                  ←
                </button>
                <p className="text-sm font-semibold text-primary">
                  {formatMonthLabel(calendarMonth)}
                </p>
                <button
                  type="button"
                  onClick={() => handleMonthNav(1)}
                  aria-label="Next month"
                  className="rounded-full border border-border px-3 py-2 text-xs font-semibold text-textSecondary"
                >
                  →
                </button>
              </div>
              <div className="mt-4 grid grid-cols-7 text-[11px] font-semibold text-textSecondary">
                {weekdayLabels.map((label) => (
                  <span key={label} className="text-center">
                    {label}
                  </span>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-7 gap-2 text-xs">
                {calendarCells.map((cell, index) => {
                  if (!cell) return <span key={`m-empty-${index}`} />;
                  const has = eventsByDate.has(cell.dateKey);
                  if (!has)
                    return (
                      <span
                        key={cell.dateKey}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-textSecondary/40"
                      >
                        {cell.day}
                      </span>
                    );
                  return (
                    <button
                      key={cell.dateKey}
                      type="button"
                      onClick={() => {
                        handleCalendarSelect(cell.dateKey, true);
                        setIsFiltersOpen(false);
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-accent bg-accent/10 text-accent"
                    >
                      {cell.day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE — detail drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          isDetailOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          aria-hidden="true"
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            isDetailOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsDetailOpen(false)}
        />
        <div
          className={`absolute bottom-0 left-0 right-0 max-h-[85vh] rounded-t-3xl border border-border bg-surface shadow-2xl transition-transform duration-300 ${
            isDetailOpen ? "translate-y-0" : "translate-y-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Event details"
        >
          {selectedEvent ? (
            <div className="flex max-h-[85vh] flex-col">
              <div className="flex items-start justify-between border-b border-border px-5 py-4">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-textSecondary">
                    Event details
                  </p>
                  <p className="truncate font-heading text-xl font-semibold text-primary">
                    {selectedEvent.name}
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-full border border-border px-3 py-2 text-xs font-semibold uppercase tracking-wide text-textSecondary"
                  onClick={() => setIsDetailOpen(false)}
                >
                  Close
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-4">
                <EventDetailPanel
                  event={selectedEvent}
                  viewerRole={viewerRole}
                  viewerId={viewerId}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}

function EventDetailPanel({
  event,
  viewerRole,
  viewerId
}: {
  event: EventForDisplay;
  viewerRole: Role;
  viewerId: string;
}) {
  const editable = canEditEvent(event, viewerRole, viewerId);
  return (
    <div className="space-y-4">
      <div className="relative h-44 w-full overflow-hidden rounded-lg border border-border bg-white">
        <Image
          src={event.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 22rem, 100vw"
          className="object-contain"
        />
      </div>
      <div>
        <StatusPill status={event.status} />
        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-textSecondary">
          {event.dateLabel}
        </p>
        <p className="mt-1 font-heading text-2xl font-semibold text-primary">
          {event.name}
        </p>
        <p className="mt-1 text-sm text-textSecondary">{event.location}</p>
      </div>

      <dl className="grid grid-cols-[80px_1fr] gap-x-3 gap-y-2 text-sm text-textSecondary">
        <dt className="font-bold text-primary">Date</dt>
        <dd>{event.dateLabel}</dd>
        {event.timeLabel ? (
          <>
            <dt className="font-bold text-primary">Time</dt>
            <dd>{event.timeLabel}</dd>
          </>
        ) : null}
        <dt className="font-bold text-primary">Location</dt>
        <dd>{event.location}</dd>
        {event.address ? (
          <>
            <dt className="font-bold text-primary">Address</dt>
            <dd>{event.address}</dd>
          </>
        ) : null}
        {event.category ? (
          <>
            <dt className="font-bold text-primary">Audience</dt>
            <dd>{event.category}</dd>
          </>
        ) : null}
        {event.contact ? (
          <>
            <dt className="font-bold text-primary">Contact</dt>
            <dd>
              {event.contact.name}
              {event.contact.name && event.contact.phone ? " · " : ""}
              {event.contact.phone}
            </dd>
          </>
        ) : null}
      </dl>

      {event.notes ? (
        <div className="rounded-md border border-border bg-light px-3 py-2 text-xs text-textSecondary">
          {event.notes}
        </div>
      ) : null}

      {event.register_link ? (
        <a
          href={event.register_link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full items-center justify-center rounded-md border border-primary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/10"
        >
          Open registration ↗
        </a>
      ) : null}

      {viewerRole === "admin" || editable ? (
        <div className="flex flex-wrap gap-2 border-t border-border pt-4">
          {editable ? (
            <a
              href={`/admin/events/${event.id}`}
              className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-textSecondary transition hover:border-primary hover:text-primary"
            >
              Edit
            </a>
          ) : null}
          {viewerRole === "admin" ? <StatusButtons event={event} /> : null}
        </div>
      ) : null}
    </div>
  );
}

function StatusButtons({ event }: { event: EventForDisplay }) {
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
      className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${cls}`}
    >
      {status}
    </span>
  );
}
