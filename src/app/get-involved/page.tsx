import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SubscribeSection from "@/components/SubscribeSection";

const involvementPaths = [
  {
    title: "Veterans",
    description:
      "Join an upcoming outing, find a mentor, and build a community that understands the transition."
  },
  {
    title: "Volunteers",
    description:
      "Lend your time to support events, outreach, and the behind-the-scenes work that keeps us moving."
  },
  {
    title: "Sponsors",
    description:
      "Partner with Warrior Revival to fund adventures, retreats, and community impact."
  }
];

export default function GetInvolvedPage() {
  return (
    <main className="bg-light">
      <SiteHeader />

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            Get involved
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold text-primary md:text-5xl">
            Choose your pathway to impact.
          </h1>
          <p className="mt-4 max-w-3xl text-base text-textSecondary">
            Whether you are a veteran, volunteer, or sponsor, there is a way to stand
            alongside the Warrior Revival community.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {involvementPaths.map((path) => (
              <div
                key={path.title}
                className="flex h-full flex-col rounded-2xl border border-border bg-light p-6 shadow-card"
              >
                <h2 className="font-heading text-xl font-semibold text-primary">
                  {path.title}
                </h2>
                <p className="mt-3 text-sm text-textSecondary">{path.description}</p>
                <button className="mt-auto inline-flex items-center justify-center rounded-md border border-primary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  Learn more
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SubscribeSection />
      <SiteFooter />
    </main>
  );
}
