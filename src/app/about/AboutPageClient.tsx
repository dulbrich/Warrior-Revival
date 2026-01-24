"use client";

import { useState } from "react";
import { founderProfile, leadershipTeam, volunteers } from "@/data/about";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Veterans", href: "/veterans" },
  { label: "Programs", href: "#" },
  { label: "Events", href: "/events" },
  { label: "Get Involved", href: "#" },
  { label: "Partners", href: "#" },
  { label: "Gallery", href: "#" },
  { label: "Donate", href: "#" },
  { label: "Contact", href: "#" }
];

const missionCards = [
  {
    title: "Mission",
    description:
      "Support and empower service members, veterans, and their families in Utah through recreation, mentorship, wellness initiatives, and therapeutic retreat experiences.",
    badgeClass: "bg-accent/10 text-accent",
    borderClass: "border-accent/30"
  },
  {
    title: "Vision",
    description:
      "A connected community where every veteran has access to belonging, purpose, and the resources needed to thrive after service.",
    badgeClass: "bg-secondary/10 text-secondary",
    borderClass: "border-secondary/30"
  },
  {
    title: "Approach",
    description:
      "Trauma-informed, community-led programming that blends outdoor adventure with peer support and practical guidance.",
    badgeClass: "bg-primary/10 text-primary",
    borderClass: "border-primary/30"
  }
];

const focusAreas = [
  {
    title: "Outdoor adventure",
    description:
      "Guided hikes, retreats, and recreation that help veterans reconnect with purpose and confidence."
  },
  {
    title: "Mentorship & resources",
    description:
      "Peer-to-peer support, practical guidance, and wellness resources for the transition to civilian life."
  },
  {
    title: "Family-inclusive support",
    description:
      "Events and programs that strengthen family bonds and build lasting community ties."
  }
];

