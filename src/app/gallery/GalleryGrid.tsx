"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { GalleryPhoto } from "@/lib/gallery/types";

type Props = { photos: GalleryPhoto[] };

export default function GalleryGrid({ photos }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Close on Escape; advance on Arrow keys.
  useEffect(() => {
    if (activeIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveIndex(null);
      else if (e.key === "ArrowRight")
        setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length));
      else if (e.key === "ArrowLeft")
        setActiveIndex((i) =>
          i === null ? null : (i - 1 + photos.length) % photos.length
        );
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, photos.length]);

  // Lock body scroll while the lightbox is open.
  useEffect(() => {
    if (activeIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [activeIndex]);

  if (photos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
        <p className="font-heading text-2xl text-primary">No photos yet</p>
        <p className="mt-2 text-base text-textSecondary">
          Check back soon — we&apos;ll be sharing photos from upcoming events here.
        </p>
      </div>
    );
  }

  const active = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, index) => (
          <button
            key={photo.path}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-surface shadow-soft transition hover:-translate-y-0.5 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Image
              src={photo.url}
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(null);
            }}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1.5 text-base font-bold text-white transition hover:bg-white/20"
          >
            Close ✕
          </button>
          <div
            className="relative h-full max-h-[88vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.url}
              alt=""
              fill
              sizes="(min-width: 1024px) 80vw, 100vw"
              className="object-contain"
              priority
            />
          </div>
          {photos.length > 1 ? (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((i) =>
                    i === null ? null : (i - 1 + photos.length) % photos.length
                  );
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-xl font-semibold text-white transition hover:bg-white/20"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((i) =>
                    i === null ? null : (i + 1) % photos.length
                  );
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-xl font-semibold text-white transition hover:bg-white/20"
              >
                ›
              </button>
            </>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
