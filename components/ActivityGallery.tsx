"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/posts";

export default function ActivityGallery({
  images,
  title,
}: {
  images: GalleryImage[];
  title: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const show = useCallback(
    (next: number) => setActive((next + images.length) % images.length),
    [images.length]
  );

  // Keyboard controls for the lightbox
  useEffect(() => {
    if (active === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") show((active as number) + 1);
      if (e.key === "ArrowLeft") show((active as number) - 1);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, show]);

  if (images.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-semibold text-ink">Photos</h2>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(i)}
            className="group relative aspect-[3/2] overflow-hidden rounded-xl bg-sand"
            aria-label={`Open photo ${i + 1}${img.caption ? `: ${img.caption}` : ""}`}
          >
            <Image
              src={img.src}
              alt={img.caption ?? `${title} — photo ${i + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-parchment/10 text-2xl text-parchment hover:bg-parchment/20"
          >
            ×
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  show(active - 1);
                }}
                aria-label="Previous photo"
                className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-parchment/10 text-2xl text-parchment hover:bg-parchment/20"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  show(active + 1);
                }}
                aria-label="Next photo"
                className="absolute right-4 bottom-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-parchment/10 text-2xl text-parchment hover:bg-parchment/20 sm:right-4 sm:top-1/2"
              >
                ›
              </button>
            </>
          )}

          <figure
            className="relative max-h-[85vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative mx-auto aspect-[3/2] w-full">
              <Image
                src={images[active].src}
                alt={images[active].caption ?? `${title} — photo ${active + 1}`}
                fill
                sizes="100vw"
                className="rounded-lg object-contain"
                priority
              />
            </div>
            {images[active].caption && (
              <figcaption className="mt-3 text-center text-sm text-parchment/80">
                {images[active].caption}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </section>
  );
}
