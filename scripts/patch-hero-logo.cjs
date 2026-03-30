/**
 * Раньше перезаписывал hero-logo-buivol.png — портился исходник со шахматкой.
 * Теперь только запускает тот же пайплайн, что patch-hero-logo-bg.cjs → public/hero-logo.png
 * (buivol.png не меняется).
 */
const path = require("path");
const { spawnSync } = require("child_process");

const script = path.join(__dirname, "patch-hero-logo-bg.cjs");
const r = spawnSync(process.execPath, [script], {
  stdio: "inherit",
  cwd: path.join(__dirname, ".."),
});
process.exit(r.status === null ? 1 : r.status);
