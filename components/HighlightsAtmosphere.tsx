"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * Дымка в духе HeroWorkshopAtmosphere: нижняя зона + края, без parallax.
 * Маска вырезает центр под три карточки — текст не закрывается.
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
            <feTurbulence type="fractalNoise" baseFrequency="0.018 0.048" numOctaves="3" seed="29" result="n" />
            <feColorMatrix
              in="n"
              type="matrix"
              values="0.92 0 0 0 0.9 0.92 0 0 0 0.9 0.92 0 0 0 0.9 0 0 0 0.28 0"
              result="g"
            />
            <feGaussianBlur in="g" stdDeviation="14" result="b" />
            <feComponentTransfer in="b" result="o">
              <feFuncA type="linear" slope="0.68" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      <div
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          maskImage:
            "radial-gradient(ellipse 92% 88% at 50% 48%, transparent 0%, transparent 54%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.55) 86%, black 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 92% 88% at 50% 48%, transparent 0%, transparent 54%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.55) 86%, black 100%)",
        }}
        aria-hidden
      >
        <div className="absolute inset-x-0 bottom-0 h-[68%]">
          <motion.div
            className="absolute bottom-[-6%] left-[-10%] h-[80%] w-[46%] mix-blend-screen"
            style={{
              filter: "blur(44px)",
              background:
                "radial-gradient(ellipse 40% 34% at 30% 90%, rgba(255,232,210,0.5) 0%, rgba(200,200,202,0.32) 20%, rgba(130,130,135,0.14) 45%, transparent 74%)",
            }}
            animate={{
              y: [8, -28, -24, -32, 6, 8],
              x: [0, 8, 4, -4, 0, 0],
              opacity: [0.42, 0.58, 0.54, 0.48, 0.44, 0.42],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.38, 0.52, 0.68, 0.9, 1],
            }}
          />
          <motion.div
            className="absolute bottom-[-4%] right-[-6%] h-[72%] w-[42%] mix-blend-screen"
            style={{
              filter: "blur(40px)",
              background:
                "radial-gradient(ellipse 38% 30% at 70% 88%, rgba(255,228,205,0.36) 0%, rgba(190,190,194,0.3) 22%, rgba(140,140,145,0.12) 48%, transparent 74%)",
            }}
            animate={{
              y: [6, -26, -22, -28, 4, 6],
              x: [0, -6, -3, 5, 0, 0],
              opacity: [0.4, 0.55, 0.5, 0.44, 0.4],
            }}
            transition={{
              duration: 21,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.1,
              times: [0, 0.4, 0.54, 0.7, 0.88, 1],
            }}
          />
          <motion.div
            className="absolute bottom-[-8%] left-[24%] h-[52%] w-[36%] mix-blend-screen"
            style={{
              filter: "blur(48px)",
              background:
                "radial-gradient(ellipse 52% 26% at 50% 100%, rgba(230,232,235,0.42) 0%, rgba(175,177,182,0.16) 44%, transparent 70%)",
            }}
            animate={{
              y: [12, -38, -32, -44, 10, 12],
              scaleX: [1, 1.05, 1.08, 1.02, 0.98, 1],
              opacity: [0.36, 0.5, 0.46, 0.4, 0.36],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.25,
              times: [0, 0.36, 0.5, 0.65, 0.88, 1],
            }}
          />
          <motion.div
            className="absolute inset-0 mix-blend-soft-light"
            style={{
              filter: `url(#${filterId}) blur(10px)`,
              opacity: 0.26,
            }}
            animate={{ y: [0, -26, -22, -32, 0], opacity: [0.22, 0.32, 0.28, 0.24, 0.22] }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.35, 0.55, 0.75, 1],
            }}
          />
          <motion.div
            className="absolute bottom-[8%] left-0 top-[24%] w-[14%] mix-blend-screen"
            style={{
              filter: "blur(32px)",
              background:
                "linear-gradient(90deg, rgba(200,200,204,0.38) 0%, rgba(160,160,165,0.1) 72%, transparent 100%)",
            }}
            animate={{
              opacity: [0.3, 0.48, 0.4, 0.34, 0.3],
              y: [0, -18, -14, -6, 0],
            }}
            transition={{
              duration: 17,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.42, 0.58, 0.82, 1],
            }}
          />
          <motion.div
            className="absolute bottom-[8%] right-0 top-[24%] w-[12%] mix-blend-screen"
            style={{
              filter: "blur(30px)",
              background:
                "linear-gradient(270deg, rgba(198,198,202,0.34) 0%, rgba(155,155,160,0.08) 70%, transparent 100%)",
            }}
            animate={{
              opacity: [0.28, 0.45, 0.38, 0.32, 0.28],
              y: [0, -16, -12, -5, 0],
            }}
            transition={{
              duration: 19,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.6,
              times: [0, 0.4, 0.56, 0.8, 1],
            }}
          />
        </div>
      </div>
    </>
  );
}
