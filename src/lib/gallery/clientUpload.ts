"use client";

// Client-side direct-to-Supabase uploader for the gallery. We bypass the
// server action because fetch in the browser doesn't expose upload progress
// events — only XMLHttpRequest does. RLS handles authz: the policy on
// public-images/gallery/* requires is_admin(), and the access token from
// the user's session carries the role claim.

import { GALLERY_BUCKET, GALLERY_PREFIX } from "./types";

export type UploadProgress = {
  loaded: number;
  total: number;
  percentage: number;
};

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

export function validateGalleryFile(file: File): string | null {
  if (file.size === 0) return "Empty file.";
  if (file.size > MAX_IMAGE_BYTES) return "Larger than 5 MB.";
  if (!ALLOWED_MIME.has(file.type)) return `Unsupported type: ${file.type || "unknown"}.`;
  return null;
}

export function uploadGalleryFileWithProgress(
  file: File,
  options: {
    supabaseUrl: string;
    accessToken: string;
    signal?: AbortSignal;
    onProgress?: (p: UploadProgress) => void;
  }
): Promise<{ path: string }> {
  return new Promise((resolve, reject) => {
    const id = crypto.randomUUID();
    const path = `${GALLERY_PREFIX}/${id}.${extensionFor(file)}`;
    const url = `${options.supabaseUrl}/storage/v1/object/${GALLERY_BUCKET}/${path}`;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Authorization", `Bearer ${options.accessToken}`);
    xhr.setRequestHeader("apikey", options.accessToken);
    xhr.setRequestHeader("Cache-Control", "31536000");
    xhr.setRequestHeader("x-upsert", "false");
    xhr.setRequestHeader("Content-Type", file.type);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && options.onProgress) {
        options.onProgress({
          loaded: e.loaded,
          total: e.total,
          percentage: e.total > 0 ? (e.loaded / e.total) * 100 : 0
        });
      }
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve({ path });
      } else {
        let message = `Upload failed (${xhr.status})`;
        try {
          const parsed = JSON.parse(xhr.responseText);
          if (parsed?.message) message = parsed.message;
        } catch {
          /* response wasn't JSON; keep the status-based message */
        }
        reject(new Error(message));
      }
    };
    xhr.onerror = () => reject(new Error("Network error during upload."));
    xhr.onabort = () => reject(new DOMException("Aborted", "AbortError"));

    if (options.signal) {
      if (options.signal.aborted) {
        xhr.abort();
        return;
      }
      options.signal.addEventListener("abort", () => xhr.abort());
    }

    xhr.send(file);
  });
}
