import React from "react";
import { Shield } from "lucide-react";

const commitments = [
  "Two-pilot operation for all flights, regardless of aircraft size",
  "Crew experience exceeding 5,000 flight hours on average",
  "Quarterly safety training and emergency simulations",
  "24/7 flight monitoring and weather analysis",
  "Comprehensive maintenance after every flight",
];

const advantages = [
  "No initiation fees or hidden costs",
  "Guaranteed availability with just 24 hours notice",
  "Access to our entire fleet of premium aircraft",
  "Complimentary catering and ground transportation",
  "Dedicated concierge service for all your travel needs",
];

export default function MembershipSafetySectionV5() {
  return (
    <section className="py-28 bg-stone-50/70 font-sans text-[#002F5C] overflow-hidden border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Clean Vertical Lists with Gold Diamond Bullets */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Membership Advantages */}
            <div>
              <div className="inline-flex items-center space-x-2 bg-white px-4 py-1 rounded-full border border-stone-200/80 mb-3 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#FFB817]"></span>
                <span className="text-[11px] uppercase tracking-[0.2em] font-serif italic text-stone-700">
                  Membership Advantages
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-serif font-normal text-[#002F5C] mb-4">
                Privileged Access & Rates
              </h3>

              <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed mb-6">
                Our membership programs provide consistent access to our premium fleet with guaranteed availability and fixed hourly rates.
              </p>

              <ul className="space-y-4">
                {advantages.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-[#002F5C] font-medium">
                    {/* Gold Diamond Bullet */}
                    <span className="w-2 h-2 rotate-45 bg-[#FFB817] mt-1.5 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Safety Commitments */}
            <div className="pt-8 border-t border-stone-200/60">
              <div className="inline-flex items-center space-x-2 bg-white px-4 py-1 rounded-full border border-stone-200/80 mb-3 shadow-sm">
                <Shield className="w-3.5 h-3.5 text-[#FFB817]" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-serif italic text-stone-700">
                  Safety Commitments
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-serif font-normal text-[#002F5C] mb-4">
                Uncompromising Protection
              </h3>

              <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed mb-6">
                Every flight operates under the industry's most stringent dual-pilot and maintenance safety protocols.
              </p>

              <ul className="space-y-4">
                {commitments.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-stone-700 font-medium">
                    {/* Gold Diamond Bullet */}
                    <span className="w-2 h-2 rotate-45 bg-[#FFB817] mt-1.5 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Column: Parallax Style Image Container & Floating Gold Price Tag */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative h-[340px] sm:h-[480px] lg:h-[560px] rounded-2xl overflow-hidden shadow-xl bg-stone-900 group border border-stone-200/80">
              <img
                src="/images/oskar-kadaksoo.jpg"
                alt="Luxury Aviation Interior"
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>

              {/* Floating Pricing Badge */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/95 backdrop-blur-md border border-stone-200/80 text-[#002F5C] px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl shadow-lg font-bold flex items-center space-x-2 sm:space-x-3 z-30">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-stone-500 font-semibold">Starting at</span>
                <span className="text-base sm:text-2xl font-serif font-normal text-[#FFB817]">$4,500</span>
                <span className="text-[10px] sm:text-xs font-normal text-stone-500">/ hr</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
