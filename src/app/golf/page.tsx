import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SubscribeSection from "@/components/SubscribeSection";

const registrationUrl = "https://secure.qgiv.com/for/warriorrevival/event/golf/";
const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=Hubbard%20Golf%20Course%207005%20Golf%20Course%20Drive%20Hill%20AFB%20UT%2084056";
const mapEmbedUrl =
  "https://www.google.com/maps?q=Hubbard%20Golf%20Course%207005%20Golf%20Course%20Drive%20Hill%20AFB%20UT%2084056&output=embed";

const quickFacts = [
  { label: "Date", value: "Friday, October 2, 2026" },
  { label: "Check-in", value: "Starts at 7:30 AM MDT" },
  { label: "Shotgun start", value: "9:00 AM MDT" },
  { label: "Format", value: "Scramble tournament" },
  { label: "Location", value: "Hubbard Golf Course, Hill AFB" },
  { label: "Registration deadline", value: "Friday, September 25, 2026 at 11:59 AM MDT" }
];

const registrationIncludes = [
  "Admission to Warrior Revival's 3rd Annual Golf Tournament",
  "Golf cart, two per foursome",
  "Lunch following tournament play",
  "Opportunities to participate in raffles and prizes",
  "A unique opportunity to play on Hill Air Force Base while supporting veterans"
];

const schedule = [
  { time: "7:30 AM", detail: "Registration opens" },
  { time: "8:45 AM", detail: "Opening ceremony" },
  { time: "9:00 AM", detail: "Shotgun start" },
  { time: "2:00 PM", detail: "Lunch and awards" },
  { time: "2:30 PM", detail: "Raffle drawings" },
  { time: "3:30 PM", detail: "Tournament concludes" }
];

const sponsorshipLevels = [
  {
    tier: "Title Sponsor",
    amount: "$7,500",
    benefits: [
      "Two complimentary foursome teams (Incl. cart and lunch)",
      "18x24 in. tee sign with logo",
      "Space to set up a 10x10 canopy at a hole",
      "Recognition on print and social media leading up to the golf event",
      "Breakfast and luncheon sponsor with an opportunity to speak at the luncheon",
      "Corporate sponsorship on the Warrior Revival website",
      "Sponsorship on the events canopy for one year",
      "Option to add an organization flyer or sample to the goodie bag"
    ]
  },
  {
    tier: "Gold Sponsor",
    amount: "$5,000",
    benefits: [
      "Two complimentary foursome teams (Incl. cart and lunch)",
      "18x24 in. tee sign with logo",
      "Space to set up a 10x10 canopy at a hole",
      "Recognition on print and social media leading up to the golf event",
      "Breakfast sponsor",
      "Corporate sponsorship on the Warrior Revival website",
      "Sponsorship on the events canopy for one year",
      "Option to add an organization flyer or sample to the goodie bag"
    ]
  },
  {
    tier: "Silver Sponsor",
    amount: "$3,000",
    benefits: [
      "One complimentary foursome team (Incl. cart and lunch)",
      "18x24 in. tee sign with logo",
      "Space to set up a 10x10 canopy at a hole",
      "Recognition on print and social media leading up to the golf event",
      "Corporate sponsorship on the Warrior Revival website"
    ]
  },
  {
    tier: "Bronze Sponsor",
    amount: "$1,500",
    benefits: [
      "One complimentary foursome team (Incl. cart and lunch)",
      "18x24 in. tee sign with logo",
      "Space to set up a 10x10 canopy at a hole"
    ]
  }
];

const sponsorNeeds = ["Teams", "Hole Sponsors", "Raffle Prize Donors", "In-Kind Donors"];

const confirmedSponsors: Array<{
  name: string;
  tier?: string;
  logo?: string;
  href?: string;
}> = [
  {
    name: "Rate",
    tier: "Silver Sponsor",
    logo: "https://dih4lvql8rjzt.cloudfront.net/cms/8d29c03a-1b06-48dd-9f69-7dd554f49220_rate-arrow-logo.png",
    href: "https://www.rate.com"
  },
  {
    name: "Cyprus Credit Union",
    tier: "Bronze Sponsor",
    logo: "/home/sponsors/gold/cyprus.jpg",
    href: "https://www.cypruscu.com"
  },
  {
    name: "KeyVia Mortgage",
    tier: "Bronze Sponsor",
    logo: "https://keyviamortgage.com/wp-content/uploads/2025/11/favicon-1.svg",
    href: "https://keyviamortgage.com"
  },
  {
    name: "Liberty Drug LLC",
    tier: "Bronze Sponsor",
    logo: "/golf/sponsors/liberty-drug.png",
    href: "https://www.libertydrugut.com"
  },
  {
    name: "LM Realty",
    tier: "Bronze Sponsor",
    href: "https://www.instagram.com/listwithlyss/"
  },
  {
    name: "Utah Veteran Business Resource Center (VBRC)",
    tier: "Bronze Sponsor",
    logo: "/golf/sponsors/utah-vbrc.png",
    href: "https://utahvbrc.org"
  }
];

