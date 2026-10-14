import React, { useState } from "react";
import {
  ShieldCheck,
  TrendingUp,
  Clock,
  CreditCard,
  FileCheck2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  Plane,
  Headphones,
  MessageCircle,
} from "lucide-react";
import { siteConfig } from "../config/siteConfig";

// ============================================================================
// CONFIGURATION & PLACEHOLDERS
// ============================================================================

// Build-time flag: set to true once operator and inquiry counts are officially verified.
// When false, only verified factual metrics are displayed.
const SHOW_STATS = false;

// TODO: replace with real numbers when officially confirmed by JustCharter operations
const OPERATOR_STATS_PLACEHOLDER = [
  { value: "40+", label: "Operators Onboarded" },
  { value: "1,500+", label: "Charter Inquiries Handled" },
];

const FACTUAL_STATS = [
  { value: "< 48 hrs", label: "Onboarding Time" },
  { value: "DGCA-certified operators only", label: "Verified Network" },
  { value: "24/7", label: "Operations Support" },
];

// TODO: replace with real operator desk WhatsApp number (e.g. "+919876543210")
const OPERATOR_WHATSAPP_NUMBER = "+910000000000";
const OPERATOR_WHATSAPP_URL = `https://wa.me/${OPERATOR_WHATSAPP_NUMBER.replace(
  /[^\d]/g,
  ""
)}?text=${encodeURIComponent(
  "Hello JustCharter Operations Desk, I am an aircraft operator interested in partnering."
)}`;

const valueProps = [
  {
    icon: TrendingUp,
    title: "Simple Onboarding",
    description:
      "Get your fleet listed quickly with a straightforward verification process. Commercial terms are discussed directly with our team during onboarding.",
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
    title: "Secure Payments",
    description:
      "Customer payments are handled securely through the JustCharter platform, so you can focus on flying with confidence.",
  },
];

const onboardingSteps = [
  {
    step: "01",
    title: "Create Operator Profile",
    description:
      "Register your aviation company with basic organizational details and verified contact credentials.",
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
      "Our compliance team audits your documentation and verifies safety records with prompt turnaround.",
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
    q: "How do I get started as a partner operator?",
    a: "Registration takes less than five minutes. Once our compliance team verifies your documentation, your fleet goes live on the marketplace. Commercial details are shared by our team during onboarding.",
  },
  {
    q: "Who determines the charter pricing for our aircraft?",
    a: "You maintain authority over your fleet's scheduling and pricing guidelines. Commercial details are shared by our team during onboarding.",
  },
  {
    q: "Who coordinates ground handling, airport slots, and passenger manifests?",
    a: "Our dedicated flight operations desk coordinates directly with your dispatch team for passenger KYC, airport slot alignment, and flight handling support.",
  },
  {
    q: "How and when are charter payments settled?",
    a: "Charter payments are handled securely through the JustCharter platform via verified banking channels. Settlement details and workflows are shared by our team during onboarding.",
  },
];

// ============================================================================
// SUBCOMPONENTS
// ============================================================================

/**
 * Visual mock of the Operator Portal dispatch card.
 * TODO: replace with real screenshot when portal UI assets are ready.
 */
