"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

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

export default function EventMoodSection() {
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
            <p className="text-xs font-black tracking-[0.28em] text-white/65">EVENT MOODS</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
              Für jede Stimmung der richtige Vibe
            </h2>
            <p className="mt-4 max-w-2xl text-white/75 leading-relaxed">
              Veloria passt sich nicht nur dem Event an – sondern dem Gefühl, das eure Gäste erleben sollen.
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

        <div className="mt-10 rounded-3xl border border-white/12 bg-gradient-to-b from-white/14 to-white/6 p-7 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-base font-semibold text-white/95">
                Nicht einfach Drinks. Ein kompletter Event-Vibe.
              </div>
              <div className="mt-1 text-sm text-white/75">
                Von elegant bis vibrant – wir passen Look, Auswahl und Flow an euer Event an.
              </div>
            </div>

            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg
              bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400"
            >
              Event anfragen →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}