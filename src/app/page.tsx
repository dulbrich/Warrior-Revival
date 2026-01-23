"use client";

import { buildEventId, events } from "@/data/events";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navigation = [
  { label: "Home", href: "#" },
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

const fallbackEventImage = "/logo.webp";
const MarqueeText = ({ text, className }: { text: string; className?: string }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  const textClassName = className ? `${className}` : "";

  useEffect(() => {
    const container = containerRef.current;
    const textElement = textRef.current;
    if (!container || !textElement) {
      return;
    }

    let frameId = 0;
    const measure = () => {
      frameId = window.requestAnimationFrame(() => {
        const fits = textElement.scrollWidth <= container.clientWidth;
        setShouldScroll(!fits);
      });
    };

    measure();

    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;

    if (observer) {
      observer.observe(container);
      observer.observe(textElement);
    } else {
      window.addEventListener("resize", measure);
    }

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      if (observer) {
        observer.disconnect();
      } else {
        window.removeEventListener("resize", measure);
      }
    };
  }, [text]);

  return (
    <div ref={containerRef} className="marquee-shell min-w-0 w-full">
      <div className={`marquee-track ${shouldScroll ? "marquee-track--active" : ""}`}>
        <span ref={textRef} className={`marquee-item ${textClassName}`}>
          {text}
        </span>
        <span aria-hidden="true" className={`marquee-item ${textClassName}`}>
          {text}
        </span>
      </div>
    </div>
  );
};

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
      "Join us and make a difference! Help lead events, staff our community booths, assist with administrative work, or even design your own program to support veterans and their families. As an all-volunteer organization, we can’t do this without you.",
    cta: "Become a volunteer"
  },
  {
    title: "Sponsors",
    description:
      "Give back to those who gave everything - partner with Warrior Revival by sponsoring an event or making a donation.",
    cta: "Partner with us"
  }
];

const focusAreas = [
  {
    title: "Recreation",
    description:
      "Provides structured events, outdoor-based experiences designed to reduce isolation, build peer connection, and restore a sense of purpose.",
    cta: "Events",
    href: "/events"
  },
  {
    title: "Needs of All",
    description:
      "We strive to build a supportive network rooted in camaraderie and purpose. Warrior Revival is committed to inclusive programming that serves veterans throughout Utah, regardless of ability or disability.",
    cta: "Join"
  },
  {
    title: "Mentorship & Resources",
    titleLines: ["Mentorship", "& Resources"],
    description:
      "There is no roadmap or manual after leaving the military. Connecting with another veteran who has been through the process can help ease the transition. Warrior Revival also provides resources, guidance, and support to help veterans navigate civilian life successfully."
  },
  {
    title: "Retreats",
    description:
      "Warrior Revival retreats support veterans and their families through outdoor recreation, workshops, and reflection. Led by Dr. Katie Fry, a clinical psychologist and founder, they provide a safe space for healing, connection, and ongoing support."
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
  const router = useRouter();
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
      <div className="sticky top-0 z-30">
        <header className="border-b border-border bg-surface/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
            <a href="/" className="flex items-center gap-3">
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
            </a>
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
          <p className="font-accent text-base uppercase tracking-[0.3em] text-white/80 md:text-lg">
            Welcome to Warrior Revival
          </p>
          <h1 className="max-w-3xl font-heading text-5xl font-semibold md:text-6xl">
            SUPPORT &amp; EMPOWER VETERANS
          </h1>
          <p className="max-w-2xl text-base text-white/90 md:text-lg">
            Warrior Revival is a 501(c)(3) nonprofit organization founded in 2023 with the mission of supporting and 
            empowering service members, veterans and their families in Utah through recreation, mentorship, wellness 
            initiatives, and therapeutic retreat experiences that promote healing and connection.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-soft transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              Donate
            </button>
            <a
              href="/events"
              className="inline-flex items-center justify-center rounded-md bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              View Events
            </a>
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
                  {area.titleLines
                    ? area.titleLines.map((line, index) => (
                        <span key={`${area.title}-${index}`} className="block">
                          {line}
                        </span>
                      ))
                    : area.title}
                </p>
                <p className="mt-3 text-sm text-textSecondary">{area.description}</p>
              </div>
              {area.cta &&
                (area.href ? (
                  <a
                    href={area.href}
                    className="mt-6 inline-flex items-center justify-center rounded-md border border-primary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {area.cta}
                  </a>
                ) : (
                  <button className="mt-6 inline-flex items-center justify-center rounded-md border border-primary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                    {area.cta}
                  </button>
                ))}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-8">
          <div className="rounded-2xl border border-border bg-light p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Upcoming events
            </p>
            <div className="mt-6 space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={`${event.name}-${event.dateIso}`}
                  className="cursor-pointer rounded-xl border border-border bg-surface p-4 shadow-soft transition hover:border-primary/40 hover:bg-primary/5"
                  role="link"
                  tabIndex={0}
                  onClick={() =>
                    router.push(`/events?event=${encodeURIComponent(buildEventId(event))}`)
                  }
                  onKeyDown={(eventKey) => {
                    if (eventKey.key === "Enter" || eventKey.key === " ") {
                      eventKey.preventDefault();
                      router.push(`/events?event=${encodeURIComponent(buildEventId(event))}`);
                    }
                  }}
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={event.image ?? fallbackEventImage}
                      alt={event.name}
                      className={`h-16 w-16 rounded-md border border-border bg-white ${
                        event.image ? "object-cover" : "object-contain"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                          {event.category}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wide text-textSecondary">
                          {event.dateLabel}
                        </span>
                      </div>
                      <div className="mt-2">
                        <MarqueeText
                          text={event.name}
                          className="font-heading text-lg font-semibold text-primary"
                        />
                      </div>
                      <p className="text-xs text-textSecondary">
                        {event.timeLabel} · {event.location}
                      </p>
                    </div>
                  </div>
                  {event.register_link ? (
                    <a
                      href={event.register_link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center text-sm font-semibold text-secondary hover:text-primary"
                      onClick={(clickEvent) => clickEvent.stopPropagation()}
                    >
                      Register now →
                    </a>
                  ) : null}
                </div>
              ))}
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
            <h2 className="font-heading text-4xl font-semibold text-primary md:text-5xl">
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
              className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-card"
            >
              <p className="font-heading text-xl font-semibold text-primary">
                {pathway.title}
              </p>
              <p className="mt-3 text-sm text-textSecondary">{pathway.description}</p>
              <div className="mt-auto pt-6">
                <button className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  {pathway.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary">
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
              Newsletter
            </p>
            <div className="mt-3 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <p className="font-heading text-3xl font-semibold">
                Get monthly updates and new adventure dates.
              </p>
              <div className="flex w-full flex-col gap-3 sm:flex-row md:max-w-md">
                <input
                  className="h-12 w-full min-w-0 rounded-md border border-white/30 bg-white/10 px-3 text-base text-white placeholder:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:h-11"
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

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm text-textSecondary md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <div className="flex items-center gap-6">
              <img
                src="/logo2.png"
                alt="Warrior Revival mark"
                className="h-40 w-40 pr-4"
              />
              <div>
                <p className="font-heading text-base font-semibold text-primary">
                  Warrior Revival
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-textSecondary">
                  Sandy, Utah
                </p>
              </div>
            </div>
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
