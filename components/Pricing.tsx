"use client";

import { useState } from "react";
import { fullPricelistSections } from "@/content/fullPricelist";
import { pricingCards } from "@/content/siteContent";
import { Section } from "@/components/Section";
import { SectionHeadingAccent } from "@/components/SectionHeadingAccent";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/motion";

type PricingTab = "key" | "full";

const PRICE_LINE_SEP = " — ";

function splitPriceLine(line: string): { label: string; price: string | null } {
  const i = line.lastIndexOf(PRICE_LINE_SEP);
  if (i === -1) return { label: line, price: null };
  return {
    label: line.slice(0, i).trim(),
    price: line.slice(i + PRICE_LINE_SEP.length).trim(),
  };
}

export function Pricing() {
  const reduced = usePrefersReducedMotion();
  const [tab, setTab] = useState<PricingTab>("key");

  return (
    <Section id="pricing" className="relative bg-surface-light text-ink industrialStripes">
      <div className="layout-container section-y-default">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <h2 className="font-[var(--font-heading)] text-3xl tracking-wide md:text-4xl">Цены</h2>
            <SectionHeadingAccent />
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink/70">
              Ключевые позиции или полный прайс-лист — переключайте вкладку. Точный объём и стоимость
              определяются после диагностики и согласования.
            </p>
            <div
              className="mt-6 flex flex-wrap gap-2"
              role="tablist"
              aria-label="Режим отображения цен"
            >
              <button
                type="button"
                role="tab"
                aria-selected={tab === "key"}
                onClick={() => setTab("key")}
                className={[
                  "rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber/50",
                  tab === "key"
                    ? "bg-brand-amber text-ink"
                    : "border border-black/15 bg-white/80 text-ink/80 hover:border-black/25 hover:text-ink",
                ].join(" ")}
              >
                Ключевые цены
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "full"}
                onClick={() => setTab("full")}
                className={[
                  "rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber/50",
                  tab === "full"
                    ? "bg-brand-amber text-ink"
                    : "border border-black/15 bg-white/80 text-ink/80 hover:border-black/25 hover:text-ink",
                ].join(" ")}
              >
                Полный прайс
              </button>
            </div>
          </div>
          <a
            href="#contacts"
            className="hidden shrink-0 rounded-2xl bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber/60 md:inline-flex"
          >
            Запросить время
          </a>
        </div>

        {tab === "key" && (
          <div className="mt-10 grid items-start gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pricingCards.map((c, i) => (
              <motion.div
                key={c.title}
                custom={i}
                initial={reduced ? false : { opacity: 0, scale: i === 0 ? 0.85 : 0.9, y: 16 }}
                whileInView={reduced ? undefined : { opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={reduced ? undefined : { duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className="group rounded-2xl border border-black/10 bg-white p-4 shadow-[0_16px_40px_rgba(0,0,0,.055)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(0,0,0,.09)] md:rounded-3xl md:p-5"
              >
                <div className="text-base font-semibold leading-snug">{c.title}</div>
                <div className="mt-2 font-[var(--font-heading)] text-2xl tracking-wide text-ink md:text-3xl">
                  {c.priceRub}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-ink/70">{c.note}</div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === "full" && (
          <div
            className="mt-10 overflow-hidden rounded-3xl border border-brand-amber/25 bg-gradient-to-b from-white via-white to-[#f3f4f6] shadow-[0_24px_60px_rgba(0,0,0,.08)] outline-none ring-1 ring-brand-red/15"
            role="tabpanel"
          >
            <div className="border-b border-black/[0.07] bg-gradient-to-r from-brand-red/[0.06] via-transparent to-brand-amber/[0.08] px-4 py-5 md:px-7 md:py-6">
              <p className="max-w-3xl text-sm leading-relaxed text-ink/75 md:text-[15px]">
                <span className="font-semibold text-ink">Полный прайс</span>
                {" — "}
                ТО и ремонт грузовой техники. Итоговую сумму согласуем после осмотра и объёма работ.
              </p>
            </div>

            <div className="p-3 md:p-5">
              <div
                className="pricelist-scroll max-h-[min(70vh,820px)] overflow-y-auto rounded-2xl border border-brand-amber/20 bg-[#fafbfc] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,.9),inset_0_0_0_1px_rgba(192,57,43,.08)] outline-none focus-visible:ring-2 focus-visible:ring-brand-amber/45 focus-visible:ring-offset-0 md:p-4"
              >
                <div className="space-y-5 pb-1 md:space-y-6">
                  {fullPricelistSections.map((section) => (
                    <article
                      key={section.sectionTitle}
                      className="overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_8px_30px_rgba(0,0,0,.04)]"
                    >
                      <div className="sticky top-0 z-[2] border-b border-black/[0.06] bg-white/95 px-4 py-3 backdrop-blur-md md:px-5 md:py-3.5">
                        <div className="flex items-center gap-3">
                          <span
                            className="h-8 w-1 shrink-0 rounded-full bg-gradient-to-b from-brand-amber to-brand-red"
                            aria-hidden
                          />
                          <h3 className="font-[var(--font-heading)] text-base tracking-wide text-ink md:text-lg">
                            {section.sectionTitle}
                          </h3>
                        </div>
                      </div>
                      <ul className="divide-y divide-black/[0.05]">
                        {section.items.map((row) => {
                          const { label, price } = splitPriceLine(row.line);
                          const isIntroBlock =
                            section.sectionTitle === "Прайс-лист" && price === null;

                          if (isIntroBlock) {
                            return (
                              <li
                                key={row.line}
                                className="px-4 py-5 text-center md:px-6 md:py-6"
                              >
                                <p className="sectionOverline text-ink/55">Буйвол Мотор</p>
                                <p className="mt-2 text-sm font-medium italic leading-relaxed text-ink/70 md:text-[15px]">
                                  {label}
                                </p>
                              </li>
                            );
                          }

                          return (
                            <li key={row.line}>
                              {price === null ? (
                                <div className="px-4 py-3.5 text-sm leading-relaxed text-ink/80 md:px-5 md:py-4 md:text-[15px]">
                                  {label}
                                </div>
                              ) : (
                                <div className="group flex flex-col gap-1 px-4 py-3 transition-colors hover:bg-gradient-to-r hover:from-brand-amber/[0.06] hover:to-transparent sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 md:px-5 md:py-3.5">
                                  <span className="min-w-0 flex-1 text-sm leading-snug text-ink/88 md:text-[15px]">
                                    {label}
                                  </span>
                                  <span className="shrink-0 font-[var(--font-heading)] text-sm tabular-nums tracking-wide text-ink sm:text-right md:text-base">
                                    {price}
                                  </span>
                                </div>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
