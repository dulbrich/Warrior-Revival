import QgivEmbed from "@/components/QgivEmbed";
import { qgivDonationEmbedId, qgivDonationEmbedUrl, qgivDonationFormUrl } from "@/lib/donation";
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
          <h1 className="mt-4 font-heading text-5xl font-semibold text-primary md:text-6xl">
            Your gift fuels the next adventure.
          </h1>
          <p className="mt-4 max-w-3xl text-base text-textSecondary">
            Every warrior deserves a tribe — and your gift helps build it.
            Donations fund outdoor experiences, mentorship programs, and
            community resources that support service members, veterans, and
            their families through transition and beyond. One-time or recurring,
            every contribution moves the mission forward.
          </p>
          <a
            href={qgivDonationFormUrl}
            className="mt-6 inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 text-base font-bold uppercase tracking-wide text-white shadow-soft transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Open secure donation form
          </a>
        </div>
      </section>

      <section id="give" className="border-t border-border bg-light">
        <div className="mx-auto max-w-3xl px-4 py-14 md:px-8">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface p-4 shadow-card md:p-6">
            <QgivEmbed embedId={qgivDonationEmbedId} embedUrl={qgivDonationEmbedUrl} />
          </div>
        </div>
      </section>

      <SubscribeSection />
      <SiteFooter />
    </main>
  );
}
