export interface SpecItem {
  label: string;
  value: string;
}

/**
 * Validates and formats a single specification value with the appropriate aviation unit.
 * If value is missing, empty, zero, or "—", returns null so the caller can HIDE the row.
 * Ground rule: Do NOT auto-guess unit conversions in the display layer. Display what the API stores, with correct unit labels.
 */
export function formatSpecValue(label: string, rawVal: any): string | null {
  if (rawVal === null || rawVal === undefined) return null;
  const str = String(rawVal).trim();
  if (!str || str === "—" || str === "-" || str === "0" || str === "N/A" || str === "null" || str === "undefined") {
    return null;
  }

  const lowerLabel = label.toLowerCase();

  // Range formatting
  if (lowerLabel.includes("range")) {
    if (str.toLowerCase().includes("nm")) {
      return str;
    }
    // If it's a numeric string, append " nm"
    if (/^[\d,.]+$/.test(str)) {
      return `${str} nm`;
    }
    return `${str} nm`;
  }

  // Speed formatting
  if (lowerLabel.includes("speed")) {
    if (str.toLowerCase().includes("kts") || str.toLowerCase().includes("kt")) {
      return str;
    }
    if (/^[\d,.]+$/.test(str)) {
      return `${str} kts`;
    }
    return `${str} kts`;
  }

  // Cabin Height formatting
  if (lowerLabel.includes("height")) {
    if (str.toLowerCase().includes("ft") || str.includes("'") || str.toLowerCase().includes("in")) {
      return str;
    }
    if (/^[\d,.]+$/.test(str)) {
      return `${str} ft`;
    }
    return `${str} ft`;
  }

  // Cabin Length formatting
  if (lowerLabel.includes("length")) {
    if (str.toLowerCase().includes("ft") || str.includes("'")) {
      return str;
    }
    if (/^[\d,.]+$/.test(str)) {
      return `${str} ft`;
    }
    return `${str} ft`;
  }

  // Baggage formatting
  if (lowerLabel.includes("baggage") || lowerLabel.includes("bag")) {
    if (str.toLowerCase().includes("cu ft") || str.toLowerCase().includes("kg") || str.toLowerCase().includes("lbs")) {
      return str;
    }
    if (/^[\d,.]+$/.test(str)) {
      return `${str} cu ft`;
    }
    return str;
  }

  // Passengers / Capacity formatting
  if (lowerLabel.includes("passenger") || lowerLabel.includes("pax") || lowerLabel.includes("capacity")) {
    if (str.toLowerCase().startsWith("up to")) {
      return str;
    }
    if (/^\d+$/.test(str)) {
      return `up to ${str}`;
    }
    return str;
  }

  return str;
}

/**
 * Filters an array of specs, returning only specs with valid non-null formatted values.
 * Used by fleet cards, fleet page grid, detail page and quote page.
 */
export function getValidSpecs(specs: { label: string; value: any }[]): SpecItem[] {
  const result: SpecItem[] = [];
  for (const s of specs) {
    const formatted = formatSpecValue(s.label, s.value);
    if (formatted !== null) {
      result.push({ label: s.label, value: formatted });
    }
  }
  return result;
}
