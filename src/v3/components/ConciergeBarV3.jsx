import React from "react";
import { Phone, Mail, Clock, ArrowRight } from "lucide-react";

export default function ConciergeBarV3() {
  return (
    <section className="bg-stone-50 border-y border-stone-200 text-slate-900 font-sans py-16 px-6 lg:px-12 relative overflow-hidden">
      
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#DFA93B]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
        
        <div>
          <div className="inline-flex items-center space-x-2 bg-stone-200/80 px-3.5 py-1 rounded-full border border-stone-300 mb-3">
            <Clock className="w-3.5 h-3.5 text-[#DFA93B]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700">
              24/7 Global Fleet Ops & Concierge
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 mb-2">
            Ready to Plan Your Next Journey?
          </h3>

          <p className="text-stone-600 text-xs sm:text-sm max-w-xl">
            Our dedicated flight concierges are available around the clock to arrange bespoke charters, ground transfers, and inflight catering.
          </p>
        </div>

        {/* Contact Pills */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="tel:+1800555538"
            className="bg-white hover:bg-stone-100 text-slate-900 border border-stone-300 px-5 py-3 rounded-full flex items-center space-x-3 text-xs font-bold transition-all shadow-sm"
          >
            <Phone className="w-4 h-4 text-[#DFA93B]" />
            <span>+1 (800) 555-JET</span>
          </a>

          <a
            href="mailto:concierge@justcharter.com"
            className="bg-white hover:bg-stone-100 text-slate-900 border border-stone-300 px-5 py-3 rounded-full flex items-center space-x-3 text-xs font-bold transition-all shadow-sm"
          >
            <Mail className="w-4 h-4 text-[#DFA93B]" />
            <span>concierge@justcharter.com</span>
          </a>

          <a
            href="/bookings"
            className="bg-[#DFA93B] hover:bg-[#c9952f] text-slate-950 px-6 py-3 rounded-full flex items-center space-x-2 text-xs font-bold uppercase tracking-wider transition-all shadow-md"
          >
            <span>Charter Support</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
