/**
 * Убирает только нарисованную «шахматку» у hero-логотипа.
 * RGB пикселей не меняем — только альфа (0 = прозрачный фон).
 *
 * 1) Flood fill от всех рёбер изображения: в фон проходим только пиксели,
 *    похожие на клетки шахматки (очень низкая насыщенность + тёмный или
 *    «серый 88» диапазон). Так не затрагивается металл шестерни (у него выше chroma).
 *
 * 2) Сэндвич на самой границе кадра: если слева/справа (или сверху/снизу на углах)
 *    уже фон — снимаем оставшийся 1 px антиалиаса на краю.
 *
 * 3) Микро-островки: пиксель окружён фоном с 4 сторон и выглядит как остаток
 *    клетки — делаем прозрачным (не трогаем тёплые огненные тона).
 *
 * 4) Только сетка: расширяем маску фона в «колодцы» — нейтральный пиксель с ≥4,
 *    затем ≥3 соседями-фоном (низкий chroma, без огня). RGB не меняем.
 *
 * Исходник: hero-logo-source.png → иначе hero-logo.jpg (если есть).
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputSourcePng = path.join(__dirname, "..", "public", "hero-logo-source.png");
const inputJpg = path.join(__dirname, "..", "public", "hero-logo.jpg");
const outputPng = path.join(__dirname, "..", "public", "hero-logo.png");
const tmp = outputPng + ".tmp.png";

/** «Огонь / бронза» — не считаем шахматкой даже при низком chroma */
function isWarmAccent(r, g, b) {
  return r > b + 14 && g > b + 6 && r > 55;
}

/**
 * Пиксель похож на клетку шахматки (тёмная или светлая), без оранжевого.
 * jpeg: чуть мягче пороги.
 */
function isCheckerLike(r, g, b, jpeg) {
  if (isWarmAccent(r, g, b)) return false;
  const v = (r + g + b) / 3;
  const chroma = Math.max(r, g, b) - Math.min(r, g, b);
  const cMax = jpeg ? 14 : 10;
  const vDark = jpeg ? 18 : 14;
  const lo = jpeg ? 72 : 76;
  const hi = jpeg ? 105 : 102;
  if (chroma > cMax) return false;
  if (v < vDark) return true;
  if (v >= lo && v <= hi) return true;
  return false;
}

function floodFromEdges(data, w, h, ch, jpeg) {
  const n = w * h;
  const vis = new Uint8Array(n);
  const q = new Array(n);
  let qt = 0;
  let qh = 0;

  const push = (x, y) => {
    const k = y * w + x;
    if (vis[k]) return;
    const i = k * ch;
    if (!isCheckerLike(data[i], data[i + 1], data[i + 2], jpeg)) return;
    vis[k] = 1;
    q[qh++] = k;
  };

  for (let x = 0; x < w; x++) {
    push(x, 0);
    push(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    push(0, y);
    push(w - 1, y);
  }

  while (qt < qh) {
    const k = q[qt++];
    const x = k % w;
    const y = (k / w) | 0;
    if (x > 0) push(x - 1, y);
    if (x < w - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y < h - 1) push(x, y + 1);
  }
  return vis;
}

/** Закрыть щели на самой рамке: соседи по краю уже фон */
function edgeSandwich(vis, w, h) {
  let changed = false;
  const set = (k) => {
    if (vis[k]) return;
    vis[k] = 1;
    changed = true;
  };
  for (let x = 1; x < w - 1; x++) {
    const k0 = x;
    const k1 = (h - 1) * w + x;
    if (!vis[k0] && vis[k0 - 1] && vis[k0 + 1]) set(k0);
    if (!vis[k1] && vis[k1 - 1] && vis[k1 + 1]) set(k1);
  }
  for (let y = 1; y < h - 1; y++) {
    const k0 = y * w;
    const k1 = y * w + (w - 1);
    if (!vis[k0] && vis[k0 - w] && vis[k0 + w]) set(k0);
    if (!vis[k1] && vis[k1 - w] && vis[k1 + w]) set(k1);
  }
  return changed;
}

/** Островок: 4 соседа — фон, сам похож на клетку / нейтральный шум */
function isStrayCheckerHole(r, g, b, jpeg) {
  if (isWarmAccent(r, g, b)) return false;
  const v = (r + g + b) / 3;
  const chroma = Math.max(r, g, b) - Math.min(r, g, b);
  const cMax = jpeg ? 18 : 14;
  if (chroma > cMax) return false;
  if (v < 28) return true;
  if (v >= 65 && v <= 118) return true;
  return false;
}

function eatFourNeighborHoles(vis, data, w, h, ch, jpeg) {
  let changed = false;
  const n = w * h;
  const next = new Uint8Array(vis);
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const k = y * w + x;
      if (vis[k]) continue;
      if (!vis[k - 1] || !vis[k + 1] || !vis[k - w] || !vis[k + w]) continue;
      const i = k * ch;
      if (!isStrayCheckerHole(data[i], data[i + 1], data[i + 2], jpeg)) continue;
      next[k] = 1;
      changed = true;
    }
  }
  if (changed) {
    for (let i = 0; i < n; i++) if (next[i]) vis[i] = 1;
  }
  return changed;
}

