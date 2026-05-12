import QgivEmbed from "@/components/QgivEmbed";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SubscribeSection from "@/components/SubscribeSection";

const qgivEmbedId = "86403";
const qgivEmbedUrl = "https://secure.qgiv.com/for/warriorrevival/embed/86403/";

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
            community resources veterans rely on during transition. One-time and
            recurring gifts are both welcome — choose what works for you.
          </p>
        </div>
      </section>

      <section id="give" className="border-t border-border bg-light">
        <div className="mx-auto max-w-3xl px-4 py-14 md:px-8">
          <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl">
            Make a donation
          </h2>
          <p className="mt-3 text-base text-textSecondary">
            Donations are processed securely by Qgiv on behalf of Warrior Revival.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface p-4 shadow-card md:p-6">
            <QgivEmbed embedId={qgivEmbedId} embedUrl={qgivEmbedUrl} />
          </div>
        </div>
      </section>

      <SubscribeSection />
      <SiteFooter />
    </main>
  );
}
