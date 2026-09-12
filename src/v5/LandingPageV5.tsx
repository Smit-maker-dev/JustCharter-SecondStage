import React from "react";
import HeroSectionV5 from "./components/HeroSectionV5";
import ServicesSectionV5 from "./components/ServicesSectionV5";
import FleetSectionV5 from "./components/FleetSectionV5";
import TrustBarV5 from "./components/TrustBarV5";
import AboutStatsSectionV5 from "./components/AboutStatsSectionV5";
import TestimonialsSectionV5 from "./components/TestimonialsSectionV5";
import MembershipSafetySectionV5 from "./components/MembershipSafetySectionV5";
import ConciergeBarV5 from "./components/ConciergeBarV5";
import FooterV5 from "./components/FooterV5";

export default function LandingPageV5() {
  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans antialiased selection:bg-[#DFA93B]/30 selection:text-stone-900">
      {/* 1. Hero Section with Grounded Overlapping Booking Container */}
      <HeroSectionV5 />

      {/* 2. Premium Aviation Services (Spacious 2x2 Grid) */}
      <ServicesSectionV5 />

      {/* 3. Exceptional Aircraft Selection (Lookbook Gallery & Text Tab System) */}
      <FleetSectionV5 />

      {/* 4. Certified Safety Standards Trust Bar */}
      <TrustBarV5 />

      {/* 5. About & Editorial Book-Chapter Statistics Spread */}
      <AboutStatsSectionV5 />

      {/* 6. Centered Oversized Serif Quote Testimonials Section */}
      <TestimonialsSectionV5 />

      {/* 7. Membership Advantages & Safety Commitments (Vertical Lists & Floating Price Tag) */}
      <MembershipSafetySectionV5 />

      {/* 8. 24/7 Global Concierge Resort-Style Support Bar */}
      <ConciergeBarV5 />

      {/* 9. Airy Catalog End-Page Footer */}
      <FooterV5 />
    </div>
  );
}
