"use client";

import { contacts, leadForm } from "@/content/siteContent";
import { LeadRequestForm } from "@/components/LeadRequestForm";
import { Section } from "@/components/Section";
import { SectionHeadingAccent } from "@/components/SectionHeadingAccent";
import { motion } from "framer-motion";
import { revealVariants, usePrefersReducedMotion } from "@/lib/motion";

export function Contacts() {
  const reduced = usePrefersReducedMotion();
  // TODO: добавить ссылку на политику обработки данных
  // TODO: вставить телефон/адрес/режим работы/мессенджеры (см. content/siteContent.ts)

  return (
    <Section id="contacts" className="relative bg-surface-panel text-ink industrialStripes">
      <div className="layout-container section-y-spacious">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-[var(--font-heading)] text-3xl tracking-wide md:text-4xl">
              {contacts.title}
            </h2>
            <SectionHeadingAccent />
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink/70">{contacts.text}</p>

            <div className="mt-8 grid gap-4">
              {[
                { label: "Телефон", value: contacts.todos.phone || "—" },
                { label: "Адрес", value: contacts.todos.address || "—" },
                { label: "Режим работы", value: contacts.todos.hours || "—" },
                { label: "WhatsApp", value: contacts.todos.whatsapp || "—" },
                { label: "Telegram", value: contacts.todos.telegram || "—" },
              ].map((row, i) => (
                <motion.div
                  key={row.label}
                  custom={i}
                  initial={reduced ? false : "hidden"}
                  whileInView={reduced ? undefined : "show"}
                  viewport={{ once: true, amount: 0.2 }}
                  variants={revealVariants}
                  className="rounded-3xl border border-black/10 bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,.06)]"
                >
                  <div className="font-[var(--font-heading)] text-[10px] uppercase tracking-[0.12em] text-ink/55">
                    {row.label}
                  </div>
                  <div className="mt-1 text-base text-ink/90">{row.value}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="max-w-[min(100%,400px)] justify-self-start md:max-w-none">
            <LeadRequestForm
              density="compact"
              title={leadForm.contactsCardTitle}
              description={leadForm.contactsCardHint}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

