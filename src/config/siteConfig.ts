/**
 * Central site configuration for JustCharter Public Marketing Site.
 * IMPORTANT: No fake phone numbers, emails, reviews, or legal text are invented.
 * Any missing client details are clearly designated as TODO: CONFIRM WITH CLIENT.
 */

export const siteConfig = {
  contact: {
    // TODO: CONFIRM WITH CLIENT — client to provide real charter concierge phone number
    phone: "", 
    // TODO: CONFIRM WITH CLIENT — client to provide real support email under justcharter.in domain
    email: "", 
    // TODO: CONFIRM WITH CLIENT — client to provide real WhatsApp contact number (e.g. "+919876543210")
    whatsappNumber: "", 
  },
  operations: {
    // TODO: CONFIRM WITH CLIENT — expected response time (e.g. "within 2 hours" or "within 24 hours"). Empty = hidden.
    expectedResponseTime: "",
  },
  operatorPortal: {
    // Operator portal endpoints identified from existing codebase and email service config
    // TODO: CONFIRM WITH CLIENT — verify operator signup URL
    signupUrl: "https://operator.justcharter.in/register",
    register: "https://operator.justcharter.in/register",
    // TODO: CONFIRM WITH CLIENT — verify operator login URL
    loginUrl: "https://operator.justcharter.in",
    login: "https://operator.justcharter.in",
  },
  stats: {
    airportsAccessible: "5,000+",
    support: "24/7",
  },
  pricing: {
    // TODO: CONFIRM WITH CLIENT — confirm price field and unit normalization (hourly vs minute vs USD vs INR) before enabling customer-facing price hints
    showPriceHint: false,
  },
  showPriceHint: false,
  legal: {
    // Mandatory aggregator disclosure
    disclosure: "JustCharter is a charter booking platform. Flights are operated by independent, licensed operators.",
    // TODO: CONFIRM WITH CLIENT — Terms of Service must state JustCharter acts as an intermediary and the operator is responsible for flight operation — client's lawyer to provide wording.
  },
};

/**
 * Returns true if contact string is present and not a placeholder/TODO.
 */
export function isValidContactValue(val: string | undefined | null): boolean {
  if (!val) return false;
  const trimmed = val.trim();
  if (!trimmed) return false;
  if (trimmed.toUpperCase().includes("TODO") || trimmed.includes("555-JET") || trimmed.includes("800) 555")) {
    return false;
  }
  return true;
}
