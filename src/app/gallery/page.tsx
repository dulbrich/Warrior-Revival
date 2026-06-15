import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SubscribeSection from "@/components/SubscribeSection";
import { fetchGalleryPhotos } from "@/lib/gallery/queries";
import GalleryGrid from "./GalleryGrid";

export default async function GalleryPage() {
  const photos = await fetchGalleryPhotos();

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
            Gallery
          </p>
          <h1 className="max-w-3xl font-blackOps text-5xl font-normal text-primary md:text-6xl">
            Moments from the trail.
          </h1>
          <p className="max-w-3xl text-base text-textSecondary">
            Photos from hikes, coffee hours, retreats, and everything in
            between. Click any image to view it larger.
          </p>
        </div>
      </section>

      <section className="bg-light">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <GalleryGrid photos={photos} />
        </div>
      </section>

      <SubscribeSection />
      <SiteFooter />
    </main>
  );
}
