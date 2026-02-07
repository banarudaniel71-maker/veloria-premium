"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const drinks = [
  {
    name: "Sex on the Beach",
    src: "/images/sex-on-the-beach.png",
    tags: ["Fruchtig", "Sommer", "Party"],
    desc: "Orange, Cranberry & Pfirsich – fruchtig, leicht süß und perfekt für gute Stimmung.",
  },
  {
    name: "Porn Star Martini",
    src: "/images/pornstar-martini.png",
    tags: ["Signature", "Elegant", "Modern"],
    desc: "Vanille & Passionsfrucht – edel, modern und ein absoluter Crowd-Pleaser.",
  },
  {
    name: "Mai Tai",
    src: "/images/mai-tai.png",
    tags: ["Tiki", "Rum", "Classic"],
    desc: "Tiki-Klassiker mit Rum, Lime & Orgeat – kräftig, aromatisch, tropisch.",
  },
  {
    name: "Piña Colada",
    src: "/images/pina-colada.png",
    tags: ["Cremig", "Tropical", "Sweet"],
    desc: "Kokos & Ananas – cremig, tropisch und wie Urlaub im Glas.",
  },
];

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>;
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
      {children}
    </span>
  );
}

export default function MenuPage() {
  return (
    <main className="py-14 sm:py-16">
      <Container>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <p className="text-xs font-black tracking-[0.25em] text-white/70">COCKTAIL MENÜ</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-white">Signature Drinks von Veloria</h1>
          <p className="mt-4 text-sm sm:text-base text-white/85 leading-7 max-w-2xl">
            Eine Auswahl der beliebtesten Cocktails – mit Premium-Look & perfekter Balance.
            Auf Wunsch erstellen wir ein Menü passend zu euren Gästen.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/kontakt"
              className="rounded-2xl px-5 py-3 text-sm font-black text-white bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-400 hover:opacity-95 transition"
            >
              Menü für dein Event anfragen
            </Link>
            <Link
              href="/pakete"
              className="rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/15 transition backdrop-blur"
            >
              Pakete & Preise
            </Link>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {drinks.map((d) => (
            <div
              key={d.name}
              className="group overflow-hidden rounded-3xl border border-white/15 bg-white/10 backdrop-blur shadow-[0_22px_70px_-35px_rgba(0,0,0,0.7)]"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={d.src}
                  alt={d.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/0 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm font-black text-white">{d.name}</p>
                </div>
              </div>

              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  {d.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                <p className="mt-3 text-sm text-white/85 leading-6">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
