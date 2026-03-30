export const designSpec = {
  palette: {
    brandRed: "#C0392B",
    brandAmber: "#F0A500",
    ink: "#0B0B0C",
    surfaceDark: "#121214",
    surfaceDarker: "#0E0E10",
    surfaceLight: "#F6F7F8",
    paper: "#FFFFFF",
  },
  typography: {
    headings: "Russo One (fallback: Oswald)",
    body: "Inter",
    baseFontSizePx: 16,
    baseLineHeight: 1.6,
  },
  layout: {
    maxWidthPx: 1200,
    guttersPx: { mobile: 24, desktop: 48 },
    /** Совпадает с :root в app/globals.css — для переноса в Figma */
    cssVariables: {
      layoutMax: "--layout-max",
      gutter: "--layout-gutter",
      gutterMd: "--layout-gutter-md",
      gridGap: "--layout-grid-gap",
    },
    /** Рекомендуемый фрейм в Figma: auto layout по горизонтали, выравнивание по центру */
    figma: {
      frameWidthPx: 1440,
      contentWidthPx: 1200,
      /** (1440 - 1200) / 2 — визуальные поля до контейнера при mx-auto */
      frameSideMarginPx: 120,
      columns: 12,
      columnGutterPx: 24,
      /** Внутренний padding контейнера на desktop = 48 с каждой стороны */
      note:
        "В Figma: фрейм 1440 → вложенный auto layout max 1200, padding H 48 (или поля 120 без внутреннего padding). Сетка 12 кол., gap 24.",
      /**
       * Hero (#hero): две колонки flex, flex:1, gap 48px, md:flex-row / мобиле column.
       * Логотип: <picture> — hero-logo.webp + hero-logo.png; fetchPriority=high, loading=eager; HERO_LOGO_* = intrinsic. Без mix-blend (читаемость на тёмном фоне). Preload webp в layout.
       */
      heroContent: {
        layout: "flex",
        gapPx: 48,
        logoAsset: "/hero-logo.webp + /hero-logo.png",
        copy: {
          note: "Правая колонка z-[4], md:items-start, md:pt для выравнивания с крупным логотипом",
        },
      },
      fullPricelist: {
        note: "Светлая секция #services: <details id=full-pricelist> → компактный FullPricelistPanel; fullPricelist.ts",
      },
      sectionRhythm: {
        note:
          "Главная: Hero тёмн. → Highlights (3 карточки) тёмн. → Услуги светл. → Кому помогаем тёмн. → Преимущества светл. → Как работаем тёмн. → FAQ светл. → Контакты тёмн. (форма на белой карточке).",
      },
    },
    desktopColumns: { services: 3, advantages: 3 },
  },
  motion: {
    sectionReveal: {
      type: "fade-in + slide-up",
      translateYFromPx: 24,
      staggerMs: { min: 80, max: 120 },
    },
    hover: {
      buttonScale: 1.03,
      durationMs: 150,
      cardLiftPx: 4,
    },
    header: {
      stickyBlur: true,
      transitionMs: 200,
    },
    reducedMotion: "Disable animations when prefers-reduced-motion: reduce",
  },
  accessibility: {
    contrast: "Target WCAG AA: >=4.5:1 for body text; >=3:1 for large text",
    focus: "Visible focus ring on all interactive elements; keyboard-friendly accordions",
    colorReliance: "Do not rely on color alone for state; include icon/text cues",
  },
};

