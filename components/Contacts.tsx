"use client";

import { contacts, leadForm } from "@/content/siteContent";
import { LeadRequestForm } from "@/components/LeadRequestForm";
import { Section } from "@/components/Section";
import { SectionHeadingAccent } from "@/components/SectionHeadingAccent";
import { motion } from "framer-motion";
import { revealVariants, usePrefersReducedMotion } from "@/lib/motion";

export function Contacts() {
  const reduced = usePrefersReducedMotion();

  return (
    <Section id="contacts" className="relative bg-surface-dark">
      <div className="absolute inset-0 gearPattern opacity-40" />
      <div className="noiseOverlay" />
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
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="font-[var(--font-heading)] text-[10px] uppercase tracking-[0.12em] text-white/55">
                    {row.label}
                  </div>
                  <div className="mt-1 text-base text-white/90">{row.value}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="max-w-[min(100%,400px)] justify-self-start md:max-w-none">
            <LeadRequestForm
              density="compact"
              title={leadForm.contactsCardTitle}
              description={leadForm.contactsCardHint}
              surfaceClassName="bg-white"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
