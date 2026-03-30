"use client";

import { fullPricelistSections } from "@/content/fullPricelist";

const PRICE_LINE_SEP = " — ";

function splitPriceLine(line: string): { label: string; price: string | null } {
  const i = line.lastIndexOf(PRICE_LINE_SEP);
  if (i === -1) return { label: line, price: null };
  return {
    label: line.slice(0, i).trim(),
    price: line.slice(i + PRICE_LINE_SEP.length).trim(),
  };
}

export function FullPricelistPanel() {
  return (
    <div className="overflow-hidden rounded-3xl border border-brand-amber/25 bg-gradient-to-b from-white via-white to-[#f3f4f6] shadow-[0_24px_60px_rgba(0,0,0,.08)] outline-none ring-1 ring-brand-red/15">
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
                    const isIntroBlock = section.sectionTitle === "Прайс-лист" && price === null;

                    if (isIntroBlock) {
                      return (
                        <li key={row.line} className="px-4 py-5 text-center md:px-6 md:py-6">
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
                          <div className="group flex flex-col gap-1 px-4 py-2 transition-colors hover:bg-gradient-to-r hover:from-brand-amber/[0.06] hover:to-transparent sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 md:px-5 md:py-2">
                            <span className="min-w-0 flex-1 text-sm leading-snug text-ink/88 md:text-[15px]">
                              {label}
                            </span>
                            <span className="shrink-0 text-sm font-medium tabular-nums tracking-wide text-ink sm:text-right md:text-base">
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
  );
}
