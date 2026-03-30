import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: {
            DEFAULT: "#C0392B",
            100: "#F1C7C1",
            300: "#D97A70",
            500: "#C0392B",
            700: "#9A2E23",
          },
          amber: {
            DEFAULT: "#F0A500",
            100: "#FFE7B3",
            300: "#F7C65E",
            500: "#F0A500",
            700: "#BE8400",
          },
        },
        surface: {
          dark: "#121214",
          darker: "#0E0E10",
          light: "#F6F7F8",
          panel: "#ECEFF1",
        },
        semantic: {
          success: "#2FBF71",
          warning: "#F0A500",
          error: "#D75445",
          info: "#5C8FD6",
        },
        ink: "#0B0B0C",
      },
      boxShadow: {
        lift: "0 20px 50px rgba(0,0,0,.35)",
        glow: "0 0 0 1px rgba(240,165,0,.25), 0 0 40px rgba(192,57,43,.12)",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(800px circle at 20% 10%, rgba(192,57,43,.35), transparent 55%), radial-gradient(700px circle at 80% 20%, rgba(240,165,0,.22), transparent 60%), radial-gradient(900px circle at 55% 85%, rgba(255,255,255,.06), transparent 60%)",
        "hero-truck":
          "linear-gradient(120deg, rgba(14,14,16,.92), rgba(14,14,16,.75)), linear-gradient(180deg, rgba(0,0,0,.35), rgba(0,0,0,.65))",
        "hero-fire-glow":
          "radial-gradient(ellipse 90% 55% at 78% 65%, rgba(255,90,0,.22), transparent 52%), radial-gradient(ellipse 60% 40% at 55% 88%, rgba(220,40,0,.14), transparent 48%), radial-gradient(circle at 20% 80%, rgba(255,140,0,.08), transparent 45%)",
      },
    },
  },
  plugins: [],
} satisfies Config;

