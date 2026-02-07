"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>;
}

const images = [
  { src: "/images/sex-on-the-beach.png", title: "Sex on the Beach" },
  { src: "/images/pornstar-martini.png", title: "Porn Star Martini" },
  { src: "/images/mai-tai.png", title: "Mai Tai" },
  { src: "/images/pina-colada.png", title: "Piña Colada" },
];

export default function GaleriePage() {
  const slides = useMemo(() => images.map((i) => ({ src: i.src })), []);
  const [index, setIndex] = useState<number>(-1);

  return (
    <main className="py-14 sm:py-16">
      <Container>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <p className="text-xs font-black tracking-[0.25em] text-white/70">GALERIE</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-white">
            Premium Look. Echter Wow-Faktor.
          </h1>
          <p className="mt-4 text-sm sm:text-base text-white/85 leading-7 max-w-2xl">
            Klick auf ein Bild, um es fullscreen anzusehen.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((img, i) => (
            <button
              key={img.title}
              onClick={() => setIndex(i)}
              className="group text-left overflow-hidden rounded-3xl border border-white/15 bg-white/10 backdrop-blur shadow-[0_22px_70px_-35px_rgba(0,0,0,0.7)]"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/0 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm font-black text-white">{img.title}</p>
                  <p className="mt-1 text-xs text-white/75">Zum Vergrößern klicken</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <Lightbox
          open={index >= 0}
          close={() => setIndex(-1)}
          index={index}
          slides={slides}
        />
      </Container>
    </main>
  );
}
