import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  HeartPulse,
  Phone,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Building2,
} from "lucide-react";
import { API_BASE_URL } from "../api/axiosInstance";
import { airAmbulanceConfig, hasValidPhone } from "../config/airAmbulanceConfig";
import { formatDateTimeIST, formatDateOnlyIST } from "../utils/dateFormatter";

interface StatusData {
  request_id: string;
  stage: "received" | "in_review" | "quote_sent" | "confirmed" | "declined" | "closed";
  route: {
    from: string;
    to: string;
    pickup_hospital?: string | null;
    drop_hospital?: string | null;
  };
  flight_date: string;
  urgency: string;
  coordinator_message?: string | null;
  updated_at: string;
}

const STAGES = [
  { key: "received", label: "Received", desc: "We have your request." },
  { key: "in_review", label: "In review", desc: "A coordinator is checking aircraft for your route." },
  { key: "quote_sent", label: "Quote ready", desc: "Your quote has been sent. Please check your phone or email." },
  { key: "confirmed", label: "Confirmed", desc: "Your flight is confirmed. Details are below." },
];

export default function AirAmbulanceStatusPage() {
  const { token } = useParams<{ token: string }>();
  const [statusData, setStatusData] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Set noindex and no-referrer meta tags for private status pages
  useEffect(() => {
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute("content", "noindex, nofollow");

    let referrerMeta = document.querySelector('meta[name="referrer"]');
    if (!referrerMeta) {
      referrerMeta = document.createElement("meta");
      referrerMeta.setAttribute("name", "referrer");
      document.head.appendChild(referrerMeta);
    }
    referrerMeta.setAttribute("content", "no-referrer");

    return () => {
      robotsMeta?.setAttribute("content", "index, follow");
      referrerMeta?.setAttribute("content", "strict-origin-when-cross-origin");
    };
  }, []);

  const fetchStatus = async (silent = false) => {
    if (!token) {
      setError("Invalid or missing status link.");
      setLoading(false);
      return;
    }

    if (!silent) setLoading(true);
    else setIsRefreshing(true);

    try {
      const res = await fetch(`${API_BASE_URL}/public/air-ambulance/status/${encodeURIComponent(token)}`);
      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message || "Request not found. Please check your link.");
      }

      setStatusData(resData.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Unable to retrieve status. Please try again.");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Initial fetch + Auto-refresh every 60s while tab is visible
  useEffect(() => {
    fetchStatus();
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchStatus(true);
      }
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, [token]);

  const getStageIndex = (stage: string) => {
    if (stage === "received") return 0;
    if (stage === "in_review") return 1;
    if (stage === "quote_sent") return 2;
    if (stage === "confirmed" || stage === "closed") return 3;
    return 0;
  };

  const isDeclined = statusData?.stage === "declined";
  const currentStageIndex = statusData ? getStageIndex(statusData.stage) : 0;

  return (
    <div className="min-h-screen bg-stone-50/60 text-[#002F5C] font-sans pt-24 sm:pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-stone-500 mb-6">
          <Link to="/" className="hover:text-[#002F5C] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/air-ambulance" className="hover:text-[#002F5C] transition-colors">Air ambulance</Link>
          <span>/</span>
          <span className="font-medium text-[#002F5C]">Transfer status</span>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-12 text-center">
            <div className="w-9 h-9 border-2 border-stone-200 border-t-[#002F5C] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-medium text-stone-600">Retrieving transfer status...</p>
          </div>
        )}

        {/* Error / Not Found State */}
        {error && !loading && (
          <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-8 sm:p-10 text-center">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-100">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl text-[#002F5C] mb-2 font-normal">Request not found</h2>
            <p className="text-sm text-stone-600 max-w-md mx-auto mb-6 leading-relaxed">
              {error} Please make sure you used the complete private link sent to you upon submission.
            </p>
            <Link
              to="/air-ambulance/request"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#002F5C] text-white text-xs font-semibold hover:bg-[#002244] transition-colors"
            >
              Submit a new request
            </Link>
          </div>
        )}

        {/* Status Content */}
        {statusData && !loading && (
          <div className="space-y-4">
            
            {/* Main Status Header Card */}
            <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-medium text-stone-500">Transfer request</span>
                    <span className="text-xs font-mono font-bold text-[#002F5C] bg-stone-100 px-2 py-0.5 rounded-md whitespace-nowrap">
                      {statusData.request_id}
                    </span>
                    {statusData.urgency === "emergency" && (
                      <span className="text-[11px] font-medium text-rose-700 bg-rose-50 border border-rose-200/80 px-2 py-0.5 rounded-md whitespace-nowrap">
                        Emergency
                      </span>
                    )}
                  </div>
                  <h1 className="font-serif text-2xl sm:text-3xl text-[#002F5C] font-normal tracking-tight">
                    {statusData.route.from} → {statusData.route.to}
                  </h1>
                </div>

                {/* Auto-refresh indicator & button */}
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <button
                    type="button"
                    onClick={() => fetchStatus(true)}
                    disabled={isRefreshing}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-600 text-xs font-medium transition-colors cursor-pointer"
                    title="Refresh status"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[#002F5C]" : ""}`} />
                    <span>{isRefreshing ? "Updating..." : "Refresh"}</span>
                  </button>
                </div>
              </div>

              {/* Transfer Key Facts */}
              <div className="grid grid-cols-2 gap-4 py-5 border-b border-stone-100 text-xs">
                <div>
                  <span className="text-stone-500 font-medium block mb-1 text-xs">
                    Transfer date
                  </span>
                  <span className="font-medium text-stone-800 text-sm">
                    {formatDateOnlyIST(statusData.flight_date)}
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 font-medium block mb-1 text-xs">
                    Last updated
                  </span>
                  <span className="font-medium text-stone-800 text-sm">
                    {formatDateTimeIST(statusData.updated_at)}
                  </span>
                </div>

                {statusData.route.pickup_hospital && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-stone-500 font-medium block mb-1 text-xs">
                      Pickup facility
                    </span>
                    <span className="text-stone-700 flex items-center gap-1.5 text-xs">
                      <Building2 className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                      {statusData.route.pickup_hospital}
                    </span>
                  </div>
                )}

                {statusData.route.drop_hospital && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-stone-500 font-medium block mb-1 text-xs">
                      Receiving facility
                    </span>
                    <span className="text-stone-700 flex items-center gap-1.5 text-xs">
                      <Building2 className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                      {statusData.route.drop_hospital}
                    </span>
                  </div>
                )}
              </div>

              {/* Coordination Stages */}
              <div className="pt-6">
                <span className="text-sm font-medium text-stone-700 block mb-4">
                  Current coordination stage
                </span>

                {isDeclined ? (
                  /* Declined State */
                  <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 text-stone-700">
                    <div className="flex items-center gap-2 mb-2 text-stone-900 font-serif font-medium text-base">
                      <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                      We could not arrange this flight
                    </div>
                    {statusData.coordinator_message && (
                      <p className="text-xs text-stone-600 leading-relaxed break-words">
                        {String(statusData.coordinator_message).slice(0, 500)}
                      </p>
                    )}
                  </div>
                ) : (
                  /* 4-Stage Stepper: Received / In review / Quote ready / Confirmed */
                  <div className="space-y-4">
                    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                      {STAGES.map((st, idx) => {
                        const isDone = idx < currentStageIndex;
                        const isCurrent = idx === currentStageIndex;
                        return (
                          <div key={st.key} className="relative flex items-start gap-3">
                            <span
                              className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all ${
                                isDone
                                  ? "bg-emerald-600 text-white border-emerald-600"
                                  : isCurrent
                                  ? "bg-[#002F5C] text-white border-[#002F5C] ring-4 ring-blue-100"
                                  : "bg-white text-stone-400 border-stone-300"
                              }`}
                            >
                              {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                {isCurrent && (
                                  <span className="w-2 h-2 rounded-full bg-[#002F5C] flex-shrink-0" />
                                )}
                                <span
                                  className={`text-sm ${
                                    isCurrent
                                      ? "font-bold text-[#002F5C]"
                                      : isDone
                                      ? "font-semibold text-stone-900"
                                      : "font-normal text-stone-400"
                                  }`}
                                >
                                  {st.label}
                                </span>
                              </div>
                              <span className="text-xs text-stone-500 block leading-snug mt-0.5">
                                {st.desc}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Coordinator Message (shown only if admin wrote one, escaped text only, max 500 chars) */}
              {statusData.coordinator_message && !isDeclined && (
                <div className="mt-6 p-4 rounded-xl bg-blue-50/60 border border-blue-100">
                  <span className="text-xs font-semibold text-[#002F5C] block mb-1">
                    Coordinator message
                  </span>
                  <p className="text-xs text-stone-700 leading-relaxed break-words">
                    {String(statusData.coordinator_message).slice(0, 500)}
                  </p>
                </div>
              )}

              {/* Call Coordinator action if configured */}
              {hasValidPhone && (
                <div className="mt-6 pt-5 border-t border-stone-100 flex items-center justify-between gap-4">
                  <span className="text-xs text-stone-500">Need immediate assistance?</span>
                  <a
                    href={`tel:${airAmbulanceConfig.phone}`}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-[#002F5C] text-xs font-semibold transition-colors whitespace-nowrap"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#FFD200]" /> Call coordinator
                  </a>
                </div>
              )}
            </div>

            {/* Exactly one line under the card */}
            <p className="text-xs text-stone-500 text-center">
              Patient details are never shown on this page.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
