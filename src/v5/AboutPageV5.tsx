import React from "react";
import { Globe, Compass, Award, Lock, ShieldCheck, Sparkles } from "lucide-react";
import ServicesSectionV5 from "./components/ServicesSectionV5";
import TestimonialsSectionV5 from "./components/TestimonialsSectionV5";
import ConciergeBarV5 from "./components/ConciergeBarV5";

export default function AboutPageV5() {
  const values = [
    {
      icon: <Award className="w-6 h-6 text-[#FFD200]" />,
      title: "Excellence",
      description: "Setting the highest standards in private aviation.",
      tag: "Benchmark Standard",
    },
    {
      icon: <Lock className="w-6 h-6 text-[#FFD200]" />,
      title: "Privacy",
      description: "Ensuring complete discretion and confidentiality for all travelers.",
      tag: "Discreet Travel",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#FFD200]" />,
      title: "Safety",
      description: "Unwavering commitment to your security with verified operator standards.",
      tag: "Verified Partners",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#FFD200]" />,
      title: "Satisfaction",
      description: "Exceeding expectations at every altitude with bespoke service.",
      tag: "Bespoke Service",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#002F5C] font-sans antialiased selection:bg-[#FFD200]/30 selection:text-[#002F5C]">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[55vh] lg:min-h-[60vh] flex flex-col justify-center items-center text-center pt-32 pb-20 bg-stone-900 overflow-hidden">
        {/* Background Image with Dark Vignette Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/AboutHeroImage.jpg"
            alt="Luxury Private Aviation Experience"
            className="w-full h-full object-cover object-center filter brightness-[0.6] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/40 to-stone-900/90"></div>
        </div>

        {/* Hero Central Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-white my-auto">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FFD200]"></span>
            <span className="text-xs font-serif italic tracking-widest uppercase text-stone-100">
              Luxury Meets the Sky
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal tracking-tight text-white leading-tight mb-6">
            Luxury Meets <br className="hidden sm:block" />
            <span className="italic font-serif font-light text-stone-200">
              the Sky
            </span>
          </h1>

          <p className="text-base sm:text-xl text-stone-200 font-sans font-light max-w-2xl mx-auto leading-relaxed">
            Experience Private Aviation Redefined
          </p>
        </div>
      </section>

      {/* 2. About Us Section */}
      <section className="py-28 bg-stone-50/70 font-sans text-[#002F5C] overflow-hidden border-b border-stone-200/80">
        <div className="max-w-4xl mx-auto px-6 text-center">
          
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-1.5 rounded-full border border-stone-200/80 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FFD200]"></span>
            <span className="text-xs uppercase tracking-[0.2em] font-serif italic text-stone-700">
              About JustCharter
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#002F5C] mb-8">
            About Us
          </h2>

          <div className="space-y-6 text-stone-700 text-base sm:text-lg font-light leading-relaxed">
            <p>
              JustCharter brings private aviation together on one platform. We partner with vetted operators so you can compare aircraft, get transparent quotes and charter with a single point of contact. Our team verifies every aircraft before it is listed and supports you from first request to landing.
            </p>

            <p>
              Safety and transparency are our highest priorities. Every aircraft listed on JustCharter undergoes rigorous verification, and all flights are operated by certified, licensed partner operators with verified flight crews and maintenance protocols.
            </p>
          </div>

        </div>
      </section>

      {/* 3. Vision & Mission Section (Editorial Statement Columns) */}
      <section className="py-24 bg-white font-sans text-[#002F5C] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 bg-stone-100 px-4 py-1.5 rounded-full border border-stone-200/80 shadow-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-[#FFD200]"></span>
              <span className="text-xs uppercase tracking-[0.2em] font-serif italic text-stone-700">
                Guiding Principles
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-[#002F5C]">
              Vision & Mission
            </h2>
          </div>

          {/* Editorial 2-Column Statement Spread */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 divide-y md:divide-y-0 md:divide-x divide-stone-200/80">
            
            {/* Vision */}
            <div className="flex flex-col justify-start pt-6 md:pt-0">
              <div className="flex items-center space-x-2 text-[#FFD200] mb-3">
                <Globe className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-stone-500">
                  Future Vision
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-serif font-normal text-[#002F5C] mb-4">
                Our Vision
              </h3>

              <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
                To revolutionize private aviation by setting new standards in
                luxury, safety, and personalized service, making exceptional air
                travel accessible to discerning clients worldwide.
              </p>
            </div>

            {/* Mission */}
            <div className="flex flex-col justify-start pt-10 md:pt-0 md:pl-12 lg:pl-16">
              <div className="flex items-center space-x-2 text-[#FFD200] mb-3">
                <Compass className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-stone-500">
                  Core Purpose
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-serif font-normal text-[#002F5C] mb-4">
                Our Mission
              </h3>

              <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
                To deliver unparalleled private aviation experiences through
                cutting-edge technology, exceptional customer service, and
                unwavering commitment to safety and comfort.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Why Choose Us (Reusing ServicesSectionV5 with Accent Cards) */}
      <ServicesSectionV5 />

      {/* 5. Our Values Section (Minimalist Stat Strip Style) */}
      <section className="py-24 bg-stone-50/70 font-sans text-[#002F5C] overflow-hidden border-t border-stone-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 bg-white px-4 py-1.5 rounded-full border border-stone-200/80 shadow-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-[#FFD200]"></span>
              <span className="text-xs uppercase tracking-[0.2em] font-serif italic text-stone-700">
                Core Ethos
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#002F5C]">
              Our Values
            </h2>
          </div>

          {/* Minimalist 4-Column Text Strip (No Card Boxes) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {values.map((item, index) => (
              <div
                key={index}
                className="border-t border-stone-300/80 pt-6 flex flex-col items-start text-left"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#FFD200] block mb-2">
                  {item.tag}
                </span>

                <h3 className="text-2xl font-serif font-normal text-[#002F5C] mb-2">
                  {item.title}
                </h3>

                <p className="text-stone-600 text-sm font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Testimonials Section (Reusing TestimonialsSectionV5) */}
      <TestimonialsSectionV5 />

      {/* 7. 24/7 Global Concierge Resort-Style Support Bar */}
      <ConciergeBarV5 />

    </div>
  );
}
