import ContactForm from "./ContactForm";
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
            <p className="font-accent text-sm uppercase tracking-[0.3em] text-secondary">
              Contact
            </p>
            <h1 className="mt-4 max-w-3xl font-blackOps text-5xl font-normal text-primary md:text-6xl">
              Let&apos;s connect.
            </h1>
            <p className="mt-4 text-base text-textSecondary">
              Reach out with questions about events, volunteering, or partnerships.
              We are based in Utah and ready to help.
            </p>
            <div className="mt-6 space-y-2 text-base text-textSecondary">
              <p>
                <span className="font-semibold text-primary">Email:</span>{" "}
                <a href="mailto:info@warrior-revival.org" className="hover:text-primary">
                  info@warrior-revival.org
                </a>
              </p>
              <p>
                <span className="font-semibold text-primary">Phone:</span>{" "}
                <a href="tel:+18018105515" className="hover:text-primary">
                  801-810-5515
                </a>
              </p>
              <p>
                <span className="font-semibold text-primary">Location:</span> Sandy, Utah
              </p>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <SubscribeSection />
      <SiteFooter />
    </main>
  );
}
