"use client";

import type { MotionValue } from "framer-motion";
import { motion, useTransform } from "framer-motion";
import { useId } from "react";

type Props = {
  reduced: boolean;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  scrollY: MotionValue<number>;
};

/** Пачки искр: короткая вспышка как от сварки/болгарки, редкие циклы */
const SPARK_BURSTS: { left: string; top: string; phase: number; period: number }[] = [
  { left: "12%", top: "58%", phase: 0, period: 5.8 },
  { left: "86%", top: "44%", phase: 1.9, period: 6.4 },
  { left: "78%", top: "78%", phase: 3.2, period: 5.2 },
  { left: "22%", top: "82%", phase: 4.6, period: 6.1 },
  { left: "52%", top: "36%", phase: 2.4, period: 7.0 },
  { left: "94%", top: "62%", phase: 5.5, period: 5.5 },
  { left: "8%", top: "34%", phase: 6.8, period: 6.8 },
];

const STREAKS = [
  { rot: -8, len: 22, x: 0, y: 0 },
  { rot: 42, len: 16, x: 2, y: -3 },
  { rot: 18, len: 18, x: -4, y: 1 },
  { rot: -55, len: 12, x: 6, y: 2 },
  { rot: 72, len: 14, x: -2, y: 4 },
  { rot: -28, len: 20, x: 3, y: -5 },
] as const;

function WeldingSparkBurst({
  left,
  top,
  phase,
  period,
}: {
  left: string;
  top: string;
  phase: number;
  period: number;
}) {
  return (
    <div className="absolute" style={{ left, top }} aria-hidden>
      {STREAKS.map((s, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            left: s.x,
            top: s.y,
            transform: `rotate(${s.rot}deg)`,
            transformOrigin: "0 50%",
          }}
        >
          <motion.span
            className="block rounded-[1px]"
            style={{
              width: s.len,
              height: 3,
              transformOrigin: "0% 50%",
              mixBlendMode: "plus-lighter",
              background:
                "linear-gradient(90deg, #ffffff 0%, #fff6dd 18%, #ffaa44 45%, rgba(255,70,30,0.75) 72%, transparent 100%)",
              boxShadow:
                "0 0 6px rgba(255,255,255,0.95), 0 0 14px rgba(255,200,100,0.85), 0 0 22px rgba(255,100,40,0.5)",
            }}
            animate={{
              opacity: [0, 0, 0, 0, 1, 0.92, 0.35, 0, 0, 0, 0, 0],
              scaleX: [0.15, 0.15, 0.15, 0.15, 1.15, 0.75, 0.25, 0.15, 0.15, 0.15, 0.15, 0.15],
            }}
            transition={{
              duration: period,
              repeat: Infinity,
              ease: "easeOut",
              delay: phase + i * 0.022,
              times: [0, 0.05, 0.1, 0.72, 0.76, 0.785, 0.81, 0.84, 0.88, 0.92, 0.96, 1],
            }}
          />
        </span>
      ))}
      <motion.span
        className="absolute -left-1 -top-1 h-2 w-2 rounded-full"
        style={{
          background: "radial-gradient(circle, #fff 0%, rgba(255,200,120,0.5) 45%, transparent 70%)",
          mixBlendMode: "plus-lighter",
          boxShadow: "0 0 10px #fff, 0 0 20px rgba(255,160,60,0.9)",
        }}
        animate={{
          opacity: [0, 0, 0, 0, 1, 0.5, 0, 0, 0, 0, 0, 0],
          scale: [0.3, 0.3, 0.3, 0.3, 1.4, 0.6, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3],
        }}
        transition={{
          duration: period,
          repeat: Infinity,
          ease: "easeOut",
          delay: phase,
          times: [0, 0.05, 0.1, 0.72, 0.755, 0.78, 0.82, 0.88, 0.92, 0.96, 0.98, 1],
        }}
      />
    </div>
  );
}

export function HeroWorkshopAtmosphere({
  reduced,
  parallaxX,
  parallaxY,
  scrollY,
}: Props) {
  const filterId = `hero-smoke-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const driftX = useTransform([parallaxX, scrollY], (v) => {
    const px = v[0] as number;
    const sy = v[1] as number;
    return px * 0.38 + sy * 0.018;
  });
  const driftY = useTransform([parallaxY, scrollY], (v) => {
    const py = v[0] as number;
    const sy = v[1] as number;
    return py * 0.32 + sy * 0.055;
  });

  const driftXAlt = useTransform([parallaxX, scrollY], (v) => {
    const px = v[0] as number;
    const sy = v[1] as number;
    return px * -0.26 + sy * -0.014;
  });
  const driftYAlt = useTransform([parallaxY, scrollY], (v) => {
    const py = v[0] as number;
    const sy = v[1] as number;
    return py * -0.22 + sy * 0.038;
  });

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

      {/*
        Дым/пар: только нижняя и боковая зона + маска «просвет» под логотип и текст.
        Центральная эллипса слабее — контент читается.
      */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          maskImage:
            "radial-gradient(ellipse 76% 72% at 50% 40%, transparent 0%, transparent 44%, rgba(0,0,0,0.45) 62%, black 88%), linear-gradient(to top, black 0%, black 56%, rgba(0,0,0,0.35) 72%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 76% 72% at 50% 40%, transparent 0%, transparent 44%, rgba(0,0,0,0.45) 62%, black 88%), linear-gradient(to top, black 0%, black 56%, rgba(0,0,0,0.35) 72%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
        aria-hidden
      >
        <div className="absolute inset-x-0 bottom-0 h-[58%]">
          <motion.div className="relative h-full w-full" style={{ x: driftX, y: driftY }}>
            {/* Пар: явное движение снизу вверх (длинная фаза подъёма, короткое «оседание») */}
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
          </motion.div>

          <motion.div className="pointer-events-none absolute inset-0" style={{ x: driftXAlt, y: driftYAlt }}>
            <motion.div
              className="absolute bottom-[12%] left-0 top-[18%] w-[16%] opacity-50 mix-blend-screen"
              style={{
                filter: "blur(36px)",
                background: "linear-gradient(90deg, rgba(200,200,204,0.45) 0%, rgba(160,160,165,0.12) 70%, transparent 100%)",
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
                background: "linear-gradient(270deg, rgba(198,198,202,0.4) 0%, rgba(155,155,160,0.1) 68%, transparent 100%)",
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
          </motion.div>
        </div>
      </div>

      {/* Искры поверх дыма, в основном по краям и низу — не лезут в центр текста */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          maskImage:
            "radial-gradient(ellipse 72% 68% at 50% 40%, transparent 0%, transparent 36%, rgba(0,0,0,0.25) 58%, black 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 72% 68% at 50% 40%, transparent 0%, transparent 36%, rgba(0,0,0,0.25) 58%, black 100%)",
        }}
        aria-hidden
      >
        <motion.div style={{ x: driftX, y: driftY }} className="absolute inset-0">
          {SPARK_BURSTS.map((b, i) => (
            <WeldingSparkBurst
              key={i}
              left={b.left}
              top={b.top}
              phase={b.phase * 0.12}
              period={b.period}
            />
          ))}
        </motion.div>
      </div>
    </>
  );
}
