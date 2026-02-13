"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Check,
  MapPin,
  Clock,
  Users,
  CalendarDays,
  BadgeCheck,
} from "lucide-react";

import {
  formatEUR,
  getAddonMeta,
  quoteAllVariants,
  type AddonKey,
  type DateType,
} from "../lib/pricing"; // ✅ corect pentru structura ta: app/lib/pricing.ts

const wrap: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
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

function Pill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/90 backdrop-blur">
      <span className="text-white/90">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function Progress({ step }: { step: number }) {
  const pct = ((step - 1) / 5) * 100;
  return (
    <div className="mt-6 h-2 rounded-full bg-white/10 overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-400 transition-all"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function StepTitle({ step, title, sub }: { step: number; title: string; sub?: string }) {
  return (
    <div>
      <div className="text-xs font-black tracking-[0.25em] text-white/70">STEP {step}/6</div>
      <div className="mt-2 text-2xl sm:text-3xl font-semibold text-white">{title}</div>
      {sub ? <div className="mt-2 text-sm text-white/80 leading-6">{sub}</div> : null}
    </div>
  );
}

export default function ExperienceBuilderPage() {
  const [step, setStep] = useState(1);

  const [guests, setGuests] = useState(60);
  const [hours, setHours] = useState(6);
  const [dateType, setDateType] = useState<DateType>("sat");
  const [distanceKm, setDistanceKm] = useState(20);
  const [addons, setAddons] = useState<AddonKey[]>(["ledBar"]);

  const addonMeta = useMemo(() => getAddonMeta(), []);

  const quotes = useMemo(() => {
    return quoteAllVariants({ guests, hours, addons, dateType, distanceKm });
  }, [guests, hours, addons, dateType, distanceKm]);

  const recommended = quotes.recommended;

  const recommendedPrice =
    recommended === "classic"
      ? quotes.classic.total
      : recommended === "premium"
      ? quotes.premium.total
      : quotes.luxury.total;

  const next = () => setStep((s) => Math.min(6, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const toggleAddon = (k: AddonKey) => {
    setAddons((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));
  };

  const prefillLink = {
    pathname: "/kontakt",
    query: {
      guests: String(guests),
      hours: String(hours),
      distanceKm: String(distanceKm),
      dateType: String(dateType),
      addons: addons.join(","),
      recommended: String(recommended),
      price: String(recommendedPrice),
    },
  } as const;

  return (
    <main className="py-14 sm:py-16 text-white">
      <Container>
        <motion.div variants={wrap} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            <Pill icon={<Sparkles size={14} />} text="Experience Builder" />
            <Pill icon={<BadgeCheck size={14} />} text="Preis in 60 Sekunden" />
            <Pill icon={<Clock size={14} />} text="Antwort in 24h" />
          </motion.div>

          <motion.h1 variants={fadeUp} className="mt-5 text-3xl sm:text-5xl font-extrabold tracking-tight">
            Premium Preis-Kalkulation{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
              in Sekunden.
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-sm sm:text-base text-white/85 leading-7">
            Du wählst Gästezahl, Dauer, Add-ons & Entfernung — wir zeigen dir sofort 3 Optionen. Danach übernehmen wir
            alles in das Kontaktformular (vor-ausgefüllt).
          </motion.p>

          <motion.div variants={fadeUp}>
            <Progress step={step} />
          </motion.div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            {/* LEFT */}
            <Card>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="s1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <StepTitle step={1} title="Gästezahl" sub="Flow & Setup hängen stark von der Gästezahl ab." />

                    <div className="mt-8 rounded-3xl border border-white/15 bg-black/20 p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white/85">
                          <Users size={18} /> Gäste
                        </div>
                        <div className="text-2xl font-extrabold tabular-nums">{guests}</div>
                      </div>

                      <input
                        type="range"
                        min={30}
                        max={200}
                        step={5}
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                        className="mt-4 w-full accent-pink-500"
                      />

                      <div className="mt-3 flex justify-between text-xs text-white/60">
                        <span>30</span>
                        <span>200</span>
                      </div>

                      <div className="mt-5 grid gap-3 sm:grid-cols-3">
                        {[50, 80, 120].map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setGuests(n)}
                            className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-black hover:bg-white/12 transition"
                          >
                            {n} Gäste
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="s2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <StepTitle step={2} title="Dauer" sub="Je länger, desto mehr Service & Material." />

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {[4, 6, 8].map((h) => (
                        <button
                          key={h}
                          type="button"
                          onClick={() => setHours(h)}
                          className={[
                            "rounded-3xl border p-5 text-left transition backdrop-blur",
                            hours === h ? "border-white/30 bg-white/15" : "border-white/15 bg-white/10 hover:bg-white/12",
                          ].join(" ")}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 font-black">
                              <Clock size={18} /> {h} Stunden
                            </div>
                            {hours === h ? (
                              <div className="grid h-9 w-9 place-items-center rounded-2xl bg-emerald-400 text-black">
                                <Check size={18} />
                              </div>
                            ) : null}
                          </div>

                          <div className="mt-2 text-sm text-white/75">
                            {h === 4 ? "Kurz & crisp." : h === 6 ? "Sweet spot." : "Full experience."}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="s3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <StepTitle step={3} title="Datum (Wochentag)" sub="Wochenenden sind teurer (Aufschlag)." />

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {[
                        { v: "weekday" as const, label: "Mo–Do" },
                        { v: "friSun" as const, label: "Fr/So" },
                        { v: "sat" as const, label: "Sa" },
                      ].map((x) => (
                        <button
                          key={x.v}
                          type="button"
                          onClick={() => setDateType(x.v)}
                          className={[
                            "rounded-3xl border p-5 text-left transition backdrop-blur",
                            dateType === x.v
                              ? "border-white/30 bg-white/15"
                              : "border-white/15 bg-white/10 hover:bg-white/12",
                          ].join(" ")}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 font-black">
                              <CalendarDays size={18} /> {x.label}
                            </div>
                            {dateType === x.v ? (
                              <div className="grid h-9 w-9 place-items-center rounded-2xl bg-emerald-400 text-black">
                                <Check size={18} />
                              </div>
                            ) : null}
                          </div>

                          <div className="mt-2 text-sm text-white/75">
                            {x.v === "weekday" ? "0% Aufschlag" : x.v === "friSun" ? "+5% Aufschlag" : "+10% Aufschlag"}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="s4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <StepTitle step={4} title="Entfernung" sub="Die ersten 20 km sind inklusive." />

                    <div className="mt-8 rounded-3xl border border-white/15 bg-black/20 p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white/85">
                          <MapPin size={18} /> Entfernung (km)
                        </div>
                        <div className="text-2xl font-extrabold tabular-nums">{distanceKm}</div>
                      </div>

                      <input
                        type="range"
                        min={0}
                        max={120}
                        step={5}
                        value={distanceKm}
                        onChange={(e) => setDistanceKm(parseInt(e.target.value, 10))}
                        className="mt-4 w-full accent-pink-500"
                      />

                      <div className="mt-3 flex justify-between text-xs text-white/60">
                        <span>0</span>
                        <span>120</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div
                    key="s5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <StepTitle step={5} title="Add-ons" sub="Hier entsteht der Wow-Faktor." />

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {Object.entries(addonMeta).map(([key, val]) => {
                        const k = key as AddonKey;
                        const active = addons.includes(k);
                        return (
                          <button
                            key={k}
                            type="button"
                            onClick={() => toggleAddon(k)}
                            className={[
                              "rounded-3xl border p-5 text-left transition backdrop-blur",
                              active ? "border-white/30 bg-white/15" : "border-white/15 bg-white/10 hover:bg-white/12",
                            ].join(" ")}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="font-black text-white">{val.label}</div>
                              <div className="text-sm font-black text-white">{formatEUR(val.price)}</div>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                              <div className="text-xs text-white/60">Add-on</div>
                              {active ? (
                                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-3 py-1 text-xs font-black text-black">
                                  <Check size={14} /> Aktiv
                                </div>
                              ) : (
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-black text-white/90">
                                  + Hinzufügen
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {step === 6 && (
                  <motion.div
                    key="s6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <StepTitle step={6} title="Ergebnis" sub="3 Optionen + Empfehlung — transparent." />

                    <div className="mt-6 grid gap-4 lg:grid-cols-3">
                      <QuoteCard title="Classic" data={quotes.classic} highlight={recommended === "classic"} />
                      <QuoteCard title="Premium" data={quotes.premium} highlight={recommended === "premium"} />
                      <QuoteCard title="Luxury" data={quotes.luxury} highlight={recommended === "luxury"} />
                    </div>

                    <div className="mt-6 rounded-3xl border border-white/15 bg-black/20 p-6">
                      <div className="text-sm font-black text-white">Weiter</div>
                      <div className="mt-2 text-sm text-white/80 leading-6">
                        Klick auf „Anfrage senden“ — wir übernehmen alles ins Kontaktformular (vor-ausgefüllt).
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <Link
                          href={prefillLink}
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-400 px-6 py-3 text-sm font-black text-white hover:opacity-95 transition"
                        >
                          Anfrage senden <ArrowRight size={18} />
                        </Link>

                        <Link
                          href="/pakete"
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-black backdrop-blur hover:bg-white/15 transition"
                        >
                          Pakete ansehen
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* NAV */}
              <div className="mt-8 flex items-center justify-between">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 1}
                  className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-black text-white/90 disabled:opacity-40 hover:bg-white/15 transition"
                >
                  Zurück
                </button>

                {step < 6 ? (
                  <button
                    type="button"
                    onClick={next}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-400 px-6 py-3 text-sm font-black text-white hover:opacity-95 transition"
                  >
                    Weiter <ArrowRight size={18} />
                  </button>
                ) : (
                  <Link
                    href={prefillLink}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-400 px-6 py-3 text-sm font-black text-white hover:opacity-95 transition"
                  >
                    Anfrage abschicken <ArrowRight size={18} />
                  </Link>
                )}
              </div>
            </Card>

            {/* RIGHT */}
            <div className="lg:sticky lg:top-24 h-fit">
              <Card>
                <div className="text-sm font-black text-white">Live Summary</div>
                <div className="mt-2 text-sm text-white/80 leading-6">
                  Gäste: <span className="font-black text-white">{guests}</span> • Dauer:{" "}
                  <span className="font-black text-white">{hours}h</span> • Entfernung:{" "}
                  <span className="font-black text-white">{distanceKm}km</span>
                </div>

                <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="text-xs text-white/60">Empfehlung</div>
                  <div className="mt-1 text-lg font-extrabold">
                    {recommended === "classic" ? "Classic" : recommended === "premium" ? "Premium" : "Luxury"}
                  </div>
                  <div className="mt-2 text-sm text-white/80">
                    Geschätzter Preis: <span className="font-black text-white">{formatEUR(recommendedPrice)}</span>
                  </div>
                </div>

                <div className="mt-6 text-xs text-white/60">
                  * Preise sind Richtwerte. Finale Bestätigung nach kurzer Abstimmung (Location & Details).
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </Container>
    </main>
  );
}

function QuoteCard({
  title,
  data,
  highlight,
}: {
  title: string;
  data: { total: number; deposit: number; lines: { label: string; amount: number; meta?: string }[] };
  highlight: boolean;
}) {
  return (
    <div
      className={[
        "rounded-3xl border p-6 backdrop-blur transition",
        highlight ? "border-white/35 bg-white/15" : "border-white/15 bg-white/10",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-black text-white">{title}</div>
          <div className="mt-2 text-3xl font-extrabold tracking-tight">{formatEUR(data.total)}</div>
          <div className="mt-2 text-xs text-white/65">Anzahlung: {formatEUR(data.deposit)}</div>
        </div>

        {highlight ? (
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-3 py-1 text-xs font-black text-black">
            <Sparkles size={14} /> Empfohlen
          </div>
        ) : null}
      </div>

      <div className="mt-5 grid gap-2">
        {data.lines.slice(0, 6).map((l, idx) => (
          <div key={idx} className="flex items-start justify-between gap-3 text-sm text-white/85">
            <div className="min-w-0">
              <div className="font-semibold">{l.label}</div>
              {l.meta ? <div className="text-xs text-white/55">{l.meta}</div> : null}
            </div>
            <div className="font-black tabular-nums">{formatEUR(l.amount)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
