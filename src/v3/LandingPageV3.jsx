import React from "react";
import HeroSectionV3 from "./components/HeroSectionV3";
import ServicesSectionV3 from "./components/ServicesSectionV3";
import FleetSectionV3 from "./components/FleetSectionV3";
import TrustBarV3 from "./components/TrustBarV3";
import AboutStatsSectionV3 from "./components/AboutStatsSectionV3";
import TestimonialsSectionV3 from "./components/TestimonialsSectionV3";
import MembershipSafetySectionV3 from "./components/MembershipSafetySectionV3";
import ConciergeBarV3 from "./components/ConciergeBarV3";

export default function LandingPageV3() {
  return (
    <div className="min-h-screen bg-white text-[#4A3B2A] font-sans antialiased selection:bg-[#FF9C0A]/20 selection:text-[#4A3B2A]">
      {/* 1. Hero Section with Aligned Direct Quote Pill */}
      <HeroSectionV3 />

      {/* 2. Premium Aviation Services */}
      <ServicesSectionV3 />

      {/* 3. Exceptional Aircraft Selection */}
      <FleetSectionV3 />

      {/* 4. Dedicated Safety Certifications Trust Bar */}
      <TrustBarV3 />

      {/* 5. About & Corrected Stat Icons */}
      <AboutStatsSectionV3 />

      {/* 6. Rotating Focus Testimonial Carousel */}
      <TestimonialsSectionV3 />

      {/* 7. Membership & Safety (Pricing Tag Position Fixed) */}
      <MembershipSafetySectionV3 />

      {/* 8. 24/7 Global Concierge Support Strip (+1 800 555-JET) */}
      <ConciergeBarV3 />
    </div>
  );
}
