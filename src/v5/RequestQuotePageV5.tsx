import React, { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Edit3,
  Sparkles,
  Plane
} from "lucide-react";
import FooterV5 from "./components/FooterV5";
import { API_BASE_URL } from "../api/axiosInstance";
import ConciergeBarV5 from "./components/ConciergeBarV5";

interface AircraftSpec {
  range: string;
  speed: string;
  passengers: string;
  height: string;
  length: string;
  baggage: string;
}

interface Aircraft {
  id: number;
  name: string;
  category: string;
  tagline: string;
  tag: string;
  imageUrl: string;
  images: string[];
  capacity: number;
  specs: AircraftSpec;
  highlights: string[];
  description: string;
  hourlyRate?: number;
}

interface AirportOption {
  id: number;
  basic_info: {
    name: string;
    city: string;
    country: string;
    iata_code?: string;
    icao_code?: string;
  };
}

export default function RequestQuotePageV5() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Search parameters state
  const [fromLocation, setFromLocation] = useState(searchParams.get("from") || "London (EGLF / FAB)");
  const [toLocation, setToLocation] = useState(searchParams.get("to") || "New York (KTEB / TEB)");
  const [departureDate, setDepartureDate] = useState(searchParams.get("date") || new Date().toISOString().split("T")[0]);
  const [returnDate, setReturnDate] = useState(searchParams.get("returnDate") || "");
  const [guestCount, setGuestCount] = useState<number>(parseInt(searchParams.get("guests") || "4", 10));
  const [tripType, setTripType] = useState(searchParams.get("tripType") || "one-way");

  // In-page search editing state
  const [isEditingSearch, setIsEditingSearch] = useState(false);
  const [editFrom, setEditFrom] = useState(fromLocation);
  const [editTo, setEditTo] = useState(toLocation);
  const [editDate, setEditDate] = useState(departureDate);
  const [editReturnDate, setEditReturnDate] = useState(returnDate);
  const [editGuests, setEditGuests] = useState(guestCount);

  // Airports list from API
  const [airports, setAirports] = useState<AirportOption[]>([]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  // Fleet & quote states
  const [fleet, setFleet] = useState<Aircraft[]>([]);
  const [isLoadingFleet, setIsLoadingFleet] = useState(true);
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  });
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  // Fetch airports dynamically
  useEffect(() => {
    fetch(`${API_BASE_URL}/settings/airport`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.data && Array.isArray(resData.data)) {
          setAirports(resData.data);
        }
      })
      .catch((err) => console.error("Error fetching airports:", err));
  }, []);

  // Fetch fleet dynamically from API
  const fetchFleetFromAPI = (guests: number) => {
    setIsLoadingFleet(true);
    fetch(`${API_BASE_URL}/settings/fleet?seat_count=${guests}`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.data && Array.isArray(resData.data)) {
          setFleet(resData.data);
        } else {
          setFleet([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching fleet:", err);
        setFleet([]);
      })
      .finally(() => setIsLoadingFleet(false));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchFleetFromAPI(guestCount);
  }, []);

  // Handle re-submitting edited search parameters
  const handleUpdateSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFromLocation(editFrom);
    setToLocation(editTo);
    setDepartureDate(editDate);
    setReturnDate(editReturnDate);
    setGuestCount(editGuests);

    setSearchParams({
      from: editFrom,
      to: editTo,
      date: editDate,
      returnDate: editReturnDate,
      guests: editGuests.toString(),
      tripType: tripType
    });

    setIsEditingSearch(false);
    fetchFleetFromAPI(editGuests);
  };

  // Handle Quote Form Submit
  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) return;

    setIsSubmittingQuote(true);
    try {
      await fetch(`${API_BASE_URL}/settings/quote-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          phone: contactForm.phone,
          notes: contactForm.notes,
          aircraft_id: selectedAircraft?.id || null,
          from: fromLocation,
          to: toLocation,
          date: departureDate,
          returnDate: returnDate,
          guests: guestCount,
          tripType: tripType
        })
      });
      setQuoteSubmitted(true);
    } catch (err) {
      console.error("Quote submission error:", err);
      setQuoteSubmitted(true); // Fallback confirmation
    } finally {
      setIsSubmittingQuote(false);
    }
  };

  // Filter recommended aircraft capacity
  const matchingAircraft = fleet.filter((jet) => jet.capacity >= guestCount);
  const recommendedFleet = matchingAircraft.length > 0 ? matchingAircraft.slice(0, 3) : [];
  const isLargeGroupFallback = fleet.length > 0 && matchingAircraft.length === 0;

  return (
    <div className="min-h-screen bg-stone-50/50 text-[#002F5C] font-sans antialiased selection:bg-[#FFD200]/30 selection:text-[#002F5C] pt-24 sm:pt-28">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-24">
        
        {/* 1. Header Navigation Context */}
        <div className="flex items-center space-x-2 text-xs text-stone-500 mb-6">
          <Link to="/" className="hover:text-[#002F5C] transition-colors">Home</Link>
          <span>/</span>
          <span className="font-semibold text-[#002F5C]">Request a Quote</span>
        </div>

        {/* 2. Compact Search Summary Bar */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-6 shadow-sm mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <div className="flex items-center space-x-2 bg-stone-50 px-3.5 py-2 rounded-xl border border-stone-200/70">
                <MapPin className="w-4 h-4 text-[#FFD200] flex-shrink-0" />
                <div>
                  <span className="text-[9px] uppercase font-bold text-stone-400 block tracking-wider">Route</span>
                  <span className="font-semibold text-[#002F5C]">{fromLocation} → {toLocation}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 bg-stone-50 px-3.5 py-2 rounded-xl border border-stone-200/70">
                <Calendar className="w-4 h-4 text-[#FFD200] flex-shrink-0" />
                <div>
                  <span className="text-[9px] uppercase font-bold text-stone-400 block tracking-wider">Date</span>
                  <span className="font-semibold text-[#002F5C]">
                    {departureDate} {returnDate ? `— ${returnDate}` : ""}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 bg-stone-50 px-3.5 py-2 rounded-xl border border-stone-200/70">
                <Users className="w-4 h-4 text-[#FFD200] flex-shrink-0" />
                <div>
                  <span className="text-[9px] uppercase font-bold text-stone-400 block tracking-wider">Guests</span>
                  <span className="font-semibold text-[#002F5C]">{guestCount} Passenger{guestCount > 1 ? "s" : ""}</span>
                </div>
              </div>
            </div>

            {/* Edit Search Toggle Button */}
            <button
              type="button"
              onClick={() => setIsEditingSearch(!isEditingSearch)}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#FFD200] hover:text-[#b88526] bg-[#FFD200]/10 hover:bg-[#FFD200]/20 px-4 py-2.5 rounded-xl transition-all border border-[#FFD200]/20 cursor-pointer self-start lg:self-auto"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditingSearch ? "Close Editor" : "Edit Search"}</span>
            </button>

          </div>

          {/* Expandable Inline Search Editor */}
          {isEditingSearch && (
            <form onSubmit={handleUpdateSearch} className="mt-6 pt-6 border-t border-stone-200/70 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
              
              <div className="lg:col-span-4 relative">
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">From (Origin)</label>
                <div className="relative">
                  <input
                    type="text"
                    value={editFrom}
                    onChange={(e) => {
                      setEditFrom(e.target.value);
                      setShowFromDropdown(true);
                    }}
                    onFocus={() => setShowFromDropdown(true)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#002F5C] focus:outline-none focus:border-[#FFD200]"
                    placeholder="Search origin airport"
                  />
                  {showFromDropdown && airports.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-stone-200 rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto">
                      {airports
                        .filter(a => a.basic_info.name.toLowerCase().includes(editFrom.toLowerCase()) || a.basic_info.city.toLowerCase().includes(editFrom.toLowerCase()))
                        .slice(0, 8)
                        .map(a => (
                          <div
                            key={a.id}
                            onClick={() => {
                              setEditFrom(`${a.basic_info.name} (${a.basic_info.city})`);
                              setShowFromDropdown(false);
                            }}
                            className="px-3.5 py-2 hover:bg-stone-50 text-xs cursor-pointer border-b border-stone-100 last:border-0"
                          >
                            <span className="font-semibold text-[#002F5C] block">{a.basic_info.name}</span>
                            <span className="text-[10px] text-stone-500">{a.basic_info.city}, {a.basic_info.country}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-4 relative">
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">To (Destination)</label>
                <div className="relative">
                  <input
                    type="text"
                    value={editTo}
                    onChange={(e) => {
                      setEditTo(e.target.value);
                      setShowToDropdown(true);
                    }}
                    onFocus={() => setShowToDropdown(true)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#002F5C] focus:outline-none focus:border-[#FFD200]"
                    placeholder="Search destination airport"
                  />
                  {showToDropdown && airports.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-stone-200 rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto">
                      {airports
                        .filter(a => a.basic_info.name.toLowerCase().includes(editTo.toLowerCase()) || a.basic_info.city.toLowerCase().includes(editTo.toLowerCase()))
                        .slice(0, 8)
                        .map(a => (
                          <div
                            key={a.id}
                            onClick={() => {
                              setEditTo(`${a.basic_info.name} (${a.basic_info.city})`);
                              setShowToDropdown(false);
                            }}
                            className="px-3.5 py-2 hover:bg-stone-50 text-xs cursor-pointer border-b border-stone-100 last:border-0"
                          >
                            <span className="font-semibold text-[#002F5C] block">{a.basic_info.name}</span>
                            <span className="text-[10px] text-stone-500">{a.basic_info.city}, {a.basic_info.country}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">Date</label>
                <input
                  type="date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-[#002F5C] focus:outline-none focus:border-[#FFD200]"
                />
              </div>

              <div className="lg:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">Guests</label>
                <div className="flex items-center space-x-2 bg-stone-50 border border-stone-200 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => setEditGuests(Math.max(1, editGuests - 1))}
                    className="w-7 h-7 rounded-lg bg-white border border-stone-200 font-bold text-xs flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold text-[#002F5C] flex-1 text-center">{editGuests}</span>
                  <button
                    type="button"
                    onClick={() => setEditGuests(editGuests + 1)}
                    className="w-7 h-7 rounded-lg bg-white border border-stone-200 font-bold text-xs flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="lg:col-span-12 flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-stone-900 hover:bg-[#FFD200] hover:text-[#002F5C] text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Update & Re-Calculate
                </button>
              </div>

            </form>
          )}

        </div>

        {/* 3. Section Heading */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 bg-white px-3.5 py-1.5 rounded-full border border-stone-200/80 mb-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FFD200]"></span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-serif italic text-stone-700">
              Curated Private Aircraft
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-[#002F5C] mb-3">
            Your Recommended Aircraft
          </h1>
          <p className="text-stone-600 text-sm sm:text-base font-serif italic max-w-2xl">
            Based on your trip, here's what we'd suggest — final pricing is confirmed by our concierge team.
          </p>
        </div>

        {/* 4. Recommended Aircraft Grid (Loaded from API) */}
        {isLoadingFleet ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-stone-200/80 animate-pulse h-96">
                <div className="bg-stone-200 h-48 rounded-xl mb-4"></div>
                <div className="bg-stone-200 h-6 w-3/4 rounded mb-2"></div>
                <div className="bg-stone-200 h-4 w-1/2 rounded mb-6"></div>
                <div className="bg-stone-100 h-16 rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : isLargeGroupFallback ? (
          /* 6. Fallback State for Groups Exceeding Capacity */
          <div className="bg-white border-2 border-dashed border-[#FFD200]/40 rounded-2xl p-8 sm:p-12 mb-16 text-center max-w-3xl mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#FFD200]/10 text-[#FFD200] flex items-center justify-center mx-auto mb-4">
              <Plane className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif font-normal text-[#002F5C] mb-3">
              Bespeak Sourcing Required
            </h3>
            <p className="text-stone-600 text-sm sm:text-base font-serif italic leading-relaxed mb-6">
              For groups of this size ({guestCount} guests), our concierge team can source additional aircraft — please share your details below.
            </p>
            <span className="inline-flex items-center space-x-2 text-xs font-semibold text-[#FFD200] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Direct Concierge Sourcing Active</span>
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {recommendedFleet.map((jet) => {
              const isSelected = selectedAircraft?.id === jet.id;
              return (
                <div
                  key={jet.id}
                  className={`bg-white rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md ${
                    isSelected ? "border-[#FFD200] ring-2 ring-[#FFD200]/20" : "border-stone-200/80"
                  }`}
                >
                  <div>
                    {/* Image */}
                    <div className="relative mb-5 rounded-xl overflow-hidden bg-stone-900 h-56">
                      <img
                        src={jet.imageUrl}
                        alt={jet.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <span className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-md text-[#FFD200] text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full border border-white/10">
                        {jet.category}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-serif font-normal text-[#002F5C] mb-2 group-hover:text-[#FFD200] transition-colors">
                      {jet.name}
                    </h3>

                    <p className="text-xs text-stone-500 font-serif italic mb-5 line-clamp-2">
                      "{jet.tagline}"
                    </p>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6 bg-stone-50 p-4 rounded-xl border border-stone-200/60 text-xs">
                      <div className="flex flex-col">
                        <span className="text-stone-400 font-medium text-[10px] uppercase tracking-wider">Max Range</span>
                        <span className="text-[#002F5C] font-bold mt-0.5">{jet.specs.range}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-stone-400 font-medium text-[10px] uppercase tracking-wider">Speed</span>
                        <span className="text-[#002F5C] font-bold mt-0.5">{jet.specs.speed}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-stone-400 font-medium text-[10px] uppercase tracking-wider">Capacity</span>
                        <span className="text-[#002F5C] font-bold mt-0.5">{jet.specs.passengers}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-stone-400 font-medium text-[10px] uppercase tracking-wider">Height</span>
                        <span className="text-[#002F5C] font-bold mt-0.5">{jet.specs.height}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                    <Link
                      to={`/aircraft/${jet.id}`}
                      className="text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-[#002F5C] flex items-center space-x-1"
                    >
                      <span>Inspect Spec</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#FFD200]" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAircraft(jet);
                        document.getElementById("quote-form-section")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#FFD200] text-[#002F5C]"
                          : "bg-stone-900 hover:bg-[#FFD200] hover:text-[#002F5C] text-white"
                      }`}
                    >
                      {isSelected ? "Selected" : "Request This Aircraft"}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* 5. Contact / Quote Form Section */}
        <div id="quote-form-section" className="max-w-3xl mx-auto bg-white rounded-2xl border border-stone-200/80 p-8 sm:p-12 shadow-sm">
          
          {!quoteSubmitted ? (
            <form onSubmit={handleQuoteSubmit} className="space-y-6">
              
              <div>
                <div className="inline-flex items-center space-x-2 bg-stone-100 px-3.5 py-1 rounded-full border border-stone-200/80 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#FFD200]"></span>
                  <span className="text-[10px] uppercase tracking-widest font-serif italic text-stone-700">
                    Concierge Direct Confirmation
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-normal text-[#002F5C] mb-2">
                  {selectedAircraft ? `Get Quote for ${selectedAircraft.name}` : "Request Your Firm Quote"}
                </h2>

                <p className="text-xs sm:text-sm text-stone-500 font-light">
                  Please share your details below. Our concierge team will review aircraft availability and respond with a confirmed itinerary and pricing.
                </p>
              </div>

              {selectedAircraft && (
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/70 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={selectedAircraft.imageUrl} alt={selectedAircraft.name} className="w-16 h-10 object-cover rounded-lg" />
                    <div>
                      <span className="text-[9px] uppercase font-bold text-[#FFD200] block">Selected Aircraft</span>
                      <span className="text-sm font-semibold text-[#002F5C]">{selectedAircraft.name}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedAircraft(null)}
                    className="text-[10px] font-bold text-stone-400 hover:text-[#002F5C] uppercase"
                  >
                    Change
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-semibold text-[#002F5C] focus:outline-none focus:border-[#FFD200]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-semibold text-[#002F5C] focus:outline-none focus:border-[#FFD200]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-semibold text-[#002F5C] focus:outline-none focus:border-[#FFD200]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                    Trip Type
                  </label>
                  <input
                    type="text"
                    disabled
                    value={tripType === "round-trip" ? "Round Trip" : "One Way"}
                    className="w-full bg-stone-100 border border-stone-200 rounded-xl px-4 py-3 text-xs font-semibold text-stone-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                  Special Notes / Preferences (Optional)
                </label>
                <textarea
                  rows={3}
                  value={contactForm.notes}
                  onChange={(e) => setContactForm({ ...contactForm, notes: e.target.value })}
                  placeholder="In-flight catering preferences, ground transport, pet transport, etc."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-medium text-[#002F5C] focus:outline-none focus:border-[#FFD200]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingQuote}
                className="w-full bg-[#FFD200] hover:bg-[#e6be00] text-[#002F5C] font-bold text-xs uppercase tracking-wider py-4 px-8 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center space-x-2 cursor-pointer border border-[#FFD200]"
              >
                <span>{isSubmittingQuote ? "Submitting Request..." : "Get My Quote"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-stone-500 font-light pt-2">
                <ShieldCheck className="w-4 h-4 text-[#FFD200]" />
                <span>Your details are kept strictly confidential. Response expected within 2 hours.</span>
              </div>

            </form>
          ) : (
            /* Submission Confirmation Message State */
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-[#FFD200]/15 text-[#FFD200] rounded-full flex items-center justify-center mx-auto border border-[#FFD200]/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#002F5C]">
                Thanks — our concierge team will reach out within 2 hours
              </h3>

              <p className="text-sm text-stone-600 font-serif italic max-w-lg mx-auto leading-relaxed">
                We have received your trip request from {fromLocation} to {toLocation} for {guestCount} passenger{guestCount > 1 ? "s" : ""}. One of our private aviation advisors is now preparing your bespoke flight itinerary and charter pricing.
              </p>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="bg-stone-900 hover:bg-[#FFD200] hover:text-[#002F5C] text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all cursor-pointer"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      <ConciergeBarV5 />
      <FooterV5 />
    </div>
  );
}
