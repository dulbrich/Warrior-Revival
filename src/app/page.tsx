"use client";

import { useEffect, useState } from "react";

const navigation = [
  "Home",
  "About",
  "Programs",
  "Events",
  "Get Involved",
  "Partners",
  "Gallery",
  "Donate",
  "Contact"
];

const events = [
  {
    name: "Book Club",
    dateIso: "2025-03-25",
    dateLabel: "Mar 25, 2025",
    timeLabel: "6:00 pm - 7:30 pm MDT",
    location: "Draper, UT",
    category: "Veteran + Support Person",
    register_link: ""
  },
  {
    name: "2nd Annual Warrior Revival Golf Tournament",
    dateIso: "2025-06-13",
    dateLabel: "Jun 13, 2025",
    timeLabel: "6:30 am - 4:00 pm MDT",
    location: "South Jordan, UT",
    category: "Fundraiser / Community",
    register_link: ""
  },
  {
    name: "MTB Ride & BBQ/Games",
    dateIso: "2025-07-26",
    dateLabel: "Jul 26, 2025",
    timeLabel: "10:00 am - 5:00 pm MDT",
    location: "Kamas, UT",
    category: "Veteran + Family",
    register_link: ""
  },
  {
    name: "Utah Air National Guard - Family Palooza",
    dateIso: "2025-08-02",
    dateLabel: "Aug 2, 2025",
    timeLabel: "8:00 am - 12:00 pm MDT",
    location: "Salt Lake City, UT",
    category: "Veteran + Family",
    register_link: ""
  },
  {
    name: "Muddy Dash",
    dateIso: "2025-08-09",
    dateLabel: "Aug 9, 2025",
    timeLabel: "8:00 am - 5:00 pm MDT",
    location: "Midway, UT",
    category: "Veteran + Support Person",
    register_link: ""
  },
  {
    name: "Fishing Tournament",
    dateIso: "2025-09-20",
    dateLabel: "Sep 20, 2025",
    timeLabel: "All day",
    location: "Strawberry Reservoir, UT",
    category: "Community",
    register_link: ""
  },
  {
    name: "Trail Hero",
    dateIso: "2025-09-29",
    dateLabel: "Sep 29 - Oct 4, 2025",
    timeLabel: "Multi-day",
    location: "Hurricane, UT",
    category: "Community",
    register_link: ""
  },
  {
    name: "Lunch with Vets (Weber County)",
    dateIso: "2025-10-26",
    dateLabel: "Oct 26, 2025",
    timeLabel: "10:00 am - 11:00 am MDT",
    location: "Ogden, UT",
    category: "Veteran Only",
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Coffee Hour (Utah County)",
    dateIso: "2025-11-01",
    dateLabel: "Nov 1, 2025",
    timeLabel: "9:30 am - 10:30 am MDT",
    location: "Saratoga Springs, UT",
    category: "Veteran Only",
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Coffee Hour (Salt Lake County)",
    dateIso: "2025-11-16",
    dateLabel: "Nov 16, 2025",
    timeLabel: "9:00 am - 10:30 am MST",
    location: "Cottonwood Heights, UT",
    category: "Veteran Only",
    register_link: ""
  },
  {
    name: "Where Art Meets Service - A Night for Military Families",
    dateIso: "2026-01-04",
    dateLabel: "Jan 4, 2026",
    timeLabel: "11:00 am - 2:00 pm MST",
    location: "Murray, UT",
    category: "Veteran + Family",
    register_link: ""
  },
  {
    name: "Hike with Audrey",
    dateIso: "2026-01-10",
    dateLabel: "Jan 10, 2026",
    timeLabel: "9:00 am - 11:30 am",
    location: "Draper Suspension Bridge, Draper, UT",
    category: "Veteran + Family",
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-01-11",
    dateLabel: "Jan 11, 2026",
    timeLabel: "9:00 am - 10:30 am",
    location: "Alpha Coffee, Cottonwood Heights, UT",
    category: "Veteran Only",
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-02-15",
    dateLabel: "Feb 15, 2026",
    timeLabel: "9:00 am - 10:30 am",
    location: "Alpha Coffee, Cottonwood Heights, UT",
    category: "Veteran Only",
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-03-15",
    dateLabel: "Mar 15, 2026",
    timeLabel: "9:00 am - 10:30 am",
    location: "Alpha Coffee, Cottonwood Heights, UT",
    category: "Veteran Only",
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-04-19",
    dateLabel: "Apr 19, 2026",
    timeLabel: "9:00 am - 10:30 am",
    location: "Alpha Coffee, Cottonwood Heights, UT",
    category: "Veteran Only",
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-05-17",
    dateLabel: "May 17, 2026",
    timeLabel: "9:00 am - 10:30 am",
    location: "Alpha Coffee, Cottonwood Heights, UT",
    category: "Veteran Only",
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-06-21",
    dateLabel: "Jun 21, 2026",
    timeLabel: "9:00 am - 10:30 am",
    location: "Alpha Coffee, Cottonwood Heights, UT",
    category: "Veteran Only",
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-07-19",
    dateLabel: "Jul 19, 2026",
    timeLabel: "9:00 am - 10:30 am",
    location: "Alpha Coffee, Cottonwood Heights, UT",
    category: "Veteran Only",
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-08-16",
    dateLabel: "Aug 16, 2026",
    timeLabel: "9:00 am - 10:30 am",
    location: "Alpha Coffee, Cottonwood Heights, UT",
    category: "Veteran Only",
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-09-13",
    dateLabel: "Sep 13, 2026",
    timeLabel: "9:00 am - 10:30 am",
    location: "Alpha Coffee, Cottonwood Heights, UT",
    category: "Veteran Only",
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-10-18",
    dateLabel: "Oct 18, 2026",
    timeLabel: "9:00 am - 10:30 am",
    location: "Alpha Coffee, Cottonwood Heights, UT",
    category: "Veteran Only",
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-11-15",
    dateLabel: "Nov 15, 2026",
    timeLabel: "9:00 am - 10:30 am",
    location: "Alpha Coffee, Cottonwood Heights, UT",
    category: "Veteran Only",
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-12-13",
    dateLabel: "Dec 13, 2026",
    timeLabel: "9:00 am - 10:30 am",
    location: "Alpha Coffee, Cottonwood Heights, UT",
    category: "Veteran Only",
    register_link: ""
  },
  {
    name: "Hike with Audrey",
    dateIso: "2026-02-01",
    dateLabel: "Feb 1, 2026",
    timeLabel: "9:00 am - 11:30 am",
    location: "Little Mountain Summit, Emigration Canyon, UT",
    category: "Veteran + Family",
    register_link: ""
  },
  {
    name: "Hike with Audrey",
    dateIso: "2026-03-07",
    dateLabel: "Mar 7, 2026",
    timeLabel: "9:00 am - 11:30 am",
    location: "Ensign Peak, Salt Lake City, UT",
    category: "Veteran + Family",
    register_link: ""
  },
  {
    name: "Hike with Audrey",
    dateIso: "2026-04-12",
    dateLabel: "Apr 12, 2026",
    timeLabel: "9:00 am - 11:30 am",
    location: "Corner Canyon, Draper, UT",
    category: "Veteran + Family",
    register_link: ""
  },
  {
    name: "Hike with Audrey",
    dateIso: "2026-05-02",
    dateLabel: "May 2, 2026",
    timeLabel: "9:00 am - 11:30 am",
    location: "Mueller Park Trail, Bountiful, UT",
    category: "Veteran + Family",
    register_link: ""
  },
  {
    name: "Hike with Audrey",
    dateIso: "2026-06-07",
    dateLabel: "Jun 7, 2026",
    timeLabel: "9:00 am - 11:30 am",
    location: "Waterfall Canyon Trail, Ogden, UT",
    category: "Veteran + Family",
    register_link: ""
  },
  {
    name: "Hike with Audrey",
    dateIso: "2026-07-11",
    dateLabel: "Jul 11, 2026",
    timeLabel: "9:00 am - 11:30 am",
    location: "Adams Canyon Trail, Layton, UT",
    category: "Veteran + Family",
    register_link: ""
  },
  {
    name: "Hike with Audrey",
    dateIso: "2026-08-09",
    dateLabel: "Aug 9, 2026",
    timeLabel: "9:00 am - 11:30 am",
    location: "Scout Falls, AF Canyon, UT",
    category: "Veteran + Family",
    register_link: ""
  },
  {
    name: "Hike with Audrey",
    dateIso: "2026-09-12",
    dateLabel: "Sep 12, 2026",
    timeLabel: "9:00 am - 11:30 am",
    location: "Living Room Lookout Trail, Salt Lake City, UT",
    category: "Veteran + Family",
    register_link: ""
  },
  {
    name: "Hike with Audrey",
    dateIso: "2026-10-18",
    dateLabel: "Oct 18, 2026",
    timeLabel: "9:00 am - 11:30 am",
    location: "Alien Tower via Deer Ridge Trailhead, Draper, UT",
    category: "Veteran + Family",
    register_link: ""
  },
  {
    name: "Hike with Audrey",
    dateIso: "2026-11-14",
    dateLabel: "Nov 14, 2026",
    timeLabel: "9:00 am - 11:30 am",
    location: "Grove Creek Trail, Pleasant Grove, UT",
    category: "Veteran + Family",
    register_link: ""
  },
  {
    name: "Hike with Audrey",
    dateIso: "2026-12-25",
    dateLabel: "Dec 25, 2026",
    timeLabel: "9:00 am - 11:30 am",
    location: "Rattlesnake Gulch, Millcreek, UT",
    category: "Veteran + Family",
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Coffee Hour (Iron County)",
    dateIso: "2026-01-29",
    dateLabel: "Jan 29, 2026",
    timeLabel: "6:30 pm - 8:00 pm MST",
    location: "Cedar City, UT",
    category: "Veteran Only",
    register_link: ""
  },
  {
    name: "St. George Mission Ready Resource Fair",
    dateIso: "2026-02-21",
    dateLabel: "Feb 21, 2026",
    timeLabel: "10:00 am - 2:00 pm MST",
    location: "St. George, UT",
    category: "Community",
    register_link: ""
  },
  {
    name: "Ski/Snowboard Day",
    dateIso: "2026-03-19",
    dateLabel: "Mar 19, 2026",
    timeLabel: "12:00 pm - 3:30 pm MST",
    location: "Park City, UT",
    category: "Veteran Only",
    register_link: ""
  },
  {
    name: "Warrior Revival Summer Fun",
    dateIso: "2026-06-20",
    dateLabel: "Jun 20, 2026",
    timeLabel: "8:00 am - 5:00 pm MDT",
    location: "Heber City, UT",
    category: "Veteran + Family",
    register_link: ""
  }
];

