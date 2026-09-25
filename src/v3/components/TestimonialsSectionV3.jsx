import React, { useState, useEffect } from "react";
import { Star, Users, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Jonathan Harrington",
    title: "CEO, Harrington Industries",
    quote:
      "The level of service provided by JustCharter is unmatched. From the moment we boarded to landing, every detail was handled flawlessly.",
  },
  {
    name: "Sophia Williams",
    title: "Entertainment Executive",
    quote:
      "As someone who flies privately over 40 times a year, I can confidently say JustCharter offers the most seamless and luxurious experience in the market.",
  },
  {
    name: "Alexander Chen",
    title: "Global Investment Director",
    quote:
      "The privacy and comfort allowed me to arrive refreshed and prepared for my meetings. The crew’s attention to detail was exceptional.",
  },
];

export default function TestimonialsSectionV3() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 bg-stone-50 font-sans text-[#4A3B2A] overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-1.5 rounded-full border border-slate-200/80 shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-[#FF9C0A]"></span>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-700">
              Verified Client Reviews
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#4A3B2A] mb-4">
            Trusted by Discerning Clients
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            See what our distinguished clientele have to say about their experiences with JustCharter Luxury Journeys.
          </p>
        </div>

        {/* Rotating Testimonial Focus Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.03)] relative">
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="text-[#FF9C0A] fill-[#FF9C0A]"
                />
              ))}
            </div>
            <Quote className="w-8 h-8 text-slate-200" />
          </div>

          <blockquote className="min-h-[120px] flex items-center justify-center my-6">
            <p className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-[#4A3B2A] leading-relaxed text-center font-medium">
              "{current.quote}"
            </p>
          </blockquote>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-slate-100 gap-4">
            
            <div className="flex items-center">
              <div className="w-11 h-11 rounded-full bg-slate-900 text-[#FF9C0A] flex items-center justify-center font-bold text-sm">
                <Users size={18} />
              </div>
              <div className="ml-3 text-left">
                <p className="text-sm font-bold text-[#4A3B2A]">{current.name}</p>
                <p className="text-xs text-slate-500 font-medium">{current.title}</p>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center space-x-3">
              <button
                onClick={prevTestimonial}
                className="p-2.5 rounded-full border border-slate-200 hover:border-[#4A3B2A] text-slate-600 hover:text-[#4A3B2A] transition-all cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center space-x-1.5">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx
                        ? "w-6 bg-[#FF9C0A]"
                        : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2.5 rounded-full border border-slate-200 hover:border-[#4A3B2A] text-slate-600 hover:text-[#4A3B2A] transition-all cursor-pointer"
                aria-label="Next Testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>

          </div>
        </div>

        {/* ITEM 6 FIX: Global Luxury Travel Magazine Pull-Quote Attribution Strip with clean spacing below box */}
        <div className="mt-10 bg-white rounded-2xl p-6 px-8 border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.02)] text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm sm:text-base font-serif italic text-slate-800">
            "JustCharter consistently exceeds our expectations, setting the gold standard for luxury private aviation."
          </p>
          <div className="inline-flex items-center space-x-2 bg-stone-100 px-4 py-2 rounded-full border border-slate-200/80 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#FF9C0A]"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#4A3B2A]">
              Global Luxury Travel Magazine
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
