"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type Category = "signature" | "klassiker" | "spritz" | "tropical" | "mocktails" | "shots";

/** ✅ extins ca sa NU ai TS error la shoturile tale */
type DrinkBadge =
  | "Bestseller"
  | "0.0%"
  | "Spicy"
  | "Elegant"
  | "Strong"
  | "Fresh"
  | "Signature"
  | "Show-Effect"
  | "Party Classic"
  | "Premium"
  | "Event Special";

type Drink = {
  name: string;
  src?: string;
  tags: string[];
  desc: string;
  category: Category;
  badges?: DrinkBadge[];
};

type PriceMode = "fixed" | "from";

type ShotPackage = {
  title: string;
  price: string; // ex: "149€"
  priceMode: PriceMode; // fixed sau from (ab)
  desc: string;
  hint: string;
  img: string;
  features: string[];
  featured?: boolean;
};

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>;
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur">
      {children}
    </span>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-gradient-to-r from-pink-500/25 to-amber-400/20 px-3 py-1 text-[11px] font-black text-white ring-1 ring-white/15 backdrop-blur">
      {children}
    </span>
  );
}

function ChipButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full px-4 py-2 text-xs font-bold transition backdrop-blur",
        active
          ? "bg-white/15 text-white ring-1 ring-white/20"
          : "bg-white/5 text-white/80 ring-1 ring-white/10 hover:bg-white/10 hover:text-white",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function SectionTitle({ title, subtitle, id }: { title: string; subtitle: string; id: string }) {
  return (
    <div id={id} className="scroll-mt-28">
      <p className="text-xs font-black tracking-[0.25em] text-white/60">MENÜ</p>
      <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/80 leading-7">{subtitle}</p>
    </div>
  );
}