const pathways = [
  {
    title: "Veterans",
    description:
      "Start your next chapter with guided outings, mentorship, and a supportive community.",
    cta: "Join a program"
  },
  {
    title: "Volunteers",
    description:
      "Lead trips, share skills, and help build confidence through outdoor experiences.",
    cta: "Become a volunteer"
  },
  {
    title: "Sponsors",
    description:
      "Invest in veteran wellness and connect your team with meaningful impact.",
    cta: "Partner with us"
  }
];

const focusAreas = [
  {
    title: "Reacreation",
    description:
      "We work to give Veterans a sense of belonging through recreation and fun activities. We are inspired to bring Veterans and civilians together to close the gap.",
    cta: "Contact Us"
  },
  {
    title: "Needs of All Veterans",
    description:
      "We strive to create a supportive network that fosters camaraderie and a sense of purpose. We are dedicated to being inclusive to meet the needs of all Veterans throughout the State of Utah.",
    cta: "Join"
  },
  {
    title: "Mentorship",
    description:
      "There is no road map or manual after leaving the military. Connecting with another Veteran who has been through the process can help ease the process."
  },
  {
    title: "Therapeutic Retreats",
    description:
      "We offer retreats twice a year for Veterans and their families to normalize, educate, and raise awareness of the challenges experienced post-discharge."
  },
  {
    title: "Community Partnership",
    description:
      "Through community partnerships, we can all work together to better the care of our community’s service members by offering activities that meet everyone’s interests and creates a sense of purpose and belonging.",
    cta: "Join"
  }
];

