/**
 * Formats date and time into standard "25 Oct 2026, 10:00 IST" or "25 Oct 2026"
 * Never returns raw ISO strings.
 */
export function formatDateTimeIST(value: string | number | Date | null | undefined): string {
  if (!value) return "—";
  const date = typeof value === "string" || typeof value === "number" ? new Date(value) : value;
  if (isNaN(date.getTime())) {
    // If it's a date string like "2026-10-25" without time
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [year, month, day] = value.split("-").map(Number);
      const d = new Date(Date.UTC(year, month - 1, day, 4, 30)); // 10:00 IST
      return formatDateOnlyIST(d);
    }
    return String(value);
  }

  const formatted = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  }).format(date);

  return `${formatted} IST`;
}

export function formatDateOnlyIST(value: string | number | Date | null | undefined): string {
  if (!value) return "—";
  const date = typeof value === "string" || typeof value === "number" ? new Date(value) : value;
  if (isNaN(date.getTime())) {
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [year, month, day] = value.split("-").map(Number);
      const d = new Date(Date.UTC(year, month - 1, day, 4, 30));
      return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "Asia/Kolkata",
      }).format(d);
    }
    return String(value);
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(date);
}
