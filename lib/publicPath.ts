/**
 * URL статики из /public с учётом basePath (GitHub Pages: /имя-репозитория).
 * При сборке для Pages: DEPLOY_TARGET=ghpages (basePath и NEXT_PUBLIC_BASE_PATH задаёт next.config).
 */
export function publicAsset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const clean = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${clean}` : clean;
}
