"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * Дымка с той же силой, что в HeroWorkshopAtmosphere (фильтр, blur, opacity, анимации).
 * Маска как в Hero: radial ∩ linear — просвет под три карточки, снизу и по краям — полная сила.
 */
export function HighlightsAtmosphere() {
  const reduced = usePrefersReducedMotion();
  const filterId = `highlights-smoke-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  if (reduced) return null;

  return (
    <>
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden>
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.016 0.042" numOctaves="4" seed="17" result="n" />
            <feColorMatrix
              in="n"
              type="matrix"
              values="0.95 0 0 0 0.92 0.95 0 0 0 0.92 0.95 0 0 0 0.92 0 0 0 0.35 0"
              result="g"
            />
            <feGaussianBlur in="g" stdDeviation="18" result="b" />
            <feComponentTransfer in="b" result="o">
              <feFuncA type="linear" slope="0.85" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      <div
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          maskImage:
            "radial-gradient(ellipse 80% 76% at 50% 46%, transparent 0%, transparent 46%, rgba(0,0,0,0.45) 60%, black 86%), linear-gradient(to top, black 0%, black 50%, rgba(0,0,0,0.35) 66%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 76% at 50% 46%, transparent 0%, transparent 46%, rgba(0,0,0,0.45) 60%, black 86%), linear-gradient(to top, black 0%, black 50%, rgba(0,0,0,0.35) 66%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
        aria-hidden
      >
        <div className="absolute inset-x-0 bottom-0 h-[58%]">
          <div className="relative h-full w-full">
            <motion.div
              className="absolute bottom-[-8%] left-[-12%] h-[85%] w-[48%] opacity-90 mix-blend-screen"
              style={{
                filter: "blur(52px)",
                background:
                  "radial-gradient(ellipse 42% 35% at 28% 92%, rgba(255,232,210,0.55) 0%, rgba(210,208,206,0.42) 18%, rgba(165,165,168,0.22) 42%, rgba(120,120,125,0.08) 62%, transparent 78%)",
              }}
              animate={{
                y: [12, -52, -48, -58, 8, 12],
                x: [0, 10, 6, -6, 0, 0],
                opacity: [0.72, 0.98, 0.94, 0.88, 0.76, 0.72],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.38, 0.52, 0.68, 0.9, 1],
              }}
            />
            <motion.div
              className="absolute bottom-[-5%] right-[-8%] h-[78%] w-[44%] opacity-85 mix-blend-screen"
              style={{
                filter: "blur(48px)",
                background:
                  "radial-gradient(ellipse 40% 32% at 72% 90%, rgba(255,228,205,0.4) 0%, rgba(200,200,202,0.38) 22%, rgba(150,150,155,0.16) 48%, transparent 74%)",
              }}
              animate={{
                y: [8, -46, -40, -50, 6, 8],
                x: [0, -8, -4, 8, 0, 0],
              }}
              transition={{
                duration: 23,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.4,
                times: [0, 0.4, 0.54, 0.7, 0.88, 1],
              }}
            />
            <motion.div
              className="absolute bottom-[-10%] left-[22%] h-[55%] w-[38%] opacity-70 mix-blend-screen"
              style={{
                filter: "blur(56px)",
                background:
                  "radial-gradient(ellipse 55% 28% at 50% 100%, rgba(235,236,238,0.5) 0%, rgba(180,182,186,0.2) 45%, transparent 72%)",
              }}
              animate={{
                y: [18, -62, -55, -68, 14, 18],
                scaleX: [1, 1.06, 1.1, 1.04, 0.98, 1],
              }}
              transition={{
                duration: 17,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.35,
                times: [0, 0.36, 0.5, 0.65, 0.88, 1],
              }}
            />
            <motion.div
              className="absolute inset-0 opacity-[0.35] mix-blend-soft-light"
              style={{
                filter: `url(#${filterId}) blur(12px)`,
              }}
              animate={{ y: [0, -42, -38, -48, 0] }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.35, 0.55, 0.75, 1],
              }}
            />
            <motion.div
              className="absolute bottom-[5%] left-[35%] right-[20%] h-[40%] opacity-50 mix-blend-screen"
              style={{
                filter: "blur(40px)",
                background:
                  "radial-gradient(ellipse 70% 45% at 50% 100%, rgba(225,226,230,0.35) 0%, rgba(170,172,176,0.12) 55%, transparent 78%)",
              }}
              animate={{
                opacity: [0.34, 0.58, 0.5, 0.42, 0.34],
                y: [6, -38, -32, -44, 6],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.4, 0.55, 0.72, 1],
              }}
            />
          </div>

          <div className="pointer-events-none absolute inset-0">
            <motion.div
              className="absolute bottom-[12%] left-0 top-[18%] w-[16%] opacity-50 mix-blend-screen"
              style={{
                filter: "blur(36px)",
                background:
                  "linear-gradient(90deg, rgba(200,200,204,0.45) 0%, rgba(160,160,165,0.12) 70%, transparent 100%)",
              }}
              animate={{
                opacity: [0.36, 0.58, 0.48, 0.4, 0.36],
                y: [0, -32, -26, -8, 0],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.42, 0.58, 0.82, 1],
              }}
            />
            <motion.div
              className="absolute bottom-[10%] right-0 top-[22%] w-[14%] opacity-45 mix-blend-screen"
              style={{
                filter: "blur(34px)",
                background:
                  "linear-gradient(270deg, rgba(198,198,202,0.4) 0%, rgba(155,155,160,0.1) 68%, transparent 100%)",
              }}
              animate={{
                opacity: [0.32, 0.54, 0.44, 0.36, 0.32],
                y: [0, -28, -22, -6, 0],
              }}
              transition={{
                duration: 21,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
                times: [0, 0.4, 0.56, 0.8, 1],
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
