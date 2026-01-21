"use client";

import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { events } from "@/data/events";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "#" },
  { label: "Programs", href: "#" },
  { label: "Events", href: "/events" },
  { label: "Get Involved", href: "#" },
  { label: "Partners", href: "#" },
  { label: "Gallery", href: "#" },
  { label: "Donate", href: "#" },
  { label: "Contact", href: "#" }
];

const eventTypeFilters = [
  {
    id: "hikes",
    label: "Hikes",
    match: (event: (typeof events)[number]) => /hike/i.test(event.name)
  },
  {
    id: "coffee",
    label: "Coffee hours",
    match: (event: (typeof events)[number]) => /coffee hour/i.test(event.name)
  },
  {
    id: "lunch",
    label: "Lunch with Vets",
    match: (event: (typeof events)[number]) => /lunch with vets/i.test(event.name)
  },
  {
    id: "other",
    label: "Other events",
    match: (event: (typeof events)[number]) =>
      !/hike|coffee hour|lunch with vets/i.test(event.name)
  }
];

const fuseOptions = {
  keys: [
    "name",
    "location",
    "category",
    "timeLabel",
    "dateLabel",
    "address",
    "notes",
    "contact.name",
    "contact.phone"
  ],
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2
};

const buildEventId = (event: (typeof events)[number]) => `${event.name}-${event.dateIso}`;

const formatDateOnly = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
};

const formatDateTime = (dateIso: string, hours: number, minutes: number) => {
  const date = dateIso.replace(/-/g, "");
  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  return `${date}T${hh}${mm}00`;
};

const formatUtcStamp = (date: Date) => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
};

const escapeIcsText = (value: string) =>
  value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

const parseTimeRange = (timeLabel: string) => {
  const match = timeLabel.match(/(\d{1,2}:\d{2})\s*(am|pm)\s*-\s*(\d{1,2}:\d{2})\s*(am|pm)/i);
  if (!match) {
    return null;
  }

  const to24Hour = (time: string, meridiem: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const isPm = meridiem.toLowerCase() === "pm";
    const normalized = hours % 12 + (isPm ? 12 : 0);
    return { hours: normalized, minutes };
  };

  const start = to24Hour(match[1], match[2]);
  const end = to24Hour(match[3], match[4]);
  return { start, end };
};

const buildCalendarLinks = (event: (typeof events)[number]) => {
  const timeRange = parseTimeRange(event.timeLabel);
  const locationText = event.address ? `${event.location} (${event.address})` : event.location;
  let startValue = "";
  let endValue = "";
  let allDay = false;

  if (timeRange) {
    startValue = formatDateTime(event.dateIso, timeRange.start.hours, timeRange.start.minutes);
    endValue = formatDateTime(event.dateIso, timeRange.end.hours, timeRange.end.minutes);
  } else {
    const startDate = new Date(`${event.dateIso}T00:00:00`);
    const endDate = new Date(`${event.dateIso}T00:00:00`);
    endDate.setDate(endDate.getDate() + 1);
    startValue = formatDateOnly(startDate);
    endValue = formatDateOnly(endDate);
    allDay = true;
  }

  const googleUrl = new URL("https://calendar.google.com/calendar/render");
  googleUrl.searchParams.set("action", "TEMPLATE");
  googleUrl.searchParams.set("text", event.name);
  googleUrl.searchParams.set("details", event.notes ?? "");
  googleUrl.searchParams.set("location", locationText);
  googleUrl.searchParams.set("dates", `${startValue}/${endValue}`);

  const nowStamp = formatUtcStamp(new Date());
  const uid = `${event.dateIso}-${event.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Warrior Revival//Events//EN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${nowStamp}`,
    `SUMMARY:${escapeIcsText(event.name)}`,
    allDay ? `DTSTART;VALUE=DATE:${startValue}` : `DTSTART:${startValue}`,
    allDay ? `DTEND;VALUE=DATE:${endValue}` : `DTEND:${endValue}`,
    `LOCATION:${escapeIcsText(locationText)}`,
    event.notes ? `DESCRIPTION:${escapeIcsText(event.notes)}` : null,
    "END:VEVENT",
    "END:VCALENDAR"
  ].filter(Boolean);

  const icsContent = `${icsLines.join("\r\n")}\r\n`;
  const icsUrl = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;

  return {
    googleUrl: googleUrl.toString(),
    icsUrl,
    icsFilename: `${uid}.ics`
  };
};

