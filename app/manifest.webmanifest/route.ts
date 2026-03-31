import { NextResponse } from "next/server";
import { publicAsset } from "@/lib/publicPath";

/** С `output: "export"` маршрут должен быть явно статическим. */
export const dynamic = "force-static";

export function GET() {
  const body = {
    name: "Буйвол Мотор",
    short_name: "Буйвол Мотор",
    icons: [
      {
        src: publicAsset("/favicon-192.png"),
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: publicAsset("/favicon-180.png"),
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };

  return NextResponse.json(body, {
    headers: { "Content-Type": "application/manifest+json; charset=utf-8" },
  });
}
