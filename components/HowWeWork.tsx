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
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/70">
            Понятный процесс снижает тревожность: вы знаете, что будет дальше и на каком этапе мы
            согласуем работы.
          </p>
        </div>

        <div className="mt-10 grid auto-rows-fr grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {howWeWork.map((step, i) => (
            <motion.div
              key={step.title}
              custom={i}
              initial={reduced ? false : "hidden"}
              whileInView={reduced ? undefined : "show"}
              viewport={{ once: true, amount: 0.2 }}
              variants={revealVariants}
              className="relative flex h-full min-h-[12.5rem] flex-col rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:bg-white/7 md:min-h-[13.5rem] lg:min-h-[14rem]"
            >
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center self-start rounded-2xl bg-brand-amber/15 text-sm font-semibold tabular-nums leading-none text-brand-amber ring-1 ring-white/10">
                  {i + 1}
                </div>
                <div className="min-h-[2.75rem] min-w-0 flex-1 font-[var(--font-heading)] text-base leading-tight tracking-wide text-white md:min-h-[3rem] md:text-lg">
                  {step.title}
                </div>
              </div>
              <div className="mt-4 flex-1 text-sm leading-relaxed text-white/75">{step.text}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

