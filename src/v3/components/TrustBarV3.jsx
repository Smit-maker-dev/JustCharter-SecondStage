import React from "react";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

const certifications = [
  { name: "ARGUS Platinum", detail: "Highest Operational Safety Standard" },
  { name: "Wyvern Wingman", detail: "Certified Pilot & Fleet Audit" },
  { name: "IS-BAO Stage 3", detail: "Global Safety Management Standard" },
  { name: "IBAC Accredited", detail: "International Business Aviation Code" },
];

export default function TrustBarV3() {
  return (
    <section className="bg-stone-50 border-y border-slate-200/80 py-8 font-sans text-[#002F5C]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#FFD200]/15 text-[#FFD200] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#002F5C]">
                Certified Safety Standards
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                Audited & accredited by global aviation authorities
              </p>
            </div>
          </div>

          {/* Clean Row of Stadium Pill Badges (rounded-full) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200/80 rounded-full px-5 py-2.5 flex items-center space-x-2.5 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-[#FFD200] flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-[#002F5C] leading-none">
                    {cert.name}
                  </p>
                  <p className="text-[9px] text-slate-500 font-medium leading-tight mt-0.5 hidden sm:block">
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
