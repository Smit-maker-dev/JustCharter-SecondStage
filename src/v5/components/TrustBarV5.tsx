import React from "react";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

const certifications = [
  { name: "DGCA NSOP Holders", detail: "Authorized Commercial Operators" },
  { name: "Type-Rated Pilots", detail: "Rigorous Regulatory Standards" },
  { name: "Full Fleet Insurance", detail: "Hull & Liability Coverage" },
  { name: "Vetted Partners", detail: "Stringent Compliance Checks" },
];

export default function TrustBarV5() {
  return (
    <section className="bg-white border-y border-stone-200/80 py-10 font-sans text-[#002F5C]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#FFD200]/15 text-[#FFD200] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-serif italic text-[#002F5C]">
                Verified Operator Network
              </p>
              <p className="text-[11px] text-stone-500 font-light">
                Flights operated by audited DGCA-certified NSOP holders
              </p>
            </div>
          </div>

          {/* Clean Row of Soft Rounded Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-stone-50/80 border border-stone-200/80 rounded-xl px-5 py-3 flex items-center space-x-3 shadow-sm hover:border-[#FFD200]/40 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-[#FFD200] flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-[#002F5C] leading-none">
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
