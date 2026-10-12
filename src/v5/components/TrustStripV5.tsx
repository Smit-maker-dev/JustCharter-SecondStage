import React from "react";
import { Plane, ShieldCheck, FileText, Headphones } from "lucide-react";

export default function TrustStripV5() {
  const trustItems = [
    {
      icon: <Plane className="w-[19px] h-[19px] text-[#002F5C]" />,
      label: "Verified aircraft",
    },
    {
      icon: <ShieldCheck className="w-[19px] h-[19px] text-[#002F5C]" />,
      label: "Vetted operators",
    },
    {
      icon: <FileText className="w-[19px] h-[19px] text-[#002F5C]" />,
      label: "Transparent quotes",
    },
    {
      icon: <Headphones className="w-[19px] h-[19px] text-[#002F5C]" />,
      label: "24/7 charter support",
    },
  ];

  return (
    <div className="bg-stone-50/90 border-b border-stone-200/70 py-4.5 sm:py-5 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6 md:gap-8 items-center">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center space-x-2.5 sm:space-x-3 py-1 px-1.5 text-center"
            >
              <div className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-xl bg-white border border-stone-200/90 shadow-xs flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <span className="text-sm font-medium text-[#002F5C] tracking-tight whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
