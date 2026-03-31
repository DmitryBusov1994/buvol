import type { Metadata } from "next";
import "./globals.css";
import { Preloader } from "@/components/Preloader";
import { publicAsset } from "@/lib/publicPath";

/** Шрифты через <link>: не блокируют компиляцию dev/build при таймаутах Google (в отличие от next/font/google). */
const googleFontsHref =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Russo+One&display=swap&subset=cyrillic,cyrillic-ext,latin,latin-ext";

export const metadata: Metadata = {
  title: "Буйвол Мотор — ремонт и ТО грузовой техники в Екатеринбурге",
  description:
    "СТО «Буйвол Мотор»: ремонт и техническое обслуживание тягачей, самосвалов, фургонов и спецтехники. Диагностика, ДВС, КПП, тормоза, подвеска, рулевое.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={googleFontsHref} rel="stylesheet" />
        <link
          rel="preload"
          as="image"
          href={publicAsset("/hero-logo.webp")}
          type="image/webp"
        />
        <link rel="icon" href={publicAsset("/images/favicon.ico")} sizes="any" />
        <link
          rel="icon"
          href={publicAsset("/images/favicon-32.png")}
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href={publicAsset("/images/favicon-180.png")} />
        <link
          rel="icon"
          href={publicAsset("/images/favicon-192.png")}
          type="image/png"
          sizes="192x192"
        />
      </head>
      <body className="min-h-screen antialiased">
        <Preloader />
        {children}
      </body>
    </html>
  );
}

