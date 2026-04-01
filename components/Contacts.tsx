"use client";

import type { CSSProperties } from "react";
import { contacts, leadForm } from "@/content/siteContent";
import { LeadRequestForm } from "@/components/LeadRequestForm";
import { Section } from "@/components/Section";
import { SectionHeadingAccent } from "@/components/SectionHeadingAccent";
import { motion } from "framer-motion";
import { revealVariants, usePrefersReducedMotion } from "@/lib/motion";
import { publicAsset } from "@/lib/publicPath";

function TelegramGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
      />
    </svg>
  );
}

const contactsDecoStyle = {
  "--contacts-garage-bg": `url("${publicAsset("/images/bg_contact_garage.webp")}")`,
} as CSSProperties;

export function Contacts() {
  const reduced = usePrefersReducedMotion();

  return (
    <Section id="contacts" className="relative bg-surface-dark" style={contactsDecoStyle}>
      <div className="relative layout-container section-y-spacious">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-[var(--font-heading)] text-3xl tracking-wide text-white md:text-4xl">
              {contacts.title}
            </h2>
            <SectionHeadingAccent />
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70">{contacts.text}</p>

            <div className="mt-8 grid gap-4">
              {[
                { label: "Телефон" as const, value: contacts.todos.phone || "—", multiline: true },
                { label: "Адрес" as const, value: contacts.todos.address || "—" },
                { label: "Режим работы" as const, value: contacts.todos.hours || "—" },
                { label: "Telegram" as const, value: contacts.todos.telegram || "—" },
              ].map((row, i) => {
                const tgHref = row.label === "Telegram" ? contacts.todos.telegramHref : undefined;
                return (
                  <motion.div
                    key={row.label}
                    custom={i}
                    initial={reduced ? false : "hidden"}
                    whileInView={reduced ? undefined : "show"}
                    viewport={{ once: true, amount: 0.2 }}
                    variants={revealVariants}
                    className="flex h-full min-h-0 flex-col rounded-2xl border border-white/10 bg-white/5 px-3.5 py-3.5 transition hover:-translate-y-0.5 hover:bg-white/[0.07] md:px-4 md:py-4"
                  >
                    <div className="font-[var(--font-heading)] text-[10px] uppercase tracking-[0.12em] text-white/55">
                      {row.label}
                    </div>
                    {row.label === "Telegram" && tgHref ? (
                      <div className="mt-1 text-base text-white/90">
                        <a
                          href={tgHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2.5 rounded-lg text-white/90 outline-none transition hover:text-white focus-visible:ring-2 focus-visible:ring-orange-400/60"
                          aria-label={`Telegram ${contacts.todos.telegram}`}
                        >
                          <TelegramGlyph className="h-7 w-7 shrink-0 text-[#2AABEE]" />
                          <span>{contacts.todos.telegram}</span>
                        </a>
                      </div>
                    ) : (
                      <div
                        className={
                          "multiline" in row && row.multiline
                            ? "mt-1 whitespace-pre-line text-base text-white/90"
                            : "mt-1 text-base text-white/90"
                        }
                      >
                        {row.value}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="max-w-[min(100%,400px)] justify-self-start md:max-w-none">
            <LeadRequestForm density="compact" title={leadForm.contactsCardTitle} surfaceClassName="bg-white" />
          </div>
        </div>
      </div>
    </Section>
  );
}
