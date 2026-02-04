import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SubscribeSection from "@/components/SubscribeSection";
import Image from "next/image";
import Link from "next/link";

const activityPrograms = [
  {
    title: "Side-by-side rides",
    benefit:
      "Guided trail rides restore camaraderie, confidence, and shared purpose through team-based adventure.",
    eligibility: "Veterans and military families. Mobility accommodations available by request.",
    image: "/home/slide-show/side-by-side.jpg"
  },
  {
    title: "Hiking",
    benefit:
      "Small-group hikes support physical wellness, stress reduction, and meaningful peer connection.",
    eligibility: "All experience levels. Veterans may bring a support person or family member.",
    image: "/events/hiking.jpg"
  },
  {
    title: "Skydiving",
    benefit:
      "High-adrenaline challenge events build trust, resilience, and confidence in a controlled setting.",
    eligibility: "Veteran participants who meet event safety and medical requirements.",
    image: "/programs/skydiving.jpg"
  },
  {
    title: "Skiing & Snowboarding",
    benefit:
      "Winter mountain programs promote confidence, resilience, and teamwork through guided on-snow experiences.",
    eligibility: "Veterans and military families. Beginner and intermediate tracks available.",
    image: "/events/ski-snowboard.jpg"
  },
  {
    title: "Scuba",
    benefit:
      "Adaptive scuba experiences encourage focus, emotional regulation, and personal achievement.",
    eligibility: "Veterans who complete safety orientation and required paperwork.",
    image: "/programs/scuba.jpg"
  },
  {
    title: "Mentorship",
    benefit:
      "Peer-led mentorship helps veterans navigate career, community, and identity after service.",
    eligibility: "Veterans in transition and those seeking community support.",
    image: "/home/slide-show/uniforms.jpg"
  }
];

const programPillars = [
  {
    title: "Why these activities matter",
    description:
      "Each program combines outdoor challenge with peer support to reduce isolation and increase belonging."
  },
  {
    title: "Built for real schedules",
    description:
      "Most programs run on weekends or evenings to meet veterans and families when they are available."
  },
  {
    title: "Join at your own pace",
    description:
      "Participants can start with one event, then choose activities that best fit their interests and goals."
  }
];

export default function ProgramsPage() {
  return (
    <main className="bg-light">
      <SiteHeader />

      <section className="bg-surface">
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-[url('/home/backgrounds/mountains.jpg')] bg-cover bg-center opacity-[0.18]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-white via-white/90 to-secondary/25"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
            <p className="font-accent text-sm uppercase tracking-[0.3em] text-secondary">
              Programs &amp; Activities
            </p>
            <h1 className="mt-4 max-w-4xl font-blackOps text-4xl font-normal text-primary md:text-5xl">
              Adventure-led programs that strengthen connection, confidence, and purpose.
            </h1>
            <p className="mt-5 max-w-3xl text-base text-textSecondary md:text-lg">
              Warrior Revival offers activity pathways for veterans and families across Utah.
              Every program pairs meaningful experiences with community support and a clear
              next step into future events.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/events"
                className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                View upcoming events
              </Link>
              <Link
                href="/get-involved"
                className="inline-flex items-center justify-center rounded-md border border-primary px-5 py-2 text-xs font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Join an activity
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {programPillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-2xl border border-border bg-surface p-6 shadow-card"
              >
                <h2 className="font-heading text-xl font-semibold text-primary">
                  {pillar.title}
                </h2>
                <p className="mt-3 text-sm text-textSecondary">{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Activity categories
            </p>
            <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl">
              Explore the programs currently offered
            </h2>
            <p className="max-w-3xl text-sm text-textSecondary md:text-base">
              Each activity includes eligibility guidance and direct access to upcoming
              opportunities on the Events page.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {activityPrograms.map((program) => (
              <article
                key={program.title}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    sizes="(min-width: 1280px) 30vw, (min-width: 768px) 44vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-2xl font-semibold text-primary">
                    {program.title}
                  </h3>
                  <p className="mt-3 text-sm text-textSecondary">{program.benefit}</p>
                  <p className="mt-4 rounded-xl border border-border bg-light px-3 py-2 text-xs text-textSecondary">
                    <span className="font-semibold uppercase tracking-[0.12em] text-primary">
                      Eligibility:{" "}
                    </span>
                    {program.eligibility}
                  </p>
                  <Link
                    href="/events"
                    className="mt-5 inline-flex w-fit items-center justify-center rounded-md border border-primary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    See related events
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-light">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
          <div className="rounded-3xl border border-border bg-surface p-8 shadow-card md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Join an activity
            </p>
            <h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold text-primary md:text-4xl">
              Ready to get involved?
            </h2>
            <p className="mt-4 max-w-3xl text-sm text-textSecondary md:text-base">
              Start by joining as a participant or browse current events to find the
              best fit. Warrior Revival membership is free, and programs are designed to
              create lasting community support.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/veterans"
                className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Become a member
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center justify-center rounded-md border border-primary px-5 py-2 text-xs font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Browse events
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SubscribeSection />
      <SiteFooter />
    </main>
  );
}
