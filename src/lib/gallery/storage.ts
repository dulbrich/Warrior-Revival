import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { GALLERY_BUCKET, GALLERY_PREFIX } from "./types";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif"
]);

function extensionFor(file: File): string {
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

// Uploads one photo to public-images/gallery/. Returns the bucket-relative
// path. Validates MIME and size before hitting the network. Throws on
// failure; the caller is expected to wrap a batch in a try/catch per file
// so a single bad upload doesn't abort the whole batch.
export async function uploadGalleryPhoto(file: File): Promise<string> {
  if (file.size === 0) {
    throw new Error("Uploaded image is empty.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Image is larger than 5 MB.");
  }
  if (!ALLOWED_MIME.has(file.type)) {
    throw new Error(`Unsupported image type: ${file.type || "unknown"}.`);
  }

  const id = crypto.randomUUID();
  const ext = extensionFor(file);
  const path = `${GALLERY_PREFIX}/${id}.${ext}`;

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.storage.from(GALLERY_BUCKET).upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
    contentType: file.type
  });
  if (error) throw new Error(`Upload failed: ${error.message}`);
  return path;
}

// Best-effort delete — never throws so a partial batch failure doesn't
// derail a calling action mid-flight. Logs to the server console.
export async function deleteGalleryPhoto(path: string): Promise<void> {
  if (!path) return;
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.storage.from(GALLERY_BUCKET).remove([path]);
  if (error) {
    console.error(`[gallery] failed to delete ${path}:`, error.message);
  }
}
