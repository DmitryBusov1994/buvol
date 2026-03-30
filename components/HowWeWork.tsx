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

        <div className="mt-8 grid grid-cols-1 items-stretch gap-3 sm:mt-9 sm:grid-cols-2 sm:gap-3 lg:mx-auto lg:max-w-5xl lg:grid-cols-5 lg:gap-3">
          {howWeWork.map((step, i) => (
            <motion.div
              key={step.title}
              custom={i}
              initial={reduced ? false : "hidden"}
              whileInView={reduced ? undefined : "show"}
              viewport={{ once: true, amount: 0.2 }}
              variants={revealVariants}
              className="relative flex h-full min-h-0 flex-col rounded-2xl border border-white/10 bg-white/5 px-3.5 py-3.5 transition hover:-translate-y-0.5 hover:bg-white/[0.07] md:px-4 md:py-4"
            >
              <div className="min-w-0 font-[var(--font-heading)] text-[13px] uppercase leading-snug tracking-wide text-white md:text-sm">
                {step.title}
              </div>
              <div className="mt-2 text-xs leading-relaxed text-white/72 md:text-[13px]">{step.text}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
