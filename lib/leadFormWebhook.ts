/**
 * Webhook Google Apps Script → Telegram (обработка на стороне скрипта).
 * Замените URL при смене деплоя: см. LEAD_FORM_WEBHOOK_URL ниже.
 *
 * В Apps Script: doPost(e), JSON из e.postData.contents; ответ 200 + JSON и CORS
 * (иначе браузер заблокирует fetch). При необходимости обработайте OPTIONS для preflight.
 */
export const LEAD_FORM_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycby-3jBdo4-1tRXC3M0sDyw2UmX9f0prJpCZ7isyVQkzPhiJbQSljL0xt7Ahg8Vjwz5OFg/exec";

const SOURCE_LABEL = "Сайт Buivol Motor";

/** Россия: +7/8 и 10 цифр, допускаются пробелы, скобки, дефисы. */
export function isValidRussianPhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && /^[78]\d{10}$/.test(digits)) return true;
  if (digits.length === 10 && /^\d{10}$/.test(digits)) return true;
  return false;
}

export async function postLeadForm(body: {
  name: string;
  phone: string;
  message: string;
}): Promise<void> {
  const res = await fetch(LEAD_FORM_WEBHOOK_URL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      name: body.name,
      phone: body.phone,
      message: body.message,
      source: SOURCE_LABEL,
    }),
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
}
