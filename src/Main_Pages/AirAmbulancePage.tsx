import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight, ArrowUpRight, Phone, Check } from "lucide-react";
import { API_BASE_URL } from "../api/axiosInstance";
import { airAmbulanceConfig, hasValidPhone } from "../config/airAmbulanceConfig";

interface PublicAircraft {
  id: number;
  display_model: string;
  base_city: string;
  base_airport_code: string;
  photo_url: string | null;
  capacity: {
    stretchers: number;
    medical_crew: number;
    companions: number;
  };
  range_km: number | null;
  confirmed_equipment_tags: string[];
}

const CABIN_HOTSPOTS = [
  {
    id: 1,
    title: "Stretcher with restraints",
    desc: "The patient lies on a stretcher secured to the cabin with restraints.",
    x: 350,
    y: 305,
  },
  {
    id: 2,
    title: "Medical oxygen",
    desc: "Oxygen for the patient during the flight, where the aircraft is fitted for it.",
    x: 185,
    y: 205,
  },
  {
    id: 3,
    title: "Patient monitor",
    desc: "A monitor that tracks the patient's vital signs, where fitted.",
    x: 270,
    y: 185,
  },
  {
    id: 4,
    title: "Infusion pumps and ventilator, where fitted",
    desc: "Equipment for medicines and breathing support. What is fitted differs by aircraft.",
    x: 340,
    y: 145,
  },
  {
    id: 5,
    title: "Medical crew seats",
    desc: "Seats for the doctor or paramedic beside the stretcher.",
    x: 505,
    y: 255,
  },
  {
    id: 6,
    title: "Companion seat",
    desc: "A seat for one family member or escort, depending on the aircraft.",
    x: 765,
    y: 255,
  },
];


const WHEN_LIST = [
  {
    number: "1",
    headline: "Hospital to hospital, critical care.",
    text: "A patient on a ventilator or infusions who needs a hospital with a particular specialty, where the road journey is too long or too rough.",
  },
  {
    number: "2",
    headline: "Going home after treatment.",
    text: "Stretcher travel from a hospital in another city, or from abroad, back to family and local care.",
  },
  {
    number: "3",
    headline: "From remote areas to a city hospital.",
    text: "Where the nearest capable hospital is hours away by road and the aircraft can use a nearby airstrip.",
  },
  {
    number: "4",
    headline: "Newborns and children.",
    text: "Transfers that need an incubator or child-sized equipment on board. Availability depends on the aircraft.",
  },
  {
    number: "5",
    headline: "Stretcher travel that is not an emergency.",
    text: "Patients who cannot sit upright on a scheduled flight but are medically stable.",
  },
];

const TIMELINE_STEPS = [
  {
    step: "1",
    title: "You send the details.",
    desc: "Route, date, what the patient needs and a phone number. It takes a few minutes.",
  },
  {
    step: "2",
    title: "We check the match.",
    desc: "A coordinator reviews the request and checks which aircraft can fly the route with the equipment needed.",
  },
  {
    step: "3",
    title: "You get a quote.",
    desc: "One price that lists the flight, positioning of the aircraft and any medical or ground charges, and names the aircraft and operator.",
  },
  {
    step: "4",
    title: "You confirm.",
    desc: "Once you accept, we book the aircraft and confirm timing with the operator.",
  },
  {
    step: "5",
    title: "Flight and handover.",
    desc: "The operator's medical crew looks after the patient in flight and hands over at the receiving hospital or ambulance.",
  },
];

const PRICING_INCLUSIONS = [
  "Flight hours",
  "Positioning of the aircraft to the pickup airport",
  "Medical crew and equipment",
  "Ground ambulance at either end, if needed",
  "Airport and handling charges",
  "Waiting time, if any",
];

const QUESTIONS_LIST = [
  {
    q: "Who operates the flight?",
    a: "Ask whether you are speaking to the operator or an intermediary. JustCharter is a marketplace. Flights are operated by independent operators, and we tell you which one before you confirm.",
  },
  {
    q: "Is the operator permitted to fly this aircraft?",
    a: "Operators need DGCA permission, and the aircraft should be covered by it.",
  },
  {
    q: "Who is the medical crew?",
    a: "Ask about their critical-care experience and aviation medicine training.",
  },
  {
    q: "What is on the aircraft?",
    a: "Ask for the equipment list of the exact aircraft, not a generic one.",
  },
  {
    q: "What happens if plans change?",
    a: "Ask about delays, diversions and cancellation terms before you commit.",
  },
];

const FAQ_ITEMS = [
  {
    q: "How fast can an aircraft be arranged?",
    a: "It depends on aircraft availability, the route and clearances. Once we have the details we tell you what is realistic for your case instead of promising a fixed time.",
  },
  {
    q: "Can a family member travel along?",
    a: "Usually one companion can, depending on the aircraft's seating and the patient's needs. Tell us how many people will travel.",
  },
  {
    q: "Do you operate the aircraft?",
    a: "No. JustCharter is a marketplace. Flights are operated by independent operators. The medical crew and equipment are part of what each operator provides, and every listing states what is confirmed.",
  },
  {
    q: "What information do I need to give?",
    a: "The pickup and drop locations, the date, the patient's age, weight and condition category, any equipment needed, and a contact number. Our coordinator will ask for medical reports on the call if they are needed.",
  },
  {
    q: "Does insurance cover it?",
    a: "Some health and travel policies cover air ambulance transfers. We can give you a quote and flight details for your insurer. Coverage depends on your policy.",
  },
  {
    q: "Can you do international transfers?",
    a: "Cross-border transfers need extra permissions and documents. Tell us the origin and destination and we will confirm what is possible.",
  },
  {
    q: "Who decides if the patient can fly?",
    a: "The treating doctor and the operator's medical team. We do not make that decision.",
  },
];

