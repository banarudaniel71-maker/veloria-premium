"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import DrinkBuilder from "@/app/components/DrinkBuilder";

function Orb({
  className,
  tone = "pink",
}: {
  className: string;
  tone?: "pink" | "orange" | "sky" | "white";
}) {
  const fill =
    tone === "pink"
      ? "rgba(236,72,153,0.22)"
      : tone === "orange"
      ? "rgba(251,146,60,0.18)"
      : tone === "sky"
      ? "rgba(56,189,248,0.14)"
      : "rgba(255,255,255,0.12)";

  return (
    <div className={`pointer-events-none absolute ${className}`}>
      <div className="h-full w-full rounded-full blur-3xl" style={{ background: fill }} />
    </div>
  );
}

/** Premium vector shapes (NO emoji) */
function LimeShape() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110" fill="none" aria-hidden="true">
      <defs>
        <radialGradient
          id="g1"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(36 34) rotate(56) scale(90)"
        >
          <stop stopColor="rgba(255,255,255,0.9)" offset="0" />
          <stop stopColor="rgba(255,255,255,0.0)" offset="1" />
        </radialGradient>
      </defs>
      <circle cx="55" cy="55" r="42" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.14)" />
      <circle cx="55" cy="55" r="34" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.10)" />
      <path
        d="M55 14c7 0 13 2 18 6-6 3-12 5-18 5s-12-2-18-5c5-4 11-6 18-6Z"
        fill="rgba(255,255,255,0.10)"
      />
      <circle cx="40" cy="40" r="38" fill="url(#g1)" opacity="0.35" />
    </svg>
  );
}

function MintShape() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <path
        d="M68 18c-18 4-33 20-36 40-2 13 2 25 10 33 12 12 31 14 45 5 15-10 22-30 16-48-6-18-20-30-35-30Z"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.14)"
      />
      <path d="M30 66c18-10 37-14 60-12" stroke="rgba(255,255,255,0.16)" strokeWidth="2" strokeLinecap="round" />
      <path d="M36 82c16-9 32-12 52-10" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="42" cy="36" r="18" fill="rgba(255,255,255,0.10)" opacity="0.35" />
    </svg>
  );
}

function CoffeeShape() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <rect x="20" y="34" width="62" height="52" rx="16" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" />
      <path
        d="M82 46h8c10 0 18 8 18 18s-8 18-18 18h-8"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M38 28c0-7 7-10 7-16" stroke="rgba(255,255,255,0.14)" strokeWidth="2" strokeLinecap="round" />
      <path d="M56 28c0-7 7-10 7-16" stroke="rgba(255,255,255,0.14)" strokeWidth="2" strokeLinecap="round" />
      <path d="M46 92h30" stroke="rgba(255,255,255,0.10)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function IceShape() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <path
        d="M42 22h36l20 20v36l-20 20H42L22 78V42l20-20Z"
        fill="rgba(255,255,255,0.05)"
        stroke="rgba(255,255,255,0.14)"
      />
      <path d="M42 22l56 56" stroke="rgba(255,255,255,0.10)" />
      <path d="M98 42L42 98" stroke="rgba(255,255,255,0.10)" />
      <path d="M22 42h76" stroke="rgba(255,255,255,0.08)" />
      <path d="M42 22v76" stroke="rgba(255,255,255,0.08)" />
    </svg>
  );
}

export default function SignatureExperience() {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yLime = useTransform(scrollYProgress, [0, 1], [50, -120]);
  const yMint = useTransform(scrollYProgress, [0, 1], [90, -150]);
  const yCoffee = useTransform(scrollYProgress, [0, 1], [70, -140]);
  const yIce = useTransform(scrollYProgress, [0, 1], [110, -170]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 180]);

  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.22], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.05, 0.22], [18, 0]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden py-20 md:py-28">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />

        <motion.div
          style={{ y: glowY }}
          className="absolute -top-56 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-white/10 blur-[120px]"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.10),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.08),transparent_55%)]" />

        <Orb className="-left-40 top-10 h-[520px] w-[520px]" tone="pink" />
        <Orb className="-right-48 top-16 h-[560px] w-[560px]" tone="orange" />
        <Orb className="left-[30%] bottom-[-260px] h-[680px] w-[680px]" tone="sky" />
      </div>

      {/* Parallax objects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div style={{ y: yLime }} className="absolute left-6 top-10 md:left-16">
          <div className="opacity-80 drop-shadow-[0_40px_70px_rgba(0,0,0,0.70)]">
            <LimeShape />
          </div>
        </motion.div>

        <motion.div style={{ y: yMint }} className="absolute right-6 top-14 md:right-20">
          <div className="opacity-70 drop-shadow-[0_40px_70px_rgba(0,0,0,0.70)]">
            <MintShape />
          </div>
        </motion.div>

        <motion.div style={{ y: yCoffee }} className="absolute left-10 bottom-10 md:left-24">
          <div className="opacity-70 drop-shadow-[0_40px_70px_rgba(0,0,0,0.70)]">
            <CoffeeShape />
          </div>
        </motion.div>

        <motion.div style={{ y: yIce }} className="absolute right-10 bottom-10 md:right-28">
          <div className="opacity-65 drop-shadow-[0_40px_70px_rgba(0,0,0,0.70)]">
            <IceShape />
          </div>
        </motion.div>
      </div>

      <div className="mx-auto max-w-6xl px-5">
        {/* Header */}
        <motion.div style={{ opacity: titleOpacity, y: titleY }} className="text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 backdrop-blur">
            <span className="opacity-90">Veloria Selection Builder</span>
            <span className="text-white/40">•</span>
            <span>München & Bayern</span>
          </div>

          <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Ihr wählt die Drinks —
            <span className="text-white/70"> wir bringen Setup, Zutaten & Flow</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-white/70 md:text-base">
            Wählt <span className="text-white font-semibold">6 Cocktails</span>,{" "}
            <span className="text-white font-semibold">3 Mocktails</span>,{" "}
            <span className="text-white font-semibold">1 Shot Paket</span> und die Shot Sorten.
          </p>
        </motion.div>

        <div className="mt-12">
          <DrinkBuilder />
        </div>
      </div>
    </section>
  );
}