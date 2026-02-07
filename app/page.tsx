"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">

      {/* HERO BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-mobile-bar.jpg"
          alt="Veloria Cocktails Premium Mobile Bar"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      {/* HERO CONTENT */}
      <section className="flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="max-w-3xl">

            <span className="inline-block mb-5 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur">
              🍸 Premium Mobile Bar · München & Umgebung
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight">
              Mobile Cocktailbar <br />
              <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                auf Premium-Niveau
              </span>
            </h1>

            <p className="mt-6 text-lg text-white/85 max-w-2xl">
              Hochwertige Cocktails, stilvolles Setup und echtes Bar-Feeling für
              Hochzeiten, Geburtstage & Corporate Events.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/kontakt"
                className="rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-8 py-4 font-semibold shadow-lg hover:opacity-95 transition"
              >
                Angebot anfragen
              </Link>

              <Link
                href="/menu"
                className="rounded-full border border-white/30 px-8 py-4 font-semibold backdrop-blur hover:bg-white/10 transition"
              >
                Cocktails ansehen
              </Link>

              <Link
                href="/pakete"
                className="rounded-full border border-white/30 px-8 py-4 font-semibold backdrop-blur hover:bg-white/10 transition"
              >
                Pakete & Preise
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
              {[
                ["Antwort", "innerhalb 24h"],
                ["Look", "modern & premium"],
                ["Service", "München & Umgebung"],
              ].map(([a, b]) => (
                <div
                  key={a}
                  className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur"
                >
                  <p className="text-xs text-white/70">{a}</p>
                  <p className="mt-1 text-sm font-bold">{b}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
