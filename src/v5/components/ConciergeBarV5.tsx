import React from "react";
import { Phone, Mail, Clock, ArrowRight } from "lucide-react";

export default function ConciergeBarV5() {
  return (
    <section className="bg-white font-sans text-[#002F5C] py-12 sm:py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="bg-stone-50/90 rounded-2xl p-6 sm:p-10 lg:p-12 border border-stone-200/80 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          
          <div>
            <div className="inline-flex items-center space-x-2 bg-white px-3.5 py-1 rounded-full border border-stone-200/80 mb-3 shadow-sm">
              <Clock className="w-3.5 h-3.5 text-[#FFD200]" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-stone-700">
                24/7 Global Fleet Ops & Concierge
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal tracking-tight text-[#002F5C] mb-2">
              Ready to Plan Your Next Journey?
            </h3>

            <p className="text-stone-600 text-xs sm:text-sm font-light max-w-xl">
              Our dedicated flight concierges are available around the clock to arrange bespoke charters, ground transfers, and inflight catering.
            </p>
          </div>

          {/* Contact Pills */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <a
              href="tel:+1800555538"
              className="bg-white hover:bg-stone-100 text-[#002F5C] border border-stone-200/80 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl flex items-center justify-center space-x-3 text-xs font-semibold transition-all shadow-sm"
            >
              <Phone className="w-4 h-4 text-[#FFD200]" />
              <span>+1 (800) 555-JET</span>
            </a>

            <a
              href="mailto:concierge@justcharter.com"
              className="bg-white hover:bg-stone-100 text-[#002F5C] border border-stone-200/80 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl flex items-center justify-center space-x-3 text-xs font-semibold transition-all shadow-sm"
            >
              <Mail className="w-4 h-4 text-[#FFD200]" />
              <span>concierge@justcharter.com</span>
            </a>

            <a
              href="/bookings"
              className="bg-[#FFD200] hover:bg-[#e6be00] text-[#002F5C] px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              <span>Charter Support</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
