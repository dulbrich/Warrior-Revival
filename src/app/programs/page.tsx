import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SubscribeSection from "@/components/SubscribeSection";

const programHighlights = [
  {
    title: "Outdoor recreation",
    description:
      "Hikes, retreats, and adventure outings designed to rebuild confidence and camaraderie."
  },
  {
    title: "Mentorship",
    description:
      "Peer-to-peer guidance that helps veterans navigate life after service with clarity."
  },
  {
    title: "Family support",
    description:
      "Events that include spouses and kids to strengthen the whole support system."
  }
];

export default function ProgramsPage() {
  return (
    <main className="bg-light">
      <SiteHeader />

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            Programs
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold text-primary md:text-5xl">
            Programs and activities built for every stage of transition.
          </h1>
          <p className="mt-4 max-w-3xl text-base text-textSecondary">
            Warrior Revival creates meaningful, veteran-led experiences that mix outdoor
            adventure with mentorship and community connection.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {programHighlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-light p-6 shadow-card"
              >
                <h2 className="font-heading text-xl font-semibold text-primary">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm text-textSecondary">{item.description}</p>
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