/** ✅ Premium 3D Tilt + Shine */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [shineStyle, setShineStyle] = useState<React.CSSProperties>({});
  const [active, setActive] = useState(false);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;

    const rotY = (px - 0.5) * 10;
    const rotX = -(py - 0.5) * 8;

    setTiltStyle({
      transform: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`,
      transition: "transform 90ms ease",
    });

    setShineStyle({
      background: `radial-gradient(650px circle at ${x}px ${y}px, rgba(255,255,255,0.16), transparent 45%)`,
      opacity: 1,
      transition: "opacity 150ms ease",
    });
  }

  function onLeave() {
    setActive(false);
    setTiltStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg)",
      transition: "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
    });
    setShineStyle({
      opacity: 0,
      transition: "opacity 350ms ease",
    });
  }

  function onEnter() {
    setActive(true);
    setTiltStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg)",
      transition: "transform 120ms ease",
    });
    setShineStyle({ opacity: 1 });
  }

  return (
    <div
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={["relative will-change-transform rounded-3xl", className].join(" ")}
      style={tiltStyle}
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl" style={shineStyle} />
      <div
        className={[
          "pointer-events-none absolute inset-0 rounded-3xl ring-1 transition",
          active ? "ring-white/25" : "ring-white/10",
        ].join(" ")}
      />
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-white/5 blur-2xl opacity-35" />
      {children}
    </div>
  );
}

/** ✅ Image fix: cocktail full (contain) + blurred background (luxury look) */
function DrinkImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/15">
      <Image
        src={src}
        alt=""
        fill
        className="object-cover scale-125 blur-2xl opacity-45"
        sizes="(max-width: 768px) 100vw, 25vw"
        priority={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.22),transparent_45%),radial-gradient(circle_at_80%_15%,rgba(245,158,11,0.18),transparent_45%),radial-gradient(circle_at_40%_90%,rgba(16,185,129,0.12),transparent_55%)]" />
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain px-4 pt-6 pb-10 transition duration-500 group-hover:scale-[1.05] group-hover:-translate-y-1"
        sizes="(max-width: 768px) 100vw, 25vw"
        priority={false}
      />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[30rem] -translate-x-1/2 rounded-full bg-white/10 blur-3xl opacity-35" />
    </div>
  );
}

function hasBadge(d: Drink, b: DrinkBadge) {
  return (d.badges ?? []).includes(b);
}

export default function MenuPage() {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "lux">("grid");
  const [sort, setSort] = useState<"recommended" | "az">("recommended");

  const drinks: Drink[] = useMemo(
    () => [
      // SIGNATURE
      {
        name: "Pornstar Martini",
        src: "/images/pornstar-martini.jpg",
        category: "signature",
        tags: ["Vanille", "Passionsfrucht", "Vodka"],
        badges: ["Bestseller", "Elegant"],
        desc: "Edel, modern, absoluter Crowd-Pleaser – der Wow-Drink für Events.",
      },
      {
        name: "Espresso Martini",
        src: "/images/espresso-martini.jpg",
        category: "signature",
        tags: ["Espresso", "Vodka", "Coffee"],
        badges: ["Bestseller", "Strong"],
        desc: "Intensiv & stilvoll – perfekt nach dem Essen oder für den Night-Vibe.",
      },
      {
        name: "Basil Smash",
        src: "/images/basil-smash.jpg",
        category: "signature",
        tags: ["Gin", "Basilikum", "Zitrone"],
        badges: ["Fresh"],
        desc: "Frisch, grün, modern – wirkt sofort premium und ist super beliebt.",
      },
      {
        name: "Whiskey Sour (Veloria Foam)",
        src: "/images/whiskey-sour.jpg",
        category: "signature",
        tags: ["Bourbon", "Zitrone", "Schaum"],
        badges: ["Elegant"],
        desc: "Klassiker mit feinem Schaum – smooth, edel und perfekt ausbalanciert.",
      },
      {
        name: "Spicy Margarita",
        src: "/images/spicy-margarita.jpg",
        category: "signature",
        tags: ["Tequila", "Limette", "Chili"],
        badges: ["Spicy", "Bestseller"],
        desc: "Frisch & leicht scharf – ein moderner Margarita-Moment.",
      },
      {
        name: "Paloma",
        src: "/images/paloma.jpg",
        category: "signature",
        tags: ["Tequila", "Grapefruit", "Soda"],
        badges: ["Fresh"],
        desc: "Leicht, spritzig, elegant – perfekt für Sommer, Hochzeit, Corporate.",
      },

      // KLASSIKER
      {
        name: "Moscow Mule",
        src: "/images/moscow-mule.jpg",
        category: "klassiker",
        tags: ["Vodka", "Limette", "Ginger Beer"],
        badges: ["Bestseller"],
        desc: "Super erfrischend – einer der meistbestellten Klassiker weltweit.",
      },
      {
        name: "Gin Tonic (Classic)",
        src: "/images/gin-tonic.jpg",
        category: "klassiker",
        tags: ["Gin", "Tonic", "Citrus"],
        badges: ["Bestseller"],
        desc: "Klar, edel, immer richtig – optional als Citrus oder Floral Style.",
      },
      {
        name: "Cuba Libre",
        src: "/images/cuba-libre.jpg",
        category: "klassiker",
        tags: ["Rum", "Cola", "Limette"],
        desc: "Zeitlos, unkompliziert und immer beliebt auf Events.",
      },
      {
        name: "Cosmopolitan",
        src: "/images/cosmopolitan.jpg",
        category: "klassiker",
        tags: ["Vodka", "Cranberry", "Limette"],
        badges: ["Elegant"],
        desc: "Frisch & classy – perfekt für elegante Geburtstage & Hochzeiten.",
      },
      {
        name: "Negroni",
        src: "/images/negroni.jpg",
        category: "klassiker",
        tags: ["Gin", "Bitter", "Vermouth"],
        badges: ["Strong"],
        desc: "Für Liebhaber: bitter, aromatisch, sehr erwachsen – premium feel.",
      },
      {
        name: "Old Fashioned",
        src: "/images/old-fashioned.jpg",
        category: "klassiker",
        tags: ["Bourbon", "Bitters", "Orange"],
        badges: ["Strong", "Elegant"],
        desc: "Minimalistisch & luxuriös – der Business-Event-Klassiker.",
      },

      // SPRITZ
      {
        name: "Aperol Spritz",
        src: "/images/aperol-spritz.jpg",
        category: "spritz",
        tags: ["Aperol", "Prosecco", "Soda"],
        badges: ["Bestseller", "Fresh"],
        desc: "Der Klassiker für Hochzeiten & Sommer – leicht, spritzig, beliebt.",
      },
      {
        name: "Hugo Spritz",
        src: "/images/hugo-spritz.jpg",
        category: "spritz",
        tags: ["Holunder", "Prosecco", "Minze"],
        badges: ["Fresh"],
        desc: "Floral & leicht – perfekt als Welcome Drink auf Hochzeiten.",
      },
      {
        name: "Mojito Royal",
        src: "/images/mojito-royal.jpg",
        category: "spritz",
        tags: ["Rum", "Minze", "Prosecco"],
        badges: ["Fresh"],
        desc: "Erfrischend mit Glamour – Mojito-Vibe mit Premium-Twist.",
      },

      // TROPICAL
      {
        name: "Sex on the Beach",
        src: "/images/sex-on-the-beach.jpg",
        category: "tropical",
        tags: ["Orange", "Cranberry", "Pfirsich"],
        badges: ["Bestseller"],
        desc: "Fruchtig, leicht süß, Party-ready – einer der beliebtesten Drinks.",
      },
      {
        name: "Mai Tai",
        src: "/images/mai-tai.jpg",
        category: "tropical",
        tags: ["Rum", "Limette", "Orgeat"],
        badges: ["Strong"],
        desc: "Tiki-Klassiker – kräftig, tropisch, aromatisch.",
      },
      {
        name: "Piña Colada",
        src: "/images/pina-colada.jpg",
        category: "tropical",
        tags: ["Kokos", "Ananas", "Creamy"],
        desc: "Cremig, tropisch, Urlaub im Glas – perfekt für Sommerpartys.",
      },
      {
        name: "Tequila Sunrise",
        src: "/images/tequila-sunrise.jpg",
        category: "tropical",
        tags: ["Tequila", "Orange", "Grenadine"],
        desc: "Sonnenuntergang-Optik – super fotogen und beliebt.",
      },

      // MOCKTAILS
      {
        name: "Nojito 0.0",
        src: "/images/nojito.jpg",
        category: "mocktails",
        tags: ["Minze", "Limette", "Soda"],
        badges: ["0.0%", "Fresh"],
        desc: "Erfrischend wie ein Mojito – ohne Alkohol, aber mit Stil.",
      },
      {
        name: "Passion Sunrise 0.0",
        src: "/images/passion-sunrise.jpg",
        category: "mocktails",
        tags: ["Passionsfrucht", "Orange", "Grenadine"],
        badges: ["0.0%", "Bestseller"],
        desc: "Tropical sunrise vibes – fruchtig, erfrischend & perfekt für jedes Event.",
      },
      {
        name: "Ginger Mule 0.0",
        src: "/images/ginger-mule-0.jpg",
        category: "mocktails",
        tags: ["Limette", "Ginger Beer", "Cucumber"],
        badges: ["0.0%", "Fresh"],
        desc: "Würzig-frisch – perfekt für Gäste, die es clean mögen.",
      },
      {
        name: "Tropical Colada 0.0",
        src: "/images/tropical-colada-0.jpg",
        category: "mocktails",
        tags: ["Ananas", "Kokos", "Limette"],
        badges: ["0.0%"],
        desc: "Tropisch & cremig – der Sommerhit ohne Alkohol.",
      },

      // SHOTS (cu poze)
      {
        name: "Red Mexican",
        src: "/images/red-mexican.jpg",
        category: "shots",
        tags: ["Tomatensaft", "Fresh Lemon", "Rooster Rojo Blanco"],
        badges: ["Bestseller"],
        desc: "Mexikanischer Klassiker mit Kick – frische Säure trifft auf kräftigen Tequila.",
      },
      {
        name: "Tasty",
        src: "/images/tasty.jpg",
        category: "shots",
        tags: ["Giffard Kaffee", "Giffard Banane", "Irish Cream", "Milch"],
        badges: ["Bestseller"],
        desc: "Süßer Layer-Shot mit Dessert-Charakter – cremig, aromatisch & crowd-pleaser.",
      },
      {
        name: "Herosima",
        src: "/images/herosima.jpg",
        category: "shots",
        tags: ["Giffard Sambuca", "Irish Cream", "Absinth"],
        badges: ["Signature", "Show-Effect"],
        desc: "Party-Highlight mit Wow-Effekt – starke Aromen, cremige Textur & dramatischer Look.",
      },
      {
        name: "B-52",
        src: "/images/b-52.jpg",
        category: "shots",
        tags: ["Giffard Kaffee", "Irish Cream", "Triple Sec"],
        badges: ["Signature", "Party Classic"],
        desc: "Ikonischer Party-Shot mit klaren Schichten – kräftig, cremig & zeitlos.",
      },
      {
        name: "BMW",
        src: "/images/bmw-shot.jpg",
        category: "shots",
        tags: ["Irish Cream", "Giffard Cocogif", "Pogues Whisky"],
        badges: ["Premium", "Event Special"],
        desc: "Eleganter Show-Shot mit klaren Schichten – cremig, exotisch & mit starkem Whisky-Finale.",
      },
    ],
    []
  );

  // ✅ Shot packages (cu preț FIX la primele 2, "ab" doar la ultimul)
  const shotPackages: ShotPackage[] = useMemo(
    () => [
      {
        title: "Party Starter",
        price: "149€",
        priceMode: "fixed",
        desc: "50 Shots · 2 Sorten · LED Tray",
        hint: "Ideal für 30–40 Gäste",
        img: "/images/shot-party-starter.jpg",
        features: ["2 Sorten", "LED Tray", "Schneller Service"],
      },
      {
        title: "Veloria Premium",
        price: "249€",
        priceMode: "fixed",
        desc: "100 Shots · 3 Sorten · 1 Show-Element",
        hint: "Bestseller für Events",
        img: "/images/shot-veloria-premium.jpg",
        features: ["3 Sorten", "Show-Moment", "LED Setup"],
        featured: true,
      },
      {
        title: "Ultimate Night",
        price: "349€",
        priceMode: "from",
        desc: "150+ Shots · Mix · Show · LED + Musikmoment",
        hint: "Für große Partys",
        img: "/images/shot-ultimate-night.jpg",
        features: ["Mix & Show", "LED + Musikmoment", "Maximaler Effekt"],
      },
    ],
    []
  );

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = drinks;

    if (filter !== "all") arr = arr.filter((d) => d.category === filter);

    if (q.length > 0) {
      arr = arr.filter((d) => {
        const hay = [d.name, d.desc, ...d.tags, ...(d.badges ?? [])].join(" ").toLowerCase();
        return hay.includes(q);
      });
    }

    if (sort === "az") {
      arr = [...arr].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      arr = [...arr].sort((a, b) => {
        const score = (x: Drink) =>
          (hasBadge(x, "Bestseller") ? 50 : 0) +
          (hasBadge(x, "Elegant") ? 15 : 0) +
          (hasBadge(x, "Fresh") ? 10 : 0) +
          (hasBadge(x, "Strong") ? 6 : 0) +
          (hasBadge(x, "Spicy") ? 5 : 0) +
          (hasBadge(x, "0.0%") ? 8 : 0) +
          (hasBadge(x, "Signature") ? 9 : 0);
        return score(b) - score(a);
      });
    }

    return arr;
  }, [drinks, filter, query, sort]);

  return (
    <main className="py-14 sm:py-16 text-white">
      <Container>
        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <p className="text-xs font-black tracking-[0.25em] text-white/70">COCKTAIL MENÜ</p>
          <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold text-white">Veloria Menü – Premium & Event-ready</h1>
          <p className="mt-4 text-sm sm:text-base text-white/85 leading-7 max-w-2xl">
            Weltweit beliebte Cocktails, modern interpretiert – inkl. 0.0% Mocktails & Shot Experience. Auf Wunsch erstellen
            wir ein Menü passend zu euren Gästen.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/experience-builder"
              className="rounded-2xl px-5 py-3 text-sm font-black text-white bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-400 hover:opacity-95 transition"
            >
              Preis in 60 Sekunden berechnen
            </Link>
            <Link
              href="/kontakt"
              className="rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/15 transition backdrop-blur"
            >
              Menü für dein Event anfragen
            </Link>
          </div>

          {/* CONTROLS ROW */}
          <div className="mt-10 grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-center">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Suche (z.B. Gin, 0.0%, Passion, Spicy...)"
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/90 outline-none placeholder:text-white/45 backdrop-blur focus:ring-2 focus:ring-white/20"
              />
              {query.length > 0 && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-white/80 hover:bg-white/15"
                >
                  X
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <ChipButton active={sort === "recommended"} onClick={() => setSort("recommended")}>
                Empfohlen
              </ChipButton>
              <ChipButton active={sort === "az"} onClick={() => setSort("az")}>
                A–Z
              </ChipButton>
            </div>

            <div className="flex gap-2">
              <ChipButton active={view === "grid"} onClick={() => setView("grid")}>
                Grid
              </ChipButton>
              <ChipButton active={view === "lux"} onClick={() => setView("lux")}>
                Luxury
              </ChipButton>
            </div>
          </div>

          {/* FILTERS */}
          <div className="mt-4 flex flex-wrap gap-2">
            <ChipButton active={filter === "all"} onClick={() => setFilter("all")}>
              Alle
            </ChipButton>
            <ChipButton active={filter === "signature"} onClick={() => setFilter("signature")}>
              Signature
            </ChipButton>
            <ChipButton active={filter === "klassiker"} onClick={() => setFilter("klassiker")}>
              Klassiker
            </ChipButton>
            <ChipButton active={filter === "spritz"} onClick={() => setFilter("spritz")}>
              Spritz & Summer
            </ChipButton>
            <ChipButton active={filter === "tropical"} onClick={() => setFilter("tropical")}>
              Tropical
            </ChipButton>
            <ChipButton active={filter === "mocktails"} onClick={() => setFilter("mocktails")}>
              0.0% Mocktails
            </ChipButton>
            <ChipButton active={filter === "shots"} onClick={() => setFilter("shots")}>
              Shots
            </ChipButton>
          </div>

          <div className="mt-3 text-xs text-white/55">
            {items.length} Drinks • Anzeige: <span className="text-white/75">{view === "grid" ? "Grid" : "Luxury"}</span>
          </div>
        </motion.div>

        {/* LIST */}
        {view === "grid" ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((d) => (
              <TiltCard
                key={d.name}
                className="group overflow-hidden border border-white/15 bg-white/10 backdrop-blur shadow-[0_22px_70px_-35px_rgba(0,0,0,0.7)] hover:bg-white/15 transition"
              >
                {d.src ? (
                  <div className="relative">
                    <DrinkImage src={d.src} alt={d.name} />

                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-sm font-black text-white drop-shadow-[0_6px_16px_rgba(0,0,0,0.7)]">{d.name}</p>
                    </div>

                    {d.badges && d.badges.length > 0 && (
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        {d.badges.map((b) => (
                          <Badge key={b}>{b}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-5 pb-2">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-base font-black text-white">{d.name}</p>
                      {d.badges && d.badges.length > 0 && (
                        <div className="flex flex-wrap justify-end gap-2">
                          {d.badges.slice(0, 2).map((b) => (
                            <Badge key={b}>{b}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="p-5 pt-4">
                  <div className="flex flex-wrap gap-2">
                    {d.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-white/85 leading-6">{d.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-4">
            {items.map((d) => (
              <TiltCard
                key={d.name}
                className="group overflow-hidden border border-white/15 bg-white/10 backdrop-blur shadow-[0_22px_70px_-35px_rgba(0,0,0,0.7)] hover:bg-white/15 transition"
              >
                <div className="grid md:grid-cols-[260px_1fr]">
                  <div className="relative">
                    {d.src ? (
                      <div className="relative aspect-[3/4] md:aspect-[4/5]">
                        <DrinkImage src={d.src} alt={d.name} />
                      </div>
                    ) : (
                      <div className="h-full min-h-[180px] bg-gradient-to-br from-white/10 to-white/5" />
                    )}

                    {d.badges && d.badges.length > 0 && (
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        {d.badges.map((b) => (
                          <Badge key={b}>{b}</Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="text-xl font-extrabold">{d.name}</div>
                      <div className="flex flex-wrap gap-2">
                        {d.tags.slice(0, 4).map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-white/85 leading-7 max-w-3xl">{d.desc}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {d.tags.slice(4).map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link
                        href="/kontakt"
                        className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 px-5 py-3 text-sm font-black text-white hover:opacity-95 transition"
                      >
                        Für dein Event anfragen
                      </Link>
                      <Link
                        href="/experience-builder"
                        className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/15 transition backdrop-blur"
                      >
                        Preis in 60 Sekunden
                      </Link>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        )}

        {/* SHOT PACKAGES */}
        <div className="mt-16">
          <SectionTitle
            id="shot-packages"
            title="Shot Pakete für Events"
            subtitle="Für Stimmung, Energy und den großen Party-Moment – schnell serviert, maximaler Effekt."
          />

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {shotPackages.map((p) => (
              <div
                key={p.title}
                className={[
                  "group relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 backdrop-blur",
                  "shadow-[0_22px_70px_-35px_rgba(0,0,0,0.7)] transition hover:bg-white/15",
                  p.featured ? "ring-2 ring-pink-500/40" : "",
                  "flex flex-col",
                ].join(" ")}
              >
                {/* IMAGE (dominant) */}
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/10" />

                  {p.featured && (
                    <div className="absolute left-4 top-4">
                      <span className="rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-3 py-1 text-[11px] font-black text-white shadow-lg">
                        Bestseller
                      </span>
                    </div>
                  )}

                  <div className="absolute right-4 top-4">
                    <span className="rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs font-black text-white backdrop-blur">
                      {p.priceMode === "from" ? `ab ${p.price}` : p.price}
                    </span>
                  </div>
                </div>

                {/* BODY (aliniat + text mic jos) */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="min-h-[54px]">
                    <div className="text-base font-extrabold text-white leading-tight">{p.title}</div>
                    <div className="mt-1 text-[12px] text-white/70 leading-snug">{p.desc}</div>
                  </div>

                  <div className="mt-3 text-[12px] text-white/55">{p.hint}</div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.features.map((f) => (
                      <span
                        key={f}
                        className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10.5px] font-bold text-white/85"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="flex-1" />

                  <Link
                    href="/kontakt"
                    className={[
                      "mt-5 inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-black text-white transition",
                      p.featured
                        ? "bg-gradient-to-r from-pink-500 to-orange-500 hover:opacity-95"
                        : "bg-white/10 hover:bg-white/15 border border-white/15",
                    ].join(" ")}
                  >
                    Shot Paket anfragen
                  </Link>

                  <div className="mt-3 text-[10.5px] text-white/45">
                    Preise sind Richtwerte – final nach Gästezahl & Ablauf.
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-white/60">
            Hinweis: Auswahl & Menge passen wir an eure Gäste und den Ablauf an (inkl. 0.0% Alternativen).
          </p>
        </div>
      </Container>
    </main>
  );
}
