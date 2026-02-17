"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function TiltCard({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const smx = useSpring(mx, { stiffness: 220, damping: 25, mass: 0.7 });
  const smy = useSpring(my, { stiffness: 220, damping: 25, mass: 0.7 });

  // rotate based on mouse position
  const rotateX = useTransform(smy, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smx, [-0.5, 0.5], [-10, 10]);

  // shine position
  const shineX = useTransform(smx, [-0.5, 0.5], ["20%", "80%"]);
  const shineY = useTransform(smy, [-0.5, 0.5], ["20%", "80%"]);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();

    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height; // 0..1

    mx.set(px - 0.5);
    my.set(py - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className={`relative will-change-transform [perspective:1200px] ${className}`}
    >
      {/* specular shine */}
      <motion.div
        aria-hidden
        style={{
          background: `radial-gradient(circle at var(--x) var(--y), rgba(255,255,255,0.18), rgba(255,255,255,0.06), transparent 55%)`,
          ["--x" as any]: shineX,
          ["--y" as any]: shineY,
        }}
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div style={{ transform: "translateZ(0px)" }}>{children}</div>
    </motion.div>
  );
}
