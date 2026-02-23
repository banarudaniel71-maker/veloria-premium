"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";

type PackageType = "signature" | "classic" | "mocktail";
type EventType = "hochzeit" | "privat" | "corporate";
type Distance = "muc" | "umgebung" | "bayern";

export default function Page() {
  /* ---------------- Calculator (Wizard) ---------------- */
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [eventType, setEventType] = useState<EventType>("hochzeit");
  const [distance, setDistance] = useState<Distance>("muc");

  const [guests, setGuests] = useState(80);
  const [hours, setHours] = useState(5);

  const [packageType, setPackageType] = useState<PackageType>("signature");

  const calc = useMemo(() => {
    const perGuest = packageType === "signature" ? 19 : packageType === "classic" ? 15 : 11;
    const hourly = 170;

    const distanceFee = distance === "muc" ? 0 : distance === "umgebung" ? 120 : 250;
    const eventFactor = eventType === "hochzeit" ? 1.08 : eventType === "corporate" ? 1.05 : 1.0;

    const min = 1500;

    const base = (guests * perGuest + hours * hourly + distanceFee) * eventFactor;
    const total = Math.max(min, Math.round(base / 10) * 10);

    const low = Math.round((total * 0.9) / 10) * 10;
    const high = Math.round((total * 1.12) / 10) * 10;

    const label =
      packageType === "signature"
        ? "Signature Cocktails"
        : packageType === "classic"
        ? "Klassiker & Spritz"
        : "Premium Mocktails 0.0%";

    return { low, high, label, total, perGuest, hourly, distanceFee, eventFactor };
  }, [guests, hours, packageType, distance, eventType]);

  /* ---------------- FAQ + SEO Schema ---------------- */
  const faq = [
    {
      q: "In welchen Regionen seid ihr verfügbar?",
      a: "Wir sind in München & Umgebung im Einsatz. Je nach Termin sind auch weitere Locations in Bayern möglich.",
    },
    {
      q: "Was ist im Service enthalten?",
      a: "Stilvolles Bar-Setup, professioneller Barkeeper-Service, Zubereitung der Drinks und ein sauberer Ablauf. Details hängen vom Paket ab.",
    },
    {
      q: "Bietet ihr alkoholfreie Optionen an?",
      a: "Ja — Premium Mocktails (0.0%) sowie alkoholfreie Varianten beliebter Klassiker sind möglich.",
    },
    {
      q: "Wie läuft die Buchung ab?",
      a: "Ihr sendet Anfrage mit Datum, Gästeanzahl und Location. Wir empfehlen ein Paket und bestätigen danach den Termin.",
    },
    {
      q: "Wie schnell erhalten wir ein Angebot?",
      a: "Sobald Datum, Gästeanzahl und Location feststehen, senden wir euch zeitnah ein individuelles Angebot.",
    },
  ];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Veloria Cocktails – Premium Mobile Bar",
    description:
      "Premium Mobile Bar für Hochzeiten & Events in München & Umgebung. Exklusive Cocktails, stilvolles Setup und professioneller Barkeeper-Service.",
    areaServed: ["München", "Bayern"],
    serviceType: ["Mobile Bar", "Cocktail Catering", "Barkeeper Service"],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const progress = step === 1 ? 0.33 : step === 2 ? 0.66 : 1.0;

  return (
    <main className="min-h-screen text-white relative overflow-hidden">
      {/* ===================== FUNDAL GLOBAL (NU NEGRU) ===================== */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* 1) FOTO ambient (vizibilă, nu “ascunsă”) */}
        <Image
          src="/images/moment-1.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.28] blur-xl scale-110"
          priority={false}
        />

        {/* 2) BAZA COLOR (în loc de negru gol) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#090A10] via-[#07080d] to-[#06060a]" />

        {/* 3) OVERLAY DE LIZIBILITATE — LIGHT (ĂSTA ERA PROBLEMA) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/45" />

        {/* 4) Aurora blobs (mai “lux”) */}
        <div className="absolute -top-60 left-[-260px] h-[920px] w-[920px] rounded-full bg-fuchsia-500/24 blur-3xl animate-[veloriaFloat_16s_ease-in-out_infinite]" />
        <div className="absolute top-[4%] right-[-320px] h-[980px] w-[980px] rounded-full bg-orange-400/20 blur-3xl animate-[veloriaFloat_20s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-520px] left-[10%] h-[980px] w-[980px] rounded-full bg-rose-500/18 blur-3xl animate-[veloriaFloat_18s_ease-in-out_infinite]" />
        <div className="absolute top-[48%] left-[35%] h-[780px] w-[780px] rounded-full bg-sky-400/12 blur-3xl animate-[veloriaFloat_22s_ease-in-out_infinite]" />

        {/* 5) Mesh overlay (face “wow”) */}
        <div
          className="absolute inset-0 opacity-[0.52] mix-blend-screen"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 18%, rgba(236,72,153,0.42), transparent 42%), radial-gradient(circle at 86% 22%, rgba(251,146,60,0.32), transparent 45%), radial-gradient(circle at 35% 86%, rgba(244,63,94,0.28), transparent 48%), radial-gradient(circle at 68% 62%, rgba(56,189,248,0.18), transparent 46%)",
          }}
        />

        {/* 6) Lift + vignette (cinematic) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.09),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_62%)]" />

        {/* 7) Grid super fin */}
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "84px 84px",
            maskImage: "radial-gradient(ellipse at center, black 38%, transparent 76%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 38%, transparent 76%)",
          }}
        />

        {/* 8) Noise */}
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22160%22 height=%22160%22 filter=%22url(%23n)%22 opacity=%220.6%22/%3E%3C/svg%3E')",
          }}
        />
      </div>

      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* keyframes */}
      <style>{`
        @keyframes veloriaFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes veloriaFloat {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(0,-18px,0) scale(1.02); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[veloriaFloat_16s_ease-in-out_infinite\\],
          .animate-\\[veloriaFloat_18s_ease-in-out_infinite\\],
          .animate-\\[veloriaFloat_20s_ease-in-out_infinite\\],
          .animate-\\[veloriaFloat_22s_ease-in-out_infinite\\] { animation: none !important; }
        }
      `}</style>

      {/* ===================== HERO (mai luminos, nu “noapte”) ===================== */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero-veloria-lux.jpg"
            alt="Veloria Premium Mobile Bar – Cocktailbar für Hochzeiten in München"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* IMPORTANT: overlay-ul ăsta era prea dark -> îl fac mai soft */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/58 via-black/28 to-black/55" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.10),transparent_55%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,rgba(236,72,153,0.16),transparent_60%)]" />

        <div className="mx-auto max-w-6xl px-5 pb-14 pt-10 lg:pb-24 lg:pt-14">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <Pill>📍 München & Umgebung</Pill>
              <Pill>⭐ 5-Sterne Service</Pill>
              <Pill>🤍 Sauber & stilvoll</Pill>
            </div>
            <div className="hidden sm:block">
              <div className="text-center font-[cursive] text-4xl tracking-wide text-white/95 drop-shadow">
                Veloria
              </div>
            </div>
          </div>

          <div className="mt-14 max-w-3xl">
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl drop-shadow">
              Premium Mobile Bar <br className="hidden sm:block" />
              für Hochzeiten & Events in München
            </h1>

            <p className="mt-6 max-w-2xl text-base sm:text-lg text-white/85 leading-relaxed">
              Luxuriöse Cocktailbar mit stilvollem Setup, hochwertigen Zutaten und souveränem Barkeeper-Service – für
              ein Erlebnis, das Gäste lieben.
            </p>

            <ul className="mt-8 space-y-3 text-white/90">
              <li className="flex items-center gap-2">
                <Check /> Exklusive Cocktails & Premium Mocktails
              </li>
              <li className="flex items-center gap-2">
                <Check /> Fotogene Bar-Optik & saubere Details
              </li>
              <li className="flex items-center gap-2">
                <Check /> Klarer Ablauf, entspannter Service
              </li>
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#kalkulator"
                className="group inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl
                bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400"
              >
                Preisrechner in 60 Sekunden
                <span className="ml-2 inline-block transition group-hover:translate-x-0.5">→</span>
              </a>

              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-white/95
                border border-white/25 bg-black/10 backdrop-blur-md shadow-lg transition hover:bg-black/20"
              >
                Unverbindlich anfragen
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-3 text-xs text-white/70">
              <span className="inline-flex h-2 w-2 rounded-full bg-white/50" />
              <span>Hochzeiten • Private Feiern • Corporate Events</span>
            </div>

            <div className="mt-10">
              <a href="#kalkulator" className="inline-flex items-center gap-2 text-xs text-white/70 hover:text-white/90">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/10">
                  ↓
                </span>
                <span>Zum Preisrechner</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* ===================== 3) WARUM VELORIA ===================== */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-170px] h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-white/6 blur-3xl" />
          <div className="absolute left-1/2 top-[-230px] h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Warum Veloria?</h2>
            <p className="mt-5 text-white/75 text-lg leading-relaxed">
              Premium bedeutet bei uns: saubere Optik, hochwertige Zutaten und ein souveräner Ablauf – damit ihr euch
              auf euer Event konzentrieren könnt.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <UspCard title="Elegantes Setup" desc="Stilvoll, sauber und fotogen – passend zu hochwertigen Locations." />
            <UspCard
              title="Hochwertige Zutaten"
              desc="Signature Drinks, Klassiker & 0.0% Optionen – modern und geschmackvoll."
            />
            <UspCard title="Schneller Flow" desc="Professionelle Abläufe – kurze Wartezeiten, entspannte Gäste." />
            <UspCard title="Souveräner Service" desc="Freundlich, ruhig, zuverlässig – ohne Stress am großen Tag." />
          </div>

          <div className="mt-10 rounded-3xl border border-white/12 bg-gradient-to-b from-white/14 to-white/6 p-7 backdrop-blur-md flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between shadow-2xl">
            <div>
              <div className="font-semibold text-white/95">Kurz gesagt: Premium, das man sieht.</div>
              <div className="text-sm text-white/75 mt-1">
                Perfekt für Hochzeiten, private Feiern und Corporate Events in München.
              </div>
            </div>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg
              bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400"
            >
              Jetzt anfragen →
            </Link>
          </div>
        </div>
      </section>

      <Separator />

      {/* ===================== 4) WAS IHR BEKOMMT ===================== */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[12%] top-[-160px] h-[460px] w-[760px] rounded-full bg-orange-400/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Was ihr bekommt</h2>
              <p className="mt-4 max-w-2xl text-white/75 leading-relaxed">
                Ein Premium-Erlebnis, das optisch überzeugt und organisatorisch perfekt läuft. Sauber, stilvoll,
                souverän.
              </p>
            </div>
            <a
              href="#kalkulator"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/10 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-black/20"
            >
              Zum Preisrechner →
            </a>
          </div>

          <AnimatedReveal>
            <div className="mt-10 rounded-3xl border border-white/12 bg-gradient-to-b from-white/14 to-white/6 p-7 backdrop-blur-md shadow-2xl">
              <div className="space-y-3">
                <StaggerLine title="Premium Setup" note="sauber & edel" delayMs={0} />
                <StaggerLine title="Top Drinks" note="Signature & Klassiker" delayMs={120} />
                <StaggerLine title="Souveräner Service" note="ruhig & professionell" delayMs={240} />
              </div>

              <div className="mt-6 rounded-2xl bg-black/15 p-4 text-xs leading-relaxed text-white/75">
                Perfekt für hochwertige Hochzeiten, private Feiern und Corporate Events.
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </section>

      <Separator />

      {/* ===================== 5) PAKETE ===================== */}
      <section id="pakete" className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-[8%] top-[-180px] h-[520px] w-[860px] rounded-full bg-rose-500/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Unsere Cocktail-Pakete</h2>
              <p className="mt-4 max-w-2xl text-white/75 leading-relaxed">
                Drei klare Pakete – hochwertig, stilvoll und flexibel. Auf Wunsch passen wir Auswahl und Ablauf an.
              </p>
            </div>
            <a
              href="#kalkulator"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg
              bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400"
            >
              Mit dem Rechner starten →
            </a>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <PackageCard
              title="Signature Cocktails"
              badge="Premium"
              desc="Exklusive Drinks mit Wow-Effekt – modern, elegant und fotogen."
              bullets={["Signature Auswahl", "Premium Garnish & Look", "Perfekt für Hochzeiten"]}
            />
            <PackageCard
              title="Klassiker & Spritz"
              badge="Beliebt"
              desc="Zeitlose Klassiker und Spritz-Vibes – leicht, frisch und stilvoll."
              bullets={["Klassiker Auswahl", "Aperitif-Charakter", "Ideal für Empfang"]}
            />
            <PackageCard
              title="Premium Mocktails 0.0%"
              badge="0.0%"
              desc="Alkoholfrei, aber luxuriös – für Gäste, die bewusst genießen."
              bullets={["0.0% Premium Drinks", "Geschmackvoll & elegant", "Für alle Gäste"]}
            />
          </div>
        </div>
      </section>

      <Separator />

      {/* ===================== 6) SIGNATURE SELECTION ===================== */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[10%] top-[-180px] h-[520px] w-[860px] rounded-full bg-fuchsia-500/8 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Signature Selection</h2>
              <p className="mt-4 max-w-2xl text-white/75 leading-relaxed">
                Eine kleine Auswahl unserer beliebtesten Drinks – stilvoll serviert und perfekt für Fotos.
              </p>
            </div>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/10 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-black/20"
            >
              Cocktail Menü ansehen →
            </Link>
          </div>

          <AnimatedReveal>
            <div className="mt-10 rounded-3xl border border-white/12 bg-gradient-to-b from-white/14 to-white/6 p-7 backdrop-blur-md shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-white/90">Signature Selection</div>
                <div className="text-xs text-white/70">Premium Setup</div>
              </div>

              <div className="mt-5 space-y-3">
                <StaggerLine title="Espresso Martini" note="elegant & beliebt" delayMs={0} />
                <StaggerLine title="Aperol Spritz" note="frisch & fotogen" delayMs={120} />
                <StaggerLine title="Mai Tai" note="tropical vibe" delayMs={240} />
              </div>

              <div className="mt-6 rounded-2xl bg-black/15 p-4 text-xs leading-relaxed text-white/75">
                Stilvoll, sauber, souverän — ideal für hochwertige Hochzeiten & Events.
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </section>

      <Separator />

      {/* ===================== 7) GALERIE ===================== */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-[10%] top-[-180px] h-[520px] w-[860px] rounded-full bg-sky-400/8 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Galerie</h2>
              <p className="mt-4 max-w-2xl text-white/75 leading-relaxed">
                Premium-Optik, warme Atmosphäre, saubere Details – live und auf Bildern überzeugend.
              </p>
            </div>
            <Link
              href="/galerie"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/10 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-black/20"
            >
              Mehr ansehen →
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <GalleryImg src="/images/moment-1.jpg" alt="Veloria Event Moment 1" />
            <GalleryImg src="/images/moment-2.jpg" alt="Veloria Event Moment 2" />
            <GalleryImg src="/images/moment-3.jpg" alt="Veloria Event Moment 3" />
          </div>
        </div>
      </section>

      <Separator />

      {/* ===================== 8) ABLAUF ===================== */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Ablauf</h2>
          <p className="mt-4 max-w-2xl text-white/75 leading-relaxed">
            Klar, schnell und stressfrei – damit ihr euren Tag genießen könnt.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <StepCard n="1" title="Anfrage senden" desc="Datum, Gästeanzahl und Location – kurz & einfach." />
            <StepCard n="2" title="Paket abstimmen" desc="Wir empfehlen ein Paket und klären Details & Auswahl." />
            <StepCard n="3" title="Event genießen" desc="Wir kommen, bauen auf und servieren stilvoll – ihr feiert." />
          </div>
        </div>
      </section>

      <Separator />

      {/* ===================== 9) BEWERTUNGEN ===================== */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Bewertungen</h2>
              <p className="mt-4 max-w-2xl text-white/75 leading-relaxed">
                Vertrauen entsteht durch echte Eindrücke. (Hier kannst du später echte Bewertungen einsetzen.)
              </p>
            </div>
            <div className="text-sm text-white/65">⭐ 5-Sterne Eindruck • Stil • Qualität</div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <ReviewCard
              text="„Setup war super edel und die Drinks waren top. Alles lief ruhig und professionell.“"
              meta="Hochzeit • München"
            />
            <ReviewCard
              text="„Sehr schneller Service und tolle Atmosphäre. Genau der Premium-Vibe, den wir wollten.“"
              meta="Private Feier • Umgebung"
            />
            <ReviewCard
              text="„Drinks und Optik waren ein Highlight – wir würden sofort wieder buchen.“"
              meta="Event • München"
            />
          </div>
        </div>
      </section>

      <Separator />

      {/* ===================== 10) FAQ ===================== */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">FAQ</h2>
          <p className="mt-4 max-w-2xl text-white/75 leading-relaxed">Die häufigsten Fragen – kurz, klar und hilfreich.</p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {faq.map((f) => (
              <div
                key={f.q}
                className="rounded-3xl border border-white/12 bg-gradient-to-b from-white/14 to-white/6 p-7 backdrop-blur-md transition hover:bg-white/12 hover:border-white/25"
              >
                <div className="text-base font-semibold">{f.q}</div>
                <div className="mt-2 text-sm text-white/75 leading-relaxed">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* ===================== 2) CALCULATOR ===================== */}
      <section id="kalkulator" className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-200px] h-[560px] w-[980px] -translate-x-1/2 rounded-full bg-rose-500/10 blur-3xl" />
          <div className="absolute left-1/2 top-[-240px] h-[560px] w-[840px] -translate-x-1/2 rounded-full bg-orange-400/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Preisrechner in 60 Sekunden</h2>
              <p className="mt-4 max-w-2xl text-white/75 leading-relaxed">
                Erst überzeugen, dann rechnen: Drei Schritte – sofort eine unverbindliche Preis-Range.
              </p>
            </div>
            <div className="text-sm text-white/65">Schnell • Transparent • Premium</div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Wizard */}
            <div className="rounded-3xl border border-white/12 bg-gradient-to-b from-white/14 to-white/6 p-7 backdrop-blur-md shadow-2xl">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-white/90">Schritt {step} von 3</div>
                <div className="flex items-center gap-2">
                  <Dot active={step >= 1} />
                  <Dot active={step >= 2} />
                  <Dot active={step >= 3} />
                </div>
              </div>

              <div className="mt-4 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 transition-all duration-500"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>

              <div className="mt-6">
                <FadeSwap keyProp={step}>
                  {step === 1 ? (
                    <div>
                      <div className="text-lg font-semibold">Event & Region</div>
                      <p className="mt-2 text-sm text-white/75">Damit wir sauber rechnen: Anlass und Entfernung.</p>

                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        <Choice
                          title="Hochzeit"
                          subtitle="Premium Fokus"
                          active={eventType === "hochzeit"}
                          onClick={() => setEventType("hochzeit")}
                        />
                        <Choice
                          title="Privat"
                          subtitle="Geburtstag etc."
                          active={eventType === "privat"}
                          onClick={() => setEventType("privat")}
                        />
                        <Choice
                          title="Corporate"
                          subtitle="Business Stil"
                          active={eventType === "corporate"}
                          onClick={() => setEventType("corporate")}
                        />
                      </div>

                      <div className="mt-7">
                        <div className="text-sm text-white/75">Region</div>
                        <div className="mt-3 grid gap-3 sm:grid-cols-3">
                          <Choice
                            title="München"
                            subtitle="0€ Anfahrt"
                            active={distance === "muc"}
                            onClick={() => setDistance("muc")}
                          />
                          <Choice
                            title="Umgebung"
                            subtitle="ca. 20–50 km"
                            active={distance === "umgebung"}
                            onClick={() => setDistance("umgebung")}
                          />
                          <Choice
                            title="Bayern"
                            subtitle="weiterer Radius"
                            active={distance === "bayern"}
                            onClick={() => setDistance("bayern")}
                          />
                        </div>
                      </div>
                    </div>
                  ) : step === 2 ? (
                    <div>
                      <div className="text-lg font-semibold">Gäste & Dauer</div>
                      <p className="mt-2 text-sm text-white/75">
                        Kurz einstellen – später machen wir es exakt im Angebot.
                      </p>

                      <div className="mt-6 grid gap-6 sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/12 bg-black/10 p-5">
                          <div className="flex items-end justify-between">
                            <div className="text-sm text-white/75">Gästeanzahl</div>
                            <div className="text-2xl font-semibold">{guests}</div>
                          </div>
                          <input
                            type="range"
                            min={30}
                            max={250}
                            step={5}
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            className="mt-4 w-full"
                          />
                          <div className="mt-2 flex justify-between text-xs text-white/55">
                            <span>30</span>
                            <span>250</span>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-white/12 bg-black/10 p-5">
                          <div className="flex items-end justify-between">
                            <div className="text-sm text-white/75">Dauer (h)</div>
                            <div className="text-2xl font-semibold">{hours}</div>
                          </div>
                          <input
                            type="range"
                            min={3}
                            max={10}
                            step={1}
                            value={hours}
                            onChange={(e) => setHours(Number(e.target.value))}
                            className="mt-4 w-full"
                          />
                          <div className="mt-2 flex justify-between text-xs text-white/55">
                            <span>3</span>
                            <span>10</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-lg font-semibold">Paket</div>
                      <p className="mt-2 text-sm text-white/75">Wählt euren Stil – Signature, Klassiker oder 0.0%.</p>

                      <div className="mt-6 grid gap-3">
                        <Choice
                          title="Signature Cocktails"
                          subtitle="WOW-Drinks, fotogen"
                          active={packageType === "signature"}
                          onClick={() => setPackageType("signature")}
                        />
                        <Choice
                          title="Klassiker & Spritz"
                          subtitle="Beliebt, elegant"
                          active={packageType === "classic"}
                          onClick={() => setPackageType("classic")}
                        />
                        <Choice
                          title="Premium Mocktails 0.0%"
                          subtitle="Alkoholfrei, luxuriös"
                          active={packageType === "mocktail"}
                          onClick={() => setPackageType("mocktail")}
                        />
                      </div>
                    </div>
                  )}
                </FadeSwap>
              </div>

              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={() => setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : s))}
                  disabled={step === 1}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/10 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-black/20 disabled:opacity-40"
                >
                  Zurück
                </button>

                <button
                  onClick={() => setStep((s) => (s < 3 ? ((s + 1) as 1 | 2 | 3) : s))}
                  disabled={step === 3}
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg
                  bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 disabled:opacity-60"
                >
                  Weiter →
                </button>
              </div>
            </div>

            {/* Result */}
            <div className="rounded-3xl border border-white/12 bg-gradient-to-b from-white/14 to-white/6 p-7 backdrop-blur-md shadow-2xl">
              <div className="text-sm text-white/65">Eure Kalkulation</div>

              <div className="mt-3 text-4xl font-bold">
                {calc.low.toLocaleString()} – {calc.high.toLocaleString()} €
              </div>

              <p className="mt-3 text-sm text-white/75 leading-relaxed">
                <span className="text-white/95 font-semibold">{eventTypeLabel(eventType)}</span> •{" "}
                <span className="text-white/95 font-semibold">{distanceLabel(distance)}</span>
                <br />
                <span className="text-white/95 font-semibold">{guests}</span> Gäste •{" "}
                <span className="text-white/95 font-semibold">{hours}</span> Stunden •{" "}
                <span className="text-white/95 font-semibold">{calc.label}</span>
              </p>

              <div className="mt-6 rounded-2xl border border-white/12 bg-black/10 p-5">
                <div className="text-xs text-white/65">Kurz-Breakdown</div>
                <div className="mt-3 space-y-2 text-sm text-white/80">
                  <Row k="Pro Gast" v={`${calc.perGuest} €`} />
                  <Row k="Pro Stunde" v={`${calc.hourly} €`} />
                  <Row k="Anfahrt" v={`${calc.distanceFee} €`} />
                  <Row k="Event-Faktor" v={`${Math.round(calc.eventFactor * 100)}%`} />
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/12 bg-black/10 p-5 text-xs text-white/65 leading-relaxed">
                *Unverbindlicher Rechner. Der finale Preis hängt von Details wie Location, Aufbau, Zeitplan und Getränkekarte ab.
              </div>

              <div className="mt-7 flex flex-col gap-3">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg
                  bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400"
                >
                  Individuelles Angebot anfordern
                </Link>
                <a
                  href="#pakete"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/10 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-black/20"
                >
                  Pakete ansehen →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* ===================== CTA FINAL ===================== */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-220px] h-[560px] w-[980px] -translate-x-1/2 rounded-full bg-white/7 blur-3xl" />
          <div className="absolute left-1/2 top-[-260px] h-[560px] w-[820px] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <div className="rounded-3xl border border-white/12 bg-gradient-to-b from-white/14 to-white/6 p-8 shadow-2xl backdrop-blur-md md:p-10">
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Bereit für ein Premium-Erlebnis?</h2>
                <p className="mt-4 text-white/75 leading-relaxed">
                  Schickt uns Datum, Gästeanzahl und Location – wir melden uns mit einer klaren Empfehlung und einem individuellen Angebot.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg
                  bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400"
                >
                  Unverbindlich anfragen
                </Link>
                <a
                  href="#kalkulator"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/10 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-black/20"
                >
                  Preisrechner öffnen →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-white/65 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Veloria Cocktails</div>
          <div className="flex gap-4">
            <Link href="/impressum" className="hover:text-white">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-white">
              Datenschutz
            </Link>
            <Link href="/kontakt" className="hover:text-white">
              Kontakt
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* --------------------- UI helpers --------------------- */

function eventTypeLabel(t: EventType) {
  if (t === "hochzeit") return "Hochzeit";
  if (t === "corporate") return "Corporate Event";
  return "Private Feier";
}

function distanceLabel(d: Distance) {
  if (d === "muc") return "München";
  if (d === "umgebung") return "München & Umgebung";
  return "Bayern";
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center rounded-full border border-white/18 bg-black/10 px-3 py-1 text-xs text-white/90 backdrop-blur-md">
      {children}
    </div>
  );
}

function Check() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/18 text-white/90">
      ✓
    </span>
  );
}

