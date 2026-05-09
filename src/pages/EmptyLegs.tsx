import { Helmet } from 'react-helmet-async';
import { Plane, Calendar, Users, Bell } from 'lucide-react';
import { useState } from 'react';

export default function EmptyLegs() {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [maxSeats, setMaxSeats] = useState("");
  const [dateRange, setDateRange] = useState("All");

  const emptyLegs = [
    {
      id: "EL-001",
      from: "London (FAB)",
      to: "Paris (LBG)",
      date: "Tomorrow, 10:00 AM",
      aircraft: "Citation Latitude",
      type: "Midsize Jet",
      passengers: 8,
      price: "€4,500",
      originalPrice: "€12,000",
      daysToDeparture: 1,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/CS-LTI_Cessna_560_XLS_Citation_XLS_C56X_c_n_560-5798_-_NJE_%2843222541880%29.jpg/1280px-CS-LTI_Cessna_560_XLS_Citation_XLS_C56X_c_n_560-5798_-_NJE_%2843222541880%29.jpg"
    },
    {
      id: "EL-002",
      from: "New York (TEB)",
      to: "Miami (OPF)",
      date: "Oct 28, 2024",
      aircraft: "Challenger 350",
      type: "Super Midsize",
      passengers: 9,
      price: "$12,500",
      originalPrice: "$28,000",
      daysToDeparture: 5,
      image: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Embraer_505_Phenom_300%2C_Aerojet_JP7625910.jpg"
    },
    {
      id: "EL-003",
      from: "Los Angeles (VNY)",
      to: "Las Vegas (LAS)",
      date: "Nov 02, 2024",
      aircraft: "Phenom 300",
      type: "Light Jet",
      passengers: 7,
      price: "$4,800",
      originalPrice: "$9,500",
      daysToDeparture: 12,
      image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/BBJ_interior_2011.jpg"
    },
    {
      id: "EL-004",
      from: "Dubai (DWC)",
      to: "Malé (MLE)",
      date: "Nov 05, 2024",
      aircraft: "Global 6000",
      type: "Ultra Long Range",
      passengers: 14,
      price: "$35,000",
      originalPrice: "$85,000",
      daysToDeparture: 15,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/EC-MLR_Gulfstream_G650_SCQ_03.jpg/1280px-EC-MLR_Gulfstream_G650_SCQ_03.jpg"
    },
    {
      id: "EL-005",
      from: "Geneva (GVA)",
      to: "Nice (NCE)",
      date: "Nov 08, 2024",
      aircraft: "Citation Mustang",
      type: "Very Light Jet",
      passengers: 4,
      price: "€2,900",
      originalPrice: "€6,500",
      daysToDeparture: 18,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Gulfstream_G650ER%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0749%29.jpg/1280px-Gulfstream_G650ER%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0749%29.jpg"
    },
    {
      id: "EL-006",
      from: "Singapore (XSP)",
      to: "Hong Kong (HKG)",
      date: "Nov 12, 2024",
      aircraft: "Gulfstream G550",
      type: "Ultra Long Range",
      passengers: 16,
      price: "$28,000",
      originalPrice: "$65,000",
      daysToDeparture: 22,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/An-124_ready.jpg/1280px-An-124_ready.jpg"
    }
  ];

  const filteredLegs = emptyLegs.filter(leg => {
    if (fromCity && !leg.from.toLowerCase().includes(fromCity.toLowerCase())) return false;
    if (toCity && !leg.to.toLowerCase().includes(toCity.toLowerCase())) return false;
    if (maxSeats && leg.passengers > parseInt(maxSeats)) return false;
    
    if (dateRange === "This Week" && leg.daysToDeparture > 7) return false;
    if (dateRange === "This Month" && leg.daysToDeparture > 30) return false;

    return true;
  });

  const handleNotify = (leg: typeof emptyLegs[0]) => {
    localStorage.setItem(`notify_${leg.id}`, leg.from + " to " + leg.to);
    alert(`You will be notified about changes to the route: ${leg.from} to ${leg.to}.`);
  };

  return (
<div className="bg-[#F5F5F5] dark:bg-neutral-900 min-h-screen pt-20 md:pt-24 pb-16 md:pb-24">
<Helmet><title>Empty Leg Flights | Discounted Private Jets | JustCharter</title><meta name="description" content="Empty Leg Flights | Discounted Private Jets | JustCharter" /><script type="application/ld+json">{`{ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://just-charter-second-stage.vercel.app/" }, { "@type": "ListItem", "position": 2, "name": "EmptyLegs", "item": "https://just-charter-second-stage.vercel.app/emptylegs" }]}`}</script></Helmet>
      {/* Hero Section */}
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mt-8 md:mt-16 mb-8 text-center">
        <h4 className="text-black/50 dark:text-white/50 text-sm mb-4 font-medium tracking-wide uppercase">
          Spontaneous Luxury
        </h4>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-medium leading-[1.1] md:leading-tight mb-6 md:mb-8" style={{ letterSpacing: '-0.04em' }}>
          Empty Leg Flights.
        </h1>
        <p className="text-black/60 dark:text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
          Experience the pinnacle of private aviation at a fraction of the cost. Book repositioning flights and enjoy up to 75% off standard charter rates.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mb-12">
        <div className="bg-white dark:bg-neutral-950 rounded-2xl md:rounded-[2rem] p-6 shadow-sm border border-black/5 dark:border-white/5 flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="fromCity" className="block text-xs font-medium text-black/60 dark:text-white/60 mb-2 uppercase tracking-wide">From City</label>
            <input 
              type="text" 
              id="fromCity"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              placeholder="e.g. London"
              className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/20 dark:focus:border-white/20 rounded-xl px-4 py-3 outline-none text-black dark:text-white transition-colors"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="toCity" className="block text-xs font-medium text-black/60 dark:text-white/60 mb-2 uppercase tracking-wide">To City</label>
            <input 
              type="text" 
              id="toCity"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              placeholder="e.g. Paris"
              className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/20 dark:focus:border-white/20 rounded-xl px-4 py-3 outline-none text-black dark:text-white transition-colors"
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label htmlFor="maxSeats" className="block text-xs font-medium text-black/60 dark:text-white/60 mb-2 uppercase tracking-wide">Max Seats</label>
            <input 
              type="number" 
              id="maxSeats"
              value={maxSeats}
              onChange={(e) => setMaxSeats(e.target.value)}
              placeholder="Any"
              className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/20 dark:focus:border-white/20 rounded-xl px-4 py-3 outline-none text-black dark:text-white transition-colors"
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label htmlFor="dateRange" className="block text-xs font-medium text-black/60 dark:text-white/60 mb-2 uppercase tracking-wide">Date Range</label>
            <select 
              id="dateRange"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/20 dark:focus:border-white/20 rounded-xl px-4 py-3 outline-none text-black dark:text-white transition-colors appearance-none"
            >
              <option>All</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Flight Grid */}
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mb-24 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLegs.map((leg) => (
            <div key={leg.id} className="bg-white dark:bg-neutral-950 rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10 group flex flex-col">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img 
                  src={leg.image} 
                  alt={`${leg.aircraft} for empty leg flight - up to ${leg.passengers} seats`} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="bg-brand text-white backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase shadow-sm">
                    Save {Math.round((1 - parseInt(leg.price.replace(/[^\d]/g, '')) / parseInt(leg.originalPrice.replace(/[^\d]/g, ''))) * 100)}%
                  </div>
                  {leg.daysToDeparture <= 3 && (
                    <div className="bg-red-500 text-white backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase shadow-sm animate-pulse">
                      Departs in {leg.daysToDeparture} {leg.daysToDeparture === 1 ? 'day' : 'days'}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex-1 border-r border-black/5 dark:border-white/5 pr-4">
                    <div className="text-xs text-black/50 dark:text-white/50 font-medium tracking-wide uppercase mb-1">From</div>
                    <div className="text-lg font-medium tracking-tight text-black dark:text-white truncate">{leg.from.split('(')[0].trim()}</div>
                  </div>
                  <div className="px-4">
                    <Plane className="w-5 h-5 text-black/20 shrink-0" />
                  </div>
                  <div className="flex-1 text-right border-l border-black/5 dark:border-white/5 pl-4">
                    <div className="text-xs text-black/50 dark:text-white/50 font-medium tracking-wide uppercase mb-1">To</div>
                    <div className="text-lg font-medium tracking-tight text-black dark:text-white truncate">{leg.to.split('(')[0].trim()}</div>
                  </div>
                </div>

                <div className="h-px bg-gray-100 dark:bg-white/5 w-full mb-6" />

                <div className="space-y-3 mb-8 flex-1">
                  <div className="flex items-center gap-3 text-black/70 dark:text-white/70">
                    <Calendar className="w-4 h-4 shrink-0 opacity-50" />
                    <span className="text-sm font-medium">{leg.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-black/70 dark:text-white/70">
                    <Plane className="w-4 h-4 shrink-0 opacity-50" />
                    <span className="text-sm font-medium">{leg.aircraft} <span className="opacity-60 text-xs ml-1">({leg.type})</span></span>
                  </div>
                  <div className="flex items-center gap-3 text-black/70 dark:text-white/70">
                    <Users className="w-4 h-4 shrink-0 opacity-50" />
                    <span className="text-sm font-medium">Up to {leg.passengers} pax</span>
                  </div>
                </div>

                <div className="flex items-end justify-between mt-auto">
                  <div>
                    <div className="text-sm text-black/50 dark:text-white/50 line-through mb-1">{leg.originalPrice}</div>
                    <div className="text-2xl font-medium text-black dark:text-white tracking-tight">{leg.price}</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-neutral-200 transition-colors">
                      Book Now
                    </button>
                    <button 
                      onClick={() => handleNotify(leg)}
                      className="text-xs font-medium text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Bell className="w-3 h-3" /> Notify Me
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredLegs.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 bg-white dark:bg-neutral-950 rounded-3xl border border-black/5 dark:border-white/5">
              <Plane className="w-12 h-12 text-black/20 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No matching empty legs</h3>
              <p className="text-black/60 dark:text-white/60">Try adjusting your filters to find more options.</p>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6">
        <div className="bg-black text-white rounded-[2rem] md:rounded-3xl p-8 sm:p-12 md:p-20 text-center flex flex-col items-center">
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-4 md:mb-6 max-w-2xl" style={{ letterSpacing: '-0.03em' }}>
            Be the first to know about new empty legs.
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto mb-8 md:mb-10">
            Sign up for our newsletter to receive weekly updates on available repositioning flights from your preferred departure airports.
          </p>
          <div className="flex flex-col sm:flex-row w-full max-w-md gap-3">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3.5 text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 transition-colors text-center sm:text-left"
            />
            <button className="bg-white dark:bg-neutral-950 text-black dark:text-white px-8 py-3.5 rounded-full font-medium hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
