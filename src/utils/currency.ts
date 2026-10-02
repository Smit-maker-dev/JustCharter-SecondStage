export const CURRENCY = {
  code: "INR",
  symbol: "₹",
  locale: "en-IN",
};

const formatter = new Intl.NumberFormat(CURRENCY.locale, {
  style: "currency",
  currency: CURRENCY.code,
  maximumFractionDigits: 0,
});

/**
 * Formats a numeric value into INR currency string (e.g., ₹1,70,000).
 * Returns fallback (null or custom string) if value is unset or 0.
 */
export const formatCurrency = (value?: number | string | null, options: { suffix?: string; fallback?: string | null } = {}): string | null => {
  const { suffix = "", fallback = null } = options;
  const num = Number(value);
  if (value === undefined || value === null || isNaN(num) || num <= 0) {
    return fallback;
  }
  const formatted = formatter.format(num);
  return suffix ? `${formatted} ${suffix.trim()}` : formatted;
};

/**
 * Formats an hourly charter rate (e.g. ₹1,70,000 /hr).
 */
export const formatRate = (value?: number | string | null, fallback: string | null = null): string | null => {
  return formatCurrency(value, { suffix: "/hr", fallback });
};

/**
 * Formats large amounts compactly (e.g. ₹1.5L, ₹1.2Cr).
 */
export const formatCompactCurrency = (value?: number | string | null): string => {
  const num = Number(value || 0);
  if (!num || num === 0) return `${CURRENCY.symbol}0`;
  if (num >= 10000000) return `${CURRENCY.symbol}${(num / 10000000).toFixed(1)}Cr`;
  if (num >= 100000) return `${CURRENCY.symbol}${(num / 100000).toFixed(1)}L`;
  return formatter.format(num);
};
