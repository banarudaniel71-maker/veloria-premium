"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, Clock, ShieldCheck, Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const wrap: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: easeOut },
  }),
};

function Pill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/90 backdrop-blur">
      <span className="text-white/90">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="text-2xl font-extrabold tracking-tight">{value}</div>
      <div className="mt-1 text-sm text-white/80">{label}</div>
      <div className="mt-2 text-xs text-white/55">{hint}</div>
    </div>
  );
}

function StarsRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-1 text-white/80">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={16} />
      ))}
    </div>
  );
}

type Dot = { left: string; top: string; delay: number; size: number; opacity: number };

function SparkleField({ count = 18 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    setMounted(true);
    const next: Dot[] = Array.from({ length: count }).map(() => ({
      left: `${Math.round(Math.random() * 92 + 4)}%`,
      top: `${Math.round(Math.random() * 80 + 8)}%`,
      delay: Math.random() * 2.4,
      size: Math.round(Math.random() * 3 + 2),
      opacity: 0.25 + Math.random() * 0.55,
    }));
    setDots(next);
  }, [count]);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.10),transparent_55%)]" />
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white animate-[twinkle_2.6s_ease-in-out_infinite]"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function LightSweep() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-1/3 top-0 h-full w-1/2 rotate-[18deg] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-2xl animate-[sweep_6s_ease-in-out_infinite]" />
    </div>
  );
}

export default function HeroCinematic() {
  // ✅ fără target ref -> fără error “not hydrated”
  const { scrollY } = useScroll();

  // parallax mic (în pixeli), merge smooth și sigur
  const bgY = useTransform(scrollY, [0, 500], [0, 90]);
  const fgY = useTransform(scrollY, [0, 500], [0, 40]);
  const glowOpacity = useTransform(scrollY, [0, 500], [0.95, 0.35]);

  return (
    <section className="relative overflow-hidden pt-16 sm:pt-20">
      {/* Background parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-mobile-bar.jpg"
          alt="Veloria Cocktails Premium Mobile Bar"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(236,72,153,0.28),transparent_45%),radial-gradient(circle_at_80%_15%,rgba(245,158,11,0.24),transparent_45%),radial-gradient(circle_at_30%_90%,rgba(16,185,129,0.18),transparent_55%)]" />
      </motion.div>

      <SparkleField count={18} />
      <LightSweep />

      <motion.div
        style={{ opacity: glowOpacity }}
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-pink-500/25 via-amber-400/15 to-emerald-400/20 blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-6 pb-16">
        <motion.div variants={wrap} initial="hidden" animate="show" className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <motion.div variants={fadeUp} custom={0} className="flex flex-wrap gap-2">
              <Pill icon={<Sparkles size={14} />} text="Premium Mobile Bar • München & Umgebung" />
              <Pill icon={<ShieldCheck size={14} />} text="Sauber • Schnell • Stilvoll" />
              <Pill icon={<Clock size={14} />} text="Antwort in 2h" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl"
            >
              Cocktails, die aus{" "}
              <span className="bg-gradient-to-r from-pink-400 to-amber-300 bg-clip-text text-transparent">einem guten</span>{" "}
              Event ein{" "}
              <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                unvergessliches
              </span>{" "}
              machen.
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">
              Stilvolles Setup, Premium-Zutaten, schneller Service — für Hochzeiten, Geburtstage & Corporate Events.
              Wir bringen echtes Bar-Feeling direkt zu euch.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/experience-builder"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 text-sm font-semibold shadow-xl hover:opacity-95 transition"
              >
                Preis in 60 Sekunden <ArrowRight size={18} />
              </Link>

              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur hover:bg-white/15 transition"
              >
                Beratung anfragen
              </Link>

              <Link
                href="/pakete"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold hover:bg-white/10 transition"
              >
                Pakete & Preise
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Stat label="Antwort" value="innerhalb 2h" hint="Schnell & klar" />
              <Stat label="Look" value="modern & premium" hint="Fotogen, stilvoll" />
              <Stat label="Service" value="München & Umgebung" hint="Mobil & flexibel" />
            </motion.div>
          </div>

          <motion.div style={{ y: fgY }} variants={fadeUp} custom={5} className="relative">
            <div className="rounded-3xl border border-white/10 bg-black/30 p-5 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-white/90">Highlights</div>
                <StarsRow />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  { name: "Pornstar Martini", img: "/images/pornstar-martini.png" },
                  { name: "Mai Tai", img: "/images/mai-tai.png" },
                  { name: "Sex on the Beach", img: "/images/sex-on-the-beach.png" },
                  { name: "Piña Colada", img: "/images/pina-colada.png" },
                ].map((x) => (
                  <div key={x.name} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                    <Image
                      src={x.img}
                      alt={x.name}
                      width={700}
                      height={450}
                      className="h-32 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-sm font-semibold">{x.name}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                <span className="font-semibold text-white">Pro Tipp:</span> Für den „WOW“-Faktor kombinieren wir warmes Licht,
                frische Garnituren und einen Signature-Menü-Vibe.
              </div>
            </div>

            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-r from-pink-500/10 via-amber-400/10 to-emerald-400/10 blur-2xl" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
