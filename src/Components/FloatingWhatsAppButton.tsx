import React from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig, isValidContactValue } from "../config/siteConfig";

export default function FloatingWhatsAppButton() {
  const whatsappNum =
    siteConfig.contact?.whatsappNumber || (siteConfig as any).whatsappNumber;

  // If value is empty or TODO placeholder, do not render
  if (!isValidContactValue(whatsappNum)) {
    return null;
  }

  const cleanNumber = whatsappNum.replace(/[^\d+]/g, "").replace(/^\+/, "");
  const defaultMessage = encodeURIComponent(
    "Hi JustCharter, I'd like help with a private charter."
  );
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp with JustCharter"
      className="fixed bottom-20 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center justify-center p-3.5 sm:p-4 rounded-full bg-white text-[#002F5C] border border-stone-200/90 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer group"
    >
      <div className="relative">
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#002F5C] group-hover:text-[#8A6D00] transition-colors" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FFD200] rounded-full border border-white"></span>
      </div>
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-semibold pl-0 group-hover:pl-2 text-[#002F5C]">
        WhatsApp
      </span>
    </a>
  );
}
