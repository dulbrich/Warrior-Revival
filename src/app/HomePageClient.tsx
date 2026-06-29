"use client";

import { donatePageHref } from "@/lib/donation";

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SubscribeSection from "@/components/SubscribeSection";
import MarqueeText from "@/components/MarqueeText";
import type { EventForDisplay } from "@/lib/events/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const pathways: {
  title: string;
  description: string;
  cta: string;
  href?: string;
}[] = [
  {
    title: "Warrior",
    description:
      "Whether you’re still in uniform or already on the other side, your next chapter starts with finding your people. Get outside, get connected, and get moving with a community built for warriors like you.",
    cta: "Join a program",
    href: "/membership"
  },
  {
    title: "Volunteer",
    description:
      "Getting involved looks different for everyone — and that’s perfectly okay. Whether you can give an hour or a whole season, there’s a place for you here. Help at events, support our outreach, work behind the scenes, or bring your own idea to the table. No pressure, no long commitments — just real people showing up for warriors and their families. As an all-volunteer organization, every contribution means the world to us.",
    cta: "Become a volunteer"
  },
  {
    title: "Sponsor",
    description:
      "Behind every great mission is a community that believes in it. Sponsor an event, fund a retreat, or make a donation — your partnership helps Warrior Revival show up for service members, veterans, and their families when it matters most.",
    cta: "Partner with us"
  }
];

