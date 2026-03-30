/**
 * Пересобрать public/hero-logo.webp и public/hero-logo.png из public/hero-logo-source.png
 * (после замены исходника вручную). Запуск: node scripts/regen-hero-logo-from-source.mjs
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "public", "hero-logo-source.png");

await sharp(src).webp({ quality: 88, effort: 4 }).toFile(path.join(root, "public", "hero-logo.webp"));
await sharp(src).png({ compressionLevel: 9 }).toFile(path.join(root, "public", "hero-logo.png"));

const m = await sharp(src).metadata();
console.log("OK: hero-logo.webp, hero-logo.png ← hero-logo-source.png", m.width, "×", m.height);
