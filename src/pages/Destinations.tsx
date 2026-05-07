import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Destinations() {
  const globalDestinations = [
    {
      city: 'Aspen',
      country: 'United States',
      description: 'The ultimate winter escape for skiing and luxury resorts.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Downtown_of_Aspen%2C_Colorado.jpg'
    },
    {
      city: 'Monaco',
      country: 'Monaco',
      description: 'Experience the glamour of the French Riviera and grand events.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Monte_Carlo_Port_Hercules_b.jpg/1280px-Monte_Carlo_Port_Hercules_b.jpg'
    },
    {
      city: 'London',
      country: 'United Kingdom',
      description: 'A global hub for business, finance, and unparalleled culture.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/London_Skyline_%28125508655%29.jpeg/1280px-London_Skyline_%28125508655%29.jpeg'
    },
    {
      city: 'Dubai',
      country: 'United Arab Emirates',
      description: 'Visionary architecture and luxury shopping in the desert oasis.',
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/Burj_Khalifa_2021.jpg/1280px-Burj_Khalifa_2021.jpg'
    }
  ];

  const spiritualYatras = [
    {
      city: 'Char Dham',
      state: 'Uttarakhand',
      description: 'A spiritual journey to the four sacred shrines nestled in the Himalayas.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Kedarnath_Temple_in_Rainy_season.jpg/1280px-Kedarnath_Temple_in_Rainy_season.jpg'
    },
    {
      city: 'Tirupati',
      state: 'Andhra Pradesh',
      description: 'Visit the revered Sri Venkateswara Temple with seamless travel.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Tirumala_090615.jpg/1280px-Tirumala_090615.jpg'
    },
    {
      city: 'Varanasi',
      state: 'Uttar Pradesh',
      description: 'Experience the spiritual heart of India along the sacred Ganges river.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Varanasi%2C_India%2C_Ghats%2C_Cremation_ceremony_in_progress.jpg/1280px-Varanasi%2C_India%2C_Ghats%2C_Cremation_ceremony_in_progress.jpg'
    },
    {
      city: 'Vaishno Devi',
      state: 'Jammu & Kashmir',
      description: 'A serene and comfortable pilgrimage to the holy cave temple.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Badrinath_Temple_%2C_Uttarakhand.jpg/1280px-Badrinath_Temple_%2C_Uttarakhand.jpg'
    }
  ];

  return (
    <div className="bg-[#F5F5F5] min-h-screen pt-24 pb-24">
      {/* Hero Section */}
      <div className="max-w-[88rem] mx-auto px-6 mt-16 mb-20">
        <h1 className="text-5xl md:text-7xl font-medium leading-tight mb-6" style={{ letterSpacing: '-0.04em' }}>
          Fly Anywhere,<br/>On Your Terms.
        </h1>
        <p className="text-black/60 text-xl max-w-2xl leading-relaxed mb-8">
          From the world's most bustling business capitals to remote spiritual sanctuaries, JustCharter ensures you arrive refreshed and on schedule. Explore our most popular routes.
        </p>
      </div>

      {/* Global Destinations */}
      <div className="max-w-[88rem] mx-auto px-6 mb-32">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center">
             <MapPin className="w-5 h-5" />
          </div>
          <h2 className="text-3xl md:text-4xl font-medium" style={{ letterSpacing: '-0.02em' }}>
            Global Destinations
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {globalDestinations.map((dest, idx) => (
            <div key={idx} className="group relative rounded-3xl overflow-hidden aspect-[16/10] md:aspect-video cursor-pointer">
              <img
                src={dest.image}
                alt={dest.city}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 flex flex-col items-start">
                <span className="text-white/80 text-sm font-medium tracking-widest uppercase mb-2">
                  {dest.country}
                </span>
                <h3 className="text-white text-3xl font-medium mb-3" style={{ letterSpacing: '-0.02em' }}>
                  {dest.city}
                </h3>
                <p className="text-white/80 text-base max-w-md mb-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {dest.description}
                </p>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur border border-white/20 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                  <ArrowRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spiritual Yatras */}
      <div className="max-w-[88rem] mx-auto px-6 mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h4 className="text-black/50 text-sm mb-3 font-medium tracking-wide uppercase">
              Sacred Journeys
            </h4>
             <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight" style={{ letterSpacing: '-0.03em' }}>
              Spiritual Yatras
            </h2>
          </div>
          <p className="text-black/60 max-w-md text-base leading-relaxed">
            Experience profound peace of mind with our exclusive helicopter and jet charters designed specifically for India's holiest pilgrimage sites.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {spiritualYatras.map((yatra, idx) => (
             <div key={idx} className="group relative rounded-3xl overflow-hidden aspect-[4/5] cursor-pointer">
              <img
                src={yatra.image}
                alt={yatra.city}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-start translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-white/80 text-xs font-medium tracking-widest uppercase mb-2">
                  {yatra.state}
                </span>
                <h3 className="text-white text-2xl font-medium mb-3" style={{ letterSpacing: '-0.02em' }}>
                  {yatra.city}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {yatra.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-[88rem] mx-auto px-6">
        <div className="bg-white border border-gray-100 rounded-3xl p-12 md:p-20 text-center flex flex-col items-center">
           <h2 className="text-4xl md:text-5xl font-medium leading-tight mb-6" style={{ letterSpacing: '-0.03em' }}>
            Can't find your destination?
          </h2>
          <p className="text-black/60 text-lg max-w-xl mx-auto mb-10">
            We fly to over 7,000 airports globally. Request a quote for any route, and our team will arrange the perfect charter for you.
          </p>
          <button className="inline-flex items-center gap-3 bg-black text-white text-lg font-medium px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors duration-200">
            Request Custom Route
            <ArrowRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
