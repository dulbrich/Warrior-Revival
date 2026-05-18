import { formatVolunteerBranch, formatVolunteerName } from "./format";

export const VOLUNTEER_BUCKET = "public-images";
export const VOLUNTEER_PREFIX = "about/volunteers";
export const VOLUNTEER_FALLBACK_IMAGE = "/logo.webp";

export type VolunteerRow = {
  id: string;
  first_name: string;
  last_initial: string;
  branch: string;
  image_path: string | null;  // bucket-relative key, e.g. "about/volunteers/{uuid}-x.jpg"
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type VolunteerForDisplay = {
  id: string;
  displayName: string;
  displayBranch: string;
  imageUrl: string;          // either a Supabase Storage public URL or the fallback
  sort_order: number;
};

// Pure-function URL builder so neither the public page nor the admin list has
// to instantiate a Supabase client just to render an image. We construct the
// public URL by string templating — the format is stable across SDK versions.
function buildVolunteerImageUrl(image_path: string | null): string {
  if (!image_path) return VOLUNTEER_FALLBACK_IMAGE;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return VOLUNTEER_FALLBACK_IMAGE;
  return `${base}/storage/v1/object/public/${VOLUNTEER_BUCKET}/${image_path}`;
}

export function volunteerRowToDisplay(row: VolunteerRow): VolunteerForDisplay {
  return {
    id: row.id,
    displayName: formatVolunteerName(row.first_name, row.last_initial),
    displayBranch: formatVolunteerBranch(row.branch),
    imageUrl: buildVolunteerImageUrl(row.image_path),
    sort_order: row.sort_order
  };
}
