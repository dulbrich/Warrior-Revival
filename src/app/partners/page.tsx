import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SubscribeSection from "@/components/SubscribeSection";

const partnerBenefits = [
  "Sponsor an adventure and deliver direct impact to veterans and families.",
  "Gain visibility across events, newsletters, and community outreach.",
  "Support a veteran-led nonprofit with measurable outcomes."
];

export default function PartnersPage() {
  return (
    <main className="bg-light">
      <SiteHeader />

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            Partners
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold text-primary md:text-5xl">
            Our partners power every adventure.
          </h1>
          <p className="mt-4 max-w-3xl text-base text-textSecondary">
            Sponsorships and community partnerships help us provide veterans with
            connection, mentorship, and outdoor experiences across Utah.
          </p>
          <div className="mt-10 grid gap-4 rounded-2xl border border-border bg-light p-6 shadow-card">
            {partnerBenefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3 text-textSecondary">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-accent" />
                <p className="text-sm">{benefit}</p>
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
