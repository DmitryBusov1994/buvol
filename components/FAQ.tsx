"use client";

import { useId, useState } from "react";
import { faq } from "@/content/siteContent";
import { Section } from "@/components/Section";
import { SectionHeadingAccent } from "@/components/SectionHeadingAccent";
import { motion } from "framer-motion";
import { leftSlideVariants, usePrefersReducedMotion } from "@/lib/motion";

function FaqRow({
  idx,
  question,
  answer,
  defaultOpen,
}: {
  idx: number;
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const panelId = useId();
  const [open, setOpen] = useState(Boolean(defaultOpen));

  return (
    <motion.div
      custom={idx}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "show"}
      viewport={{ once: true, amount: 0.2 }}
      variants={leftSlideVariants}
      className="rounded-3xl border border-white/10 bg-white/5"
    >
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber/50"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-base font-medium text-white">{question}</span>
        <span
          aria-hidden="true"
          className={[
            "inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-surface-darker/40 text-white/80 transition",
            open ? "rotate-45" : "",
          ].join(" ")}
        >
          +
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-label={question}
        className={[
          "grid overflow-hidden px-5 transition-[grid-template-rows] duration-200",
          open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr] pb-0",
        ].join(" ")}
      >
        <div className="min-h-0 pb-4 text-sm leading-relaxed text-white/70">{answer}</div>
      </div>
    </motion.div>
  );
}

export function FAQ() {
  return (
    <Section id="faq" className="relative bg-surface-dark">
      <div className="absolute inset-0 gearPattern opacity-35" />
      <div className="noiseOverlay" />

      <div className="relative layout-container section-y-compact">
        <div>
          <h2 className="font-[var(--font-heading)] text-3xl tracking-wide text-white md:text-4xl">
            FAQ
          </h2>
          <SectionHeadingAccent />
        </div>

        <div className="mx-auto mt-8 grid max-w-2xl gap-3 md:mt-10">
          {faq.map((f, i) => (
            <FaqRow
              key={f.question}
              idx={i}
              question={f.question}
              answer={f.answer}
              defaultOpen={i === 0}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

