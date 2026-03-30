"use client";

import { motion } from "framer-motion";
import { sectionVariants, usePrefersReducedMotion } from "@/lib/motion";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "show"}
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      {children}
    </motion.section>
  );
}