export default function AboutPageClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                  aria-current={item.href === "/about" ? "page" : undefined}
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
            isMenuOpen
              ? "max-h-[calc(100vh-96px)] overflow-y-auto opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
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

      <section className="relative overflow-hidden bg-surface">
        <div
          className="absolute inset-0 bg-[url('/home/backgrounds/mountains.jpg')] bg-cover bg-center opacity-[0.18]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-white via-white/90 to-secondary/20"
          aria-hidden="true"
        />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 md:px-8 md:py-20">
          <p className="font-accent text-sm uppercase tracking-[0.3em] text-secondary">
            About Warrior Revival
          </p>
          <h1 className="max-w-3xl font-blackOps text-4xl font-normal text-primary md:text-5xl">
            A veteran-led community built around adventure, mentorship, and belonging.
          </h1>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              Volunteer with us
            </button>
            <button className="inline-flex items-center justify-center rounded-md border border-primary px-5 py-2 text-xs font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              Support the mission
            </button>
          </div>
        </div>
      </section>

      <section className="bg-light">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 md:grid-cols-3 md:px-8">
          {missionCards.map((card) => (
            <div
              key={card.title}
              className={`flex h-full flex-col rounded-2xl border bg-surface p-6 shadow-card ${card.borderClass}`}
            >
              <span
                className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${card.badgeClass}`}
              >
                {card.title}
              </span>
              <p className="mt-4 text-sm text-textSecondary">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:items-start md:px-8">
          <div className="space-y-4">
            <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl">
              Founded to help Utah&apos;s military community find a renewed sense of
              purpose, belonging, and identity.
            </h2>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              OUR STORY
            </p>
            <p className="text-base text-textSecondary">
              Warrior Revival was created to fill a space that disappears when
              military service ends.
            </p>
            <p className="text-base text-textSecondary">
              Through work within the VA, its founder saw many veterans struggling
              with transition - not because of a mental health disorder, but because
              they had lost the camaraderie, support, and leadership opportunities
              that once structured their lives. With few non-clinical options
              available, many were routed into mental health care for &quot;adjustment
              issues,&quot; when what they actually needed was connection and purpose.
              While mental health challenges do exist after service, not every
              transition struggle is clinical.
            </p>
            <p className="text-base text-textSecondary">
              A practical gap was also evident. Post-9/11 veterans are balancing
              careers, school, and families, yet most support services operate during
              business hours. Nights and weekends - when isolation is often strongest
              - are exactly when veterans have the fewest options.
            </p>
            <p className="text-base text-textSecondary">
              Warrior Revival was built to meet veterans where they are and to
              recreate what military life naturally provided: shared experiences,
              peer support, and meaningful opportunities to lead and contribute.
              Through recreational experiences veterans want to do, Warrior Revival
              builds community, reinforces identity, and supports the transition to
              civilian life.
            </p>
            <p className="text-base text-textSecondary">
              Warrior Revival does not replace mental health care. It restores the
              human infrastructure that existed before the uniform came off.
            </p>
          </div>
          <div className="self-start rounded-2xl border border-border bg-light p-6 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-textSecondary">
              Focus areas
            </p>
            <div className="mt-4 space-y-4">
              {focusAreas.map((area) => (
                <div key={area.title}>
                  <p className="font-heading text-lg font-semibold text-primary">
                    {area.title}
                  </p>
                  <p className="mt-2 text-sm text-textSecondary">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
                Leadership
              </p>
              <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl">
                Meet the leadership team
              </h2>
              <p className="max-w-2xl text-sm text-textSecondary">
                Our board and advisors bring clinical insight, service experience,
                and community leadership to every program we offer.
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="sm:col-span-2 lg:col-span-3">
              <div className="rounded-3xl border border-border bg-surface p-6 shadow-card md:p-10">
                <div className="grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center">
                  <div className="overflow-hidden rounded-2xl border border-border bg-white">
                    <img
                      src={founderProfile.image}
                      alt={`${founderProfile.firstName} ${founderProfile.lastName}, ${founderProfile.role}`}
                      className="h-64 w-full object-cover md:h-72 lg:h-80"
                    />
                  </div>
                  <div className="px-6 py-8 text-center md:px-10 md:py-12">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                      Founder &amp; President
                    </p>
                    <h3 className="mt-3 font-heading text-2xl font-semibold text-primary md:text-3xl">
                      {founderProfile.firstName} {founderProfile.lastName}
                    </h3>
                    <p className="mx-auto mt-4 max-w-2xl text-sm text-textSecondary md:text-base">
                      {founderProfile.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {leadershipTeam.map((member) => {
              const fullName = `${member.firstName} ${member.lastName}`;
              return (
                <article
                  key={fullName}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02]"
                >
                  <div className="h-56 w-full overflow-hidden">
                    <img
                      src={member.image}
                      alt={`${fullName}, ${member.role}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                      {member.role}
                    </p>
                    <h3 className="mt-2 font-heading text-xl font-semibold text-primary">
                      {fullName}
                    </h3>
                    <p className="mt-3 text-sm text-textSecondary">{member.bio}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
                Volunteers
              </p>
              <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl">
                The volunteers who make it happen
              </h2>
              <p className="max-w-2xl text-sm text-textSecondary">
                Our volunteer team brings lived experience, steady leadership, and
                heartfelt encouragement to every event.
              </p>
            </div>
            <button className="inline-flex items-center justify-center rounded-md border border-primary px-5 py-2 text-xs font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              Join the volunteer team
            </button>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {volunteers.map((volunteer) => {
              const displayName = volunteer.lastInitial
                ? `${volunteer.firstName} ${volunteer.lastInitial}.`
                : volunteer.firstName;
              const volunteerImage = volunteer.image ?? "/logo.webp";
              return (
                <div
                  key={displayName}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-white p-4 shadow-soft"
                >
                  <img
                    src={volunteerImage}
                    alt={`${displayName}, ${volunteer.branch}`}
                    className="h-16 w-16 rounded-full border border-border bg-white object-cover"
                  />
                  <div>
                    <p className="font-heading text-lg font-semibold text-primary">
                      {displayName}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-textSecondary">
                      {volunteer.branch}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-light">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
                Join the mission
              </p>
              <h2 className="mt-4 font-heading text-3xl font-semibold text-primary md:text-4xl">
                Ready to support veterans on their next chapter?
              </h2>
              <p className="mt-4 text-base text-textSecondary">
                Volunteer your time, sponsor an event, or donate to keep outdoor
                experiences and mentorship programs accessible to every veteran we
                serve.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                Donate today
              </button>
              <button className="inline-flex items-center justify-center rounded-md border border-primary px-5 py-3 text-xs font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                Become a volunteer
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-10">
            <img
              src="/logo3.png"
              alt="Warrior Revival logo"
              className="h-[18rem] w-auto md:h-[21rem] lg:h-[24rem] md:shrink-0"
            />
            <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 text-white md:flex-1 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                Newsletter
              </p>
              <div className="mt-3 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <p className="font-heading text-3xl font-semibold">
                  Get monthly updates and new adventure dates.
                </p>
                <div className="flex w-full flex-col gap-3 md:max-w-none">
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
        </div>
      </section>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm text-textSecondary md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="font-heading text-base font-semibold text-primary">Warrior Revival</p>
            <p className="text-xs uppercase tracking-[0.2em] text-textSecondary">Utah</p>
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
