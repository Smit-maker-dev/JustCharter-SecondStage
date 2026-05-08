import { ArrowRight, Users, Gauge, MapPin, Briefcase, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Fleet() {
  const categories = [
    {
      id: "ultra-long",
      title: "Ultra Long Range",
      description: "The pinnacle of private aviation, offering intercontinental range, maximum passenger capacity, and unparalleled luxury features including multiple cabin zones and full galleys.",
      aircraft: [
        {
          name: "Gulfstream G650ER",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Gulfstream_G650ER%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0749%29.jpg/1280px-Gulfstream_G650ER%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0749%29.jpg",
          passengers: "14-19",
          speed: "Mach 0.925",
          range: "7,500 nm",
          luggage: "195 cu ft",
          estPrice: "Est. $10,500 / hr"
        },
        {
          name: "Global 7500",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/EC-MLR_Gulfstream_G650_SCQ_03.jpg/1280px-EC-MLR_Gulfstream_G650_SCQ_03.jpg",
          passengers: "19",
          speed: "Mach 0.925",
          range: "7,700 nm",
          luggage: "195 cu ft",
          estPrice: "Est. $11,000 / hr"
        }
      ]
    },
    {
      id: "super-midsize",
      title: "Super Midsize & Heavy Jets",
      description: "Ideal for cross-country and transatlantic travel. Generous headroom, stand-up cabins, and enhanced cruising speeds.",
      aircraft: [
        {
          name: "Challenger 350",
          image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/BBJ_interior_2011.jpg",
          passengers: "9-10",
          speed: "Mach 0.83",
          range: "3,200 nm",
          luggage: "106 cu ft",
          estPrice: "Est. $6,500 / hr"
        },
        {
          name: "Citation Longitude",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/CS-LTI_Cessna_560_XLS_Citation_XLS_C56X_c_n_560-5798_-_NJE_%2843222541880%29.jpg/1280px-CS-LTI_Cessna_560_XLS_Citation_XLS_C56X_c_n_560-5798_-_NJE_%2843222541880%29.jpg",
          passengers: "12",
          speed: "Mach 0.84",
          range: "3,500 nm",
          luggage: "112 cu ft",
          estPrice: "Est. $7,000 / hr"
        }
      ]
    },
    {
      id: "light",
      title: "Light & Very Light Jets",
      description: "Fast, efficient, and cost-effective. Perfect for short-haul journeys of up to 3 hours between regional airports.",
      aircraft: [
        {
          name: "Phenom 300E",
          image: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Embraer_505_Phenom_300%2C_Aerojet_JP7625910.jpg",
          passengers: "7-8",
          speed: "Mach 0.80",
          range: "1,971 nm",
          luggage: "84 cu ft",
          estPrice: "Est. $3,500 / hr"
        }
      ]
    },
    {
      id: "helicopters",
      title: "Helicopters",
      description: "Perfect for short urban transfers, skipping traffic, and accessing remote locations with precision and ease.",
      aircraft: [
        {
          name: "Sikorsky S-76",
          image: "https://images.unsplash.com/photo-1549524570-5b565a049963?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          passengers: "6-8",
          speed: "155 knots",
          range: "400 nm",
          luggage: "38 cu ft",
          estPrice: "Est. $4,000 / hr"
        },
        {
          name: "Airbus H145",
          image: "https://images.unsplash.com/photo-1627953258757-ad6d2ee178db?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          passengers: "8",
          speed: "135 knots",
          range: "350 nm",
          luggage: "32 cu ft",
          estPrice: "Est. $3,500 / hr"
        }
      ]
    },
    {
      id: "yachts",
      title: "Luxury Yachts",
      description: "Experience the ultimate freedom on the water. Curated superyachts for bespoke coastal journeys and luxurious escapes.",
      aircraft: [
        {
          name: "Sunseeker 95",
          image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          passengers: "10-12",
          speed: "26 knots",
          range: "1,250 nm",
          luggage: "Custom",
          estPrice: "Est. $60,000 / week"
        },
        {
          name: "Benetti Oasis 40M",
          image: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          passengers: "10",
          speed: "16 knots",
          range: "4,000 nm",
          luggage: "Custom",
          estPrice: "Est. $250,000 / week"
        }
      ]
    }
  ];

  return (
    <div className="bg-[#F5F5F5] dark:bg-neutral-900 min-h-screen pt-20 md:pt-24 pb-16 md:pb-24">
      {/* Hero Section */}
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mt-8 md:mt-16 mb-12 md:mb-20">
        <h4 className="text-black/50 dark:text-white/50 text-sm mb-4 font-medium tracking-wide uppercase">
          The JustCharter Fleet
        </h4>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-medium leading-[1.1] md:leading-tight mb-6 md:mb-8" style={{ letterSpacing: '-0.04em' }}>
          Crafted for every mission.
        </h1>
        <p className="text-black/60 dark:text-white/60 text-xl max-w-2xl leading-relaxed">
          Unlock access to an elite global fleet of more than 3,000 strictly vetted premier aircraft. Whatever your itinerary, we provide the perfect jet.
        </p>
      </div>

      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mb-24 md:mb-32 space-y-20 md:space-y-32">
        {categories.map((category) => (
          <div key={category.id} className="pt-8 border-t border-gray-200 dark:border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-start mb-8 md:mb-12 gap-4 md:gap-8">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-medium mb-3 md:mb-4" style={{ letterSpacing: '-0.03em' }}>{category.title}</h2>
                <p className="text-black/60 dark:text-white/60 text-base md:text-lg leading-relaxed">{category.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {category.aircraft.map((jet, idx) => (
                <div key={idx} className="bg-white dark:bg-neutral-950 rounded-3xl overflow-hidden group border border-gray-100 dark:border-white/10 flex flex-col hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src={jet.image} 
                      alt={jet.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-6 left-6 text-white text-2xl font-medium tracking-tight">
                      {jet.name}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 text-black/50 dark:text-white/50 text-sm font-medium tracking-wide uppercase">
                          <Users className="w-4 h-4 shrink-0" />
                          Passengers
                        </div>
                        <span className="text-lg font-medium">Up to {jet.passengers}</span>
                      </div>
                      
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 text-black/50 dark:text-white/50 text-sm font-medium tracking-wide uppercase">
                          <MapPin className="w-4 h-4 shrink-0" />
                          Range
                        </div>
                        <span className="text-lg font-medium">{jet.range}</span>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 text-black/50 dark:text-white/50 text-sm font-medium tracking-wide uppercase">
                          <Gauge className="w-4 h-4 shrink-0" />
                          Cruise Speed
                        </div>
                        <span className="text-lg font-medium">{jet.speed}</span>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 text-black/50 dark:text-white/50 text-sm font-medium tracking-wide uppercase">
                          <Briefcase className="w-4 h-4 shrink-0" />
                          Luggage
                        </div>
                        <span className="text-lg font-medium">{jet.luggage}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-6 pt-6 border-t border-gray-100 dark:border-white/10">
                      <span className="text-black/50 dark:text-white/50 font-medium tracking-wide uppercase text-sm">Estimated Price</span>
                      <span className="text-xl font-medium">{jet.estPrice}</span>
                    </div>

                    <div className="flex flex-col xl:flex-row gap-3">
                      <Link to={`/fleet/${jet.name.toLowerCase().replace(/ /g, '-')}`} className="flex-1 block py-4 text-center text-sm font-medium text-black dark:text-white bg-[#F5F5F5] dark:bg-neutral-900 rounded-full hover:bg-gray-200 transition-colors duration-200">
                        View Details
                      </Link>
                      <button className="flex-1 py-4 text-center text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800 dark:hover:bg-neutral-200 transition-colors duration-200">
                        Request Flight
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6">
        <div className="bg-black text-white rounded-[2rem] md:rounded-3xl p-8 sm:p-12 md:p-20 text-center flex flex-col items-center">
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-4 md:mb-6 max-w-2xl" style={{ letterSpacing: '-0.03em' }}>
            Need assistance choosing the right aircraft?
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto mb-8 md:mb-10">
            Our aviation experts operate 24/7. Let us analyze your mission and recommend the optimal aircraft for your itinerary, passenger count, and cargo.
          </p>
          <button className="inline-flex items-center gap-2 md:gap-3 bg-white dark:bg-neutral-950 text-black dark:text-white text-base md:text-lg font-medium px-6 md:px-8 py-3 md:py-3.5 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors duration-200">
            Contact Advisors
            <ArrowRight className="w-5 h-5 text-black dark:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