function OperatorPortalMock() {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Layered decorative depth card */}
      <div
        aria-hidden="true"
        className="absolute -top-2.5 -right-2.5 w-full h-full rounded-3xl bg-[#002F5C]/5 border border-[#002F5C]/10 transform rotate-1 pointer-events-none"
      />

      {/* Main card */}
      <div className="relative bg-white rounded-3xl border border-stone-200/90 shadow-xl p-5 sm:p-6 overflow-hidden text-left">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#002F5C] text-[#FFD200] flex items-center justify-center shadow-xs">
              <Plane className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#002F5C] tracking-tight">
                Operator Dispatch Center
              </div>
              <div className="text-[11px] text-stone-500 font-light">
                JustCharter Fleet Desk
              </div>
            </div>
          </div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70 text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active Dispatch</span>
          </div>
        </div>

        {/* Floating Layer 1: New Inquiry Badge */}
        <div className="bg-gradient-to-r from-amber-50/90 via-white to-amber-50/40 rounded-2xl p-3.5 border border-amber-200/90 shadow-xs mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#FFD200] text-[#002F5C] font-bold text-[10px] uppercase tracking-wider">
              New Inquiry
            </span>
            <span className="text-[11px] text-stone-500">Just now · Pre-qualified</span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-sm font-serif font-normal text-[#002F5C]">
              Mumbai (BOM) → New Delhi (DEL)
            </div>
            <div className="text-[11px] text-stone-600 font-medium">
              6 Pax · Citation XLS+
            </div>
          </div>
        </div>

        {/* Fleet List Rows */}
        <div className="space-y-2.5">
          <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold px-1">
            Managed Fleet (3 Aircraft)
          </div>

          {/* Row 1 */}
          <div className="p-3 rounded-xl bg-stone-50/80 border border-stone-200/70 flex items-center justify-between hover:bg-stone-50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <div>
                <div className="text-xs font-semibold text-[#002F5C]">
                  Citation XLS+ · VT-JCS
                </div>
                <div className="text-[11px] text-stone-500">
                  Midsize Jet · Base: BOM · 8 Seats
                </div>
              </div>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80">
              Available
            </span>
          </div>

          {/* Row 2 */}
          <div className="p-3 rounded-xl bg-stone-50/80 border border-stone-200/70 flex items-center justify-between hover:bg-stone-50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-sky-500" />
              <div>
                <div className="text-xs font-semibold text-[#002F5C]">
                  Falcon 2000LX · VT-FLY
                </div>
                <div className="text-[11px] text-stone-500">
                  Heavy Jet · DEL → BLR · En Route
                </div>
              </div>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200/80">
              In Flight
            </span>
          </div>

          {/* Row 3 */}
          <div className="p-3 rounded-xl bg-stone-50/80 border border-stone-200/70 flex items-center justify-between hover:bg-stone-50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <div>
                <div className="text-xs font-semibold text-[#002F5C]">
                  King Air 350i · VT-ACE
                </div>
                <div className="text-[11px] text-stone-500">
                  Turboprop · Base: BLR · 9 Seats
                </div>
              </div>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80">
              Available
            </span>
          </div>
        </div>

        {/* Floating Layer 2: Booking Confirmed Chip */}
        <div className="mt-4 p-2.5 rounded-xl bg-emerald-50/90 border border-emerald-200/80 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
              ✓
            </div>
            <span className="text-xs font-medium text-emerald-900">
              Charter Booking Confirmed · Flight #JC-4891
            </span>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
            Ready
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Proof / Stats strip right under the hero.
 * Features 3 evenly spaced items by default (SHOW_STATS = false).
 */
function StatsStrip() {
  if (!SHOW_STATS) {
    return (
      <section className="bg-[#002F5C] py-8 sm:py-10 border-y border-[#002447] text-white font-sans">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 items-center text-center">
            {FACTUAL_STATS.map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={`font-serif font-normal text-white mb-1.5 tracking-tight ${
                    stat.value.length > 12
                      ? "text-2xl sm:text-3xl lg:text-3xl max-w-[260px] leading-snug"
                      : "text-3xl sm:text-4xl lg:text-5xl"
                  }`}
                >
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-[#FFD200] font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const allStats = [...OPERATOR_STATS_PLACEHOLDER, ...FACTUAL_STATS];

  return (
    <section className="bg-[#002F5C] py-10 sm:py-12 border-y border-[#002447] text-white font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {allStats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center"
            >
              <div
                className={`font-serif font-normal text-white mb-1.5 tracking-tight ${
                  stat.value.length > 12
                    ? "text-xl sm:text-2xl lg:text-2xl leading-snug"
                    : "text-3xl sm:text-4xl lg:text-5xl"
                }`}
              >
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-wider text-[#FFD200] font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ForOperatorsPageV5() {
  // Open the first FAQ by default
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#002F5C]">
      {/* 1. Hero Section (2-Column Desktop, Stacked Mobile) */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 bg-gradient-to-b from-stone-100/90 via-stone-50/60 to-white border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Text & Primary CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center space-x-2 bg-white px-4 py-1.5 rounded-full border border-stone-200/80 shadow-xs mb-6">
                <span className="w-2 h-2 rounded-full bg-[#FFD200]" />
                <span className="text-xs uppercase tracking-[0.2em] font-serif italic text-stone-700">
                  Partner With JustCharter
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-[42px] font-serif font-normal tracking-tight text-[#002F5C] leading-[1.16] [text-wrap:balance] mb-6">
                Grow Your Charter Revenue with India's Aviation Marketplace
              </h1>

              <p className="text-stone-700 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-2xl">
                Connect your fleet with corporate flyers, family offices, and
                high-intent charter clients across India and internationally.
                Maximize aircraft utilization with verified, pre-qualified demand.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                <a
                  href={siteConfig.operatorPortal.register}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-[#002F5C] hover:bg-[#002447] text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all group"
                >
                  <span>Become a Partner</span>
                  <ArrowRight className="w-4 h-4 text-[#FFD200] group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href={siteConfig.operatorPortal.login}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-white hover:bg-stone-50 text-[#002F5C] border border-stone-300 px-7 py-4 rounded-full text-sm font-semibold tracking-wide shadow-xs hover:shadow transition-all group"
                >
                  <span>Operator Portal Login</span>
                  <ExternalLink className="w-4 h-4 text-stone-500 group-hover:text-[#002F5C] transition-colors" />
                </a>
              </div>

              {/* Subtext info */}
              <p className="text-xs text-stone-500 mt-5 font-light">
                Exclusively for DGCA-certified Non-Scheduled Operators (NSOP holders)
              </p>
            </div>

            {/* Right Column: Polished Visual Mock */}
            <div className="lg:col-span-5 w-full">
              <OperatorPortalMock />
              <p className="text-center text-xs text-stone-400 mt-2.5 font-light">
                Illustrative preview
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats / Proof Strip (3 Evenly Spaced Items) */}
      <StatsStrip />

      {/* 3. Value Propositions Grid */}
      <section className="py-20 sm:py-24 bg-white border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-serif italic text-stone-500">
              Why Partner With Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#002F5C] mt-2 mb-4">
              Built for Modern Aircraft Operators
            </h2>
            <p className="text-stone-600 font-light text-base sm:text-lg">
              We empower operators to fill flight schedules, eliminate empty repositioning legs, and reach verified clientele without marketing overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueProps.map((prop, idx) => {
              const Icon = prop.icon;
              return (
                <div
                  key={idx}
                  className="bg-stone-50/70 rounded-2xl p-5 sm:p-6 border border-stone-200/80 hover:border-[#FFD200]/60 hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-white border border-stone-200/80 text-[#002F5C] flex items-center justify-center mb-5 shadow-xs">
                    <Icon className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <h3 className="text-lg font-serif font-normal text-[#002F5C] mb-2">
                    {prop.title}
                  </h3>
                  <p className="text-stone-700 text-[15px] font-normal leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. How It Works (Step-by-Step Onboarding with connector chevrons) */}
      <section className="py-20 sm:py-24 bg-stone-50/60 border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-serif italic text-stone-500">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#002F5C] mt-2 mb-4">
              How Listing Your Fleet Works
            </h2>
            <p className="text-stone-600 font-light text-base sm:text-lg">
              Get onboarded and start receiving live charter inquiries with verified client requests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
            {onboardingSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="mb-4">
                  <div className="text-3xl font-serif font-bold text-[#002F5C]">
                    {step.step}
                  </div>
                  <div className="w-6 h-0.5 bg-[#FFD200] rounded-full mt-1.5" />
                </div>
                <h3 className="text-lg font-serif font-normal text-[#002F5C] mb-2">
                  {step.title}
                </h3>
                <p className="text-stone-700 text-[15px] font-normal leading-relaxed">
                  {step.description}
                </p>

                {/* Subtle chevron connector: vertically centered, placed in the gap between cards, desktop only, muted color */}
                {idx < onboardingSteps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="hidden lg:flex absolute top-1/2 -translate-y-1/2 pointer-events-none items-center justify-center text-stone-400"
                    style={{ left: "calc(100% + 1rem)", transform: "translate(-50%, -50%)" }}
                  >
                    <ChevronRight className="w-5 h-5 text-stone-400" strokeWidth={1.75} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Operator Verification & Compliance Criteria (2-Column Grid with Contact Card) */}
      <section className="py-20 sm:py-24 bg-white border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-stone-50/90 rounded-3xl border border-stone-200/80 p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Left Column: Criteria Grid */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center space-x-2 bg-white px-3.5 py-1 rounded-full border border-stone-200/80 text-xs font-serif italic text-stone-700 mb-4">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FFD200]" />
                    <span>Operator Standards</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-[#002F5C] mb-4">
                    Operator Eligibility & Verification Criteria
                  </h2>
                  <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed mb-6">
                    To maintain uncompromising safety and passenger confidence, JustCharter partners exclusively with verified commercial aviation carriers. All operators must satisfy the following baseline standards:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {complianceChecklist.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-stone-200/70 shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#FFD200] flex-shrink-0 mt-0.5" />
                      <span className="text-stone-800 text-xs sm:text-sm font-medium leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Operations Desk Direct Contact Note Card */}
              <div className="lg:col-span-4 flex flex-col">
                <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-7 shadow-xs flex flex-col justify-between h-full">
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-[#002F5C]/5 text-[#002F5C] flex items-center justify-center mb-4">
                      <Headphones className="w-5 h-5 text-[#002F5C]" />
                    </div>
                    <h3 className="text-lg font-serif font-normal text-[#002F5C] mb-1">
                      Not sure you qualify?
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-[#8A6D00] font-semibold mb-3">
                      Talk to our operations team
                    </p>
                    <p className="text-stone-700 text-sm leading-relaxed font-light">
                      Our compliance desk assists certified operators through document submission, permit audits, and fleet onboarding.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100">
                    {/* TODO: replace with real operator contact WhatsApp number */}
                    <a
                      href={OPERATOR_WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center space-x-2 bg-[#FFD200] hover:bg-[#e6be00] text-[#002F5C] py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-[#002F5C]" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Frequently Asked Questions */}
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
                    aria-controls={`faq-answer-${idx}`}
                    id={`faq-question-${idx}`}
                  >
                    <span className="text-base sm:text-lg font-serif font-normal text-[#002F5C] group-hover:text-[#8A6D00] transition-colors pr-6">
                      {faq.q}
                    </span>
                    <div className="p-1.5 rounded-full bg-stone-50 border border-stone-200/80 text-stone-600 group-hover:border-[#FFD200]/70 transition-all flex-shrink-0">
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-[#8A6D00]" : "text-stone-600"
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-question-${idx}`}
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-stone-700 text-[15px] font-normal leading-relaxed">
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

      {/* 7. Bottom Call to Action (Deep Navy Background for Rhythm) */}
      <section className="py-20 sm:py-24 bg-[#002F5C] font-sans text-center text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#FFD200] border border-white/10 flex items-center justify-center mx-auto mb-6 shadow-md">
            <Plane className="w-7 h-7 stroke-[1.75]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white mb-4">
            Ready to Maximize Fleet Utilization?
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-light max-w-2xl mx-auto mb-8">
            Join a growing marketplace for India's charter operators. Registration takes less than five minutes.
          </p>

          <a
            href={siteConfig.operatorPortal.register}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-[#FFD200] hover:bg-[#e6be00] text-[#002F5C] px-8 py-4 rounded-full text-sm font-bold tracking-wide shadow-md hover:shadow-lg transition-all group"
          >
            <span>Become a Partner</span>
            <ArrowRight className="w-4 h-4 text-[#002F5C] group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Operator Direct WhatsApp contact */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-stone-300 text-xs sm:text-sm">
              Prefer to talk?{" "}
              {/* TODO: replace with real operator WhatsApp number */}
              <a
                href={OPERATOR_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-[#FFD200] hover:text-[#fff3b8] font-semibold underline underline-offset-4 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 inline mr-1" />
                <span>WhatsApp us</span>
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
