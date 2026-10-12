import React from "react";
import { Plane, ShieldCheck, FileText, Headphones } from "lucide-react";

export default function TrustStripV5() {
  const trustItems = [
    {
      icon: <Plane className="w-4 h-4 text-[#002F5C]" />,
      label: "Verified aircraft",
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-[#002F5C]" />,
      label: "Vetted operators",
    },
    {
      icon: <FileText className="w-4 h-4 text-[#002F5C]" />,
      label: "Transparent quotes",
    },
    {
      icon: <Headphones className="w-4 h-4 text-[#002F5C]" />,
      label: "24/7 charter support",
    },
  ];

  return (
    <div className="bg-stone-50/90 border-b border-stone-200/70 py-4 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 items-center">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center space-x-2.5 py-1 px-2 text-center"
            >
              <div className="w-7 h-7 rounded-lg bg-white border border-stone-200/80 shadow-xs flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <span className="text-xs sm:text-sm font-medium text-[#002F5C] tracking-tight">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
