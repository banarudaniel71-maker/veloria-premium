"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function CursorGlow() {
  const x = useMotionValue(-999);
  const y = useMotionValue(-999);

  const sx = useSpring(x, { stiffness: 300, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 300, damping: 40, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] hidden md:block"
    >
      <motion.div
        style={{ left: sx, top: sy }}
        className="absolute h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
      >
        {/* glow blob */}
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.18),rgba(245,158,11,0.10),rgba(16,185,129,0.08),transparent_70%)]" />
      </motion.div>
    </motion.div>
  );
}
