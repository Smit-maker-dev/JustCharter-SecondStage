import { ArrowRight, Plane, Calendar, Users, MapPin, Tag } from 'lucide-react';

export default function EmptyLegs() {
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
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/An-124_ready.jpg/1280px-An-124_ready.jpg"
    }
  ];

  return (
    <div className="bg-[#F5F5F5] min-h-screen pt-24 pb-24">
      {/* Hero Section */}
      <div className="max-w-[88rem] mx-auto px-6 mt-16 mb-20 text-center">
        <h4 className="text-black/50 text-sm mb-4 font-medium tracking-wide uppercase">
          Spontaneous Luxury
        </h4>
        <h1 className="text-5xl md:text-7xl font-medium leading-tight mb-8" style={{ letterSpacing: '-0.04em' }}>
          Empty Leg Flights.
        </h1>
        <p className="text-black/60 text-xl max-w-2xl mx-auto leading-relaxed">
          Experience the pinnacle of private aviation at a fraction of the cost. Book repositioning flights and enjoy up to 75% off standard charter rates.
        </p>
      </div>

      {/* Flight Grid */}
      <div className="max-w-[88rem] mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {emptyLegs.map((leg) => (
            <div key={leg.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 group flex flex-col">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img 
                  src={leg.image} 
                  alt={leg.aircraft} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-brand text-white backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase shadow-sm">
                  Save {Math.round((1 - parseInt(leg.price.replace(/[^\d]/g, '')) / parseInt(leg.originalPrice.replace(/[^\d]/g, ''))) * 100)}%
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex-1">
                    <div className="text-sm text-black/50 font-medium tracking-wide uppercase mb-1">From</div>
                    <div className="text-lg font-medium tracking-tight text-black truncate">{leg.from}</div>
                  </div>
                  <div className="px-4">
                    <Plane className="w-5 h-5 text-black/20 shrink-0" />
                  </div>
                  <div className="flex-1 text-right">
                    <div className="text-sm text-black/50 font-medium tracking-wide uppercase mb-1">To</div>
                    <div className="text-lg font-medium tracking-tight text-black truncate">{leg.to}</div>
                  </div>
                </div>

                <div className="h-px bg-gray-100 w-full mb-6" />

                <div className="space-y-3 mb-8 flex-1">
                  <div className="flex items-center gap-3 text-black/70">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span className="text-sm font-medium">{leg.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-black/70">
                    <Plane className="w-4 h-4 shrink-0" />
                    <span className="text-sm font-medium">{leg.aircraft} <span className="opacity-60">({leg.type})</span></span>
                  </div>
                  <div className="flex items-center gap-3 text-black/70">
                    <Users className="w-4 h-4 shrink-0" />
                    <span className="text-sm font-medium">Up to {leg.passengers} Passengers</span>
                  </div>
                </div>

                <div className="flex items-end justify-between mt-auto">
                  <div>
                    <div className="text-sm text-black/50 line-through mb-1">{leg.originalPrice}</div>
                    <div className="text-2xl font-medium text-black tracking-tight">{leg.price}</div>
                  </div>
                  <button className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                    Request Flight
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-[88rem] mx-auto px-6">
        <div className="bg-black text-white rounded-3xl p-12 md:p-20 text-center flex flex-col items-center">
           <h2 className="text-4xl md:text-5xl font-medium leading-tight mb-6 max-w-2xl" style={{ letterSpacing: '-0.03em' }}>
            Be the first to know about new empty legs.
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-10">
            Sign up for our newsletter to receive weekly updates on available repositioning flights from your preferred departure airports.
          </p>
          <div className="flex w-full max-w-md gap-2">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3.5 text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 transition-colors"
            />
            <button className="bg-white text-black px-8 py-3.5 rounded-full font-medium hover:bg-gray-100 transition-colors shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
