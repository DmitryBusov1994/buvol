"use client";

import { publicAsset } from "@/lib/publicPath";

export function FireDivider() {
  return (
    <div className="fire-divider" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={publicAsset("/images/divider_fire.png")} alt="" decoding="async" />
    </div>
  );
}
