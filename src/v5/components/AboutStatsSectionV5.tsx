import React, { useState, useEffect } from "react";
import { Plane, Globe, Clock, ShieldCheck } from "lucide-react";
import { API_BASE_URL } from "../../api/axiosInstance";

export default function AboutStatsSectionV5() {
  const [fleetCount, setFleetCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/settings/fleet`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          setFleetCount(data.data.length);
        }
      })
      .catch((err) => console.error("Error fetching fleet count:", err));
  }, []);

  // Stats items per aggregator positioning
  // Partner Operators stat is omitted as the public API does not expose operator counts
  const stats = [
    ...(fleetCount && fleetCount > 0 ? [{
      stat: `${fleetCount}+`,
      label: "Verified Aircraft",
      desc: "Listed after team verification",
      icon: <Plane className="w-4 h-4 text-[#002F5C]" />,
    }] : []),
    {
      stat: "5,000+",
      label: "Airports Accessible",
      desc: "Across the globe",
      icon: <Globe className="w-4 h-4 text-[#002F5C]" />,
    },
    {
      stat: "24/7",
      label: "Support",
      desc: "Charter support whenever you need it",
      icon: <Clock className="w-4 h-4 text-[#002F5C]" />,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white font-sans text-[#002F5C] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-[#002F5C] leading-tight">
            The Premier Choice for Private Aviation
          </h2>
        </div>

        {/* Editorial Book-Spread Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Masked Image & Story Text */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-stone-200/80 mb-6 sm:mb-8 h-64 sm:h-80 lg:h-96">
              <img
                src="/images/gulfstrem.jpg"
                alt="Luxury Gulfstream Aircraft"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
                <p className="text-[11px] sm:text-xs font-serif italic text-stone-200">
                  Safety, discretion and service on every flight.
                </p>
              </div>
            </div>

            <p className="text-stone-600 text-sm sm:text-lg font-light leading-relaxed">
              JustCharter brings private aviation together on one platform. We partner with vetted operators so you can compare aircraft, get transparent quotes and charter with a single point of contact. Our team verifies every aircraft before it is listed and supports you from first request to landing.
            </p>
          </div>

          {/* Right Column: Statistics Spread with Delicate Gold Dividers */}
          <div className="lg:col-span-6 space-y-0">
            {stats.map((item, idx) => (
              <div
                key={idx}
                className="border-t border-[#FFD200]/40 py-5 sm:py-6 transition-all hover:pl-2 group cursor-default"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex flex-wrap items-baseline gap-2 sm:space-x-4">
                    <span className="text-2xl sm:text-4xl font-serif font-normal text-[#002F5C] group-hover:text-[#FFD200] transition-colors">
                      {item.stat}
                    </span>
                    <span className="text-xs sm:text-base font-semibold text-[#002F5C] uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>
                  <div className="p-1.5 sm:p-2 rounded-full bg-stone-100 border border-stone-300 text-[#002F5C] flex-shrink-0">
                    {item.icon}
                  </div>
                </div>

                <p className="text-stone-600 text-xs sm:text-sm font-normal mt-1">
                  {item.desc}
                </p>
              </div>
            ))}
            <div className="border-t border-[#FFD200]/40"></div>
          </div>

        </div>

      </div>
    </section>
  );
}
