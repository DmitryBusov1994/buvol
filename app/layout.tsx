import type { Metadata } from "next";
import "./globals.css";

/** Шрифты через <link>: не блокируют компиляцию dev/build при таймаутах Google (в отличие от next/font/google). */
const googleFontsHref =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Russo+One&display=swap&subset=cyrillic,cyrillic-ext,latin,latin-ext";

export const metadata: Metadata = {
  title: "Буйвол Моторс — ремонт и ТО грузовой техники в Екатеринбурге",
  description:
    "СТО «Буйвол Моторс»: ремонт и техническое обслуживание тягачей, самосвалов, фургонов и спецтехники. Диагностика, ДВС, КПП, тормоза, подвеска, рулевое.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={googleFontsHref} rel="stylesheet" />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}

