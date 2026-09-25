import React, { useState } from "react";
import { ArrowRight, Plane, ArrowUpRight } from "lucide-react";

const aircraftData = [
  {
    id: 1,
    name: "Gulfstream G700",
    category: "Long Range",
    imageUrl: "/images/gulfstrem.jpg",
    specs: [
      { label: "Max Range", value: "7,500 nm" },
      { label: "Max Speed", value: "516 kts" },
      { label: "Passengers", value: "up to 19" },
      { label: "Cabin Height", value: "6 ft 3 in" },
    ],
    tag: "Long Range",
  },
  {
    id: 2,
    name: "Bombardier Global 7500",
    category: "Ultra Long Range",
    imageUrl: "/images/bombardier.webp",
    specs: [
      { label: "Max Range", value: "7,700 nm" },
      { label: "Max Speed", value: "516 kts" },
      { label: "Passengers", value: "up to 19" },
      { label: "Cabin Height", value: "6 ft 2 in" },
    ],
    tag: "Ultra Long Range",
  },
  {
    id: 3,
    name: "Cessna Citation Latitude",
    category: "Midsize",
    imageUrl: "/images/cessna.webp",
    specs: [
      { label: "Max Range", value: "2,700 nm" },
      { label: "Max Speed", value: "446 kts" },
      { label: "Passengers", value: "up to 9" },
      { label: "Cabin Height", value: "6 ft" },
    ],
    tag: "Midsize",
  },
  {
    id: 4,
    name: "Dassault Falcon 10X",
    category: "Long Range",
    imageUrl: "/images/DassaultFalcon.jpg",
    specs: [
      { label: "Max Range", value: "7,500 nm" },
      { label: "Max Speed", value: "520 kts" },
      { label: "Passengers", value: "up to 19" },
      { label: "Cabin Height", value: "6 ft 8 in" },
    ],
    tag: "Long Range",
  },
  {
    id: 5,
    name: "Gulfstream G800",
    category: "Long Range",
    imageUrl: "/images/gulfG800.jpg",
    specs: [
      { label: "Max Range", value: "8,000 nm" },
      { label: "Max Speed", value: "516 kts" },
      { label: "Passengers", value: "up to 19" },
      { label: "Cabin Height", value: "6 ft 3 in" },
    ],
    tag: "Long Range",
  },
  {
    id: 6,
    name: "Boeing Business Jet 777X",
    category: "Ultra Long Range",
    imageUrl: "/images/BoeingBusinessjet.jpg",
    specs: [
      { label: "Max Range", value: "11,645 nm" },
      { label: "Max Speed", value: "516 kts" },
      { label: "Passengers", value: "up to 75" },
      { label: "Cabin Height", value: "7 ft 1 in" },
    ],
    tag: "Ultra Long Range",
  },
];

const filters = ["All Aircraft", "Long Range", "Ultra Long Range", "Midsize"];

export default function FleetSectionV3() {
  const [activeFilter, setActiveFilter] = useState("All Aircraft");

  const filteredData =
    activeFilter === "All Aircraft"
      ? aircraftData
      : aircraftData.filter((a) => a.category === activeFilter);

  return (
    <section className="py-28 bg-white font-sans text-[#002F5C] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header & Category Pills (BUG 2 FIX: Individual pill buttons wrapper with zero awkward wrapping) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div>
            <div className="inline-flex items-center space-x-2 bg-stone-100 px-4 py-1.5 rounded-full border border-slate-200/80 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FFB817]"></span>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-700">
                Out-Of-Bounds Engineering
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#002F5C]">
              Exceptional Aircraft Selection
            </h2>
          </div>

          {/* Individual Pill-Shaped Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  activeFilter === filter
                    ? "bg-slate-900 text-white border-[#002F5C] shadow-md"
                    : "bg-stone-100 text-slate-600 border-slate-200/80 hover:bg-stone-200/70 hover:text-[#002F5C]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Out-of-Bounds Overlapping Fleet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 pt-8">
          {filteredData.map((aircraft) => (
            <div
              key={aircraft.id}
              className="bg-stone-50 border border-slate-200/70 rounded-3xl p-6 pt-0 relative flex flex-col justify-between group shadow-[0_15px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)] hover:border-slate-300 transition-all duration-500"
            >
              {/* Out-of-Bounds Overlapping Aircraft Image */}
              <div className="relative -mt-10 mb-6 rounded-2xl overflow-hidden shadow-lg bg-slate-900 group-hover:-translate-y-2 transition-transform duration-500">
                <img
                  src={aircraft.imageUrl}
                  alt={aircraft.name}
                  className="w-full h-56 object-cover opacity-95 group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-[#FFB817] text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border border-white/10">
                  {aircraft.tag}
                </span>
              </div>

              {/* Specs & Info */}
              <div>
                <h3 className="text-xl font-bold text-[#002F5C] mb-4 group-hover:text-[#FFB817] transition-colors">
                  {aircraft.name}
                </h3>

                <div className="grid grid-cols-2 gap-3 mb-6 bg-white p-4 rounded-2xl border border-slate-200/60 text-xs">
                  {aircraft.specs.map((spec, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-slate-400 font-medium text-[10px] uppercase tracking-wider">
                        {spec.label}
                      </span>
                      <span className="text-[#002F5C] font-bold mt-0.5">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button Pill */}
              <div className="flex items-center justify-between pt-2">
                <a
                  href="#"
                  className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-[#002F5C] flex items-center space-x-1"
                >
                  <span>Inspect Spec</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <button className="bg-[#FFB817] hover:bg-[#e5a510] text-[#002F5C] text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all shadow-sm cursor-pointer">
                  Book Now
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
