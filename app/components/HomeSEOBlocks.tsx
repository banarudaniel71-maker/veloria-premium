"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { BadgeCheck, Clock, MapPin, Martini, ShieldCheck, Sparkles } from "lucide-react";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, delay: i * 0.08, ease: easeOut },
  }),
};

function SEOCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
          {icon}
        </div>
        <div className="text-base font-extrabold">{title}</div>
      </div>
      <div className="mt-3 text-sm text-white/75 leading-7">{desc}</div>
    </div>
  );
}

export default function HomeSEOBlocks() {
  // ✅ IMPORTANT: ajustează aici datele tale reale
  const brandName = "Veloria Cocktails";
  const siteUrl = "https://veloria-premium.vercel.app"; // dacă ai domeniu, pune domeniul
  const phone = "+49 000 0000000"; // pune numărul real
  const email = "contact@veloria.de"; // pune email real (sau scoate dacă nu ai)
  const city = "München";
  const region = "Bayern";
  const country = "DE";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        name: brandName,
        url: siteUrl,
        areaServed: [
          { "@type": "City", name: "München" },
          { "@type": "AdministrativeArea", name: "Bayern" },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: city,
          addressRegion: region,
          addressCountry: country,
        },
        telephone: phone,
        email: email,
        image: `${siteUrl}/images/hero-veloria-lux.jpg`,
        priceRange: "€€€",
        sameAs: [],
      },
      {
        "@type": "Service",
        name: "Premium Mobile Bar Service",
        provider: { "@type": "LocalBusiness", name: brandName, url: siteUrl },
        areaServed: "München & Umgebung",
        serviceType: [
          "Mobile Cocktailbar",
          "Bartender Service",
          "Signature Cocktails",
          "Mocktails 0.0%",
          "Event Bar Setup",
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Wie lange dauert der Aufbau?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Meist 45–90 Minuten, je nach Location, Paket und Zugang vor Ort.",
            },
          },
          {
            "@type": "Question",
            name: "Gibt es alkoholfreie Optionen?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ja — 0.0% Mocktails im gleichen Premium-Look (Glas, Garnish, Präsentation).",
            },
          },
          {
            "@type": "Question",
            name: "Nur München oder auch Umgebung?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "München & Umgebung. Weitere Strecken sind auf Anfrage möglich (Fahrtkosten transparent).",
            },
          },
          {
            "@type": "Question",
            name: "Können wir das Menü anpassen?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ja. Wir stellen ein Menü passend zu euren Gästen, dem Anlass und dem gewünschten Vibe zusammen.",
            },
          },
        ],
      },
    ],
  };

  return (
    <section className="mx-auto max-w-6xl px-6 pb-14">
      {/* ✅ JSON-LD for Google (rich results) */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
      >
        <motion.p variants={fadeUp} className="text-xs tracking-[0.2em] text-white/60">
          MÜNCHEN • PREMIUM MOBILE BAR
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl"
        >
          Mobile Cocktailbar in München — stilvoll, sauber, zuverlässig.
        </motion.h2>

        <motion.p variants={fadeUp} className="mt-3 max-w-3xl text-white/80 leading-7">
          Veloria bringt Premium-Bar-Feeling direkt zu euch: Setup, Service, Signature Cocktails und 0.0% Mocktails.
          Für Hochzeiten, Geburtstage und Corporate Events in München & Umgebung.
        </motion.p>

        {/* ✅ SEO grid (Google + user clarity) */}
        <motion.div variants={fadeUp} className="mt-8 grid gap-4 md:grid-cols-3">
          <SEOCard
            icon={<BadgeCheck size={18} className="text-white/85" />}
            title="Premium Setup"
            desc="Saubere Station, Licht, Details & Styling — sofort sichtbar hochwertig (auch auf Fotos)."
          />
          <SEOCard
            icon={<Martini size={18} className="text-white/85" />}
            title="Signature Menü + 0.0%"
            desc="Ausbalancierte Cocktails, hochwertige Zutaten und alkoholfreie Optionen im gleichen Premium-Look."
          />
          <SEOCard
            icon={<ShieldCheck size={18} className="text-white/85" />}
            title="Souveräner Ablauf"
            desc="Schnell, ruhig, professionell — so entsteht Wow ohne Chaos oder lange Warteschlange."
          />
        </motion.div>

        {/* ✅ “How it works” mini SEO */}
        <motion.div
          variants={fadeUp}
          className="mt-8 grid gap-4 rounded-[2.5rem] border border-white/10 bg-white/5 p-7 backdrop-blur-xl md:grid-cols-3"
        >
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
              <Sparkles size={18} />
            </div>
            <div>
              <div className="font-extrabold">1) Preis in Sekunden</div>
              <div className="mt-1 text-sm text-white/75 leading-7">
                Gäste, Dauer & Add-ons — sofort 3 Optionen + Empfehlung.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
              <Clock size={18} />
            </div>
            <div>
              <div className="font-extrabold">2) Kurz abstimmen</div>
              <div className="mt-1 text-sm text-white/75 leading-7">
                Datum, Location & Ablauf kurz bestätigen — klar, schnell, ohne Stress.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
              <MapPin size={18} />
            </div>
            <div>
              <div className="font-extrabold">3) Setup & Service</div>
              <div className="mt-1 text-sm text-white/75 leading-7">
                Wir kommen, bauen auf und servieren — ihr genießt einfach euer Event.
              </div>
            </div>
          </div>
        </motion.div>

        {/* ✅ CTA */}
        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/experience-builder"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 text-sm font-extrabold shadow-xl hover:opacity-95 transition"
          >
            Preis kalkulieren
          </Link>

          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-extrabold backdrop-blur hover:bg-white/15 transition"
          >
            Anfrage senden
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}