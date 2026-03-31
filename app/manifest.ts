import type { MetadataRoute } from "next";
import { publicAsset } from "@/lib/publicPath";

export default function manifest(): MetadataRoute.Manifest {
  return {
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
}