const focusAreas = [
  {
    title: "Recreation",
    description:
      "From guided outdoor adventures to structured community events, we create spaces where warriors and families can step outside, find their people, and rediscover a sense of purpose.",
    cta: "Events",
    href: "/events"
  },
  {
    title: "Needs of All",
    description:
      "From guided outdoor adventures to structured community events, we create spaces where warriors and families can step outside, find their people, and rediscover a sense of purpose.",
    cta: "Join",
    href: "/membership"
  },
  {
    title: "Mentorship & Resources",
    titleLines: ["Mentorship", "& Resources"],
    description:
      "Whether you’re preparing to leave the military or already navigating civilian life, the transition can feel overwhelming and uncertain. Warrior Revival helps service members, veterans, and their families find their tribe and the right resources to move forward with confidence."
  },
  {
    title: "Retreats",
    description:
      "Sometimes healing happens best when you step outside your everyday life. Warrior Revival retreats offer service members and veterans a safe, restorative space to breathe, reflect, and reconnect — through outdoor adventures, meaningful workshops, and clinically guided reflection designed to foster lasting healing and genuine connection."
  },
  {
    title: "Community Partnership",
    description:
      "No single organization can do it all — and we don’t try to. Through intentional community partnerships, Warrior Revival brings together the people, organizations, and resources needed to create meaningful experiences for service members, veterans, and their families. Together we build a community where every warrior finds purpose, connection, and a place to belong.",
    cta: "Join",
    href: "/membership"
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
export default function HomePageClient({
  upcomingEvents
}: {
  upcomingEvents: EventForDisplay[];
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const router = useRouter();

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
      <SiteHeader />

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
          <p className="font-accent text-lg uppercase tracking-[0.3em] text-white/80 md:text-xl">
            Welcome to Warrior Revival
          </p>
          <h1 className="max-w-3xl font-blackOps text-5xl font-normal md:text-6xl">
            Built for Warriors. Open to Family. One Tribe.
          </h1>
          <p className="max-w-2xl text-base text-white/90 md:text-lg">
            Warrior Revival is a 501(c)(3) nonprofit founded in 2023 on the belief that no warrior should navigate
            life&rsquo;s transitions alone. Through recreation, mentorship, wellness, and therapeutic retreat experiences,
            we walk alongside service members, veterans, and their families in Utah &mdash; fostering healing, resilience,
            and lasting connection.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={donatePageHref}
              className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-base font-bold uppercase tracking-wide text-white shadow-soft transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Donate
            </a>
            <a
              href="/events"
              className="inline-flex items-center justify-center rounded-md border border-white/70 bg-white/10 px-6 py-3 text-base font-bold uppercase tracking-wide text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              View Events
            </a>
            <a
              href="/membership"
              className="inline-flex items-center justify-center rounded-md border border-white/70 px-6 py-3 text-base font-bold uppercase tracking-wide text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Join the community
            </a>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-surface">
        <div
          className="absolute inset-0 bg-[url('/home/backgrounds/mountains.jpg')] bg-cover bg-center opacity-[0.2]"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl gap-6 px-4 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-5">
          {focusAreas.map((area) => (
            <div
              key={area.title}
              className="flex h-full flex-col justify-between rounded-2xl border border-border bg-surface/95 p-6 shadow-card transition-transform duration-300 ease-out hover:scale-[1.02]"
            >
              <div>
                <p className="font-heading text-2xl font-semibold text-primary">
                  {area.titleLines
                    ? area.titleLines.map((line, index) => (
                        <span key={`${area.title}-${index}`} className="block">
                          {line}
                        </span>
                      ))
                    : area.title}
                </p>
                <p className="mt-3 text-base text-textSecondary">{area.description}</p>
              </div>
              {area.cta &&
                (area.href ? (
                  <a
                    href={area.href}
                    className="mt-6 inline-flex items-center justify-center rounded-md border border-primary px-4 py-2 text-base font-bold uppercase tracking-wide text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {area.cta}
                  </a>
                ) : (
                  <button className="mt-6 inline-flex items-center justify-center rounded-md border border-primary px-4 py-2 text-base font-bold uppercase tracking-wide text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
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
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
                Upcoming events
              </p>
              <a
                href="/events"
                className="inline-flex items-center justify-center rounded-md border border-primary px-4 py-2 text-base font-bold uppercase tracking-wide text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                See more
              </a>
            </div>
            <div className="mt-6 space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="cursor-pointer rounded-xl border border-border bg-surface p-4 shadow-soft transition hover:border-primary/40 hover:bg-primary/5"
                  role="link"
                  tabIndex={0}
                  onClick={() =>
                    router.push(`/events?event=${event.id}`)
                  }
                  onKeyDown={(eventKey) => {
                    if (eventKey.key === "Enter" || eventKey.key === " ") {
                      eventKey.preventDefault();
                      router.push(`/events?event=${event.id}`);
                    }
                  }}
                >
                  <div className="flex items-start gap-4">
                    <Image
                      src={event.image}
                      alt={event.name}
                      width={64}
                      height={64}
                      className={`h-16 w-16 rounded-md border border-border bg-white ${
                        event.image ? "object-cover" : "object-contain"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-primary">
                          {event.category}
                        </span>
                        <span className="text-sm font-semibold uppercase tracking-wide text-textSecondary">
                          {event.dateLabel}
                        </span>
                      </div>
                      <div className="mt-2">
                        <MarqueeText
                          text={event.name}
                          className="font-heading text-lg font-semibold text-primary"
                        />
                      </div>
                      <p className="text-sm text-textSecondary">
                        {event.timeLabel} · {event.location}
                      </p>
                    </div>
                  </div>
                  {event.register_link ? (
                    <a
                      href={event.register_link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center text-base font-bold text-secondary hover:text-primary"
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
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            Get involved
          </p>
          <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl">
            Choose your pathway to impact.
          </h2>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {pathways.map((pathway) => (
            <div
              key={pathway.title}
              className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-card"
            >
              <p className="font-heading text-2xl font-semibold text-primary">
                {pathway.title}
              </p>
              <p className="mt-3 text-base text-textSecondary">{pathway.description}</p>
              <div className="mt-auto pt-6">
                {pathway.href ? (
                  <a
                    href={pathway.href}
                    className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-base font-bold uppercase tracking-wide text-white transition hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {pathway.cta}
                  </a>
                ) : (
                  <button className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-base font-bold uppercase tracking-wide text-white transition hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                    {pathway.cta}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <SubscribeSection />
      <SiteFooter />
    </main>
  );
}
