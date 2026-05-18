import Image from "next/image";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/role";
import { fetchGalleryPhotos } from "@/lib/gallery/queries";
import { formatBytes } from "@/lib/storage/usage";
import StorageUsageBar from "@/components/StorageUsageBar";
import GalleryUploadForm from "./GalleryUploadForm";
import { deleteGalleryPhotoAction } from "./actions";

export default async function AdminGalleryPage() {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin?error=admins_only");
  }

  const photos = await fetchGalleryPhotos();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-accent text-sm uppercase tracking-[0.3em] text-secondary">
            Gallery
          </p>
          <h1 className="mt-2 font-blackOps text-3xl font-normal text-primary md:text-4xl">
            Manage gallery
          </h1>
          <p className="mt-2 text-sm text-textSecondary">
            Photos appear on the public /gallery page newest-first. JPEG, PNG,
            WebP, or GIF; 5 MB per file.
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <StorageUsageBar />

        <GalleryUploadForm />

        <section>
          <div className="flex items-baseline justify-between">
            <h2 className="font-heading text-lg font-semibold text-primary">
              {photos.length === 0
                ? "No photos yet"
                : `${photos.length} photo${photos.length === 1 ? "" : "s"}`}
            </h2>
          </div>
          {photos.length === 0 ? (
            <p className="mt-3 rounded-xl border border-dashed border-border bg-surface px-5 py-8 text-center text-sm text-textSecondary">
              Upload your first photo above.
            </p>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {photos.map((photo) => (
                <div
                  key={photo.path}
                  className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-3 shadow-soft"
                >
                  <div className="relative aspect-square overflow-hidden rounded-md border border-border bg-white">
                    <Image
                      src={photo.url}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs text-textSecondary">
                    {formatBytes(photo.sizeBytes)}
                  </p>
                  <form action={deleteGalleryPhotoAction}>
                    <input type="hidden" name="path" value={photo.path} />
                    <button
                      type="submit"
                      className="w-full rounded-md border border-border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-textSecondary transition hover:border-red-500 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
