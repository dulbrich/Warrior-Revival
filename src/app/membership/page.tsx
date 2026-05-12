import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SubscribeSection from "@/components/SubscribeSection";
import ZeffyEmbed from "@/components/ZeffyEmbed";

const membershipFormPath = "/embed/ticketing/2b7161ed-1ae5-4833-a475-c08932cc611d";

const memberBenefits = [
  {
    title: "Free for veterans and participants",
    description: "There is no cost to join. Membership is open to veterans and their support people."
  },
  {
    title: "Tailored event invitations",
    description:
      "Tell us which activities you enjoy — hiking, side-by-side rides, scuba, skydiving, and more — and we'll match you with events that fit."
  },
  {
    title: "Community and mentorship",
    description:
      "Stay connected with peers, mentors, and Warrior Revival staff who walk alongside veterans through every chapter of transition."
  }
];

export default function MembershipPage() {
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
            Membership
          </p>
          <h1 className="max-w-3xl font-blackOps text-4xl font-normal text-primary md:text-5xl">
            Join Warrior Revival.
          </h1>
          <p className="max-w-3xl text-base text-textSecondary">
            Membership is free for veterans and their support people. Sign up below to
            receive event invitations matched to your interests and stay connected to
            the Warrior Revival community.
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-light">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {memberBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-border bg-surface p-6 shadow-card"
              >
                <h2 className="font-heading text-xl font-semibold text-primary">
                  {benefit.title}
                </h2>
                <p className="mt-3 text-sm text-textSecondary">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="signup" className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-14 md:px-8">
          <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl">
            Sign up
          </h2>
          <p className="mt-3 text-base text-textSecondary">
            Complete the form below to become a member. There is no charge — Zeffy
            handles the form on our behalf.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-light shadow-card">
            <ZeffyEmbed
              formPath={membershipFormPath}
              title="Warrior Revival membership form powered by Zeffy"
            />
          </div>
        </div>
      </section>

      <SubscribeSection />
      <SiteFooter />
    </main>
  );
}
