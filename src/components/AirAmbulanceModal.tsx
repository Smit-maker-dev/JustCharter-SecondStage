import { useState, FormEvent, ChangeEvent } from "react";
import {
  X,
  User,
  Activity,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldAlert,
  HeartPulse,
} from "lucide-react";

interface AirAmbulanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AirAmbulanceModal({
  isOpen,
  onClose,
}: AirAmbulanceModalProps) {
  const [formData, setFormData] = useState({
    patientName: "",
    patientAge: "",
    medicalCondition: "",
    currentLocation: "",
    destinationLocation: "",
    urgency: "asap",
    requestorName: "",
    relation: "",
    phone: "",
    email: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Air Ambulance form submitted:", formData);
    // Real implementation would submit to an API
    onClose();
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div
        className="bg-white dark:bg-neutral-950 rounded-3xl w-full max-w-3xl my-auto animate-fade-in-up flex flex-col max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-red-500/10 shrink-0 bg-red-50 dark:bg-red-500/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-medium tracking-tight mb-1 text-black dark:text-white">
                Emergency Air Ambulance
              </h2>
              <p className="text-red-600/80 dark:text-red-400/80 text-sm font-medium">
                24/7 Rapid Response Coordination
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close emergency modal"
            className="p-2 text-black/50 dark:text-white/50 hover:text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors self-start"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Medical Details */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-black/90 dark:text-white/90 mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-brand" />
                Patient Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="patientName" className="block text-xs font-semibold text-black/60 dark:text-white/60 mb-1.5 ml-1">
                    Patient Full Name
                  </label>
                  <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    required
                    value={formData.patientName}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/20 rounded-xl focus:bg-white dark:bg-neutral-950 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="patientAge" className="block text-xs font-semibold text-black/60 dark:text-white/60 mb-1.5 ml-1">
                    Age
                  </label>
                  <input
                    type="number"
                    id="patientAge"
                    name="patientAge"
                    required
                    min="0"
                    value={formData.patientAge}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/20 rounded-xl focus:bg-white dark:bg-neutral-950 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                    placeholder="Age"
                  />
                </div>
                <div className="md:col-span-3">
                  <label htmlFor="medicalCondition" className="block text-xs font-semibold text-black/60 dark:text-white/60 mb-1.5 ml-1">
                    Primary Medical Condition / Diagnosis
                  </label>
                  <textarea
                    id="medicalCondition"
                    name="medicalCondition"
                    required
                    rows={2}
                    value={formData.medicalCondition}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/20 rounded-xl focus:bg-white dark:bg-neutral-950 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all resize-none"
                    placeholder="Please describe the patient's current condition, required medical equipment/support (e.g., ventilator, oxygen) etc."
                  />
                </div>
              </div>
            </div>

            {/* Transport Logistics */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-black/90 dark:text-white/90 mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand" />
                Transport Logistics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="currentLocation" className="block text-xs font-semibold text-black/60 dark:text-white/60 mb-1.5 ml-1">
                    Current Location (Hospital/City)
                  </label>
                  <input
                    type="text"
                    id="currentLocation"
                    name="currentLocation"
                    required
                    value={formData.currentLocation}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/20 rounded-xl focus:bg-white dark:bg-neutral-950 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                    placeholder="e.g., Mount Sinai, New York"
                  />
                </div>
                <div>
                  <label htmlFor="destinationLocation" className="block text-xs font-semibold text-black/60 dark:text-white/60 mb-1.5 ml-1">
                    Destination Facility & City
                  </label>
                  <input
                    type="text"
                    id="destinationLocation"
                    name="destinationLocation"
                    required
                    value={formData.destinationLocation}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/20 rounded-xl focus:bg-white dark:bg-neutral-950 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                    placeholder="e.g., Mass Gen, Boston"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="urgency" className="block text-xs font-semibold text-black/60 dark:text-white/60 mb-1.5 ml-1">
                    Urgency of Transfer
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Clock className="w-4 h-4 text-black/40 dark:text-white/40" />
                    </div>
                    <select
                      id="urgency"
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/20 rounded-xl appearance-none focus:bg-white dark:bg-neutral-950 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all cursor-pointer"
                    >
                      <option value="asap">
                        Immediate / ASAP (Life-threatening)
                      </option>
                      <option value="24_hours">Within 24 Hours</option>
                      <option value="48_hours">Within 48 Hours</option>
                      <option value="flexible">
                        Flexible / Planning stage
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Requestor Info */}
            <div className="pt-2 border-t border-gray-100 dark:border-white/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-black/90 dark:text-white/90 mb-4 mt-6 flex items-center gap-2">
                <User className="w-4 h-4 text-brand" />
                Your Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="requestorName" className="block text-xs font-semibold text-black/60 dark:text-white/60 mb-1.5 ml-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    id="requestorName"
                    name="requestorName"
                    required
                    value={formData.requestorName}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/20 rounded-xl focus:bg-white dark:bg-neutral-950 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label htmlFor="relation" className="block text-xs font-semibold text-black/60 dark:text-white/60 mb-1.5 ml-1">
                    Relation to Patient
                  </label>
                  <input
                    type="text"
                    id="relation"
                    name="relation"
                    required
                    value={formData.relation}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/20 rounded-xl focus:bg-white dark:bg-neutral-950 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                    placeholder="e.g., Spouse, Physician, Hospital Admin"
                  />
                </div>
                <div>
                  <label htmlFor="patientPhone" className="block text-xs font-semibold text-black/60 dark:text-white/60 mb-1.5 ml-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Phone className="w-4 h-4 text-black/40 dark:text-white/40" />
                    </div>
                    <input
                      type="tel"
                      id="patientPhone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/20 rounded-xl focus:bg-white dark:bg-neutral-950 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                      placeholder="Best contact number"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="patientEmail" className="block text-xs font-semibold text-black/60 dark:text-white/60 mb-1.5 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Mail className="w-4 h-4 text-black/40 dark:text-white/40" />
                    </div>
                    <input
                      type="email"
                      id="patientEmail"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/20 rounded-xl focus:bg-white dark:bg-neutral-950 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                      placeholder="Email for dispatch updates"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 flex gap-3 text-red-800 dark:text-red-200 text-sm">
                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                <p>
                  Upon submission, our 24/7 medical dispatch team will contact
                  you immediately at the provided phone number to begin
                  coordination.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex flex-col-reverse md:flex-row justify-end gap-3 shrink-0 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="w-full md:w-auto px-6 py-3 rounded-full text-black dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 rounded-full bg-red-600 text-white font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"
              >
                <HeartPulse className="w-4 h-4" />
                Initiate Emergency Transport
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
