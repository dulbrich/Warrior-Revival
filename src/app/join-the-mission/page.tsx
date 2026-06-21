import Image from "next/image";
import ReintegrationVoices from "@/components/ReintegrationVoices";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SubscribeSection from "@/components/SubscribeSection";

const veteranSteps = [
  {
    title: "Membership is always free",
    description:
      "Membership is always free — because no warrior should have to pay to find their people."
  },
  {
    title: "Tell us what you love",
    description:
      "Tell us what you love — side-by-sides, hiking, scuba, skydiving — and we'll match you with experiences built around it."
  },
  {
    title: "A Community for Your Whole Family",
    description:
      "From family-friendly outdoor adventures to community gatherings, Warrior Revival makes sure the people who supported your service feel just as welcomed, valued, and connected as you do."
  }
];

const volunteerRoles = [
  {
    title: "Event support",
    description: "Help with setup, logistics, check-in, and participant care on activity days."
  },
  {
    title: "Admin team",
    description: "Help behind the scenes with grants, vendors, welcoming members."
  },
  {
    title: "Mentorship",
    description:
      "Show up for warriors who are finding their footing — your experience and presence matter more than you know."
  },
  {
    title: "Outreach",
    description: "Help spread the word and bring more warriors and families into the tribe."
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

export default function JoinTheMissionPage() {
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
            Join the mission
          </p>
          <h1 className="max-w-3xl font-blackOps text-5xl font-normal text-primary md:text-6xl">
            Join Warrior Revival as a participant, volunteer, or sponsor.
          </h1>
          <p className="max-w-3xl text-base text-textSecondary">
            There&apos;s a place for you here — whether you&apos;re a warrior finding your
            tribe, someone ready to give back, or an organization that believes in the
            mission.
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl">
            Why It Matters
          </h2>
          <div className="mt-6 max-w-5xl space-y-5 text-base text-textSecondary">
            <p>
              Each year, nearly 200,000 Americans leave military service and face one of
              life&apos;s most difficult transitions. They traded civilian life for structure,
              brotherhood, and a mission that mattered — and when that ends, the silence
              can be deafening.
            </p>
            <p>The numbers tell a sobering story:</p>
            <ul className="list-disc space-y-3 pl-6">
              <li>Veterans are 1.5x more likely to die by suicide than non-veterans</li>
              <li>Nearly 44% of veterans report feeling isolated after leaving service</li>
              <li>1 in 3 veterans struggles with finding purpose and identity post-service</li>
              <li>
                Post-9/11 veterans cite loneliness and lack of community as their greatest
                challenges
              </li>
              <li>
                Less than 30% of veterans feel well-prepared for the transition to civilian
                life
              </li>
            </ul>
            <p>
              But the statistics only tell part of the story. Behind every number is a
              warrior who showed up every day for this country — and came home to a world
              that didn&apos;t always know how to show up back. That&apos;s why Warrior Revival
              exists. Not as a clinical program or a checkbox on a list of veteran services
              — but as a living, breathing community built around the things warriors
              actually want to do. Getting outside. Finding their people. Remembering who
              they are beyond the uniform. Because the best thing we can give a veteran
              isn&apos;t a pamphlet or a referral. It&apos;s a tribe.
            </p>
          </div>
        </div>
      </section>

      <ReintegrationVoices />

      <section id="veterans" className="border-t border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
          <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl">
            For veterans and participants
          </h2>
          <p className="mt-3 max-w-3xl text-base text-textSecondary">
            Become a member to join events, find mentorship, and receive opportunities
            matched to your interests. Whether you&apos;re still in uniform or already
            navigating civilian life — membership is your first step toward finding your
            tribe. Free to join, no pressure, just your next adventure waiting.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {veteranSteps.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-border bg-surface p-6 shadow-card"
              >
                <h3 className="font-heading text-2xl font-semibold text-primary">
                  {step.title}
                </h3>
                <p className="mt-3 text-base text-textSecondary">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/membership"
              className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-base font-bold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Join as a member
            </a>
            <a
              href="/events"
              className="inline-flex items-center justify-center rounded-md border border-primary px-6 py-3 text-base font-bold uppercase tracking-wide text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Browse events
            </a>
          </div>
        </div>
      </section>

      <section id="volunteers" className="border-y border-border bg-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
          <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl">
            For volunteers
          </h2>
          <p className="mt-3 max-w-3xl text-base text-textSecondary">
            Getting involved looks different for everyone — and that&apos;s perfectly okay.
            Whether you have an hour or a whole season, there&apos;s a role here that fits
            your life.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {volunteerRoles.map((role) => (
              <div
                key={role.title}
                className="rounded-2xl border border-border bg-white p-6 shadow-card"
              >
                <h3 className="font-heading text-2xl font-semibold text-primary">
                  {role.title}
                </h3>
                <p className="mt-3 text-base text-textSecondary">{role.description}</p>
              </div>
            ))}
          </div>
          <a
            href="https://volunteer.bloomerang.co/volunteer/#/join-party?k=j01dz2foygulh2"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-base font-bold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
                <tr className="border-b border-border text-base uppercase tracking-wide text-textSecondary">
                  <th className="px-5 py-4 font-semibold">Tier</th>
                  <th className="px-5 py-4 font-semibold">Support</th>
                  <th className="px-5 py-4 font-semibold">Benefits</th>
                </tr>
              </thead>
              <tbody>
                {sponsorLevels.map((level) => (
                  <tr
                    key={level.tier}
                    className="border-b border-border/80 text-base text-textPrimary last:border-b-0"
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
            <h3 className="font-heading text-2xl font-semibold text-primary">Current sponsors</h3>
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
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-base font-bold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
