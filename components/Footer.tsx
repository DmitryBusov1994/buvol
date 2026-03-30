export function Footer({ className = "" }: { className?: string }) {
  return (
    <footer className={["bg-surface-darker", className].filter(Boolean).join(" ")}>
      <div className="layout-container section-y-compact text-sm text-white/60">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="#hero"
            className="group min-w-0 leading-tight text-left transition-opacity hover:opacity-95"
          >
            <div className="logo-header-brand">
              <span className="logo-header-word-top">БУЙВОЛ</span>
              <span className="logo-header-word-bottom">МОТОР</span>
            </div>
            <div className="text-xs text-orange-200/75">
              Екатеринбург • ремонт и ТО грузовой техники
            </div>
          </a>
          <div className="text-xs text-white/40">
            © {new Date().getFullYear()} • <span className="text-white/50">TODO: реквизиты</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

