import React from "react";
import { Shield, Check, Star } from "lucide-react";

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

export default function MembershipSafetySectionV3() {
  return (
    <section className="py-24 bg-white font-sans text-[#002F5C] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Overlapping Layered Design Container */}
        <div className="relative">
          
          {/* Background Image Container */}
          <div className="relative h-[420px] sm:h-[500px] lg:h-[560px] rounded-3xl overflow-hidden shadow-2xl bg-slate-900 group">
            <img
              src="/images/oskar-kadaksoo.jpg"
              alt="Luxury Aviation Interior"
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-transparent to-transparent"></div>

            {/* FIX 3: Top-Right Glassmorphic Floating Price Badge (Zero collision with content card) */}
            <div className="absolute top-6 right-6 bg-slate-950/85 backdrop-blur-md border border-white/20 text-white px-5 py-3 rounded-full shadow-2xl font-bold flex items-center space-x-3 z-30">
              <span className="text-[10px] uppercase tracking-widest text-slate-300 font-extrabold">Starting at</span>
              <span className="text-xl sm:text-2xl font-black text-[#FF9C0A]">$4,500</span>
              <span className="text-xs font-semibold text-slate-300">/ hr</span>
            </div>
          </div>

          {/* Overlapping Crisp White Content Card (Bottom-Left Corner) */}
          <div className="relative lg:-mt-52 lg:ml-12 lg:mr-36 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-[0_25px_60px_rgba(0,0,0,0.12)] z-20">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              
              {/* Membership Advantages Column */}
              <div>
                <div className="inline-flex items-center space-x-2 bg-stone-100 px-4 py-1 rounded-full border border-slate-200/80 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#FF9C0A]"></span>
                  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-slate-700">
                    Membership Advantages
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#002F5C] mb-4">
                  Privileged Access & Rates
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Our membership programs provide consistent access to our premium fleet with guaranteed availability and fixed hourly rates.
                </p>

                <ul className="space-y-3 font-sans">
                  {advantages.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm font-semibold text-slate-800">
                      {/* Small Gold Circle Bullet */}
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF9C0A] mt-1 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safety Commitments Column */}
              <div className="lg:border-l lg:border-slate-100 lg:pl-10">
                <div className="inline-flex items-center space-x-2 bg-stone-100 px-4 py-1 rounded-full border border-slate-200/80 mb-3">
                  <Shield className="w-3.5 h-3.5 text-[#FF9C0A]" />
                  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-slate-700">
                    Safety Commitments
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#002F5C] mb-4">
                  Uncompromising Protection
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Every flight operates under the industry's most stringent dual-pilot and maintenance safety protocols.
                </p>

                <ul className="space-y-3 font-sans">
                  {commitments.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
                      <Star className="w-3.5 h-3.5 text-[#FF9C0A] fill-[#FF9C0A] mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
