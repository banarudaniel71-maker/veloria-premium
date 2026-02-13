"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function MobileMenu({
  nav,
}: {
  nav: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // închide meniul când schimbi pagina
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // blochează scroll când e deschis
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/15 transition"
        onClick={() => setOpen(true)}
        aria-label="Menü öffnen"
      >
        <Menu size={20} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[9999] md:hidden">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* panel */}
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm border-l border-white/10 bg-black/70 backdrop-blur-xl p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-white/90">Menü</div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/15 transition"
                onClick={() => setOpen(false)}
                aria-label="Menü schließen"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 grid gap-2">
              {nav.map((x) => (
                <Link
                  key={x.href}
                  href={x.href}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 transition"
                >
                  {x.label}
                </Link>
              ))}
            </div>

            <Link
              href="/kontakt"
              className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 px-5 py-3 text-sm font-semibold shadow-lg hover:opacity-95 transition"
            >
              Angebot anfragen
            </Link>

            <p className="mt-5 text-xs text-white/50">
              Tipp: Tippe auf den Hintergrund, um das Menü zu schließen.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
