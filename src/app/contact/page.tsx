import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SubscribeSection from "@/components/SubscribeSection";

export default function ContactPage() {
  return (
    <main className="bg-light">
      <SiteHeader />

      <section className="bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Contact
            </p>
            <h1 className="mt-4 font-heading text-4xl font-semibold text-primary md:text-5xl">
              Let&apos;s connect.
            </h1>
            <p className="mt-4 text-base text-textSecondary">
              Reach out with questions about events, volunteering, or partnerships.
              We are based in Utah and ready to help.
            </p>
            <div className="mt-6 space-y-2 text-sm text-textSecondary">
              <p>
                <span className="font-semibold text-primary">Email:</span>{" "}
                hello@warriorrevival.org
              </p>
              <p>
                <span className="font-semibold text-primary">Phone:</span> (801) 555-0123
              </p>
              <p>
                <span className="font-semibold text-primary">Location:</span> Utah
              </p>
            </div>
          </div>
          <form className="rounded-2xl border border-border bg-light p-6 shadow-card">
            <div className="grid gap-4">
              <label className="text-sm font-semibold text-textSecondary">
                Name
                <input
                  className="mt-2 h-11 w-full rounded-md border border-border bg-white px-3 text-base text-textPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  type="text"
                  placeholder="Your name"
                />
              </label>
              <label className="text-sm font-semibold text-textSecondary">
                Email
                <input
                  className="mt-2 h-11 w-full rounded-md border border-border bg-white px-3 text-base text-textPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  type="email"
                  placeholder="you@example.com"
                />
              </label>
              <label className="text-sm font-semibold text-textSecondary">
                Message
                <textarea
                  className="mt-2 min-h-[140px] w-full rounded-md border border-border bg-white px-3 py-2 text-base text-textPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  placeholder="How can we help?"
                />
              </label>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      </section>

      <SubscribeSection />
      <SiteFooter />
    </main>
  );
}
