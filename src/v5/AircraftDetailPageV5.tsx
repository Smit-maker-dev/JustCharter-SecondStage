import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Gauge, Navigation, Users, Maximize, Luggage, ShieldCheck, CheckCircle2 } from "lucide-react";
import ConciergeBarV5 from "./components/ConciergeBarV5";

export interface AircraftDetailData {
  id: number;
  name: string;
  category: string;
  tagline: string;
  tag: string;
  images: string[];
  specs: {
    range: string;
    speed: string;
    passengers: string;
    height: string;
    length: string;
    baggage: string;
  };
  highlights: string[];
  description: string;
}

export const aircraftDetails: AircraftDetailData[] = [
  {
    id: 1,
    name: "Gulfstream G700",
    category: "Long Range",
    tagline: "The most spacious cabin in the Gulfstream fleet.",
    tag: "Long Range",
    images: [
      "/images/gulfstrem.jpg",
      "/images/oskar-kadaksoo.jpg",
      "/images/AboutHeroImage.jpg",
      "/images/gulfG800.jpg",
    ],
    specs: {
      range: "7,500 nm",
      speed: "516 kts",
      passengers: "up to 19",
      height: "6'3\"",
      length: "56'11\"",
      baggage: "195 cu ft",
    },
    highlights: [
      "Five distinct living areas for work, dining, and rest",
      "Ultra-quiet cabin engineered for lower noise and fatigue",
      "Circadian lighting system designed to reduce jet lag",
      "100% fresh air refreshed every two minutes",
    ],
    description:
      "The Gulfstream G700 pairs class-leading range with a cabin built for long-haul comfort — five living areas mean your team can work, dine, and rest without compromise on transcontinental and intercontinental routes.",
  },
  {
    id: 2,
    name: "Bombardier Global 7500",
    category: "Ultra Long Range",
    tagline: "Four true living spaces, non-stop to nearly anywhere.",
    tag: "Ultra Long Range",
    images: [
      "/images/bombardier.webp",
      "/images/oskar-kadaksoo.jpg",
      "/images/gulfstrem.jpg",
      "/images/cessna.webp",
    ],
    specs: {
      range: "7,700 nm",
      speed: "516 kts",
      passengers: "up to 19",
      height: "6'2\"",
      length: "54'5\"",
      baggage: "195 cu ft",
    },
    highlights: [
      "Four distinct cabin zones including a dedicated crew rest suite",
      "Among the longest range of any purpose-built business jet",
      "Full stand-up shower available on select configurations",
      "Smooth ride technology reduces cabin motion in turbulence",
    ],
    description:
      "Built for the longest routes without a fuel stop, the Global 7500 offers four genuinely separate living spaces — ideal for red-eye repositioning or full-day working flights across continents.",
  },
  {
    id: 3,
    name: "Cessna Citation Latitude",
    category: "Midsize",
    tagline: "The flat-floor standard in super-midsize comfort.",
    tag: "Midsize",
    images: [
      "/images/cessna.webp",
      "/images/gulfstrem.jpg",
      "/images/bombardier.webp",
      "/images/DassaultFalcon.jpg",
    ],
    specs: {
      range: "2,700 nm",
      speed: "446 kts",
      passengers: "up to 9",
      height: "6'",
      length: "21'8\"",
      baggage: "127 cu ft",
    },
    highlights: [
      "Flat, unobstructed cabin floor for easy movement",
      "Quietest cabin in its class",
      "Externally serviceable lavatory for faster turnarounds",
      "Ideal for regional and short-haul corporate travel",
    ],
    description:
      "The Citation Latitude is built for efficient regional travel — a genuinely flat cabin floor, class-leading quiet, and quick turnarounds make it a favorite for frequent short-haul corporate trips.",
  },
  {
    id: 4,
    name: "Dassault Falcon 10X",
    category: "Long Range",
    tagline: "The largest cabin cross-section Falcon has ever built.",
    tag: "Long Range",
    images: [
      "/images/DassaultFalcon.jpg",
      "/images/gulfstrem.jpg",
      "/images/oskar-kadaksoo.jpg",
      "/images/BoeingBusinessjet.jpg",
    ],
    specs: {
      range: "7,500 nm",
      speed: "520 kts",
      passengers: "up to 19",
      height: "6'8\"",
      length: "43'",
      baggage: "195 cu ft",
    },
    highlights: [
      "Widest and tallest cabin in the Falcon lineup",
      "Panoramic windows, the largest in business aviation",
      "Digital flight control system for a notably smooth ride",
      "Dedicated separate crew rest area",
    ],
    description:
      "The Falcon 10X brings Dassault's largest-ever cabin to long-range travel, with panoramic windows and a digital flight control system that delivers an exceptionally smooth, quiet ride.",
  },
  {
    id: 5,
    name: "Gulfstream G800",
    category: "Long Range",
    tagline: "Gulfstream's longest range, in a proven cabin.",
    tag: "Long Range",
    images: [
      "/images/gulfG800.jpg",
      "/images/gulfstrem.jpg",
      "/images/bombardier.webp",
      "/images/oskar-kadaksoo.jpg",
    ],
    specs: {
      range: "8,000 nm",
      speed: "516 kts",
      passengers: "up to 19",
      height: "6'3\"",
      length: "56'11\"",
      baggage: "195 cu ft",
    },
    highlights: [
      "Longest range in the Gulfstream fleet",
      "Shares the G700's ultra-quiet, low-cabin-altitude comfort",
      "Circadian lighting and advanced air filtration",
      "Multiple configurable living areas",
    ],
    description:
      "The G800 pairs Gulfstream's longest-ever range with the same class-leading cabin comfort as the G700 — built for the routes that push farthest without compromise.",
  },
  {
    id: 6,
    name: "Boeing Business Jet 777X",
    category: "Ultra Long Range",
    tagline: "A private residence with a 11,000+ nautical mile range.",
    tag: "Ultra Long Range",
    images: [
      "/images/BoeingBusinessjet.jpg",
      "/images/gulfstrem.jpg",
      "/images/oskar-kadaksoo.jpg",
      "/images/bombardier.webp",
    ],
    specs: {
      range: "11,645 nm",
      speed: "516 kts",
      passengers: "up to 75",
      height: "7'1\"",
      length: "143'",
      baggage: "1,600 cu ft",
    },
    highlights: [
      "Largest private aircraft cabin available, fully customizable to your configuration",
      "Room for private suites, a boardroom, and full crew quarters",
      "Non-stop range connecting nearly any two cities on Earth",
      "The choice of heads of state and the world's largest private operators",
    ],
    description:
      "The BBJ 777X isn't just an aircraft — it's a fully customizable private residence in the sky, with the range to connect almost any two points on the globe without stopping.",
  },
];

