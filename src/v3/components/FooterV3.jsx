import React from "react";
import { ArrowUpRight, Shield, Heart } from "lucide-react";

export default function FooterV3() {
  return (
    <footer className="bg-stone-50 font-sans text-[#002F5C] border-t border-slate-200/80">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-200/70">
          
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <img
              src="/images/Blacklogo.png"
              alt="JustCharter Logo"
              className="h-9 w-auto object-contain mb-6"
            />
            <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-sm">
              JustCharter is the premier private aviation marketplace connecting discerning travelers with certified operators worldwide.
            </p>
            <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-slate-200 text-xs font-semibold text-slate-800 shadow-sm">
              <Shield className="w-4 h-4 text-[#FFD200]" />
              <span>ARGUS Platinum & Wyvern Wingman</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
              Platform Links
            </h4>
            <ul className="space-y-3 text-sm font-semibold text-slate-700">
              <li><a href="/services" className="hover:text-[#FFD200] transition-colors">Aircraft Fleet</a></li>
              <li><a href="/about" className="hover:text-[#FFD200] transition-colors">About Us</a></li>
              <li><a href="/buy_sell" className="hover:text-[#FFD200] transition-colors">Buy & Sell Aircraft</a></li>
              <li><a href="/event" className="hover:text-[#FFD200] transition-colors">Private Events</a></li>
              <li><a href="/bookings" className="hover:text-[#FFD200] transition-colors">Flight Bookings</a></li>
            </ul>
          </div>

          {/* Legal Governance */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
              Legal
            </h4>
            <ul className="space-y-3 text-sm text-slate-600 font-medium">
              <li><a href="/privacy_policy" className="hover:text-[#002F5C] transition-colors">Privacy Policy</a></li>
              <li><a href="/terms_conditions" className="hover:text-[#002F5C] transition-colors">Terms of Service</a></li>
              <li><a href="/cancellation-policy" className="hover:text-[#002F5C] transition-colors">Cancellation Policy</a></li>
            </ul>
          </div>

          {/* Concierge Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
              Global Concierge
            </h4>
            <p className="text-base font-bold text-[#002F5C] mb-1">
              +1 (800) 555-JET
            </p>
            <p className="text-xs text-slate-500 mb-4">
              Available 24/7/365 Worldwide
            </p>
            <a
              href="mailto:concierge@justcharter.com"
              className="inline-flex items-center space-x-1 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-sm"
            >
              <span>Charter Support</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} JustCharter Inc. All rights reserved.</p>
          <div className="flex items-center space-x-2 bg-white px-4 py-1.5 rounded-full border border-slate-200/60">
            <span>Designed for Aerodynamic Luxury</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
