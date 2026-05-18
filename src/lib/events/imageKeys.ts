// Controlled vocabulary of event image keys. Admins select one of these in the
// /admin form; the value is stored on the row and the public site looks up the
// asset path here at render time. Add a new key by adding the asset under
// /public/events/ and listing it below.

export const IMAGE_KEYS = ["hike", "coffee", "lunch", "book"] as const;
export type ImageKey = (typeof IMAGE_KEYS)[number];

const imageKeyToPath: Record<ImageKey, string> = {
  hike: "/events/hiking.jpg",
  coffee: "/events/coffee.jpg",
  lunch: "/events/lunch.jpg",
  book: "/events/books.jpg"
};

const FALLBACK_IMAGE = "/logo.webp";

export function resolveEventImage(key: string | null | undefined): string {
  if (key && (IMAGE_KEYS as readonly string[]).includes(key)) {
    return imageKeyToPath[key as ImageKey];
  }
  return FALLBACK_IMAGE;
}

export function isImageKey(value: string): value is ImageKey {
  return (IMAGE_KEYS as readonly string[]).includes(value);
}
