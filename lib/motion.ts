import { useReducedMotion } from "framer-motion";

export function usePrefersReducedMotion() {
  return useReducedMotion();
}

const easeOutQuart = [0.22, 1, 0.36, 1] as const;

export const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOutQuart, delay: i * 0.1 },
  }),
};

export const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOutQuart } },
};

export const leftSlideVariants = {
  hidden: { opacity: 0, x: -20 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easeOutQuart, delay: i * 0.08 },
  }),
};

export const diagonalVariants = {
  hidden: { opacity: 0, scale: 0.92, x: -10, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.52, ease: easeOutQuart, delay: (i % 2) * 0.06 + i * 0.06 },
  }),
};

export const rotateInVariants = {
  hidden: { opacity: 0, rotate: -15, scale: 0.92 },
  show: (i: number) => ({
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.48, ease: easeOutQuart, delay: i * 0.1 },
  }),
};

