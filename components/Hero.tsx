"use client";

import { useCallback, useRef, type PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { hero } from "@/content/siteContent";
import { HeroWorkshopAtmosphere } from "@/components/HeroWorkshopAtmosphere";
import { usePrefersReducedMotion } from "@/lib/motion";
import { publicAsset } from "@/lib/publicPath";

/** Совпадает с intrinsic size public/hero-logo-source.png (исходник; WebP — public/hero-logo.webp). */
const HERO_LOGO_WIDTH = 500;
const HERO_LOGO_HEIGHT = 500;

/** Базовое «дыхание»; левый/правый ноздри — снос в сторону по мере опускания (x синхронен с y). */
const STEAM_BASE = {
  opacity: [0.35, 0.92, 0.38],
  y: [0, 36, 0],
  scaleY: [0.75, 1.22, 0.78],
};
const STEAM_LEFT = {
  ...STEAM_BASE,
  x: [0, -14, 0],
  rotate: [0, -3.5, 0],
};
const STEAM_RIGHT = {
  ...STEAM_BASE,
  x: [0, 14, 0],
  rotate: [0, 3.5, 0],
};

/** «Название · Город» → строка города под H1 */
function splitHeroOverline(overline: string): { main: string; city?: string } {
  const parts = overline.split(/\s*·\s*/).map((s) => s.trim());
  if (parts.length >= 2) return { main: parts[0]!, city: parts.slice(1).join(" · ") };
  return { main: overline };
}

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const logoParallaxX = useMotionValue(0);
  const logoParallaxY = useMotionValue(0);
  const springX = useSpring(logoParallaxX, { stiffness: 28, damping: 22, mass: 0.6 });
  const springY = useSpring(logoParallaxY, { stiffness: 28, damping: 22, mass: 0.6 });

  const resetLogoParallax = useCallback(() => {
    logoParallaxX.set(0);
    logoParallaxY.set(0);
  }, [logoParallaxX, logoParallaxY]);

  const onHeroPointerMove = useCallback(
    (e: PointerEvent<HTMLElement>) => {
      if (reduced) return;
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      logoParallaxX.set(nx * 32);
      logoParallaxY.set(ny * 22);
    },
    [reduced, logoParallaxX, logoParallaxY],
  );

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1200], [0, 360]);
  const t = reduced ? { duration: 0 } : { duration: 0.35, ease: "easeOut" as const };
  const heroCityLine = splitHeroOverline(hero.overline).city;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-0 overflow-hidden bg-[#0e0e10]"
      onPointerMove={onHeroPointerMove}
      onPointerLeave={resetLogoParallax}
      onPointerCancel={resetLogoParallax}
    >
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${publicAsset("/images/hero_bg_v1_metal.webp")}")`,
          ...(reduced ? undefined : { y: bgY }),
        }}
        aria-hidden="true"
      />
      <div className="spark-container z-[1]" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_72%_28%,rgba(255,255,255,.14),transparent_38%)]"
      />
      <div
        aria-hidden="true"
        className="gearRotate pointer-events-none absolute -right-32 top-8 z-[1] h-[26rem] w-[26rem] rounded-full border border-brand-amber/15 opacity-45 md:top-10"
      />
      <div
        className="absolute inset-0 z-[2] bg-gradient-to-r from-[#0e0e10]/95 via-[#0e0e10]/78 to-[#0e0e10]/40 max-md:from-[#0e0e10]/98 max-md:via-[#0e0e10]/92"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[2] bg-gradient-to-t from-[#0e0e10] via-transparent to-[#0e0e10]/50"
        aria-hidden="true"
      />

      <HeroWorkshopAtmosphere
        reduced={Boolean(reduced)}
        parallaxX={springX}
        parallaxY={springY}
        scrollY={scrollY}
      />

      <div className="relative z-[3] layout-container flex min-h-0 flex-col justify-start pb-6 pt-0 md:pb-10 md:pt-1">
        <div className="flex w-full min-w-0 flex-col items-stretch gap-5 md:flex-row md:items-center md:gap-10 lg:gap-11">
          <div className="flex w-full min-w-0 flex-1 justify-start overflow-visible">
            <motion.div
              className="relative -ml-3 block min-w-0 w-full max-w-[min(100%,400px)] bg-transparent sm:max-w-[440px] md:-ml-6 md:inline-block md:w-[min(62vw,580px)] md:max-w-[580px] lg:-ml-8 lg:w-[min(56vw,680px)] lg:max-w-[680px]"
              style={
                reduced
                  ? undefined
                  : {
                      x: springX,
                      y: springY,
                    }
              }
            >
              <motion.div
                className={[
                  "relative w-full bg-transparent p-0",
                  reduced ? "" : "hero-logo-glow",
                ].join(" ")}
                animate={reduced ? undefined : { scale: [1, 1.014, 1] }}
                transition={
                  reduced
                    ? undefined
                    : { duration: 4.2, repeat: Infinity, ease: "easeInOut" }
                }
              >
                <picture>
                  <source type="image/webp" srcSet={publicAsset("/hero-logo.webp")} />
                  <img
                    src={publicAsset("/hero-logo-source.png")}
                    alt="Буйвол Мотор — логотип"
                    width={HERO_LOGO_WIDTH}
                    height={HERO_LOGO_HEIGHT}
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    className="relative z-[1] h-auto w-full bg-transparent object-contain object-left"
                  />
                </picture>
              {/* Пар: столб вниз от ноздрей */}
              {!reduced && (
                <>
                  <div
                    className="pointer-events-none absolute left-[41%] top-[55%] z-[2] h-[42%] w-[11%] -translate-x-1/2"
                    aria-hidden
                  >
                    <motion.div
                      className="absolute left-1/2 top-0 h-[55%] w-full max-w-[3.25rem] -translate-x-1/2 origin-top"
                      style={{
                        mixBlendMode: "screen",
                        filter: "blur(11px)",
                        transformOrigin: "50% 0%",
                        background:
                          "linear-gradient(180deg, rgba(255,252,235,0.98) 0%, rgba(255,195,120,0.55) 28%, rgba(255,130,70,0.22) 55%, rgba(255,90,40,0.06) 78%, transparent 100%)",
                        borderRadius: "45% 45% 60% 60% / 12% 12% 88% 88%",
                      }}
                      animate={STEAM_LEFT}
                      transition={{
                        duration: 2.35,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute left-1/2 top-[8%] h-[48%] w-[70%] max-w-[2.5rem] -translate-x-1/2 origin-top"
                      style={{
                        mixBlendMode: "screen",
                        filter: "blur(14px)",
                        transformOrigin: "50% 0%",
                        background:
                          "linear-gradient(180deg, rgba(255,245,210,0.75) 0%, rgba(255,160,80,0.35) 45%, transparent 92%)",
                        borderRadius: "50% 50% 55% 55% / 10% 10% 90% 90%",
                      }}
                      animate={STEAM_LEFT}
                      transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.35,
                      }}
                    />
                  </div>
                  <div
                    className="pointer-events-none absolute left-[59%] top-[55%] z-[2] h-[42%] w-[11%] -translate-x-1/2"
                    aria-hidden
                  >
                    <motion.div
                      className="absolute left-1/2 top-0 h-[55%] w-full max-w-[3.25rem] -translate-x-1/2 origin-top"
                      style={{
                        mixBlendMode: "screen",
                        filter: "blur(11px)",
                        transformOrigin: "50% 0%",
                        background:
                          "linear-gradient(180deg, rgba(255,252,235,0.98) 0%, rgba(255,195,120,0.55) 28%, rgba(255,130,70,0.22) 55%, rgba(255,90,40,0.06) 78%, transparent 100%)",
                        borderRadius: "45% 45% 60% 60% / 12% 12% 88% 88%",
                      }}
                      animate={STEAM_RIGHT}
                      transition={{
                        duration: 2.35,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.2,
                      }}
                    />
                    <motion.div
                      className="absolute left-1/2 top-[8%] h-[48%] w-[70%] max-w-[2.5rem] -translate-x-1/2 origin-top"
                      style={{
                        mixBlendMode: "screen",
                        filter: "blur(14px)",
                        transformOrigin: "50% 0%",
                        background:
                          "linear-gradient(180deg, rgba(255,245,210,0.75) 0%, rgba(255,160,80,0.35) 45%, transparent 92%)",
                        borderRadius: "50% 50% 55% 55% / 10% 10% 90% 90%",
                      }}
                      animate={STEAM_RIGHT}
                      transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.55,
                      }}
                    />
                  </div>
                </>
              )}
              </motion.div>
            </motion.div>
          </div>
          <div className="relative z-[4] flex w-full min-w-0 max-w-2xl flex-1 flex-col items-center text-center md:items-start md:text-left">
            <motion.h1
              className="mb-4 flex w-full flex-col items-center sm:mb-5 md:items-start lg:mb-6"
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={t}
            >
              <span className="logo-hero-title-brand">
                <span className="logo-hero-title-word-top">БУЙВОЛ</span>
                <span className="logo-hero-title-word-bottom">МОТОР</span>
              </span>
              {heroCityLine ? (
                <span className="mt-2 block w-full text-sm text-orange-200/75 sm:mt-2.5 sm:text-base">
                  {heroCityLine}
                </span>
              ) : null}
            </motion.h1>

            <motion.p
              className="mb-5 max-w-2xl text-base leading-relaxed text-white/90 sm:mb-5 sm:text-lg md:mb-6 lg:text-xl"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={reduced ? undefined : { duration: 0.3, delay: 0.08 }}
            >
              {hero.subheadline}
            </motion.p>

            <motion.ul
              className="mb-0 flex w-full max-w-2xl flex-col items-center gap-3 text-sm text-white/80 md:items-stretch md:flex-row md:flex-wrap md:gap-x-6 md:gap-y-2.5 md:text-[15px]"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={reduced ? undefined : { duration: 0.3, delay: 0.1 }}
            >
              {hero.chips.map((c) => (
                <li key={c} className="flex w-full max-w-md items-start justify-center gap-3 md:max-w-none md:justify-start">
                  <span
                    aria-hidden="true"
                    className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(255,120,40,.85)]"
                  />
                  <span className="leading-relaxed">{c}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              className="mt-5 flex w-full max-w-2xl justify-center md:justify-start md:mt-6"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={reduced ? undefined : { duration: 0.3, delay: 0.12 }}
            >
              <a
                href="#services"
                className="press-flame-ghost inline-flex w-full items-center justify-center rounded-2xl border border-white/18 bg-white/[0.06] px-5 py-3 text-center text-sm font-medium leading-snug text-white/92 transition hover:border-orange-400/35 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50 sm:w-auto sm:justify-start sm:text-left md:px-6 md:text-[15px]"
              >
                {hero.ctaSecondary}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
