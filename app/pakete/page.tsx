"use client";

import Link from "next/link";
import { motion } from "framer-motion";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={
        "rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur shadow-[0_22px_70px_-35px_rgba(0,0,0,0.7)] " +
        className
      }
    >
      {children}
    </div>
  );
}

function PriceCard({
  title,
  subtitle,
  price,
  highlight,
  bullets,
  note,
}: {
  title: string;
  subtitle: string;
  price: string;
  highlight?: boolean;
  bullets: string[];
  note?: string;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-3xl border p-7 backdrop-blur",
        highlight
          ? "border-white/25 bg-gradient-to-br from-white/20 via-white/10 to-white/5"
          : "border-white/15 bg-white/10",
      ].join(" ")}
    >
      {highlight ? (
        <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-400 px-3 py-1 text-xs font-black text-white shadow">
          Bestseller
        </div>
      ) : null}

      <p className="text-sm font-bold text-white">{title}</p>
      <p className="mt-1 text-xs text-white/75">{subtitle}</p>

      <p className="mt-5 text-4xl font-semibold text-white">{price}</p>
      <p className="mt-1 text-sm text-white/80">
        *Richtpreis – final abhängig von Gästezahl, Location, Dauer & Wunsch-Menü.
      </p>

      <ul className="mt-6 space-y-3">
        {bullets.map((b) => (
          <li key={b} className="flex gap-3 text-sm text-white/85">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/90" />
            <span className="leading-6">{b}</span>
          </li>
        ))}
      </ul>

      {note ? <p className="mt-5 text-xs text-white/70 leading-5">{note}</p> : null}

      <div className="mt-7 flex gap-3">
        <Link
          href="/kontakt"
          className="rounded-2xl px-5 py-3 text-sm font-black text-white bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-400 hover:opacity-95 transition shadow-[0_18px_50px_-20px_rgba(236,72,153,0.9)]"
        >
          Angebot anfragen
        </Link>
        <a
          href="#addons"
          className="rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/15 transition backdrop-blur"
        >
          Add-ons
        </a>
      </div>
    </div>
  );
}

export default function PaketePage() {
  return (
    <main className="py-14 sm:py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-xs font-black tracking-[0.25em] text-white/70">PAKETE & PREISE</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-white">
            Premium-Pakete. Klar kalkuliert. Einfach buchen.
          </h1>
          <p className="mt-4 text-sm sm:text-base text-white/85 leading-7 max-w-2xl">
            Drei Pakete, die wirklich Sinn machen: von kompakt bis „Wow-Faktor“.
            Dazu Add-ons, damit du exakt dein Event triffst.
          </p>
        </motion.div>

        {/* Packages */}
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <PriceCard
            title="Essential (2 Stunden)"
            subtitle="Clean & classy • bis ca. 30 Gäste"
            price="ab 450–650€"
            bullets={[
              "1 Bartender • Kompaktes Setup",
              "4 Drinks Auswahl (2 Cocktails + 2 Longdrinks)",
              "Eis, Garnish, Bar-Tools inklusive",
              "Aufbau & Abbau + sauberer Barbereich",
            ]}
            note="Ideal für Geburtstage, House-Partys und kleine Feiern."
          />

          <PriceCard
            title="Signature (3 Stunden)"
            subtitle="Bestseller • bis ca. 60 Gäste"
            price="ab 850–1.250€"
            highlight
            bullets={[
              "1–2 Bartender • Premium-Bar Look",
              "6 Cocktails aus Menü (inkl. Klassiker + Signature)",
              "Schneller Service (optimierter Ablauf)",
              "Vorab-Beratung: Menü & Event-Timing",
            ]}
            note="Perfekt für Hochzeiten (klein/mittel) und Events mit Fokus auf Qualität."
          />

          <PriceCard
            title="Veloria Premium (4 Stunden)"
            subtitle="Show & Wow • bis ca. 100 Gäste"
            price="ab 1.500–2.200€"
            bullets={[
              "2 Bartender • High-End Service",
              "8–10 Cocktails + Special-Optionen",
              "Mood Lighting / Premium Presentation",
              "Maximaler „Wow-Faktor“ für große Feiern",
            ]}
            note="Ideal für Hochzeiten, Corporate und große Veranstaltungen."
          />
        </div>

        {/* Included + Notes */}
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Card>
            <p className="text-sm font-bold text-white">Immer inklusive</p>
            <ul className="mt-4 space-y-3 text-sm text-white/85">
              {[
                "Mobiler Bar-Aufbau (modern & clean)",
                "Bartender-Equipment & Bar-Tools",
                "Eis & Garnish (je nach Paket/Planung)",
                "Aufbau & Abbau • Aufräumen im Barbereich",
                "Beratung vorab (Menü, Ablauf, Gästeprofil)",
              ].map((x) => (
                <li key={x} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/90" />
                  <span className="leading-6">{x}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <p className="text-sm font-bold text-white">Transparenz</p>
            <p className="mt-3 text-sm text-white/85 leading-7">
              Der Endpreis hängt ab von Gästezahl, Location, Dauer, Menü-Auswahl und Logistik.
              Du bekommst ein klares Angebot – ohne Überraschungen.
            </p>
            <Link
              href="/kontakt"
              className="mt-5 inline-block rounded-2xl px-5 py-3 text-sm font-black text-white bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-400 hover:opacity-95 transition"
            >
              Jetzt Angebot erhalten
            </Link>
          </Card>
        </div>

        {/* Add-ons */}
        <div id="addons" className="mt-10">
          <Card>
            <p className="text-sm font-bold text-white">Add-ons (optional)</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["+1 Stunde Service", "ab 150–250€"],
                ["Mocktails (alkoholfrei)", "ab 2–4€ / Gast"],
                ["Welcome Drinks / Prosecco", "ab 150–400€"],
                ["Gläser-Service", "ab 1–2€ / Glas"],
                ["Personalisiertes Menü (Print)", "ab 30–80€"],
                ["Anfahrt", "nach Entfernung"],
                ["Themen-Cocktails", "nach Aufwand"],
                ["Extra Bartender", "nach Gästezahl"],
              ].map(([t, p]) => (
                <div key={t} className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="text-sm font-bold text-white">{t}</p>
                  <p className="mt-1 text-xs text-white/75">{p}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Container>
    </main>
  );
}
