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
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="font-[var(--font-heading)] text-3xl tracking-wide md:text-4xl">
              {contacts.title}
            </h2>
            <SectionHeadingAccent />
            <p className="mt-3 max-w-xl text-base leading-relaxed text-ink/70">{contacts.text}</p>

            <div className="mt-8 grid gap-3">
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
                  <div className="text-xs font-medium uppercase tracking-wider text-ink/60">
                    {row.label}
                  </div>
                  <div className="mt-2 font-mono text-sm text-ink/80">{row.value}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <LeadRequestForm
            density="compact"
            title={leadForm.contactsCardTitle}
            description={leadForm.contactsCardHint}
          />
        </div>
      </div>
    </Section>
  );
}

