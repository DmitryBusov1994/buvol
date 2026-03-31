"use client";

import type { CSSProperties } from "react";
import { useId, useState } from "react";
import { faq } from "@/content/siteContent";
import { Section } from "@/components/Section";
import { SectionHeadingAccent } from "@/components/SectionHeadingAccent";
import { motion } from "framer-motion";
import { leftSlideVariants, usePrefersReducedMotion } from "@/lib/motion";
import { publicAsset } from "@/lib/publicPath";

const faqBgStyle = {
  ["--section-bg-photo" as string]: `url("${publicAsset("/images/light_bg_v4_gears.webp")}")`,
} as CSSProperties;

function FaqRow({ idx, question, answer }: { idx: number; question: string; answer: string }) {
  const reduced = usePrefersReducedMotion();
  const panelId = useId();
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      custom={idx}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "show"}
      viewport={{ once: true, amount: 0.2 }}
      variants={leftSlideVariants}
      className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_8px_28px_rgba(0,0,0,.06)]"
    >
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber/50 md:p-5"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="min-w-0 flex-1 pr-2 text-base font-medium leading-snug text-ink">
          {question}
        </span>
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center" aria-hidden="true">
          <picture>
            <source
              type="image/webp"
              srcSet={
                open
                  ? publicAsset("/images/faq_gear_indicator_open.webp")
                  : publicAsset("/images/faq_gear_indicator_closed.webp")
              }
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                open
                  ? publicAsset("/images/faq_gear_indicator_open.png")
                  : publicAsset("/images/faq_gear_indicator_closed.png")
              }
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
              decoding="async"
            />
          </picture>
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-hidden={!open}
        className={[
          "grid px-4 transition-[grid-template-rows] duration-200 ease-out md:px-5",
          open ? "grid-rows-[1fr] pb-4 md:pb-5" : "grid-rows-[0fr] pb-0",
        ].join(" ")}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pb-1 text-sm leading-relaxed text-ink/70 md:pb-0">{answer}</div>
        </div>
      </div>
    </motion.div>
  );
}

export function FAQ() {
  return (
    <Section id="faq" className="bg-surface-light text-ink section-bg-photo-cover" style={faqBgStyle}>
      <div className="faq-buffalo-wrap" aria-hidden="true">
        <picture>
          <source type="image/webp" srcSet={publicAsset("/images/faq_buffalo_simple.webp")} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={publicAsset("/images/faq_buffalo_simple.png")}
            alt=""
            className="faq-buffalo-img"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
      <div className="layout-container section-y-compact">
        <div className="w-full max-w-2xl text-left">
          <h2 className="font-[var(--font-heading)] text-3xl tracking-wide md:text-4xl">
            FAQ
          </h2>
          <div className="mt-2">
            <SectionHeadingAccent />
          </div>

          <div className="mt-8 grid w-full gap-3 md:mt-10">
            {faq.map((f, i) => (
              <FaqRow key={f.question} idx={i} question={f.question} answer={f.answer} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
