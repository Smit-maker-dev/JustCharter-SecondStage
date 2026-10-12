import React, { useState } from "react";
import {
  Building2,
  ShieldCheck,
  TrendingUp,
  Clock,
  CreditCard,
  FileCheck2,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  Plane,
} from "lucide-react";
import { siteConfig } from "../config/siteConfig";

const valueProps = [
  {
    icon: TrendingUp,
    title: "Zero Listing Fees",
    description:
      "List your fleet at absolutely zero upfront cost. We operate on a transparent success model, earning only on completed charter flights.",
  },
  {
    icon: FileCheck2,
    title: "Pre-Qualified Inquiries",
    description:
      "Every charter request is thoroughly vetted by our operations desk before reaching your dispatch team — eliminating dead leads and spam.",
  },
  {
    icon: Clock,
    title: "Streamlined Dispatch",
    description:
      "Passenger manifests, airport slots, catering requests, and FBO handling are coordinated seamlessly through our 24/7 operations desk.",
  },
  {
    icon: CreditCard,
    title: "Guaranteed Payouts",
    description:
      "Enjoy secure escrow settlements deposited directly into your bank account prior to flight departure for absolute peace of mind.",
  },
];

const onboardingSteps = [
  {
    step: "01",
    title: "Create Operator Profile",
    description:
      "Register your aviation company with basic organizational details and contact credentials.",
  },
  {
    step: "02",
    title: "Submit Compliance Documents",
    description:
      "Upload your DGCA NSOP, aircraft Certificate of Airworthiness (C of A), and insurance certificates.",
  },
  {
    step: "03",
    title: "Fleet Verification",
    description:
      "Our compliance team audits your documentation and verifies safety records within 24 to 48 hours.",
  },
  {
    step: "04",
    title: "Go Live & Receive Bookings",
    description:
      "Your verified fleet appears live on the JustCharter marketplace to corporate flyers and high-intent clients.",
  },
];

const complianceChecklist = [
  "Valid DGCA Non-Scheduled Operator Permit (NSOP)",
  "Current Certificate of Airworthiness (C of A) & Air Operator Certificate",
  "Comprehensive Hull and Third-Party Passenger Liability Insurance",
  "Type-rated captains and first officers meeting regulatory flight hour minimums",
  "Approved DGCA Safety Management System (SMS) & maintenance logs",
  "Dedicated 24/7 operations dispatch point of contact",
];

const operatorFaqs = [
  {
    q: "How much does it cost to list our aircraft on JustCharter?",
    a: "Listing your aircraft on JustCharter is completely free. We do not charge subscription fees or onboarding charges. A transparent commission is applied only when a charter flight is confirmed and paid for.",
  },
  {
    q: "Who determines the charter pricing for our aircraft?",
    a: "You retain full control over your aircraft's hourly rates, minimum daily flight hours, repositioning policies, and crew overnight charges. You can update your availability and rates at any time via the Operator Portal.",
  },
  {
    q: "Who coordinates ground handling, airport slots, and passenger manifests?",
    a: "Our dedicated 24/7 flight operations desk works in close coordination with your dispatch team. We gather verified passenger KYC, coordinate airport slots and FBO access, and confirm catering requirements.",
  },
  {
    q: "How and when are charter payments settled?",
    a: "Charter clients pay JustCharter upfront. Funds are held in escrow and settled directly to your designated bank account prior to aircraft wheels-up, ensuring zero credit risk for your operation.",
  },
];

