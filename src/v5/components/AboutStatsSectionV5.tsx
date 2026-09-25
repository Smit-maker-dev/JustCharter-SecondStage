import React from "react";
import { Calendar, Plane, Globe, Users } from "lucide-react";

export default function AboutStatsSectionV5() {
  const chapters = [
    {
      num: "Chapter N° 01",
      stat: "20+",
      label: "Years Experience",
      desc: "Two decades of luxury aviation leadership",
      icon: <Calendar className="w-4 h-4 text-[#FF9C0A]" />,
    },
    {
      num: "Chapter N° 02",
      stat: "50+",
      label: "Luxury Aircraft",
      desc: "Owned and operated long-range fleet",
      icon: <Plane className="w-4 h-4 text-[#FF9C0A]" />,
    },
    {
      num: "Chapter N° 03",
      stat: "180+",
      label: "Global Destinations",
      desc: "Direct access across 6 continents",
      icon: <Globe className="w-4 h-4 text-[#FF9C0A]" />,
    },
    {
      num: "Chapter N° 04",
      stat: "10K+",
      label: "Satisfied Clients",
      desc: "High-net-worth & corporate travelers",
      icon: <Users className="w-4 h-4 text-[#FF9C0A]" />,
    },
  ];

  return (
    <section className="py-28 bg-white font-sans text-[#002F5C] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 bg-stone-100 px-4 py-1.5 rounded-full border border-stone-200/80 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#FF9C0A]"></span>
            <span className="text-xs uppercase tracking-[0.2em] font-serif italic text-stone-700">
              About JustCharter
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#002F5C] leading-tight">
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
                  Setting the benchmark for safety, discretion, and operational excellence since 2004
                </p>
              </div>
            </div>

            <p className="text-stone-600 text-sm sm:text-lg font-light leading-relaxed">
              With over 20 years of experience in luxury aviation, JustCharter
              has established itself as the premier choice for discerning
              travelers who demand nothing but the best. Our commitment to
              excellence, safety, and personalized service sets us apart in the
              private aviation industry.
            </p>
          </div>

          {/* Right Column: Statistics Styled as Book Chapters with Delicate Gold Dividers */}
          <div className="lg:col-span-6 space-y-0">
            {chapters.map((chap, idx) => (
              <div
                key={idx}
                className="border-t border-[#FF9C0A]/40 py-5 sm:py-6 transition-all hover:pl-2 group cursor-default"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-serif italic text-[#FF9C0A]">
                    {chap.num}
                  </span>
                  <div className="p-1.5 sm:p-2 rounded-full bg-stone-50 border border-stone-200/60">
                    {chap.icon}
                  </div>
                </div>

                <div className="flex flex-wrap items-baseline gap-2 sm:space-x-4">
                  <span className="text-2xl sm:text-4xl font-serif font-normal text-[#002F5C] group-hover:text-[#FF9C0A] transition-colors">
                    {chap.stat}
                  </span>
                  <span className="text-xs sm:text-base font-semibold text-[#002F5C] uppercase tracking-wider">
                    {chap.label}
                  </span>
                </div>

                <p className="text-stone-500 text-xs sm:text-sm font-light mt-1">
                  {chap.desc}
                </p>
              </div>
            ))}
            <div className="border-t border-[#FF9C0A]/40"></div>
          </div>

        </div>

      </div>
    </section>
  );
}
