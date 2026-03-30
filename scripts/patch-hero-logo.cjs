/**
 * Убирает фон-«шахматку» у hero-logo-buivol.png: в этом файле фон часто как тёмно-серые
 * нейтральные клетки (#404040, #202020), а не светлая сетка.
 * Чистые чёрные пиксели (силуэт) не трогаем — иначе пропадёт бык.
 * Запуск: node scripts/patch-hero-logo.cjs
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const input = path.join(__dirname, "..", "public", "hero-logo-buivol.png");
const tmp = input + ".tmp.png";

(async () => {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let cleared = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const v = (r + g + b) / 3;
    const chroma = Math.max(r, g, b) - Math.min(r, g, b);
    // Нейтральный «серый» фон шахматки (не чистый чёрный, не цветные детали)
    const neutral = chroma < 18;
    const grayBg = neutral && v >= 22 && v <= 118;
    // Очень светлые клетки / мат (если есть)
    const lightMat = v > 200 && chroma < 45;
    if (grayBg || lightMat || v > 248) {
      data[i + 3] = 0;
      cleared++;
    }
  }
  await sharp(Buffer.from(data), {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(tmp);
  fs.renameSync(tmp, input);
  console.log("OK:", info.width, "x", info.height, "pixels cleared:", cleared);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
