import React from "react";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

const certifications = [
  { name: "ARGUS Platinum", detail: "Highest Operational Safety Standard" },
  { name: "Wyvern Wingman", detail: "Certified Pilot & Fleet Audit" },
  { name: "IS-BAO Stage 3", detail: "Global Safety Management Standard" },
  { name: "IBAC Accredited", detail: "International Business Aviation Code" },
];

export default function TrustBarV5() {
  return (
    <section className="bg-white border-y border-stone-200/80 py-10 font-sans text-[#4A3B2A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#FF9C0A]/15 text-[#FF9C0A] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-serif italic text-[#4A3B2A]">
                Certified Safety Standards
              </p>
              <p className="text-[11px] text-stone-500 font-light">
                Audited & accredited by global aviation authorities
              </p>
            </div>
          </div>

          {/* Clean Row of Soft Rounded Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-stone-50/80 border border-stone-200/80 rounded-xl px-5 py-3 flex items-center space-x-3 shadow-sm hover:border-[#FF9C0A]/40 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-[#FF9C0A] flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-[#4A3B2A] leading-none">
                    {cert.name}
                  </p>
                  <p className="text-[9px] text-stone-500 font-light leading-tight mt-0.5 hidden sm:block">
                    {cert.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
