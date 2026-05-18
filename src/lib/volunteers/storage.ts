import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { VOLUNTEER_BUCKET, VOLUNTEER_PREFIX } from "./types";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;       // 5 MB — bucket-side guard is the authority
const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif"
]);

function extensionFor(file: File): string {
  // Prefer the MIME-derived extension (filenames are unreliable on iOS uploads).
  switch (file.type) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    default: {
      const m = file.name.match(/\.([a-z0-9]+)$/i);
      return m ? m[1].toLowerCase() : "bin";
    }
  }
}

// Uploads a volunteer's image to public-images/about/volunteers/. Returns the
// bucket-relative path so the caller can store it in volunteers.image_path.
// Throws on validation or upload failure — callers should run this first and
// only then patch the DB row.
export async function uploadVolunteerImage(
  file: File,
  volunteerId: string
): Promise<string> {
  if (file.size === 0) {
    throw new Error("Uploaded image is empty.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Image is larger than 5 MB.");
  }
  if (!ALLOWED_MIME.has(file.type)) {
    throw new Error(`Unsupported image type: ${file.type || "unknown"}.`);
  }

  // crypto.randomUUID is available in Node 18+; we're on Node 20+ via Next 14.
  const suffix = crypto.randomUUID().slice(0, 8);
  const ext = extensionFor(file);
  const path = `${VOLUNTEER_PREFIX}/${volunteerId}-${suffix}.${ext}`;

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.storage.from(VOLUNTEER_BUCKET).upload(path, file, {
    cacheControl: "31536000",  // 1 year — the random suffix changes on every replace
    upsert: false,
    contentType: file.type
  });
  if (error) throw new Error(`Image upload failed: ${error.message}`);
  return path;
}

// Best-effort delete. Never throws — orphan storage objects are recoverable
// later via the Supabase dashboard, but a thrown error here would derail the
// surrounding admin action (e.g. a row delete that already succeeded).
export async function deleteVolunteerImage(
  image_path: string | null | undefined
): Promise<void> {
  if (!image_path) return;
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.storage.from(VOLUNTEER_BUCKET).remove([image_path]);
  if (error) {
    console.error(`[volunteers] failed to delete storage object ${image_path}:`, error.message);
  }
}
