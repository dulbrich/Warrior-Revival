import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SubscribeSection from "@/components/SubscribeSection";

export default function GalleryPage() {
  return (
    <main className="bg-light">
      <SiteHeader />

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            Gallery
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold text-primary md:text-5xl">
            Moments from the trail.
          </h1>
          <p className="mt-4 max-w-3xl text-base text-textSecondary">
            Explore highlights from our events, retreats, and community gatherings.
            Stories from the field will live here as the gallery grows.
          </p>
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-light p-10 text-center text-sm text-textSecondary">
            Gallery content coming soon.
          </div>
        </div>
      </section>

      <SubscribeSection />
      <SiteFooter />
    </main>
  );
}
