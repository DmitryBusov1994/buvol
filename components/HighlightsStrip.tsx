"use client";

import { strengths } from "@/content/siteContent";
import { motion } from "framer-motion";
import { revealVariants, usePrefersReducedMotion } from "@/lib/motion";

/**
 * Визуально продолжает Hero: тот же базовый фон #0e0e10, gearPattern, industrialStripes,
 * шум и градиенты — без truck backdrop и без parallax.
 */
export function HighlightsStrip() {
  const reduced = usePrefersReducedMotion();
  const top = strengths.slice(0, 3);

  return (
    <section aria-label="Ключевые преимущества" className="relative overflow-hidden bg-[#0e0e10] text-white">
      <div className="absolute inset-0 z-0 gearPattern opacity-80" aria-hidden />
      <div className="absolute inset-0 z-0 industrialStripes opacity-40" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-0 noiseOverlay" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_72%_28%,rgba(255,255,255,.14),transparent_38%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[2] bg-gradient-to-r from-[#0e0e10]/95 via-[#0e0e10]/78 to-[#0e0e10]/40 max-md:from-[#0e0e10]/98 max-md:via-[#0e0e10]/92"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[2] bg-gradient-to-t from-[#0e0e10] via-transparent to-[#0e0e10]/50"
      />

      <div className="relative z-[3] layout-container section-y-compact">
        <div className="grid items-start gap-3 md:grid-cols-3">
          {top.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i}
              initial={reduced ? false : "hidden"}
              whileInView={reduced ? undefined : "show"}
              viewport={{ once: true, amount: 0.3 }}
              variants={revealVariants}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-4 text-left shadow-[0_12px_40px_rgba(0,0,0,.35)] backdrop-blur-[2px] transition hover:-translate-y-0.5 hover:bg-white/[0.07] md:rounded-3xl md:p-5"
            >
              <div className="font-[var(--font-heading)] text-lg leading-snug tracking-wide text-white md:text-xl">
                {s.title}
              </div>
              <div className="mt-2.5 text-sm leading-relaxed text-white/70">{s.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
