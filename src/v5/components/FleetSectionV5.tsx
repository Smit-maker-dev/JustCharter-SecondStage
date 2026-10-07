import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import AircraftCard, { Aircraft } from "./AircraftCard";

const categories = ["All Categories", "Piston", "Turboprop", "Light Jet", "Midsize Jet", "Super Midsize Jet", "Heavy Jet", "Helicopter"];
const serviceTypes = ["All Services", "Charter", "Air Ambulance", "Aerial Survey", "Cargo"];

export default function FleetSectionV5() {
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [activeServiceType, setActiveServiceType] = useState("All Services");
  const [aircraftList, setAircraftList] = useState<(Aircraft & { service_types?: string[] })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const filteredData = aircraftList.filter((a) => {
    if (activeCategory !== "All Categories" && a.category !== activeCategory) return false;
    if (activeServiceType !== "All Services") {
      const services = a.service_types || [];
      if (!services.includes(activeServiceType)) return false;
    }
    return true;
  });

  // Limit displayed aircraft on home page to 6
  const homeDisplayData = filteredData.slice(0, 6);

  return (
    <section className="py-28 bg-stone-50/60 font-sans text-[#002F5C] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header & Minimalist Text Tab Navigation */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 sm:mb-20 gap-6 sm:gap-8 border-b border-stone-200/80 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-white px-4 py-1.5 rounded-full border border-stone-200/80 mb-3 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FFD200]"></span>
              <span className="text-xs uppercase tracking-[0.2em] font-serif italic text-stone-700">
                Out-Of-Bounds Engineering
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#002F5C]">
              Exceptional Aircraft Selection
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {/* Aircraft Category Pills */}
            <div className="flex items-center space-x-4 overflow-x-auto max-w-full pb-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 mr-1">Category:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
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

            {/* Service Type Pills */}
            <div className="flex items-center space-x-4 overflow-x-auto max-w-full pb-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 mr-1">Service:</span>
              {serviceTypes.map((st) => (
                <button
                  key={st}
                  onClick={() => setActiveServiceType(st)}
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

        {/* Gallery / Lookbook Aircraft Grid */}
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
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 sm:gap-y-16 gap-x-6 sm:gap-x-10">
              {homeDisplayData.map((aircraft) => (
                <AircraftCard key={aircraft.id} aircraft={aircraft} />
              ))}
            </div>

            {/* View Full Fleet CTA Button */}
            <div className="mt-16 sm:mt-20 text-center">
              <Link
                to="/fleet"
                className="bg-stone-900 hover:bg-[#FFD200] hover:text-[#002F5C] text-white font-semibold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-sm inline-flex items-center space-x-2 transition-all cursor-pointer group"
              >
                <span>View Full Fleet</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </>
        )}

      </div>
    </section>
  );
}


