import React from "react";
import HeroSectionV5 from "./components/HeroSectionV5";
import TrustStripV5 from "./components/TrustStripV5";
import FleetSectionV5 from "./components/FleetSectionV5";
import HowItWorksSectionV5 from "./components/HowItWorksSectionV5";
import MembershipSafetySectionV5 from "./components/MembershipSafetySectionV5";
import TestimonialsSectionV5 from "./components/TestimonialsSectionV5";
import AboutStatsSectionV5 from "./components/AboutStatsSectionV5";
import FaqSectionV5 from "./components/FaqSectionV5";
import OperatorStripV5 from "./components/OperatorStripV5";
import ConciergeBarV5 from "./components/ConciergeBarV5";

export default function LandingPageV5() {
  return (
    <div className="min-h-screen bg-white text-[#002F5C] font-sans antialiased selection:bg-[#FFD200]/30 selection:text-[#002F5C]">
      {/* 1. Hero Section */}
      <HeroSectionV5 />

      {/* 2. Trust Strip */}
      <TrustStripV5 />

      {/* 3. Exceptional Aircraft Selection (Fleet) */}
      <FleetSectionV5 />

      {/* 4. How JustCharter Works (4-Step Marketplace Process) */}
      <HowItWorksSectionV5 />

      {/* 5. Why Book with JustCharter + Uncompromising Protection */}
      <MembershipSafetySectionV5 />

      {/* 6. Client Reviews (Testimonials) */}
      <TestimonialsSectionV5 />

      {/* 7. About & Editorial Statistics Spread (Compact) */}
      <AboutStatsSectionV5 />

      {/* 8. Frequently Asked Questions */}
      <FaqSectionV5 />

      {/* 9. Operator Partnership Strip */}
      <OperatorStripV5 />

      {/* 10. 24/7 Global Concierge CTA Banner */}
      <ConciergeBarV5 />
    </div>
  );
}

