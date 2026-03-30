"use client";

import { audience } from "@/content/siteContent";
import { Section } from "@/components/Section";
import { SectionHeadingAccent } from "@/components/SectionHeadingAccent";
import { motion } from "framer-motion";
import { diagonalVariants, usePrefersReducedMotion } from "@/lib/motion";

export function WhoWeHelp() {
  const reduced = usePrefersReducedMotion();

  return (
    <Section id="who" className="relative bg-surface-dark">
      <div className="absolute inset-0 gearPattern opacity-40" />
      <div className="noiseOverlay" />
      <div className="relative layout-container section-y-default">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="font-[var(--font-heading)] text-3xl tracking-wide text-white md:text-4xl">
              Кому помогаем
            </h2>
            <SectionHeadingAccent />
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70 md:mt-4">
              Работаем с теми, у кого грузовая техника — это деньги, сроки и ответственность. У каждого
              клиента свои риски: простой, безопасность, ресурс узлов и прозрачность работ.
            </p>
          </div>
          <a
            href="#contacts"
            className="press-flame hidden rounded-2xl bg-brand-red px-5 py-3 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,120,40,.2),0_8px_28px_rgba(192,57,43,.28)] transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/55 md:inline-flex"
          >
            Оставить заявку
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audience.map((seg, i) => (
            <motion.div
              key={seg.title}
              custom={i}
              initial={reduced ? false : "hidden"}
              whileInView={reduced ? undefined : "show"}
              viewport={{ once: true, amount: 0.2 }}
              variants={diagonalVariants}
              className="flex h-full min-h-0 flex-col rounded-2xl border border-white/10 bg-white/5 px-3.5 py-3.5 transition hover:-translate-y-0.5 hover:bg-white/[0.07] md:px-4 md:py-4"
            >
              <div className="min-w-0 font-[var(--font-heading)] text-sm uppercase leading-snug tracking-wide text-brand-amber">
                {seg.title}
              </div>
              <div className="mt-2 text-sm leading-relaxed text-white/72">{seg.description}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center md:hidden">
          <a
            href="#contacts"
            className="press-flame rounded-2xl bg-brand-red px-5 py-3 text-sm font-medium text-white transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/55"
          >
            Оставить заявку
          </a>
        </div>
      </div>
    </Section>
  );
}