export default function EventsPage() {
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(() =>
    new Set(eventTypeFilters.map((filter) => filter.id))
  );
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const eventsWithDate = useMemo(
    () =>
      events.map((event) => ({
        ...event,
        dateValue: new Date(`${event.dateIso}T00:00:00`)
      })),
    []
  );

  const baseEvents = useMemo(() => {
    let list = eventsWithDate.filter((event) => !Number.isNaN(event.dateValue.getTime()));

    if (!showPastEvents) {
      list = list.filter((event) => event.dateValue >= today);
    }

    const activeFilters = eventTypeFilters.filter((filter) => selectedFilters.has(filter.id));
    if (activeFilters.length === 0) {
      return [];
    }

    list = list.filter((event) => activeFilters.some((filter) => filter.match(event)));

    return [...list].sort((a, b) => a.dateValue.getTime() - b.dateValue.getTime());
  }, [eventsWithDate, selectedFilters, showPastEvents, today]);

  const fuse = useMemo(() => new Fuse(baseEvents, fuseOptions), [baseEvents]);

  const visibleEvents = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      return baseEvents;
    }
    const results = fuse.search(trimmed).map((result) => result.item);
    return [...results].sort((a, b) => a.dateValue.getTime() - b.dateValue.getTime());
  }, [baseEvents, fuse, query]);

  useEffect(() => {
    if (visibleEvents.length === 0) {
      setSelectedEventId(null);
      return;
    }

    const exists = selectedEventId
      ? visibleEvents.some((event) => buildEventId(event) === selectedEventId)
      : false;

    if (!exists) {
      setSelectedEventId(buildEventId(visibleEvents[0]));
    }
  }, [selectedEventId, visibleEvents]);

  const selectedEvent = selectedEventId
    ? visibleEvents.find((event) => buildEventId(event) === selectedEventId) ?? null
    : visibleEvents[0] ?? null;

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) => {
      const next = new Set(prev);
      if (next.has(filterId)) {
        next.delete(filterId);
      } else {
        next.add(filterId);
      }
      return next;
    });
  };

  const renderDetails = (event: (typeof events)[number]) => {
    const calendarLinks = buildCalendarLinks(event);

    return (
      <div className="mt-4 grid gap-3 text-sm text-textSecondary">
        <div className="grid grid-cols-[90px_1fr] gap-3">
          <span className="font-semibold text-primary">Date</span>
          <span>{event.dateLabel}</span>
        </div>
        <div className="grid grid-cols-[90px_1fr] gap-3">
          <span className="font-semibold text-primary">Time</span>
          <span>{event.timeLabel}</span>
        </div>
        <div className="grid grid-cols-[90px_1fr] gap-3">
          <span className="font-semibold text-primary">Location</span>
          <span>{event.location}</span>
        </div>
        {event.address ? (
          <div className="grid grid-cols-[90px_1fr] gap-3">
            <span className="font-semibold text-primary">Address</span>
            <span>{event.address}</span>
          </div>
        ) : null}
        <div className="grid grid-cols-[90px_1fr] gap-3">
          <span className="font-semibold text-primary">Category</span>
          <span>{event.category}</span>
        </div>
        {event.contact ? (
          <div className="grid grid-cols-[90px_1fr] gap-3">
            <span className="font-semibold text-primary">Contact</span>
            <span>
              {event.contact.name} ·{" "}
              <a
                className="font-semibold text-secondary hover:text-primary"
                href={`tel:${event.contact.phone.replace(/[^0-9+]/g, "")}`}
              >
                {event.contact.phone}
              </a>
            </span>
          </div>
        ) : null}
        {event.notes ? (
          <div className="rounded-md border border-border bg-white px-3 py-2 text-xs text-textSecondary">
            {event.notes}
          </div>
        ) : null}
        <div className="flex flex-col gap-2 sm:flex-row">
          <a
            href={calendarLinks.googleUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-md border border-primary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Add to Google Calendar
          </a>
          <a
            href={calendarLinks.icsUrl}
            download={calendarLinks.icsFilename}
            className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Download iCal
          </a>
        </div>
        {event.register_link ? (
          <a
            href={event.register_link}
            className="inline-flex w-fit items-center justify-center rounded-md bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Register now
          </a>
        ) : null}
      </div>
    );
  };

  return (
    <main className="bg-light">
      <header className="sticky top-0 z-20 border-b border-border bg-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <img src="/logo.webp" alt="Warrior Revival logo" className="h-12 w-12" />
            <div>
              <p className="font-heading text-lg font-semibold text-primary">Warrior Revival</p>
              <p className="text-xs uppercase tracking-[0.2em] text-textSecondary">
                Military, Transition, Community
              </p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-textSecondary lg:flex">
            {navigation.slice(0, 7).map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <button className="inline-flex items-center justify-center rounded-md border border-primary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              Join
            </button>
            <button className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              Donate
            </button>
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="sr-only">Toggle menu</span>
            <span className="relative block h-5 w-6" aria-hidden="true">
              <span
                className={`absolute left-0 top-0 h-0.5 w-6 bg-current transition duration-300 ${
                  isMenuOpen ? "translate-y-[9px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-2 h-0.5 w-6 bg-current transition duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-4 h-0.5 w-6 bg-current transition duration-300 ${
                  isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        id="mobile-navigation"
        className={`lg:hidden overflow-hidden border-b border-border bg-surface/95 backdrop-blur transition-[max-height,opacity] duration-300 ease-out ${
          isMenuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <nav className="mx-auto max-w-7xl px-4 pb-4 md:px-8">
          <div className="grid gap-2 pt-2 text-sm font-semibold text-textSecondary">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-md px-3 py-2 transition hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-12 md:px-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            Events
          </p>
          <h1 className="font-heading text-3xl font-semibold text-primary md:text-4xl">
            Explore upcoming events
          </h1>
          <p className="text-sm text-textSecondary">
            Search within the filtered list by event name, location, category, or date.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            className="h-11 w-full rounded-md border border-border bg-white px-3 text-sm text-textPrimary placeholder:text-textSecondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:flex-1"
            placeholder="Search events..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            type="button"
            className="h-11 rounded-md border border-primary px-4 text-xs font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={() => setQuery("")}
          >
            Clear
          </button>
        </div>

        <div className="mt-4 rounded-xl border border-border bg-surface p-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-textSecondary">
            Filters
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {eventTypeFilters.map((filter) => (
              <label key={filter.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-accent"
                  checked={selectedFilters.has(filter.id)}
                  onChange={() => toggleFilter(filter.id)}
                />
                <span className="font-semibold text-textPrimary">{filter.label}</span>
              </label>
            ))}
            <label className="flex items-center gap-2 text-sm font-semibold text-primary">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-accent"
                checked={showPastEvents}
                onChange={(event) => setShowPastEvents(event.target.checked)}
              />
              Show past events
            </label>
          </div>
        </div>

        <p className="mt-3 text-xs text-textSecondary">
          Showing {visibleEvents.length} of {eventsWithDate.length} events
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-4">
            {visibleEvents.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-surface p-6 text-sm text-textSecondary">
                No events match your filters.
              </div>
            ) : (
              visibleEvents.map((event) => {
                const eventId = buildEventId(event);
                const isSelected = eventId === selectedEventId;

                return (
                  <details
                    key={eventId}
                    className={`group rounded-xl border border-border bg-surface p-4 shadow-soft transition ${
                      isSelected ? "border-primary/50" : ""
                    }`}
                  >
                    <summary
                      className="flex cursor-pointer flex-col gap-4 [&::-webkit-details-marker]:hidden sm:flex-row sm:items-center sm:justify-between"
                      onClick={() => setSelectedEventId(eventId)}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <img
                          src="/logo.webp"
                          alt="Warrior Revival"
                          className="h-12 w-12 rounded-md border border-border bg-white object-contain"
                        />
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-textSecondary">
                            {event.dateLabel}
                          </p>
                          <p className="font-heading text-lg font-semibold text-primary">
                            {event.name}
                          </p>
                          <p className="text-sm text-textSecondary">{event.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start justify-between gap-3 text-xs font-semibold uppercase tracking-wide text-primary/70 sm:flex-col sm:items-end">
                        <span>{event.category}</span>
                        <span className="text-textSecondary">{event.timeLabel}</span>
                      </div>
                    </summary>
                    <div className="mt-4 lg:hidden">{renderDetails(event)}</div>
                  </details>
                );
              })
            )}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-xl border border-border bg-surface p-5 shadow-soft">
              {selectedEvent ? (
                <div className="space-y-4">
                  <img
                    src="/logo.webp"
                    alt="Warrior Revival"
                    className="h-52 w-full rounded-lg border border-border bg-white object-contain"
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-textSecondary">
                      {selectedEvent.dateLabel}
                    </p>
                    <p className="mt-1 font-heading text-2xl font-semibold text-primary">
                      {selectedEvent.name}
                    </p>
                    <p className="mt-1 text-sm text-textSecondary">{selectedEvent.location}</p>
                  </div>
                  {renderDetails(selectedEvent)}
                </div>
              ) : (
                <p className="text-sm text-textSecondary">Select an event to see details.</p>
              )}
            </div>
          </aside>
        </div>
      </section>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm text-textSecondary md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="font-heading text-base font-semibold text-primary">Warrior Revival</p>
            <p className="text-xs uppercase tracking-[0.2em] text-textSecondary">Sandy, Utah</p>
          </div>
          <p>Empowering veterans and families through adventure and belonging.</p>
          <button className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            Support the mission
          </button>
        </div>
      </footer>
    </main>
  );
}
