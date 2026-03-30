"use client";

import { strengths } from "@/content/siteContent";
import { motion } from "framer-motion";
import { revealVariants, usePrefersReducedMotion } from "@/lib/motion";

export function HighlightsStrip() {
  const reduced = usePrefersReducedMotion();
  const top = strengths.slice(0, 3);

  return (
    <section
      aria-label="Ключевые преимущества"
      className="relative bg-surface-light text-ink industrialStripes"
    >
      <div className="layout-container section-y-compact">
        <div className="grid items-start gap-3 md:grid-cols-3">
          {top.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i}
              initial={reduced ? false : "hidden"}
              whileInView={reduced ? undefined : "show"}
              viewport={{ once: true, amount: 0.3 }}
              variants={revealVariants}
              className="flex flex-col rounded-2xl border border-black/10 bg-white p-4 text-left shadow-[0_12px_32px_rgba(0,0,0,.05)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,.08)] md:rounded-3xl md:p-5"
            >
              <div className="font-[var(--font-heading)] text-lg leading-snug tracking-wide text-ink md:text-xl">
                {s.title}
              </div>
              <div className="mt-2.5 text-sm leading-relaxed text-ink/70">{s.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

