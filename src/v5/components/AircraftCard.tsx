import React, { useState } from "react";
import { ArrowUpRight, Plane, Users, MapPin } from "lucide-react";
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
  hourlyRate?: number;
  capacity?: number | null;
  base_city?: string;
  year?: number | string;
  registration?: string;
}

interface AircraftCardProps {
  aircraft: Aircraft;
}

export default function AircraftCard({ aircraft }: AircraftCardProps) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const validSpecs: SpecItem[] = getValidSpecs(aircraft.specs);

  const formattedPrice =
    aircraft.hourlyRate && aircraft.hourlyRate > 0
      ? `From ₹${Number(aircraft.hourlyRate).toLocaleString("en-IN")}/hr`
      : "Price on request";

  return (
    <div
      tabIndex={0}
      role="region"
      aria-label={`Aircraft details for ${aircraft.name}`}
      className="bg-white border border-stone-200/70 rounded-2xl p-6 relative flex flex-col justify-between group shadow-sm hover:shadow-md transition-all duration-300 h-full focus:outline-none focus:ring-2 focus:ring-[#002F5C] focus:ring-offset-2"
    >
      {/* Large Beautifully Cropped Image Container with Fixed Aspect Ratio & Light Fallback */}
      <div className="relative mb-6 rounded-xl overflow-hidden bg-stone-100 border border-stone-200/70 aspect-[16/10] w-full flex items-center justify-center flex-shrink-0">
        {!imageError && aircraft.imageUrl ? (
          <img
            src={aircraft.imageUrl}
            alt={aircraft.name}
            onError={() => setImageError(true)}
            loading="lazy"
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

      {/* Title & Metadata */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="mb-4">
          {/* Base location line if returned by API */}
          {aircraft.base_city && (
            <div className="flex items-center space-x-1 text-xs text-stone-500 mb-1">
              <MapPin className="w-3 h-3 text-[#FFD200] flex-shrink-0" />
              <span>Based in {aircraft.base_city}</span>
            </div>
          )}

          <div className="min-h-[3rem] flex items-start">
            <h3
              title={aircraft.name}
              className="text-xl sm:text-2xl font-serif font-normal text-[#002F5C] group-hover:text-[#FFD200] transition-colors leading-snug line-clamp-2"
            >
              {aircraft.name}
            </h3>
          </div>

          {/* Customer Price Hint */}
          <div className="mt-1 flex items-baseline justify-between text-xs sm:text-sm">
            <span
              className={
                aircraft.hourlyRate && aircraft.hourlyRate > 0
                  ? "font-semibold text-[#002F5C]"
                  : "text-stone-500 italic font-medium"
              }
            >
              {formattedPrice}
            </span>
          </div>
        </div>

        {/* Specs Box */}
        {validSpecs.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-6 bg-stone-50 p-4 rounded-xl border border-stone-200/60 text-xs">
            {validSpecs.map((spec, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-stone-500 font-medium text-[10px] uppercase tracking-wider flex items-center space-x-1">
                  {spec.label.toLowerCase().includes("passenger") && (
                    <Users className="w-3 h-3 text-[#002F5C] mr-0.5 inline flex-shrink-0" />
                  )}
                  <span>{spec.label}</span>
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
          onClick={() => navigate(`/request-quote?aircraftId=${aircraft.id}`)}
          className="bg-stone-900 hover:bg-[#FFD200] hover:text-[#002F5C] text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all cursor-pointer"
        >
          Request Quote
        </button>
      </div>
    </div>
  );
}


