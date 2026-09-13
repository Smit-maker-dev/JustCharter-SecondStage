import React from "react";
import { PlaneTakeoff, Shield, Calendar, Clock, ArrowRight } from "lucide-react";

export default function ServicesSectionV5() {
  const services = [
    {
      icon: <PlaneTakeoff className="w-5 h-5 text-[#DFA93B]" />,
      title: "Private Charter",
      desc: "Tailored flight experiences to meet your specific needs, with access to over 5,000 airports worldwide.",
      tag: "5,000+ Airports",
    },
    {
      icon: <Shield className="w-5 h-5 text-[#DFA93B]" />,
      title: "Safety First",
      desc: "Our fleet meets the highest safety standards with rigorous maintenance and experienced flight crews.",
      tag: "ARGUS & Wyvern",
    },
    {
      icon: <Calendar className="w-5 h-5 text-[#DFA93B]" />,
      title: "Flexible Scheduling",
      desc: "Fly on your terms with departure times that suit your schedule, avoiding commercial airline constraints.",
      tag: "24h Availability",
    },
    {
      icon: <Clock className="w-5 h-5 text-[#DFA93B]" />,
      title: "Time Efficiency",
      desc: "Skip long security lines and boarding processes, making your journey faster and more comfortable.",
      tag: "Zero Delay FBO",
    },
  ];

  return (
    <section className="py-24 bg-white font-sans text-stone-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-stone-100 px-4 py-1.5 rounded-full border border-stone-200/80 shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-[#DFA93B]"></span>
            <span className="text-xs uppercase tracking-[0.2em] font-serif italic text-stone-700">
              World-Class Capabilities
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-stone-900 mb-6">
            Premium Aviation Services
          </h2>

          <p className="text-stone-600 text-base sm:text-lg font-sans font-light leading-relaxed">
            Experience the pinnacle of luxury travel with our comprehensive range of private aviation services designed to meet your every need.
          </p>
        </div>

        {/* Left-Aligned Accent-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-stone-50/80 hover:bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 border-l-4 border-l-[#DFA93B] shadow-sm hover:shadow-md hover:border-l-[#DFA93B] hover:border-stone-300 transition-all duration-300 flex flex-col justify-between items-start text-left group"
            >
              <div className="w-full">
                {/* Horizontal Header: Icon Box & Tag Pill */}
                <div className="flex items-center justify-between w-full mb-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#DFA93B]/10 border border-[#DFA93B]/25 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {service.icon}
                  </div>
                  <span className="text-[9px] uppercase tracking-widest font-semibold text-stone-500 bg-white px-2.5 py-0.5 rounded-full border border-stone-200/60">
                    {service.tag}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-serif font-normal text-stone-900 mb-2 group-hover:text-[#DFA93B] transition-colors">
                  {service.title}
                </h3>

                <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
                  {service.desc}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-stone-200/60 w-full flex items-center justify-between text-xs font-semibold text-stone-500 group-hover:text-stone-900 transition-colors">
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#DFA93B] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
