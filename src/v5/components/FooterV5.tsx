import React from "react";
import { ArrowUpRight, Shield } from "lucide-react";
// @ts-ignore
import Logo from "../../Components/Logo";
import { siteConfig, isValidContactValue } from "../../config/siteConfig";

export default function FooterV5() {
  const hasPhone = isValidContactValue(siteConfig.contact.phone);
  const hasEmail = isValidContactValue(siteConfig.contact.email);

  return (
    <footer className="bg-white font-sans text-[#002F5C] border-t border-stone-200/70 pt-16 sm:pt-24 pb-12 sm:pb-16">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 pb-12 sm:pb-16 border-b border-stone-200/70">
          
          {/* Brand Info */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo
              variant="light"
              alt="JustCharter Logo"
              className="h-8 w-auto object-contain mb-6"
            />
            <p className="text-stone-600 text-sm leading-relaxed mb-6 max-w-sm font-light">
              JustCharter is the premier private aviation marketplace connecting discerning travelers with certified operators worldwide.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-serif italic tracking-widest text-stone-400 uppercase mb-4 sm:mb-6">
              Platform Links
            </h4>
            <ul className="space-y-3.5 text-sm font-medium text-stone-700">
              <li><a href="/fleet" className="hover:text-[#FFD200] transition-colors">Private Charter</a></li>
              <li><a href="/#how-it-works" className="hover:text-[#FFD200] transition-colors">How It Works</a></li>
              <li><a href="/for-operators" className="hover:text-[#FFD200] transition-colors">For Operators</a></li>
              <li><a href="/request-quote" className="hover:text-[#FFD200] transition-colors">Request a Quote</a></li>
              <li><a href="/about" className="hover:text-[#FFD200] transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Legal Governance */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-serif italic tracking-widest text-stone-400 uppercase mb-4 sm:mb-6">
              Legal
            </h4>
            {/* TODO: Terms of Service must state JustCharter acts as an intermediary and the operator is responsible for flight operation — client's lawyer to provide wording. */}
            <ul className="space-y-3.5 text-sm text-stone-600 font-light">
              <li><a href="/privacy_policy" className="hover:text-[#002F5C] transition-colors">Privacy Policy</a></li>
              <li><a href="/terms_conditions" className="hover:text-[#002F5C] transition-colors">Terms of Service</a></li>
              <li><a href="/cancellation-policy" className="hover:text-[#002F5C] transition-colors">Cancellation Policy</a></li>
            </ul>
          </div>

          {/* Concierge Contact */}
          <div className="sm:col-span-2 lg:col-span-3">
            <h4 className="text-xs font-serif italic tracking-widest text-stone-400 uppercase mb-4 sm:mb-6">
              Charter Support
            </h4>
            {hasPhone && (
              <p className="text-xl font-serif text-[#002F5C] mb-1">
                {siteConfig.contact.phone}
              </p>
            )}
            <p className="text-xs text-stone-500 font-light mb-6">
              Available 24/7/365 Worldwide
            </p>
            <a
              href="/request-quote"
              className="inline-flex items-center space-x-1.5 bg-[#FFD200] hover:bg-[#e6be00] text-[#002F5C] text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all shadow-sm"
            >
              <span>Request Quote</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-light gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} JustCharter Inc. All rights reserved.</p>
          <div className="text-xs text-stone-500 font-light">
            <span>JustCharter is a charter booking platform. Flights are operated by independent, licensed operators.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
