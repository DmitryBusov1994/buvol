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
    <div className="rounded-xl border border-black/10 bg-white">
      <p className="border-b border-black/10 px-3 py-2 text-xs leading-snug text-ink/65 md:px-4 md:text-[13px]">
        Итоговую сумму согласуем после осмотра и объёма работ.
      </p>

      <div className="p-2 md:p-3">
        <div className="pricelist-scroll max-h-[min(60vh,640px)] overflow-y-auto rounded-lg border border-black/10 bg-surface-light p-2 md:p-3">
          <div className="space-y-3 md:space-y-4">
            {fullPricelistSections.map((section) => (
              <article
                key={section.sectionTitle}
                className="overflow-hidden rounded-xl border border-black/10 bg-white"
              >
                <div className="sticky top-0 z-[2] border-b border-black/10 bg-white/95 px-3 py-2 backdrop-blur-sm md:px-4 md:py-2.5">
                  <h3 className="font-[var(--font-heading)] text-sm tracking-wide text-ink md:text-base">
                    {section.sectionTitle}
                  </h3>
                </div>
                <ul className="divide-y divide-black/[0.06]">
                  {section.items.map((row) => {
                    const { label, price } = splitPriceLine(row.line);
                    const isIntroBlock = section.sectionTitle === "Прайс-лист" && price === null;

                    if (isIntroBlock) {
                      return (
                        <li key={row.line} className="px-3 py-4 text-center md:px-4 md:py-5">
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
                          <div className="px-3 py-2.5 text-sm leading-relaxed text-ink/80 md:px-4 md:py-3 md:text-[15px]">
                            {label}
                          </div>
                        ) : (
                          <div className="flex flex-col gap-0.5 px-3 py-1.5 transition-colors hover:bg-black/[0.02] sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 md:px-4 md:py-1.5">
                            <span className="min-w-0 flex-1 text-sm leading-snug text-ink/88 md:text-[15px]">
                              {label}
                            </span>
                            <span className="shrink-0 text-sm font-medium tabular-nums text-ink sm:text-right md:text-base">
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
