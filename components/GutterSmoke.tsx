"use client";

import type { MotionValue } from "framer-motion";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/motion";

const SIDE_STYLE =
  "pointer-events-none fixed inset-y-0 z-[25] hidden overflow-hidden md:block";

function SmokeSide({
  side,
  scrollShift,
  layerDelay,
}: {
  side: "left" | "right";
  scrollShift: MotionValue<number>;
  layerDelay: number;
}) {
  const reduced = usePrefersReducedMotion();
  const isLeft = side === "left";

  return (
    <div
      className={`${SIDE_STYLE} ${isLeft ? "left-0" : "right-0"}`}
      style={{
        width: "max(0px, calc((100vw - min(100vw, var(--layout-max))) / 2))",
      }}
      aria-hidden
    >
      <motion.div className="absolute inset-0" style={{ y: scrollShift }}>
        <motion.div
          className={`absolute top-[-15%] h-[130%] w-[140%] opacity-[0.11] mix-blend-screen ${
            isLeft ? "-left-[20%]" : "-right-[20%]"
          }`}
          style={{
            filter: "blur(32px)",
            background: isLeft
              ? "linear-gradient(95deg, rgba(200,90,55,0.55) 0%, rgba(120,45,30,0.2) 45%, transparent 78%)"
              : "linear-gradient(265deg, rgba(180,75,45,0.5) 0%, rgba(90,40,28,0.18) 45%, transparent 78%)",
          }}
          animate={
            reduced
              ? undefined
              : {
                  x: isLeft ? [0, 6, -4, 0] : [0, -6, 4, 0],
                  opacity: [0.09, 0.15, 0.1],
                }
          }
          transition={{
            duration: 14 + layerDelay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: layerDelay,
          }}
        />
        <motion.div
          className={`absolute top-[-5%] h-[120%] w-full opacity-[0.08] mix-blend-soft-light ${
            isLeft ? "left-0" : "right-0"
          }`}
          style={{
            filter: "blur(22px)",
            background: isLeft
              ? "radial-gradient(ellipse 80% 70% at 0% 40%, rgba(255,140,70,0.35), transparent 72%)"
              : "radial-gradient(ellipse 80% 70% at 100% 45%, rgba(255,120,60,0.3), transparent 72%)",
          }}
          animate={
            reduced
              ? undefined
              : {
                  y: [0, 18, -10, 0],
                  scaleY: [1, 1.06, 0.98, 1],
                }
          }
          transition={{
            duration: 11 + layerDelay * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: layerDelay * 0.8,
          }}
        />
      </motion.div>
    </div>
  );
}

export function GutterSmoke() {
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const yShift = useTransform(scrollY, [0, 2400], [0, -160]);
  const smoothY = useSpring(yShift, { stiffness: 38, damping: 32, mass: 0.55 });
  const yShiftSlow = useTransform(scrollY, [0, 2400], [0, -85]);
  const smoothYSlow = useSpring(yShiftSlow, {
    stiffness: 28,
    damping: 38,
    mass: 0.65,
  });
  const scrollOff = useMotionValue(0);
  const leftY = reduced ? scrollOff : smoothY;
  const rightY = reduced ? scrollOff : smoothYSlow;

  return (
    <>
      <SmokeSide side="left" scrollShift={leftY} layerDelay={0} />
      <SmokeSide side="right" scrollShift={rightY} layerDelay={0.6} />
      {/* Узкие экраны: лёгкий акцент по краю viewport */}
      {!reduced && (
        <div
          className="pointer-events-none fixed inset-y-0 left-0 z-[25] w-2 bg-gradient-to-r from-orange-950/25 to-transparent opacity-70 mix-blend-screen md:hidden"
          aria-hidden
        />
      )}
      {!reduced && (
        <div
          className="pointer-events-none fixed inset-y-0 right-0 z-[25] w-2 bg-gradient-to-l from-orange-950/20 to-transparent opacity-70 mix-blend-screen md:hidden"
          aria-hidden
        />
      )}
    </>
  );
}