export const metadata: Metadata = {
  title: "Golf Fundraiser | Warrior Revival",
  description:
    "Register for Warrior Revival's 3rd Annual Golf Tournament at Hubbard Golf Course on Hill Air Force Base on October 2, 2026."
};

export default function GolfPage() {
  return (
    <main className="bg-light">
      <SiteHeader />

      <section className="relative overflow-hidden bg-primary text-white">
        <Image
          src="/golf/hero.png"
          alt="Golf course fairway with mountains behind it"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent" />
        <div className="relative mx-auto flex min-h-[680px] max-w-7xl flex-col justify-end px-4 pb-14 pt-28 md:px-8 md:pb-20">
          <p className="font-accent text-sm uppercase tracking-[0.3em] text-white/80">
            Warrior Revival Golf Fundraiser
          </p>
          <h1 className="mt-4 max-w-4xl font-blackOps text-5xl font-normal text-white md:text-7xl">
            3rd Annual Golf Tournament
          </h1>
          <p className="mt-5 max-w-3xl text-base text-white/85 md:text-lg">
            Join Warrior Revival for its largest fundraiser of the year and help support
            veterans through recreation, retreats, mentorship, and community connection.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={registrationUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-base font-bold uppercase tracking-wide text-white shadow-soft transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Register Now
            </a>
            <a
              href="#sponsors"
              className="inline-flex items-center justify-center rounded-md border border-white/80 px-6 py-3 text-base font-bold uppercase tracking-wide text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              View sponsorships
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 md:grid-cols-3 md:px-8 xl:grid-cols-6">
          {quickFacts.map((fact) => (
            <div key={fact.label} className="rounded-xl border border-border bg-light p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                {fact.label}
              </p>
              <p className="mt-2 text-base font-semibold text-primary">{fact.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-light">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:px-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <div>
            <p className="font-accent text-sm uppercase tracking-[0.3em] text-secondary">
              Tournament Details
            </p>
            <h2 className="mt-3 max-w-3xl font-heading text-3xl font-semibold text-primary md:text-4xl">
              Golf at Hubbard Golf Course while funding connection for veterans and families.
            </h2>
            <div className="mt-6 space-y-5 text-base text-textSecondary md:text-lg">
              <p>
                This scramble-format tournament welcomes military, veterans, families,
                community supporters, and civilian participants. Because the course is on Hill
                Air Force Base, early registration is important for base access processing.
              </p>
              <p>
                Warrior Revival will reach out in September to collect each guest&apos;s full
                name, date of birth, driver license number, and state of issue exactly as it
                appears on the license. That information is needed no later than 10 business
                days before the tournament.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={registrationUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 text-base font-bold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Get tickets
              </a>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-primary px-5 py-3 text-base font-bold uppercase tracking-wide text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Get directions
              </a>
            </div>
          </div>

          <aside className="rounded-2xl border border-border bg-surface p-6 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Location
            </p>
            <h3 className="mt-3 font-heading text-2xl font-semibold text-primary">
              Hubbard Golf Course
            </h3>
            <p className="mt-3 text-base text-textSecondary">
              7005 Golf Course Drive
              <br />
              Hill AFB, Utah 84056
              <br />
              United States
            </p>
            <div className="mt-6 overflow-hidden rounded-xl border border-border bg-light">
              <iframe
                title="Map to Hubbard Golf Course"
                src={mapEmbedUrl}
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:px-8 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Registration Includes
            </p>
            <div className="mt-8 grid gap-4">
              {registrationIncludes.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-xl border border-border bg-light p-4 text-base text-textSecondary"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Schedule
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-primary md:text-4xl">
              Friday, October 2, 2026
            </h2>
            <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
              {schedule.map((item) => (
                <div
                  key={`${item.time}-${item.detail}`}
                  className="grid grid-cols-[100px_minmax(0,1fr)] border-b border-border last:border-b-0"
                >
                  <p className="bg-light px-4 py-4 text-sm font-bold uppercase tracking-[0.12em] text-primary">
                    {item.time}
                  </p>
                  <p className="px-4 py-4 text-base text-textSecondary">{item.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-textSecondary">Schedule subject to change.</p>
          </div>
        </div>
      </section>

      <section id="sponsors" className="bg-light">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <div className="max-w-3xl">
            <p className="font-accent text-sm uppercase tracking-[0.3em] text-secondary">
              Sponsorship Opportunities
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-primary md:text-4xl">
              Put your organization behind Warrior Revival&apos;s biggest fundraiser.
            </h2>
            <p className="mt-4 text-base text-textSecondary md:text-lg">
              Sponsorships help fund outdoor experiences, retreats, mentorship, and community
              resources for veterans and their families. Warrior Revival is currently seeking
              teams, hole sponsors, raffle prize donors, and in-kind donors.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {sponsorNeeds.map((need) => (
              <div
                key={need}
                className="rounded-xl border border-border bg-surface px-4 py-3 text-base font-semibold text-primary shadow-soft"
              >
                {need}
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {sponsorshipLevels.map((level) => (
              <article
                key={level.tier}
                className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-card"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-heading text-2xl font-semibold text-primary">
                    {level.tier}
                  </h3>
                  <p className="font-heading text-3xl font-semibold text-accent">
                    {level.amount}
                  </p>
                </div>
                <ul className="mt-5 grid gap-3 text-base text-textSecondary">
                  {level.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-secondary" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-border bg-surface p-6 shadow-card md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
                  Signed-Up Sponsors
                </p>
                <h3 className="mt-2 font-heading text-2xl font-semibold text-primary">
                  Sponsor spotlight
                </h3>
              </div>
              <a
                href={registrationUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center justify-center rounded-md border border-primary px-4 py-2 text-base font-bold uppercase tracking-wide text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Become a sponsor
              </a>
            </div>

            {confirmedSponsors.length > 0 ? (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {confirmedSponsors.map((sponsor) => {
                  const isSilverSponsor = sponsor.tier === "Silver Sponsor";
                  const isBronzeSponsor = sponsor.tier === "Bronze Sponsor";

                  return (
                    <a
                      key={sponsor.name}
                      href={sponsor.href ?? registrationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex min-h-36 flex-col justify-center rounded-xl border p-5 transition hover:border-secondary hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                        isSilverSponsor
                          ? "border-slate-400 bg-gradient-to-br from-white via-slate-50 to-slate-200 shadow-card ring-1 ring-slate-300 sm:col-span-2 lg:col-span-1"
                          : isBronzeSponsor
                            ? "border-[#a4683a] bg-gradient-to-br from-[#fffaf5] via-[#f4e1cf] to-[#c98b5c]/55 shadow-soft ring-1 ring-[#b87333]/40"
                            : "border-border bg-light"
                      }`}
                    >
                      {sponsor.logo ? (
                        <Image
                          src={sponsor.logo}
                          alt={`${sponsor.name} sponsor logo`}
                          width={220}
                          height={80}
                          className="h-20 w-auto max-w-full object-contain"
                        />
                      ) : null}
                      <p className="mt-4 font-heading text-xl font-semibold text-primary">
                        {sponsor.name}
                      </p>
                      {sponsor.tier ? (
                        <p
                          className={`mt-2 w-fit rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-[0.16em] ${
                            isSilverSponsor
                              ? "bg-slate-700 text-white"
                              : isBronzeSponsor
                                ? "bg-[#8b572a] text-white"
                                : "text-secondary"
                          }`}
                        >
                          {sponsor.tier}
                        </p>
                      ) : null}
                    </a>
                  );
                })}
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-dashed border-border bg-light p-6 text-base text-textSecondary">
                Confirmed tournament sponsors will be highlighted here as logos and names are
                added.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-primary text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="font-accent text-sm uppercase tracking-[0.3em] text-white/70">
              Questions
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold md:text-4xl">
              Need help with registration, sponsorships, or payment options?
            </h2>
            <p className="mt-4 max-w-3xl text-base text-white/80">
              Contact Katie Fry for tournament, sponsorship, donation, or registration
              questions. Checks may be mailed to Warrior Revival, 1914 E 9400 S #437,
              Sandy, UT 84093.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:katie.fry@warrior-revival.org"
              className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-base font-bold uppercase tracking-wide text-primary transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Email Katie
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-white/80 px-5 py-3 text-base font-bold uppercase tracking-wide text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Contact Warrior Revival
            </Link>
          </div>
        </div>
      </section>

      <SubscribeSection />
      <SiteFooter />
    </main>
  );
}
