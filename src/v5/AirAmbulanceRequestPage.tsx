import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import {
  HeartPulse,
  MapPin,
  Clock,
  User,
  Phone,
  Mail,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Copy,
  Check,
  X,
  Plane,
  Activity,
  Plus,
} from "lucide-react";
import { API_BASE_URL } from "../api/axiosInstance";
import { airAmbulanceConfig, hasValidPhone } from "../config/airAmbulanceConfig";
import CustomDatePicker, { getLocalTodayStr } from "./components/CustomDatePicker";

// Condition categories (Step 2)
const CONDITION_CATEGORIES = [
  {
    id: "Critical/ICU",
    title: "Critical / ICU",
    desc: "Requires continuous intensive care, ventilator, or continuous monitoring.",
  },
  {
    id: "Stable but needs a stretcher",
    title: "Stable (stretcher)",
    desc: "Patient cannot sit upright on a commercial flight but is medically stable.",
  },
  {
    id: "Newborn or child",
    title: "Newborn or child",
    desc: "Neonatal or pediatric transfer requiring specialized infant care or incubator.",
  },
  {
    id: "Other",
    title: "Other medical need",
    desc: "Organ transfer, scheduled medical escort, or non-critical repatriation.",
  },
];

// Equipment chips (Step 2)
const EQUIPMENT_OPTIONS = [
  "Ventilator",
  "Oxygen",
  "Incubator",
  "Cardiac monitor",
  "Infusion pump",
  "Isolation",
  "Not sure",
];

// Relationships (Step 3)
const RELATION_OPTIONS = ["Family", "Patient", "Hospital", "Agent", "Other"];

interface AirportItem {
  id: number;
  basic_info: {
    name: string;
    city: string;
    country: string;
    iata_code?: string;
    icao_code?: string;
  };
}

