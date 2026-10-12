import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  q: string;
  a: React.ReactNode;
}

const faqs: FaqItem[] = [
  {
    q: "What is JustCharter and how does it work?",
    a: "JustCharter is an online marketplace connecting charter clients directly with verified third-party aircraft operators across India and internationally. We help you compare options, provide transparent pricing, and coordinate your booking with our support team.",
  },
  {
    q: "Does JustCharter own the aircraft?",
    a: "No. JustCharter is an aggregator and marketplace, not an air operator. All charter flights are operated by DGCA-certified Non-Scheduled Operators (NSOP holders) who own and manage the aircraft. We curate the network, audit safety and compliance, and manage your booking experience.",
  },
  {
    q: "How are operators verified?",
    a: "Before any aircraft is approved on our marketplace, our operations team verifies its valid Certificate of Registration, Certificate of Airworthiness, active insurance documentation, and maintenance records. We also inspect flight crew credentials including pilot type ratings, licenses, and logged flight hours for the specific aircraft.",
  },
  {
    q: "How do I get a quote?",
    a: "You can request a quote online in under two minutes by entering your route, date, and passenger count. Our platform checks operator availability and our operations team returns verified pricing within 4 hours. No upfront payment is required to receive a quote.",
  },
  {
    q: "What's included in the quoted price?",
    a: "Our quotes are fully transparent and include aircraft charter, crew fees, standard in-flight catering, and airport passenger handling. Landing fees, parking fees, night-parking charges, and GST are clearly itemized so there are never surprises.",
  },
  {
    q: "Can I bring pets on board?",
    a: "Yes, on most partner aircraft. Because aircraft are managed by independent operators, pet policies vary slightly by operator and aircraft type. Let our team know during your request and we will match you with a pet-friendly operator.",
  },
  {
    q: "How far in advance do I need to book?",
    a: "We can coordinate flights with as little as 4 hours' notice depending on aircraft positioning, though 24-48 hours' notice provides the widest selection of aircraft and the best pricing.",
  },
  {
    q: "Can I cancel or reschedule my flight?",
    a: "Yes. Cancellation and reschedule terms are set by the operating carrier for each flight and are presented clearly on your booking agreement before payment. Our team manages all change requests directly with the operator on your behalf.",
  },
  {
    q: "What happens if an operator cancels or has a technical issue?",
    a: "In the rare event of an operational issue, our operations desk immediately activates our network to source equivalent replacement aircraft from other verified operators at no additional cost to you, or provides a full refund.",
  },
  {
    q: "I am an aircraft operator. How do I list my fleet?",
    a: (
      <span>
        DGCA-certified operators can apply to join our network at{" "}
        <Link
          to="/for-operators"
          className="text-[#002F5C] font-semibold underline decoration-[#FFD200] underline-offset-4 hover:text-[#002F5C]/80"
        >
          justcharter.in/for-operators
        </Link>
        . Once your NSOP, insurance, and fleet documentation are verified, your
        aircraft become visible to high-intent charter clients across India.
      </span>
    ),
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
