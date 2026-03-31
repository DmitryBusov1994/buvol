"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { sectionVariants, usePrefersReducedMotion } from "@/lib/motion";

export function Section({
  id,
  className,
  style,
  children,
}: {
  id?: string;
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      style={style}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "show"}
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      {children}
    </motion.section>
  );
}

