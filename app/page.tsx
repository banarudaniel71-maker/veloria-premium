"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SignatureExperience from "@/app/components/SignatureExperience";
import ParallaxCocktailShowcase from "@/app/components/ParallaxCocktailShowcase";

export default function Page() {
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

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070c] via-[#05060a] to-[#05060a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(236,72,153,0.14),transparent_62%)]" />

        <div className="absolute -top-56 left-[-260px] h-[880px] w-[880px] rounded-full bg-fuchsia-500/18 blur-3xl animate-[veloriaFloat_18s_ease-in-out_infinite]" />
        <div className="absolute right-[-320px] top-[3%] h-[920px] w-[920px] rounded-full bg-orange-400/16 blur-3xl animate-[veloriaFloat_22s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-520px] left-[12%] h-[980px] w-[980px] rounded-full bg-rose-500/14 blur-3xl animate-[veloriaFloat_20s_ease-in-out_infinite]" />

        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "84px 84px",
            maskImage: "radial-gradient(ellipse at center, black 38%, transparent 76%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 38%, transparent 76%)",
          }}
        />

        <div
          className="absolute inset-0 mix-blend-soft-light opacity-[0.07]"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22160%22 height=%22160%22 filter=%22url(%23n)%22 opacity=%220.6%22/%3E%3C/svg%3E')",
          }}
        />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
          .animate-\\[veloriaFloat_18s_ease-in-out_infinite\\],
          .animate-\\[veloriaFloat_20s_ease-in-out_infinite\\],
          .animate-\\[veloriaFloat_22s_ease-in-out_infinite\\] {
            animation: none !important;
          }
        }
      `}</style>

      <section className="relative isolate min-h-[92vh] overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full scale-[1.04] object-cover object-center brightness-[0.88] saturate-[1.05]"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="absolute inset-0 -z-10 bg-black/18" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.14),transparent_26%),radial-gradient(circle_at_78%_18%,rgba(236,72,153,0.18),transparent_30%),radial-gradient(circle_at_70%_70%,rgba(249,115,22,0.14),transparent_28%)]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/38 to-[#05060a]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.12]" />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.28) 100%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute -left-24 top-24 h-[340px] w-[340px] rounded-full bg-fuchsia-500/16 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.15, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute right-[-80px] top-16 h-[360px] w-[360px] rounded-full bg-orange-400/14 blur-3xl"
        />

        <div className="mx-auto max-w-7xl px-5 pb-16 pt-10 sm:pt-14 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                className="flex flex-wrap gap-2"
              >
                <HeroBadge>München & Bayern</HeroBadge>
                <HeroBadge>Luxury Mobile Bar</HeroBadge>
                <HeroBadge>Signature Experience</HeroBadge>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.08 }}
                className="mt-8"
              >
                <div className="text-xs font-black uppercase tracking-[0.34em] text-white/55">
                  Veloria Cocktails
                </div>

                <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[0.97] tracking-[-0.03em] text-white sm:text-5xl lg:text-7xl">
                  Veloria Cocktails,
                  <span className="block bg-gradient-to-r from-white via-white to-white/72 bg-clip-text text-transparent">
                    Die Premium Mobile Bar für München & Bayern.
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
                  Ihr wählt eure Drinks, wir bringen ein stilvolles Setup, starke
                  Optik und einen ruhigen, professionellen Service für Hochzeiten,
                  private Feiern und Events in München & Bayern.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.16 }}
                className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3"
              >
                <HeroFact value="6 + 3" label="Cocktails & Mocktails" />
                <HeroFact value="Premium" label="Setup & Look" />
                <HeroFact value="MUC +" label="München & Bayern" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.24 }}
                className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <a
                  href="#builder"
                  className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 px-7 py-4 text-sm font-semibold text-white shadow-[0_18px_50px_-18px_rgba(236,72,153,0.75)] transition duration-300 hover:scale-[1.02]"
                >
                  Drinks auswählen
                  <span className="ml-2 transition group-hover:translate-x-1">→</span>
                </a>

                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-7 py-4 text-sm font-semibold text-white/95 backdrop-blur-xl transition hover:bg-white/14"
                >
                  Unverbindlich anfragen
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.32 }}
                className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/62"
              >
                <span>Hochzeiten</span>
                <span className="h-1 w-1 rounded-full bg-white/35" />
                <span>Private Feiern</span>
                <span className="h-1 w-1 rounded-full bg-white/35" />
                <span>Corporate Events</span>
              </motion.div>

              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.48 }}
                href="#builder"
                className="mt-10 inline-flex items-center gap-3 text-sm text-white/60 transition hover:text-white/85"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur">
                  ↓
                </span>
                <span>Zur Signature Auswahl</span>
              </motion.a>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 26, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.85, delay: 0.18 }}
              className="hidden lg:block"
            >
              <div className="relative mx-auto max-w-[430px]">
                <div className="absolute -inset-8 rounded-[40px] bg-gradient-to-br from-fuchsia-500/14 via-transparent to-orange-400/14 blur-3xl" />

                <div className="relative overflow-hidden rounded-[32px] border border-white/12 bg-black/35 p-5 shadow-[0_25px_80px_-30px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
                  <div className="rounded-[28px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-black uppercase tracking-[0.24em] text-white/50">
                          Curated Experience
                        </div>
                        <div className="mt-2 text-2xl font-semibold text-white">
                          Signature Event Bar
                        </div>
                      </div>
                      <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] text-white/72">
                        Premium
                      </span>
                    </div>

                    <div className="mt-5 overflow-hidden rounded-[22px] border border-white/10">
                      <div className="relative aspect-[4/5]">
                        <Image
                          src="/images/moment-1.jpg"
                          alt="Veloria Premium Setup"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="rounded-2xl border border-white/12 bg-black/28 p-3 backdrop-blur-xl">
                            <div className="text-sm font-semibold text-white">
                              Luxury setup. Clean service. Strong visual impact.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <HeroMiniCard
                        title="Look"
                        text="Elegante Optik für hochwertige Events."
                      />
                      <HeroMiniCard
                        title="Flow"
                        text="Ruhiger, professioneller Ablauf ohne Chaos."
                      />
                      <HeroMiniCard
                        title="Choice"
                        text="Gäste wählen Signature Cocktails & 0.0%."
                      />
                      <HeroMiniCard
                        title="Mood"
                        text="Von Wedding-Luxury bis moderne Party-Vibes."
                      />
                    </div>

                    <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <div>
                        <div className="text-xs uppercase tracking-[0.2em] text-white/45">
                          Fast Inquiry
                        </div>
                        <div className="mt-1 text-sm text-white/75">
                          Anfrage in unter 60 Sekunden
                        </div>
                      </div>
                      <Link
                        href="/kontakt"
                        className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:scale-[1.03]"
                      >
                        Starten
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Separator />
      <ParallaxCocktailShowcase />
      <Separator />
      <LuxuryGalleryStrip />
      <Separator />

      <section className="relative">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              So funktioniert Veloria
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/75">
              Kein kompliziertes Menü, keine Unsicherheit. Ihr wählt eure Favoriten –
              wir liefern Premium-Qualität.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <StepCard
              n="1"
              title="Drinks auswählen"
              desc="6 Cocktails + 3 Mocktails – ihr entscheidet den Vibe."
            />
            <StepCard
              n="2"
              title="Anfrage senden"
              desc="Datum, Gäste, Location – wir bestätigen und planen sauber."
            />
            <StepCard
              n="3"
              title="Event genießen"
              desc="Wir kommen, bauen auf und servieren mit Flow."
            />
          </div>

          <div className="mt-10 flex flex-col gap-4 rounded-3xl border border-white/12 bg-gradient-to-b from-white/14 to-white/6 p-7 shadow-2xl backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-semibold text-white/95">
                Unikat in München: Auswahl + Premium Flow.
              </div>
              <div className="mt-1 text-sm text-white/75">
                Eure Gäste merken sofort: Das ist kein Standard-Service – das ist Veloria.
              </div>
            </div>
            <a
              href="#builder"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 px-6 py-3 text-sm font-semibold text-white shadow-lg"
            >
              Jetzt auswählen →
            </a>
          </div>
        </div>
      </section>

      <Separator />

      <section id="builder">
        <SignatureExperience />
      </section>

      <Separator />
      <SignatureMoments />
      <Separator />
      <EventMoodSection />
      <Separator />
      <TrustSection />
      <Separator />

      <section className="relative">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">FAQ</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/75">
            Die häufigsten Fragen – kurz, klar und hilfreich.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {faq.map((f) => (
              <div
                key={f.q}
                className="rounded-3xl border border-white/12 bg-gradient-to-b from-white/14 to-white/6 p-7 backdrop-blur-md transition hover:border-white/25 hover:bg-white/12"
              >
                <div className="text-base font-semibold">{f.q}</div>
                <div className="mt-2 text-sm leading-relaxed text-white/75">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      <section className="relative">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <div className="rounded-3xl border border-white/12 bg-gradient-to-b from-white/14 to-white/6 p-8 shadow-2xl backdrop-blur-md md:p-10">
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Bereit für ein Premium-Erlebnis?
                </h2>
                <p className="mt-4 leading-relaxed text-white/75">
                  Wählt eure Drinks, schickt uns Datum & Location – wir melden uns
                  mit einer klaren Empfehlung.
                </p>
              </div>

              <div className="flex flex-col gap-3">
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
                  Unverbindlich anfragen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MobileStickyCTA />

      <footer className="border-t border-white/10 pb-24 sm:pb-0">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
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

function Separator() {
  return (
    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
  );
}

function StepCard({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-white/12 bg-gradient-to-b from-white/14 to-white/6 p-7 shadow-xl backdrop-blur-md transition hover:border-white/25 hover:bg-white/12">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/12 text-sm font-semibold text-white">
          {n}
        </div>
        <div className="text-lg font-semibold">{title}</div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-white/75">{desc}</p>
    </div>
  );
}

function SignatureMoments() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const y1 = useTransform(scrollYProgress, [0, 1], [18, -22]);
  const y2 = useTransform(scrollYProgress, [0, 1], [26, -28]);
  const o1 = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const o2 = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          style={{ opacity: o1, y: y1 }}
          className="absolute left-[-220px] top-[-140px] h-[520px] w-[520px] rounded-full bg-fuchsia-500/12 blur-3xl"
        />
        <motion.div
          style={{ opacity: o2, y: y2 }}
          className="absolute right-[-280px] top-[-180px] h-[600px] w-[600px] rounded-full bg-orange-400/10 blur-3xl"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black tracking-[0.28em] text-white/65">
              SIGNATURE MOMENTS
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Der Moment, an den Gäste sich erinnern
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-white/75">
              Premium wirkt durch saubere Details: Setup, Flow, Look und Geschmack –
              ohne Stress am Event.
            </p>
          </div>

          <a
            href="#builder"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/10 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-black/20"
          >
            Zur Auswahl →
          </a>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <MomentCard title="Premium Setup" desc="Clean, elegant, fotogen. Kein Chaos – nur Stil." tag="Look" />
          <MomentCard title="Schneller Flow" desc="Kurze Wartezeiten. Gäste bleiben im Gespräch – nicht in der Schlange." tag="Service" />
          <MomentCard title="Signature Garnish" desc="Optik, die wirkt: modern, edel, nicht kitschig." tag="Detail" />
          <MomentCard title="0.0% Optionen" desc="Mocktails, die sich anfühlen wie Cocktails – für alle Gäste." tag="Inclusive" />
        </div>

        <div className="mt-10 rounded-3xl border border-white/12 bg-gradient-to-b from-white/14 to-white/6 p-7 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-base font-semibold text-white/95">
                Veloria = Auswahl + Premium Ablauf
              </div>
              <div className="mt-1 text-sm text-white/75">
                Ihr wählt die Drinks – wir liefern den Wow-Moment.
              </div>
            </div>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 px-6 py-3 text-sm font-semibold text-white shadow-lg"
            >
              Angebot anfragen →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function MomentCard({ title, desc, tag }: { title: string; desc: string; tag: string }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="rounded-3xl border border-white/12 bg-gradient-to-b from-white/14 to-white/6 p-6 shadow-xl backdrop-blur-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="text-base font-semibold text-white/95">{title}</div>
        <span className="rounded-full border border-white/15 bg-black/15 px-2.5 py-1 text-[11px] text-white/70">
          {tag}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-white/75">{desc}</p>
      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="mt-4 text-xs text-white/60">München • Bayern • Premium Mobile Bar</div>
    </motion.div>
  );
}

function EventMoodSection() {
  const moods = [
    {
      title: "Hochzeiten",
      subtitle: "Elegant, warm, unvergesslich",
      desc: "Für stilvolle Hochzeiten mit cleanem Setup, eleganten Drinks und einem ruhigen, souveränen Service.",
      image: "/images/moment-1.jpg",
      tag: "Elegant",
    },
    {
      title: "Private Feiern",
      subtitle: "Stylisch, lebendig, modern",
      desc: "Geburtstage, Sommerfeste oder besondere Abende – mit Drinks, die gut aussehen und Gästen in Erinnerung bleiben.",
      image: "/images/moment-2.jpg",
      tag: "Vibrant",
    },
    {
      title: "Corporate Events",
      subtitle: "Clean, premium, professionell",
      desc: "Business-Events mit starker Optik, klarer Organisation und einem Bar-Konzept, das hochwertig wirkt.",
      image: "/images/moment-3.jpg",
      tag: "Modern",
    },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[5%] top-[-180px] h-[520px] w-[520px] rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute right-[6%] top-[-140px] h-[520px] w-[520px] rounded-full bg-orange-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.05),transparent_55%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black tracking-[0.28em] text-white/65">
              EVENT MOODS
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Für jede Stimmung der richtige Vibe
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-white/75">
              Veloria passt sich nicht nur dem Event an – sondern dem Gefühl, das eure
              Gäste erleben sollen.
            </p>
          </div>

          <a
            href="#builder"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/10 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-black/20"
          >
            Drinks auswählen →
          </a>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {moods.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-b from-white/14 to-white/6 shadow-2xl backdrop-blur-md"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={m.image}
                  alt={m.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/20 px-3 py-1 text-[11px] text-white/85 backdrop-blur">
                  {m.tag}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-2xl font-semibold text-white">{m.title}</div>
                  <div className="mt-1 text-sm text-white/80">{m.subtitle}</div>
                  <p className="mt-4 text-sm leading-relaxed text-white/75">{m.desc}</p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xs text-white/60">Premium Mood</span>
                    <span className="text-sm text-white/85 transition group-hover:translate-x-1">
                      Mehr Gefühl →
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-white/12 bg-gradient-to-b from-white/14 to-white/6 p-7 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-base font-semibold text-white/95">
                Nicht einfach Drinks. Ein kompletter Event-Vibe.
              </div>
              <div className="mt-1 text-sm text-white/75">
                Von elegant bis vibrant – wir passen Look, Auswahl und Flow an euer
                Event an.
              </div>
            </div>

            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 px-6 py-3 text-sm font-semibold text-white shadow-lg"
            >
              Event anfragen →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const items = [
    {
      title: "Premium Zutaten",
      desc: "Hochwertige Spirituosen, frische Komponenten und moderne Drink-Auswahl statt Standard-Lösungen.",
      stat: "Qualität",
    },
    {
      title: "Sauberes Setup",
      desc: "Elegante Bar-Optik, klare Linien und ein Aufbau, der auf hochwertigen Events stilvoll wirkt.",
      stat: "Look",
    },
    {
      title: "Professioneller Ablauf",
      desc: "Schneller Service, ruhiger Flow und ein organisierter Ablauf – damit Gäste genießen statt warten.",
      stat: "Flow",
    },
    {
      title: "0.0% für alle Gäste",
      desc: "Mocktails mit echtem Premium-Gefühl – nicht nur eine Notlösung, sondern Teil des Erlebnisses.",
      stat: "Inclusive",
    },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[10%] top-[-160px] h-[520px] w-[520px] rounded-full bg-white/6 blur-3xl" />
        <div className="absolute right-[8%] top-[-180px] h-[540px] w-[540px] rounded-full bg-fuchsia-500/8 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(255,255,255,0.07),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.05),transparent_55%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black tracking-[0.28em] text-white/65">
              TRUST & STANDARDS
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Premium heißt bei uns: Qualität, Look und Flow
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-white/75">
              Nicht nur schöne Drinks – sondern ein stimmiges Gesamtbild, das auf
              Hochzeiten und Events sofort hochwertig wirkt.
            </p>
          </div>

          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/10 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-black/20"
          >
            Anfrage senden →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-white/12 bg-gradient-to-b from-white/14 to-white/6 p-6 shadow-2xl backdrop-blur-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="text-base font-semibold text-white/95">{item.title}</div>
                <span className="rounded-full border border-white/15 bg-black/15 px-2.5 py-1 text-[11px] text-white/70">
                  {item.stat}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-white/75">{item.desc}</p>

              <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="mt-4 text-xs text-white/60">Veloria Premium Standard</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-white/12 bg-gradient-to-b from-white/14 to-white/6 p-7 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-base font-semibold text-white/95">
                Vertrauen entsteht durch Details, die man sofort sieht.
              </div>
              <div className="mt-1 text-sm text-white/75">
                Sauberer Aufbau, gute Zutaten und ein ruhiger Ablauf machen den
                Unterschied zwischen „okay“ und „premium“.
              </div>
            </div>

            <a
              href="#builder"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 px-6 py-3 text-sm font-semibold text-white shadow-lg"
            >
              Drinks auswählen →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-3 z-50 px-3 sm:hidden">
      <div className="mx-auto max-w-md rounded-2xl border border-white/15 bg-black/55 p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.85)] backdrop-blur-xl">
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.9)]" />
          <span className="text-[11px] font-medium text-white/70">
            München • 6 Cocktails + 3 Mocktails • Anfrage in 60 Sek.
          </span>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-2">
          <a
            href="#builder"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 px-4 py-3 text-sm font-semibold text-white shadow-lg"
          >
            Auswählen
          </a>

          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white/95 transition hover:bg-white/15"
          >
            Anfragen
          </Link>
        </div>
      </div>
    </div>
  );
}

function HeroBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center rounded-full border border-white/14 bg-white/8 px-3 py-1.5 text-[11px] font-medium text-white/88 backdrop-blur-xl">
      {children}
    </div>
  );
}

function HeroFact({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/12 bg-white/6 px-4 py-4 backdrop-blur-xl">
      <div className="text-xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/48">
        {label}
      </div>
    </div>
  );
}

function HeroMiniCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="text-xs uppercase tracking-[0.18em] text-white/48">{title}</div>
      <div className="mt-2 text-sm leading-6 text-white/78">{text}</div>
    </div>
  );
}

function LuxuryGalleryStrip() {
  const images = [
    "/images/moment-1.jpg",
    "/images/moment-2.jpg",
    "/images/moment-3.jpg",
    "/images/hero-veloria-lux.jpg",
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[8%] top-[-160px] h-[420px] w-[420px] rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute right-[8%] top-[-120px] h-[420px] w-[420px] rounded-full bg-orange-400/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black tracking-[0.28em] text-white/65">
              LUXURY IMPRESSIONS
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Eindrücke, die sofort Premium wirken
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-white/75">
              Stilvolle Optik, starke Bilder und ein Look, den Gäste sofort mit Qualität
              verbinden.
            </p>
          </div>

          <Link
            href="/galerie"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/10 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-black/20"
          >
            Galerie ansehen →
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {images.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.04] shadow-2xl backdrop-blur-md"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={src}
                  alt="Veloria Luxury Impression"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}