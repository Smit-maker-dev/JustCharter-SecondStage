import { useState, FormEvent, ChangeEvent } from 'react';
import { X, PlaneTakeoff, PlaneLanding, Calendar, Users, Mail, Phone, User } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  aircraftName?: string;
}

export default function BookingModal({ isOpen, onClose, aircraftName }: BookingModalProps) {
  const [formData, setFormData] = useState({
    departure: '',
    destination: '',
    date: '',
    passengers: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    onClose();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div 
        className="bg-white dark:bg-neutral-950 rounded-3xl w-full max-w-2xl my-auto animate-fade-in-up flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-gray-100 dark:border-white/10 shrink-0">
          <div>
            <h2 className="text-2xl font-medium tracking-tight mb-1">
              Request a Flight
            </h2>
            {aircraftName && (
              <p className="text-black/60 dark:text-white/60 text-sm">
                Inquiring about: <span className="font-medium text-black dark:text-white">{aircraftName}</span>
              </p>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-black/50 dark:text-white/50 hover:text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 dark:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Flight Details */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-black/50 dark:text-white/50 mb-4">
                Flight Itinerary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <PlaneTakeoff className="w-5 h-5 text-black/40 dark:text-white/40" />
                  </div>
                  <input
                    type="text"
                    name="departure"
                    required
                    value={formData.departure}
                    onChange={handleChange}
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/20 rounded-xl text-black dark:text-white placeholder:text-black/40 dark:text-white/40 focus:bg-white dark:bg-neutral-950 focus:outline-none focus:border-black/20 dark:border-white/20 focus:ring-1 focus:ring-black/20 transition-all"
                    placeholder="Departure City or Airport"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <PlaneLanding className="w-5 h-5 text-black/40 dark:text-white/40" />
                  </div>
                  <input
                    type="text"
                    name="destination"
                    required
                    value={formData.destination}
                    onChange={handleChange}
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/20 rounded-xl text-black dark:text-white placeholder:text-black/40 dark:text-white/40 focus:bg-white dark:bg-neutral-950 focus:outline-none focus:border-black/20 dark:border-white/20 focus:ring-1 focus:ring-black/20 transition-all"
                    placeholder="Destination City or Airport"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Calendar className="w-5 h-5 text-black/40 dark:text-white/40" />
                  </div>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/20 rounded-xl text-black dark:text-white placeholder:text-black/40 dark:text-white/40 focus:bg-white dark:bg-neutral-950 focus:outline-none focus:border-black/20 dark:border-white/20 focus:ring-1 focus:ring-black/20 transition-all"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Users className="w-5 h-5 text-black/40 dark:text-white/40" />
                  </div>
                  <input
                    type="number"
                    name="passengers"
                    min="1"
                    required
                    value={formData.passengers}
                    onChange={handleChange}
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/20 rounded-xl text-black dark:text-white placeholder:text-black/40 dark:text-white/40 focus:bg-white dark:bg-neutral-950 focus:outline-none focus:border-black/20 dark:border-white/20 focus:ring-1 focus:ring-black/20 transition-all"
                    placeholder="Passengers"
                  />
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="pt-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-black/50 dark:text-white/50 mb-4">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative md:col-span-2">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-black/40 dark:text-white/40" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/20 rounded-xl text-black dark:text-white placeholder:text-black/40 dark:text-white/40 focus:bg-white dark:bg-neutral-950 focus:outline-none focus:border-black/20 dark:border-white/20 focus:ring-1 focus:ring-black/20 transition-all"
                    placeholder="Full Name"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-black/40 dark:text-white/40" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/20 rounded-xl text-black dark:text-white placeholder:text-black/40 dark:text-white/40 focus:bg-white dark:bg-neutral-950 focus:outline-none focus:border-black/20 dark:border-white/20 focus:ring-1 focus:ring-black/20 transition-all"
                    placeholder="Email Address"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Phone className="w-5 h-5 text-black/40 dark:text-white/40" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/20 rounded-xl text-black dark:text-white placeholder:text-black/40 dark:text-white/40 focus:bg-white dark:bg-neutral-950 focus:outline-none focus:border-black/20 dark:border-white/20 focus:ring-1 focus:ring-black/20 transition-all"
                    placeholder="Phone Number"
                  />
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="pt-2">
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="block w-full px-4 py-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/20 rounded-xl text-black dark:text-white placeholder:text-black/40 dark:text-white/40 focus:bg-white dark:bg-neutral-950 focus:outline-none focus:border-black/20 dark:border-white/20 focus:ring-1 focus:ring-black/20 transition-all resize-none"
                placeholder="Any special requests or additional information? (Optional)"
              />
            </div>
            
            <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-full text-black dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 rounded-full bg-black text-white font-medium hover:bg-gray-800 dark:hover:bg-neutral-200 transition-colors shadow-sm"
              >
                Request Flight
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
