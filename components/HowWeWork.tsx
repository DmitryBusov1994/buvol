"use client";

import { howWeWork } from "@/content/siteContent";
import { Section } from "@/components/Section";
import { SectionHeadingAccent } from "@/components/SectionHeadingAccent";
import { motion } from "framer-motion";
import { revealVariants, usePrefersReducedMotion } from "@/lib/motion";

export function HowWeWork() {
  const reduced = usePrefersReducedMotion();

  return (
    <Section id="process" className="relative bg-surface-dark">
      <div className="absolute inset-0 gearPattern opacity-40" />
      <div className="noiseOverlay" />

      <div className="relative layout-container section-y-spacious">
        <div>
          <h2 className="font-[var(--font-heading)] text-3xl tracking-wide text-white md:text-4xl">
            Как мы работаем
          </h2>
          <SectionHeadingAccent />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70">
            Понятный процесс снижает тревожность: вы знаете, что будет дальше и на каком этапе мы
            согласуем работы.
          </p>
        </div>

        <div className="mt-10 grid auto-rows-fr grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {howWeWork.map((step, i) => (
            <motion.div
              key={step.title}
              custom={i}
              initial={reduced ? false : "hidden"}
              whileInView={reduced ? undefined : "show"}
              viewport={{ once: true, amount: 0.2 }}
              variants={revealVariants}
              className="relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:bg-white/[0.07]"
            >
              <div className="font-[var(--font-heading)] text-2xl tabular-nums leading-none text-brand-amber md:text-3xl">
                {i + 1}
              </div>
              <div className="mt-3 min-w-0 font-[var(--font-heading)] text-base uppercase leading-snug tracking-wide text-white">
                {step.title}
              </div>
              <div className="mt-1.5 text-sm leading-relaxed text-white/75">{step.text}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
