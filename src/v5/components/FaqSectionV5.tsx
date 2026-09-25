import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: "How far in advance do I need to book a charter flight?",
    a: "We can arrange flights with as little as 4 hours' notice depending on aircraft availability, though we recommend booking 24-48 hours ahead for the widest choice of aircraft and the best rates.",
  },
  {
    q: "What's included in the hourly rate?",
    a: "Our rates include the aircraft, crew, standard catering, and ground handling fees. Landing fees, international permits, and de-icing (where applicable) are billed separately and itemized in your quote.",
  },
  {
    q: "Can I bring pets on board?",
    a: "Yes. Unlike commercial airlines, private charter has no pet restrictions — your pet can fly in the cabin with you at no extra charge on most aircraft in our fleet.",
  },
  {
    q: "How many passengers can your aircraft carry?",
    a: "Our fleet ranges from 9-passenger midsize jets to 19-passenger ultra-long-range aircraft. Tell us your group size and route, and we'll recommend the right aircraft for your trip.",
  },
  {
    q: "What safety certifications does JustCharter operate under?",
    a: "Every aircraft in our network operates under ARGUS Platinum, Wyvern Wingman, IS-BAO Stage 3, and IBAC accreditation — the industry's most rigorous safety and operational standards.",
  },
  {
    q: "Can I cancel or change my booking?",
    a: "Yes, subject to our cancellation policy, which varies based on how close to departure the change is requested. Full details are available in our Cancellation Policy page, and your concierge can walk you through options for your specific booking.",
  },
  {
    q: "Do you offer empty leg (discounted) flights?",
    a: "Yes, empty leg flights let you fly on repositioning aircraft at a significant discount. Availability changes daily based on our fleet's movements — contact our concierge team to check current empty leg opportunities on your route.",
  },
  {
    q: "Is membership required to book with JustCharter?",
    a: "No, membership is optional. You can book charter flights directly at any time. Membership simply unlocks guaranteed availability, fixed hourly rates, and additional concierge benefits for frequent flyers.",
  },
];

export default function FaqSectionV5() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-24 sm:py-28 bg-white font-sans text-[#002F5C] overflow-hidden border-t border-stone-200/60">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 bg-stone-100 px-4 py-1.5 rounded-full border border-stone-200/80 shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-[#FFD200]"></span>
            <span className="text-xs uppercase tracking-[0.2em] font-serif italic text-stone-700">
              Frequently Asked Questions
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#002F5C] mb-6">
            Questions, Answered
          </h2>

          <p className="text-stone-600 text-base sm:text-lg font-sans font-light leading-relaxed">
            Everything you need to know before your first flight with JustCharter.
          </p>
        </div>

        {/* Accordion Divided List */}
        <div className="max-w-4xl mx-auto divide-y divide-stone-200/80 border-t border-b border-stone-200/80">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-5 sm:py-6 transition-colors">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg sm:text-xl font-serif font-normal text-[#002F5C] group-hover:text-[#FFD200] transition-colors pr-6">
                    {faq.q}
                  </span>
                  <div className="p-1.5 sm:p-2 rounded-full bg-stone-50 border border-stone-200/80 text-stone-600 group-hover:border-[#FFD200]/50 transition-all flex-shrink-0">
                    <ChevronDown
                      className={`w-4 sm:w-5 h-4 sm:h-5 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#FFD200]" : "text-stone-600"
                      }`}
                    />
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed max-w-3xl">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