export default function AirAmbulancePage() {
  const [aircraftList, setAircraftList] = useState<PublicAircraft[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<number>(1);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [failedImageIds, setFailedImageIds] = useState<Set<number>>(new Set());

  // Set document SEO tags & JSON-LD
  useEffect(() => {
    document.title = "Air Ambulance in India: request a medical flight | JustCharter";

    // Set meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      "content",
      "Request verified, stretcher-equipped medical flight aircraft across India with certified medical crew and ground ambulance coordination. Clear itemized quotes."
    );

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://justcharter.in/air-ambulance");

    // JSON-LD Scripts (Service + FAQPage)
    const jsonLdService = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Air Ambulance Flight Coordination",
      serviceType: "Air Ambulance & Medical Evacuation Coordination",
      provider: {
        "@type": "Organization",
        name: "JustCharter",
        url: "https://justcharter.in",
      },
      description:
        "Request stretcher-equipped aircraft from verified operators with medical crew and coordinated hospital transfers.",
      areaServed: "IN",
    };

    const jsonLdFaq = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    };

    const scriptService = document.createElement("script");
    scriptService.type = "application/ld+json";
    scriptService.text = JSON.stringify(jsonLdService);
    scriptService.id = "json-ld-aa-service";
    document.head.appendChild(scriptService);

    const scriptFaq = document.createElement("script");
    scriptFaq.type = "application/ld+json";
    scriptFaq.text = JSON.stringify(jsonLdFaq);
    scriptFaq.id = "json-ld-aa-faq";
    document.head.appendChild(scriptFaq);

    return () => {
      const s1 = document.getElementById("json-ld-aa-service");
      if (s1) s1.remove();
      const s2 = document.getElementById("json-ld-aa-faq");
      if (s2) s2.remove();
    };
  }, []);

  // Fetch live public air ambulance aircraft
  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_BASE_URL}/public/air-ambulance/aircraft`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((resData) => {
        if (resData.data && Array.isArray(resData.data)) {
          setAircraftList(resData.data);
        } else {
          setAircraftList([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching air ambulance fleet:", err);
        setAircraftList([]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Compute live strip stats
  const totalCount = aircraftList.length;
  const uniqueCitiesCount = new Set(
    aircraftList.map((a) => a.base_city).filter((c) => c && c.trim().length > 0)
  ).size;
  const uniqueTypesCount = new Set(
    aircraftList.map((a) => a.display_model).filter((m) => m && m.trim().length > 0)
  ).size;

  const scrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("how-a-request-works");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50/40 text-[#002F5C] font-sans antialiased pt-20 selection:bg-[#FFD200]/30 selection:text-[#002F5C]">
      {/* 
        Single initial page entrance motion: 
        one fade + 8px rise on first view, 300ms, once.
        Respects prefers-reduced-motion via Tailwind media queries.
      */}
      <style>{`
        @keyframes pageRise {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-page-rise {
          animation: pageRise 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-page-rise {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <main className="animate-page-rise">
        {/* ========================================================= */}
        {/* SECTION 1: HERO (Asymmetric 7/5)                          */}
        {/* ========================================================= */}
        <section
          id="hero"
          aria-labelledby="hero-heading"
          className="py-16 sm:py-24 border-b border-stone-200/80"
        >
          <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left 7 Columns */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                {/* Eyebrow */}
                <p className="text-xs uppercase tracking-[0.12em] font-semibold text-stone-600 mb-4">
                  AIR AMBULANCE
                </p>

                {/* H1 */}
                <h1
                  id="hero-heading"
                  className="font-serif font-normal text-[#002F5C] tracking-tight mb-6 leading-[1.05]"
                  style={{
                    fontSize: "clamp(40px, 5vw, 64px)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  A medical flight, planned properly.
                </h1>

                {/* Subtitle */}
                <p className="text-[17px] sm:text-[18px] leading-[1.65] text-stone-600 max-w-[62ch] mb-8">
                  Request a stretcher-equipped aircraft from operators we have verified. We coordinate the aircraft, add ground ambulance transfers if you need them, and keep you updated until handover.
                </p>

                {/* Button Action Row */}
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <Link
                    to="/air-ambulance/request"
                    className="inline-flex items-center justify-center bg-[#FFD200] hover:bg-[#E6BC00] active:scale-[0.99] text-[#002F5C] font-semibold text-sm px-6 py-3.5 rounded-xl border border-[#CCA800]/40 transition-all shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-[#002F5C] focus-visible:outline-offset-2"
                  >
                    Request an air ambulance
                  </Link>

                  {hasValidPhone && (
                    <a
                      href={`tel:${airAmbulanceConfig.phone.replace(/\D/g, "")}`}
                      className="inline-flex items-center justify-center bg-white hover:bg-stone-100 text-[#002F5C] font-medium text-sm px-5 py-3.5 rounded-xl border border-stone-200/90 transition-all shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-[#002F5C] focus-visible:outline-offset-2"
                    >
                      <Phone className="w-4 h-4 mr-2 text-[#002F5C]" />
                      <span>Call {airAmbulanceConfig.phone}</span>
                    </a>
                  )}

                  <a
                    href="#how-a-request-works"
                    onClick={scrollToHowItWorks}
                    className="text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-[#002F5C] underline underline-offset-4 decoration-stone-300 hover:decoration-[#002F5C] transition-colors py-2 px-1 focus-visible:outline-2 focus-visible:outline-[#002F5C] focus-visible:outline-offset-2"
                  >
                    How it works
                  </a>
                </div>

                {/* Note with 3px Accent Left Border */}
                <div className="border-l-[3px] border-[#FFD200] bg-white rounded-r-xl border-y border-r border-stone-200/80 p-4 max-w-[62ch]">
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    If the patient is in immediate danger, call 112 or go to the nearest hospital first. An air ambulance moves a patient between hospitals. It is not a first-response service.
                  </p>
                </div>
              </div>

              {/* Right 5 Columns: Route Composition Only */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-[420px] bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-7 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                    <span className="text-[11px] uppercase tracking-widest text-stone-600 font-semibold">
                      Example route
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#FFD200]"></span>
                  </div>

                  <div className="py-8 flex flex-col items-center justify-center">
                    <svg
                      viewBox="0 0 280 110"
                      className="w-full max-w-[260px] h-auto select-none"
                      aria-hidden="true"
                    >
                      {/* Airport 1 */}
                      <text
                        x="35"
                        y="85"
                        textAnchor="middle"
                        className="font-serif text-2xl fill-[#002F5C] font-normal"
                      >
                        BOM
                      </text>
                      <text
                        x="35"
                        y="100"
                        textAnchor="middle"
                        className="text-[9px] uppercase tracking-wider fill-stone-500 font-sans"
                      >
                        Pickup
                      </text>

                      {/* Airport 2 */}
                      <text
                        x="245"
                        y="85"
                        textAnchor="middle"
                        className="font-serif text-2xl fill-[#002F5C] font-normal"
                      >
                        DEL
                      </text>
                      <text
                        x="245"
                        y="100"
                        textAnchor="middle"
                        className="text-[9px] uppercase tracking-wider fill-stone-500 font-sans"
                      >
                        Receiving
                      </text>

                      {/* Thin flight arc: dots sit directly ABOVE the codes (y=48), NEVER overlapping text */}
                      <path
                        d="M 35 48 Q 140 8, 245 48"
                        fill="none"
                        stroke="#002F5C"
                        strokeWidth="1.5"
                        strokeOpacity="0.4"
                        strokeDasharray="4 3"
                      />
                      <circle cx="35" cy="48" r="3.5" fill="#002F5C" />
                      <circle cx="245" cy="48" r="3.5" fill="#FFD200" />
                    </svg>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-sans">
                    <span>Stretcher transfer</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: LIVE STRIP (Hairline row, no icons)           */}
        {/* ========================================================= */}
        {!isLoading && totalCount > 0 && (
          <section
            id="live-strip"
            aria-label="Live Fleet Availability"
            className="border-b border-stone-200/80 bg-white py-4"
          >
            <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
              <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-8 text-xs sm:text-sm text-stone-600 font-sans">
                <div className="flex items-center space-x-2">
                  <span className="tabular-nums font-semibold text-[#002F5C] text-sm sm:text-base">
                    {totalCount}
                  </span>
                  <span>air ambulance aircraft listed</span>
                </div>

                <div className="hidden sm:block text-stone-300">/</div>

                <div className="flex items-center space-x-2">
                  <span className="tabular-nums font-semibold text-[#002F5C] text-sm sm:text-base">
                    {uniqueCitiesCount > 0 ? uniqueCitiesCount : 1}
                  </span>
                  <span>base {uniqueCitiesCount === 1 ? "city" : "cities"}</span>
                </div>

                <div className="hidden sm:block text-stone-300">/</div>

                <div className="flex items-center space-x-2">
                  <span className="tabular-nums font-semibold text-[#002F5C] text-sm sm:text-base">
                    {uniqueTypesCount > 0 ? uniqueTypesCount : 1}
                  </span>
                  <span>aircraft {uniqueTypesCount === 1 ? "type" : "types"}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* SECTION 3: WHEN AN AIR AMBULANCE IS THE RIGHT CALL       */}
        {/* ========================================================= */}
        <section
          id="when-to-use"
          aria-labelledby="when-heading"
          className="py-16 sm:py-24 border-b border-stone-200/80 bg-stone-50/50 scroll-mt-20"
        >
          <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
            <div className="mb-12 max-w-[62ch]">
              <h2
                id="when-heading"
                className="font-serif font-normal text-[#002F5C] tracking-tight leading-tight"
                style={{ fontSize: "clamp(28px, 3.2vw, 40px)" }}
              >
                When an air ambulance is needed
              </h2>
            </div>


            {/* Numbered Editorial List: 2 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {WHEN_LIST.map((item) => (
                <div key={item.number} className="flex items-start space-x-5">
                  <span className="text-3xl sm:text-4xl font-serif text-stone-300 font-light tabular-nums leading-none flex-shrink-0 pt-0.5">
                    {item.number}
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-serif font-normal text-[#002F5C]">
                      {item.headline}
                    </h3>
                    <p className="text-sm sm:text-[15px] leading-relaxed text-stone-600 max-w-[50ch]">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footnote */}
            <div className="mt-14 pt-6 border-t border-stone-200/70">
              <p className="text-xs text-stone-500 italic">
                Whether a patient is fit to fly is a medical decision for the treating doctor and the operator's medical team.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 4: WHAT IS ON BOARD (SIGNATURE SVG CUTAWAY)      */}
        {/* ========================================================= */}
        <section
          id="what-is-on-board"
          aria-labelledby="cutaway-heading"
          className="py-16 sm:py-24 border-b border-stone-200/80 bg-white scroll-mt-20"
        >
          <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
            <div className="mb-10 max-w-[62ch]">
              <h2
                id="cutaway-heading"
                className="font-serif font-normal text-[#002F5C] tracking-tight leading-tight"
                style={{ fontSize: "clamp(28px, 3.2vw, 40px)" }}
              >
                What is on board
              </h2>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left 7 Columns: Hand-built inline SVG Cutaway (Sticky while list scrolls) */}
              <div className="lg:col-span-7 lg:sticky lg:top-[104px] self-start bg-stone-50/80 rounded-2xl border border-stone-200/80 p-4 sm:p-6 flex flex-col justify-center min-h-[220px] w-full">
                <div className="relative w-full overflow-hidden">
                  <svg
                    viewBox="0 0 960 420"
                    className="w-full h-auto select-none"
                    aria-labelledby="svg-cutaway-title svg-cutaway-desc"
                    role="img"
                  >
                    <title id="svg-cutaway-title">
                      Side cutaway diagram of medical cabin layout
                    </title>
                    <desc id="svg-cutaway-desc">
                      Detailed diagram displaying the cabin layout including forward stretcher, oxygen panel, patient monitor, IV equipment, medical crew seat directly beside stretcher, and aft companion seating.
                    </desc>

                    {/* Cabin Background tint */}
                    <path
                      d="M 120 340 L 860 340 L 860 220 Q 860 110, 750 110 L 220 110 Q 120 110, 120 220 Z"
                      fill="#FFFFFF"
                      stroke="none"
                    />

                    {/* Fuselage Outline (1.5px stroke at 70% opacity in text color #002F5C) */}
                    <path
                      d="M 100 340 L 870 340 Q 890 340, 890 320 L 870 200 Q 850 100, 730 100 L 250 100 Q 140 100, 100 210 Z"
                      fill="none"
                      stroke="#002F5C"
                      strokeWidth="1.5"
                      strokeOpacity="0.7"
                    />

                    {/* Nose Cone Curve indication */}
                    <path
                      d="M 100 210 Q 80 250, 80 280 Q 80 340, 100 340"
                      fill="none"
                      stroke="#002F5C"
                      strokeWidth="1.5"
                      strokeOpacity="0.7"
                    />

                    {/* Cabin Floor Line */}
                    <line
                      x1="110"
                      y1="340"
                      x2="860"
                      y2="340"
                      stroke="#002F5C"
                      strokeWidth="2"
                      strokeOpacity="0.7"
                    />

                    {/* Cockpit separation bulkhead */}
                    <line
                      x1="180"
                      y1="115"
                      x2="180"
                      y2="340"
                      stroke="#002F5C"
                      strokeWidth="1.5"
                      strokeOpacity="0.35"
                      strokeDasharray="3 3"
                    />

                    {/* 5 Oval Windows */}
                    {[270, 390, 510, 630, 750].map((cx, idx) => (
                      <ellipse
                        key={idx}
                        cx={cx}
                        cy={150}
                        rx={16}
                        ry={24}
                        fill="#F5F5F4"
                        stroke="#002F5C"
                        strokeWidth="1.5"
                        strokeOpacity="0.6"
                      />
                    ))}

                    {/* ================= ELEMENT DRAWINGS ================= */}

                    {/* Hotspot 2: Medical Oxygen Station on forward wall */}
                    <g opacity="0.85">
                      <rect
                        x="185"
                        y="180"
                        width="30"
                        height="60"
                        rx="4"
                        fill="none"
                        stroke="#002F5C"
                        strokeWidth="1.5"
                        strokeOpacity="0.7"
                      />
                      <circle cx="200" cy="195" r="5" fill="none" stroke="#002F5C" strokeWidth="1.5" strokeOpacity="0.7" />
                      <circle cx="200" cy="215" r="5" fill="none" stroke="#002F5C" strokeWidth="1.5" strokeOpacity="0.7" />
                      <line x1="200" y1="240" x2="200" y2="300" stroke="#002F5C" strokeWidth="1.5" strokeOpacity="0.5" />
                    </g>

                    {/* Hotspot 3: Patient Monitor (wall bracket) */}
                    <g opacity="0.85">
                      <rect
                        x="250"
                        y="170"
                        width="46"
                        height="32"
                        rx="3"
                        fill="#F5F5F4"
                        stroke="#002F5C"
                        strokeWidth="1.5"
                        strokeOpacity="0.7"
                      />
                      {/* ECG trace line */}
                      <path
                        d="M 255 186 L 265 186 L 268 178 L 272 194 L 275 184 L 278 188 L 290 186"
                        fill="none"
                        stroke="#002F5C"
                        strokeWidth="1.5"
                        strokeOpacity="0.6"
                      />
                      {/* Wall mount arm */}
                      <line x1="250" y1="190" x2="230" y2="200" stroke="#002F5C" strokeWidth="1.5" strokeOpacity="0.6" />
                    </g>

                    {/* Hotspot 4: Infusion Pumps and Ventilator */}
                    <g opacity="0.85">
                      {/* Vertical IV Pole */}
                      <line x1="340" y1="130" x2="340" y2="300" stroke="#002F5C" strokeWidth="1.5" strokeOpacity="0.7" />
                      {/* Top hooks */}
                      <path d="M 330 135 Q 340 125, 350 135" fill="none" stroke="#002F5C" strokeWidth="1.5" strokeOpacity="0.7" />
                      {/* Syringe pump box */}
                      <rect x="325" y="165" width="28" height="20" rx="2" fill="#FFFFFF" stroke="#002F5C" strokeWidth="1.5" strokeOpacity="0.7" />
                      {/* Ventilator box */}
                      <rect x="325" y="195" width="30" height="26" rx="3" fill="#FFFFFF" stroke="#002F5C" strokeWidth="1.5" strokeOpacity="0.7" />
                    </g>

                    {/* Hotspot 1: Stretcher Base along Floor */}
                    <g opacity="0.9">
                      {/* Stretcher Floor Mount lock */}
                      <line x1="230" y1="335" x2="470" y2="335" stroke="#002F5C" strokeWidth="3" strokeOpacity="0.7" />
                      {/* Stretcher Legs / Frame */}
                      <line x1="250" y1="335" x2="270" y2="305" stroke="#002F5C" strokeWidth="1.5" strokeOpacity="0.7" />
                      <line x1="450" y1="335" x2="430" y2="305" stroke="#002F5C" strokeWidth="1.5" strokeOpacity="0.7" />
                      {/* Stretcher Mattress */}
                      <rect
                        x="235"
                        y="295"
                        width="230"
                        height="14"
                        rx="4"
                        fill="#FFFFFF"
                        stroke="#002F5C"
                        strokeWidth="1.5"
                        strokeOpacity="0.8"
                      />
                      {/* Head elevation */}
                      <path d="M 235 302 L 255 288 L 275 295" fill="none" stroke="#002F5C" strokeWidth="1.5" strokeOpacity="0.7" />
                      {/* Restraint Straps */}
                      <line x1="300" y1="293" x2="300" y2="310" stroke="#002F5C" strokeWidth="2" strokeOpacity="0.7" />
                      <line x1="380" y1="293" x2="380" y2="310" stroke="#002F5C" strokeWidth="2" strokeOpacity="0.7" />
                      <line x1="430" y1="293" x2="430" y2="310" stroke="#002F5C" strokeWidth="2" strokeOpacity="0.7" />
                    </g>

                    {/* Hotspot 5: Medical Crew Seat Directly Beside Stretcher */}
                    <g opacity="0.9">
                      {/* Swivel Crew Seat directly at stretcher edge */}
                      <path
                        d="M 475 340 L 475 295 Q 475 275, 490 275 L 530 275 Q 540 275, 540 285 L 540 295 L 475 295"
                        fill="#FFFFFF"
                        stroke="#002F5C"
                        strokeWidth="1.5"
                        strokeOpacity="0.7"
                      />
                      <rect x="525" y="215" width="16" height="70" rx="4" fill="#FFFFFF" stroke="#002F5C" strokeWidth="1.5" strokeOpacity="0.7" />
                      <line x1="495" y1="295" x2="495" y2="340" stroke="#002F5C" strokeWidth="1.5" strokeOpacity="0.7" />
                      {/* Second Crew Seat behind */}
                      <path
                        d="M 580 340 L 580 300 Q 580 280, 595 280 L 630 280 Q 640 280, 640 290 L 640 300 L 580 300"
                        fill="#FFFFFF"
                        stroke="#002F5C"
                        strokeWidth="1.5"
                        strokeOpacity="0.5"
                      />
                      <rect x="625" y="220" width="16" height="65" rx="4" fill="#FFFFFF" stroke="#002F5C" strokeWidth="1.5" strokeOpacity="0.5" />
                      <line x1="600" y1="300" x2="600" y2="340" stroke="#002F5C" strokeWidth="1.5" strokeOpacity="0.5" />
                    </g>

                    {/* Hotspot 6: Aft Companion Seat */}
                    <g opacity="0.9">
                      <path
                        d="M 740 340 L 740 300 Q 740 280, 755 280 L 790 280 Q 800 280, 800 290 L 800 300 L 740 300"
                        fill="#FFFFFF"
                        stroke="#002F5C"
                        strokeWidth="1.5"
                        strokeOpacity="0.7"
                      />
                      <rect x="785" y="215" width="18" height="70" rx="4" fill="#FFFFFF" stroke="#002F5C" strokeWidth="1.5" strokeOpacity="0.7" />
                      <line x1="760" y1="300" x2="760" y2="340" stroke="#002F5C" strokeWidth="1.5" strokeOpacity="0.7" />
                    </g>

                    {/* ================= NUMBERED HOTSPOTS (24px, >=44px tap targets) ================= */}
                    {CABIN_HOTSPOTS.map((hotspot) => {
                      const isActive = activeHotspot === hotspot.id;
                      return (
                        <g
                          key={hotspot.id}
                          tabIndex={0}
                          role="button"
                          aria-label={`Hotspot ${hotspot.id}: ${hotspot.title}`}
                          onClick={() => setActiveHotspot(hotspot.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setActiveHotspot(hotspot.id);
                            }
                          }}
                          onMouseEnter={() => setActiveHotspot(hotspot.id)}
                          className="cursor-pointer focus:outline-none"
                        >
                          {/* Invisible Mobile Tap Target Circle: 48px diameter (r=24) >= 44px */}
                          <circle
                            cx={hotspot.x}
                            cy={hotspot.y}
                            r={24}
                            fill="transparent"
                            pointerEvents="all"
                          />

                          {/* Active Halo */}
                          {isActive && (
                            <circle
                              cx={hotspot.x}
                              cy={hotspot.y}
                              r={20}
                              fill="#FFD200"
                              fillOpacity="0.3"
                              className="animate-pulse"
                            />
                          )}

                          {/* Hotspot Base Circle (24px diameter -> radius 12) */}
                          <circle
                            cx={hotspot.x}
                            cy={hotspot.y}
                            r={12}
                            fill="#FFD200"
                            stroke={isActive ? "#002F5C" : "#1A1A1A"}
                            strokeWidth={isActive ? "2" : "1.2"}
                            className="transition-transform duration-200"
                          />

                          {/* Hotspot Number (12px bold dark ink) */}
                          <text
                            x={hotspot.x}
                            y={hotspot.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            className="fill-[#1A1A1A] font-sans font-bold text-[12px] select-none pointer-events-none"
                          >
                            {hotspot.id}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>


              {/* Right 5 Columns: Matching Numbered List */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <ol className="divide-y divide-stone-200/80 border-t border-b border-stone-200/80 list-none p-0 m-0">
                  {CABIN_HOTSPOTS.map((item) => {
                    const isActive = activeHotspot === item.id;
                    return (
                      <li
                        key={item.id}
                        tabIndex={0}
                        onClick={() => setActiveHotspot(item.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setActiveHotspot(item.id);
                          }
                        }}
                        onMouseEnter={() => setActiveHotspot(item.id)}
                        onFocus={() => setActiveHotspot(item.id)}
                        className={`py-3.5 px-4 rounded-xl transition-all cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#002F5C] ${
                          isActive
                            ? "bg-stone-100/90 border-l-[3px] border-[#002F5C]"
                            : "hover:bg-stone-50 border-l-[3px] border-transparent"
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 tabular-nums transition-colors ${
                              isActive
                                ? "bg-[#002F5C] text-white"
                                : "bg-stone-200/80 text-stone-700"
                            }`}
                          >
                            {item.id}
                          </span>
                          <div className="space-y-1">
                            <span
                              className={`text-sm sm:text-base font-medium block transition-colors ${
                                isActive ? "text-[#002F5C] font-semibold" : "text-stone-800"
                              }`}
                            >
                              {item.title}
                            </span>
                            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-[48ch]">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>

                <div className="mt-6 pt-4 border-t border-stone-100">
                  <p className="text-xs text-stone-500 italic leading-relaxed">
                    Fit-out differs from aircraft to aircraft. Each aircraft we list shows what the operator has confirmed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 5: AIRCRAFT YOU CAN REQUEST (LIVE ENDPOINT)       */}
        {/* ========================================================= */}
        <section
          id="fleet"
          aria-labelledby="fleet-heading"
          className="py-16 sm:py-24 border-b border-stone-200/80 bg-stone-50/40 scroll-mt-20"
        >
          <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
            <div className="mb-10 max-w-[62ch]">
              <h2
                id="fleet-heading"
                className="font-serif font-normal text-[#002F5C] tracking-tight leading-tight mb-3"
                style={{ fontSize: "clamp(28px, 3.2vw, 40px)" }}
              >
                Aircraft you can request
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Prices depend on the route and the medical set-up, so every flight is quoted individually.
              </p>
            </div>

            {isLoading ? (
              /* Loading state */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="bg-white rounded-2xl border border-stone-200/80 p-5 h-96 animate-pulse flex flex-col justify-between"
                  >
                    <div className="w-full aspect-[4/3] bg-stone-100 rounded-xl mb-4"></div>
                    <div className="h-6 bg-stone-100 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-stone-100 rounded w-1/2 mb-4"></div>
                    <div className="h-10 bg-stone-100 rounded"></div>
                  </div>
                ))}
              </div>
            ) : aircraftList.length > 0 ? (
              /* 3-up desktop, horizontal scroll-snap on mobile */
              <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scroll-smooth -mx-6 px-6 md:mx-0 md:px-0">
                {aircraftList.map((aircraft) => (
                  <div
                    key={aircraft.id}
                    className="min-w-[280px] sm:min-w-[320px] md:min-w-0 flex-shrink-0 snap-center bg-white rounded-2xl border border-stone-200/80 p-5 flex flex-col justify-between shadow-xs hover:border-stone-300 transition-colors"
                  >
                    <div>
                      {/* Photo 4:3 Crop with Operator photo caption if present */}
                      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200/60 mb-4 flex items-center justify-center">
                        {aircraft.photo_url && !failedImageIds.has(aircraft.id) ? (
                          <>
                            <img
                              src={aircraft.photo_url}
                              alt={aircraft.display_model}
                              loading="lazy"
                              onError={() => setFailedImageIds((prev) => new Set(prev).add(aircraft.id))}
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded font-sans">
                              Operator photo
                            </span>
                          </>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-stone-50 text-stone-500">
                            <span className="font-serif italic text-sm text-stone-600 mb-1">
                              {aircraft.display_model}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Model & Base Location */}
                      <h3 className="text-lg sm:text-xl font-serif font-normal text-[#002F5C] leading-snug mb-1">
                        {aircraft.display_model}
                      </h3>
                      {(aircraft.base_city?.trim() || aircraft.base_airport_code?.trim()) ? (
                        <p className="text-xs text-stone-500 mb-4">
                          Based in {[aircraft.base_city?.trim(), aircraft.base_airport_code?.trim() ? `(${aircraft.base_airport_code.trim()})` : null].filter(Boolean).join(" ")}
                        </p>
                      ) : null}


                      {/* Confirmed-Equipment Tags */}
                      <div className="mb-4 min-h-[2rem]">
                        {aircraft.confirmed_equipment_tags &&
                        aircraft.confirmed_equipment_tags.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {aircraft.confirmed_equipment_tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center text-[10px] font-medium bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-md border border-stone-200/70"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-stone-400 italic">
                            Equipment confirmed upon flight request
                          </span>
                        )}
                      </div>

                      {/* Capacity line & Range */}
                      <div className="pt-3 border-t border-stone-100 text-xs text-stone-600 space-y-1.5">
                        <p className="tabular-nums">
                          {aircraft.capacity?.stretchers || 1} stretcher ·{" "}
                          {aircraft.capacity?.medical_crew || 2} medical crew ·{" "}
                          {aircraft.capacity?.companions || 1} companion{" "}
                          {aircraft.capacity?.companions === 1 ? "seat" : "seats"}
                        </p>
                        {aircraft.range_km && (
                          <p className="text-stone-500 tabular-nums">
                            {aircraft.range_km.toLocaleString()} km maximum range
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bottom Pricing & CTA */}
                    <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-xs font-medium text-stone-600">
                        Quote on request
                      </span>

                      <Link
                        to={`/air-ambulance/request?aircraft=${aircraft.id}`}
                        className="inline-flex items-center space-x-1 bg-[#002F5C] hover:bg-[#001D3A] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#002F5C]"
                      >
                        <span>Request this aircraft</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Quiet panel when no aircraft returned */
              <div className="bg-white rounded-2xl border border-stone-200/80 p-8 sm:p-12 text-center max-w-2xl mx-auto">
                <p className="text-base sm:text-lg text-[#002F5C] font-serif mb-2">
                  Aircraft are matched to each request.
                </p>
                <p className="text-sm text-stone-600 mb-6">
                  Tell us the route and we will check what is available.
                </p>
                <Link
                  to="/air-ambulance/request"
                  className="inline-flex items-center justify-center bg-[#FFD200] hover:bg-[#E6BC00] text-[#002F5C] font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all"
                >
                  Send Route Details
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 6: HOW A REQUEST WORKS (VERTICAL TIMELINE)        */}
        {/* ========================================================= */}
        <section
          id="how-a-request-works"
          aria-labelledby="how-heading"
          className="py-16 sm:py-24 border-b border-stone-200/80 bg-white scroll-mt-20"
        >
          <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Heading Column: Sticky on Desktop */}
              <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
                <h2
                  id="how-heading"
                  className="font-serif font-normal text-[#002F5C] tracking-tight leading-tight mb-6"
                  style={{ fontSize: "clamp(28px, 3.2vw, 40px)" }}
                >
                  How a request works
                </h2>

                {/* Side note */}
                <div className="border border-stone-200/80 rounded-xl bg-stone-50/70 p-4 max-w-[42ch]">
                  <p className="text-xs text-stone-700 leading-relaxed font-sans">
                    Every request gets a private status page so you can follow each stage.
                  </p>
                </div>
              </div>


              {/* Timeline Column with Continuous Thin Line */}
              <div className="lg:col-span-7">
                <div className="relative pl-8 sm:pl-10 space-y-10 border-l border-stone-200/90 ml-3 sm:ml-4">
                  {TIMELINE_STEPS.map((step) => (
                    <div key={step.step} className="relative group">
                      {/* Step Circle Marker */}
                      <span className="absolute -left-[45px] sm:-left-[53px] top-0 w-8 h-8 rounded-full bg-white border border-stone-300 text-[#002F5C] font-semibold text-xs flex items-center justify-center tabular-nums shadow-xs">
                        {step.step}
                      </span>

                      {/* Content */}
                      <div className="space-y-1 pt-0.5">
                        <h3 className="text-base sm:text-lg font-serif font-normal text-[#002F5C]">
                          {step.title}
                        </h3>
                        <p className="text-sm text-stone-600 leading-relaxed max-w-[54ch]">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 7: HOW IT IS PRICED                               */}
        {/* ========================================================= */}
        <section
          id="pricing-principles"
          aria-labelledby="pricing-heading"
          className="py-16 sm:py-24 border-b border-stone-200/80 bg-stone-50/50 scroll-mt-20"
        >
          <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
            <div className="mb-10 max-w-[62ch]">
              <h2
                id="pricing-heading"
                className="font-serif font-normal text-[#002F5C] tracking-tight leading-tight"
                style={{ fontSize: "clamp(28px, 3.2vw, 40px)" }}
              >
                How it is priced
              </h2>
            </div>

            {/* Two Columns with Hairline Dividers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 pt-4">
              {/* Left Column */}
              <div className="md:pr-10 md:border-r border-stone-200/80 space-y-4">
                <p className="text-base sm:text-lg text-[#002F5C] font-serif leading-relaxed">
                  Air ambulance flights are priced for the whole aircraft, not per seat.
                </p>
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                  Your quote lists each part separately and names the aircraft. Taxes, if any, are shown on the quote.
                </p>
              </div>

              {/* Right Column: Inclusions List */}
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-stone-500 mb-4">
                  Quoted components include
                </p>
                <ul className="space-y-3 list-none p-0 m-0 text-sm sm:text-[15px] text-stone-700">
                  {PRICING_INCLUSIONS.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#002F5C] mt-2 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 8: QUESTIONS WORTH ASKING ANY PROVIDER            */}
        {/* ========================================================= */}
        <section
          id="questions-to-ask"
          aria-labelledby="questions-heading"
          className="py-16 sm:py-24 border-b border-stone-200/80 bg-white scroll-mt-20"
        >
          <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
            <div className="mb-12 max-w-[62ch]">
              <h2
                id="questions-heading"
                className="font-serif font-normal text-[#002F5C] tracking-tight leading-tight"
                style={{ fontSize: "clamp(28px, 3.2vw, 40px)" }}
              >
                Questions worth asking any provider
              </h2>
            </div>

            {/* Definition list in 2 columns */}
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {QUESTIONS_LIST.map((item, idx) => (
                <div key={idx} className="space-y-2 border-t border-stone-200/70 pt-4">
                  <dt className="text-base sm:text-lg font-serif font-normal text-[#002F5C]">
                    {item.q}
                  </dt>
                  <dd className="text-sm leading-relaxed text-stone-600 m-0 max-w-[52ch]">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 9: FAQ ACCORDION (7 ITEMS)                        */}
        {/* ========================================================= */}
        <section
          id="faq"
          aria-labelledby="faq-heading"
          className="py-16 sm:py-24 border-b border-stone-200/80 bg-stone-50/50 scroll-mt-20"
        >
          <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
            <div className="mb-12 max-w-[62ch]">
              <h2
                id="faq-heading"
                className="font-serif font-normal text-[#002F5C] tracking-tight leading-tight"
                style={{ fontSize: "clamp(28px, 3.2vw, 40px)" }}
              >
                Frequently asked questions
              </h2>
            </div>


            {/* Accordion List */}
            <div className="divide-y divide-stone-200/80 border-t border-b border-stone-200/80">
              {FAQ_ITEMS.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={index} className="py-5 sm:py-6 transition-colors">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#002F5C] rounded-md py-1"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base sm:text-lg font-serif font-normal text-[#002F5C] group-hover:text-stone-900 transition-colors pr-6">
                        {faq.q}
                      </span>
                      <div className="p-1 rounded-full bg-white border border-stone-200 text-stone-600 flex-shrink-0 transition-transform">
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#002F5C]" : "text-stone-500"
                          }`}
                        />
                      </div>
                    </button>

                    <div
                      className={`grid transition-all duration-200 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-stone-600 text-sm sm:text-[15px] leading-relaxed max-w-[62ch]">
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

        {/* ========================================================= */}
        {/* SECTION 10: FINAL CTA (Plain light band)                 */}
        {/* ========================================================= */}
        <section
          id="final-cta"
          aria-labelledby="cta-heading"
          className="py-16 sm:py-24 bg-white"
        >
          <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
            <div className="bg-stone-50 rounded-2xl border border-stone-200/80 p-8 sm:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-[58ch]">
                <h2
                  id="cta-heading"
                  className="font-serif font-normal text-[#002F5C] tracking-tight leading-tight mb-2"
                  style={{ fontSize: "clamp(26px, 3vw, 36px)" }}
                >
                  Tell us where the patient is and where they need to be.
                </h2>
                <p className="text-sm text-stone-600">
                  A coordinator will review your request and reply with a quote.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
                <Link
                  to="/air-ambulance/request"
                  className="inline-flex items-center justify-center bg-[#FFD200] hover:bg-[#E6BC00] text-[#002F5C] font-semibold text-sm px-6 py-3.5 rounded-xl border border-[#CCA800]/40 transition-all shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-[#002F5C]"
                >
                  Request an air ambulance
                </Link>

                {hasValidPhone && (
                  <a
                    href={`tel:${airAmbulanceConfig.phone.replace(/\D/g, "")}`}
                    className="inline-flex items-center justify-center bg-white hover:bg-stone-100 text-[#002F5C] font-medium text-sm px-5 py-3.5 rounded-xl border border-stone-200/90 transition-all shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-[#002F5C]"
                  >
                    <Phone className="w-4 h-4 mr-2 text-[#002F5C]" />
                    <span>Call {airAmbulanceConfig.phone}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================= */}
      {/* STICKY BOTTOM BAR ON MOBILE                               */}
      {/* ========================================================= */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-stone-200/80 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-md">
        <div className="flex items-center gap-3">
          <Link
            to="/air-ambulance/request"
            className="flex-1 bg-[#FFD200] hover:bg-[#E6BC00] active:scale-[0.98] text-[#002F5C] font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-xs text-center min-h-[44px] flex items-center justify-center"
          >
            Request
          </Link>

          {hasValidPhone && (
            <a
              href={`tel:${airAmbulanceConfig.phone.replace(/\D/g, "")}`}
              className="flex-1 bg-white hover:bg-stone-100 active:scale-[0.98] text-[#002F5C] font-semibold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl border border-stone-200 text-center min-h-[44px] flex items-center justify-center"
            >
              Call
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
