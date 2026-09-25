import React from "react";
import { ArrowUpRight, Shield } from "lucide-react";

export default function FooterV5() {
  return (
    <footer className="bg-white font-sans text-[#4A3B2A] border-t border-stone-200/70 pt-16 sm:pt-24 pb-12 sm:pb-16">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 pb-12 sm:pb-16 border-b border-stone-200/70">
          
          {/* Brand Info */}
          <div className="sm:col-span-2 lg:col-span-4">
            <img
              src="/images/Blacklogo.png"
              alt="JustCharter Logo"
              className="h-8 w-auto object-contain mb-6"
            />
            <p className="text-stone-600 text-sm leading-relaxed mb-6 max-w-sm font-light">
              JustCharter is the premier private aviation marketplace connecting discerning travelers with certified operators worldwide.
            </p>
            <div className="inline-flex items-center space-x-2 bg-stone-50 px-4 py-2 rounded-full border border-stone-200/70 text-xs font-serif italic text-[#4A3B2A] shadow-sm">
              <Shield className="w-4 h-4 text-[#FF9C0A]" />
              <span>ARGUS Platinum & Wyvern Wingman</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-serif italic tracking-widest text-stone-400 uppercase mb-4 sm:mb-6">
              Platform Links
            </h4>
            <ul className="space-y-3.5 text-sm font-medium text-stone-700">
              <li><a href="/services" className="hover:text-[#FF9C0A] transition-colors">Aircraft Fleet</a></li>
              <li><a href="/about" className="hover:text-[#FF9C0A] transition-colors">About Us</a></li>
              <li><a href="/buy_sell" className="hover:text-[#FF9C0A] transition-colors">Buy & Sell Aircraft</a></li>
              <li><a href="/event" className="hover:text-[#FF9C0A] transition-colors">Private Events</a></li>
              <li><a href="/bookings" className="hover:text-[#FF9C0A] transition-colors">Flight Bookings</a></li>
            </ul>
          </div>

          {/* Legal Governance */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-serif italic tracking-widest text-stone-400 uppercase mb-4 sm:mb-6">
              Legal
            </h4>
            <ul className="space-y-3.5 text-sm text-stone-600 font-light">
              <li><a href="/privacy_policy" className="hover:text-[#4A3B2A] transition-colors">Privacy Policy</a></li>
              <li><a href="/terms_conditions" className="hover:text-[#4A3B2A] transition-colors">Terms of Service</a></li>
              <li><a href="/cancellation-policy" className="hover:text-[#4A3B2A] transition-colors">Cancellation Policy</a></li>
            </ul>
          </div>

          {/* Concierge Contact */}
          <div className="sm:col-span-2 lg:col-span-3">
            <h4 className="text-xs font-serif italic tracking-widest text-stone-400 uppercase mb-4 sm:mb-6">
              Global Concierge
            </h4>
            <p className="text-xl font-serif text-[#4A3B2A] mb-1">
              +1 (800) 555-JET
            </p>
            <p className="text-xs text-stone-500 font-light mb-6">
              Available 24/7/365 Worldwide
            </p>
            <a
              href="mailto:concierge@justcharter.com"
              className="inline-flex items-center space-x-1.5 bg-[#FF9C0A] hover:bg-[#e08800] text-[#4A3B2A] text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all shadow-sm"
            >
              <span>Charter Support</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-light gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} JustCharter Inc. All rights reserved.</p>
          <div className="flex items-center space-x-2 bg-stone-50 px-4 py-1.5 rounded-full border border-stone-200/60 font-serif italic text-stone-700">
            <span>Designed for Aerodynamic Luxury & High-End Hospitality</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