export default function ForOperatorsPageV5() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#002F5C]">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-gradient-to-b from-stone-100/80 via-stone-50/50 to-white border-b border-stone-200/70">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-1.5 rounded-full border border-stone-200/80 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FFD200]"></span>
            <span className="text-xs uppercase tracking-[0.2em] font-serif italic text-stone-700">
              Partner With JustCharter
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#002F5C] max-w-4xl mx-auto leading-[1.15] mb-6">
            Grow Your Charter Revenue with India's Premier Aviation Marketplace
          </h1>

          <p className="text-stone-600 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-3xl mx-auto mb-10">
            Connect your fleet with corporate flyers, family offices, and high-intent charter clients across India and internationally. Maximize aircraft utilization with zero upfront listing fees.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={siteConfig.operatorPortal.register}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#002F5C] hover:bg-[#002447] text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all group"
            >
              <span>Become a Partner</span>
              <ArrowRight className="w-4 h-4 text-[#FFD200] group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={siteConfig.operatorPortal.login}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white hover:bg-stone-50 text-[#002F5C] border border-stone-300 px-8 py-4 rounded-full text-sm font-semibold tracking-wide shadow-sm hover:shadow transition-all group"
            >
              <span>Operator Portal Login</span>
              <ExternalLink className="w-4 h-4 text-stone-500 group-hover:text-[#002F5C] transition-colors" />
            </a>
          </div>

          {/* Subtext info */}
          <p className="text-xs text-stone-500 mt-6 font-light">
            Exclusively for DGCA-certified Non-Scheduled Operators (NSOP holders)
          </p>
        </div>
      </section>

      {/* 2. Value Propositions Grid */}
      <section className="py-20 sm:py-24 bg-white border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-serif italic text-stone-500">
              Why Partner With Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#002F5C] mt-2 mb-4">
              Built for Modern Aircraft Operators
            </h2>
            <p className="text-stone-600 font-light text-base">
              We empower operators to fill flight schedules, eliminate empty repositioning legs, and reach verified clientele without marketing overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueProps.map((prop, idx) => {
              const Icon = prop.icon;
              return (
                <div
                  key={idx}
                  className="bg-stone-50/70 rounded-2xl p-7 border border-stone-200/80 hover:border-[#FFD200]/50 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white border border-stone-200/80 text-[#002F5C] flex items-center justify-center mb-6 shadow-sm">
                      <Icon className="w-6 h-6 stroke-[1.75]" />
                    </div>
                    <h3 className="text-lg font-serif font-normal text-[#002F5C] mb-2.5">
                      {prop.title}
                    </h3>
                    <p className="text-stone-600 text-sm font-light leading-relaxed">
                      {prop.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. How It Works (Step-by-Step Onboarding) */}
      <section className="py-20 sm:py-24 bg-stone-50/60 border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-serif italic text-stone-500">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#002F5C] mt-2 mb-4">
              How Listing Your Fleet Works
            </h2>
            <p className="text-stone-600 font-light text-base">
              Get onboarded and start receiving live charter inquiries in less than 48 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {onboardingSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-stone-200/80 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-serif font-bold text-[#FFD200] mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-serif font-normal text-[#002F5C] mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-stone-600 text-sm font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Operator Verification & Compliance Criteria */}
      <section className="py-20 sm:py-24 bg-white border-b border-stone-200/70">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="bg-stone-50 rounded-3xl border border-stone-200/80 p-8 sm:p-12 lg:p-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 bg-white px-3.5 py-1 rounded-full border border-stone-200/80 text-xs font-serif italic text-stone-700 mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FFD200]" />
                <span>Operator Standards</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#002F5C] mb-4">
                Operator Eligibility & Verification Criteria
              </h2>
              <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed mb-8">
                To guarantee uncompromising safety and passenger confidence, JustCharter partners exclusively with verified commercial aviation carriers. All operators must satisfy the following baseline standards:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {complianceChecklist.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-stone-200/70">
                    <CheckCircle2 className="w-4 h-4 text-[#FFD200] flex-shrink-0 mt-0.5" />
                    <span className="text-stone-700 text-xs sm:text-sm font-light leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions */}
      <section className="py-20 sm:py-24 bg-white border-b border-stone-200/70">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-[0.2em] font-serif italic text-stone-500">
              Partner Inquiries
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#002F5C] mt-2 mb-3">
              Operator FAQs
            </h2>
            <p className="text-stone-600 font-light text-sm sm:text-base">
              Common questions about joining the JustCharter partner operator network.
            </p>
          </div>

          <div className="divide-y divide-stone-200/80 border-t border-b border-stone-200/80">
            {operatorFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-5 sm:py-6">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-serif font-normal text-[#002F5C] group-hover:text-[#FFD200] transition-colors pr-6">
                      {faq.q}
                    </span>
                    <div className="p-1.5 rounded-full bg-stone-50 border border-stone-200/80 text-stone-600 group-hover:border-[#FFD200]/50 transition-all flex-shrink-0">
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-[#FFD200]" : "text-stone-600"
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-stone-600 text-sm font-light leading-relaxed">
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

      {/* 6. Bottom Call to Action */}
      <section className="py-20 sm:py-24 bg-stone-50 font-sans text-center">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="w-14 h-14 rounded-2xl bg-[#002F5C] text-[#FFD200] flex items-center justify-center mx-auto mb-6 shadow-md">
            <Plane className="w-7 h-7 stroke-[1.75]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#002F5C] mb-4">
            Ready to Maximize Fleet Utilization?
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light max-w-2xl mx-auto mb-8">
            Join India's fastest-growing charter aggregator network. Registration takes less than five minutes.
          </p>
          <a
            href={siteConfig.operatorPortal.register}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-[#002F5C] hover:bg-[#002447] text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all group"
          >
            <span>Register as an Operator</span>
            <ArrowRight className="w-4 h-4 text-[#FFD200] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
}
