"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/role";
import { deleteGalleryPhoto } from "@/lib/gallery/storage";

function revalidate() {
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}

// Called by the client uploader once a batch finishes so the public /gallery
// page picks up the new photos and the admin grid re-renders with them in
// place. Authz is verified server-side; the uploads themselves used the
// user's own access token + the storage RLS policy.
export async function revalidateGalleryAction() {
  await requireAdmin();
  revalidate();
}

const deleteSchema = z.object({
  path: z
    .string()
    .min(1)
    .regex(/^gallery\//, "Path must be under gallery/")
});

export async function deleteGalleryPhotoAction(formData: FormData) {
  await requireAdmin();
  const path = formData.get("path");
  const parsed = deleteSchema.safeParse({ path });
  if (!parsed.success) throw new Error("Invalid photo path.");
  await deleteGalleryPhoto(parsed.data.path);
  revalidate();
}
