import React from "react";
import { Link } from "react-router-dom";
import { Building2, ArrowRight, ShieldCheck } from "lucide-react";

export default function OperatorStripV5() {
  return (
    <aside
      aria-label="Operator Partnership"
      className="bg-stone-50 border-t border-b border-stone-200/80 py-8 font-sans text-[#002F5C]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#FFD200]/50 transition-colors">
          
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-[#002F5C]/5 text-[#002F5C] flex items-center justify-center flex-shrink-0">
              <Building2 className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase tracking-[0.18em] font-serif italic text-stone-500">
                  Operator Network
                </span>
                <span className="inline-flex items-center text-[10px] bg-amber-50 text-amber-800 font-medium px-2 py-0.5 rounded-full border border-amber-200/60">
                  <ShieldCheck className="w-3 h-3 mr-1 text-[#FFD200]" />
                  DGCA Verified
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-normal text-[#002F5C] mt-0.5">
                Are you an aircraft operator?
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm font-light mt-0.5">
                Expand your charter bookings with zero listing fees. Connect your fleet with qualified charter clients across India.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto justify-end flex-shrink-0">
            <Link
              to="/for-operators"
              className="inline-flex items-center space-x-2 bg-[#002F5C] hover:bg-[#002447] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide shadow-sm hover:shadow-md transition-all group w-full md:w-auto justify-center"
            >
              <span>List Your Aircraft</span>
              <ArrowRight className="w-4 h-4 text-[#FFD200] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </aside>
  );
}
