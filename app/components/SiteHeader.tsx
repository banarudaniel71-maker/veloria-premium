"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

export default function SiteHeader() {
  const nav = useMemo(
    () => [
      { href: "/pakete", label: "Pakete & Preise" },
      { href: "/menu", label: "Cocktail Menü" },
      { href: "/galerie", label: "Galerie" },
      { href: "/kontakt", label: "Kontakt" },
    ],
    []
  );

  const [open, setOpen] = useState(false);

  // ESC + lock scroll when menu open
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-r from-pink-500 to-amber-400 font-black text-black">
              VC
            </div>
            <div className="leading-tight">
              <p className="font-semibold text-white">Veloria Cocktails</p>
              <p className="text-xs text-white/70">München & Umgebung</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 text-sm text-white/80 md:flex">
            {nav.map((x) => (
              <Link key={x.href} href={x.href} className="hover:text-white transition">
                {x.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/kontakt"
              className="hidden rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-5 py-3 text-sm font-semibold shadow-lg hover:opacity-95 transition md:inline-flex"
            >
              Angebot anfragen
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/15 transition md:hidden"
              aria-label="Menü öffnen"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[9999] md:hidden" role="dialog" aria-modal="true">
          {/* overlay */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setOpen(false)} />

          {/* panel */}
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm border-l border-white/10 bg-black/60 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/90">
                <Sparkles size={16} />
                <span className="text-sm font-semibold">Menü</span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/15 transition"
                aria-label="Menü schließen"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 grid gap-2">
              {nav.map((x) => (
                <Link
                  key={x.href}
                  href={x.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 transition"
                >
                  {x.label}
                </Link>
              ))}

              <Link
                href="/kontakt"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-xl hover:opacity-95 transition"
              >
                Angebot anfragen
              </Link>
            </div>

            <div className="mt-6 text-xs text-white/60">
              Tipp: Tippe außerhalb oder drücke <span className="text-white/80">ESC</span>, um zu schließen.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
