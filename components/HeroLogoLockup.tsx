"use client";

import { motion, type Transition } from "framer-motion";

type HeroLogoLockupProps = {
  lineTop: string;
  lineBottom: string;
  reduced: boolean | null;
  t: Transition;
};

/**
 * Hero: слот под эмблему (пока пустой, под ручную доработку / Figma) + две строки названия.
 * Размеры слота совпадают с designSpec.layout.figma.heroLogoEmblemSlot.
 */
export function HeroLogoLockup({ lineTop, lineBottom, reduced, t }: HeroLogoLockupProps) {
  const emblemSize = "min(50svh, 420px)";
  const emblemW = "max(16.67vw, 148px)";

  return (
    <motion.h1
      className="m-0 flex w-full max-w-full flex-col items-center gap-6 sm:gap-8 md:flex-row md:items-center md:gap-8 lg:gap-10"
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduced ? undefined : { ...t, delay: 0.05 }}
    >
      {/* Резерв под эмблему: без контента; в Figma — пустой фрейм с теми же размерами */}
      <span
        className="hero-logo-emblem-slot shrink-0"
        style={{
          width: emblemW,
          minWidth: "max(16.67vw, 148px)",
          height: emblemSize,
          maxHeight: "min(50svh, 420px)",
        }}
        aria-hidden="true"
      />

      <span
        className="logo-hero-stack flex min-w-0 flex-1 flex-col justify-center gap-0"
        style={{
          minHeight: emblemSize,
          maxHeight: "min(50svh, 420px)",
        }}
      >
        <span className="logo-hero-word-top whitespace-nowrap">{lineTop}</span>
        <span className="logo-hero-word-bottom whitespace-nowrap">{lineBottom}</span>
      </span>
    </motion.h1>
  );
}
