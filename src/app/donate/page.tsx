import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SubscribeSection from "@/components/SubscribeSection";

export default function DonatePage() {
  return (
    <main className="bg-light">
      <SiteHeader />

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            Donate
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold text-primary md:text-5xl">
            Your gift fuels the next adventure.
          </h1>
          <p className="mt-4 max-w-3xl text-base text-textSecondary">
            Donations support outdoor experiences, mentorship programs, and the
            community resources veterans rely on during transition.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              Donate now
            </button>
            <button className="inline-flex items-center justify-center rounded-md border border-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              Become a monthly donor
            </button>
          </div>
        </div>
      </section>

      <SubscribeSection />
      <SiteFooter />
    </main>
  );
}