function Dot({ active }: { active: boolean }) {
  return <span className={`h-2 w-2 rounded-full ${active ? "bg-white" : "bg-white/25"}`} />;
}

function Choice({
  title,
  subtitle,
  active,
  onClick,
}: {
  title: string;
  subtitle: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left rounded-2xl border px-4 py-4 transition ${
        active ? "border-white/35 bg-white/10" : "border-white/12 bg-black/10 hover:bg-black/20"
      }`}
    >
      <div className="text-sm font-semibold text-white/95">{title}</div>
      <div className="mt-1 text-xs text-white/65">{subtitle}</div>
    </button>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-white/65">{k}</div>
      <div className="font-semibold text-white/90">{v}</div>
    </div>
  );
}

function UspCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-white/12 bg-gradient-to-b from-white/14 to-white/6 p-6 backdrop-blur-md shadow-xl transition hover:bg-white/12 hover:border-white/25">
      <div className="text-base font-semibold text-white/95">{title}</div>
      <p className="mt-2 text-sm text-white/75 leading-relaxed">{desc}</p>
    </div>
  );
}

function PackageCard({
  title,
  badge,
  desc,
  bullets,
}: {
  title: string;
  badge: string;
  desc: string;
  bullets: string[];
}) {
  return (
    <div className="rounded-3xl border border-white/12 bg-gradient-to-b from-white/14 to-white/6 p-7 backdrop-blur-md shadow-xl transition hover:bg-white/12 hover:border-white/25">
      <div className="flex items-start justify-between gap-3">
        <div className="text-lg font-semibold">{title}</div>
        <span className="rounded-full border border-white/18 bg-black/10 px-3 py-1 text-xs text-white/80">{badge}</span>
      </div>
      <p className="mt-3 text-sm text-white/75 leading-relaxed">{desc}</p>

      <ul className="mt-6 space-y-2 text-sm text-white/85">
        {bullets.map((b) => (
          <li key={b} className="flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/18 text-white/95">
              ✓
            </span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function GalleryImg({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/12 bg-black/10 shadow-xl">
      <Image src={src} alt={alt} fill className="object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
    </div>
  );
}

function StepCard({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-white/12 bg-gradient-to-b from-white/14 to-white/6 p-7 backdrop-blur-md shadow-xl transition hover:bg-white/12 hover:border-white/25">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/12 text-white text-sm font-semibold">
          {n}
        </div>
        <div className="text-lg font-semibold">{title}</div>
      </div>
      <p className="mt-3 text-sm text-white/75 leading-relaxed">{desc}</p>
    </div>
  );
}

function ReviewCard({ text, meta }: { text: string; meta: string }) {
  return (
    <div className="rounded-3xl border border-white/12 bg-gradient-to-b from-white/14 to-white/6 p-7 backdrop-blur-md shadow-xl transition hover:bg-white/12 hover:border-white/25">
      <p className="text-sm text-white/85 leading-relaxed">{text}</p>
      <div className="mt-4 text-xs font-semibold text-white/65">{meta}</div>
    </div>
  );
}

function Separator() {
  return <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
}

function AnimatedReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}

function StaggerLine({ title, note, delayMs }: { title: string; note: string; delayMs: number }) {
  return (
    <div
      className="flex items-center justify-between rounded-2xl border border-white/12 bg-gradient-to-b from-white/14 to-white/6 px-4 py-3"
      style={{ animation: `veloriaFadeUp 650ms ease-out ${delayMs}ms both` }}
    >
      <div className="text-sm font-semibold text-white/95">{title}</div>
      <div className="text-xs text-white/70">{note}</div>
    </div>
  );
}

function FadeSwap({ children, keyProp }: { children: React.ReactNode; keyProp: any }) {
  return (
    <div key={String(keyProp)} className="animate-[veloriaFadeUp_380ms_ease-out_both]">
      {children}
    </div>
  );
}