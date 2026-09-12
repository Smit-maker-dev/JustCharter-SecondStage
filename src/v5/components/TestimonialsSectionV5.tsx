import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

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

export default function TestimonialsSectionV5() {
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
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <section className="py-32 bg-white font-sans text-stone-900 overflow-hidden border-t border-stone-200/60">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
        
        {/* Tag Header */}
        <div className="inline-flex items-center space-x-2 bg-stone-100 px-4 py-1.5 rounded-full border border-stone-200/80 mb-10">
          <span className="w-2 h-2 rounded-full bg-[#DFA93B]"></span>
          <span className="text-xs uppercase tracking-[0.2em] font-serif italic text-stone-700">
            Verified Client Reviews
          </span>
        </div>

        {/* Oversized Pure Serif Centered Quote */}
        <div className="relative mb-14 min-h-[160px] sm:min-h-[200px] flex flex-col justify-center items-center">
          <Quote className="w-12 h-12 text-[#DFA93B]/25 mb-6" />
          <blockquote className="transition-opacity duration-700">
            <p className="text-2xl sm:text-4xl lg:text-5xl font-serif italic font-normal text-stone-900 leading-relaxed max-w-4xl mx-auto">
              "{current.quote}"
            </p>
          </blockquote>
        </div>

        {/* Author Metadata */}
        <div className="mb-10">
          <p className="text-base font-semibold text-stone-900">{current.name}</p>
          <p className="text-xs text-stone-500 font-light mt-0.5">{current.title}</p>
        </div>

        {/* Delicate Controls */}
        <div className="flex items-center justify-center space-x-6">
          <button
            onClick={prevTestimonial}
            className="p-3 rounded-full border border-stone-200 hover:border-stone-900 text-stone-600 hover:text-stone-900 transition-all cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx
                    ? "w-8 bg-[#DFA93B]"
                    : "w-2 bg-stone-300 hover:bg-stone-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="p-3 rounded-full border border-stone-200 hover:border-stone-900 text-stone-600 hover:text-stone-900 transition-all cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Global Luxury Travel Magazine Strip */}
        <div className="mt-20 pt-10 border-t border-stone-200/70 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-stone-600 text-xs sm:text-sm font-serif italic">
          <span>"JustCharter consistently exceeds our expectations, setting the gold standard for luxury private aviation."</span>
          <span className="font-sans not-italic text-[10px] uppercase font-bold text-[#DFA93B] bg-stone-100 px-3 py-1 rounded-full border border-stone-200/60 flex-shrink-0">
            Global Luxury Travel Magazine
          </span>
        </div>

      </div>
    </section>
  );
}
