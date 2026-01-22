"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { buildEventId, events } from "@/data/events";

const navigation = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Programs", href: "#" },
  { label: "Events", href: "/events" },
  { label: "Get Involved", href: "#" },
  { label: "Partners", href: "#" },
  { label: "Gallery", href: "#" },
  { label: "Donate", href: "#" },
  { label: "Contact", href: "#" }
];

const fallbackEventImage = "/logo.webp";
const marqueeLengthThreshold = 32;

const MarqueeText = ({ text, className }: { text: string; className?: string }) => {
  const shouldScroll = text.length > marqueeLengthThreshold;
  const textClassName = className ? `${className}` : "";

  return (
    <div className="marquee-shell min-w-0 w-full">
      <div className={`marquee-track ${shouldScroll ? "marquee-track--active" : ""}`}>
        <span className={`marquee-item ${textClassName}`}>{text}</span>
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
    title: "Recreation",
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
const quoteTypingSpeedMs = 24;
const quoteHoldMs = 5400;
const quoteSelectMs = 650;
const quotePauseMs = 1500;

const reintegrationQuotes = [
  "No one wears rank out here.",
  "Solving a rubix cube with no hands.",
  "It takes adjusting knowing I have to adjust to my family's lifestyle.",
  "I have to slow my world... they don't march to the same beat in the civilian world.",
  "The military kept me together like glue and now that is all melted away, I need to pick up all the pieces off the floor and figure out how to piece them back together again."
];

const goldSponsors = [
  { name: "Cyprus", src: "/home/sponsors/gold/cyprus.jpg" },
  { name: "Lionheart", src: "/home/sponsors/gold/lionheart.jpg" },
  { name: "LM", src: "/home/sponsors/gold/lm.jpg" }
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const [typedQuote, setTypedQuote] = useState("");
  const [quotePhase, setQuotePhase] = useState<
    "typing" | "holding" | "selecting" | "pausing"
  >("typing");
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

  useEffect(() => {
    const fullQuote = reintegrationQuotes[activeQuoteIndex];
    let timeoutId: number | undefined;

    if (quotePhase === "typing") {
      if (typedQuote.length < fullQuote.length) {
        timeoutId = window.setTimeout(() => {
          setTypedQuote(fullQuote.slice(0, typedQuote.length + 1));
        }, quoteTypingSpeedMs);
      } else {
        setQuotePhase("holding");
      }
    } else if (quotePhase === "holding") {
      timeoutId = window.setTimeout(() => {
        setQuotePhase("selecting");
      }, quoteHoldMs);
    } else if (quotePhase === "selecting") {
      timeoutId = window.setTimeout(() => {
        setTypedQuote("");
        setQuotePhase("pausing");
      }, quoteSelectMs);
    } else if (quotePhase === "pausing") {
      timeoutId = window.setTimeout(() => {
        setActiveQuoteIndex((prev) => (prev + 1) % reintegrationQuotes.length);
        setQuotePhase("typing");
      }, quotePauseMs);
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [activeQuoteIndex, quotePhase, typedQuote]);

  const activeQuote = reintegrationQuotes[activeQuoteIndex];
  const showClosingQuote = typedQuote.length > 0 && typedQuote.length === activeQuote.length;

  return (
    <main className="bg-light">
      <div className="sticky top-0 z-30">
        <header className="border-b border-border bg-surface/95 backdrop-blur">
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
          <div className="space-y-6 min-w-0">
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
          <div className="space-y-6 min-w-0">
            <div className="rounded-2xl border border-border bg-light p-6">
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
            <div className="rounded-2xl border border-border bg-primary p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                Newsletter
              </p>
              <p className="mt-3 font-heading text-2xl font-semibold">
                Get monthly updates and new adventure dates.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
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

      <section className="bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center md:px-8">
          <div className="space-y-6">
            <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl">
              Our members have described the challenges of reintegration as:
            </h2>
            <p className="text-base text-textSecondary">
              We strive to create a supportive network that fosters camaraderie, a sense of
              purpose, and to raise awareness of the unique challenges veterans face in the
              transition to civilian life.
            </p>
            <div className="flex min-h-[280px] flex-col rounded-2xl border border-border bg-white p-6 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Veteran voices
              </p>
              <div className="flex flex-1 flex-col justify-center">
                <blockquote className="font-heading text-2xl text-primary md:text-3xl">
                  <span
                    className={`quote-text ${
                      quotePhase === "selecting" ? "quote-selected" : ""
                    }`}
                  >
                    {typedQuote ? `“${typedQuote}${showClosingQuote ? "”" : ""}` : ""}
                  </span>
                </blockquote>
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-textSecondary">
                {activeQuoteIndex + 1} of {reintegrationQuotes.length}
              </p>
            </div>
          </div>
          <div className="relative min-h-[380px] md:min-h-[460px]">
            <img
              src="/home/soldier.jpg"
              alt="Soldier reflecting outdoors"
              className="absolute inset-0 h-full w-full rounded-3xl object-cover shadow-card"
            />
          </div>
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
          <div className="w-full space-y-6 md:max-w-md">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Gold sponsors
              </p>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                {goldSponsors.map((sponsor) => (
                  <div
                    key={sponsor.name}
                    className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-5"
                  >
                    <img
                      src={sponsor.src}
                      alt={`${sponsor.name} logo`}
                      className="h-24 w-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
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
