import React, { useState, useEffect, useMemo } from "react";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import AircraftCard, { Aircraft } from "./AircraftCard";
import { API_BASE_URL } from "../../api/axiosInstance";

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

export default function FleetSectionV5() {
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [activeServiceType, setActiveServiceType] = useState("All Services");
  const [aircraftList, setAircraftList] = useState<(Aircraft & { service_types?: string[] })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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

  const filteredData = aircraftList.filter((a) => {
    if (activeCategory !== "All Categories" && (a.category || "").trim().toLowerCase() !== activeCategory.trim().toLowerCase()) return false;
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
            <div className="inline-flex items-center space-x-2 bg-white px-4 py-1.5 rounded-full border border-stone-200/80 mb-3 shadow-sm whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-[#FFD200]"></span>
              <span className="text-xs uppercase tracking-[0.2em] font-serif italic text-stone-700 whitespace-nowrap">
                Verified Aircraft
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
              {dynamicCategories.map((cat) => (
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
        ) : isError ? (
          <div className="text-center py-16 px-6 bg-white rounded-2xl border border-red-100 shadow-sm max-w-lg mx-auto">
            <p className="text-base font-medium text-stone-800 mb-2">Unable to load fleet aircraft</p>
            <p className="text-xs text-stone-500 mb-6">Please check your internet connection or try again.</p>
            <button
              onClick={fetchFleet}
              className="inline-flex items-center space-x-2 bg-[#002F5C] hover:bg-[#002347] text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-xl transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Loading</span>
            </button>
          </div>
        ) : homeDisplayData.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white rounded-2xl border border-stone-200/70 max-w-lg mx-auto">
            <p className="text-base font-medium text-stone-800 mb-1">No Aircraft Found</p>
            <p className="text-xs text-stone-500">No fleet models available under the selected filters.</p>
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


