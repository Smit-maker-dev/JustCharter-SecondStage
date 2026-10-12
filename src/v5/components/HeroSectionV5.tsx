import React, { useState, useRef, useEffect } from "react";
import { MapPin, Calendar, Users, ArrowRight, ShieldCheck, Plus, Trash2, X, CheckCircle2, ArrowUpRight } from "lucide-react";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { aircraftDetails } from "../AircraftDetailPageV5";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import CustomDatePicker, { getLocalTodayStr } from "./CustomDatePicker";

export interface Airport {
  code: string;
  city: string;
  name: string;
  full: string;
}

export default function HeroSectionV5() {
  const navigate = useNavigate();
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [isHeroInView, setIsHeroInView] = useState(true);
  const heroSectionRef = useRef<HTMLElement>(null);

  const [tripType, setTripType] = useState<"one-way" | "round-trip" | "multi-city">("one-way");

  const todayStr = getLocalTodayStr();

  // Form Fields State (initialized to local today)
  const [fromLocation, setFromLocation] = useState("New Delhi (DEL)");
  const [toLocation, setToLocation] = useState("Paris Le Bourget (LBG)");
  const [departureDate, setDepartureDate] = useState(todayStr);
  const [returnDate, setReturnDate] = useState(todayStr);
  const [guestCount, setGuestCount] = useState(4);

  // Multi-city legs
  const [multiLegs, setMultiLegs] = useState([
    { from: "New Delhi (DEL)", to: "Paris Le Bourget (LBG)", date: todayStr },
    { from: "Paris Le Bourget (LBG)", to: "London Luton (LTN)", date: todayStr },
  ]);

  // Autocomplete Dropdown State
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [airportSearchQuery, setAirportSearchQuery] = useState("");
  const [apiAirports, setApiAirports] = useState<Airport[]>([]);
  const [isLoadingAirports, setIsLoadingAirports] = useState(false);

  // Guest Stepper Popover State
  const [isGuestOpen, setIsGuestOpen] = useState(false);

  // Error State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Quote Results State
  const [showQuoteResults, setShowQuoteResults] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "" });

  // Direct Charter Quote Modal State
  const [isQuickQuoteOpen, setIsQuickQuoteOpen] = useState(false);
  const [quickQuoteSubmitted, setQuickQuoteSubmitted] = useState(false);
  const [quickQuoteForm, setQuickQuoteForm] = useState({
    name: "",
    phone: "",
    route: "New Delhi (DEL) to Paris Le Bourget (LBG)",
    date: todayStr,
  });

  const quoteResultsRef = useRef<HTMLDivElement>(null);

  // Track hero visibility in viewport to show/hide floating mute button
  useEffect(() => {
    const el = heroSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".airport-dropdown-container")) {
        setActiveDropdown(null);
      }
      if (!target.closest(".guest-stepper-container")) {
        setIsGuestOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch airports dynamically from backend API when searching or opening dropdown
  useEffect(() => {
    if (!activeDropdown) {
      setApiAirports([]);
      return;
    }

    let isMounted = true;
    const query = airportSearchQuery.trim();

    const fetchAirports = async () => {
      setIsLoadingAirports(true);
      try {
        const response = await axiosInstance.get(`/settings/airport?search=${encodeURIComponent(query)}`, { skipAuthRedirect: true } as any);
        if (isMounted) {
          if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
            const mapped = response.data.data.map((item: any): Airport => {
              const info = item.basic_info || item;
              const code = (info.iata_code || info.icao_code || item.id || "").toString().toUpperCase();
              const city = info.city || "";
              const name = info.name || "";
              const country = info.country || "";

              let full = "";
              if (city && code) {
                full = `${city} (${code})`;
              } else if (city) {
                full = city;
              } else if (name && code) {
                full = `${name} (${code})`;
              } else {
                full = name || code || "Unknown Airport";
              }

              return {
                code,
                city,
                name: name ? (country ? `${name}, ${country}` : name) : city,
                full,
              };
            });
            setApiAirports(mapped);
          } else {
            setApiAirports([]);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch airports from backend API", err);
        if (isMounted) setApiAirports([]);
      } finally {
        if (isMounted) setIsLoadingAirports(false);
      }
    };

    const timer = setTimeout(() => {
      fetchAirports();
    }, 200);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [airportSearchQuery, activeDropdown]);

  // Filter airports for autocomplete dropdown dynamically
  const getFilteredAirports = (currentVal: string, siblingVal: string) => {
    return apiAirports.filter((ap) => ap.full !== siblingVal);
  };

  const handleSelectAirport = (fieldKey: string, airportFull: string) => {
    if (fieldKey === "from") setFromLocation(airportFull);
    else if (fieldKey === "to") setToLocation(airportFull);
    else if (fieldKey.startsWith("multi-from-")) {
      const idx = parseInt(fieldKey.split("-")[2]);
      setMultiLegs((prev) => prev.map((leg, i) => (i === idx ? { ...leg, from: airportFull } : leg)));
    } else if (fieldKey.startsWith("multi-to-")) {
      const idx = parseInt(fieldKey.split("-")[2]);
      setMultiLegs((prev) => prev.map((leg, i) => (i === idx ? { ...leg, to: airportFull } : leg)));
    }
    setActiveDropdown(null);
    setAirportSearchQuery("");
    setErrors((prev) => ({ ...prev, [fieldKey]: "" }));
  };

  const addMultiLeg = () => {
    const lastLeg = multiLegs[multiLegs.length - 1];
    setMultiLegs([
      ...multiLegs,
      { from: lastLeg ? lastLeg.to : "London Luton (LTN)", to: "Dubai (DXB)", date: departureDate },
    ]);
  };

  const removeMultiLeg = (index: number) => {
    if (multiLegs.length > 1) {
      setMultiLegs(multiLegs.filter((_, i) => i !== index));
    }
  };

  const validateSearch = () => {
    const newErrors: { [key: string]: string } = {};

    if (tripType === "one-way" || tripType === "round-trip") {
      if (!fromLocation) newErrors["from"] = "Please select origin";
      if (!toLocation) newErrors["to"] = "Please select destination";
      if (fromLocation && toLocation && fromLocation === toLocation) {
        newErrors["to"] = "Origin and destination cannot be identical";
      }
      if (!departureDate) newErrors["date"] = "Please select date";
      if (tripType === "round-trip" && !returnDate) {
        newErrors["returnDate"] = "Please select return date";
      }
    } else {
      multiLegs.forEach((leg, idx) => {
        if (!leg.from) newErrors[`multi-from-${idx}`] = "Select origin";
        if (!leg.to) newErrors[`multi-to-${idx}`] = "Select destination";
        if (leg.from && leg.to && leg.from === leg.to) {
          newErrors[`multi-to-${idx}`] = "Origin and destination cannot be identical";
        }
        if (!leg.date) newErrors[`multi-date-${idx}`] = "Select date";
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSearch()) {
      const params = new URLSearchParams({
        from: fromLocation || "London (EGLF / FAB)",
        to: toLocation || "New York (KTEB / TEB)",
        date: departureDate || new Date().toISOString().split("T")[0],
        returnDate: returnDate || "",
        guests: guestCount.toString(),
        tripType: tripType
      });
      navigate(`/request-quote?${params.toString()}`);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.phone) {
      setQuoteSubmitted(true);
    }
  };

  const handleQuickQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickQuoteForm.name && quickQuoteForm.phone) {
      setQuickQuoteSubmitted(true);
    }
  };

  const recommendedFleet = aircraftDetails.filter((a) => {
    if (guestCount <= 9) return true;
    if (guestCount <= 19) return a.id !== 3;
    return a.id === 6;
  }).slice(0, 3);

  return (
    <div className="relative font-sans bg-white text-[#002F5C] overflow-hidden">
      
      {/* Floating Audio Control Pill (rendered only when hero is in viewport) */}
      {isHeroInView && (
        <button
          onClick={() => setIsAudioMuted(!isAudioMuted)}
          className="cursor-pointer fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-black/40 text-white shadow-md hover:shadow-lg backdrop-blur-md transition-all border border-white/20 hover:bg-black/60"
          aria-label={isAudioMuted ? "Unmute video" : "Mute video"}
        >
          {isAudioMuted ? (
            <IoVolumeMuteOutline size={20} />
          ) : (
            <IoVolumeHighOutline size={20} />
          )}
        </button>
      )}

      {/* Hero Full Screen Viewport */}
      <section ref={heroSectionRef} className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between pt-28 pb-16 bg-white">
        
        {/* Background Video Media with Seamless Gradient Transition */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            muted={isAudioMuted}
            loop
            playsInline
            className="w-full h-full object-cover object-center scale-105"
          >
            <source
              src="/images/Paradigm Shift_ The Next-Gen Gulfstream Fleet (2023).mp4"
              type="video/mp4"
            />
          </video>
          {/* Top-dark video overlay fading seamlessly into white at the bottom edge */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950/50 via-[65%] to-white"></div>
        </div>

        {/* Hero Central Story Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center text-white my-auto pt-10 pb-16">
          
          <div className="inline-flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3.5 sm:px-4 py-1.5 rounded-full border border-white/20 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FFD200]"></span>
            <span className="text-[10px] sm:text-xs font-serif italic tracking-widest uppercase text-stone-200">
              5,000+ AIRPORTS WORLDWIDE
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tight text-white leading-[1.08] mb-6 max-w-4xl mx-auto">
            <span className="text-white">Private Aviation</span> <br className="hidden sm:block" />
            <span className="italic font-serif font-light text-[#FFD200]">
              Made Simple
            </span>
          </h1>

          <p className="text-sm sm:text-xl text-stone-200 font-sans font-light max-w-2xl mx-auto leading-relaxed">
            Compare and charter aircraft from verified operators — transparent pricing, one point of contact.
          </p>
        </div>

        {/* Grounded Embedded Booking Bar (Overlapping Hero Bottom Edge) */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 w-full -mb-36 sm:-mb-28 lg:-mb-24">
          <div className="bg-white/98 backdrop-blur-2xl rounded-2xl p-4 sm:p-6 lg:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.06)] border border-stone-200/80">
            
            {/* Top Bar: Minimalist Trip Selector & Direct Quote Badge */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 sm:pb-5 mb-4 sm:mb-5 border-b border-stone-100">
              
              {/* Minimalist Segment Buttons */}
              <div className="inline-flex items-center bg-stone-100/90 p-1 rounded-xl border border-stone-200/60 max-w-full overflow-x-auto">
                {(["one-way", "round-trip", "multi-city"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setTripType(type);
                      setErrors({});
                    }}
                    className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                      tripType === type
                        ? "bg-white text-[#002F5C] shadow-sm"
                        : "text-stone-600 hover:text-[#002F5C]"
                    }`}
                  >
                    {type.replace("-", " ")}
                  </button>
                ))}
              </div>

              {/* Direct Charter Quote Badge */}
              <button
                type="button"
                onClick={() => {
                  setIsQuickQuoteOpen(true);
                  setQuickQuoteSubmitted(false);
                }}
                className="inline-flex items-center space-x-2 bg-stone-50 hover:bg-stone-100 border border-stone-200/80 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full cursor-pointer transition-colors"
              >
                <ShieldCheck className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#FFD200]" />
                <span className="text-[10px] sm:text-xs font-serif italic text-[#002F5C]">
                  Direct Charter Quote
                </span>
              </button>
            </div>

            {/* Input Controls */}
            <form onSubmit={handleSearchSubmit} className="space-y-3.5">
              
              {tripType !== "multi-city" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-3.5 items-start">
                  
                  {/* From Field */}
                  <div className={`relative airport-dropdown-container ${tripType === "round-trip" ? "lg:col-span-3" : "lg:col-span-3"}`}>
                    <div className="bg-stone-50/90 hover:bg-stone-100/80 border border-stone-200/70 rounded-xl p-3 sm:p-3.5 transition-all h-[68px] flex flex-col justify-center">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 flex items-center space-x-1.5 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-[#FFD200]" />
                        <span>From</span>
                      </label>
                      <input
                        type="text"
                        value={activeDropdown === "from" ? airportSearchQuery : fromLocation}
                        onFocus={() => {
                          setActiveDropdown("from");
                          setAirportSearchQuery(fromLocation);
                        }}
                        onChange={(e) => setAirportSearchQuery(e.target.value)}
                        placeholder="Search origin airport..."
                        className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#002F5C] focus:outline-none"
                      />
                    </div>
                    {errors["from"] && <span className="text-[10px] text-red-500 mt-1 block px-1">{errors["from"]}</span>}

                    {/* Autocomplete Dropdown */}
                    {activeDropdown === "from" && (
                      <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white rounded-xl shadow-xl border border-stone-200 max-h-56 overflow-y-auto p-1.5">
                        {isLoadingAirports && (
                          <div className="px-3 py-2 text-xs text-stone-400 italic">Searching airports...</div>
                        )}
                        {!isLoadingAirports && getFilteredAirports(fromLocation, toLocation).length === 0 && (
                          <div className="px-3 py-2 text-xs text-stone-400">No matching airports</div>
                        )}
                        {getFilteredAirports(fromLocation, toLocation).map((ap, apIdx) => (
                          <button
                            key={`${ap.code}-${apIdx}`}
                            type="button"
                            onClick={() => handleSelectAirport("from", ap.full)}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-50 transition-colors flex items-center justify-between text-xs cursor-pointer"
                          >
                            <span className="font-semibold text-[#002F5C]">{ap.full}</span>
                            <span className="text-[10px] text-stone-400 font-light truncate ml-2 max-w-[140px]">{ap.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* To Field */}
                  <div className={`relative airport-dropdown-container ${tripType === "round-trip" ? "lg:col-span-3" : "lg:col-span-3"}`}>
                    <div className="bg-stone-50/90 hover:bg-stone-100/80 border border-stone-200/70 rounded-xl p-3 sm:p-3.5 transition-all h-[68px] flex flex-col justify-center">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 flex items-center space-x-1.5 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-[#FFD200]" />
                        <span>To</span>
                      </label>
                      <input
                        type="text"
                        value={activeDropdown === "to" ? airportSearchQuery : toLocation}
                        onFocus={() => {
                          setActiveDropdown("to");
                          setAirportSearchQuery(toLocation);
                        }}
                        onChange={(e) => setAirportSearchQuery(e.target.value)}
                        placeholder="Search destination..."
                        className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#002F5C] focus:outline-none"
                      />
                    </div>
                    {errors["to"] && <span className="text-[10px] text-red-500 mt-1 block px-1">{errors["to"]}</span>}

                    {/* Autocomplete Dropdown */}
                    {activeDropdown === "to" && (
                      <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white rounded-xl shadow-xl border border-stone-200 max-h-56 overflow-y-auto p-1.5">
                        {isLoadingAirports && (
                          <div className="px-3 py-2 text-xs text-stone-400 italic">Searching airports...</div>
                        )}
                        {!isLoadingAirports && getFilteredAirports(toLocation, fromLocation).length === 0 && (
                          <div className="px-3 py-2 text-xs text-stone-400">No matching airports</div>
                        )}
                        {getFilteredAirports(toLocation, fromLocation).map((ap, apIdx) => (
                          <button
                            key={`${ap.code}-${apIdx}`}
                            type="button"
                            onClick={() => handleSelectAirport("to", ap.full)}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-50 transition-colors flex items-center justify-between text-xs cursor-pointer"
                          >
                            <span className="font-semibold text-[#002F5C]">{ap.full}</span>
                            <span className="text-[10px] text-stone-400 font-light truncate ml-2 max-w-[140px]">{ap.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Departure Date */}
                  <div className={`relative ${tripType === "round-trip" ? "lg:col-span-2" : "lg:col-span-2"}`}>
                    <CustomDatePicker
                      label="Date"
                      value={departureDate}
                      minDate={todayStr}
                      onChange={(val) => {
                        setDepartureDate(val);
                        if (returnDate && val > returnDate) {
                          setReturnDate(val);
                        }
                        setErrors((prev) => ({ ...prev, date: "" }));
                      }}
                      error={errors["date"]}
                    />
                  </div>

                  {/* Return Date (Round Trip Only) */}
                  {tripType === "round-trip" && (
                    <div className="relative lg:col-span-2">
                      <CustomDatePicker
                        label="Return Date"
                        value={returnDate}
                        minDate={departureDate || todayStr}
                        onChange={(val) => {
                          setReturnDate(val);
                          setErrors((prev) => ({ ...prev, returnDate: "" }));
                        }}
                        error={errors["returnDate"]}
                      />
                    </div>
                  )}

                  {/* Guests Stepper Field */}
                  <div className={`relative guest-stepper-container ${tripType === "round-trip" ? "lg:col-span-2" : "lg:col-span-2"}`}>
                    <div
                      onClick={() => setIsGuestOpen(!isGuestOpen)}
                      className="bg-stone-50/90 hover:bg-stone-100/80 border border-stone-200/70 rounded-xl p-3 sm:p-3.5 transition-all cursor-pointer h-[68px] flex flex-col justify-center"
                    >
                      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 flex items-center space-x-1.5 mb-1">
                        <Users className="w-3.5 h-3.5 text-[#FFD200]" />
                        <span>Guests</span>
                      </label>
                      <span className="block text-xs sm:text-sm font-semibold text-[#002F5C]">
                        {guestCount} Guests
                      </span>
                    </div>

                    {/* Guest Stepper Popover */}
                    {isGuestOpen && (
                      <div className="absolute top-full right-0 z-50 mt-1 bg-white rounded-xl shadow-xl border border-stone-200 p-4 w-60">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-[#002F5C] block">Passengers</span>
                            <span className="text-[10px] text-stone-500">Max 19 guests per jet</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                              className="w-7 h-7 rounded-lg bg-stone-100 text-[#002F5C] font-bold flex items-center justify-center hover:bg-stone-200 transition-colors"
                            >
                              -
                            </button>
                            <span className="text-sm font-bold text-[#002F5C] w-4 text-center">{guestCount}</span>
                            <button
                              type="button"
                              onClick={() => setGuestCount(Math.min(19, guestCount + 1))}
                              className="w-7 h-7 rounded-lg bg-stone-100 text-[#002F5C] font-bold flex items-center justify-center hover:bg-stone-200 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <div className={`lg:col-span-2 ${tripType === "round-trip" ? "lg:col-span-12 pt-2 sm:pt-0" : ""}`}>
                    <button
                      type="submit"
                      className={`w-full bg-[#FFD200] hover:bg-[#e6be00] text-[#002F5C] font-bold text-xs uppercase tracking-wider px-5 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center space-x-2 cursor-pointer border border-[#FFD200] ${
                        tripType === "round-trip" ? "h-[52px]" : "h-[68px]"
                      }`}
                    >
                      <span>Search Flights</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ) : (
                /* Multi-City Dynamic Leg Rows */
                <div className="space-y-3">
                  {multiLegs.map((leg, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center bg-stone-50/50 p-3 rounded-xl border border-stone-200/60">
                      
                      {/* From Leg */}
                      <div className="relative lg:col-span-4 airport-dropdown-container">
                        <div className="bg-white border border-stone-200/70 rounded-xl p-2.5">
                          <label className="text-[9px] font-bold uppercase tracking-wider text-stone-400 flex items-center space-x-1 mb-0.5">
                            <MapPin className="w-3 h-3 text-[#FFD200]" />
                            <span>Leg {idx + 1} From</span>
                          </label>
                          <input
                            type="text"
                            value={activeDropdown === `multi-from-${idx}` ? airportSearchQuery : leg.from}
                            onFocus={() => {
                              setActiveDropdown(`multi-from-${idx}`);
                              setAirportSearchQuery(leg.from);
                            }}
                            onChange={(e) => setAirportSearchQuery(e.target.value)}
                            className="w-full bg-transparent text-xs font-semibold text-[#002F5C] focus:outline-none"
                          />
                        </div>
                        {errors[`multi-from-${idx}`] && <span className="text-[9px] text-red-500 block px-1">{errors[`multi-from-${idx}`]}</span>}

                        {activeDropdown === `multi-from-${idx}` && (
                          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white rounded-xl shadow-xl border border-stone-200 max-h-48 overflow-y-auto p-1.5">
                            {isLoadingAirports && (
                              <div className="px-2.5 py-1.5 text-xs text-stone-400 italic">Searching...</div>
                            )}
                            {!isLoadingAirports && getFilteredAirports(leg.from, leg.to).length === 0 && (
                              <div className="px-2.5 py-1.5 text-xs text-stone-400">No matching airports</div>
                            )}
                            {getFilteredAirports(leg.from, leg.to).map((ap, apIdx) => (
                              <button
                                key={`${ap.code}-${apIdx}`}
                                type="button"
                                onClick={() => handleSelectAirport(`multi-from-${idx}`, ap.full)}
                                className="w-full text-left px-2.5 py-1.5 rounded hover:bg-stone-50 transition-colors flex items-center justify-between text-xs cursor-pointer"
                              >
                                <span className="font-semibold text-[#002F5C]">{ap.full}</span>
                                <span className="text-[10px] text-stone-400 font-light truncate ml-2 max-w-[120px]">{ap.name}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* To Leg */}
                      <div className="relative lg:col-span-4 airport-dropdown-container">
                        <div className="bg-white border border-stone-200/70 rounded-xl p-2.5">
                          <label className="text-[9px] font-bold uppercase tracking-wider text-stone-400 flex items-center space-x-1 mb-0.5">
                            <MapPin className="w-3 h-3 text-[#FFD200]" />
                            <span>Leg {idx + 1} To</span>
                          </label>
                          <input
                            type="text"
                            value={activeDropdown === `multi-to-${idx}` ? airportSearchQuery : leg.to}
                            onFocus={() => {
                              setActiveDropdown(`multi-to-${idx}`);
                              setAirportSearchQuery(leg.to);
                            }}
                            onChange={(e) => setAirportSearchQuery(e.target.value)}
                            className="w-full bg-transparent text-xs font-semibold text-[#002F5C] focus:outline-none"
                          />
                        </div>
                        {errors[`multi-to-${idx}`] && <span className="text-[9px] text-red-500 block px-1">{errors[`multi-to-${idx}`]}</span>}

                        {activeDropdown === `multi-to-${idx}` && (
                          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white rounded-xl shadow-xl border border-stone-200 max-h-48 overflow-y-auto p-1.5">
                            {isLoadingAirports && (
                              <div className="px-2.5 py-1.5 text-xs text-stone-400 italic">Searching...</div>
                            )}
                            {!isLoadingAirports && getFilteredAirports(leg.to, leg.from).length === 0 && (
                              <div className="px-2.5 py-1.5 text-xs text-stone-400">No matching airports</div>
                            )}
                            {getFilteredAirports(leg.to, leg.from).map((ap, apIdx) => (
                              <button
                                key={`${ap.code}-${apIdx}`}
                                type="button"
                                onClick={() => handleSelectAirport(`multi-to-${idx}`, ap.full)}
                                className="w-full text-left px-2.5 py-1.5 rounded hover:bg-stone-50 transition-colors flex items-center justify-between text-xs cursor-pointer"
                              >
                                <span className="font-semibold text-[#002F5C]">{ap.full}</span>
                                <span className="text-[10px] text-stone-400 font-light truncate ml-2 max-w-[120px]">{ap.name}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Date Leg */}
                      <div className="lg:col-span-3">
                        <CustomDatePicker
                          label="Date"
                          value={leg.date}
                          minDate={idx === 0 ? todayStr : (multiLegs[idx - 1]?.date || todayStr)}
                          onChange={(newDate) => {
                            setMultiLegs((prev) =>
                              prev.map((l, i) => (i === idx ? { ...l, date: newDate } : l))
                            );
                          }}
                        />
                      </div>

                      {/* Remove Leg Button */}
                      <div className="lg:col-span-1 flex justify-end">
                        {multiLegs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMultiLeg(idx)}
                            className="p-2 text-stone-400 hover:text-red-500 transition-colors cursor-pointer"
                            title="Remove leg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                    </div>
                  ))}

                  {/* Multi-city controls: Add Leg + Guests & Search */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={addMultiLeg}
                      className="inline-flex items-center space-x-1 text-xs font-semibold text-[#FFD200] hover:text-[#e6be00] transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Add another city</span>
                    </button>

                    <div className="flex items-center space-x-3 w-full sm:w-auto">
                      {/* Shared Guests selector */}
                      <div className="relative guest-stepper-container">
                        <div
                          onClick={() => setIsGuestOpen(!isGuestOpen)}
                          className="bg-stone-50 border border-stone-200/70 px-4 py-2 rounded-xl text-xs font-semibold text-[#002F5C] cursor-pointer"
                        >
                          {guestCount} Guests
                        </div>

                        {isGuestOpen && (
                          <div className="absolute bottom-full right-0 mb-1 z-50 bg-white rounded-xl shadow-xl border border-stone-200 p-4 w-60">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#002F5C]">Passengers</span>
                              <div className="flex items-center space-x-2">
                                <button
                                  type="button"
                                  onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                                  className="w-7 h-7 rounded bg-stone-100 text-[#002F5C] font-bold flex items-center justify-center hover:bg-stone-200"
                                >
                                  -
                                </button>
                                <span className="text-sm font-bold text-[#002F5C] w-4 text-center">{guestCount}</span>
                                <button
                                  type="button"
                                  onClick={() => setGuestCount(Math.min(19, guestCount + 1))}
                                  className="w-7 h-7 rounded bg-stone-100 text-[#002F5C] font-bold flex items-center justify-center hover:bg-stone-200"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="bg-[#FFD200] hover:bg-[#e6be00] text-[#002F5C] font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <span>Search Flights</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              )}

            </form>
          </div>
        </div>

      </section>
      
      {/* Spacer to handle negative margin overlapping bottom container cleanly */}
      <div className="h-40 sm:h-32 bg-white"></div>

      {/* 5. In-Page Quote Results View (Revealed after valid search submission) */}
      {showQuoteResults && (
        <div ref={quoteResultsRef} className="max-w-6xl mx-auto px-6 py-16 font-sans">
          <div className="bg-stone-50/90 rounded-2xl p-8 sm:p-12 border border-stone-200/80 shadow-md">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-stone-200/80 gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#FFD200] block mb-1">
                  Flight Options Available
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#002F5C]">
                  Request a Firm Charter Quote
                </h3>
              </div>

              <div className="bg-white px-4 py-2 rounded-xl border border-stone-200/80 text-xs font-medium text-stone-700">
                <span className="font-bold text-[#002F5C]">Search: </span>
                {tripType === "multi-city"
                  ? `${multiLegs.length} Legs (${guestCount} Guests)`
                  : `${fromLocation} → ${toLocation} (${guestCount} Guests, ${departureDate})`}
              </div>
            </div>

            {/* Recommended Fleet Grid */}
            <div className="mb-10">
              <h4 className="text-xs font-serif italic uppercase tracking-wider text-stone-500 mb-4">
                Recommended Aircraft for Your Route & Passenger Count:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendedFleet.map((jet) => (
                  <div key={jet.id} className="bg-white p-5 rounded-xl border border-stone-200/80 flex flex-col justify-between">
                    <div>
                      <img src={jet.images[0]} alt={jet.name} className="w-full h-36 object-cover rounded-lg mb-3" />
                      <span className="text-[9px] uppercase tracking-widest text-[#FFD200] font-semibold block mb-1">{jet.category}</span>
                      <h5 className="font-serif font-normal text-lg text-[#002F5C]">{jet.name}</h5>
                      <p className="text-xs text-stone-500 font-light mt-1">{jet.tagline}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-[#002F5C]">{jet.specs.range}</span>
                      <button
                        type="button"
                        onClick={() => navigate(`/aircraft/${jet.id}`)}
                        className="text-[#FFD200] font-semibold hover:underline inline-flex items-center space-x-1"
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Concierge Contact Form */}
            {!quoteSubmitted ? (
              <form onSubmit={handleContactSubmit} className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200/80">
                <h4 className="text-lg font-serif font-normal text-[#002F5C] mb-2">
                  Send Details to Concierge Team
                </h4>
                <p className="text-xs text-stone-500 font-light mb-6">
                  Private charter pricing is customized based on exact flight plans. Our 24/7 concierge will send itemized options within 15 minutes.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Jonathan Harrington"
                      className="w-full bg-stone-50 border border-stone-200 p-2.5 rounded-lg text-xs text-[#002F5C] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="e.g. j.harrington@company.com"
                      className="w-full bg-stone-50 border border-stone-200 p-2.5 rounded-lg text-xs text-[#002F5C] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-stone-50 border border-stone-200 p-2.5 rounded-lg text-xs text-[#002F5C] focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-[#FFD200] hover:bg-[#e6be00] text-[#002F5C] font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  Submit Quote Request
                </button>
              </form>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <h4 className="text-lg font-serif font-normal text-emerald-950">Quote Request Submitted</h4>
                <p className="text-xs text-emerald-700 font-light mt-1">
                  Thank you {contactForm.name}. A flight concierge has received your request and will contact you shortly via phone/email with availability and fixed pricing.
                </p>
              </div>
            )}

          </div>
        </div>
      )}

      {/* 6. Direct Charter Quick Quote Modal */}
      {isQuickQuoteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/75 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200">
            
            <button
              onClick={() => setIsQuickQuoteOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-[#002F5C] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!quickQuoteSubmitted ? (
              <form onSubmit={handleQuickQuoteSubmit}>
                <div className="inline-flex items-center space-x-2 bg-stone-100 px-3 py-1 rounded-full border border-stone-200 mb-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FFD200]" />
                  <span className="text-[10px] uppercase tracking-widest font-serif italic text-stone-700">
                    Direct Charter Callback
                  </span>
                </div>

                <h3 className="text-2xl font-serif font-normal text-[#002F5C] mb-1">
                  Request Quick Quote
                </h3>

                <p className="text-xs text-stone-500 font-light mb-6">
                  Skip the search bar — leave your route and phone number for an immediate charter callback from our desk.
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={quickQuoteForm.name}
                      onChange={(e) => setQuickQuoteForm({ ...quickQuoteForm, name: e.target.value })}
                      placeholder="e.g. Sophia Williams"
                      className="w-full bg-stone-50 border border-stone-200 p-3 rounded-xl text-xs text-[#002F5C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={quickQuoteForm.phone}
                      onChange={(e) => setQuickQuoteForm({ ...quickQuoteForm, phone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-stone-50 border border-stone-200 p-3 rounded-xl text-xs text-[#002F5C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">Route & Preferred Date</label>
                    <input
                      type="text"
                      value={quickQuoteForm.route}
                      onChange={(e) => setQuickQuoteForm({ ...quickQuoteForm, route: e.target.value })}
                      placeholder="e.g. New York to London, Oct 12"
                      className="w-full bg-stone-50 border border-stone-200 p-3 rounded-xl text-xs text-[#002F5C] focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FFD200] hover:bg-[#e6be00] text-[#002F5C] font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  Request Callback
                </button>
              </form>
            ) : (
              <div className="text-center py-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                <h4 className="text-xl font-serif font-normal text-[#002F5C] mb-1">Callback Requested</h4>
                <p className="text-xs text-stone-600 font-light leading-relaxed mb-6">
                  Thank you {quickQuoteForm.name}. A senior flight manager will call your mobile number directly to arrange your charter.
                </p>
                <button
                  onClick={() => setIsQuickQuoteOpen(false)}
                  className="bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider px-6 py-2.5 rounded-xl"
                >
                  Close
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
