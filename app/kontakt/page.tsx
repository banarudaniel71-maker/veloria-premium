// file: app/kontakt/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

const brand = {
  phone: "+49 000 000000",
  email: "kontakt@veloria-cocktails.de",
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

export default function KontaktPage() {
  const searchParams = useSearchParams();

  const guests = searchParams.get("guests");
  const hours = searchParams.get("hours");
  const distanceKm = searchParams.get("distanceKm");
  const dateType = searchParams.get("dateType");
  const addons = searchParams.get("addons");
  const recommended = searchParams.get("recommended");
  const price = searchParams.get("price");

  const hasPrefill = Boolean(guests || hours || addons || price);

  const prefilledMessage = hasPrefill
    ? `📊 Anfrage über Experience Builder

Empfohlenes Paket: ${recommended ?? "-"}
Geschätzter Preis: ${price ? `${price} €` : "-"}

Gäste: ${guests ?? "-"}
Dauer: ${hours ? `${hours} Stunden` : "-"}
Entfernung: ${distanceKm ? `${distanceKm} km` : "-"}
Tag: ${dateType ?? "-"}
Add-ons: ${addons ? addons.replaceAll(",", ", ") : "-"}

Bitte Termin prüfen und Details bestätigen.`
    : "";

  return (
    <main className="py-14 sm:py-16">
      <Container>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <p className="text-xs font-black tracking-[0.25em] text-white/70">KONTAKT</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-white">Angebot anfragen</h1>
          <p className="mt-4 text-sm sm:text-base text-white/85 leading-7 max-w-2xl">
            Schreib uns Datum, Gästezahl und Location – wir senden dir ein klares Angebot inkl. Menü-Vorschlag.
          </p>

          {hasPrefill ? (
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-xs font-black text-black">
              ✅ Details aus dem Experience Builder übernommen
            </div>
          ) : null}
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
                    defaultValue={guests ? Number(guests) : undefined}
                    className="h-11 rounded-2xl border border-white/15 bg-black/25 px-4 text-sm outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="z. B. 60"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-xs text-white/80">Location / Wünsche</label>
                <textarea
                  rows={6}
                  defaultValue={prefilledMessage}
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

              {!hasPrefill ? (
                <Link
                  href="/experience-builder"
                  className="text-sm font-bold underline decoration-white/25 hover:decoration-white/60"
                >
                  Lieber Preis sofort sehen? → Experience Builder öffnen
                </Link>
              ) : null}
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