const heroSlides = [
  "/home/slide-show/together.jpg",
  "/home/slide-show/hiking.jpg",
  "/home/slide-show/sundown-mission.jpg",
  "/home/slide-show/side-by-side.jpg",
  "/home/slide-show/uniforms.jpg"
];

const heroSlideIntervalMs = 10000;

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = events
    .map((event) => ({
      ...event,
      dateValue: new Date(`${event.dateIso}T00:00:00`)
    }))
    .filter((event) => !Number.isNaN(event.dateValue.getTime()) && event.dateValue >= today)
    .sort((a, b) => a.dateValue.getTime() - b.dateValue.getTime())
    .slice(0, 3);

  useEffect(() => {
    if (heroSlides.length < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, heroSlideIntervalMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <main className="bg-light">
      <header className="sticky top-0 z-20 border-b border-border bg-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <img
              src="/logo.webp"
              alt="Warrior Revival logo"
              className="h-12 w-12"
            />
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
                key={item}
                href="#"
                className="transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {item}
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
                key={item}
                href="#"
                className="rounded-md px-3 py-2 transition hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          {heroSlides.map((slide, index) => (
            <div
              key={slide}
              className="hero-slide absolute inset-0 bg-cover"
              style={{
                backgroundImage: `url('${slide}')`,
                opacity: index === activeSlide ? 1 : 0,
                transition: "opacity 1000ms ease-in-out"
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/30" />
        <div className="relative mx-auto flex min-h-[600px] max-w-7xl flex-col justify-center gap-6 px-4 py-20 text-white md:min-h-[680px] md:px-8 lg:min-h-[720px]">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
            Welcome to Warrior Revival
          </p>
          <h1 className="max-w-3xl font-heading text-4xl font-semibold md:text-5xl">
            SUPPORT &amp; EMPOWER VETERANS
          </h1>
          <p className="max-w-2xl text-base text-white/90 md:text-lg">
            Warrior Revival is a non-profit 501(c)(3) organization that was established in 2023
            to support and empower Veterans and their families transition from the military to
            civilian life through recreation, mentorship, wellness and therapeutic retreats.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-soft transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              Donate
            </button>
            <button className="inline-flex items-center justify-center rounded-md bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              View Events
            </button>
            <button className="inline-flex items-center justify-center rounded-md border border-white/70 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              Join the community
            </button>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-surface">
        <div
          className="absolute inset-0 bg-[url('/home/backgrounds/mountains.jpg')] bg-cover bg-center opacity-[0.09]"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl gap-6 px-4 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-5">
          {focusAreas.map((area) => (
            <div
              key={area.title}
              className="flex h-full flex-col justify-between rounded-2xl border border-border bg-surface/95 p-6 shadow-card transition-transform duration-300 ease-out hover:scale-[1.02]"
            >
              <div>
                <p className="font-heading text-xl font-semibold text-primary md:text-2xl">
                  {area.title}
                </p>
                <p className="mt-3 text-sm text-textSecondary">{area.description}</p>
              </div>
              {area.cta && (
                <button className="mt-6 inline-flex items-center justify-center rounded-md border border-primary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  {area.cta}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-8">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Our mission
            </p>
            <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl">
              Supporting Veterans and families through connection, wellness, and purpose.
            </h2>
            <p className="text-base text-textSecondary md:text-lg">
              Warrior Revival&apos;s mission is to support and empower current and former Veterans
              and their families transitioning from the military to civilian life. Through
              recreation, wellness and therapeutic retreats, Warrior Revival is committed to
              providing resources, guidance, and opportunities that help Veterans connect with one
              another, and to civilians. We strive to create a supportive network that fosters
              camaraderie, a sense of purpose, and to raise awareness of the unique challenges
              Veterans face in the transition to civilian life.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-light p-4">
                <p className="font-heading text-lg font-semibold text-primary">Programs</p>
                <p className="mt-2 text-sm text-textSecondary">
                  Monthly hikes, coffee hours, and seasonal events that help Veterans build
                  community through shared experiences.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-light p-4">
                <p className="font-heading text-lg font-semibold text-primary">Support</p>
                <p className="mt-2 text-sm text-textSecondary">
                  Peer mentors, family outings, and sponsor resources that last all year long.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-light p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
                Upcoming events
              </p>
              <div className="mt-6 space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={`${event.name}-${event.dateIso}`}
                    className="rounded-xl border border-border bg-surface p-4 shadow-soft"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                        {event.category}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wide text-textSecondary">
                        {event.dateLabel}
                      </span>
                    </div>
                    <p className="mt-3 font-heading text-lg font-semibold text-primary">
                      {event.name}
                    </p>
                    <p className="text-xs text-textSecondary">
                      {event.timeLabel} · {event.location}
                    </p>
                    {event.register_link ? (
                      <a
                        href={event.register_link}
                        className="mt-3 inline-flex items-center text-sm font-semibold text-secondary hover:text-primary"
                      >
                        Register now →
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-primary p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                Newsletter
              </p>
              <p className="mt-3 font-heading text-2xl font-semibold">
                Get monthly updates and new adventure dates.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <input
                  className="h-11 flex-1 rounded-md border border-white/30 bg-white/10 px-3 text-sm text-white placeholder:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  placeholder="you@example.com"
                  type="email"
                />
                <button className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Get involved
            </p>
            <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl">
              Choose your pathway to impact.
            </h2>
          </div>
          <button className="inline-flex items-center justify-center rounded-md border border-primary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            Explore all programs
          </button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {pathways.map((pathway) => (
            <div
              key={pathway.title}
              className="rounded-2xl border border-border bg-surface p-6 shadow-card"
            >
              <p className="font-heading text-xl font-semibold text-primary">
                {pathway.title}
              </p>
              <p className="mt-3 text-sm text-textSecondary">{pathway.description}</p>
              <button className="mt-6 inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                {pathway.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-16 text-white md:flex-row md:items-center md:justify-between md:px-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
              Partners
            </p>
            <h2 className="font-heading text-3xl font-semibold md:text-4xl">
              Stronger together through community partnerships.
            </h2>
            <p className="max-w-xl text-base text-white/80">
              At Warrior Revival, we strongly believe in community and partnerships. By working
              closely with local organizations and businesses, we can offer Veterans tailored
              experiences to help increase a sense of meaning. Together, we can give back to those
              who selflessly protected us.
            </p>
          </div>
          <div className="grid w-full gap-4 sm:grid-cols-2 md:max-w-md">
            {["Summit Co.", "Canyon Health", "Basecamp Gear", "Utah Outdoor Society"].map(
              (partner) => (
                <div
                  key={partner}
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold"
                >
                  {partner}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm text-textSecondary md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="font-heading text-base font-semibold text-primary">Warrior Revival</p>
            <p className="text-xs uppercase tracking-[0.2em] text-textSecondary">
              Sandy, Utah
            </p>
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
