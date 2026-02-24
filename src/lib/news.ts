export function formatRuDate(iso: string) {
  const d = new Date(iso);

  const formatted = new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);

  return formatted.replace(" г.", "");
}