export default function AirAmbulanceRequestPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Progress Step: 1, 2, 3
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    requestId: string;
    statusToken: string;
  } | null>(null);

  // Preferred aircraft from URL query ?aircraft={id} or ?aircraftId={id}
  const [preferredAircraft, setPreferredAircraft] = useState<{
    id: number;
    model: string;
  } | null>(null);

  // Form State (In-memory ONLY - never saved to storage or analytics)
  const [formData, setFormData] = useState({
    // Step 1: The transfer - NO DEFAULT FOR URGENCY
    urgency: "" as "" | "emergency" | "within_24_hours" | "planned_date",
    fromLocation: searchParams.get("from") || "",
    fromAirportId: null as number | null,
    pickupHospital: "",
    toLocation: searchParams.get("to") || "",
    toAirportId: null as number | null,
    dropHospital: "",
    flightDate: searchParams.get("date") || "",
    departureTime: "Earliest / ASAP",

    // Step 2: The patient
    patientAge: "",
    patientWeight: "",
    conditionCategory: "",
    equipmentNeeded: [] as string[],
    companions: 1,
    notes: "",

    // Step 3: Contact & consent
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    relationship: "Family",
    preferredContact: "Call" as "Call" | "WhatsApp",
    consent: false,

    // Honeypot (bot trap)
    websiteUrlHp: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  // Airport dropdown search states
  const [fromQuery, setFromQuery] = useState(formData.fromLocation);
  const [toQuery, setToQuery] = useState(formData.toLocation);
  const [fromAirports, setFromAirports] = useState<AirportItem[]>([]);
  const [toAirports, setToAirports] = useState<AirportItem[]>([]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [loadingFromAirports, setLoadingFromAirports] = useState(false);
  const [loadingToAirports, setLoadingToAirports] = useState(false);

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  // Warn before leaving with unsaved data
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges && !isSubmitted) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges, isSubmitted]);

  // Load preferred aircraft if ?aircraft={id} or ?aircraftId={id} provided
  useEffect(() => {
    const aircraftId = searchParams.get("aircraft") || searchParams.get("aircraftId");
    if (aircraftId) {
      fetch(`${API_BASE_URL}/public/air-ambulance/aircraft`)
        .then((res) => res.json())
        .then((resData) => {
          if (resData.data && Array.isArray(resData.data)) {
            const found = resData.data.find(
              (item: any) => String(item.id) === String(aircraftId)
            );
            if (found) {
              setPreferredAircraft({
                id: found.id,
                model: found.display_model || found.aircraft_model || `Aircraft #${found.id}`,
              });
            }
          }
        })
        .catch(() => {});
    }
  }, [searchParams]);

  // Click outside to close airport dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(e.target as Node)) {
        setShowFromDropdown(false);
      }
      if (toRef.current && !toRef.current.contains(e.target as Node)) {
        setShowToDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch airports dynamically using shared resolver
  const searchAirports = async (query: string, setter: (items: AirportItem[]) => void, loader: (l: boolean) => void) => {
    if (!query || query.trim().length < 2) {
      setter([]);
      loader(false);
      return;
    }
    loader(true);
    try {
      const res = await fetch(`${API_BASE_URL}/settings/airport?search=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      setter(Array.isArray(data.data) ? data.data.slice(0, 8) : []);
    } catch {
      setter([]);
    } finally {
      loader(false);
    }
  };

  // Field change handler
  const updateField = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.urgency) {
      errs.urgency = "Please select an urgency level.";
    }
    if (!formData.fromLocation.trim()) {
      errs.fromLocation = "Please enter or select a pickup airport or city.";
    }
    if (!formData.toLocation.trim()) {
      errs.toLocation = "Please enter or select a destination airport or city.";
    }
    if (formData.urgency === "planned_date" && !formData.flightDate) {
      errs.flightDate = "Please choose a departure date.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    const ageNum = parseInt(formData.patientAge, 10);
    const weightNum = parseFloat(formData.patientWeight);

    if (!formData.patientAge.trim() || isNaN(ageNum) || ageNum < 0 || ageNum > 125) {
      errs.patientAge = "Please enter a valid age (0–125).";
    }
    if (!formData.patientWeight.trim() || isNaN(weightNum) || weightNum < 1 || weightNum > 400) {
      errs.patientWeight = "Please enter an approximate weight in kg (1–400).";
    }
    if (!formData.conditionCategory) {
      errs.conditionCategory = "Please select the patient's condition category.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 3 Validation
  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!formData.contactName.trim() || formData.contactName.trim().length < 2) {
      errs.contactName = "Please enter your full name.";
    }
    const cleanPhone = formData.contactPhone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.contactPhone = "Please enter a valid 10-digit Indian phone number.";
    }
    if (formData.contactEmail.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.contactEmail.trim())) {
        errs.contactEmail = "Please enter a valid email address.";
      }
    }
    if (!formData.consent) {
      errs.consent = "Please agree to the coordination terms and Privacy Policy to proceed.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 120, behavior: "smooth" });
    } else if (step === 2 && validateStep2()) {
      setStep(3);
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const payload = {
        website_url_hp: formData.websiteUrlHp, // honeypot
        urgency: formData.urgency,
        source_location_text: formData.fromLocation,
        source_airport_id: formData.fromAirportId,
        pickup_hospital: formData.pickupHospital,
        destination_location_text: formData.toLocation,
        destination_airport_id: formData.toAirportId,
        drop_hospital: formData.dropHospital,
        flight_date: formData.flightDate || getLocalTodayStr(),
        departure_time: formData.departureTime,
        preferred_aircraft_id: preferredAircraft?.id || null,
        patient_age: Number(formData.patientAge),
        patient_weight: Number(formData.patientWeight),
        condition_category: formData.conditionCategory,
        equipment_needed: formData.equipmentNeeded,
        companions: Number(formData.companions),
        notes: formData.notes,
        contact_name: formData.contactName.trim(),
        contact_phone: formData.contactPhone.replace(/\s+/g, ""),
        contact_email: formData.contactEmail?.trim() || null,
        relationship: formData.relationship,
        preferred_contact: formData.preferredContact,
        consent: formData.consent,
      };

      const res = await fetch(`${API_BASE_URL}/public/air-ambulance/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message || resData.error || "Submission failed. Please check your details.");
      }

      setHasUnsavedChanges(false);
      setSubmissionResult({
        requestId: resData.data.request_id,
        statusToken: resData.data.status_token,
      });
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setErrors({ form: err.message || "An unexpected error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyPrivateLink = () => {
    if (!submissionResult) return;
    const url = `${window.location.origin}/air-ambulance/status/${submissionResult.statusToken}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const copyRequestId = () => {
    if (!submissionResult) return;
    navigator.clipboard.writeText(submissionResult.requestId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 3000);
  };

  // -------------------------------------------------------------
  // Confirmation Page Render
  // -------------------------------------------------------------
  if (isSubmitted && submissionResult) {
    const statusUrl = `/air-ambulance/status/${submissionResult.statusToken}`;
    return (
      <div className="min-h-screen bg-stone-50/60 pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Success Card */}
          <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 sm:p-10 text-center">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 border border-emerald-100">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 inline-block mb-3">
              Request received
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#002F5C] mb-2 tracking-tight">
              Transfer request received
            </h1>
            <p className="text-sm text-stone-600 max-w-lg mx-auto leading-relaxed mb-6">
              Our medical flight coordinator will review the requirements and contact you with a quote.
            </p>

            {/* Request ID Display */}
            <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-4 mb-6 max-w-md mx-auto">
              <span className="text-xs font-medium text-stone-500 block mb-1">
                Request reference number
              </span>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-[#002F5C] tracking-wide font-mono whitespace-nowrap">
                  {submissionResult.requestId}
                </span>
                <button
                  type="button"
                  onClick={copyRequestId}
                  className="p-2 text-stone-500 hover:text-[#002F5C] hover:bg-stone-200/60 rounded-lg transition-colors cursor-pointer"
                  title="Copy request ID"
                >
                  {copiedId ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* What Happens Next */}
            <div className="text-left bg-blue-50/40 border border-blue-100 rounded-xl p-5 mb-6">
              <h3 className="text-xs font-semibold text-[#002F5C] mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#002F5C]" /> What happens next
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#002F5C] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <span>A coordinator reviews the patient requirements and checks matching aircraft.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#002F5C] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <span>We contact you via {formData.preferredContact} with aircraft options and transparent pricing.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#002F5C] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <span>You can track progress at any time using your private status link.</span>
                </li>
              </ul>
            </div>

            {/* Private Tracking Link Actions */}
            <div className="space-y-2.5 mb-6">
              <Link
                to={statusUrl}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#002F5C] text-white font-medium text-sm hover:bg-[#002244] shadow-xs transition-colors"
              >
                Track live status <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={copyPrivateLink}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl border border-stone-200 bg-white text-stone-700 font-medium text-sm hover:bg-stone-50 transition-colors cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" /> Private link copied to clipboard
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-stone-500" /> Copy private status link
                  </>
                )}
              </button>
            </div>

            {/* Helpline if phone is configured */}
            {hasValidPhone && (
              <div className="pt-5 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
                <span>Need urgent assistance? Speak with a coordinator:</span>
                <a
                  href={`tel:${airAmbulanceConfig.phone}`}
                  className="inline-flex items-center gap-2 font-bold text-[#002F5C] hover:text-[#001D3A] bg-stone-100/80 px-3.5 py-1.5 rounded-lg"
                >
                  <Phone className="w-3.5 h-3.5 text-[#FFD200]" /> {airAmbulanceConfig.phone}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Form Steps Render
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-stone-50/60 text-[#002F5C] font-sans pt-24 sm:pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Context */}
        <div className="flex items-center space-x-2 text-xs text-stone-500 mb-6">
          <Link to="/" className="hover:text-[#002F5C] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/air-ambulance" className="hover:text-[#002F5C] transition-colors">Air ambulance</Link>
          <span>/</span>
          <span className="font-medium text-[#002F5C]">Request transfer</span>
        </div>

        {/* Top Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 px-3 py-0.5 rounded-full text-xs font-medium border border-red-200/70">
              <HeartPulse className="w-3.5 h-3.5 text-red-600" /> Air ambulance request
            </span>
            {preferredAircraft && (
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded-full text-xs font-medium border border-amber-200">
                <Plane className="w-3 h-3 text-amber-600" /> Preferred: {preferredAircraft.model}
                <button
                  type="button"
                  onClick={() => setPreferredAircraft(null)}
                  className="hover:text-amber-950 ml-1 cursor-pointer"
                  title="Remove preferred aircraft"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#002F5C] font-normal tracking-tight">
            Request an air ambulance
          </h1>
          <p className="text-stone-600 text-sm mt-1">
            Tell us about the transfer. A coordinator will review it and come back with a quote.
          </p>
        </div>

        {/* Thin 3-Segment Progress Indicator */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-4 mb-6 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-stone-700">
              Step {step} of 3
            </span>
            <span className="text-xs text-stone-500">
              {step === 1 ? "The transfer" : step === 2 ? "The patient" : "How to reach you"}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className={`h-1 rounded-full transition-colors ${step >= 1 ? "bg-[#002F5C]" : "bg-stone-200"}`} />
            <div className={`h-1 rounded-full transition-colors ${step >= 2 ? "bg-[#002F5C]" : "bg-stone-200"}`} />
            <div className={`h-1 rounded-full transition-colors ${step >= 3 ? "bg-[#002F5C]" : "bg-stone-200"}`} />
          </div>
        </div>

        {/* Note with 3px Accent Left Border (Matching Info Page) */}
        <div className="border-l-[3px] border-[#FFD200] bg-white rounded-r-xl border-y border-r border-stone-200/80 p-4 mb-6 shadow-xs">
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            If the patient is in immediate danger, call 112 or go to the nearest hospital first. An air ambulance moves a patient between hospitals. It is not a first-response service.
          </p>
        </div>

        {/* Main Step Form Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 sm:p-8">
          
          {/* Honeypot field (hidden from genuine users, bots will fill it) */}
          <input
            type="text"
            name="website_url_hp"
            value={formData.websiteUrlHp}
            onChange={(e) => updateField("websiteUrlHp", e.target.value)}
            style={{ display: "none", opacity: 0, position: "absolute", left: "-9999px" }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* Form Error Banner */}
          {errors.form && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {errors.form}
            </div>
          )}

          {/* ===================================================== */}
          {/* STEP 1: The transfer */}
          {/* ===================================================== */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-xl text-[#002F5C] font-normal">Transfer urgency and route</h2>
                <p className="text-xs text-stone-500 mt-0.5">Specify when and where the patient needs to travel.</p>
              </div>

              {/* Urgency Selector - NO DEFAULT, REQUIRED */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Urgency level <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "emergency", label: "Emergency / As soon as possible", sub: "Earliest dispatch clearance" },
                    { id: "within_24_hours", label: "Within 24 hours", sub: "Priority scheduled transfer" },
                    { id: "planned_date", label: "Planned / A date you choose", sub: "Scheduled transfer date" },
                  ].map((u) => {
                    const isSelected = formData.urgency === u.id;
                    return (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => {
                          updateField("urgency", u.id);
                          if (u.id !== "planned_date" && !formData.flightDate) {
                            updateField("flightDate", getLocalTodayStr());
                          }
                        }}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-blue-50/70 border-[#002F5C] ring-2 ring-[#002F5C]/15 text-[#002F5C]"
                            : "bg-white border-stone-200 hover:border-stone-300 text-stone-700"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold">
                            {u.label}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-[#002F5C] flex-shrink-0" />}
                        </div>
                        <span className="text-xs text-stone-500 block leading-tight">{u.sub}</span>
                      </button>
                    );
                  })}
                </div>
                {errors.urgency && <p className="text-red-500 text-xs mt-1.5">{errors.urgency}</p>}
              </div>

              {/* Route: Origin & Destination */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                {/* Pickup Location */}
                <div className="relative" ref={fromRef}>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Pickup airport or city <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={fromQuery}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFromQuery(val);
                        updateField("fromLocation", val);
                        searchAirports(val, setFromAirports, setLoadingFromAirports);
                        setShowFromDropdown(true);
                      }}
                      onFocus={() => {
                        setShowFromDropdown(true);
                        if (fromQuery.length >= 2) searchAirports(fromQuery, setFromAirports, setLoadingFromAirports);
                      }}
                      placeholder="e.g. Mumbai or BOM"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-[#002F5C] placeholder:text-stone-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.fromLocation ? "border-red-400 focus:ring-red-200" : "border-stone-200 focus:ring-[#002F5C]/20"
                      }`}
                    />
                  </div>
                  {errors.fromLocation && <p className="text-red-500 text-xs mt-1">{errors.fromLocation}</p>}

                  {/* Dropdown Options */}
                  {showFromDropdown && (fromAirports.length > 0 || loadingFromAirports) && (
                    <div className="absolute z-30 left-0 right-0 mt-1 bg-white rounded-xl border border-stone-200 shadow-lg max-h-56 overflow-y-auto">
                      {loadingFromAirports && <div className="p-3 text-xs text-stone-400 italic">Searching airports...</div>}
                      {fromAirports.map((ap) => {
                        const code = ap.basic_info.iata_code || ap.basic_info.icao_code || "";
                        const fullStr = `${ap.basic_info.name} (${code}) - ${ap.basic_info.city}`;
                        return (
                          <div
                            key={ap.id}
                            onClick={() => {
                              updateField("fromLocation", fullStr);
                              updateField("fromAirportId", ap.id);
                              setFromQuery(fullStr);
                              setShowFromDropdown(false);
                            }}
                            className="px-4 py-2.5 hover:bg-stone-50 cursor-pointer text-xs border-b border-stone-100 last:border-0"
                          >
                            <span className="font-semibold text-[#002F5C]">{ap.basic_info.name}</span>{" "}
                            {code && <span className="font-mono text-stone-500 font-bold">({code})</span>}
                            <div className="text-[11px] text-stone-400">{ap.basic_info.city}, {ap.basic_info.country}</div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Optional Hospital Name */}
                  <div className="mt-2">
                    <input
                      type="text"
                      value={formData.pickupHospital}
                      onChange={(e) => updateField("pickupHospital", e.target.value)}
                      placeholder="Optional: Current hospital or facility name"
                      className="w-full px-3.5 py-2 rounded-lg border border-stone-200 text-xs text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-stone-400"
                    />
                  </div>
                </div>

                {/* Drop Location */}
                <div className="relative" ref={toRef}>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Destination airport or city <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={toQuery}
                      onChange={(e) => {
                        const val = e.target.value;
                        setToQuery(val);
                        updateField("toLocation", val);
                        searchAirports(val, setToAirports, setLoadingToAirports);
                        setShowToDropdown(true);
                      }}
                      onFocus={() => {
                        setShowToDropdown(true);
                        if (toQuery.length >= 2) searchAirports(toQuery, setToAirports, setLoadingToAirports);
                      }}
                      placeholder="e.g. Delhi or DEL"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-[#002F5C] placeholder:text-stone-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.toLocation ? "border-red-400 focus:ring-red-200" : "border-stone-200 focus:ring-[#002F5C]/20"
                      }`}
                    />
                  </div>
                  {errors.toLocation && <p className="text-red-500 text-xs mt-1">{errors.toLocation}</p>}

                  {/* Dropdown Options */}
                  {showToDropdown && (toAirports.length > 0 || loadingToAirports) && (
                    <div className="absolute z-30 left-0 right-0 mt-1 bg-white rounded-xl border border-stone-200 shadow-lg max-h-56 overflow-y-auto">
                      {loadingToAirports && <div className="p-3 text-xs text-stone-400 italic">Searching airports...</div>}
                      {toAirports.map((ap) => {
                        const code = ap.basic_info.iata_code || ap.basic_info.icao_code || "";
                        const fullStr = `${ap.basic_info.name} (${code}) - ${ap.basic_info.city}`;
                        return (
                          <div
                            key={ap.id}
                            onClick={() => {
                              updateField("toLocation", fullStr);
                              updateField("toAirportId", ap.id);
                              setToQuery(fullStr);
                              setShowToDropdown(false);
                            }}
                            className="px-4 py-2.5 hover:bg-stone-50 cursor-pointer text-xs border-b border-stone-100 last:border-0"
                          >
                            <span className="font-semibold text-[#002F5C]">{ap.basic_info.name}</span>{" "}
                            {code && <span className="font-mono text-stone-500 font-bold">({code})</span>}
                            <div className="text-[11px] text-stone-400">{ap.basic_info.city}, {ap.basic_info.country}</div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Optional Hospital Name */}
                  <div className="mt-2">
                    <input
                      type="text"
                      value={formData.dropHospital}
                      onChange={(e) => updateField("dropHospital", e.target.value)}
                      placeholder="Optional: Receiving hospital or clinic name"
                      className="w-full px-3.5 py-2 rounded-lg border border-stone-200 text-xs text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-stone-400"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Time Picker - Shown when Planned is selected */}
              {formData.urgency === "planned_date" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  <CustomDatePicker
                    label="Transfer date (IST)"
                    value={formData.flightDate}
                    onChange={(d) => updateField("flightDate", d)}
                    minDate={getLocalTodayStr()}
                    error={errors.flightDate}
                  />

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Preferred time window (IST)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Earliest / ASAP",
                        "Morning (06:00 - 12:00)",
                        "Afternoon (12:00 - 18:00)",
                        "Night (18:00 - 06:00)",
                      ].map((slot) => {
                        const isSelected = formData.departureTime === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => updateField("departureTime", slot)}
                            className={`px-3 py-2.5 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
                              isSelected
                                ? "bg-blue-50/70 border-[#002F5C] text-[#002F5C] font-semibold"
                                : "bg-white border-stone-200 text-stone-600 hover:border-stone-300"
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===================================================== */}
          {/* STEP 2: The patient */}
          {/* ===================================================== */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-xl text-[#002F5C] font-normal">Patient and medical requirements</h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Helps us ensure the selected aircraft and medical crew have the appropriate equipment on board.
                </p>
              </div>

              {/* Age & Weight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Patient age (years) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="125"
                    value={formData.patientAge}
                    onChange={(e) => updateField("patientAge", e.target.value)}
                    placeholder="e.g. 52 (use 0 for infant)"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#002F5C] focus:outline-none focus:ring-2 transition-all ${
                      errors.patientAge ? "border-red-400 focus:ring-red-200" : "border-stone-200 focus:ring-[#002F5C]/20"
                    }`}
                  />
                  {errors.patientAge && <p className="text-red-500 text-xs mt-1">{errors.patientAge}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Patient weight (kg) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="400"
                    value={formData.patientWeight}
                    onChange={(e) => updateField("patientWeight", e.target.value)}
                    placeholder="e.g. 68"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#002F5C] focus:outline-none focus:ring-2 transition-all ${
                      errors.patientWeight ? "border-red-400 focus:ring-red-200" : "border-stone-200 focus:ring-[#002F5C]/20"
                    }`}
                  />
                  {errors.patientWeight && <p className="text-red-500 text-xs mt-1">{errors.patientWeight}</p>}
                </div>
              </div>

              {/* Condition Category */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Condition category <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CONDITION_CATEGORIES.map((cat) => {
                    const isSelected = formData.conditionCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => updateField("conditionCategory", cat.id)}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-blue-50/70 border-[#002F5C] ring-2 ring-[#002F5C]/15"
                            : "bg-white border-stone-200 hover:border-stone-300 text-stone-700"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold text-[#002F5C]">{cat.title}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#002F5C]" />}
                        </div>
                        <p className="text-xs text-stone-500 leading-snug">{cat.desc}</p>
                      </button>
                    );
                  })}
                </div>
                {errors.conditionCategory && <p className="text-red-500 text-xs mt-1">{errors.conditionCategory}</p>}
              </div>

              {/* Equipment Needed (Chips, nothing preselected) */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Medical equipment needed on board (optional)
                </label>
                <p className="text-xs text-stone-400 mb-2.5">Select all that apply. Leave empty if unsure.</p>
                <div className="flex flex-wrap gap-2">
                  {EQUIPMENT_OPTIONS.map((item) => {
                    const isSelected = formData.equipmentNeeded.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          const current = [...formData.equipmentNeeded];
                          if (isSelected) {
                            updateField("equipmentNeeded", current.filter((x) => x !== item));
                          } else {
                            updateField("equipmentNeeded", [...current, item]);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#002F5C] text-white border-[#002F5C]"
                            : "bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-300"
                        }`}
                      >
                        {isSelected ? <Check className="w-3.5 h-3.5 inline mr-1" /> : <Plus className="w-3.5 h-3.5 inline mr-1 text-stone-400" />}
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Companions Count (0 to 3) */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Traveling companions (seats for family or escorts: 0 to 3)
                </label>
                <div className="flex items-center gap-2">
                  {[0, 1, 2, 3].map((num) => {
                    const isSelected = formData.companions === num;
                    return (
                      <button
                        key={num}
                        type="button"
                        onClick={() => updateField("companions", num)}
                        className={`w-16 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#002F5C] text-white border-[#002F5C]"
                            : "bg-white text-stone-700 border-stone-200 hover:border-stone-300"
                        }`}
                      >
                        {num} {num === 1 ? "seat" : "seats"}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Clinical Note (Max 500 chars) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-stone-700">
                    Additional patient notes (optional)
                  </label>
                  <span className="text-xs text-stone-400">{formData.notes.length}/500</span>
                </div>
                <textarea
                  rows={3}
                  maxLength={500}
                  value={formData.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                  placeholder="e.g. Patient is conscious, requires continuous low-flow oxygen. Treating doctor will accompany to the airport."
                  className="w-full p-3 rounded-xl border border-stone-200 text-xs text-stone-700 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#002F5C]/20"
                />
                <p className="text-xs text-stone-500 mt-1">
                  Please do not enter ID numbers or financial information.
                </p>
              </div>
            </div>
          )}

          {/* ===================================================== */}
          {/* STEP 3: How to reach you */}
          {/* ===================================================== */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-xl text-[#002F5C] font-normal">Contact and coordination</h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Who should our medical flight team contact with route options and quotes?
                </p>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Full name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => updateField("contactName", e.target.value)}
                    placeholder="e.g. Dr. Ramesh Gupta or Anita Sharma"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-[#002F5C] focus:outline-none focus:ring-2 transition-all ${
                      errors.contactName ? "border-red-400 focus:ring-red-200" : "border-stone-200 focus:ring-[#002F5C]/20"
                    }`}
                  />
                </div>
                {errors.contactName && <p className="text-red-500 text-xs mt-1">{errors.contactName}</p>}
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Mobile number (+91) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-xs font-semibold text-stone-500">+91</span>
                    <input
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => updateField("contactPhone", e.target.value)}
                      placeholder="98765 43210"
                      className={`w-full pl-12 pr-4 py-2.5 rounded-xl border text-sm text-[#002F5C] focus:outline-none focus:ring-2 transition-all ${
                        errors.contactPhone ? "border-red-400 focus:ring-red-200" : "border-stone-200 focus:ring-[#002F5C]/20"
                      }`}
                    />
                  </div>
                  {errors.contactPhone && <p className="text-red-500 text-xs mt-1">{errors.contactPhone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Email address (optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => updateField("contactEmail", e.target.value)}
                      placeholder="name@example.com"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-[#002F5C] focus:outline-none focus:ring-2 transition-all ${
                        errors.contactEmail ? "border-red-400 focus:ring-red-200" : "border-stone-200 focus:ring-[#002F5C]/20"
                      }`}
                    />
                  </div>
                  {errors.contactEmail && <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>}
                </div>
              </div>

              {/* Relationship & Preferred Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Relationship to patient <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {RELATION_OPTIONS.map((rel) => {
                      const isSelected = formData.relationship === rel;
                      return (
                        <button
                          key={rel}
                          type="button"
                          onClick={() => updateField("relationship", rel)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#002F5C] text-white border-[#002F5C]"
                              : "bg-white text-stone-700 border-stone-200 hover:border-stone-300"
                          }`}
                        >
                          {rel}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Preferred contact method <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "Call", label: "Phone call" },
                      { id: "WhatsApp", label: "WhatsApp" },
                    ].map((pm) => {
                      const isSelected = formData.preferredContact === pm.id;
                      return (
                        <button
                          key={pm.id}
                          type="button"
                          onClick={() => updateField("preferredContact", pm.id)}
                          className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all cursor-pointer ${
                            isSelected
                              ? "bg-blue-50/70 border-[#002F5C] text-[#002F5C] font-semibold"
                              : "bg-white text-stone-700 border-stone-200 hover:border-stone-300"
                          }`}
                        >
                          {pm.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* DPDP Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => updateField("consent", e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-stone-300 text-[#002F5C] focus:ring-[#002F5C] cursor-pointer"
                  />
                  <span className="text-xs text-stone-600 leading-relaxed group-hover:text-stone-800">
                    I agree that JustCharter and the operators who can fly this route may use these details only to arrange this transfer, in compliance with India's DPDP Act principles.{" "}
                    <Link to="/privacy-policy" target="_blank" className="text-[#002F5C] underline font-medium">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
                {errors.consent && <p className="text-red-500 text-xs mt-1.5">{errors.consent}</p>}
              </div>
            </div>
          )}

          {/* ===================================================== */}
          {/* Card Footer Actions (Back / Next / Submit) */}
          {/* ===================================================== */}
          <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between gap-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50 text-xs font-semibold transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#002F5C] hover:bg-[#002244] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
              >
                Continue <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#002F5C] hover:bg-[#002244] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting request...
                  </>
                ) : (
                  <>
                    Submit transfer request <Check className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
