import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import {
  ArrowRight,
  Plane,
  Users,
  Package,
  Clock,
  ShieldCheck,
  HeartPulse,
  ArrowUp,
  Search,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
} from "lucide-react";
import { Helmet } from 'react-helmet-async';
import { Suspense, lazy, useEffect, useState, useRef } from "react";
const ServicesPage = lazy(() => import("./pages/Services"));
const DestinationsPage = lazy(() => import("./pages/Destinations"));
const MembersPage = lazy(() => import("./pages/Members"));
const AboutPage = lazy(() => import("./pages/About"));
const EmptyLegsPage = lazy(() => import("./pages/EmptyLegs"));
const FleetPage = lazy(() => import("./pages/Fleet"));
const AircraftDetailsPage = lazy(() => import("./pages/AircraftDetails"));
const ContactPage = lazy(() => import("./pages/Contact"));
const SafetyFirstPage = lazy(() => import("./pages/SafetyFirst"));
const CareersPage = lazy(() => import("./pages/Careers"));
const CorporateAccountsPage = lazy(() => import("./pages/CorporateAccounts"));
const LoginPage = lazy(() => import("./pages/Login"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicy"));
const TermsPage = lazy(() => import("./pages/Terms"));
const CookiePolicyPage = lazy(() => import("./pages/CookiePolicy"));
const HistoryPage = lazy(() => import("./pages/History"));
const TripPlannerPage = lazy(() => import("./pages/TripPlanner"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));


const LogoIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 256 256"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M 128 16 L 240 224 L 128 192 L 16 224 Z" />
  </svg>
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

import AirAmbulanceModal from "./components/AirAmbulanceModal";
import BookingModal from "./components/BookingModal";
import SplashScreen from "./components/SplashScreen";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const discoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setIsDiscoverOpen(false);
      }
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (discoverRef.current && !discoverRef.current.contains(event.target as Node)) {
        setIsDiscoverOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus trapping for mobile menu
  useEffect(() => {
    if (isMenuOpen && mobileMenuRef.current) {
      const focusableElements = mobileMenuRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [isMenuOpen]);

  const isMinimal = scrolled && !isHovered && !isMenuOpen;

  return (
    <>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 bg-black dark:bg-white text-white dark:text-black px-6 py-3 z-[60] rounded-full font-medium shadow-2xl transition-all"
      >
        Skip to main content
      </a>
      <nav 
        aria-label="Main navigation"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed left-0 right-0 z-50 flex justify-center transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? "top-4 px-4 sm:px-6" : "top-0 px-4 sm:px-6 py-4 sm:py-5"
        }`}
      >
        <div 
          className={`w-full mx-auto flex items-center justify-between transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-visible ${
             scrolled
              ? isMinimal 
                ? "bg-white/80 dark:bg-black/90 backdrop-blur-md shadow-lg border border-black/10 dark:border-white/10 rounded-full px-5 py-2.5 max-w-[14rem] sm:max-w-[18rem]"
                : "bg-white/95 dark:bg-black/95 backdrop-blur-xl shadow-xl border border-black/10 dark:border-white/10 rounded-full px-6 py-3.5 max-w-[88rem]"
              : "bg-transparent max-w-[88rem]"
          }`}
        >
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <LogoIcon className={`transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] text-black dark:text-white shrink-0 ${isMinimal ? "w-6 h-6" : "w-7 h-7"}`} />
            
            <div className={`flex items-center overflow-hidden transition-all duration-[600ms] origin-left ease-[cubic-bezier(0.16,1,0.3,1)] ${isMinimal ? "w-4 sm:w-6 opacity-100" : "w-[6.5rem] opacity-100"}`}>
              <span className={`font-medium tracking-tight text-black dark:text-white transition-all duration-[600ms] absolute whitespace-nowrap ${isMinimal ? "opacity-0 -translate-x-4 pointer-events-none text-xl" : "opacity-100 translate-x-0 text-2xl"}`}>
                JustCharter
              </span>
              <span className={`font-medium tracking-tight text-black dark:text-white transition-all duration-[600ms] absolute text-xl sm:text-2xl whitespace-nowrap ${isMinimal ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"}`}>
                JC
              </span>
            </div>
          </Link>
          
          <div className={`hidden lg:flex items-center justify-center transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap ${
            isMinimal ? "max-w-0 opacity-0 pointer-events-none px-0 overflow-hidden" : "max-w-[800px] opacity-100 flex-1 px-8 overflow-visible"
          }`}>
            <div className="flex items-center gap-6 xl:gap-8">
              <Link
                to="/fleet"
                className="text-base text-gray-700 dark:text-gray-300 hover:text-black dark:text-white font-medium transition-colors duration-200"
              >
                Fleet
              </Link>
              <Link
                to="/destinations"
                className="text-base text-gray-700 dark:text-gray-300 hover:text-black dark:text-white font-medium transition-colors duration-200"
              >
                Destinations
              </Link>
              <Link
                to="/services"
                className="text-base text-gray-700 dark:text-gray-300 hover:text-black dark:text-white font-medium transition-colors duration-200"
              >
                Services
              </Link>
              <Link
                to="/planner"
                className="text-base text-gray-700 dark:text-gray-300 hover:text-black dark:text-white font-medium transition-colors duration-200"
              >
                Trip Planner
              </Link>
              <div className="relative" ref={discoverRef}>
                <button 
                  aria-expanded={isDiscoverOpen}
                  aria-haspopup="true"
                  aria-label="Discover more links"
                  onClick={() => setIsDiscoverOpen(!isDiscoverOpen)}
                  className="flex items-center gap-1 text-base text-gray-700 dark:text-gray-300 hover:text-black dark:text-white font-medium transition-colors duration-200"
                >
                  Discover <ChevronDown className={`w-4 h-4 transition-transform ${isDiscoverOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-xl transition-all duration-200 overflow-hidden flex flex-col py-2 z-50 ${isDiscoverOpen ? "opacity-100 visible h-auto" : "opacity-0 invisible h-0"}`}>
                  <Link to="/empty-legs" onClick={() => setIsDiscoverOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:text-white transition-colors">
                    Empty Legs
                  </Link>
                  <Link to="/members" onClick={() => setIsDiscoverOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:text-white transition-colors">
                    Members
                  </Link>
                  <Link to="/about" onClick={() => setIsDiscoverOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:text-white transition-colors">
                    About Us
                  </Link>
                  <Link to="/history" onClick={() => setIsDiscoverOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:text-white transition-colors">
                    History
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center shrink-0">
            <div className={`hidden lg:flex transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden items-center ${
              isMinimal ? "max-w-0 opacity-0 pointer-events-none mr-0" : "max-w-[400px] opacity-100 mr-4"
            }`}>
              <div className="flex items-center bg-black/5 dark:bg-white/10 rounded-full px-4 py-2 border border-black/10 dark:border-white/20 focus-within:bg-white dark:bg-neutral-950 focus-within:border-black/20 dark:border-white/20 focus-within:shadow-sm transition-all duration-200">
                <label htmlFor="search-input" className="sr-only">Search site</label>
                <Search className="w-4 h-4 text-black/50 dark:text-white/50 shrink-0" />
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none focus:outline-none text-sm ml-2 w-24 xl:w-48 placeholder:text-black/40 dark:text-white/40 text-black dark:text-white"
                />
              </div>
            </div>
            
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className={`hidden sm:flex items-center justify-center bg-black dark:bg-white text-white dark:text-black font-medium rounded-full hover:bg-brand transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap overflow-hidden ${
                isMinimal ? "w-10 h-10 p-0 text-transparent ml-2" : "px-7 py-2.5 text-base w-auto"
              }`}
            >
              <div className="relative flex items-center justify-center pointer-events-none">
                <Plane className={`absolute transition-all duration-[600ms] ${isMinimal ? "opacity-100 text-white dark:text-black w-4 h-4" : "opacity-0 w-0 h-0"}`} />
                <span className={`transition-all duration-[600ms] ${isMinimal ? "opacity-0" : "opacity-100"}`}>Book a Flight</span>
              </div>
            </button>
            
            <button
              className={`lg:hidden block p-2 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 dark:bg-white/10 rounded-full transition-all duration-[600ms] focus-visible:outline-2 focus-visible:outline-black dark:focus-visible:outline-white ${
                isMinimal ? "ml-1 sm:ml-2" : "ml-4"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 shrink-0" />
              ) : (
                <Menu className="w-6 h-6 shrink-0" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="absolute top-full left-4 right-4 lg:hidden mt-2 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl shadow-2xl border border-black/10 dark:border-white/10 rounded-3xl flex flex-col p-6 gap-2 animate-fade-1 z-50 origin-top"
          >
            <Link
              to="/fleet"
              onClick={() => setIsMenuOpen(false)}
              className="text-xl text-black dark:text-white font-medium py-2 border-b border-black/5 dark:border-white/5"
            >
              Fleet
            </Link>
            <Link
              to="/destinations"
              onClick={() => setIsMenuOpen(false)}
              className="text-xl text-black dark:text-white font-medium py-2 border-b border-black/5 dark:border-white/5"
            >
              Destinations
            </Link>
            <Link
              to="/services"
              onClick={() => setIsMenuOpen(false)}
              className="text-xl text-black dark:text-white font-medium py-2 border-b border-black/5 dark:border-white/5"
            >
              Services
            </Link>
            <Link
              to="/empty-legs"
              onClick={() => setIsMenuOpen(false)}
              className="text-xl text-black dark:text-white font-medium py-2 border-b border-black/5 dark:border-white/5"
            >
              Empty Legs
            </Link>
            <Link
              to="/members"
              onClick={() => setIsMenuOpen(false)}
              className="text-xl text-black dark:text-white font-medium py-2 border-b border-black/5 dark:border-white/5"
            >
              Members
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="text-xl text-black dark:text-white font-medium py-2 border-b border-black/5 dark:border-white/5"
            >
              About
            </Link>
            <Link
              to="/planner"
              onClick={() => setIsMenuOpen(false)}
              className="text-xl text-black dark:text-white font-medium py-2 border-b border-black/5 dark:border-white/5"
            >
              Trip Planner
            </Link>
            <Link
              to="/history"
              onClick={() => setIsMenuOpen(false)}
              className="text-xl text-black dark:text-white font-medium py-2 mb-4"
            >
              History
            </Link>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsBookingModalOpen(true);
              }}
              className="w-full bg-black dark:bg-white text-white dark:text-black text-lg font-medium px-7 py-3 rounded-full hover:bg-brand transition-colors duration-200 mb-2 mt-2"
            >
              Book a Flight
            </button>
          </div>
        )}
      </nav>

      {/* Global Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}

function HeroSection() {
  const brandList = [
    {
      name: "Gulfstream",
      style: {
        fontFamily: "Georgia, serif",
        fontWeight: 700,
        letterSpacing: "-0.02em",
        fontSize: "15px",
      },
    },
    {
      name: "Bombardier",
      style: {
        fontFamily: "Arial, sans-serif",
        fontWeight: 900,
        letterSpacing: "0.08em",
        fontSize: "13px",
        textTransform: "uppercase" as const,
      },
    },
    {
      name: "Dassault",
      style: {
        fontFamily: "Trebuchet MS",
        fontWeight: 600,
        letterSpacing: "0.01em",
        fontSize: "15px",
        fontStyle: "italic",
      },
    },
    {
      name: "Embraer",
      style: {
        fontFamily: "Courier New, monospace",
        fontWeight: 700,
        letterSpacing: "0.12em",
        fontSize: "13px",
        textTransform: "uppercase" as const,
      },
    },
    {
      name: "Cessna",
      style: {
        fontFamily: "Palatino, Book Antiqua",
        fontWeight: 400,
        letterSpacing: "-0.01em",
        fontSize: "16px",
      },
    },
    {
      name: "Pilatus",
      style: {
        fontFamily: "Impact, Arial Narrow",
        fontWeight: 400,
        letterSpacing: "0.04em",
        fontSize: "14px",
      },
    },
    {
      name: "Beechcraft",
      style: {
        fontFamily: "Verdana, sans-serif",
        fontWeight: 700,
        letterSpacing: "-0.03em",
        fontSize: "13px",
      },
    },
  ];

  return (
    <div className="flex-1 px-4 md:px-6 pt-20 pb-4 md:pb-6 flex items-end">
      <div
        className="relative w-full max-w-[88rem] mx-auto rounded-3xl md:rounded-2xl overflow-hidden min-h-[600px] md:min-h-0"
        style={{ height: "calc(100vh - 96px)" }}
      >
        <div className="absolute inset-0 w-full h-full bg-black">
            <img
            referrerPolicy="no-referrer"
            className="object-cover absolute inset-0 w-full h-full animate-fade-1"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/N975QS_2002_Cessna_750_C-N_750-0175_Citation_X_%287039507775%29.jpg/1280px-N975QS_2002_Cessna_750_C-N_750-0175_Citation_X_%287039507775%29.jpg"
            alt="Luxury private jet on runway at sunset"
          />
          <img
            referrerPolicy="no-referrer"
            className="object-cover absolute inset-0 w-full h-full animate-fade-2"
            src="https://upload.wikimedia.org/wikipedia/commons/4/4d/BBJ_interior_2011.jpg"
            alt="Private jet cabin with luxury leather seating"
          />
        </div>
        <div className="relative z-10 flex flex-col items-start justify-start h-full p-6 sm:p-10 md:p-12 pt-28 sm:pt-36 bg-gradient-to-r from-white/90 sm:from-white/60 md:to-transparent backdrop-blur-[4px] sm:backdrop-blur-[2px]">
          <h1
            className="text-black dark:text-white text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.1] md:leading-tight max-w-xl mb-4"
            style={{ letterSpacing: "-0.04em" }}
          >
            Your Journey,
            <br />
            Elevated.
          </h1>
          <p
            className="text-black/80 dark:text-white/80 text-base md:text-lg max-w-md mb-8 leading-relaxed"
            style={{
              fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
            }}
          >
            An exclusive, on-demand charter network built for seamless bookings,
            absolute privacy, and unparalleled luxury travel.
          </p>
          <button className="inline-flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black text-base md:text-lg font-medium pl-6 md:pl-8 pr-2 py-2 rounded-full hover:bg-brand transition-colors duration-200">
            Explore Fleet
            <span className="bg-white dark:bg-neutral-950 rounded-full p-2 flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-black dark:text-white" />
            </span>
          </button>

          <div className="mt-auto md:mt-24 w-full max-w-md overflow-hidden mask-image-linear-gradient pt-8 md:pt-0">
            <div className="marquee-track">
              {[...brandList, ...brandList].map((brand, i) => (
                <div
                  key={i}
                  className="mx-7 shrink-0 text-black/70 dark:text-white/70 whitespace-nowrap"
                  style={brand.style}
                >
                  {brand.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoSection() {
  return (
    <section className="bg-[#F5F5F5] dark:bg-neutral-900 px-4 sm:px-6 py-16 md:py-24">
      <div className="max-w-[88rem] mx-auto w-full">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
          <div>
            <h2
              className="text-black dark:text-white text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6 md:mb-8"
              style={{ letterSpacing: "-0.03em" }}
            >
              Meet JustCharter.
            </h2>
            <button className="inline-flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black text-base font-medium pl-6 pr-1.5 py-1.5 rounded-full hover:bg-brand transition-colors duration-200 cursor-pointer">
              Discover more
              <span className="bg-white dark:bg-neutral-950 rounded-full p-1.5 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-black dark:text-white" />
              </span>
            </button>
          </div>
          <div>
            <p className="text-black/70 dark:text-white/70 text-2xl md:text-3xl leading-relaxed">
              JustCharter is your personal gateway to private aviation and
              luxury travel. Skip the commercial lines and fly on your own
              terms, completely stress-free.
            </p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl sm:col-span-2 relative overflow-hidden">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Gulfstream_G650ER%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0749%29.jpg/1280px-Gulfstream_G650ER%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0749%29.jpg"
              alt="Gulfstream G650ER private jet in flight above the clouds"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative p-7 min-h-80 flex flex-col justify-between z-10 h-full">
              <h3
                className="text-white text-2xl font-medium leading-snug"
                style={{ letterSpacing: "-0.02em" }}
              >
                Travel that inspires
              </h3>
              <p className="text-white/90 text-base max-w-xs mt-8">
                Experience first-class comfort, exquisite dining, and total
                privacy every time you step on board.
              </p>
            </div>
          </div>

          <div className="bg-[#2B2644] rounded-2xl p-7 min-h-80 flex flex-col justify-between">
            <h3
              className="text-white text-2xl font-medium leading-snug whitespace-pre-line"
              style={{ letterSpacing: "-0.02em" }}
            >
              {"Always ready,\nalways private."}
            </h3>
            <p className="text-white/60 text-base mt-8">
              Gain on-demand access to a global fleet. No memberships required,
              no hidden fees.
            </p>
          </div>

          <div className="bg-[#2B2644] rounded-2xl p-7 min-h-80 flex flex-col justify-between">
            <h3
              className="text-white text-2xl font-medium leading-snug whitespace-pre-line"
              style={{ letterSpacing: "-0.02em" }}
            >
              {"Fully\npersonalized"}
            </h3>
            <p className="text-white/60 text-base mt-8">
              From ground transportation to custom in-flight catering, your
              entire itinerary is handled by our concierge.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustedBySection() {
  const partners = [
    {
      name: "AeroLux",
      style: {
        fontFamily: "Times New Roman, serif",
        fontWeight: 400,
        letterSpacing: "0.02em",
        fontSize: "14px",
      },
    },
    {
      name: "PRIMEJET",
      style: {
        fontFamily: "Arial Black, sans-serif",
        fontWeight: 900,
        letterSpacing: "0.08em",
        fontSize: "16px",
      },
    },
    {
      name: "GLOBALWINGS",
      style: {
        fontFamily: "Impact",
        fontWeight: 700,
        letterSpacing: "0.05em",
        fontSize: "18px",
      },
    },
    {
      name: "ApexAviation",
      style: {
        fontFamily: "Georgia, serif",
        fontWeight: 600,
        letterSpacing: "-0.02em",
        fontSize: "17px",
      },
    },
    {
      name: "Signature",
      style: {
        fontFamily: "Helvetica, sans-serif",
        fontWeight: 700,
        letterSpacing: "-0.01em",
        fontSize: "15px",
      },
    },
    {
      name: "ELITETRAVEL",
      style: {
        fontFamily: "Verdana, sans-serif",
        fontWeight: 700,
        letterSpacing: "0.06em",
        fontSize: "14px",
        textTransform: "uppercase" as const,
      },
    },
    {
      name: "NETWINGS",
      style: {
        fontFamily: "Courier New, monospace",
        fontWeight: 700,
        letterSpacing: "0.18em",
        fontSize: "14px",
      },
    },
    {
      name: "Virtuoso",
      style: {
        fontFamily: "Palatino",
        fontWeight: 500,
        letterSpacing: "0.03em",
        fontSize: "15px",
      },
    },
  ];

  return (
    <section className="bg-[#F5F5F5] dark:bg-neutral-900 px-4 sm:px-6 py-10 md:py-12">
      <div className="max-w-[88rem] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 items-center border-y border-black/5 dark:border-white/10 py-12">
        <div className="lg:col-span-1 border-b lg:border-b-0 border-black/5 dark:border-white/10 pb-8 lg:pb-0">
          <p className="text-black/70 dark:text-white/70 text-base leading-relaxed whitespace-pre-line text-center lg:text-left">
            {"Trusted by top executives\nand premium lifestyle brands."}
          </p>
        </div>
        <div className="lg:col-span-3 overflow-hidden">
          <div className="backers-track">
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={i}
                className="mx-10 shrink-0 text-black/50 dark:text-white/50 whitespace-nowrap"
                style={partner.style}
              >
                {partner.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    {
      icon: <Plane className="w-8 h-8 stroke-[1.5]" />,
      title: "Private Jet Charter",
      description:
        "On-demand access to a global fleet of private jets, tailored perfectly to your schedule and preferences.",
    },
    {
      icon: <Users className="w-8 h-8 stroke-[1.5]" />,
      title: "Group Charter",
      description:
        "Dedicated aircraft for corporate events, sports teams, or large family gatherings, ensuring everyone travels together.",
    },
    {
      icon: <HeartPulse className="w-8 h-8 stroke-[1.5]" />,
      title: "Air Ambulance",
      description:
        "Rapid-response medical evacuation and bed-to-bed transfers with specialized medical personnel on board.",
    },
    {
      icon: <Package className="w-8 h-8 stroke-[1.5]" />,
      title: "Cargo Charter",
      description:
        "Urgent, oversized, or sensitive freight transport across the globe with guaranteed secure delivery.",
    },
    {
      icon: <Clock className="w-8 h-8 stroke-[1.5]" />,
      title: "Empty Leg Flights",
      description:
        "Cost-effective luxury travel utilizing repositioning flights at significantly reduced charter rates.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 stroke-[1.5]" />,
      title: "Aircraft Management",
      description:
        "Comprehensive operational support, maintenance, and crew management for private aircraft owners.",
    },
  ];

  return (
    <section className="bg-white dark:bg-neutral-950 px-4 sm:px-6 py-16 md:py-24 border-t border-gray-100 dark:border-white/10">
      <div className="max-w-[88rem] mx-auto w-full">
        <div className="mb-16">
          <h4 className="text-black/60 dark:text-white/60 text-sm mb-3 font-medium tracking-wide uppercase">
            Our Services
          </h4>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6"
            style={{ letterSpacing: "-0.04em" }}
          >
            Comprehensive
            <br />
            Aviation Solutions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {services.map((service, idx) => (
            <Link to="/services" key={idx} className="group block">
              <div className="mb-6 w-16 h-16 rounded-2xl bg-[#F5F5F5] dark:bg-neutral-900 flex items-center justify-center text-black dark:text-white group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              <h3
                className="text-2xl font-medium mb-4 group-hover:text-black/80 dark:text-white/80 transition-colors"
                style={{ letterSpacing: "-0.02em" }}
              >
                {service.title}
              </h3>
              <p className="text-black/60 dark:text-white/60 text-base leading-relaxed">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  return (
    <section className="bg-[#F5F5F5] dark:bg-neutral-900 px-4 sm:px-6 py-16 md:py-24">
      <div className="max-w-[88rem] mx-auto w-full">
        <div className="mb-12 md:mb-16 max-w-2xl">
          <h4 className="text-black/60 dark:text-white/60 text-sm mb-3 font-medium tracking-wide uppercase">
            JustCharter in Practice
          </h4>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6"
            style={{ letterSpacing: "-0.04em" }}
          >
            Tailored Journeys
          </h2>
          <p className="text-black/60 dark:text-white/60 text-base md:text-lg leading-relaxed">
            Whether it's closing a crucial deal overseas, a spontaneous weekend
            getaway with family, or attending a major exclusive event,
            JustCharter adapts to your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">
          {/* Business Travel */}
          <div className="relative rounded-3xl overflow-hidden lg:col-span-8 group h-[400px] lg:h-full">
            <img
              referrerPolicy="no-referrer"
              className="object-cover absolute inset-0 w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
              src="https://upload.wikimedia.org/wikipedia/commons/4/4d/BBJ_interior_2011.jpg"
              alt="Business executives meeting in a spacious private jet cabin"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-end items-start">
              <h3
                className="text-white text-3xl md:text-4xl font-medium mb-4"
                style={{ letterSpacing: "-0.02em" }}
              >
                Business Travel
              </h3>
              <p className="text-white/85 text-base max-w-lg mb-8">
                Maximize efficiency with corporate charter solutions, offering
                total privacy to work and absolute schedule flexibility to keep
                you ahead of the competition.
              </p>
              <button className="inline-flex items-center gap-4 text-white text-base font-medium group/btn cursor-pointer w-fit">
                <span className="w-10 h-10 rounded-full bg-white/20 backdrop-blur border border-white/20 flex items-center justify-center group-hover/btn:bg-white dark:bg-neutral-950 transition-colors duration-200">
                  <ArrowRight className="w-4 h-4 text-white group-hover/btn:text-black dark:text-white transition-colors" />
                </span>
                View Corporate Solutions
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Leisure Travel */}
            <div className="relative rounded-3xl overflow-hidden flex-1 group min-h-[300px]">
              <img
                referrerPolicy="no-referrer"
                className="object-cover absolute inset-0 w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Panoramic_view_of_Oia%2C_Santorini_island_%28Thira%29%2C_Greece.jpg/1280px-Panoramic_view_of_Oia%2C_Santorini_island_%28Thira%29%2C_Greece.jpg"
                alt="Scenic view of Santorini, a popular luxury destination"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <h3
                  className="text-white text-2xl font-medium mb-3"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Leisure Getaways
                </h3>
                <p className="text-white/85 text-sm">
                  Seamlessly start your ultimate vacation from the very moment
                  you step on board.
                </p>
              </div>
            </div>

            {/* Events / Group */}
            <div className="relative rounded-3xl overflow-hidden flex-1 group min-h-[300px]">
              <img
                referrerPolicy="no-referrer"
                className="object-cover absolute inset-0 w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Monte_Carlo_Port_Hercules_b.jpg/1280px-Monte_Carlo_Port_Hercules_b.jpg"
                alt="Aerial view of Monte Carlo Harbor, a premier private aviation destination"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <h3
                  className="text-white text-2xl font-medium mb-3"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Group & Events
                </h3>
                <p className="text-white/85 text-sm">
                  Travel together to major sporting events or exclusive
                  destinations in luxury.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FleetSection() {
  const fleet = [
    {
      category: "Light Jets",
      name: "Phenom 300E",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/8/8f/Embraer_505_Phenom_300%2C_Aerojet_JP7625910.jpg",
      pax: "up to 7 pax",
      range: "2,010 nm",
    },
    {
      category: "Midsize Jets",
      name: "Citation Latitude",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/CS-LTI_Cessna_560_XLS_Citation_XLS_C56X_c_n_560-5798_-_NJE_%2843222541880%29.jpg/1280px-CS-LTI_Cessna_560_XLS_Citation_XLS_C56X_c_n_560-5798_-_NJE_%2843222541880%29.jpg",
      pax: "up to 9 pax",
      range: "2,700 nm",
    },
    {
      category: "Heavy Jets",
      name: "Global 7500",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/2010-07-08_BD700_Tyrolean_OE-IGS_EDDF_03.jpg/1280px-2010-07-08_BD700_Tyrolean_OE-IGS_EDDF_03.jpg",
      pax: "up to 14 pax",
      range: "7,700 nm",
    },
    {
      category: "Helicopters",
      name: "Sikorsky S-76",
      image:
        "https://images.unsplash.com/photo-1549524570-5b565a049963?w=1200&q=75&fm=webp&auto=format",
      pax: "up to 8 pax",
      range: "400 nm",
    },
    {
      category: "Luxury Yachts",
      name: "Benetti Oasis 40M",
      image:
        "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1200&q=75&fm=webp&auto=format",
      pax: "up to 12 pax",
      range: "4,000 nm",
    },
  ];

  return (
    <section className="bg-[#F5F5F5] dark:bg-neutral-900 px-4 sm:px-6 py-16 md:py-24 border-y border-black/5 dark:border-white/10">
      <div className="max-w-[88rem] mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h2
              className="text-black dark:text-white text-4xl md:text-5xl font-medium leading-tight mb-4"
              style={{ letterSpacing: "-0.03em" }}
            >
              The Fleet.
            </h2>
            <p className="text-black/60 dark:text-white/60 text-base md:text-lg max-w-md">
              A meticulously curated selection of the world's most advanced
              private aircraft, ready for any journey.
            </p>
          </div>
          <button className="inline-flex items-center gap-3 bg-white dark:bg-neutral-950 border border-black/10 dark:border-white/20 text-black dark:text-white text-base font-medium px-6 py-2.5 rounded-full hover:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition-colors duration-200">
            View full fleet
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fleet.map((jet) => (
            <div key={jet.category} className="group cursor-pointer">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={jet.image}
                  alt={jet.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/10 dark:bg-white/10 transition-opacity duration-300 group-hover:opacity-0" />
              </div>
              <p className="text-black/50 dark:text-white/50 text-sm font-medium mb-1 tracking-wide uppercase">
                {jet.category}
              </p>
              <h3
                className="text-2xl font-medium text-black dark:text-white mb-4"
                style={{ letterSpacing: "-0.02em" }}
              >
                {jet.name}
              </h3>
              <div className="flex items-center gap-6 border-t border-black/10 dark:border-white/20 pt-4">
                <div>
                  <p className="text-black/50 dark:text-white/50 text-xs mb-0.5">
                    Capacity
                  </p>
                  <p className="text-black dark:text-white font-medium">
                    {jet.pax}
                  </p>
                </div>
                <div>
                  <p className="text-black/50 dark:text-white/50 text-xs mb-0.5">
                    Range
                  </p>
                  <p className="text-black dark:text-white font-medium">
                    {jet.range}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AirAmbulanceSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="bg-[#111111] px-4 sm:px-6 py-16 md:py-24 text-white">
        <div className="max-w-[88rem] mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group">
              <img
                referrerPolicy="no-referrer"
                className="object-cover absolute inset-0 w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/CH.SZ.Stoos_Fronalpstock_Sequence_Rescue-Helicopter_REGA_16K_16x9-R.jpg/1280px-CH.SZ.Stoos_Fronalpstock_Sequence_Rescue-Helicopter_REGA_16K_16x9-R.jpg"
                alt="Air Ambulance"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <div className="md:pl-8">
              <h4 className="text-white/50 text-sm mb-3 font-medium tracking-wide uppercase">
                Critical Care Transport
              </h4>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-4 md:mb-6"
                style={{ letterSpacing: "-0.03em" }}
              >
                Air Ambulance &<br />
                Medical Evacuation
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-8 max-w-md">
                When every second counts, our global network provides rapid
                response air medical transport. Fully equipped with intensive
                care units and staffed by specialized medical teams, we ensure
                safe and efficient transfers worldwide.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-neutral-950" />
                  24/7 Global Dispatch
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-neutral-950" />
                  Bed-to-Bed Medical Care
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-neutral-950" />
                  Specialized Flight Nurses & Physicians
                </li>
              </ul>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-3 bg-white dark:bg-neutral-950 text-black dark:text-white text-base font-medium px-7 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors duration-200"
              >
                Request Emergency Flight
                <ArrowRight className="w-4 h-4 text-black dark:text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <AirAmbulanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

function YatrasSection() {
  const yatras = [
    {
      city: "Char Dham",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Kedarnath_Temple_in_Rainy_season.jpg/1280px-Kedarnath_Temple_in_Rainy_season.jpg",
    },
    {
      city: "Tirupati",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Tirumala_090615.jpg/1280px-Tirumala_090615.jpg",
    },
    {
      city: "Varanasi",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Varanasi%2C_India%2C_Ghats%2C_Cremation_ceremony_in_progress.jpg/1280px-Varanasi%2C_India%2C_Ghats%2C_Cremation_ceremony_in_progress.jpg",
    },
    {
      city: "Vaishno Devi",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Badrinath_Temple_%2C_Uttarakhand.jpg/1280px-Badrinath_Temple_%2C_Uttarakhand.jpg",
    },
  ];

  return (
    <section className="bg-[#FAF9F6] dark:bg-neutral-900 px-4 sm:px-6 py-16 md:py-24 border-t border-black/5 dark:border-white/10">
      <div className="max-w-[88rem] mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h4 className="text-black/50 dark:text-white/50 text-sm font-medium tracking-wide uppercase mb-3">
              Divine Journeys
            </h4>
            <h2
              className="text-black dark:text-white text-4xl md:text-5xl font-medium leading-tight mb-4"
              style={{ letterSpacing: "-0.03em" }}
            >
              Spiritual Yatra's.
            </h2>
            <p className="text-black/60 dark:text-white/60 text-base md:text-lg">
              Embark on a transcendent journey to sacred destinations.
              Experience absolute comfort, helicopter transfers, and VIP access
              to the holy shrines, curated entirely by our dedicated spiritual
              concierge.
            </p>
          </div>
          <button className="inline-flex flex-shrink-0 items-center gap-3 bg-black dark:bg-white text-white dark:text-black text-base font-medium px-6 py-2.5 rounded-full hover:bg-brand transition-colors duration-200">
            Plan your Yatra
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {yatras.map((yatra) => (
            <Link
              to="/destinations"
              key={yatra.city}
              className="group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] mb-5">
                <img
                  src={yatra.image}
                  alt={yatra.city}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/10 dark:bg-white/10 transition-opacity duration-300 group-hover:opacity-0" />
              </div>
              <h3
                className="text-2xl font-medium text-black dark:text-white"
                style={{ letterSpacing: "-0.02em" }}
              >
                {yatra.city}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-black/50 dark:text-white/50 text-sm">
                  Helicopter + VIP Darshan
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function DestinationsSection() {
  const destinations = [
    {
      city: "Aspen",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Downtown_of_Aspen%2C_Colorado.jpg",
    },
    {
      city: "Monaco",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Monte_Carlo_Port_Hercules_b.jpg/1280px-Monte_Carlo_Port_Hercules_b.jpg",
    },
    {
      city: "London",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/London_Skyline_%28125508655%29.jpeg/1280px-London_Skyline_%28125508655%29.jpeg",
    },
    {
      city: "Dubai",
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/Burj_Khalifa_2021.jpg/1280px-Burj_Khalifa_2021.jpg",
    },
  ];

  return (
    <section className="bg-[#111111] px-4 sm:px-6 py-16 md:py-24 text-white">
      <div className="max-w-[88rem] mx-auto w-full">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-12 md:mb-16 text-center"
          style={{ letterSpacing: "-0.03em" }}
        >
          Fly anywhere.
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {destinations.map((dest) => (
            <Link
              to="/destinations"
              key={dest.city}
              className="relative rounded-2xl overflow-hidden aspect-[3/4] group cursor-pointer"
            >
              <img
                src={dest.image}
                alt={dest.city}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full flex items-end justify-between">
                <h3 className="text-xl md:text-2xl font-medium">{dest.city}</h3>
                <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme-preference");
    const prefersDark = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
    setIsDark(saved === "dark" || (!saved && prefersDark));
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      if (localStorage.getItem("theme-preference") === null) {
        const hour = new Date().getHours();
        setIsDark(hour >= 18 || hour < 6);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [mounted]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme-preference", newTheme ? "dark" : "light");
  };

  return (
    <footer className="bg-black text-white px-4 sm:px-6 py-12 md:py-20">
      <div className="max-w-[88rem] mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between mb-24 gap-12">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <LogoIcon className="w-7 h-7 text-white" />
              <span className="text-2xl font-medium tracking-tight text-white">
                JustCharter
              </span>
            </Link>
            <p className="text-white/60 text-base leading-relaxed">
              An exclusive, on-demand charter network built for seamless
              bookings, absolute privacy, and unparalleled luxury travel.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
            <div>
              <h4 className="text-white font-medium mb-6">Explore</h4>
              <ul className="space-y-4 text-white/60">
                <li>
                  <Link
                    to="/fleet"
                    className="hover:text-white transition-colors"
                  >
                    Fleet
                  </Link>
                </li>
                <li>
                  <Link
                    to="/destinations"
                    className="hover:text-white transition-colors"
                  >
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="hover:text-white transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/members"
                    className="hover:text-white transition-colors"
                  >
                    Members
                  </Link>
                </li>
                <li>
                  <Link
                    to="/empty-legs"
                    className="hover:text-white transition-colors"
                  >
                    Empty Legs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-6">Company</h4>
              <ul className="space-y-4 text-white/60">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/safety-first"
                    className="hover:text-white transition-colors"
                  >
                    Safety First
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/planner"
                    className="hover:text-white transition-colors"
                  >
                    Trip Planner
                  </Link>
                </li>
                <li>
                  <Link
                    to="/history"
                    className="hover:text-white transition-colors"
                  >
                    History
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-white font-medium mb-6">Members</h4>
              <ul className="space-y-4 text-white/60">
                <li>
                  <Link
                    to="/members"
                    className="hover:text-white transition-colors"
                  >
                    Jet Card
                  </Link>
                </li>
                <li>
                  <Link
                    to="/corporate-accounts"
                    className="hover:text-white transition-colors"
                  >
                    Corporate Accounts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="hover:text-white transition-colors"
                  >
                    Log In
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-white/40 text-sm">
          <p>
            &copy; 2024 JustCharter. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 hover:text-white transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
              <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
            </button>
            <Link
              to="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link
              to="/cookie-policy"
              className="hover:text-white transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function MobileAppSection() {
  return (
    <section className="bg-black text-white px-4 sm:px-6 py-24 md:py-40 overflow-hidden relative border-t border-white/5">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/20 rounded-full blur-[150px] mix-blend-screen opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-[88rem] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
        <div className="z-20 relative text-center lg:text-left">
          <h4 className="text-white/60 text-sm mb-6 font-medium tracking-[0.15em] uppercase pb-2 border-b border-white/10 inline-block">
            Seamless Bookings
          </h4>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] mb-6 md:mb-8 text-white"
            style={{ letterSpacing: "-0.04em" }}
          >
            Aviation at your
            <br className="hidden sm:block" /> fingertips.
          </h2>
          <p className="text-white/60 text-base sm:text-lg md:text-xl leading-relaxed mb-10 md:mb-12 max-w-lg mx-auto lg:mx-0 font-light">
            Book private jets, browse empty leg flights, and manage your
            itineraries seamlessly from your smartphone. Download the
            JustCharter app today for unparalleled control.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6">
            <a
              href="https://play.google.com/store/apps/details?id=com.justcharter.app&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white/5 backdrop-blur-md text-white px-8 py-4 rounded-2xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 w-full sm:w-auto overflow-hidden group"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 fill-current group-hover:scale-110 transition-transform duration-300"
              >
                <path d="M5.5 3.5C5.2 3.8 5 4.3 5 5v14c0 .7.2 1.2.5 1.5l.1.1 7.2-7.2v-.8l-7.2-7.2-.1.1zm8 8.1l2.3 2.3-2.6 1.5-1.9-1.9 2.2-1.9zm-2.8-2l-5-5c-.4-.4-1.1-.1-1.1.5v3.1l6.1 1.4zm5.1 4.5l2.6-1.5c.8-.5.8-1.3 0-1.7l-2.6-1.5-2.2 1.9 2.2 2.8z" />
              </svg>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 group-hover:text-white/70 transition-colors">
                  Get it on
                </span>
                <span className="text-base font-semibold -mt-1 tracking-tight">
                  Google Play
                </span>
              </div>
            </a>
            <button className="flex items-center gap-4 bg-white/5 backdrop-blur-md text-white px-8 py-4 rounded-2xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 w-full sm:w-auto group">
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 fill-current group-hover:scale-110 transition-transform duration-300"
              >
                <path d="M17.6 13.9c-.1-2.9 2.4-4.3 2.5-4.4-1.3-1.9-3.4-2.2-4.1-2.3-1.7-.2-3.4 1-4.3 1-.9 0-2.3-1-3.7-1-1.9 0-3.6 1.1-4.5 2.7-2 3.4-.5 8.3 1.4 11 1 1.4 2.1 3 3.6 2.9 1.4-.1 2-1 3.7-1 1.7 0 2.2 1 3.7 1 1.6-.1 2.5-1.5 3.5-2.9 1.1-1.6 1.6-3.1 1.6-3.2-.1 0-2.8-1.1-2.9-4.3zM14.6 5.8c.8-1 1.3-2.3 1.1-3.6-1.1.1-2.5.7-3.3 1.7-.7.8-1.3 2.1-1.1 3.4 1.3.1 2.5-.6 3.3-1.5z" />
              </svg>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 group-hover:text-white/70 transition-colors">
                  Download on the
                </span>
                <span className="text-base font-semibold -mt-1 tracking-tight">
                  App Store
                </span>
              </div>
            </button>
          </div>
        </div>
        <div className="relative h-[450px] sm:h-[550px] lg:h-[650px] flex items-center justify-center lg:justify-end z-20 w-full mt-12 lg:mt-0 px-4 sm:px-0">
          {/* Main App Mockup Screen */}
          <div className="relative w-[240px] sm:w-[280px] md:w-[320px] aspect-[9/19.5] rounded-[2.5rem] sm:rounded-[3rem] p-2 sm:p-2.5 bg-neutral-900 border border-white/20 shadow-2xl z-20 hover:-translate-y-4 transition-transform duration-500 will-change-transform group">
            <div className="absolute top-0 inset-x-0 h-6 sm:h-7 bg-neutral-900 rounded-b-3xl w-[40%] mx-auto z-30" />
            <div className="w-full h-full rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden relative bg-black transform translate-z-0">
              <img
                referrerPolicy="no-referrer"
                src="https://images.unsplash.com/photo-1621252178229-23e595eef9eb?w=1200&q=75&fm=webp&auto=format"
                alt="Flight Booking Screen"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 scale-105"
              />
              {/* Mockup UI Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 bg-gradient-to-t from-black via-black/40 to-transparent">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 w-full">
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-white">
                      <p className="text-[10px] text-white/60 font-medium uppercase tracking-wider mb-0.5">
                        Departure
                      </p>
                      <p className="text-xl font-medium">LHR</p>
                      <p className="text-xs text-white/80">London</p>
                    </div>
                    <Plane className="w-5 h-5 text-white/50" />
                    <div className="text-white text-right">
                      <p className="text-[10px] text-white/60 font-medium uppercase tracking-wider mb-0.5">
                        Arrival
                      </p>
                      <p className="text-xl font-medium">JFK</p>
                      <p className="text-xs text-white/80">New York</p>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-white/10 my-3" />
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-white/80">
                      Global 7500
                    </p>
                    <div className="bg-white text-black px-3 py-1 rounded-full text-xs font-semibold">
                      Book
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary screen to add depth */}
          <div
            className="absolute w-[200px] sm:w-[240px] md:w-[280px] aspect-[9/19.5] rounded-[2.5rem] p-2 bg-neutral-900/80 border border-white/10 shadow-2xl z-10 
               top-1/2 -translate-y-1/2 translate-x-12 sm:translate-x-20 md:translate-x-32 rotate-[8deg] opacity-70 backdrop-blur-md opacity-transition duration-500 hover:rotate-[6deg] hover:translate-x-10 sm:hover:translate-x-16 md:hover:translate-x-24 hover:opacity-90"
          >
            <div className="w-full h-full rounded-[2rem] overflow-hidden relative bg-black/50">
              <img
                referrerPolicy="no-referrer"
                src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&q=75&fm=webp&auto=format"
                alt="Destinations Screen"
                className="w-full h-full object-cover scale-110"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <div className="h-screen flex flex-col overflow-hidden relative">
        <HeroSection />
      </div>
      <InfoSection />
      <TrustedBySection />
      <ServicesSection />
      <UseCasesSection />
      <FleetSection />
      <AirAmbulanceSection />
      <YatrasSection />
      <DestinationsSection />
      <MobileAppSection />
    </>
  );
}

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-black dark:bg-white text-white dark:text-black p-3 rounded-full shadow-lg hover:bg-brand transition-colors duration-300 flex items-center justify-center animate-fade-in-up"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

import { ErrorBoundary } from "./components/ErrorBoundary";
import { ProtectedRoute } from "./components/ProtectedRoute";

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ErrorBoundary>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <ScrollToTop />
      <div 
        suppressHydrationWarning={true} 
        className={`flex flex-col bg-[#F5F5F5] dark:bg-neutral-900 min-h-screen relative transition-colors duration-300 ${showSplash ? 'h-screen overflow-hidden' : ''}`}
      >
        <Navbar />
        <main id="main-content" className="flex-1 flex flex-col">
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-black/20 dark:border-white/20 border-t-black dark:border-t-white rounded-full animate-spin"></div></div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/destinations" element={
                <Suspense fallback={<div className="flex items-center justify-center h-96"><div className="animate-spin w-8 h-8 border-2 border-current rounded-full border-t-transparent" /></div>}>
                  <DestinationsPage />
                </Suspense>
              } />
              <Route path="/members" element={
                <Suspense fallback={<div className="flex items-center justify-center h-96"><div className="animate-spin w-8 h-8 border-2 border-current rounded-full border-t-transparent" /></div>}>
                  <ProtectedRoute>
                    <MembersPage />
                  </ProtectedRoute>
                </Suspense>
              } />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/planner" element={
                <ErrorBoundary>
                  <Suspense fallback={<div className="flex items-center justify-center h-96"><div className="animate-spin w-8 h-8 border-2 border-current rounded-full border-t-transparent" /></div>}>
                    <TripPlannerPage />
                  </Suspense>
                </ErrorBoundary>
              } />
              <Route path="/empty-legs" element={<EmptyLegsPage />} />
              <Route path="/fleet" element={
                <Suspense fallback={<div className="flex items-center justify-center h-96"><div className="animate-spin w-8 h-8 border-2 border-current rounded-full border-t-transparent" /></div>}>
                  <FleetPage />
                </Suspense>
              } />
              <Route path="/fleet/:id" element={
                <Suspense fallback={<div className="flex items-center justify-center h-96"><div className="animate-spin w-8 h-8 border-2 border-current rounded-full border-t-transparent" /></div>}>
                  <AircraftDetailsPage />
                </Suspense>
              } />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/safety-first" element={<SafetyFirstPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route
                path="/corporate-accounts"
                element={<CorporateAccountsPage />}
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />
              <Route path="/history" element={
                <Suspense fallback={<div className="flex items-center justify-center h-96"><div className="animate-spin w-8 h-8 border-2 border-current rounded-full border-t-transparent" /></div>}>
                  <HistoryPage />
                </Suspense>
              } />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </ErrorBoundary>
  );
}
