import { publicAsset } from "@/lib/publicPath";

/** PNG-иконки этапов «Как мы работаем» (public/images/). */
export const HOW_WE_WORK_STEP_ICONS = [
  publicAsset("/images/icon_step1_request.png"),
  publicAsset("/images/icon_step2_diagnostic.png"),
  publicAsset("/images/icon_step3_agreement.png"),
  publicAsset("/images/icon_step4_repair.png"),
  publicAsset("/images/icon_step5_delivery.png"),
] as const;
