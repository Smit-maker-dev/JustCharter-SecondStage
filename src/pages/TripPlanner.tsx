import React, { useState } from 'react';
import { Plane, Calendar, Users, MapPin, Search, CheckCircle2, Navigation, ChevronDown, ChevronUp, Info, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for suggested options
const MOCK_OPTIONS = [
  {
    id: 1,
    aircraft: 'Citation Latitude',
    type: 'Midsize Jet',
    duration: '2h 45m',
    price: '$18,500',
    seats: 9,
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80',
    features: ['Wi-Fi', 'Refreshments', 'Enclosed Lavatory'],
    specifications: {
      speed: '446 knots',
      range: '2,700 nm',
      cabin: '587 cu ft',
      baggage: '127 cu ft'
    },
    amenities: ['High-Speed Wi-Fi', 'Premium Galley', 'Entertainment System', 'Lie-flat Seats', 'AirShow', 'Climate Control']
  },
  {
    id: 2,
    aircraft: 'Challenger 350',
    type: 'Super Midsize Jet',
    duration: '2h 30m',
    price: '$24,000',
    seats: 10,
    image: 'https://images.unsplash.com/photo-1583072233615-5858cf818af0?auto=format&fit=crop&q=80',
    features: ['High-Speed Wi-Fi', 'Hot Catering', 'Flight Attendant'],
    specifications: {
      speed: '450 knots',
      range: '3,200 nm',
      cabin: '860 cu ft',
      baggage: '106 cu ft'
    },
    amenities: ['High-Speed Wi-Fi', 'Hot Catering', 'Entertainment Displays', 'Lie-flat Beds', 'AirShow 3D', 'Multi-zone Climate']
  },
  {
    id: 3,
    aircraft: 'Phenom 300E',
    type: 'Light Jet',
    duration: '3h 10m',
    price: '$14,200',
    seats: 7,
    image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80',
    features: ['Refreshments', 'Enclosed Lavatory'],
    specifications: {
      speed: '453 knots',
      range: '1,971 nm',
      cabin: '324 cu ft',
      baggage: '84 cu ft'
    },
    amenities: ['Standard Wi-Fi', 'Refreshments', 'Bluetooth Audio', 'Reclining Seats', 'AirShow', 'Climate Control']
  }
];

const TripOptionCard: React.FC<{ option: typeof MOCK_OPTIONS[0] }> = ({ option }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-2/5 md:w-1/3 aspect-[4/3] sm:aspect-auto">
          <img 
            src={option.image} 
            alt={option.aircraft} 
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6 sm:p-8 flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-4 mb-4">
            <div>
              <div className="text-xs font-semibold tracking-wider uppercase text-black/50 dark:text-white/50 mb-1">
                {option.type}
              </div>
              <h4 className="text-2xl font-medium">{option.aircraft}</h4>
            </div>
            <div className="text-right">
              <div className="text-sm text-black/50 dark:text-white/50">Estimated</div>
              <div className="text-2xl font-medium">{option.price}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6 pt-4 border-t border-black/5 dark:border-white/5">
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-black/40 dark:text-white/40" />
              <span>Up to {option.seats} seats</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Plane className="w-4 h-4 text-black/40 dark:text-white/40" />
              <span>{option.duration} flight</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {option.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 dark:bg-black/50 rounded-full text-xs font-medium">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                {feature}
              </div>
            ))}
          </div>

          <div className="mt-auto flex flex-col sm:flex-row gap-3">
            <button className="flex-1 bg-black text-white dark:bg-white dark:text-black py-3 px-4 rounded-xl font-medium tracking-wide hover:bg-black/90 dark:hover:bg-white/90 transition-colors">
              Request Quote
            </button>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-6 py-3 border border-black/10 dark:border-white/10 rounded-xl font-medium hover:border-black/30 dark:hover:border-white/30 transition-colors flex items-center justify-center gap-2"
            >
              {isExpanded ? (
                <>Less Details <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>More Details <ChevronDown className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Expanded Content */}
      <div 
        className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-black/5 dark:border-white/5 bg-gray-50/50 dark:bg-neutral-900/50 p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h5 className="font-medium mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4 text-black/50 dark:text-white/50" />
                  Aircraft Specifications
                </h5>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-2">
                    <span className="text-black/60 dark:text-white/60">Cruise Speed</span>
                    <span className="font-medium">{option.specifications.speed}</span>
                  </div>
                  <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-2">
                    <span className="text-black/60 dark:text-white/60">Max Range</span>
                    <span className="font-medium">{option.specifications.range}</span>
                  </div>
                  <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-2">
                    <span className="text-black/60 dark:text-white/60">Cabin Volume</span>
                    <span className="font-medium">{option.specifications.cabin}</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-black/60 dark:text-white/60">Baggage Capacity</span>
                    <span className="font-medium">{option.specifications.baggage}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium mb-4 flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-black/50 dark:text-white/50" />
                  Premium Amenities
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 text-sm text-black/70 dark:text-white/70">
                  {option.amenities.map((amenity, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20" />
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TripPlanner() {
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 1500);
  };

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mb-20 lg:mb-32">
        <div className="mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-medium mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-black to-black/60 dark:from-white dark:to-white/60">
            Trip Planner
          </h1>
          <p className="text-black/60 dark:text-white/60 text-lg sm:text-xl font-light tracking-wide max-w-2xl">
            Design your perfect journey. Enter your requirements below to discover available charter options tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Search Form */}
          <div className="lg:col-span-4 h-fit sticky top-32">
            <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-3xl p-5 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-medium mb-6 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-black/50 dark:text-white/50" />
                Flight Details
              </h2>
              
              <form onSubmit={handleSearch} className="space-y-4 sm:space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-black/70 dark:text-white/70 ml-1">Departure</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40 dark:text-white/40" />
                    <input
                      required
                      type="text"
                      placeholder="City or Airport Code"
                      className="w-full bg-gray-50 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-2xl px-12 py-3.5 sm:py-4 focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 transition-all text-black dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-black/70 dark:text-white/70 ml-1">Arrival</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40 dark:text-white/40" />
                    <input
                      required
                      type="text"
                      placeholder="City or Airport Code"
                      className="w-full bg-gray-50 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-2xl px-12 py-3.5 sm:py-4 focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 transition-all text-black dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-black/70 dark:text-white/70 ml-1">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40 dark:text-white/40" />
                      <input
                        required
                        type="date"
                        className="w-full bg-gray-50 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-2xl px-11 py-3.5 sm:py-4 focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 transition-all text-black dark:text-white [&::-webkit-calendar-picker-indicator]:dark:invert"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-black/70 dark:text-white/70 ml-1">Passengers</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40 dark:text-white/40" />
                      <input
                        required
                        type="number"
                        min="1"
                        max="19"
                        placeholder="1-19"
                        className="w-full bg-gray-50 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-2xl px-12 py-3.5 sm:py-4 focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 transition-all text-black dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-black/70 dark:text-white/70 ml-1">Aircraft Class</label>
                  <div className="relative">
                    <Plane className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40 dark:text-white/40" />
                    <select className="w-full bg-gray-50 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-2xl pl-12 pr-4 py-3.5 sm:py-4 focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 transition-all text-black dark:text-white appearance-none">
                      <option value="any">Any Class</option>
                      <option value="light">Light Jet</option>
                      <option value="midsize">Midsize Jet</option>
                      <option value="heavy">Heavy Jet</option>
                      <option value="ultra-long">Ultra Long Range</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSearching}
                  className="w-full bg-black text-white dark:bg-white dark:text-black py-4 rounded-2xl font-medium tracking-wide flex justify-center items-center gap-2 hover:bg-black/90 dark:hover:bg-white/90 transition-colors mt-4 disabled:opacity-70"
                >
                  {isSearching ? (
                    <div className="w-5 h-5 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Find Flights
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-8">
            {!hasSearched ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-white/50 dark:bg-neutral-900/50 rounded-3xl border border-dashed border-black/10 dark:border-white/10">
                <Plane className="w-16 h-16 text-black/20 dark:text-white/20 mb-6" />
                <h3 className="text-2xl font-medium mb-3">Ready When You Are</h3>
                <p className="text-black/50 dark:text-white/50 max-w-sm">
                  Enter your travel details to instantly compare private charter options tailored to your itinerary.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <div>
                    <h3 className="text-2xl font-medium">Recommended Options</h3>
                    <p className="text-black/50 dark:text-white/50">Found {MOCK_OPTIONS.length} aircraft matching your criteria</p>
                  </div>
                  <div className="px-4 py-2 bg-black/5 dark:bg-white/10 rounded-full text-sm font-medium">
                    Sorted by: Recommended
                  </div>
                </div>

                {MOCK_OPTIONS.map((option) => (
                  <TripOptionCard key={option.id} option={option} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
