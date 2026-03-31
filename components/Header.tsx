"use client";

import { useEffect, useMemo, useState } from "react";

const nav = [
  { href: "#services", label: "Услуги" },
  { href: "#advantages", label: "Преимущества" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacts", label: "Контакты" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    /** Порядок секций; блок Highlights без id — после hero сразу #services. process → «Преимущества» (нет пункта «Как работаем»). */
    const segments: { id: string; nav: string }[] = [
      { id: "hero", nav: "#hero" },
      { id: "services", nav: "#services" },
      { id: "who", nav: "#services" },
      { id: "advantages", nav: "#advantages" },
      { id: "process", nav: "#advantages" },
      { id: "faq", nav: "#faq" },
      { id: "contacts", nav: "#contacts" },
    ];

    const updateActive = () => {
      const offset = 112;
      const y = window.scrollY + offset;
      let active = "#hero";
      for (const seg of segments) {
        const el = document.getElementById(seg.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= y) active = seg.nav;
      }
      setActiveSection(active);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  const cls = useMemo(() => {
    const base =
      "sticky top-0 z-50 border-b pt-[env(safe-area-inset-top,0px)] transition duration-200";
    const s = scrolled
      ? " bg-surface-darker/70 border-white/10 [backdrop-filter:blur(12px)_saturate(180%)]"
      : " bg-transparent border-transparent";
    return `${base}${s}`;
  }, [scrolled]);

  return (
    <header className={cls}>
      <div className="layout-container flex items-center justify-between gap-3 py-2 md:gap-5">
        <a href="#hero" className="group min-w-0 leading-tight transition-opacity hover:opacity-95">
          <div className="logo-header-brand">
            <span className="logo-header-word-top">БУЙВОЛ</span>
            <span className="logo-header-word-bottom">МОТОР</span>
          </div>
          <div className="text-xs text-orange-200/75">Екатеринбург • грузовая техника</div>
        </a>

        <nav className="hidden items-center justify-center gap-6 md:flex lg:gap-8">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={[
                "relative inline-flex min-h-10 items-center font-[var(--font-heading)] text-[11px] uppercase leading-none tracking-[0.12em] transition hover:text-white lg:text-[13px]",
                activeSection === item.href ? "text-white" : "text-white/80",
              ].join(" ")}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={[
                  "absolute -bottom-1 left-0 h-[2px] rounded-full bg-brand-amber transition-all duration-300",
                  activeSection === item.href ? "w-full opacity-100" : "w-0 opacity-0",
                ].join(" ")}
              />
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            href="#contacts"
            className="press-flame inline-flex shrink-0 rounded-full bg-brand-red px-4 py-2 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,120,40,.2),0_8px_28px_rgba(192,57,43,.35)] transition duration-150 ease-out hover:scale-[1.04] hover:bg-[#b4362a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/75 md:px-5"
          >
            Оставить заявку
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Открыть меню"
          >
            <span className="relative block h-5 w-5">
              <span
                className={[
                  "absolute inset-0 rounded-full border border-brand-amber/70 transition-transform",
                  menuOpen ? "rotate-45" : "rotate-0",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-1/2 top-1/2 h-[2px] w-3 -translate-x-1/2 -translate-y-1/2 rounded bg-brand-amber transition-transform",
                  menuOpen ? "rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-1/2 top-1/2 h-[2px] w-3 -translate-x-1/2 -translate-y-1/2 rounded bg-brand-amber transition-transform",
                  menuOpen ? "-rotate-45" : "translate-y-1.5",
                ].join(" ")}
              />
            </span>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="border-t border-white/10 bg-surface-darker/95 py-4 pl-[var(--layout-gutter)] pr-[var(--layout-gutter)] md:hidden">
          <nav className="grid gap-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="font-[var(--font-heading)] text-[11px] uppercase tracking-[0.12em] text-white/90"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

