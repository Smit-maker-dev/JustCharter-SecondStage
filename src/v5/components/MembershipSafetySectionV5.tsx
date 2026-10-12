import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../api/axiosInstance";

// TODO: CONFIRM WITH CLIENT — legal/regulatory wording to be reviewed by the client's lawyer; do not add DGCA or certification claims.
const commitments = [
  "Aircraft verified by our team before listing",
  "Aircraft documents and pilot credentials reviewed during verification",
  "Operators remain responsible for operating the flight, crew and maintenance",
  "24/7 support throughout your trip",
  "Clear quote with inclusions listed before you confirm",
];

const advantages = [
  "Vetted operators only",
  "Transparent pricing — no hidden costs",
  "One point of contact from quote to landing",
  "24/7 charter support",
  "Wide choice across turboprops, jets and helicopters",
];

export default function MembershipSafetySectionV5() {
  const [lowestRate, setLowestRate] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/settings/fleet`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.data && Array.isArray(resData.data)) {
          // Extract valid hourly rates, ignoring obvious test placeholder entries (< 50000)
          const validRates = resData.data
            .map((item: any) => Number(item.hourlyRate))
            .filter((rate: number) => !isNaN(rate) && rate >= 50000);

          if (validRates.length > 0) {
            setLowestRate(Math.min(...validRates));
          }
        }
      })
      .catch((err) => console.error("Error fetching rates for badge:", err));
  }, []);

  return (
    <section id="safety" className="py-28 bg-stone-50/70 font-sans text-[#002F5C] overflow-hidden border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Clean Vertical Lists with Gold Diamond Bullets */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Why Book with JustCharter */}
            <div>
              <h3 className="text-3xl sm:text-4xl font-serif font-normal text-[#002F5C] mb-4">
                Why Book with JustCharter
              </h3>

              <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed mb-6">
                One platform to compare verified operators and charter with confidence.
              </p>

              <ul className="space-y-4">
                {advantages.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-[#002F5C] font-medium">
                    {/* Gold Diamond Bullet */}
                    <span className="w-2 h-2 rotate-45 bg-[#FFD200] mt-1.5 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Safety Commitments */}
            <div className="pt-8 border-t border-stone-200/60">
              <h3 className="text-3xl sm:text-4xl font-serif font-normal text-[#002F5C] mb-4">
                Uncompromising Protection
              </h3>

              <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed mb-6">
                Every aircraft on JustCharter goes through verification before it is listed.
              </p>

              <ul className="space-y-4">
                {commitments.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-stone-700 font-medium">
                    {/* Gold Diamond Bullet */}
                    <span className="w-2 h-2 rotate-45 bg-[#FFD200] mt-1.5 flex-shrink-0"></span>
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

              {/* Floating Pricing Badge (Driven dynamically from lowest customer-facing API price) */}
              {lowestRate && (
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/95 backdrop-blur-md border border-stone-200/80 text-[#002F5C] px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl shadow-lg font-bold flex items-center space-x-2 sm:space-x-3 z-30">
                  <span className="text-[11px] sm:text-xs uppercase tracking-widest text-stone-600 font-semibold">Starting at</span>
                  <span className="text-base sm:text-2xl font-serif font-normal text-[#FFD200]">
                    ₹{lowestRate.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs font-normal text-stone-600">/ hr</span>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
