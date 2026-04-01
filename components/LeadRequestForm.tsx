"use client";

import { leadForm } from "@/content/siteContent";

type LeadRequestFormProps = {
  /** При fieldsOnly можно не передавать */
  title?: string;
  /** Пустая строка — блок подзаголовка не ренерится */
  description?: string;
  /** Доп. классы на корневую карточку или на form при fieldsOnly */
  className?: string;
  /** Фон карточки: по умолчанию белый; в hero — surface-light */
  surfaceClassName?: string;
  /** Компактные поля и отступы */
  density?: "default" | "compact";
  /** Только поля формы без обёртки-карточки и без заголовка (для вложенного блока) */
  fieldsOnly?: boolean;
};

export function LeadRequestForm({
  title = "",
  description,
  className = "",
  surfaceClassName = "bg-white",
  density = "default",
  fieldsOnly = false,
}: LeadRequestFormProps) {
  const c = leadForm;
  const compact = density === "compact";

  const formClassName = fieldsOnly
    ? [compact ? "grid w-full gap-3" : "grid w-full gap-4", className].filter(Boolean).join(" ")
    : compact
      ? "grid w-full gap-3"
      : "mt-6 grid w-full gap-4";

  const form = (
    <form className={formClassName}>
      <label className="materialize grid gap-1.5 rounded-xl p-0.5">
        <span className={compact ? "text-sm font-medium text-ink/70" : "text-xs font-medium text-ink/70"}>
          {c.nameLabel}
        </span>
        <input
          name="name"
          autoComplete="name"
          className={[
            "w-full rounded-xl border border-black/10 bg-white text-sm outline-none transition focus:border-brand-amber/60 focus:ring-2 focus:ring-brand-amber/20",
            compact ? "h-11 px-4" : "h-11 px-4 rounded-2xl",
          ].join(" ")}
          placeholder={c.namePlaceholder}
        />
      </label>
      <label className="materialize grid gap-1.5 rounded-xl p-0.5">
        <span className={compact ? "text-sm font-medium text-ink/70" : "text-xs font-medium text-ink/70"}>
          {c.phoneLabel}
        </span>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          className={[
            "w-full rounded-xl border border-black/10 bg-white text-sm outline-none transition focus:border-brand-amber/60 focus:ring-2 focus:ring-brand-amber/20",
            compact ? "h-11 px-4" : "h-11 px-4 rounded-2xl",
          ].join(" ")}
          placeholder={c.phonePlaceholder}
        />
      </label>
      <label className="materialize grid gap-1.5 rounded-xl p-0.5">
        <span className={compact ? "text-sm font-medium text-ink/70" : "text-xs font-medium text-ink/70"}>
          {c.problemLabel}
        </span>
        <textarea
          name="message"
          className={[
            "w-full resize-y rounded-xl border border-black/10 bg-white text-sm outline-none transition focus:border-brand-amber/60 focus:ring-2 focus:ring-brand-amber/20",
            compact ? "min-h-[5.5rem] px-4 py-2" : "min-h-28 px-4 py-3 rounded-2xl",
          ].join(" ")}
          placeholder={c.problemPlaceholder}
        />
      </label>

      <button
        type="button"
        className={[
          "cta-button press-flame inline-flex w-full items-center justify-center rounded-xl bg-brand-red text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,120,40,.2),0_8px_28px_rgba(192,57,43,.3)] transition hover:scale-[1.02] hover:bg-[#b4362a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/75 md:w-auto",
          compact ? "mt-1 h-11 px-6 py-3" : "mt-2 h-12 rounded-2xl px-6 hover:scale-[1.03]",
        ].join(" ")}
      >
        {c.submit}
      </button>
      {compact ? (
        <div
          className="pointer-events-none select-none text-[11px] leading-relaxed text-ink/60 invisible"
          aria-hidden
        >
          {c.disclaimer} <span className="text-ink/70">{c.policyNote}</span>
        </div>
      ) : null}
    </form>
  );

  if (fieldsOnly) {
    return form;
  }

  return (
    <div
      className={[
        "rounded-3xl border border-black/10 text-ink shadow-[0_20px_50px_rgba(0,0,0,.06)]",
        compact ? "p-4" : "p-6",
        surfaceClassName,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {title ? <div className="text-sm font-semibold">{title}</div> : null}
      {description ? (
        <p className={compact ? "mt-1.5 text-xs leading-snug text-ink/70" : "mt-2 text-sm text-ink/70"}>
          {description}
        </p>
      ) : compact && title ? (
        <p
          className="pointer-events-none select-none mt-1.5 text-xs leading-snug text-ink/70 invisible"
          aria-hidden
        >
          {c.contactsCardHint}
        </p>
      ) : null}

      {compact ? <div className="mt-4">{form}</div> : form}
    </div>
  );
}
