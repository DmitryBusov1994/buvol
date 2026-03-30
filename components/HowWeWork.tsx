"use client";

import { howWeWork } from "@/content/siteContent";
import { Section } from "@/components/Section";
import { SectionHeadingAccent } from "@/components/SectionHeadingAccent";
import { motion } from "framer-motion";
import { revealVariants, usePrefersReducedMotion } from "@/lib/motion";

export function HowWeWork() {
  const reduced = usePrefersReducedMotion();

  return (
    <Section id="process" className="relative bg-surface-light text-ink industrialStripes">
      <div className="layout-container section-y-spacious">
        <div>
          <h2 className="font-[var(--font-heading)] text-3xl tracking-wide md:text-4xl">
            Как мы работаем
          </h2>
          <SectionHeadingAccent />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink/70">
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
              className="relative flex h-full flex-col rounded-3xl border border-black/10 bg-white p-5 shadow-[0_12px_32px_rgba(0,0,0,.05)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,.08)]"
            >
              <div className="font-[var(--font-heading)] text-2xl tabular-nums leading-none text-brand-amber md:text-3xl">
                {i + 1}
              </div>
              <div className="mt-3 min-w-0 font-[var(--font-heading)] text-base uppercase leading-snug tracking-wide text-ink">
                {step.title}
              </div>
              <div className="mt-1.5 text-sm leading-relaxed text-ink/75">{step.text}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

