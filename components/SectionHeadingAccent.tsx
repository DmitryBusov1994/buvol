"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/motion";

/** Градиентная линия под заголовком секции (как в блоке «Услуги»). */
export function SectionHeadingAccent() {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { width: 0, opacity: 0.4 }}
      whileInView={reduced ? undefined : { width: 180, opacity: 1 }}
      viewport={{ once: true }}
      transition={reduced ? undefined : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mt-4 h-[2px] max-w-full rounded-full bg-gradient-to-r from-brand-red via-brand-amber to-transparent"
      aria-hidden
    />
  );
}
