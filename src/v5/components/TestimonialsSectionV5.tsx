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
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <section className="py-20 sm:py-32 bg-white font-sans text-[#4A3B2A] overflow-hidden border-t border-stone-200/60">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
        
        {/* Tag Header */}
        <div className="inline-flex items-center space-x-2 bg-stone-100 px-4 py-1.5 rounded-full border border-stone-200/80 mb-8 sm:mb-10">
          <span className="w-2 h-2 rounded-full bg-[#FF9C0A]"></span>
          <span className="text-xs uppercase tracking-[0.2em] font-serif italic text-stone-700">
            Verified Client Reviews
          </span>
        </div>

        {/* Pure Serif Centered Quote */}
        <div key={currentIndex} className="relative mb-10 sm:mb-14 min-h-[180px] sm:min-h-[200px] flex flex-col justify-center items-center transition-all duration-500">
          <Quote className="w-8 sm:w-12 h-8 sm:h-12 text-[#FF9C0A]/25 mb-4 sm:mb-6" />
          <blockquote className="transition-opacity duration-700">
            <p className="text-lg sm:text-3xl lg:text-4xl font-serif italic font-normal text-[#4A3B2A] leading-relaxed max-w-4xl mx-auto px-2">
              "{current.quote}"
            </p>
          </blockquote>
          
          {/* Author Metadata */}
          <div className="mt-6 sm:mt-8">
            <p className="text-sm sm:text-base font-semibold text-[#4A3B2A]">{current.name}</p>
            <p className="text-xs text-stone-500 font-light mt-0.5">{current.title}</p>
          </div>
        </div>

        {/* Delicate Controls */}
        <div className="flex items-center justify-center space-x-4 sm:space-x-6">
          <button
            onClick={prevTestimonial}
            className="p-2.5 sm:p-3 rounded-full border border-stone-200 hover:border-[#4A3B2A] text-stone-600 hover:text-[#4A3B2A] transition-all cursor-pointer"
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
                    ? "w-8 bg-[#FF9C0A]"
                    : "w-2 bg-stone-300 hover:bg-stone-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="p-2.5 sm:p-3 rounded-full border border-stone-200 hover:border-[#4A3B2A] text-stone-600 hover:text-[#4A3B2A] transition-all cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}
