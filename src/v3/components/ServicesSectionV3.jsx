import React from "react";
import { PlaneTakeoff, Shield, Calendar, Clock, ArrowRight } from "lucide-react";

export default function ServicesSectionV3() {
  const services = [
    {
      icon: <PlaneTakeoff className="w-6 h-6 text-[#FFB817]" />,
      title: "Private Charter",
      desc: "Tailored flight experiences to meet your specific needs, with access to over 5,000 airports worldwide.",
      tag: "5,000+ Airports",
      stagger: "mt-0",
    },
    {
      icon: <Shield className="w-6 h-6 text-[#FFB817]" />,
      title: "Safety First",
      desc: "Our fleet meets the highest safety standards with rigorous maintenance and experienced flight crews.",
      tag: "ARGUS & Wyvern",
      stagger: "lg:translate-y-8",
    },
    {
      icon: <Calendar className="w-6 h-6 text-[#FFB817]" />,
      title: "Flexible Scheduling",
      desc: "Fly on your terms with departure times that suit your schedule, avoiding commercial airline constraints.",
      tag: "24h Availability",
      stagger: "mt-0",
    },
    {
      icon: <Clock className="w-6 h-6 text-[#FFB817]" />,
      title: "Time Efficiency",
      desc: "Skip long security lines and boarding processes, making your journey faster and more comfortable.",
      tag: "Zero Delay FBO",
      stagger: "lg:translate-y-8",
    },
  ];

  return (
    <section className="py-24 bg-stone-50/50 font-sans text-[#002F5C] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-1.5 rounded-full border border-slate-200/80 shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-[#FFB817]"></span>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-700">
              World-Class Capabilities
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#002F5C] mb-4">
            Premium Aviation Services
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Experience the pinnacle of luxury travel with our comprehensive range of private aviation services designed to meet your every need.
          </p>
        </div>

        {/* Staggered Floating Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white rounded-3xl p-8 border border-slate-200/70 shadow-[0_15px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.07)] hover:border-[#FFB817]/60 transition-all duration-500 flex flex-col justify-between group ${service.stagger}`}
            >
              <div>
                {/* FIX 2: Standardized Circular Icon Container (rounded-full matching site-wide icon shape) */}
                <div className="w-12 h-12 rounded-full bg-[#FFB817]/10 border border-[#FFB817]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>

                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 bg-stone-100 px-3 py-1 rounded-full border border-slate-200/60 inline-block mb-4">
                  {service.tag}
                </span>

                <h3 className="text-xl font-bold text-[#002F5C] mb-3 group-hover:text-[#FFB817] transition-colors">
                  {service.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-[#002F5C] transition-colors">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 text-[#FFB817] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
