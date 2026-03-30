"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#0e0e10] px-6 py-16 text-center text-white">
      <p className="font-[var(--font-heading)] text-lg uppercase tracking-wide text-white/90 md:text-xl">
        Не удалось загрузить страницу
      </p>
      <p className="max-w-md text-sm leading-relaxed text-white/65">
        Произошла ошибка при отображении. Нажмите кнопку ниже — страница попробует восстановиться без
        полного перезапуска сервера.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-brand-red px-6 py-2.5 text-sm font-medium text-white shadow-[0_8px_28px_rgba(192,57,43,.35)] transition hover:bg-[#b4362a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/75"
        >
          Попробовать снова
        </button>
        <button
          type="button"
          onClick={() => {
            window.location.href = "/";
          }}
          className="rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-sm text-white/90 transition hover:border-orange-400/35 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50"
        >
          На главную
        </button>
      </div>
    </div>
  );
}
