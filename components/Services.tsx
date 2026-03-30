"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FullPricelistPanel } from "@/components/FullPricelistPanel";
import { Section } from "@/components/Section";
import { SectionHeadingAccent } from "@/components/SectionHeadingAccent";
import { services } from "@/content/siteContent";
import { motion } from "framer-motion";
import { revealVariants, rotateInVariants, usePrefersReducedMotion } from "@/lib/motion";

function ServiceItems({ groupId }: { groupId: string }) {
  const group = services.find((s) => s.id === groupId) ?? services[0];
  const reduced = usePrefersReducedMotion();

  return (
    <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-5">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:rounded-3xl md:p-5">
        <div className="font-[var(--font-heading)] text-lg tracking-wide text-white md:text-xl">
          {group.title}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-white/70">{group.description}</p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-surface-darker/40 p-4 md:rounded-3xl md:p-5">
        <div className="text-sm font-semibold text-white">Ключевые позиции</div>
        <ul className="mt-3 space-y-2 md:mt-3.5 md:space-y-2.5">
          {group.items.map((it, i) => (
            <motion.li
              key={it.label}
              custom={i}
              initial={reduced ? false : "hidden"}
              whileInView={reduced ? undefined : "show"}
              viewport={{ once: true, amount: 0.3 }}
              variants={revealVariants}
              className="flex items-baseline justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left transition duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(192,57,43,.18)] md:rounded-2xl md:px-4 md:py-2 md:hover:-translate-y-1"
            >
              <span className="min-w-0 flex-1 text-sm leading-snug text-white/75">{it.label}</span>
              <span className="shrink-0 whitespace-nowrap text-sm font-medium tabular-nums text-white">
                {it.priceRub}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Services() {
  const [active, setActive] = useState(services[0].id);
  const reduced = usePrefersReducedMotion();
  const pricelistDetailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const syncHash = () => {
      if (typeof window === "undefined") return;
      if (window.location.hash !== "#full-pricelist") return;
      const el = pricelistDetailsRef.current;
      if (el) {
        el.open = true;
        const smooth =
          typeof window !== "undefined" &&
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        requestAnimationFrame(() =>
          el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" }),
        );
      }
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const tabs = useMemo(
    () =>
      services.map((s) => ({
        id: s.id,
        title: s.title,
      })),
    [],
  );

  return (
    <Section id="services" className="relative bg-surface-dark">
      <div className="absolute inset-0 gearPattern opacity-40" />
      <div className="noiseOverlay" />

      <div className="relative layout-container section-y-spacious">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="font-[var(--font-heading)] text-3xl tracking-wide text-white md:text-4xl">
              Услуги
            </h2>
            <SectionHeadingAccent />
          </div>
        </div>

        {/* Desktop tabs */}
        <div className="mt-10 hidden items-center gap-1 md:flex md:flex-wrap md:gap-2">
          {tabs.map((t) => {
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActive(t.id)}
                className={[
                  "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber/50",
                  isActive
                    ? "bg-brand-amber text-ink"
                    : "border border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white",
                ].join(" ")}
              >
                <motion.span
                  custom={tabs.findIndex((x) => x.id === t.id)}
                  initial={reduced ? false : "hidden"}
                  animate={reduced ? undefined : "show"}
                  variants={rotateInVariants}
                  className="block text-left leading-snug"
                >
                  {t.title}
                </motion.span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 hidden md:block">
          <ServiceItems groupId={active} />
        </div>

        {/* Mobile accordion */}
        <div className="mt-8 grid gap-3 md:hidden">
          {services.map((group, idx) => (
            <motion.details
              key={group.id}
              open={idx === 0}
              className="group rounded-2xl border border-white/10 bg-white/5 p-4 md:rounded-3xl md:p-5"
              initial={reduced ? false : "hidden"}
              whileInView={reduced ? undefined : "show"}
              viewport={{ once: true, amount: 0.2 }}
              variants={revealVariants}
              custom={idx}
            >
              <summary className="cursor-pointer list-none select-none">
                <div className="flex items-center justify-between gap-4">
                  <div className="font-[var(--font-heading)] text-lg tracking-wide text-white md:text-xl">
                    {group.title}
                  </div>
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center self-center text-white/70 transition group-open:rotate-45">
                    +
                  </span>
                </div>
                <div className="mt-1.5 text-sm leading-relaxed text-white/70">{group.description}</div>
              </summary>
              <ul className="mt-3 space-y-2">
                {group.items.map((it) => (
                  <li
                    key={it.label}
                    className="flex items-baseline justify-between gap-4 rounded-xl border border-white/10 bg-surface-darker/40 px-3 py-2 text-left md:rounded-2xl md:px-4 md:py-2"
                  >
                    <span className="min-w-0 flex-1 text-sm leading-snug text-white/75">{it.label}</span>
                    <span className="shrink-0 whitespace-nowrap text-sm font-medium tabular-nums text-white">
                      {it.priceRub}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.details>
          ))}
        </div>

        <details
          ref={pricelistDetailsRef}
          id="full-pricelist"
          className="group mt-10 rounded-2xl border border-white/10 bg-white/5 md:mt-12"
        >
          <summary className="cursor-pointer list-none select-none rounded-2xl px-4 py-4 outline-none transition hover:bg-white/[0.07] focus-visible:ring-2 focus-visible:ring-brand-amber/45 md:px-5 md:py-4">
            <div className="flex items-center justify-between gap-4">
              <span className="font-[var(--font-heading)] text-base tracking-wide text-white md:text-lg">
                Полный прайс-лист
              </span>
              <span
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-lg text-white/80 transition group-open:rotate-45"
                aria-hidden
              >
                +
              </span>
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/65 md:text-[15px]">
              Раскройте список, чтобы посмотреть цены по ТО и ремонту. Итоговую сумму согласуем после осмотра.
            </p>
          </summary>
          <div className="border-t border-white/10 px-3 pb-4 pt-4 md:px-4 md:pb-5 md:pt-5">
            <FullPricelistPanel />
          </div>
        </details>
      </div>
    </Section>
  );
}

