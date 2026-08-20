"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

type GalleryItem = {
  image: string;
  caption: string;
  alt: string;
};

export function GalleryGrid({ items }: { items: readonly GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);

  const step = useCallback(
    (delta: number) =>
      setOpenIndex((current) =>
        current === null
          ? current
          : (current + delta + items.length) % items.length,
      ),
    [items.length],
  );

  // Lock the page behind the lightbox and wire up keyboard control.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close, step]);

  const active = openIndex === null ? null : items[openIndex];

  return (
    <>
      <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
        {items.map((item, index) => (
          <Reveal key={item.image} delay={(index % 3) * 110}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group relative block aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-lg border border-ink-border transition-[transform,border-color,box-shadow] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_16px_36px_rgba(0,0,0,0.6),0_0_25px_rgba(197,160,89,0.22)]"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1140px) 50vw, 360px"
                className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
              <span className="absolute inset-0 flex items-end bg-[linear-gradient(to_top,rgba(10,10,10,0.92),transparent_60%)] p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-sm font-semibold uppercase tracking-[0.14em] text-gold">
                  {item.caption}
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          onClick={close}
          className="fixed inset-0 z-[3000] flex items-center justify-center bg-[rgba(10,10,10,0.94)] p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 cursor-pointer text-4xl leading-none text-gold transition-colors hover:text-gold-light"
          >
            ×
          </button>

          <button
            type="button"
            aria-label="Previous image"
            onClick={(event) => {
              event.stopPropagation();
              step(-1);
            }}
            className="absolute left-4 cursor-pointer px-3 py-2 text-3xl text-gold transition-colors hover:text-gold-light"
          >
            ‹
          </button>

          <figure
            onClick={(event) => event.stopPropagation()}
            className="max-h-full w-full max-w-4xl"
          >
            <div className="relative mx-auto aspect-[4/3] w-full">
              <Image
                src={active.image}
                alt={active.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="rounded-lg object-contain"
              />
            </div>
            <figcaption className="mt-3 text-center text-sm uppercase tracking-[0.16em] text-gold">
              {active.caption}
            </figcaption>
          </figure>

          <button
            type="button"
            aria-label="Next image"
            onClick={(event) => {
              event.stopPropagation();
              step(1);
            }}
            className="absolute right-4 cursor-pointer px-3 py-2 text-3xl text-gold transition-colors hover:text-gold-light"
          >
            ›
          </button>
        </div>
      ) : null}
    </>
  );
}
