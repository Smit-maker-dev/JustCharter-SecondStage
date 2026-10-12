import React, { useState } from "react";
import { ArrowUpRight, Plane } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getValidSpecs, SpecItem } from "../../utils/specFormatter";

export interface Spec {
  label: string;
  value: string;
}

export interface Aircraft {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  specs: Spec[];
  tag: string;
}

interface AircraftCardProps {
  aircraft: Aircraft;
}

export default function AircraftCard({ aircraft }: AircraftCardProps) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const validSpecs: SpecItem[] = getValidSpecs(aircraft.specs);

  return (
    <div className="bg-white border border-stone-200/70 rounded-2xl p-6 relative flex flex-col justify-between group shadow-sm hover:shadow-md transition-all duration-500 h-full">
      {/* Large Beautifully Cropped Image Container with Light Neutral Fallback */}
      <div className="relative mb-6 rounded-xl overflow-hidden bg-stone-100 border border-stone-200/70 h-60 flex items-center justify-center">
        {!imageError && aircraft.imageUrl ? (
          <img
            src={aircraft.imageUrl}
            alt={aircraft.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-stone-50 to-stone-100/90 text-stone-400 p-6 text-center select-none">
            <div className="w-14 h-14 rounded-full bg-white border border-stone-200/80 flex items-center justify-center text-[#002F5C]/40 mb-2 shadow-xs group-hover:scale-105 transition-transform">
              <Plane className="w-7 h-7 stroke-[1.5]" />
            </div>
            <span className="text-xs font-serif italic text-stone-500">Photo coming soon</span>
          </div>
        )}
        <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-[#002F5C] text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full border border-stone-200/80 shadow-xs">
          {aircraft.tag}
        </span>
      </div>

      {/* Title & Specs */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Title container with fixed min-height for uniform row alignment */}
        <div className="min-h-[3.75rem] flex items-start mb-4">
          <h3
            title={aircraft.name}
            className="text-2xl font-serif font-normal text-[#002F5C] group-hover:text-[#FFD200] transition-colors leading-snug line-clamp-2"
          >
            {aircraft.name}
          </h3>
        </div>

        {validSpecs.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-6 bg-stone-50 p-4 rounded-xl border border-stone-200/60 text-xs">
            {validSpecs.map((spec, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-stone-400 font-medium text-[10px] uppercase tracking-wider">
                  {spec.label}
                </span>
                <span className="text-[#002F5C] font-bold mt-0.5">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Controls */}
      <div className="flex items-center justify-between pt-2">
        <Link
          to={`/aircraft/${aircraft.id}`}
          className="text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-[#002F5C] flex items-center space-x-1"
        >
          <span>Inspect Spec</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={() => navigate(`/aircraft/${aircraft.id}`)}
          className="bg-stone-900 hover:bg-[#FFD200] hover:text-[#002F5C] text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all cursor-pointer"
        >
          Request Quote
        </button>
      </div>
    </div>
  );
}

