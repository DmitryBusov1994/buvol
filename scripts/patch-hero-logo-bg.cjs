/**
 * Делает фон hero-логотипа прозрачным (как раньше для PNG без «шахматки»/заливки).
 *
 * 1) Глобально: нейтральная серая «матовая» подложка и шахматка (низкий chroma),
 *    светлые клетки — как в patch-hero-logo.cjs, чуть мягче под JPEG.
 * 2) С краёв (BFS): оставшийся тёмный фон, связанный с границей кадра.
 *
 * Исходник (любой один): public/hero-logo-source.png → public/hero-logo.jpg → иначе доработка готового hero-logo.png.
 * Результат: public/hero-logo.png (с альфой).
 * Запуск: node scripts/patch-hero-logo-bg.cjs
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputSourcePng = path.join(__dirname, "..", "public", "hero-logo-source.png");
const inputJpg = path.join(__dirname, "..", "public", "hero-logo.jpg");
const outputPng = path.join(__dirname, "..", "public", "hero-logo.png");
const tmp = outputPng + ".tmp.png";

function isEdgeBgPixel(r, g, b) {
  const v = (r + g + b) / 3;
  const chroma = Math.max(r, g, b) - Math.min(r, g, b);
  return chroma <= 26 && v <= 58;
}

(async () => {
  const input = fs.existsSync(inputSourcePng)
    ? inputSourcePng
    : fs.existsSync(inputJpg)
      ? inputJpg
      : outputPng;
  if (!fs.existsSync(input)) {
    console.error("Нет файла:", inputSourcePng, "/", inputJpg, "/", outputPng);
    process.exit(1);
  }

  const fromRasterSource = input !== outputPng;
  console.log("input:", path.basename(input), fromRasterSource ? "(full pipeline)" : "(edge BFS only)");

  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;
  const n = w * h;

  let globalCleared = 0;
  if (fromRasterSource) {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const v = (r + g + b) / 3;
      const chroma = Math.max(r, g, b) - Math.min(r, g, b);

      const neutral = chroma < 20;
      const grayMatte = neutral && v >= 18 && v <= 128;
      const lightMat = v > 198 && chroma < 48;
      const nearWhite = v > 244 && chroma < 42;

      if (grayMatte || lightMat || nearWhite) {
        data[i + 3] = 0;
        globalCleared++;
      }
    }
  }

  const seen = new Uint8Array(n);
  const q = [];
  const at = (x, y) => (y * w + x) * 4;
  const pi = (x, y) => y * w + x;

  function enqueue(x, y) {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const p = pi(x, y);
    if (seen[p]) return;
    const j = at(x, y);
    if (data[j + 3] === 0) return;
    const r = data[j];
    const g = data[j + 1];
    const b = data[j + 2];
    if (!isEdgeBgPixel(r, g, b)) return;
    seen[p] = 1;
    q.push(p);
  }

  for (let x = 0; x < w; x++) {
    enqueue(x, 0);
    enqueue(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    enqueue(0, y);
    enqueue(w - 1, y);
  }

  let bfsCleared = 0;
  while (q.length) {
    const p = q.pop();
    const y = Math.floor(p / w);
    const x = p - y * w;
    const j = at(x, y);
    if (data[j + 3] === 0) continue;
    data[j + 3] = 0;
    bfsCleared++;

    enqueue(x + 1, y);
    enqueue(x - 1, y);
    enqueue(x, y + 1);
    enqueue(x, y - 1);
  }

  await sharp(Buffer.from(data), {
    raw: { width: w, height: h, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(tmp);

  fs.renameSync(tmp, outputPng);
  console.log(
    "OK:",
    w,
    "x",
    h,
    "→",
    path.basename(outputPng),
    "| global:",
    globalCleared,
    "bfs:",
    bfsCleared,
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
