"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { generateProposalPdf } from "@/app/lib/generateProposalPdf";

type Item = { id: string; name: string; note?: string; tags?: string[] };
type ShotFlavor = { id: string; name: string; note?: string };
type ShotPack = {
  id: string;
  title: string;
  meta: string;
  tag?: string;
  picks: number;
};

type DrinkBuilderProps = {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  eventType?: string;
  eventDate?: string;
  location?: string;
  guests?: number;
};

const COCKTAILS: Item[] = [
  { id: "pornstar-martini", name: "Pornstar Martini", tags: ["Vanille", "Passionsfrucht", "Vodka"], note: "Edel, modern, absoluter Crowd-Pleaser." },
  { id: "espresso-martini", name: "Espresso Martini", tags: ["Espresso", "Vodka", "Coffee"], note: "Intensiv & stilvoll – perfekt nach dem Essen." },
  { id: "spicy-margarita", name: "Spicy Margarita", tags: ["Tequila", "Limette", "Chili"], note: "Frisch & leicht scharf – moderner Margarita-Moment." },
  { id: "whiskey-sour", name: "Whiskey Sour (Veloria Foam)", tags: ["Bourbon", "Zitrone", "Schaum"], note: "Klassiker mit feinem Schaum – smooth & perfekt." },
  { id: "basil-smash", name: "Basil Smash", tags: ["Gin", "Basilikum", "Zitrone"], note: "Frisch, grün, modern – wirkt sofort premium." },
  { id: "paloma", name: "Paloma", tags: ["Tequila", "Grapefruit", "Soda"], note: "Leicht, spritzig, elegant – perfekt für Sommer & Events." },

  { id: "moscow-mule", name: "Moscow Mule", tags: ["Vodka", "Limette", "Ginger Beer"], note: "Super erfrischend – ein weltweit geliebter Klassiker." },
  { id: "gin-tonic", name: "Gin Tonic (Classic)", tags: ["Gin", "Tonic", "Citrus"], note: "Klar, edel, immer richtig – optional Citrus/Floral Style." },
  { id: "old-fashioned", name: "Old Fashioned", tags: ["Bourbon", "Bitters", "Orange"], note: "Minimalistisch & luxuriös – Business-Event Klassiker." },
  { id: "cosmopolitan", name: "Cosmopolitan", tags: ["Vodka", "Cranberry", "Limette"], note: "Frisch & classy – perfekt für elegante Abende." },

  { id: "negroni", name: "Negroni", tags: ["Gin", "Bitter", "Vermouth"], note: "Für Liebhaber – bitter, aromatisch, sehr erwachsen." },
  { id: "cuba-libre", name: "Cuba Libre", tags: ["Rum", "Cola", "Limette"], note: "Zeitlos, unkompliziert und immer beliebt auf Events." },

  { id: "aperol-spritz", name: "Aperol Spritz", tags: ["Aperol", "Prosecco", "Soda"], note: "Der Klassiker für Hochzeiten & Sommer – leicht & spritzig." },
  { id: "hugo-spritz", name: "Hugo Spritz", tags: ["Holunder", "Prosecco", "Minze"], note: "Floral & leicht – perfekt als Welcome Drink." },
  { id: "mojito-royal", name: "Mojito Royal", tags: ["Rum", "Minze", "Prosecco"], note: "Erfrischend mit Glamour – Mojito-Vibe mit Premium-Twist." },

  { id: "sex-on-the-beach", name: "Sex on the Beach", tags: ["Orange", "Cranberry", "Pfirsich"], note: "Fruchtig, leicht süß, party-ready – super beliebt." },
  { id: "mai-tai", name: "Mai Tai", tags: ["Rum", "Limette", "Orgeat"], note: "Tiki-Klassiker – kräftig, tropisch, aromatisch." },
  { id: "pina-colada", name: "Piña Colada", tags: ["Kokos", "Ananas", "Creamy"], note: "Cremig, tropisch – Urlaub im Glas." },
  { id: "tequila-sunrise", name: "Tequila Sunrise", tags: ["Tequila", "Orange", "Grenadine"], note: "Sonnenuntergang-Optik – super fotogen und beliebt." },
];

