/**
 * Генерация WebP + сжатых PNG для public/images и логотипа hero.
 * Запуск из корня: npm run optimize:images
 *
 * — icon_step*: вписать в 400×400, без upscale
 * — bg_contact_garage: ширина ≤1920
 * — texture_sparks_smoke, decor_gears_fire_side: длинная сторона ≤800
 * — decor_gears_fire_side_mirrored: flop от обработанного decor (исходный mirrored.png не читаем)
 * — faq_buffalo_simple: ширина ≤900
 * — hero_bg_v1_metal, light_bg_v4_gears: ширина ≤1920 (фоны секций)
 * — hero-logo-source.png → hero-logo.webp (q88), перезапись hero-logo-source.png и hero-logo.png сжатыми 500×500 inside
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const pub = path.join(root, "public");
const imgDir = path.join(pub, "images");

const webpQ = 85;
const webpQHero = 88;

async function toWebpPng(pipeline, outBasePath) {
  const buf = await pipeline.toBuffer();
  await sharp(buf).webp({ quality: webpQ, effort: 4, alphaQuality: 90 }).toFile(`${outBasePath}.webp`);
  await sharp(buf).png({ compressionLevel: 9, effort: 10 }).toFile(`${outBasePath}.png`);
}

async function run() {
  if (!fs.existsSync(imgDir)) {
    console.error("Missing", imgDir);
    process.exit(1);
  }

  // --- Step icons ---
  const stepFiles = fs.readdirSync(imgDir).filter((f) => /^icon_step\d+_.*\.png$/i.test(f));
  for (const name of stepFiles) {
    const base = name.replace(/\.png$/i, "");
    const input = path.join(imgDir, name);
    const p = sharp(input).resize(400, 400, { fit: "inside", withoutEnlargement: true });
    await toWebpPng(p, path.join(imgDir, base));
    console.log("OK:", base, "→ webp + png (≤400)");
  }

  // --- Contact garage background ---
  const garage = path.join(imgDir, "bg_contact_garage.png");
  if (fs.existsSync(garage)) {
    const p = sharp(garage).resize(1920, null, { fit: "inside", withoutEnlargement: true });
    await toWebpPng(p, path.join(imgDir, "bg_contact_garage"));
    console.log("OK: bg_contact_garage → webp + png (≤1920w)");
  }

  // --- Texture & decor (long side 800) ---
  for (const base of ["texture_sparks_smoke", "decor_gears_fire_side"]) {
    const input = path.join(imgDir, `${base}.png`);
    if (!fs.existsSync(input)) continue;
    const meta = await sharp(input).metadata();
    const w = meta.width ?? 0;
    const h = meta.height ?? 0;
    let p = sharp(input);
    if (Math.max(w, h) > 800) {
      p = p.resize(800, 800, { fit: "inside", withoutEnlargement: true });
    }
    await toWebpPng(p, path.join(imgDir, base));
    console.log("OK:", base, "→ webp + png (≤800)");
  }

  // --- Mirrored decor from processed decor_gears_fire_side.png on disk (just written) ---
  const decorPath = path.join(imgDir, "decor_gears_fire_side.png");
  if (fs.existsSync(decorPath)) {
    const decorBuf = await fs.promises.readFile(decorPath);
    const flipped = sharp(decorBuf).flop();
    const buf = await flipped.toBuffer();
    await sharp(buf).webp({ quality: webpQ, effort: 4, alphaQuality: 90 }).toFile(path.join(imgDir, "decor_gears_fire_side_mirrored.webp"));
    await sharp(buf).png({ compressionLevel: 9, effort: 10 }).toFile(path.join(imgDir, "decor_gears_fire_side_mirrored.png"));
    console.log("OK: decor_gears_fire_side_mirrored ← flop(decor_gears_fire_side) optimized");
  }

  // --- Секционные фоны (hero / светлые блоки) ---
  for (const base of ["hero_bg_v1_metal", "light_bg_v4_gears"]) {
    const input = path.join(imgDir, `${base}.png`);
    if (!fs.existsSync(input)) continue;
    const p = sharp(input).resize(1920, null, { fit: "inside", withoutEnlargement: true });
    await toWebpPng(p, path.join(imgDir, base));
    console.log("OK:", base, "→ webp + png (≤1920w)");
  }

  // --- FAQ индикаторы шестерни (кнопка открыто/закрыто) ---
  for (const base of ["faq_gear_indicator_closed", "faq_gear_indicator_open"]) {
    const input = path.join(imgDir, `${base}.png`);
    if (!fs.existsSync(input)) continue;
    const p = sharp(input).resize(96, 96, { fit: "inside", withoutEnlargement: true });
    await toWebpPng(p, path.join(imgDir, base));
    console.log("OK:", base, "→ webp + png (≤96)");
  }

  // --- FAQ buffalo ---
  const faq = path.join(imgDir, "faq_buffalo_simple.png");
  if (fs.existsSync(faq)) {
    const p = sharp(faq).resize(900, null, { fit: "inside", withoutEnlargement: true });
    await toWebpPng(p, path.join(imgDir, "faq_buffalo_simple"));
    console.log("OK: faq_buffalo_simple → webp + png (≤900w)");
  }

  // --- Hero logo (public root) ---
  const heroSrc = path.join(pub, "hero-logo-source.png");
  if (fs.existsSync(heroSrc)) {
    const p = sharp(heroSrc).resize(500, 500, { fit: "inside", withoutEnlargement: true });
    const buf = await p.png({ compressionLevel: 9, effort: 10 }).toBuffer();
    await fs.promises.writeFile(heroSrc, buf);
    await sharp(heroSrc).webp({ quality: webpQHero, effort: 4 }).toFile(path.join(pub, "hero-logo.webp"));
    await sharp(heroSrc).png({ compressionLevel: 9, effort: 10 }).toFile(path.join(pub, "hero-logo.png"));
    console.log("OK: hero-logo-source.png compressed, hero-logo.webp + hero-logo.png");
  }

  console.log("\nDone. Commit new .webp files and updated .png where changed.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
