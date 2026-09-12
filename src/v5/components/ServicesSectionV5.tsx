import React from "react";
import { PlaneTakeoff, Shield, Calendar, Clock, ArrowRight } from "lucide-react";

export default function ServicesSectionV5() {
  const services = [
    {
      icon: <PlaneTakeoff className="w-6 h-6 text-[#DFA93B]" />,
      title: "Private Charter",
      desc: "Tailored flight experiences to meet your specific needs, with access to over 5,000 airports worldwide.",
      tag: "5,000+ Airports",
    },
    {
      icon: <Shield className="w-6 h-6 text-[#DFA93B]" />,
      title: "Safety First",
      desc: "Our fleet meets the highest safety standards with rigorous maintenance and experienced flight crews.",
      tag: "ARGUS & Wyvern",
    },
    {
      icon: <Calendar className="w-6 h-6 text-[#DFA93B]" />,
      title: "Flexible Scheduling",
      desc: "Fly on your terms with departure times that suit your schedule, avoiding commercial airline constraints.",
      tag: "24h Availability",
    },
    {
      icon: <Clock className="w-6 h-6 text-[#DFA93B]" />,
      title: "Time Efficiency",
      desc: "Skip long security lines and boarding processes, making your journey faster and more comfortable.",
      tag: "Zero Delay FBO",
    },
  ];

  return (
    <section className="py-28 bg-white font-sans text-stone-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
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

        {/* Spacious 2x2 Grid with Massive Padding */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-stone-50/80 hover:bg-white rounded-2xl p-10 sm:p-12 lg:p-16 border border-stone-200/80 shadow-sm hover:shadow-md hover:border-[#DFA93B]/50 transition-all duration-500 flex flex-col justify-between items-center text-center group"
            >
              <div className="flex flex-col items-center">
                {/* Minimalist Gold Line-Art Icon Badge */}
                <div className="w-14 h-14 rounded-full bg-[#DFA93B]/10 border border-[#DFA93B]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>

                <span className="text-[10px] uppercase tracking-widest font-semibold text-stone-500 bg-white px-3 py-1 rounded-full border border-stone-200/60 inline-block mb-4">
                  {service.tag}
                </span>

                <h3 className="text-2xl sm:text-3xl font-serif font-normal text-stone-900 mb-4 group-hover:text-[#DFA93B] transition-colors">
                  {service.title}
                </h3>

                <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed max-w-md">
                  {service.desc}
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-stone-200/60 w-full flex items-center justify-center space-x-2 text-xs font-semibold text-stone-500 group-hover:text-stone-900 transition-colors">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 text-[#DFA93B] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
