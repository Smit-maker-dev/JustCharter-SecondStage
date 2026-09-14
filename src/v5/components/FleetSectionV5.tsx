import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface Spec {
  label: string;
  value: string;
}

interface Aircraft {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  specs: Spec[];
  tag: string;
}

const filters = ["All Aircraft", "Long Range", "Ultra Long Range", "Midsize"];

export default function FleetSectionV5() {
  const [activeFilter, setActiveFilter] = useState("All Aircraft");
  const [aircraftList, setAircraftList] = useState<Aircraft[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8272/settings/fleet")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.data && Array.isArray(resData.data)) {
          const mapped = resData.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            category: item.category,
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

  const filteredData =
    activeFilter === "All Aircraft"
      ? aircraftList
      : aircraftList.filter((a) => a.category === activeFilter);

  return (
    <section className="py-28 bg-stone-50/60 font-sans text-stone-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header & Minimalist Text Tab Navigation */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 sm:mb-20 gap-6 sm:gap-8">
          <div>
            <div className="inline-flex items-center space-x-2 bg-white px-4 py-1.5 rounded-full border border-stone-200/80 mb-3 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#DFA93B]"></span>
              <span className="text-xs uppercase tracking-[0.2em] font-serif italic text-stone-700">
                Out-Of-Bounds Engineering
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-stone-900">
              Exceptional Aircraft Selection
            </h2>
          </div>

          {/* Minimalist Text Tabs with Gold Active Underline */}
          <div className="flex items-center space-x-6 sm:space-x-8 border-b border-stone-200/80 pb-2 overflow-x-auto max-w-full">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap pb-2 border-b-2 -mb-2 ${
                  activeFilter === filter
                    ? "text-stone-900 border-[#DFA93B]"
                    : "text-stone-400 border-transparent hover:text-stone-700"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery / Lookbook Aircraft Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-stone-200/70 animate-pulse h-96">
                <div className="bg-stone-200 h-60 rounded-xl mb-4"></div>
                <div className="bg-stone-200 h-6 w-3/4 rounded mb-2"></div>
                <div className="bg-stone-100 h-16 rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 sm:gap-y-16 gap-x-6 sm:gap-x-10">
            {filteredData.map((aircraft) => (
              <div
                key={aircraft.id}
                className="bg-white border border-stone-200/70 rounded-2xl p-6 relative flex flex-col justify-between group shadow-sm hover:shadow-md transition-all duration-500"
              >
                {/* Large Beautifully Cropped Image Container */}
                <div className="relative mb-6 rounded-xl overflow-hidden bg-stone-900 h-60">
                  <img
                    src={aircraft.imageUrl}
                    alt={aircraft.name}
                    className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-md text-[#DFA93B] text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full border border-white/10">
                    {aircraft.tag}
                  </span>
                </div>

                {/* Title & Specs fading underneath */}
                <div>
                  <h3 className="text-2xl font-serif font-normal text-stone-900 mb-4 group-hover:text-[#DFA93B] transition-colors">
                    {aircraft.name}
                  </h3>

                  <div className="grid grid-cols-2 gap-3 mb-6 bg-stone-50 p-4 rounded-xl border border-stone-200/60 text-xs">
                    {aircraft.specs.map((spec, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="text-stone-400 font-medium text-[10px] uppercase tracking-wider">
                          {spec.label}
                        </span>
                        <span className="text-stone-900 font-bold mt-0.5">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Controls */}
                <div className="flex items-center justify-between pt-2">
                  <Link
                    to={`/aircraft/${aircraft.id}`}
                    className="text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-stone-950 flex items-center space-x-1"
                  >
                    <span>Inspect Spec</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => navigate(`/aircraft/${aircraft.id}`)}
                    className="bg-stone-900 hover:bg-[#DFA93B] hover:text-stone-950 text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

