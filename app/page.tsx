"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  Clock,
  MapPin,
  Star,
  GlassWater,
  Martini,
  HeartHandshake,
  PartyPopper,
  ShieldCheck,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import { useMemo, useRef } from "react";

import HomeGalleryLightbox from "./components/HomeGalleryLightbox";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: "easeOut" },
  }),
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
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

function AnimatedNumber({ to, suffix = "" }: { to: number; suffix?: string }) {
  const steps = useMemo(() => {
    const arr: number[] = [];
    const n = 28;
    for (let i = 0; i <= n; i++) arr.push(Math.round((to * i) / n));
    return arr;
  }, [to]);

  return (
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tabular-nums">
      <motion.span
        initial={{ y: 6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {steps[steps.length - 1]}
      </motion.span>
      {suffix}
    </motion.span>
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.9, 0.35]);

  const categories = [
    {
      title: "Signature Cocktails",
      desc: "Unsere Highlights — perfekt ausbalanciert, fotogen und crowd-pleaser.",
      tags: ["Elegant", "Modern", "Wow"],
      img: "/images/pornstar-martini.png",
      icon: <Martini size={18} />,
      href: "/menu",
    },
    {
      title: "Wedding Specials",
      desc: "Romantisch & classy — Drinks, die euren Tag veredeln.",
      tags: ["Wedding", "Classy", "Premium"],
      img: "/images/sex-on-the-beach.png",
      icon: <HeartHandshake size={18} />,
      href: "/menu",
    },
    {
      title: "Tiki & Tropical",
      desc: "Urlaubs-Vibes im Glas — frisch, aromatisch, unvergesslich.",
      tags: ["Tiki", "Fresh", "Summer"],
      img: "/images/mai-tai.png",
      icon: <PartyPopper size={18} />,
      href: "/menu",
    },
    {
      title: "Mocktails (0.0%)",
      desc: "Ohne Alkohol — aber mit Charakter, Stil und Premium-Geschmack.",
      tags: ["0.0%", "Clean", "Premium"],
      img: "/images/pina-colada.png",
      icon: <GlassWater size={18} />,
      href: "/menu",
    },
  ];

  const steps = [
    {
      title: "Preis in 60 Sekunden",
      desc: "Gäste, Dauer, Add-ons — du siehst sofort 3 Premium-Optionen.",
      icon: <Sparkles size={18} />,
    },
    {
      title: "Datum kurz bestätigen",
      desc: "Wir checken Location & Ablauf — schnell, klar, ohne Chaos.",
      icon: <Clock size={18} />,
    },
    {
      title: "Premium-Setup vor Ort",
      desc: "Bar, Eis, Garnituren, Styling — ready für den Wow-Moment.",
      icon: <MapPin size={18} />,
    },
    {
      title: "Service & Atmosphäre",
      desc: "Schnell, sauber, professionell — ihr genießt einfach das Event.",
      icon: <BadgeCheck size={18} />,
    },
  ];

  const testimonials = [
    {
      name: "Hochzeit • München",
      text: "„Alle haben WOW gesagt. Setup sah mega premium aus und die Cocktails waren überragend.“",
      stars: 5,
    },
    {
      name: "Geburtstag • Dachau",
      text: "„Super schnell, super sauber, total freundlich. Highlight des Abends.“",
      stars: 5,
    },
    {
      name: "Corporate • München",
      text: "„Perfekte Organisation + Premium-Drinks. Genau richtig für ein Business-Event.“",
      stars: 5,
    },
  ];

  const faqs = [
    { q: "Wie lange dauert der Aufbau?", a: "Meist 45–90 Minuten, je nach Location und Paket." },
    { q: "Gibt es alkoholfreie Optionen?", a: "Ja — 0.0% Mocktails im gleichen Premium-Look." },
    { q: "Nur München oder auch Umgebung?", a: "München & Umgebung. Weitere Strecken gern auf Anfrage." },
    { q: "Können wir das Menü anpassen?", a: "Ja — wir stellen ein Menü passend zu euren Gästen zusammen." },
  ];

  return (
    <main className="text-white">
      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden pt-16 sm:pt-20">
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

        <motion.div
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-pink-500/25 via-amber-400/15 to-emerald-400/20 blur-3xl"
        />

        <div className="mx-auto max-w-6xl px-6 pb-16">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-10 lg:grid-cols-2 lg:items-center"
          >
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
                <span className="bg-gradient-to-r from-pink-400 to-amber-300 bg-clip-text text-transparent">
                  einem guten
                </span>{" "}
                Event ein{" "}
                <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                  unvergessliches
                </span>{" "}
                machen.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="mt-5 max-w-xl text-base text-white/85 sm:text-lg"
              >
                Stilvolles Setup, Premium-Zutaten, schneller Service — für Hochzeiten, Geburtstage & Corporate Events.
                Wir bringen echtes Bar-Feeling direkt zu euch.
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="mt-7 flex flex-wrap gap-3">
                {/* PRIMARY CTA -> Builder */}
                <Link
                  href="/experience-builder"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 text-sm font-semibold shadow-xl hover:opacity-95 transition"
                >
                  Preis in 60 Sekunden <ArrowRight size={18} />
                </Link>

                {/* SECONDARY CTA -> Contact */}
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

            <motion.div variants={fadeUp} custom={5} className="relative">
              <div className="rounded-3xl border border-white/10 bg-black/30 p-5 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-white/90">Highlights</div>
                  <div className="flex items-center gap-1 text-white/80">
                    <Star size={16} />
                    <Star size={16} />
                    <Star size={16} />
                    <Star size={16} />
                    <Star size={16} />
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    { name: "Pornstar Martini", img: "/images/pornstar-martini.png" },
                    { name: "Mai Tai", img: "/images/mai-tai.png" },
                    { name: "Sex on the Beach", img: "/images/sex-on-the-beach.png" },
                    { name: "Piña Colada", img: "/images/pina-colada.png" },
                  ].map((x) => (
                    <div
                      key={x.name}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                    >
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

      {/* WHY */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={container}>
          <motion.p variants={fadeUp} className="text-xs tracking-[0.2em] text-white/60">
            WARUM VELORIA
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Premium wirkt nicht laut — sondern souverän.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-white/80">
            Nicht nur Drinks. Ein Erlebnis: Setup, Ablauf, Service und Geschmack — alles auf einem Level.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              { title: "Setup Premium", desc: "Elegante Bar-Optik + Details", icon: <BadgeCheck size={18} /> },
              { title: "Signature Drinks", desc: "Ausbalanciert & hochwertig", icon: <Martini size={18} /> },
              { title: "Schneller Ablauf", desc: "Flow ohne lange Wartezeiten", icon: <Clock size={18} /> },
              { title: "Service Pro", desc: "Freundlich, sauber, professionell", icon: <ShieldCheck size={18} /> },
            ].map((x) => (
              <div key={x.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">{x.icon}</div>
                  <div className="font-semibold">{x.title}</div>
                </div>
                <div className="mt-3 text-sm text-white/75">{x.desc}</div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs text-white/60">EVENTS</div>
              <div className="mt-1 text-2xl font-extrabold">
                <AnimatedNumber to={120} suffix="+" />
              </div>
              <div className="mt-2 text-sm text-white/75">Events mit Wow-Vibe</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs text-white/60">COCKTAILS</div>
              <div className="mt-1 text-2xl font-extrabold">
                <AnimatedNumber to={40} suffix="+" />
              </div>
              <div className="mt-2 text-sm text-white/75">Menü-Optionen (Custom möglich)</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs text-white/60">RATING</div>
              <div className="mt-1 text-2xl font-extrabold">
                <AnimatedNumber to={5} suffix="/5" />
              </div>
              <div className="mt-2 text-sm text-white/75">Premium Experience konstant</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-6xl px-6 pb-14">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={container}>
          <motion.p variants={fadeUp} className="text-xs tracking-[0.2em] text-white/60">
            MENÜ HIGHLIGHTS
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Kategorien, die man sofort fühlen kann.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-white/80">
            Von Signature Cocktails bis Mocktails — ihr wählt den Vibe, wir liefern den Geschmack.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 grid gap-5 md:grid-cols-2">
            {categories.map((c) => (
              <motion.div
                key={c.title}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
              >
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_10%,rgba(236,72,153,0.18),transparent_45%),radial-gradient(circle_at_80%_15%,rgba(245,158,11,0.14),transparent_45%),radial-gradient(circle_at_30%_90%,rgba(16,185,129,0.12),transparent_55%)]" />
                <div className="relative grid gap-5 p-6 sm:grid-cols-[1.2fr_1fr] sm:items-center">
                  <div>
                    <div className="flex items-center gap-2 text-white/90">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10">{c.icon}</span>
                      <div className="text-lg font-bold">{c.title}</div>
                    </div>
                    <div className="mt-2 text-sm text-white/75">{c.desc}</div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={c.href}
                      className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold hover:bg-white/15 transition"
                    >
                      Jetzt ansehen <ArrowRight size={18} />
                    </Link>
                  </div>

                  <div className="relative">
                    <div className="absolute -inset-6 -z-10 rounded-full bg-gradient-to-r from-pink-500/10 to-emerald-400/10 blur-2xl" />
                    <Image
                      src={c.img}
                      alt={c.title}
                      width={900}
                      height={600}
                      className="h-44 w-full rounded-2xl object-cover ring-1 ring-white/10 transition duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ✅ HOME GALLERY */}
      <HomeGalleryLightbox />

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-6 pb-14">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={container}>
          <motion.p variants={fadeUp} className="text-xs tracking-[0.2em] text-white/60">
            SO LÄUFT’S
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Klar. Schnell. Stressfrei.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-white/80">
            Du wählst Gästezahl, Dauer & Add-ons — wir zeigen dir sofort Premium-Optionen. Danach bestätigen wir kurz die Details.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 grid gap-4 md:grid-cols-4">
            {steps.map((s) => (
              <div key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">{s.icon}</div>
                  <div className="font-semibold">{s.title}</div>
                </div>
                <div className="mt-3 text-sm text-white/75">{s.desc}</div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/experience-builder"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 text-sm font-semibold shadow-xl hover:opacity-95 transition"
            >
              Preis in 60 Sekunden <ArrowRight size={18} />
            </Link>
            <Link
              href="/galerie"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur hover:bg-white/15 transition"
            >
              Galerie ansehen
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-6xl px-6 pb-14">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={container}>
          <motion.p variants={fadeUp} className="text-xs tracking-[0.2em] text-white/60">
            BEWERTUNGEN
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Warum Gäste Veloria lieben.
          </motion.h2>

          <motion.div variants={fadeUp} className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="flex items-center gap-1 text-white/80">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} size={16} />
                    ))}
                  </div>
                </div>
                <div className="mt-3 text-sm text-white/80">{t.text}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={container}>
          <motion.p variants={fadeUp} className="text-xs tracking-[0.2em] text-white/60">
            FAQ
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Häufige Fragen.
          </motion.h2>

          <motion.div variants={fadeUp} className="mt-8 grid gap-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <summary className="cursor-pointer list-none text-sm font-semibold text-white/90">
                  <span className="inline-flex items-center gap-2">
                    <Sparkles size={16} className="text-white/70" />
                    {f.q}
                  </span>
                </summary>
                <div className="mt-3 text-sm text-white/75">{f.a}</div>
              </details>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-2xl font-extrabold">Bereit für ein Event mit Wow-Faktor?</div>
                <div className="mt-2 text-sm text-white/80">
                  Preis in 60 Sekunden — danach bestätigen wir kurz Datum, Gästezahl & Location.
                </div>
              </div>
              <Link
                href="/experience-builder"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 text-sm font-semibold shadow-xl hover:opacity-95 transition"
              >
                Preis berechnen <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