const MOCKTAILS: Item[] = [
  { id: "passion-sunrise-00", name: "Passion Sunrise 0.0", tags: ["Passionsfrucht", "Orange", "Grenadine"], note: "Tropical sunrise vibes – fruchtig & erfrischend." },
  { id: "nojito-00", name: "Nojito 0.0", tags: ["Minze", "Limette", "Soda"], note: "Erfrischend wie ein Mojito – ohne Alkohol." },
  { id: "ginger-mule-00", name: "Ginger Mule 0.0", tags: ["Limette", "Ginger Beer", "Cucumber"], note: "Würzig-frisch – perfekt für Gäste, die es clean mögen." },
  { id: "tropical-colada-00", name: "Tropical Colada 0.0", tags: ["Ananas", "Kokos", "Limette"], note: "Tropisch & cremig – Sommerhit ohne Alkohol." },
];

const SHOT_FLAVORS: ShotFlavor[] = [
  { id: "mini-espresso-martini-shot", name: "Mini Espresso Martini Shot", note: "Party-Lux • Coffee Kick" },
  { id: "spicy-tequila-shot", name: "Spicy Tequila Shot", note: "Chili • Limette • Bold" },
  { id: "red-mexican-shot", name: "Red Mexican Shot", note: "Sweet • Spicy • Show Moment" },
];

