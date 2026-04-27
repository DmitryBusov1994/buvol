import type { NextConfig } from "next";

/** Подпуть на GitHub Pages. Локально / preview: не задавайте DEPLOY_TARGET (или не `ghpages`). */
const GH_BASE_PATH = "/buvol";
const isGhPages = process.env.DEPLOY_TARGET === "ghpages";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: isGhPages ? GH_BASE_PATH : "",
  assetPrefix: isGhPages ? `${GH_BASE_PATH}/` : "",
  images: {
    unoptimized: true,
  },
  /** Совпадает с basePath: иначе publicAsset() в клиенте даёт /hero-logo.* → 404 на Pages. */
  env: {
    NEXT_PUBLIC_BASE_PATH: isGhPages
      ? GH_BASE_PATH
      : (process.env.NEXT_PUBLIC_BASE_PATH ?? ""),
  },
  ...(isGhPages ? { trailingSlash: true } : {}),
  /** Иначе при открытии через 127.0.0.1 Next блокирует /_next/* и страница «пустая» */
  allowedDevOrigins: ["127.0.0.1", "localhost"],

  /**
   * На Windows (особенно папки с кириллицей / OneDrive) нативный file watcher часто «теряет»
   * изменения — HMR ломается и кажется, что сайт «падает» после сохранения. Polling стабильнее.
   * Отключить: CHOKIDAR_USEPOLLING=0 в .env.local
   */
  webpack: (config, { dev }) => {
    if (dev) {
      /**
       * Без файлового кэша Webpack в dev реже ловим «Cannot find module './NNN.js'» и 500 после
       * сохранения + F5 (особенно Windows, кириллица в пути, OneDrive). Сборка продакшена не затронута.
       * Отключить принудительно: NEXT_WEBPACK_CACHE=1 в .env.local
       */
      if (process.env.NEXT_WEBPACK_CACHE !== "1") {
        config.cache = false;
      }

      const usePoll =
        process.env.CHOKIDAR_USEPOLLING !== "0" &&
        (process.env.CHOKIDAR_USEPOLLING === "1" || process.platform === "win32");
      config.watchOptions = {
        ...(config.watchOptions ?? {}),
        poll: usePoll ? 1000 : undefined,
        aggregateTimeout: 500,
        ignored: ["**/node_modules", "**/.git"],
      };
    }
    return config;
  },
};

export default nextConfig;
