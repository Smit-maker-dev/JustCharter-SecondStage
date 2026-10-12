import React from "react";
import { Link } from "react-router-dom";
import { Search, ShieldCheck, Headphones, Plane, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Search & Select",
    description:
      "Browse verified aircraft, compare cabin layouts, speeds and passenger capacities, or enter your custom itinerary.",
    icon: Search,
  },
  {
    number: "02",
    title: "Get Transparent Pricing",
    description:
      "Receive clear quotes from operators. Every quote itemizes what is included before you confirm.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Dedicated Coordination",
    description:
      "Our charter support team coordinates passenger details, airport slots, ground transport and catering with the operator.",
    icon: Headphones,
  },
  {
    number: "04",
    title: "Wheels Up",
    description:
      "Arrive at a private terminal shortly before departure and fly on your schedule.",
    icon: Plane,
  },
];

export default function HowItWorksSectionV5() {
  return (
    <section
      id="how-it-works"
      className="py-24 sm:py-28 bg-stone-50/70 font-sans text-[#002F5C] border-b border-stone-200/70 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-1.5 rounded-full border border-stone-200/80 shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-[#FFD200]"></span>
            <span className="text-xs uppercase tracking-[0.2em] font-serif italic text-stone-700">
              Simple, Transparent Booking
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#002F5C] mb-6">
            How JustCharter Works
          </h2>

          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            Experience seamless private aviation — from searching verified aircraft to wheels up in four simple steps.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-7 lg:p-8 border border-stone-200/80 shadow-sm hover:shadow-md hover:border-[#FFD200]/50 transition-all duration-300 flex flex-col justify-between relative"
              >
                {/* Step indicator top row */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-serif font-semibold text-[#002F5C]/40 group-hover:text-[#FFD200] transition-colors">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-stone-50 border border-stone-200/70 text-[#002F5C] flex items-center justify-center group-hover:bg-[#FFD200]/15 group-hover:text-[#002F5C] transition-colors">
                      <Icon className="w-6 h-6 stroke-[1.75]" />
                    </div>
                  </div>

                  <h3 className="text-xl font-serif font-normal text-[#002F5C] mb-3 min-h-[3.5rem] flex items-start group-hover:text-[#002F5C] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-stone-600 text-sm font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Row */}
        <div className="mt-14 text-center">
          <Link
            to="/request-quote"
            className="inline-flex items-center space-x-2 bg-[#002F5C] hover:bg-[#002447] text-white px-8 py-3.5 rounded-full font-sans text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all group"
          >
            <span>Request a Custom Quote</span>
            <ArrowRight className="w-4 h-4 text-[#FFD200] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