/** Остаток сетки / нейтральный антиалиас: не огонь, не насыщенный металл */
function isNeutralGridResidual(r, g, b, jpeg) {
  if (isWarmAccent(r, g, b)) return false;
  const v = (r + g + b) / 3;
  const chroma = Math.max(r, g, b) - Math.min(r, g, b);
  const cMax = jpeg ? 14 : 12;
  if (chroma > cMax) return false;
  if (v > 118) return false;
  if (r > 138 && r > b + 26 && g > 38) return false;
  return true;
}

/** Закрыть «колодцы» сетки: ≥3 соседа уже фон, пиксель нейтральный */
function expandGridFromEnclosure(vis, data, w, h, ch, jpeg, minNeighbors) {
  let changed = false;
  const n = w * h;
  const next = new Uint8Array(vis);
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const k = y * w + x;
      if (vis[k]) continue;
      const nv = vis[k - 1] + vis[k + 1] + vis[k - w] + vis[k + w];
      if (nv < minNeighbors) continue;
      const i = k * ch;
      if (!isNeutralGridResidual(data[i], data[i + 1], data[i + 2], jpeg)) continue;
      next[k] = 1;
      changed = true;
    }
  }
  if (changed) {
    for (let i = 0; i < n; i++) if (next[i]) vis[i] = 1;
  }
  return changed;
}

(async () => {
  const input = fs.existsSync(inputSourcePng)
    ? inputSourcePng
    : fs.existsSync(inputJpg)
      ? inputJpg
      : null;
  if (!input) {
    console.error("Нет сырого логотипа. Положите public/hero-logo-source.png (или public/hero-logo.jpg).");
    process.exit(1);
  }

  const jpeg = /\.jpe?g$/i.test(input);
  console.log("input:", path.basename(input), "| edge flood (checker-like only), RGB unchanged");

  const { data: rawIn, info } = await sharp(input).raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;
  const ch = info.channels;
  if (ch !== 3) {
    console.error("Ожидается RGB (3 канала), получено:", ch);
    process.exit(1);
  }

  const data = Buffer.alloc(w * h * 4);
  for (let si = 0, di = 0; si < rawIn.length; si += 3, di += 4) {
    data[di] = rawIn[si];
    data[di + 1] = rawIn[si + 1];
    data[di + 2] = rawIn[si + 2];
    data[di + 3] = 255;
  }

  const vis = floodFromEdges(data, w, h, 4, jpeg);
  for (let i = 0; i < 5; i++) {
    if (!edgeSandwich(vis, w, h)) break;
  }
  for (let i = 0; i < 12; i++) {
    if (!eatFourNeighborHoles(vis, data, w, h, 4, jpeg)) break;
  }

  for (let pass = 0; pass < 28; pass++) {
    if (!expandGridFromEnclosure(vis, data, w, h, 4, jpeg, 4)) break;
  }
  for (let pass = 0; pass < 14; pass++) {
    if (!expandGridFromEnclosure(vis, data, w, h, 4, jpeg, 3)) break;
  }

  let cleared = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (vis[y * w + x]) {
        const di = (y * w + x) * 4;
        data[di + 3] = 0;
        cleared++;
      }
    }
  }

  await sharp(Buffer.from(data), {
    raw: { width: w, height: h, channels: 4 },
  })
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(tmp);

  fs.renameSync(tmp, outputPng);
  console.log("OK:", w, "x", h, "→ hero-logo.png | transparent pixels:", cleared);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
