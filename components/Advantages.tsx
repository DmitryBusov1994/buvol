"use client";

import { advantages } from "@/content/siteContent";
import { Section } from "@/components/Section";
import { SectionHeadingAccent } from "@/components/SectionHeadingAccent";
import { motion } from "framer-motion";
import { revealVariants, usePrefersReducedMotion } from "@/lib/motion";

export function Advantages() {
  const reduced = usePrefersReducedMotion();

  return (
    <Section id="advantages" className="relative bg-surface-dark">
      <div className="absolute inset-0 gearPattern opacity-40" />
      <div className="noiseOverlay" />
      <div className="relative layout-container section-y-default">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <h2 className="font-[var(--font-heading)] text-3xl tracking-wide text-white md:text-4xl">
              Наши преимущества
            </h2>
            <SectionHeadingAccent />
          </div>
          <a
            href="#contacts"
            className="press-flame hidden w-fit shrink-0 rounded-2xl bg-brand-red px-5 py-3 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,120,40,.2),0_8px_28px_rgba(192,57,43,.28)] transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 md:inline-flex md:ml-0"
          >
            Записаться
          </a>
        </div>

        <div className="mt-8 grid auto-rows-fr grid-cols-1 items-stretch gap-6 sm:mt-9 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
          {advantages.map((a, i) => (
            <motion.div
              key={a.title}
              custom={i}
              initial={reduced ? false : "hidden"}
              whileInView={reduced ? undefined : "show"}
              viewport={{ once: true, amount: 0.2 }}
              variants={revealVariants}
              className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-4 shadow-[0_12px_32px_rgba(0,0,0,.05)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,.08)] md:rounded-2xl md:p-5"
            >
              <div className="flex min-h-[2.75rem] shrink-0 items-start gap-3 md:min-h-[3.25rem]">
                <span
                  aria-hidden
                  className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red/80"
                />
                <span className="min-w-0 font-[var(--font-heading)] text-sm uppercase leading-snug tracking-wider text-ink">
                  {a.title}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{a.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

