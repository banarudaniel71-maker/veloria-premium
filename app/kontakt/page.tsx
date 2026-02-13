"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const brand = {
  phone: "+49 000 000000", // schimbăm după
  email: "kontakt@veloria-cocktails.de", // schimbăm după
  whatsapp:
    "https://wa.me/490000000000?text=Hallo%20Veloria%20Cocktails!%20Ich%20m%C3%B6chte%20ein%20Angebot%20anfragen.",
};

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>;
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur shadow-[0_22px_70px_-35px_rgba(0,0,0,0.7)]">
      {children}
    </div>
  );
}

/** ✅ Componenta care folosește useSearchParams trebuie să stea în Suspense */
function KontaktInner() {
  const sp = useSearchParams();

  // Query din /experience-builder (prefill)
  const guests = sp.get("guests") || "";
  const hours = sp.get("hours") || "";
  const distanceKm = sp.get("distanceKm") || "";
  const dateType = sp.get("dateType") || "";
  const addons = sp.get("addons") || "";
  const recommended = sp.get("recommended") || "";
  const price = sp.get("price") || "";

  const prefillMessage = useMemo(() => {
    const parts: string[] = [];
    if (guests) parts.push(`Gäste: ${guests}`);
    if (hours) parts.push(`Dauer: ${hours}h`);
    if (distanceKm) parts.push(`Entfernung: ${distanceKm}km`);
    if (dateType) parts.push(`Datum-Typ: ${dateType}`);
    if (addons) parts.push(`Add-ons: ${addons}`);
    if (recommended) parts.push(`Empfehlung: ${recommended}`);
    if (price) parts.push(`Preis (Schätzung): ${price}€`);

    return parts.length
      ? `Hallo Veloria,\n\nich möchte ein Angebot anfragen.\n\n${parts.join(" • ")}\n\nWünsche / Location:\n`
      : "";
  }, [guests, hours, distanceKm, dateType, addons, recommended, price]);

  const [message, setMessage] = useState(prefillMessage);

  return (
    <main className="py-14 sm:py-16">
      <Container>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <p className="text-xs font-black tracking-[0.25em] text-white/70">KONTAKT</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-white">Angebot anfragen</h1>
          <p className="mt-4 text-sm sm:text-base text-white/85 leading-7 max-w-2xl">
            Schreib uns Datum, Gästezahl und Location – wir senden dir ein klares Angebot inkl. Menü-Vorschlag.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {/* Form */}
          <Card>
            <p className="text-sm font-black text-white">Kurze Anfrage</p>
            <p className="mt-2 text-sm text-white/80">
              (Im nächsten Schritt verbinden wir das Formular mit E-Mail, damit du echte Anfragen bekommst.)
            </p>

            <form
              className="mt-6 grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Formular ist vorbereitet. Nächster Schritt: E-Mail Versand aktivieren.");
              }}
            >
              <div className="grid gap-2">
                <label className="text-xs text-white/80">Name</label>
                <input
                  required
                  className="h-11 rounded-2xl border border-white/15 bg-black/25 px-4 text-sm outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="Dein Name"
                />
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-xs text-white/80">E-Mail</label>
                  <input
                    required
                    type="email"
                    className="h-11 rounded-2xl border border-white/15 bg-black/25 px-4 text-sm outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="name@domain.de"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-xs text-white/80">Telefon (optional)</label>
                  <input
                    className="h-11 rounded-2xl border border-white/15 bg-black/25 px-4 text-sm outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="+49..."
                  />
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-xs text-white/80">Event-Datum</label>
                  <input
                    type="date"
                    className="h-11 rounded-2xl border border-white/15 bg-black/25 px-4 text-sm outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-xs text-white/80">Gästezahl</label>
                  <input
                    type="number"
                    min={1}
                    defaultValue={guests || undefined}
                    className="h-11 rounded-2xl border border-white/15 bg-black/25 px-4 text-sm outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="z. B. 60"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-xs text-white/80">Location / Wünsche</label>
                <textarea
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="rounded-2xl border border-white/15 bg-black/25 p-4 text-sm outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="Location, Paketwunsch, Cocktail-Vibe, Mocktails…"
                />
              </div>

              <button
                type="submit"
                className="rounded-2xl px-5 py-3 text-sm font-black text-white bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-400 hover:opacity-95 transition"
              >
                Anfrage senden
              </button>
            </form>
          </Card>

          {/* Contact / CTA */}
          <Card>
            <p className="text-sm font-black text-white">Schnellkontakt</p>

            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <p className="text-xs text-white/75">E-Mail</p>
                <p className="mt-1 text-sm font-bold text-white">{brand.email}</p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <p className="text-xs text-white/75">Telefon</p>
                <p className="mt-1 text-sm font-bold text-white">{brand.phone}</p>
              </div>

              <a
                href={brand.whatsapp}
                className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-black hover:opacity-90 transition text-center"
              >
                WhatsApp öffnen
              </a>

              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <p className="text-xs text-white/75">Ablauf</p>
                <p className="mt-2 text-sm text-white/85 leading-6">
                  1) Anfrage senden • 2) Menü & Paket abstimmen • 3) Setup vor Ort • 4) Service & Wow-Momente.
                </p>
              </div>

              <Link href="/pakete" className="text-sm font-bold underline decoration-white/25 hover:decoration-white/60">
                Pakete & Preise ansehen →
              </Link>
            </div>
          </Card>
        </div>
      </Container>
    </main>
  );
}

export default function KontaktPage() {
  return (
    <Suspense fallback={<div className="py-14 sm:py-16 text-white/70 text-center">Lade Kontaktformular…</div>}>
      <KontaktInner />
    </Suspense>
  );
}
