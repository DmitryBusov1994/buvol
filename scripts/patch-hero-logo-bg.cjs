/**
 * Убирает фон-«шахматку» у hero-логотипа по тому же принципу, что patch-hero-logo.cjs
 * для hero-logo-buivol.png:
 *
 * Проход 1 — дословно patch-hero-logo.cjs (chroma < 18, серое 22–118, светлые клетки).
 * Для JPEG-исходника chroma < 22 (блоки сжатия иначе не считаются «нейтральными»).
 *
 * Проход 2 — только оставшиеся непрозрачные пиксели: лёгкий цветовой шум у серой
 * шахматки (chroma 18…30, яркость ~72…182). Огонь/металл с насыщенностью выше не трогаем.
 *
 * Без BFS с краёв — он портил антиалиасинг и тёмные детали.
 *
 * Исходник (первый найденный):
 *   hero-logo-source.png (новый экспорт) → hero-logo-buivol.png (как в fix-hero-logo) → hero-logo.jpg → hero-logo.png
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputSourcePng = path.join(__dirname, "..", "public", "hero-logo-source.png");
const inputBuivolPng = path.join(__dirname, "..", "public", "hero-logo-buivol.png");
const inputJpg = path.join(__dirname, "..", "public", "hero-logo.jpg");
const outputPng = path.join(__dirname, "..", "public", "hero-logo.png");
const tmp = outputPng + ".tmp.png";

function passOneClear(r, g, b, chromaMax) {
  const v = (r + g + b) / 3;
  const chroma = Math.max(r, g, b) - Math.min(r, g, b);
  const neutral = chroma < chromaMax;
  const grayBg = neutral && v >= 22 && v <= 118;
  const lightMat = v > 200 && chroma < 45;
  return grayBg || lightMat || v > 248;
}

/** Остатки шахматки после JPEG / цветового шума */
function passTwoFringeClear(r, g, b) {
  const v = (r + g + b) / 3;
  const chroma = Math.max(r, g, b) - Math.min(r, g, b);
  return chroma >= 18 && chroma < 30 && v >= 72 && v <= 182;
}

(async () => {
  const input = fs.existsSync(inputSourcePng)
    ? inputSourcePng
    : fs.existsSync(inputBuivolPng)
      ? inputBuivolPng
      : fs.existsSync(inputJpg)
        ? inputJpg
        : outputPng;
  if (!fs.existsSync(input)) {
    console.error("Нет файла:", inputSourcePng, "/", inputBuivolPng, "/", inputJpg, "/", outputPng);
    process.exit(1);
  }

  const chromaPass1 = /\.jpe?g$/i.test(input) ? 22 : 18;
  console.log("input:", path.basename(input), "| pass1 chroma <", chromaPass1);

  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;

  let n1 = 0;
  let n2 = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (passOneClear(r, g, b, chromaPass1)) {
      data[i + 3] = 0;
      n1++;
    }
  }
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (passTwoFringeClear(r, g, b)) {
      data[i + 3] = 0;
      n2++;
    }
  }

  await sharp(Buffer.from(data), {
    raw: { width: w, height: h, channels: 4 },
  })
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(tmp);

  fs.renameSync(tmp, outputPng);
  console.log("OK:", w, "x", h, "→ hero-logo.png | pass1:", n1, "pass2:", n2);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
