import Container from "@/components/Container";
import PrimaryButton from "@/components/PrimaryButton";

export default function Home() {
  return (
    <main>
      <section className="bg-slate-50 py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                Warrior Revival
              </p>
              <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
                Empowering veterans to thrive through adventure and community.
              </h1>
              <p className="text-lg text-slate-600">
                This Next.js foundation introduces the refreshed layout, typography, and CTA
                scaffolding needed to implement the FRD requirements across programs, events,
                and ways to get involved.
              </p>
              <div className="flex flex-wrap gap-3">
                <PrimaryButton href="/donate">Donate</PrimaryButton>
                <PrimaryButton href="/get-involved" variant="secondary">
                  Join the community
                </PrimaryButton>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Design system highlights</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600" />
                  Bright, accessible palette anchored by indigo accents.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600" />
                  Rounded CTAs and soft surfaces for a welcoming tone.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600" />
                  Responsive layout grid ready for CMS-driven content.
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
      <section className="py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "Programs & Activities",
                description:
                  "Showcase outdoor adventures and mentorship opportunities with flexible layouts."
              },
              {
                title: "Upcoming Events",
                description:
                  "Surface the next 3-5 events with data from the CMS and clear registration CTAs."
              },
              {
                title: "Get Involved",
                description:
                  "Guide veterans, volunteers, and sponsors toward tailored sign-up journeys."
              }
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{card.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
