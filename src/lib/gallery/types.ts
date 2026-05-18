export const GALLERY_BUCKET = "public-images";
export const GALLERY_PREFIX = "gallery";

export type GalleryPhoto = {
  // Storage object name without the prefix, e.g. "f3a1...d4.jpg"
  name: string;
  // Bucket-relative key, e.g. "gallery/f3a1...d4.jpg" — used for delete calls
  path: string;
  // Public URL to drop into <Image src>
  url: string;
  sizeBytes: number;
  createdAt: string;
};

// String-template the public URL the same way volunteers does so neither
// the public page nor the admin grid has to instantiate a Supabase client
// just to render an image.
export function buildGalleryUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return "";
  return `${base}/storage/v1/object/public/${GALLERY_BUCKET}/${path}`;
}