export default function AircraftDetailPageV5() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const aircraft =
    aircraftDetails.find((item) => item.id === Number(id)) || aircraftDetails[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
    window.scrollTo(0, 0);
  }, [id]);

  const recommendedAircraft = aircraftDetails.filter((item) => item.id !== aircraft.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans antialiased selection:bg-[#DFA93B]/30 selection:text-stone-900 pt-24 sm:pt-28">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
        
        {/* 1. Back Link */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-stone-900 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 text-[#DFA93B] group-hover:-translate-x-1 transition-transform" />
            <span>Back to Fleet</span>
          </Link>
        </div>

        {/* 2. Hero Section: Photo Gallery & Primary Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-20">
          
          {/* Photo Gallery (Left 7 Cols) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden bg-stone-900 h-80 sm:h-[420px] shadow-lg border border-stone-200/80 mb-4 group">
              <img
                src={aircraft.images[activeImageIndex]}
                alt={aircraft.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <span className="absolute top-4 right-4 bg-stone-950/85 backdrop-blur-md text-[#DFA93B] text-xs uppercase tracking-widest font-semibold px-4 py-1.5 rounded-full border border-white/10">
                {aircraft.category}
              </span>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {aircraft.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative rounded-xl overflow-hidden bg-stone-900 h-20 sm:h-24 border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? "border-[#DFA93B] ring-2 ring-[#DFA93B]/30"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${aircraft.name} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details & CTA (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center space-x-2 bg-stone-100 px-4 py-1.5 rounded-full border border-stone-200/80 mb-4 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#DFA93B]"></span>
                <span className="text-xs uppercase tracking-[0.2em] font-serif italic text-stone-700">
                  {aircraft.tag}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-stone-900 mb-3">
                {aircraft.name}
              </h1>

              <p className="text-stone-600 text-base sm:text-lg font-serif italic mb-6">
                "{aircraft.tagline}"
              </p>

              <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed mb-8 border-t border-stone-200/80 pt-6">
                {aircraft.description}
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => navigate("/")}
                className="w-full bg-[#DFA93B] hover:bg-[#c9952f] text-stone-950 font-bold text-xs uppercase tracking-wider py-4 px-8 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center space-x-2 cursor-pointer border border-[#d29c30]"
              >
                <span>Request This Aircraft</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-xs text-stone-500 font-light pt-2">
                <ShieldCheck className="w-4 h-4 text-[#DFA93B]" />
                <span>ARGUS Platinum & Wyvern Certified Operator</span>
              </div>
            </div>

          </div>

        </div>

        {/* 3. Key Specs Strip */}
        <div className="mb-20">
          <h2 className="text-2xl font-serif font-normal text-stone-900 mb-6">
            Technical Specifications
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 bg-stone-50/90 p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-sm">
            
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5 text-stone-400 mb-1">
                <Navigation className="w-4 h-4 text-[#DFA93B]" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Max Range</span>
              </div>
              <span className="text-lg sm:text-xl font-serif font-semibold text-stone-900">
                {aircraft.specs.range}
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5 text-stone-400 mb-1">
                <Gauge className="w-4 h-4 text-[#DFA93B]" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Max Speed</span>
              </div>
              <span className="text-lg sm:text-xl font-serif font-semibold text-stone-900">
                {aircraft.specs.speed}
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5 text-stone-400 mb-1">
                <Users className="w-4 h-4 text-[#DFA93B]" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Passengers</span>
              </div>
              <span className="text-lg sm:text-xl font-serif font-semibold text-stone-900">
                {aircraft.specs.passengers}
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5 text-stone-400 mb-1">
                <Maximize className="w-4 h-4 text-[#DFA93B]" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Cabin Height</span>
              </div>
              <span className="text-lg sm:text-xl font-serif font-semibold text-stone-900">
                {aircraft.specs.height}
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5 text-stone-400 mb-1">
                <Maximize className="w-4 h-4 text-[#DFA93B]" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Cabin Length</span>
              </div>
              <span className="text-lg sm:text-xl font-serif font-semibold text-stone-900">
                {aircraft.specs.length}
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5 text-stone-400 mb-1">
                <Luggage className="w-4 h-4 text-[#DFA93B]" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Baggage</span>
              </div>
              <span className="text-lg sm:text-xl font-serif font-semibold text-stone-900">
                {aircraft.specs.baggage}
              </span>
            </div>

          </div>
        </div>

        {/* 4. Highlights Section */}
        <div className="mb-20 bg-white border border-stone-200/80 rounded-2xl p-8 sm:p-10 shadow-sm">
          <div className="inline-flex items-center space-x-2 bg-stone-100 px-3.5 py-1 rounded-full border border-stone-200/80 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#DFA93B]"></span>
            <span className="text-[10px] uppercase tracking-widest font-serif italic text-stone-700">
              Aircraft Highlights
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-normal text-stone-900 mb-6">
            Standout Engineering & Cabin Features
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aircraft.highlights.map((bullet, idx) => (
              <div key={idx} className="flex items-start space-x-3 bg-stone-50/80 p-4 rounded-xl border border-stone-200/60">
                <CheckCircle2 className="w-5 h-5 text-[#DFA93B] flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-medium text-stone-800 leading-relaxed">
                  {bullet}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. You Might Also Like Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#DFA93B] block mb-1">
                Explore More Fleet
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-900">
                You Might Also Like
              </h2>
            </div>
            <Link
              to="/"
              className="text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-stone-950 flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {recommendedAircraft.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-stone-200/70 rounded-2xl p-6 relative flex flex-col justify-between group shadow-sm hover:shadow-md transition-all duration-500"
              >
                <div className="relative mb-6 rounded-xl overflow-hidden bg-stone-900 h-52">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-md text-[#DFA93B] text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full border border-white/10">
                    {item.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-normal text-stone-900 mb-4 group-hover:text-[#DFA93B] transition-colors">
                    {item.name}
                  </h3>

                  <div className="grid grid-cols-2 gap-3 mb-6 bg-stone-50 p-4 rounded-xl border border-stone-200/60 text-xs">
                    <div className="flex flex-col">
                      <span className="text-stone-400 font-medium text-[10px] uppercase tracking-wider">
                        Max Range
                      </span>
                      <span className="text-stone-900 font-bold mt-0.5">
                        {item.specs.range}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-stone-400 font-medium text-[10px] uppercase tracking-wider">
                        Passengers
                      </span>
                      <span className="text-stone-900 font-bold mt-0.5">
                        {item.specs.passengers}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Link
                    to={`/aircraft/${item.id}`}
                    className="text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-stone-950 flex items-center space-x-1"
                  >
                    <span>Inspect Spec</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => navigate(`/aircraft/${item.id}`)}
                    className="bg-stone-900 hover:bg-[#DFA93B] hover:text-stone-950 text-white text-xs font-semibold uppercase tracking-wider px-5 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <ConciergeBarV5 />
    </div>
  );
}
