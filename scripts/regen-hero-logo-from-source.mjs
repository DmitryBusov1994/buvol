/**
 * Пересобрать public/hero-logo.webp и public/hero-logo.png из public/hero-logo-source.png
 * (после замены исходника вручную). Сжимает PNG-фолбэк до 500×500 inside + уровень сжатия.
 * Запуск: node scripts/regen-hero-logo-from-source.mjs
 * Полная оптимизация картинок сайта: npm run optimize:images
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "public", "hero-logo-source.png");

const resized = await sharp(src)
  .resize(500, 500, { fit: "inside", withoutEnlargement: true })
  .png({ compressionLevel: 9, effort: 10 })
  .toBuffer();

await fs.promises.writeFile(src, resized);

await sharp(src).webp({ quality: 88, effort: 4 }).toFile(path.join(root, "public", "hero-logo.webp"));
await sharp(src).png({ compressionLevel: 9, effort: 10 }).toFile(path.join(root, "public", "hero-logo.png"));

const m = await sharp(src).metadata();
console.log("OK: hero-logo.webp, hero-logo.png, hero-logo-source.png ← compressed", m.width, "×", m.height);
