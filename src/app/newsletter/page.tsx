import NewsletterForm from "@/components/NewsletterForm";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function NewsletterPage() {
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
            Newsletter
          </p>
          <h1 className="max-w-3xl font-blackOps text-5xl font-normal text-primary md:text-6xl">
            Stay in the loop.
          </h1>
          <p className="max-w-3xl text-base text-textSecondary">
            Get monthly updates from Warrior Revival — new event dates, program
            highlights, and stories from the community. We never share your address.
          </p>
        </div>
      </section>

      <section id="signup" className="bg-primary">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-card md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Sign up
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-primary md:text-4xl">
              Add your name to our mailing list
            </h2>
            <p className="mt-3 text-base text-textSecondary">
              Sign-ups are managed by Bloomerang on Warrior Revival&apos;s behalf.
            </p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
