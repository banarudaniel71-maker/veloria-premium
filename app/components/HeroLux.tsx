"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

type HeroLuxProps = {
  /** dacă vrei card-ul din dreapta (Signature Cocktails) */
  showPreviewCard?: boolean;
};

export default function HeroLux({ showPreviewCard = false }: HeroLuxProps) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* ===================== PREMIUM BACKGROUND (VISIBLE) ===================== */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/hero-veloria-lux.jpg"
          alt="Veloria Premium Mobile Bar – München"
          fill
          priority
          className="object-cover object-center"
        />
        {/* un pic de blur + scale ca să pară “cinematic” */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Overlays: IMPORTANT -> mai light ca să nu fie “negru” */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/28 to-black/55" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.10),transparent_55%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,rgba(236,72,153,0.14),transparent_58%)]" />

      {/* Aurora blobs (vizibile!) */}
      <div className="pointer-events-none absolute -top-56 left-[-220px] -z-10 h-[820px] w-[820px] rounded-full bg-fuchsia-500/22 blur-3xl" />
      <div className="pointer-events-none absolute top-[0%] right-[-260px] -z-10 h-[900px] w-[900px] rounded-full bg-orange-400/18 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-520px] left-[12%] -z-10 h-[920px] w-[920px] rounded-full bg-rose-500/16 blur-3xl" />

      {/* Mesh overlay (efect “premium”) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.55] mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 18%, rgba(236,72,153,0.38), transparent 42%), radial-gradient(circle at 86% 22%, rgba(251,146,60,0.30), transparent 45%), radial-gradient(circle at 35% 86%, rgba(244,63,94,0.26), transparent 48%), radial-gradient(circle at 68% 62%, rgba(56,189,248,0.16), transparent 46%)",
        }}
      />

      {/* Subtle grid (foarte fin) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />

      {/* Noise */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22160%22 height=%22160%22 filter=%22url(%23n)%22 opacity=%220.6%22/%3E%3C/svg%3E')",
        }}
      />

      {/* Shine animation (subtil, nu haos) */}
      <style>{`
        @keyframes veloriaShine {
          0% { transform: translateX(-60%) skewX(-12deg); opacity: 0; }
          15% { opacity: .18; }
          35% { opacity: .10; }
          60% { opacity: 0; }
          100% { transform: translateX(160%) skewX(-12deg); opacity: 0; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-5 pb-12 pt-9 sm:pb-16 sm:pt-11 lg:pb-20 lg:pt-14">
        {/* Top badges + logo */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <Badge icon="📍" text="München & Umgebung" />
            <Badge icon="⭐" text="5-Sterne Service" />
            <Badge icon="🤍" text="Sauber & stilvoll" />
          </div>

          <div className="hidden sm:block">
            <div className="text-center font-[cursive] text-4xl tracking-wide text-white/95 drop-shadow">
              Veloria
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          {/* Left */}
          <div className="relative">
            {/* Shine band */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-40 top-[-40px] h-[200px] w-[260px] rotate-6 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-2xl"
              style={{ animation: "veloriaShine 6.8s ease-in-out infinite" }}
            />

            <h1 className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-tight text-white drop-shadow sm:text-5xl lg:text-6xl">
              Premium Mobile Bar <br className="hidden sm:block" />
              für Hochzeiten in <span className="text-white/95">München</span>.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Luxuriöse Hochzeits-Cocktailbar ab München — unser mobiler Barkeeper-Service sorgt
              für exquisite Drinks und erstklassiges Setup an eurem großen Tag.
            </p>

            <ul className="mt-7 space-y-2 text-white/90">
              <li className="flex items-center gap-2">
                <Check /> Exklusive Cocktails & Premium Mocktails
              </li>
              <li className="flex items-center gap-2">
                <Check /> Fotogenes Setup, sauber bis ins Detail
              </li>
              <li className="flex items-center gap-2">
                <Check /> Ruhiger Ablauf, souveräner Service
              </li>
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/pakete"
                className="group inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl
                bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400"
              >
                Hochzeits-Preis kalkulieren
                <span className="ml-2 inline-block transition group-hover:translate-x-0.5">→</span>
              </Link>

              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-white/95
                border border-white/25 bg-black/15 backdrop-blur-md shadow-lg transition hover:bg-black/25"
              >
                Jetzt anfragen
              </Link>
            </div>
          </div>

          {/* Right card (OPTIONAL) */}
          {showPreviewCard ? (
            <div className="hidden lg:block">
              <div className="rounded-3xl border border-white/12 bg-gradient-to-b from-white/10 to-white/5 p-6 backdrop-blur-md shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-white/90">Signature Cocktails</div>
                  <div className="text-xs text-white/70">Premium Setup</div>
                </div>

                <div className="mt-5 space-y-3">
                  <Line title="Espresso Martini" note="elegant & beliebt" />
                  <Line title="Aperol Spritz" note="frisch & fotogen" />
                  <Line title="Mai Tai" note="tropical vibe" />
                </div>

                <div className="mt-6 rounded-2xl bg-black/20 p-4 text-xs leading-relaxed text-white/75">
                  Für hochwertige Hochzeiten & stilvolle Events. Saubere Optik, ruhiger Service, starke Drinks.
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden lg:block" />
          )}
        </div>

        {/* Bottom mini-features */}
        <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-4">
          <MiniFeature icon="📍" title="München & Umgebung" />
          <MiniFeature icon="📸" title="Fotogen & edel" />
          <MiniFeature icon="🍸" title="Signature & Klassiker" />
          <MiniFeature icon="✨" title="Premium Vibe" />
        </div>
      </div>
    </section>
  );
}

function Badge({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/15 px-3 py-1 text-xs text-white/85 backdrop-blur-md">
      <span className="opacity-90">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function Check() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/15 text-white/90">
      ✓
    </span>
  );
}

function MiniFeature({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-white/75">
      <span className="text-base">{icon}</span>
      <span>{title}</span>
    </div>
  );
}

function Line({ title, note }: { title: string; note: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="text-sm font-semibold text-white/90">{title}</div>
      <div className="text-xs text-white/70">{note}</div>
    </div>
  );
}