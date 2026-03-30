/**
 * Убирает сплошной чёрный/тёмный фон у public/hero-logo.jpg: обход с краёв (BFS),
 * чтобы внутренний силуэт (бык, шестерня), не связанный с краем, сохранился.
 * Фон hero (#0e0e10 и градиенты) становится виден «сквозь» прозрачность.
 * Запуск: node scripts/patch-hero-logo-bg.cjs
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const input = path.join(__dirname, "..", "public", "hero-logo.jpg");
const tmp = input + ".tmp.png";

function isBgPixel(r, g, b) {
  const v = (r + g + b) / 3;
  const chroma = Math.max(r, g, b) - Math.min(r, g, b);
  return chroma <= 28 && v <= 52;
}

(async () => {
  if (!fs.existsSync(input)) {
    console.error("Нет файла:", input);
    process.exit(1);
  }

  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;
  const n = w * h;
  const seen = new Uint8Array(n);
  const q = [];

  const at = (x, y) => (y * w + x) * 4;
  const pi = (x, y) => y * w + x;

  function enqueue(x, y) {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const p = pi(x, y);
    if (seen[p]) return;
    const i = at(x, y);
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (!isBgPixel(r, g, b)) return;
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

  let cleared = 0;
  while (q.length) {
    const p = q.pop();
    const y = Math.floor(p / w);
    const x = p - y * w;
    const i = at(x, y);
    if (data[i + 3] === 0) continue;
    data[i + 3] = 0;
    cleared++;

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
  fs.renameSync(tmp, input);
  console.log("OK:", w, "x", h, "edge-connected bg pixels cleared:", cleared);
  if (cleared > n * 0.92) {
    console.warn("Снято >92% пикселей — проверьте PNG, возможно силуэт сливается с краем.");
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
