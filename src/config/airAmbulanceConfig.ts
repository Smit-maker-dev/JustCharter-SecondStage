import { siteConfig, isValidContactValue } from "./siteConfig";

/**
 * Air Ambulance Configuration
 * Reuses existing site contact configuration.
 * Strictly adheres to honesty rules:
 * - helpline24x7 defaults to false
 * - phone and whatsapp derived from siteConfig
 * - never claims "24x7", response times, or false accreditations unless explicitly backed by config
 */
export const airAmbulanceConfig = {
  phone: siteConfig.contact.phone || "",
  whatsapp: siteConfig.contact.whatsappNumber || "",
  helpline24x7: false,
};

export const hasValidPhone = isValidContactValue(airAmbulanceConfig.phone);
export const hasValidWhatsApp = isValidContactValue(airAmbulanceConfig.whatsapp);
