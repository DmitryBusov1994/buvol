export function Footer({ className = "" }: { className?: string }) {
  return (
    <footer className={["bg-surface-darker", className].filter(Boolean).join(" ")}>
      <div className="layout-container py-10 text-sm text-white/60">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <a
            href="#hero"
            className="group min-w-0 leading-tight text-left transition-opacity hover:opacity-95"
          >
            <div className="logo-header-brand">
              <span className="logo-header-word-top">БУЙВОЛ</span>
              <span className="logo-header-word-bottom">МОТОРС</span>
            </div>
            <div className="text-xs text-orange-200/75">
              Екатеринбург • ремонт и ТО грузовой техники
            </div>
          </a>
          <div className="text-xs">
            © {new Date().getFullYear()} • <span className="text-white/70">TODO: реквизиты</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

