import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Users, Gauge, MapPin, Briefcase, Wifi, Utensils, BedDouble, Tv, CheckCircle2 } from 'lucide-react';

export default function AircraftDetails() {
  const { id } = useParams();

  // In a real application, we would fetch data based on the ID.
  // Using a robust mock object for demonstration here.
  const aircraft = {
    name: "Gulfstream G650ER",
    category: "Ultra Long Range",
    tagline: "The gold standard of ultra-long-range private jets.",
    description: "The Gulfstream G650ER sets the standard for ultra-long-range business jets. It offers a spacious, luxurious cabin tailored for the most demanding global travelers. Featuring a four-living-area cabin, outstanding cabin pressure, and breathing 100% fresh air, you arrive refreshed and ready. With its exceptional 7,500-nautical-mile range, you can fly non-stop from New York to Hong Kong or London to Buenos Aires in unparalleled comfort.",
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Gulfstream_G650ER%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0749%29.jpg/1280px-Gulfstream_G650ER%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0749%29.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/EC-MLR_Gulfstream_G650_SCQ_03.jpg/1280px-EC-MLR_Gulfstream_G650_SCQ_03.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/4/4d/BBJ_interior_2011.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/CS-LTI_Cessna_560_XLS_Citation_XLS_C56X_c_n_560-5798_-_NJE_%2843222541880%29.jpg/1280px-CS-LTI_Cessna_560_XLS_Citation_XLS_C56X_c_n_560-5798_-_NJE_%2843222541880%29.jpg"
    ],
    specs: {
      passengers: "14-19",
      speed: "Mach 0.925",
      range: "7,500 nm",
      luggage: "195 cu ft",
      cabinHeight: "6 ft 5 in",
      cabinWidth: "8 ft 6 in",
      cabinLength: "46 ft 10 in",
      endurance: "15 hours"
    },
    amenities: [
      { icon: <Wifi className="w-5 h-5 text-black" />, label: "High-Speed Ka-Band Wi-Fi" },
      { icon: <BedDouble className="w-5 h-5 text-black" />, label: "Lie-Flat Bed Capability" },
      { icon: <Utensils className="w-5 h-5 text-black" />, label: "Forward & Aft Full Galleys" },
      { icon: <Tv className="w-5 h-5 text-black" />, label: "HD Entertainment System" },
    ],
    features: [
      "Lowest cabin altitude in its class",
      "100% fresh air replenishment every two minutes",
      "16 panoramic oval windows",
      "Multiple distinct living areas",
      "Advanced sound-suppression techniques"
    ]
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen pt-24 pb-24">
      {/* Navigation */}
      <div className="max-w-[88rem] mx-auto px-6 mb-8 mt-8">
        <Link to="/fleet" className="inline-flex items-center gap-2 text-black/60 hover:text-black transition-colors font-medium text-sm tracking-wide uppercase">
          <ArrowLeft className="w-4 h-4" />
          Back to Fleet
        </Link>
      </div>

      {/* Hero Section */}
      <div className="max-w-[88rem] mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-black/5 text-black/70 text-sm font-semibold tracking-wide uppercase mb-6">
              {aircraft.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-medium leading-tight mb-6" style={{ letterSpacing: '-0.04em' }}>
              {aircraft.name}
            </h1>
            <p className="text-2xl text-black/60 leading-relaxed font-light mb-8 max-w-xl">
              {aircraft.tagline}
            </p>
            <div className="flex gap-4">
               <button className="bg-black text-white px-8 py-3.5 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors">
                 Request Quote
               </button>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] w-full">
            <img 
              referrerPolicy="no-referrer"
              src={aircraft.heroImage} 
              alt={aircraft.name} 
              className="absolute inset-0 w-full h-full object-cover" 
            />
          </div>
        </div>
      </div>

      {/* Primary Specs Grid */}
      <div className="max-w-[88rem] mx-auto px-6 mb-24">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
             <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-black/50 text-sm font-medium tracking-wide uppercase">
                  <Users className="w-4 h-4 shrink-0" />
                  Passengers
                </div>
                <span className="text-3xl lg:text-4xl font-medium tracking-tight">{aircraft.specs.passengers}</span>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-black/50 text-sm font-medium tracking-wide uppercase">
                  <MapPin className="w-4 h-4 shrink-0" />
                  Max Range
                </div>
                <span className="text-3xl lg:text-4xl font-medium tracking-tight">{aircraft.specs.range}</span>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-black/50 text-sm font-medium tracking-wide uppercase">
                  <Gauge className="w-4 h-4 shrink-0" />
                  Cruise Speed
                </div>
                <span className="text-3xl lg:text-4xl font-medium tracking-tight">{aircraft.specs.speed}</span>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-black/50 text-sm font-medium tracking-wide uppercase">
                  <Briefcase className="w-4 h-4 shrink-0" />
                  Luggage
                </div>
                <span className="text-3xl lg:text-4xl font-medium tracking-tight">{aircraft.specs.luggage}</span>
              </div>
          </div>
        </div>
      </div>

      {/* Description and Amenities */}
      <div className="max-w-[88rem] mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-medium mb-6" style={{ letterSpacing: '-0.02em' }}>The Experience</h2>
            <p className="text-black/70 text-lg leading-relaxed mb-10">
              {aircraft.description}
            </p>
            
            <h3 className="text-xl font-medium mb-5">Key Features</h3>
            <ul className="space-y-4">
              {aircraft.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-black shrink-0 mt-0.5" />
                  <span className="text-black/90 text-xl font-bold">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 space-y-12">
             <div>
               <h3 className="text-xl font-medium mb-6 uppercase tracking-wide text-black/50 text-sm">Cabin Dimensions</h3>
               <div className="bg-white rounded-3xl p-8 border border-gray-100 space-y-6">
                 <div className="flex justify-between items-end border-b border-gray-100 pb-4">
                   <span className="text-black/60 font-medium">Height</span>
                   <span className="text-xl font-medium">{aircraft.specs.cabinHeight}</span>
                 </div>
                 <div className="flex justify-between items-end border-b border-gray-100 pb-4">
                   <span className="text-black/60 font-medium">Width</span>
                   <span className="text-xl font-medium">{aircraft.specs.cabinWidth}</span>
                 </div>
                 <div className="flex justify-between items-end border-b border-gray-100 pb-4">
                   <span className="text-black/60 font-medium">Length</span>
                   <span className="text-xl font-medium">{aircraft.specs.cabinLength}</span>
                 </div>
                 <div className="flex justify-between items-end">
                   <span className="text-black/60 font-medium">Max Endurance</span>
                   <span className="text-xl font-medium">{aircraft.specs.endurance}</span>
                 </div>
               </div>
             </div>

             <div>
               <h3 className="text-xl font-medium mb-6 uppercase tracking-wide text-black/50 text-sm">Amenities</h3>
               <div className="grid grid-cols-2 gap-4">
                 {aircraft.amenities.map((amenity, idx) => (
                   <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center">
                       {amenity.icon}
                     </div>
                     <span className="font-medium text-black/80 text-sm">{amenity.label}</span>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-[88rem] mx-auto px-6 mb-32">
        <h2 className="text-3xl font-medium mb-10" style={{ letterSpacing: '-0.02em' }}>Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aircraft.gallery.map((image, idx) => (
            <div key={idx} className="relative rounded-3xl overflow-hidden aspect-[4/3] group cursor-pointer">
               <img 
                 referrerPolicy="no-referrer"
                 src={image} 
                 alt={`Gallery item ${idx + 1}`} 
                 className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
               />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-[88rem] mx-auto px-6">
        <div className="bg-black text-white rounded-3xl p-12 md:p-20 text-center flex flex-col items-center">
           <h2 className="text-4xl md:text-5xl font-medium leading-tight mb-6" style={{ letterSpacing: '-0.03em' }}>
            Ready to fly the {aircraft.name}?
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-10">
            Contact our dedicated charter team to verify availability, receive a custom quote, and finalize your itinerary.
          </p>
          <button className="inline-flex items-center gap-3 bg-white text-black text-lg font-medium px-8 py-3.5 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
            Inquire Now
            <ArrowRight className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}
