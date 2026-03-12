"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";

type Drink = {
  name: string;
  desc: string;
  tags: string[];
  image: string;
  badge?: string;
};

export default function ParallaxCocktailShowcase() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yA = useTransform(scrollYProgress, [0, 1], [24, -34]);
  const yB = useTransform(scrollYProgress, [0, 1], [44, -52]);
  const rA = useTransform(scrollYProgress, [0, 1], [-6, 8]);
  const rB = useTransform(scrollYProgress, [0, 1], [7, -10]);
  const o = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  const drinks = useMemo<Drink[]>(
    () => [
      {
        name: "Pornstar Martini",
        desc: "Elegant, modern, absoluter Crowd-Pleaser – perfekt für Events.",
        tags: ["Vanille", "Passionsfrucht", "Vodka"],
        image: "/images/pornstar-martini.jpg",
        badge: "Bestseller",
      },
      {
        name: "Espresso Martini",
        desc: "Intensiv & stilvoll – Premium-Vibe nach dem Essen.",
        tags: ["Espresso", "Vodka", "Coffee"],
        image: "/images/espresso-martini.jpg",
        badge: "Strong",
      },
      {
        name: "Basil Smash",
        desc: "Frisch, grün, modern – wirkt sofort premium.",
        tags: ["Gin", "Basilikum", "Zitrone"],
        image: "/images/basil-smash.jpg",
        badge: "Fresh",
      },
      {
        name: "Paloma",
        desc: "Leicht, spritzig, elegant – perfekt für Sommer & Empfang.",
        tags: ["Tequila", "Grapefruit", "Soda"],
        image: "/images/paloma.jpg",
        badge: "Fresh",
      },
      {
        name: "Cosmopolitan",
        desc: "Frisch & classy – perfekt für elegante Geburtstage & Hochzeiten.",
        tags: ["Vodka", "Cranberry", "Limette"],
        image: "/images/cosmopolitan.jpg",
        badge: "Elegant",
      },
      {
        name: "Aperol Spritz",
        desc: "Der Klassiker für Hochzeiten & Sommer – leicht, spritzig, beliebt.",
        tags: ["Aperol", "Prosecco", "Soda"],
        image: "/images/aperol-spritz.jpg",
        badge: "Fresh",
      },
    ],
    []
  );

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(236,72,153,0.16),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(251,146,60,0.14),transparent_55%),radial-gradient(circle_at_60%_80%,rgba(56,189,248,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/25" />
      </div>

      <motion.div style={{ opacity: o }} className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          style={{ y: yA, rotate: rA }}
          className="absolute left-[-30px] top-[80px] h-[220px] w-[220px] opacity-[0.55]"
        >
          <Image src="/images/garnish-lime.png" alt="" fill className="object-contain" />
        </motion.div>

        <motion.div
          style={{ y: yB, rotate: rB }}
          className="absolute right-[-30px] top-[60px] h-[240px] w-[240px] opacity-[0.45]"
        >
          <Image src="/images/garnish-mint.png" alt="" fill className="object-contain" />
        </motion.div>

        <motion.div
          style={{ y: yA }}
          className="absolute left-[18%] bottom-[-30px] h-[240px] w-[240px] opacity-[0.25]"
        >
          <Image src="/images/garnish-mint.png" alt="" fill className="object-contain" />
        </motion.div>

        <motion.div
          style={{ y: yB }}
          className="absolute right-[14%] bottom-[-40px] h-[260px] w-[260px] opacity-[0.22]"
        >
          <Image src="/images/garnish-coffee.png" alt="" fill className="object-contain" />
        </motion.div>
      </motion.div>

      <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black tracking-[0.28em] text-white/65">
              PARALLAX COCKTAILS
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Eine Auswahl, die modern wirkt – nicht „Standard“
            </h2>
            <p className="mt-4 max-w-2xl text-white/75 leading-relaxed">
              Keine endlose Karte. Ihr wählt euer Set – wir servieren es in Premium-Optik mit
              sauberem Flow.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#builder"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 px-6 py-3 text-sm font-semibold text-white shadow-lg"
            >
              Drinks auswählen →
            </a>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/10 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-black/20"
            >
              Angebot anfragen
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {drinks.map((d) => (
            <DrinkCard key={d.name} d={d} />
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-white/12 bg-gradient-to-b from-white/14 to-white/6 p-7 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-base font-semibold text-white/95">So funktioniert’s</div>
              <div className="mt-1 text-sm text-white/75">
                Ihr wählt 6 Cocktails + 3 Mocktails – wir bringen Setup, Zutaten und Service.
              </div>
            </div>
            <a
              href="#kalkulator"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/10 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-black/20"
            >
              Preisrechner →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function DrinkCard({ d }: { d: Drink }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
      className="group relative overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-b from-white/14 to-white/6 shadow-xl backdrop-blur-md"
    >
      <div className="relative h-[340px] overflow-hidden bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.10),transparent_35%),linear-gradient(180deg,rgba(20,12,24,0.96)_0%,rgba(11,8,15,1)_100%)] sm:h-[360px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_75%,rgba(255,255,255,0.08),transparent_32%)]" />

        <Image
          src={d.image}
          alt={d.name}
          fill
          className="object-contain p-4 pb-2 transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />

        {d.badge ? (
          <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-[11px] text-white/80 backdrop-blur">
            {d.badge}
          </div>
        ) : null}
      </div>

      <div className="p-5">
        <div className="text-lg font-semibold text-white">{d.name}</div>
        <p className="mt-2 text-sm leading-relaxed text-white/75">{d.desc}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {d.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/12 bg-black/15 px-2.5 py-1 text-[11px] text-white/75"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-white/60">Premium Look • Clean Flow</div>
          <span className="text-xs text-white/70 transition group-hover:text-white/90">
            Details →
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute -left-1/2 top-[-40%] h-[220%] w-[60%] rotate-12 bg-gradient-to-r from-transparent via-white/12 to-transparent blur-2xl" />
      </div>
    </motion.div>
  );
}