const SHOT_PACKS: ShotPack[] = [
  { id: "shots-50", title: "Party Starter", meta: "50 Shots • 2 Sorten • LED Tray", tag: "Ideal 30–40 Gäste", picks: 2 },
  { id: "shots-100", title: "Veloria Premium", meta: "100 Shots • 3 Sorten • 1 Show-Element", tag: "Bestseller", picks: 3 },
  { id: "shots-150", title: "Ultimate Night", meta: "150+ Shots • Mix • Show + LED", tag: "Maximaler Effekt", picks: 3 },
];

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function formatPrice(price?: number) {
  if (typeof price !== "number") return "Auf Anfrage";
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

function Chip({
  active,
  disabled,
  children,
  onClick,
}: {
  active: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full border px-3 py-1 text-xs transition ${
        disabled
          ? "cursor-not-allowed border-white/10 bg-white/5 text-white/30"
          : active
          ? "border-white/35 bg-white/12 text-white"
          : "border-white/12 bg-black/10 text-white/75 hover:bg-black/20"
      }`}
    >
      {children}
    </button>
  );
}

function SelectedList({
  items,
  value,
}: {
  items: Item[];
  value: string[];
}) {
  return (
    <div className="mt-5 rounded-2xl border border-white/10 bg-black/15 p-4">
      <div className="text-xs text-white/65">Deine Auswahl</div>

      <div className="mt-2 space-y-2">
        <AnimatePresence initial={false}>
          {value.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="text-sm text-white/60"
            >
              Noch nichts ausgewählt.
            </motion.div>
          ) : (
            value.map((id) => {
              const it = items.find((x) => x.id === id);
              if (!it) return null;

              return (
                <motion.div
                  key={id}
                  layout
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                  className="flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-white">{it.name}</div>
                    {it.tags?.length ? (
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {it.tags.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/65"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <span className="text-xs text-white/50">Selected</span>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SectionCard({
  label,
  title,
  limit,
  items,
  value,
  setValue,
}: {
  label: string;
  title: string;
  limit: number;
  items: Item[];
  value: string[];
  setValue: (next: string[]) => void;
}) {
  const remaining = limit - value.length;

  return (
    <div className="rounded-3xl border border-white/12 bg-gradient-to-b from-white/12 to-white/5 p-6 shadow-2xl backdrop-blur-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs text-white/65">{label}</div>
          <div className="mt-1 text-xl font-semibold text-white">{title}</div>
          <div className="mt-2 text-sm text-white/70">
            Wählt <span className="font-semibold text-white">{limit}</span> aus.{" "}
            <span className="text-white/60">(noch {remaining} übrig)</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/70">
          {value.length}/{limit}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {items.map((it) => {
          const active = value.includes(it.id);
          const disabled = !active && value.length >= limit;

          return (
            <Chip
              key={it.id}
              active={active}
              disabled={disabled}
              onClick={() => {
                if (active) {
                  setValue(value.filter((x) => x !== it.id));
                  return;
                }
                if (value.length >= limit) return;
                setValue([...value, it.id]);
              }}
            >
              {it.name}
            </Chip>
          );
        })}
      </div>

      <SelectedList items={items} value={value} />
    </div>
  );
}

export default function DrinkBuilder({
  customerName,
  customerEmail,
  customerPhone,
  eventType,
  eventDate,
  location,
  guests = 80,
}: DrinkBuilderProps) {
  const [cocktails, setCocktails] = useState<string[]>([]);
  const [mocktails, setMocktails] = useState<string[]>([]);
  const [shotPack, setShotPack] = useState<string>("");
  const [shotFlavors, setShotFlavors] = useState<string[]>([]);

  const pack = useMemo(
    () => SHOT_PACKS.find((p) => p.id === shotPack) ?? null,
    [shotPack]
  );

  const picksRequired = pack?.picks ?? 0;

  function selectPack(id: string) {
    setShotPack(id);
    setShotFlavors([]);
  }

  const ready =
    cocktails.length === 6 &&
    mocktails.length === 3 &&
    !!pack &&
    shotFlavors.length === picksRequired;

  const completion = useMemo(() => {
    const total = 10 + (picksRequired || 0);
    const done =
      cocktails.length +
      mocktails.length +
      (pack ? 1 : 0) +
      shotFlavors.length;

    return clamp01(total > 0 ? done / total : 0);
  }, [cocktails.length, mocktails.length, pack, shotFlavors.length, picksRequired]);

  const selectedCocktailNames = useMemo(
    () =>
      cocktails
        .map((id) => COCKTAILS.find((x) => x.id === id)?.name)
        .filter(Boolean) as string[],
    [cocktails]
  );

  const selectedMocktailNames = useMemo(
    () =>
      mocktails
        .map((id) => MOCKTAILS.find((x) => x.id === id)?.name)
        .filter(Boolean) as string[],
    [mocktails]
  );

  const selectedShotFlavorNames = useMemo(
    () =>
      shotFlavors
        .map((id) => SHOT_FLAVORS.find((x) => x.id === id)?.name)
        .filter(Boolean) as string[],
    [shotFlavors]
  );

  const estimatedPrice = useMemo(() => {
    if (!pack) return undefined;

    const shotPackPrices: Record<string, number> = {
      "shots-50": 990,
      "shots-100": 1290,
      "shots-150": 1590,
    };

    const premiumCocktailIds = [
      "pornstar-martini",
      "espresso-martini",
      "spicy-margarita",
      "old-fashioned",
      "mai-tai",
      "pina-colada",
    ];

    const premiumCount = cocktails.filter((id) =>
      premiumCocktailIds.includes(id)
    ).length;

    const premiumExtra = premiumCount * 15;
    const guestExtra = guests > 80 ? Math.round((guests - 80) * 4) : 0;

    const eventExtra =
      eventType === "Hochzeit"
        ? 180
        : eventType === "Corporate Event"
        ? 120
        : 0;

    return (shotPackPrices[shotPack] ?? 1190) + premiumExtra + guestExtra + eventExtra;
  }, [pack, shotPack, cocktails, guests, eventType]);

  const summaryText = useMemo(() => {
    const c = selectedCocktailNames.join(", ");
    const m = selectedMocktailNames.join(", ");
    const s = pack?.title ?? "-";
    const sf = selectedShotFlavorNames.join(", ");
    const priceLine =
      estimatedPrice !== undefined
        ? `Geschätztes Angebot: ${formatPrice(estimatedPrice)}`
        : "Geschätztes Angebot: Auf Anfrage";

    return `Name: ${customerName || "-"}\nE-Mail: ${customerEmail || "-"}\nTelefon: ${customerPhone || "-"}\nEventtyp: ${eventType || "-"}\nEventdatum: ${eventDate || "-"}\nLocation: ${location || "-"}\nGäste: ${guests || "-"}\n\nCocktails (6): ${c || "-"}\nMocktails (3): ${m || "-"}\nShot Paket: ${s}\nShot Sorten (${picksRequired || 0}): ${sf || "-"}\n${priceLine}`;
  }, [
    customerName,
    customerEmail,
    customerPhone,
    eventType,
    eventDate,
    location,
    guests,
    selectedCocktailNames,
    selectedMocktailNames,
    pack,
    selectedShotFlavorNames,
    picksRequired,
    estimatedPrice,
  ]);

  const kontaktHref = useMemo(() => {
    const payload = encodeURIComponent(summaryText);
    return `/kontakt?auswahl=${payload}`;
  }, [summaryText]);

  return (
    <div className="relative">
      <div className="mb-6 rounded-3xl border border-white/12 bg-white/5 p-5 backdrop-blur-md">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-white">Signature Auswahl</div>
            <div className="mt-1 text-xs text-white/65">
              {ready
                ? "Auswahl komplett. Jetzt PDF herunterladen oder Anfrage senden."
                : "Wähle 6 Cocktails, 3 Mocktails, 1 Shot Paket und die Shot Sorten."}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/70">
            {Math.round(completion * 100)}%
          </div>
        </div>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400"
            initial={false}
            animate={{ width: `${Math.round(completion * 100)}%` }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard
          label="Cocktails"
          title="Wähle 6 Cocktails"
          limit={6}
          items={COCKTAILS}
          value={cocktails}
          setValue={setCocktails}
        />

        <SectionCard
          label="Mocktails 0.0%"
          title="Wähle 3 Mocktails"
          limit={3}
          items={MOCKTAILS}
          value={mocktails}
          setValue={setMocktails}
        />

        <div className="rounded-3xl border border-white/12 bg-gradient-to-b from-white/12 to-white/5 p-6 shadow-2xl backdrop-blur-md">
          <div className="text-xs text-white/65">Shot Paket</div>
          <div className="mt-1 text-xl font-semibold text-white">Wähle 1 Paket</div>
          <p className="mt-2 text-sm text-white/70">
            Für den großen Party-Moment: schnell serviert, maximaler Effekt.
          </p>

          <div className="mt-5 space-y-3">
            {SHOT_PACKS.map((p) => {
              const active = shotPack === p.id;

              return (
                <motion.button
                  key={p.id}
                  type="button"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => selectPack(p.id)}
                  className={`w-full rounded-3xl border p-5 text-left transition ${
                    active
                      ? "border-white/35 bg-white/10"
                      : "border-white/12 bg-black/10 hover:bg-black/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="text-base font-semibold text-white">{p.title}</div>
                        {p.tag ? (
                          <span className="rounded-full border border-white/12 bg-black/20 px-2 py-0.5 text-[11px] text-white/70">
                            {p.tag}
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-1 text-sm text-white/70">{p.meta}</div>
                    </div>

                    <div className="text-xs text-white/55">
                      {active ? "Selected" : "Pick"}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence initial={false}>
            {pack ? (
              <motion.div
                key="shot-sorten"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="mt-6"
              >
                <div className="text-sm font-semibold text-white">
                  Shot Sorten auswählen
                </div>
                <div className="mt-1 text-xs text-white/65">
                  Wähle{" "}
                  <span className="font-semibold text-white">{picksRequired}</span>{" "}
                  Sorten aus.
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {SHOT_FLAVORS.map((sf) => {
                    const active = shotFlavors.includes(sf.id);
                    const disabled = !active && shotFlavors.length >= picksRequired;

                    return (
                      <Chip
                        key={sf.id}
                        active={active}
                        disabled={disabled}
                        onClick={() => {
                          if (active) {
                            setShotFlavors(
                              shotFlavors.filter((x) => x !== sf.id)
                            );
                            return;
                          }

                          if (shotFlavors.length >= picksRequired) return;
                          setShotFlavors([...shotFlavors, sf.id]);
                        }}
                      >
                        {sf.name}
                      </Chip>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-black/15 p-4">
                  <div className="text-xs text-white/65">Deine Shot Auswahl</div>
                  <div className="mt-2 space-y-2">
                    {shotFlavors.length === 0 ? (
                      <div className="text-sm text-white/60">
                        Noch nichts ausgewählt.
                      </div>
                    ) : (
                      shotFlavors.map((id) => {
                        const it = SHOT_FLAVORS.find((x) => x.id === id);
                        if (!it) return null;

                        return (
                          <div
                            key={id}
                            className="flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                          >
                            <div>
                              <div className="text-sm font-medium text-white">
                                {it.name}
                              </div>
                              {it.note ? (
                                <div className="text-xs text-white/60">{it.note}</div>
                              ) : null}
                            </div>
                            <span className="text-xs text-white/50">Selected</span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/15 p-4 text-xs text-white/65">
            Wenn ihr unsicher seid, empfehlen wir euch die beste Kombination passend zu Event, Gästen und Ablauf.
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-3xl border border-white/12 bg-white/5 p-6 backdrop-blur-md">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-white">Zusammenfassung & Angebot</div>
            <div className="mt-1 text-xs text-white/65">
              Eure Auswahl, Eventdaten und der Richtpreis werden direkt im PDF übernommen.
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                setCocktails([]);
                setMocktails([]);
                setShotPack("");
                setShotFlavors([]);
              }}
              className="rounded-2xl border border-white/15 bg-black/10 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-black/20"
            >
              Reset
            </button>

            <button
              type="button"
              onClick={() =>
                generateProposalPdf({
                  customerName,
                  customerEmail,
                  customerPhone,
                  eventType,
                  eventDate,
                  location,
                  guests,
                  packageName: pack?.title,
                  extras: [
                    ...selectedCocktailNames.map((name) => `Cocktail: ${name}`),
                    ...selectedMocktailNames.map((name) => `Mocktail: ${name}`),
                    ...selectedShotFlavorNames.map((name) => `Shot Sorte: ${name}`),
                  ],
                  estimatedPrice,
                })
              }
              disabled={!pack}
              className={`inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                pack
                  ? "border border-white/15 bg-white/5 text-white backdrop-blur hover:bg-white/10"
                  : "cursor-not-allowed border border-white/10 bg-white/5 text-white/35"
              }`}
            >
              PDF-Angebot herunterladen
            </button>

            <Link
              href={ready ? kontaktHref : "#"}
              onClick={(e) => {
                if (!ready) e.preventDefault();
              }}
              className={`inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                ready
                  ? "bg-white text-black"
                  : "cursor-not-allowed bg-white/20 text-white/60"
              }`}
            >
              Auswahl anfragen
            </Link>
          </div>
        </div>

        <div className="mt-6 rounded-[28px] border border-white/10 bg-black/20 p-5">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">
            Geschätztes Angebot
          </div>
          <div className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
            {formatPrice(estimatedPrice)}
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">
            Unverbindlicher Richtpreis auf Basis eurer Eventdaten und aktuellen Auswahl.
            Das finale Angebot wird individuell nach Ablauf, Location und Extras erstellt.
          </p>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
          <pre className="whitespace-pre-wrap text-xs text-white/80">
            {summaryText}
          </pre>
        </div>
      </div>
    </div>
  );
}