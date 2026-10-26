import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Plane } from "lucide-react";

export default function MobileStickyQuoteBar() {
  const location = useLocation();
  const [isHeroSearchVisible, setIsHeroSearchVisible] = useState(false);

  useEffect(() => {
    // If not on home page or page without #hero-search-card, hero search is not visible
    const target = document.getElementById("hero-search-card");
    if (!target) {
      setIsHeroSearchVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroSearchVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // considered visible if at least 10% is in viewport
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [location.pathname]);

  const isOperatorPage =
    location.pathname === "/for-operators" || location.pathname === "/for_operators";

  // Hidden on /request-quote itself, operator pages, air-ambulance pages, or while the hero search card is in the viewport
  if (
    location.pathname === "/request-quote" ||
    location.pathname.startsWith("/air-ambulance") ||
    isOperatorPage ||
    isHeroSearchVisible
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-stone-200/80 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-all duration-300">
      <Link
        to="/request-quote"
        className="w-full bg-[#FFD200] hover:bg-[#e6be00] active:scale-[0.98] text-[#002F5C] font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all min-h-[48px] cursor-pointer"
      >
        <Plane className="w-4 h-4 text-[#002F5C]" />
        <span>Request Quote</span>
        <ArrowRight className="w-4 h-4 text-[#002F5C]" />
      </Link>
    </div>
  );
}
