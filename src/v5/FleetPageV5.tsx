import React, { useState, useEffect } from "react";
import AircraftCard, { Aircraft } from "./components/AircraftCard";
import ConciergeBarV5 from "./components/ConciergeBarV5";
import { Plane, ChevronDown } from "lucide-react";

const categories = ["All Categories", "Piston", "Turboprop", "Light Jet", "Midsize Jet", "Super Midsize Jet", "Heavy Jet", "Helicopter"];
const serviceTypes = ["All Services", "Charter", "Air Ambulance", "Aerial Survey", "Cargo"];
const PAGE_SIZE = 6;

export default function FleetPageV5() {
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [activeServiceType, setActiveServiceType] = useState("All Services");
  const [searchQuery, setSearchQuery] = useState("");
  const [aircraftList, setAircraftList] = useState<(Aircraft & { service_types?: string[] })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    fetch("http://localhost:8272/settings/fleet")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.data && Array.isArray(resData.data)) {
          const mapped = resData.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            category: item.aircraft_category || item.category,
            service_types: Array.isArray(item.service_types) ? item.service_types : [item.service_types || "Charter"],
            imageUrl: item.imageUrl || "/images/gulfstrem.jpg",
            tag: item.tag || item.category,
            specs: [
              { label: "Max Range", value: item.specs?.range || "7,500 nm" },
              { label: "Max Speed", value: item.specs?.speed || "516 kts" },
              { label: "Passengers", value: item.specs?.passengers || `up to ${item.capacity || 19}` },
              { label: "Cabin Height", value: item.specs?.height || "6 ft 3 in" },
            ]
          }));
          setAircraftList(mapped);
        }
      })
      .catch((err) => console.error("Error fetching fleet:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(PAGE_SIZE);
  };

  const handleServiceTypeChange = (st: string) => {
    setActiveServiceType(st);
    setVisibleCount(PAGE_SIZE);
  };

  const filteredData = aircraftList.filter((a) => {
    if (activeCategory !== "All Categories" && a.category !== activeCategory) {
      return false;
    }
    if (activeServiceType !== "All Services") {
      const services = a.service_types || [];
      if (!services.includes(activeServiceType)) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = a.name.toLowerCase().includes(q);
      const matchCat = a.category.toLowerCase().includes(q);
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
            alt="JustCharter Private Fleet"
            className="w-full h-full object-cover object-center filter brightness-[0.4] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950/50 to-stone-900"></div>
        </div>

        {/* Hero Central Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-white my-auto">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FFD200]"></span>
            <span className="text-xs font-serif italic tracking-widest uppercase text-stone-100 flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5 text-[#FFD200]" /> Private Fleet Selection
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal tracking-tight text-white leading-tight mb-4">
            Our Private Fleet
          </h1>

          <p className="text-base sm:text-xl text-stone-300 font-sans font-light max-w-2xl mx-auto leading-relaxed">
            Explore our curated lineup of world-class jets designed for ultimate comfort, range, and aerodynamic performance.
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
                  Explore All Fleet Models
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

            {/* Aircraft Category Pills */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
                Aircraft Category:
              </span>
              <div className="flex items-center space-x-4 sm:space-x-6 overflow-x-auto max-w-full pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap pb-1 border-b-2 ${
                      activeCategory === cat
                        ? "text-[#002F5C] border-[#FFD200]"
                        : "text-stone-400 border-transparent hover:text-stone-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Type Pills */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
                Service Type:
              </span>
              <div className="flex items-center space-x-4 sm:space-x-6 overflow-x-auto max-w-full pb-1">
                {serviceTypes.map((st) => (
                  <button
                    key={st}
                    onClick={() => handleServiceTypeChange(st)}
                    className={`text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap pb-1 border-b-2 ${
                      activeServiceType === st
                        ? "text-[#002F5C] border-[#FFD200]"
                        : "text-stone-400 border-transparent hover:text-stone-700"
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
                <div key={i} className="bg-white rounded-2xl p-6 border border-stone-200/70 animate-pulse h-96">
                  <div className="bg-stone-200 h-60 rounded-xl mb-4"></div>
                  <div className="bg-stone-200 h-6 w-3/4 rounded mb-2"></div>
                  <div className="bg-stone-100 h-16 rounded-xl"></div>
                </div>
              ))}
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-stone-200/70">
              <Plane className="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-xl font-serif text-[#002F5C] mb-2">No Aircraft Found</h3>
              <p className="text-sm text-stone-500 font-light">
                No aircraft match the "{activeFilter}" category at this time.
              </p>
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
                  Showing all {filteredData.length} aircraft in fleet
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
