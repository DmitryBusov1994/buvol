"use client";

import { advantages } from "@/content/siteContent";
import { Section } from "@/components/Section";
import { SectionHeadingAccent } from "@/components/SectionHeadingAccent";
import { motion } from "framer-motion";
import { revealVariants, usePrefersReducedMotion } from "@/lib/motion";

export function Advantages() {
  const reduced = usePrefersReducedMotion();

  return (
    <Section id="advantages" className="relative bg-surface-panel text-ink industrialStripes">
      <div className="layout-container section-y-default">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="font-[var(--font-heading)] text-3xl tracking-wide md:text-4xl">
              Наши преимущества
            </h2>
            <SectionHeadingAccent />
          </div>
          <a
            href="#contacts"
            className="press-flame hidden rounded-2xl bg-brand-red px-5 py-3 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,120,40,.2),0_8px_28px_rgba(192,57,43,.28)] transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 md:inline-flex"
          >
            Записаться
          </a>
        </div>

        <div className="mt-10 grid items-stretch gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a, i) => (
            <motion.div
              key={a.title}
              custom={i}
              initial={reduced ? false : "hidden"}
              whileInView={reduced ? undefined : "show"}
              viewport={{ once: true, amount: 0.2 }}
              variants={revealVariants}
              className="flex h-full min-h-[260px] flex-col rounded-2xl border border-black/10 bg-white p-4 shadow-[0_16px_40px_rgba(0,0,0,.055)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(0,0,0,.09)] md:min-h-[280px] md:rounded-3xl md:p-5 lg:min-h-[300px]"
            >
              <div className="shrink-0 font-[var(--font-heading)] text-lg tracking-wide leading-snug md:text-xl">
                {a.title}
              </div>
              <div className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{a.text}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

