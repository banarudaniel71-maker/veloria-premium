"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Img = { src: string; alt: string };

export default function HomeGalleryLightbox() {
  const images: Img[] = useMemo(
    () => [
      { src: "/images/pornstar-martini.png", alt: "Pornstar Martini" },
      { src: "/images/mai-tai.png", alt: "Mai Tai" },
      { src: "/images/sex-on-the-beach.png", alt: "Sex on the Beach" },
      { src: "/images/pina-colada.png", alt: "Piña Colada" },
      { src: "/images/hero-mobile-bar.jpg", alt: "Veloria Premium Bar Setup" },
    ],
    []
  );

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const close = () => setOpen(false);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  // ESC + arrows + body scroll lock + focus
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // focus pe X ca să meargă ESC sigur
    setTimeout(() => closeBtnRef.current?.focus(), 0);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, images.length]);

  return (
    <section className="mx-auto max-w-6xl px-6 pb-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.2em] text-white/60">GALERIE</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Premium-Momente in Bildern.
          </h2>
          <p className="mt-3 max-w-2xl text-white/80">
            Tippe ein Bild an – Vollbild, ESC zum Schließen, Pfeile zum Wechseln.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => openAt(i)}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left"
          >
            <div className="relative h-52 w-full">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-white/90">
                {img.alt}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          {/* Overlay: click aici = close */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={close}
          />

          {/* Content */}
          <div className="relative z-10 w-[92vw] max-w-5xl">
            {/* Top actions */}
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="text-sm text-white/80">
                {index + 1} / {images.length}
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                onClick={close}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/15 transition"
                aria-label="Schließen"
              >
                <X size={18} />
              </button>
            </div>

            {/* Image box */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-2xl">
              <div className="relative h-[70vh] w-full">
                <Image
                  src={images[index].src}
                  alt={images[index].alt}
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {/* Left / Right */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/15 transition"
                aria-label="Vorheriges Bild"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/15 transition"
                aria-label="Nächstes Bild"
              >
                <ChevronRight size={20} />
              </button>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4">
                <div className="text-sm font-semibold text-white/90">
                  {images[index].alt}
                </div>
                <div className="text-xs text-white/60">
                  Klick außen oder ESC zum Schließen
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
