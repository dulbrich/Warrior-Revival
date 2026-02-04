import Image from "next/image";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SubscribeSection from "@/components/SubscribeSection";

const veteranSteps = [
  {
    title: "Membership is free",
    description: "Veterans and participants can join at no cost."
  },
  {
    title: "Share your interests",
    description:
      "Select activities like side-by-side rides, hiking, scuba, and skydiving."
  },
  {
    title: "Get relevant updates",
    description: "Receive event invitations and emails tailored to your selected interests."
  }
];

const volunteerRoles = [
  {
    title: "Event support",
    description: "Help with setup, logistics, check-in, and participant care on activity days."
  },
  {
    title: "Planning team",
    description:
      "Coordinate schedules, vendors, and details that keep activities safe and organized."
  },
  {
    title: "Mentorship",
    description:
      "Provide peer support to veterans navigating transition, reintegration, and community."
  },
  {
    title: "Outreach",
    description:
      "Connect veterans, families, and local partners to Warrior Revival opportunities."
  }
];

const sponsorLevels = [
  {
    tier: "Gold",
    support: "$10,000+",
    benefits: "Top logo placement, major event recognition, social mentions"
  },
  {
    tier: "Silver",
    support: "$5,000+",
    benefits: "Featured logo placement, event signage, newsletter recognition"
  },
  {
    tier: "Bronze",
    support: "$2,500+",
    benefits: "Partners page listing and community event recognition"
  }
];

const featuredSponsors = [
  { name: "Lionheart", logo: "/home/sponsors/gold/lionheart.jpg" },
  { name: "Cyprus", logo: "/home/sponsors/gold/cyprus.jpg" },
  { name: "LM", logo: "/home/sponsors/gold/lm.jpg" }
];

export default function GetInvolvedPage() {
  return (
    <main className="bg-light">
      <SiteHeader />

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
            Get involved
          </p>
          <h1 className="max-w-3xl font-blackOps text-4xl font-normal text-primary md:text-5xl">
            Join Warrior Revival as a participant, volunteer, or sponsor.
          </h1>
          <p className="max-w-3xl text-base text-textSecondary">
            This page is organized for veterans, volunteers, and sponsors so each group
            can quickly find the right next step.
          </p>
        </div>
      </section>

      <section id="veterans" className="border-t border-border bg-light">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
          <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl">
            For veterans and participants
          </h2>
          <p className="mt-3 max-w-3xl text-base text-textSecondary">
            Become a member to join events, find mentorship, and receive opportunities
            matched to your interests.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {veteranSteps.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-border bg-surface p-6 shadow-card"
              >
                <h3 className="font-heading text-xl font-semibold text-primary">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-textSecondary">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Join as a member
            </a>
            <a
              href="/events"
              className="inline-flex items-center justify-center rounded-md border border-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Browse events
            </a>
          </div>
        </div>
      </section>

      <section id="volunteers" className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
          <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl">
            For volunteers
          </h2>
          <p className="mt-3 max-w-3xl text-base text-textSecondary">
            Volunteer forms collect your availability, skills, preferences, and contact
            details.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {volunteerRoles.map((role) => (
              <div
                key={role.title}
                className="rounded-2xl border border-border bg-light p-6 shadow-card"
              >
                <h3 className="font-heading text-xl font-semibold text-primary">
                  {role.title}
                </h3>
                <p className="mt-3 text-sm text-textSecondary">{role.description}</p>
              </div>
            ))}
          </div>
          <a
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-md border border-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Apply to volunteer
          </a>
        </div>
      </section>

      <section id="sponsors" className="bg-light">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
          <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl">
            For sponsors
          </h2>
          <p className="mt-3 max-w-3xl text-base text-textSecondary">
            Sponsorships fund adaptive activities and provide visibility through events,
            outreach, and marketing materials.
          </p>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-surface shadow-card">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-border text-sm uppercase tracking-wide text-textSecondary">
                  <th className="px-5 py-4 font-semibold">Tier</th>
                  <th className="px-5 py-4 font-semibold">Support</th>
                  <th className="px-5 py-4 font-semibold">Benefits</th>
                </tr>
              </thead>
              <tbody>
                {sponsorLevels.map((level) => (
                  <tr
                    key={level.tier}
                    className="border-b border-border/80 text-sm text-textPrimary last:border-b-0"
                  >
                    <td className="px-5 py-4 font-semibold text-primary">{level.tier}</td>
                    <td className="px-5 py-4">{level.support}</td>
                    <td className="px-5 py-4 text-textSecondary">{level.benefits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-card">
            <h3 className="font-heading text-xl font-semibold text-primary">Current sponsors</h3>
            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              {featuredSponsors.map((sponsor) => (
                <div
                  key={sponsor.name}
                  className="flex h-24 items-center justify-center rounded-xl border border-border bg-light p-4"
                >
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} sponsor logo`}
                    width={180}
                    height={64}
                    className="h-full w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/partners"
              className="inline-flex items-center justify-center rounded-md border border-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              View all partners
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Become a sponsor
            </a>
          </div>
        </div>
      </section>

      <SubscribeSection />
      <SiteFooter />
    </main>
  );
}
