import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  GALLERY_BUCKET,
  GALLERY_PREFIX,
  buildGalleryUrl,
  type GalleryPhoto
} from "./types";

// Lists every photo in public-images/gallery/, newest first. Uses the
// authenticated server client; anon-safe thanks to the public-read RLS
// policy on the gallery/* prefix (see 0004_gallery_storage.sql).
//
// Storage.list() defaults to 100 results per call; we ask for 1000 (the max
// supported by Supabase's PostgREST endpoint) so we don't need to paginate
// at our scale. The "folder" pseudo-entries (id === null) are skipped — we
// only want real objects.
export async function fetchGalleryPhotos(): Promise<GalleryPhoto[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.storage
    .from(GALLERY_BUCKET)
    .list(GALLERY_PREFIX, {
      limit: 1000,
      sortBy: { column: "created_at", order: "desc" }
    });
  if (error) throw new Error(`Failed to list gallery photos: ${error.message}`);
  if (!data) return [];

  return data
    .filter((entry) => entry.id !== null)
    .map((entry) => {
      const path = `${GALLERY_PREFIX}/${entry.name}`;
      const sizeBytes =
        (entry.metadata as { size?: number } | null)?.size ?? 0;
      return {
        name: entry.name,
        path,
        url: buildGalleryUrl(path),
        sizeBytes,
        createdAt: entry.created_at ?? ""
      };
    });
}
