"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Fuse from "fuse.js";
import { buildEventId, events } from "@/data/events";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "#" },
  { label: "Veterans", href: "/veterans" },
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
    id: "book-club",
    label: "Book club",
    match: (event: (typeof events)[number]) => /book club/i.test(event.name)
  },
  {
    id: "other",
    label: "Other events",
    match: (event: (typeof events)[number]) =>
      !/hike|coffee hour|lunch with vets|book club/i.test(event.name)
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

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const weekdayLabels = ["S", "M", "T", "W", "Th", "F", "S"];
const fallbackEventImage = "/logo.webp";

const formatDateOnly = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
};

const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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

const getMonthKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

const formatMonthLabel = (date: Date) => `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

const buildCalendarCells = (monthDate: Date) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startWeekday = firstOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<{ date: Date; dateKey: string; day: number } | null> = [];

  for (let i = 0; i < startWeekday; i += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    cells.push({ date, dateKey: formatDateKey(date), day });
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
};

type EventWithDate = (typeof events)[number] & {
  dateValue: Date;
};

type MonthOption = {
  key: string;
  label: string;
  dateValue: Date;
};

export default function EventsPage() {
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(() =>
    new Set(eventTypeFilters.map((filter) => filter.id))
  );
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const date = new Date();
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return date;
  });
  const searchParams = useSearchParams();
  const requestedEventId = searchParams.get("event");
  const hasAppliedRequested = useRef(false);

  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const eventsWithDate = useMemo<EventWithDate[]>(
    () =>
      events.map((event) => ({
        ...event,
        dateValue: new Date(`${event.dateIso}T00:00:00`)
      })),
    []
  );

  const filteredEvents = useMemo(() => {
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

  const monthOptions = useMemo<MonthOption[]>(() => {
    const uniqueMonths = new Map<string, MonthOption>();
    filteredEvents.forEach((event) => {
      const key = getMonthKey(event.dateValue);
      if (!uniqueMonths.has(key)) {
        const dateValue = new Date(event.dateValue.getFullYear(), event.dateValue.getMonth(), 1);
        uniqueMonths.set(key, {
          key,
          label: formatMonthLabel(event.dateValue),
          dateValue
        });
      }
    });

    return Array.from(uniqueMonths.values()).sort(
      (a, b) => a.dateValue.getTime() - b.dateValue.getTime()
    );
  }, [filteredEvents]);

  useEffect(() => {
    if (selectedMonth !== "all" && !monthOptions.some((option) => option.key === selectedMonth)) {
      setSelectedMonth("all");
    }
  }, [monthOptions, selectedMonth]);

  const monthFilteredEvents = useMemo(() => {
    if (selectedMonth === "all") {
      return filteredEvents;
    }

    return filteredEvents.filter((event) => getMonthKey(event.dateValue) === selectedMonth);
  }, [filteredEvents, selectedMonth]);

  const fuse = useMemo(() => new Fuse(monthFilteredEvents, fuseOptions), [monthFilteredEvents]);

  const visibleEvents = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      return monthFilteredEvents;
    }
    const results = fuse.search(trimmed).map((result) => result.item);
    return [...results].sort((a, b) => a.dateValue.getTime() - b.dateValue.getTime());
  }, [monthFilteredEvents, fuse, query]);

  const eventItems = useMemo(() => {
    const items: Array<
      | { type: "month"; key: string; label: string }
      | { type: "event"; event: EventWithDate }
    > = [];
    let currentMonthKey = "";

    visibleEvents.forEach((event) => {
      const monthKey = getMonthKey(event.dateValue);
      if (monthKey !== currentMonthKey) {
        items.push({ type: "month", key: monthKey, label: formatMonthLabel(event.dateValue) });
        currentMonthKey = monthKey;
      }
      items.push({ type: "event", event });
    });

    return items;
  }, [visibleEvents]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, EventWithDate[]>();
    visibleEvents.forEach((event) => {
      const list = map.get(event.dateIso) ?? [];
      list.push(event);
      map.set(event.dateIso, list);
    });
    return map;
  }, [visibleEvents]);

  useEffect(() => {
    if (visibleEvents.length === 0) {
      setSelectedEventId(null);
      return;
    }

    if (
      !hasAppliedRequested.current &&
      requestedEventId &&
      visibleEvents.some((event) => buildEventId(event) === requestedEventId)
    ) {
      setSelectedEventId(requestedEventId);
      hasAppliedRequested.current = true;
      return;
    }

    const exists =
      selectedEventId && visibleEvents.some((event) => buildEventId(event) === selectedEventId);

    if (!exists) {
      setSelectedEventId(buildEventId(visibleEvents[0]));
    }
  }, [requestedEventId, selectedEventId, visibleEvents]);

  const selectedEvent = selectedEventId
    ? visibleEvents.find((event) => buildEventId(event) === selectedEventId) ?? null
    : visibleEvents[0] ?? null;

  useEffect(() => {
    if (!selectedEvent) {
      return;
    }

    const date = new Date(`${selectedEvent.dateIso}T00:00:00`);
    setCalendarMonth(new Date(date.getFullYear(), date.getMonth(), 1));
  }, [selectedEvent?.dateIso]);

  useEffect(() => {
    if (selectedMonth === "all") {
      return;
    }

    const [year, month] = selectedMonth.split("-");
    setCalendarMonth(new Date(Number(year), Number(month) - 1, 1));
  }, [selectedMonth]);

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

  const handleMonthNav = (direction: number) => {
    const nextMonth = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth() + direction,
      1
    );
    setCalendarMonth(nextMonth);
    if (selectedMonth !== "all") {
      setSelectedMonth(getMonthKey(nextMonth));
    }
  };

  const handleCalendarSelect = (dateKey: string) => {
    const eventsOnDay = eventsByDate.get(dateKey);
    if (!eventsOnDay || eventsOnDay.length === 0) {
      return;
    }
    setSelectedEventId(buildEventId(eventsOnDay[0]));
  };

  const renderDetails = (event: (typeof events)[number]) => {
    const calendarLinks = buildCalendarLinks(event);

    return (
      <div className="mt-4 grid gap-3 text-sm text-textSecondary">
        <div className="grid grid-cols-[72px_1fr] gap-2">
          <span className="font-bold text-primary">Date</span>
          <span>{event.dateLabel}</span>
        </div>
        <div className="grid grid-cols-[72px_1fr] gap-2">
          <span className="font-bold text-primary">Time</span>
          <span>{event.timeLabel}</span>
        </div>
        <div className="grid grid-cols-[72px_1fr] gap-2">
          <span className="font-bold text-primary">Location</span>
          <span>{event.location}</span>
        </div>
        {event.address ? (
          <div className="grid grid-cols-[72px_1fr] gap-2">
            <span className="font-bold text-primary">Address</span>
            <span>{event.address}</span>
          </div>
        ) : null}
        <div className="grid grid-cols-[72px_1fr] gap-2">
          <span className="font-bold text-primary">Category</span>
          <span>{event.category}</span>
        </div>
        {event.contact ? (
          <div className="grid grid-cols-[72px_1fr] gap-2">
            <span className="font-bold text-primary">Contact</span>
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
        <div className="flex flex-col gap-2">
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
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center rounded-md bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Register now
          </a>
        ) : null}
      </div>
    );
  };

  const calendarCells = useMemo(() => buildCalendarCells(calendarMonth), [calendarMonth]);

  return (
    <main className="bg-light">
      <div className="sticky top-0 z-30">
        <header className="border-b border-border bg-surface/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
            <div className="flex items-center gap-3">
              <img
                src="/logo.webp"
                alt="Warrior Revival logo"
                className="h-14 w-14 md:h-16 md:w-16"
              />
              <div>
                <p className="font-accent text-2xl text-primary md:text-3xl tracking-[0.08em]">
                  Warrior Revival
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-textSecondary">
                  Military, Transition, Community
                </p>
              </div>
            </div>
            <nav className="hidden items-center gap-6 text-base font-accent text-textSecondary tracking-[0.08em] lg:flex">
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
            <div className="grid gap-2 pt-2 text-base font-accent text-textSecondary tracking-[0.08em]">
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
      </div>

      <section className="mx-auto max-w-screen-2xl px-4 py-12 md:px-8">
        <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)_300px] lg:items-start lg:gap-8">
          <div className="space-y-3 lg:col-start-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Events
            </p>
            <h1 className="font-heading text-4xl font-semibold text-primary md:text-5xl">
              Explore upcoming events
            </h1>
            <p className="text-sm text-textSecondary">
              Search within the filtered list by event name, location, category, or date.
            </p>
          </div>
        </div>

        <div className="mt-2 lg:grid lg:grid-cols-[200px_minmax(0,1fr)_300px] lg:items-start lg:gap-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-border bg-surface p-4">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="rounded-md border border-border px-2 py-1 text-xs font-semibold text-textSecondary transition hover:bg-primary/10 hover:text-primary"
                    onClick={() => handleMonthNav(-1)}
                    aria-label="Previous month"
                  >
                    {"<"}
                  </button>
                  <p className="text-sm font-semibold text-primary">
                    {formatMonthLabel(calendarMonth)}
                  </p>
                  <button
                    type="button"
                    className="rounded-md border border-border px-2 py-1 text-xs font-semibold text-textSecondary transition hover:bg-primary/10 hover:text-primary"
                    onClick={() => handleMonthNav(1)}
                    aria-label="Next month"
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
                    if (!cell) {
                      return <span key={`empty-${index}`} />;
                    }

                    const hasEvents = eventsByDate.has(cell.dateKey);

                    if (!hasEvents) {
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
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-red-500 text-red-600 transition hover:bg-red-50"
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
                      onClick={() => {
                        setSelectedMonth(option.key);
                        setCalendarMonth(option.dateValue);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-start-2">
            <div className="mt-0 flex flex-col gap-3 sm:flex-row sm:items-center">
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
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
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

            <p className="mt-4 text-xs text-textSecondary">
              Showing {visibleEvents.length} of {monthFilteredEvents.length} events
            </p>

            <div className="mt-4 space-y-4">
              {visibleEvents.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border bg-surface p-6 text-sm text-textSecondary">
                  No events match your filters.
                </div>
              ) : (
                eventItems.map((item, index) => {
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
                  const eventId = buildEventId(event);
                  const isSelected = eventId === selectedEventId;

                  return (
                    <details
                      key={eventId}
                      open={isSelected}
                      className={`group rounded-xl p-4 shadow-soft transition ${
                        isSelected
                          ? "border-2 border-primary/70 bg-primary/10"
                          : "border border-border bg-surface"
                      }`}
                    >
                      <summary
                        className="flex cursor-pointer flex-col gap-4 [&::-webkit-details-marker]:hidden sm:flex-row sm:items-center sm:justify-between"
                        onClick={(event) => {
                          event.preventDefault();
                          setSelectedEventId(eventId);
                        }}
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <img
                          src={event.image ?? fallbackEventImage}
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
          </div>

          <aside className="hidden lg:block lg:col-start-3 lg:sticky lg:top-24">
            <div className="rounded-xl border border-border bg-surface p-5 shadow-soft">
              {selectedEvent ? (
                <div className="space-y-4">
                  <img
                    src={selectedEvent.image ?? fallbackEventImage}
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
