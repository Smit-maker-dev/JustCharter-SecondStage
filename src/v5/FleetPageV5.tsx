import React, { useState, useEffect, useMemo } from "react";
import AircraftCard, { Aircraft } from "./components/AircraftCard";
import ConciergeBarV5 from "./components/ConciergeBarV5";
import { Plane, ChevronDown, RotateCcw } from "lucide-react";
import { API_BASE_URL } from "../api/axiosInstance";

const PREFERRED_CATEGORY_ORDER = [
  "Light Jet",
  "Midsize Jet",
  "Super Midsize Jet",
  "Heavy Jet",
  "Ultra Long Range",
  "Turboprop",
  "Piston",
  "Helicopter",
];
const serviceTypes = ["All Services", "Charter", "Air Ambulance", "Aerial Survey", "Cargo"];
const PAGE_SIZE = 6;

export default function FleetPageV5() {
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [activeServiceType, setActiveServiceType] = useState("All Services");
  const [searchQuery, setSearchQuery] = useState("");
  const [aircraftList, setAircraftList] = useState<(Aircraft & { service_types?: string[] })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const fetchFleet = () => {
    setIsLoading(true);
    setIsError(false);
    fetch(`${API_BASE_URL}/settings/fleet`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((resData) => {
        if (resData.data && Array.isArray(resData.data)) {
          const mapped = resData.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            category: item.aircraft_category || item.category,
            service_types: Array.isArray(item.service_types) ? item.service_types : [item.service_types || "Charter"],
            imageUrl: item.imageUrl || "/images/gulfstrem.jpg",
            tag: item.tag || item.category,
            hourlyRate: item.hourlyRate,
            capacity: item.capacity,
            base_city: item.base_city || item.location,
            specs: [
              { label: "Max Range", value: item.specs?.range },
              { label: "Max Speed", value: item.specs?.speed },
              { label: "Passengers", value: item.specs?.passengers || (item.capacity ? `up to ${item.capacity}` : null) },
              { label: "Cabin Height", value: item.specs?.height },
            ]
          }));
          setAircraftList(mapped);
        } else {
          setAircraftList([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching fleet:", err);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchFleet();
  }, []);

  const dynamicCategories = useMemo(() => {
    const present = new Map<string, string>();
    aircraftList.forEach((a) => {
      const raw = (a.category || "").trim();
      if (!raw) return;
      const lower = raw.toLowerCase();
      if (!present.has(lower)) {
        const standard = PREFERRED_CATEGORY_ORDER.find(
          (p) => p.toLowerCase() === lower
        );
        present.set(lower, standard || raw);
      }
    });

    const sorted = Array.from(present.values()).sort((a, b) => {
      const idxA = PREFERRED_CATEGORY_ORDER.indexOf(a);
      const idxB = PREFERRED_CATEGORY_ORDER.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });

    return ["All Categories", ...sorted];
  }, [aircraftList]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(PAGE_SIZE);
  };

  const handleServiceTypeChange = (st: string) => {
    setActiveServiceType(st);
    setVisibleCount(PAGE_SIZE);
  };

  const filteredData = aircraftList.filter((a) => {
    if (activeCategory !== "All Categories" && (a.category || "").trim().toLowerCase() !== activeCategory.trim().toLowerCase()) {
      return false;
    }
    if (activeServiceType !== "All Services") {
      const services = a.service_types || [];
      if (!services.includes(activeServiceType)) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (a.name || "").toLowerCase().includes(q);
      const matchCat = (a.category || "").toLowerCase().includes(q);
      const matchSt = (a.service_types || []).join(" ").toLowerCase().includes(q);
      if (!matchName && !matchCat && !matchSt) return false;
    }
    return true;
  });

  const displayedAircraft = filteredData.slice(0, visibleCount);
  const hasMore = visibleCount < filteredData.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  return (
    <div className="min-h-screen bg-white text-[#002F5C] font-sans antialiased selection:bg-[#FFD200]/30 selection:text-[#002F5C]">
      
      {/* 1. Hero / Header Section */}
      <section className="relative min-h-[45vh] lg:min-h-[50vh] flex flex-col justify-center items-center text-center pt-32 pb-16 bg-stone-900 overflow-hidden">
        {/* Background Image with Dark Vignette Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/gulfstrem.jpg"
            alt="JustCharter Verified Aircraft Network"
            className="w-full h-full object-cover object-center filter brightness-[0.4] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950/50 to-stone-900"></div>
        </div>

        {/* Hero Central Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-white my-auto">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FFD200]"></span>
            <span className="text-xs font-serif italic tracking-widest uppercase text-stone-100 flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5 text-[#FFD200]" /> Verified Aircraft Network
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal tracking-tight text-white leading-tight mb-4">
            The Fleet
          </h1>

          <p className="text-base sm:text-xl text-stone-300 font-sans font-light max-w-2xl mx-auto leading-relaxed">
            Explore verified aircraft from certified operators across India, curated for uncompromising safety, range, and cabin comfort.
          </p>
        </div>
      </section>

      {/* 2. Aircraft Gallery Grid Section */}
      <section className="py-20 sm:py-28 bg-stone-50/60 font-sans text-[#002F5C] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Header Controls & Filter Tabs */}
          <div className="flex flex-col gap-6 mb-12 border-b border-stone-200/80 pb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-4xl font-serif font-normal text-[#002F5C]">
                  Explore Available Aircraft
                </h2>
                <p className="text-sm text-stone-500 font-light mt-1">
                  Showing {displayedAircraft.length} of {filteredData.length} available aircraft
                </p>
              </div>

              {/* Search Bar */}
              <div className="w-full md:w-72">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  placeholder="Search model, category, service..."
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2 text-xs text-[#002F5C] placeholder-stone-400 focus:outline-none focus:border-[#002F5C]"
                />
              </div>
            </div>

            {/* Filter Controls Row */}
            <div className="flex flex-col gap-3.5">
              {/* Filter Meta Row: Count & Clear */}
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold text-[#002F5C] bg-white px-3 py-1 rounded-full border border-stone-200/80 shadow-xs">
                  {filteredData.length} {filteredData.length === 1 ? "aircraft" : "aircraft"}
                </span>
                {(activeCategory !== "All Categories" || activeServiceType !== "All Services" || searchQuery.trim() !== "") && (
                  <button
                    onClick={() => {
                      setActiveCategory("All Categories");
                      setActiveServiceType("All Services");
                      setSearchQuery("");
                      setVisibleCount(PAGE_SIZE);
                    }}
                    className="text-xs font-medium text-stone-600 hover:text-[#002F5C] flex items-center space-x-1 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Clear filters</span>
                  </button>
                )}
              </div>

              {/* Aircraft Category Pills */}
              <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-0.5 max-w-full">
                <span className="text-[11px] uppercase font-bold tracking-wider text-stone-500 mr-1 flex-shrink-0">
                  Category
                </span>
                {dynamicCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                      activeCategory === cat
                        ? "bg-[#FFD200] text-[#002F5C] font-semibold shadow-xs"
                        : "bg-white text-stone-600 font-medium border border-stone-200/80 hover:border-stone-400"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Service Type Pills */}
              <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-0.5 max-w-full">
                <span className="text-[11px] uppercase font-bold tracking-wider text-stone-500 mr-1 flex-shrink-0">
                  Service
                </span>
                {serviceTypes.map((st) => (
                  <button
                    key={st}
                    onClick={() => handleServiceTypeChange(st)}
                    className={`px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                      activeServiceType === st
                        ? "bg-[#FFD200] text-[#002F5C] font-semibold shadow-xs"
                        : "bg-white text-stone-600 font-medium border border-stone-200/80 hover:border-stone-400"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Aircraft Card Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-stone-200/70 animate-pulse">
                  <div className="bg-stone-100 aspect-[16/10] rounded-xl mb-4"></div>
                  <div className="bg-stone-100 h-6 w-3/4 rounded mb-2"></div>
                  <div className="bg-stone-50 h-20 rounded-xl mb-4"></div>
                  <div className="bg-stone-100 h-9 rounded-xl"></div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-red-100 shadow-sm max-w-lg mx-auto">
              <h3 className="text-xl font-serif text-[#002F5C] mb-2">Unable to Load Fleet</h3>
              <p className="text-sm text-stone-500 font-light mb-6">
                Failed to fetch aircraft details from the server. Please try again.
              </p>
              <button
                onClick={fetchFleet}
                className="inline-flex items-center space-x-2 bg-[#002F5C] hover:bg-[#002347] text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-xl transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Loading</span>
              </button>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center py-16 px-6 bg-white rounded-2xl border border-stone-200/80 max-w-lg mx-auto shadow-xs">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-3">
                <RotateCcw className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="text-xl font-serif font-normal text-[#002F5C] mb-2">No Matching Aircraft Found</h3>
              <p className="text-stone-600 text-xs sm:text-sm font-light mb-6">
                No aircraft match your selected filters or search terms. Try clearing filters or submit a custom quote request.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setActiveCategory("All Categories");
                    setActiveServiceType("All Services");
                    setSearchQuery("");
                    setVisibleCount(PAGE_SIZE);
                  }}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-semibold uppercase tracking-wider text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  Clear filters
                </button>
                <Link
                  to="/request-quote"
                  className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-[#FFD200] hover:text-[#002F5C] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Request a custom quote
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 sm:gap-y-16 gap-x-6 sm:gap-x-10">
                {displayedAircraft.map((aircraft) => (
                  <AircraftCard key={aircraft.id} aircraft={aircraft} />
                ))}
              </div>

              {/* Pagination / Load More Button */}
              {hasMore ? (
                <div className="mt-16 text-center">
                  <button
                    onClick={handleLoadMore}
                    className="bg-stone-900 hover:bg-[#FFD200] hover:text-[#002F5C] text-white font-semibold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-sm inline-flex items-center space-x-2 transition-all cursor-pointer group"
                  >
                    <span>Load More Aircraft</span>
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                  </button>
                </div>
              ) : (
                <div className="mt-16 text-center text-xs uppercase tracking-widest text-stone-400 font-semibold">
                  Showing all {filteredData.length} available aircraft
                </div>
              )}
            </>
          )}

        </div>
      </section>

      {/* 3. Global Concierge Bar */}
      <ConciergeBarV5 />

    </div>
  );
}
