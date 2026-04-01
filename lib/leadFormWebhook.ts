/**
 * Webhook Google Apps Script → Telegram (обработка на стороне скрипта).
 * Замените URL при смене деплоя: см. LEAD_FORM_WEBHOOK_URL ниже.
 *
 * Тело: application/x-www-form-urlencoded (URLSearchParams). В doPost поля — e.parameter.name и т.д.
 * Не задавайте вручную Content-Type для JSON: скрипт ожидает form-data.
 */
export const LEAD_FORM_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbzrK0i1aOxtUiV2EehKVgDE9sGbTNsI7tMh6YidtwEu8C0mfMeY80kHsQc23cwN4_jcMQ/exec";

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
  const formData = new URLSearchParams();
  formData.append("name", body.name);
  formData.append("phone", body.phone);
  formData.append("message", body.message);
  formData.append("source", SOURCE_LABEL);

  const res = await fetch(LEAD_FORM_WEBHOOK_URL, {
    method: "POST",
    mode: "cors",
    body: formData,
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
}
