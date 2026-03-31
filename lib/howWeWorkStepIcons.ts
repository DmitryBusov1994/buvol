import { publicAsset } from "@/lib/publicPath";

/** Иконки этапов «Как мы работаем»: WebP + PNG fallback (public/images/). */
export const HOW_WE_WORK_STEP_ICONS = [
  {
    webp: publicAsset("/images/icon_step1_request.webp"),
    png: publicAsset("/images/icon_step1_request.png"),
  },
  {
    webp: publicAsset("/images/icon_step2_diagnostic.webp"),
    png: publicAsset("/images/icon_step2_diagnostic.png"),
  },
  {
    webp: publicAsset("/images/icon_step3_agreement.webp"),
    png: publicAsset("/images/icon_step3_agreement.png"),
  },
  {
    webp: publicAsset("/images/icon_step4_repair.webp"),
    png: publicAsset("/images/icon_step4_repair.png"),
  },
  {
    webp: publicAsset("/images/icon_step5_delivery.webp"),
    png: publicAsset("/images/icon_step5_delivery.png"),
  },
] as const;
