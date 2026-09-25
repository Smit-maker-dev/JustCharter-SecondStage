import React from "react";
import { Calendar, Plane, Globe, Users } from "lucide-react";

export default function AboutStatsSectionV3() {
  // ITEM 2 FIX: Semantically correct icons (Calendar for Years, Plane for Aircraft, Globe for Destinations, Users for Clients)
  const stats = [
    {
      icon: <Calendar className="w-5 h-5 text-[#FFD200]" />,
      num: "20+",
      label: "Years Experience",
      desc: "Two decades of luxury aviation leadership",
    },
    {
      icon: <Plane className="w-5 h-5 text-[#FFD200]" />,
      num: "50+",
      label: "Luxury Aircraft",
      desc: "Owned and operated long-range fleet",
    },
    {
      icon: <Globe className="w-5 h-5 text-[#FFD200]" />,
      num: "180+",
      label: "Global Destinations",
      desc: "Direct access across 6 continents",
    },
    {
      icon: <Users className="w-5 h-5 text-[#FFD200]" />,
      num: "10K+",
      label: "Satisfied Clients",
      desc: "High-net-worth & corporate travelers",
    },
  ];

  return (
    <section className="py-24 bg-stone-50/70 font-sans text-[#002F5C] relative overflow-hidden">
      
      {/* Background Fluid Decorative Circles */}
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-[#FFD200]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-slate-900/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Main Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center space-x-2 bg-white px-4 py-1.5 rounded-full border border-slate-200/80 shadow-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-[#FFD200]"></span>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-700">
                About JustCharter
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#002F5C] leading-tight mb-6">
              The Premier Choice for Private Aviation
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
              With over 20 years of experience in luxury aviation, JustCharter
              has established itself as the premier choice for discerning
              travelers who demand nothing but the best. Our commitment to
              excellence, safety, and personalized service sets us apart in the
              private aviation industry.
            </p>
          </div>

          {/* Right Fluid Circular Badges Grid (Tech-Startup Look) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.07)] hover:border-[#FFD200]/60 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-6">
                  {/* Clean Bordered Circular Number Badge */}
                  <div className="w-16 h-16 rounded-full bg-stone-50 border-2 border-slate-200/80 text-[#002F5C] group-hover:border-[#FFD200] group-hover:bg-[#FFD200] group-hover:text-[#002F5C] transition-all flex items-center justify-center font-bold text-xl font-mono shadow-inner">
                    {stat.num}
                  </div>
                  <div className="p-3 rounded-full bg-stone-50 border border-slate-200/60">
                    {stat.icon}
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#002F5C] uppercase tracking-wider mb-1">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ITEM 3 FIX: Single clean caption line replacing the duplicate 20+ box */}
        <div className="mt-14 pt-8 border-t border-slate-200/70 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            Setting the benchmark for safety, discretion, and operational excellence since 2004
          </p>
        </div>

      </div>
    </section>
  );
}
