import { Helmet } from 'react-helmet-async';
import { ArrowRight, MapPin, X, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, Suspense, useEffect } from "react";
import { ClientOnly } from '../components/ClientOnly';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in leaflet
const icon = L.divIcon({
  className: 'custom-leaflet-icon',
  html: `<div style="background-color: black; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

// Component to dynamically scroll mapping
const MapFocus = ({ coords }: { coords?: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo([coords[1], coords[0]], 5, { duration: 1.5 });
    } else {
      map.flyTo([20, 0], 2, { duration: 1.5 });
    }
  }, [coords, map]);
  return null;
}

interface Destination {
  city: string;
  country: string;
  region: string;
  description: string;
  image: string;
  coordinates: [number, number];
}

export default function Destinations() {
  const [mounted, setMounted] = useState(false);
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRegion, setActiveRegion] = useState("All");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const globalDestinations: Destination[] = [
    {
      city: "Aspen",
      country: "United States",
      region: "Americas",
      description: "The ultimate winter escape for skiing and luxury resorts.",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Downtown_of_Aspen%2C_Colorado.jpg",
      coordinates: [-106.8175, 39.1911],
    },
    {
      city: "Monaco",
      country: "Monaco",
      region: "Europe",
      description: "Experience the glamour of the French Riviera and grand events.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Monte_Carlo_Port_Hercules_b.jpg/1280px-Monte_Carlo_Port_Hercules_b.jpg",
      coordinates: [7.4202, 43.7384],
    },
    {
      city: "London",
      country: "United Kingdom",
      region: "Europe",
      description: "A global hub for business, finance, and unparalleled culture.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/London_Skyline_%28125508655%29.jpeg/1280px-London_Skyline_%28125508655%29.jpeg",
      coordinates: [-0.1276, 51.5072],
    },
    {
      city: "Dubai",
      country: "United Arab Emirates",
      region: "Middle East",
      description: "Visionary architecture and luxury shopping in the desert oasis.",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/Burj_Khalifa_2021.jpg/1280px-Burj_Khalifa_2021.jpg",
      coordinates: [55.2708, 25.2048],
    },
    {
      city: "Tokyo",
      country: "Japan",
      region: "Asia",
      description: "A vibrant metropolis blending ultramodern neon with tradition.",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=75&fm=webp&auto=format",
      coordinates: [139.6917, 35.6895],
    },
    {
      city: "Maldives",
      country: "Maldives",
      region: "Asia",
      description: "Crystal clear waters and private overwater villas for the ultimate retreat.",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=75&fm=webp&auto=format",
      coordinates: [73.2207, 3.2028],
    },
    {
      city: "Cape Town",
      country: "South Africa",
      region: "Africa",
      description: "Breathtaking landscapes and premium vineyards at the edge of the world.",
      image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1200&q=75&fm=webp&auto=format",
      coordinates: [18.4232, -33.9249],
    }
  ];

  const filteredDestinations = globalDestinations.filter(d => {
    const matchesRegion = activeRegion === "All" || d.region === activeRegion;
    const matchesSearch = d.city.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const spiritualYatras = [
    {
      city: "Char Dham",
      state: "Uttarakhand",
      description:
        "A spiritual journey to the four sacred shrines nestled in the Himalayas.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Kedarnath_Temple_in_Rainy_season.jpg/1280px-Kedarnath_Temple_in_Rainy_season.jpg",
    },
    {
      city: "Tirupati",
      state: "Andhra Pradesh",
      description:
        "Visit the revered Sri Venkateswara Temple with seamless travel.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Tirumala_090615.jpg/1280px-Tirumala_090615.jpg",
    },
    {
      city: "Varanasi",
      state: "Uttar Pradesh",
      description:
        "Experience the spiritual heart of India along the sacred Ganges river.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Varanasi%2C_India%2C_Ghats%2C_Cremation_ceremony_in_progress.jpg/1280px-Varanasi%2C_India%2C_Ghats%2C_Cremation_ceremony_in_progress.jpg",
    },
    {
      city: "Vaishno Devi",
      state: "Jammu & Kashmir",
      description:
        "A serene and comfortable pilgrimage to the holy cave temple.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Badrinath_Temple_%2C_Uttarakhand.jpg/1280px-Badrinath_Temple_%2C_Uttarakhand.jpg",
    },
  ];

  return (
<div className="bg-[#F5F5F5] dark:bg-neutral-900 min-h-screen pt-20 md:pt-24 pb-16 md:pb-24">
<Helmet><title>Private Jet Destinations Worldwide | JustCharter</title><meta name="description" content="Private Jet Destinations Worldwide | JustCharter" /><script type="application/ld+json">{`{ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://just-charter-second-stage.vercel.app/" }, { "@type": "ListItem", "position": 2, "name": "Destinations", "item": "https://just-charter-second-stage.vercel.app/destinations" }]}`}</script></Helmet>
      {/* Hero Section */}
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mt-8 md:mt-16 mb-12 flex flex-col items-center text-center">
        <h1
          className="text-4xl md:text-5xl lg:text-7xl font-medium leading-[1.1] md:leading-tight mb-6 md:mb-8"
          style={{ letterSpacing: "-0.04em" }}
        >
          Fly Anywhere,<br/>
          On Your Terms.
        </h1>
        <p className="text-black/60 dark:text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
          From the world's most bustling business capitals to remote spiritual
          sanctuaries, JustCharter ensures you arrive refreshed and on schedule.
        </p>

        {/* Search Input */}
        <div className="relative w-full max-w-xl mx-auto mb-10">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40 dark:text-white/40" />
          <input 
            type="text"
            placeholder="Search destination or region..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-neutral-950 border border-black/10 dark:border-white/10 rounded-full py-4 pl-14 pr-6 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors text-black dark:text-white"
          />
        </div>

        {/* Region Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {["All", "Europe", "Americas", "Middle East", "Asia", "Africa"].map(region => (
            <button 
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeRegion === region 
                ? "bg-black text-white dark:bg-white dark:text-black border border-transparent shadow-sm" 
                : "bg-transparent text-black/70 dark:text-white/70 border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30"
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* Destination Cards Grid */}
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map(dest => (
            <div key={dest.city} className="bg-white dark:bg-neutral-950 rounded-3xl p-4 flex flex-col gap-4 border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-colors">
              <div className="relative w-full h-48 rounded-2xl overflow-hidden aspect-video">
                <img src={dest.image} alt={`Private jet approaching ${dest.city}`} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  {dest.region}
                </div>
              </div>
              <div className="px-2 pb-2 flex-1 flex flex-col">
                <h3 className="text-xl font-medium mb-1">{dest.city}</h3>
                <p className="text-xs text-black/50 dark:text-white/50 tracking-wider uppercase font-semibold mb-3">{dest.country}</p>
                <p className="text-sm text-black/70 dark:text-white/70 flex-1 mb-4">{dest.description}</p>
                <div className="flex items-center gap-3 mt-auto">
                  <button 
                    onClick={() => {
                      setSelectedDest(dest);
                      document.getElementById('map-view')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex-1 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white text-sm font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <MapPin className="w-4 h-4" /> View Map
                  </button>
                  <Link to={`/contact?destination=${dest.city}`} className="flex-1 bg-black text-white dark:bg-white dark:text-black py-3 rounded-xl text-sm font-medium hover:bg-black/80 dark:hover:bg-white/80 transition-colors text-center">
                    Request Flight
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {filteredDestinations.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 bg-white dark:bg-neutral-950 rounded-3xl border border-black/5 dark:border-white/5">
              <p className="text-lg text-black/60 dark:text-white/60">No destinations found for your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Global Destinations Map */}
      <div id="map-view" className="max-w-[88rem] mx-auto px-4 sm:px-6 mb-24 md:mb-32">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <h2
            className="text-3xl md:text-4xl font-medium"
            style={{ letterSpacing: "-0.02em" }}
          >
            Interactive Global Overview
          </h2>
        </div>

        <div className="relative bg-neutral-100 dark:bg-neutral-800 border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-xl aspect-square md:aspect-[21/9] z-0">
          <ClientOnly fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg" />}>
            <Suspense>
              <MapContainer 
                center={[20, 0]}
                zoom={2}
                scrollWheelZoom={false}
                dragging={true}
                touchZoom={true}
                className="w-full h-full outline-none"
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                />
                
                <MapFocus coords={selectedDest?.coordinates} />

                {globalDestinations.map((dest) => (
                  <Marker
                    key={dest.city}
                    position={[dest.coordinates[1], dest.coordinates[0]]}
                    icon={icon}
                    eventHandlers={{ click: () => setSelectedDest(dest) }}
                  />
                ))}
              </MapContainer>
            </Suspense>
          </ClientOnly>

          {/* Overlay Detail Card */}
          {selectedDest && (
            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:w-[400px] bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-black/10 dark:border-white/20 rounded-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 z-[400]">
              <button
                onClick={() => setSelectedDest(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex gap-4 items-center mb-4">
                <img
                  src={selectedDest.image}
                  alt={`Private jet approaching ${selectedDest.city}`}
                  className="w-20 h-20 rounded-2xl object-cover"
                />
                <div>
                  <h3 className="text-2xl font-medium">{selectedDest.city}</h3>
                  <p className="text-sm opacity-60 uppercase tracking-widest font-semibold">
                    {selectedDest.country}
                  </p>
                </div>
              </div>
              <p className="text-sm opacity-80 leading-relaxed mb-6">
                {selectedDest.description}
              </p>

              <button className="w-full bg-black text-white dark:bg-white dark:text-black py-3.5 rounded-full font-medium hover:bg-black/90 dark:hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
                Search Flights to {selectedDest.city}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {!selectedDest && (
            <div className="absolute top-6 left-6 right-6 md:left-1/2 md:-translate-x-1/2 bg-black/80 dark:bg-white/90 backdrop-blur text-white dark:text-black px-6 py-3 rounded-full text-sm font-medium flex items-center justify-center gap-3 shadow-xl max-w-sm pointer-events-none w-max mx-auto animate-in fade-in duration-500 z-[400]">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand"></span>
              </span>
              Select a marker on the map to explore
            </div>
          )}
        </div>
      </div>

      {/* Spiritual Yatras */}
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mb-24 md:mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h4 className="text-black/50 dark:text-white/50 text-sm mb-3 font-medium tracking-wide uppercase">
              Sacred Journeys
            </h4>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              Spiritual Yatras
            </h2>
          </div>
          <p className="text-black/60 dark:text-white/60 max-w-md text-base leading-relaxed">
            Experience profound peace of mind with our exclusive helicopter and
            jet charters designed specifically for India's holiest pilgrimage
            sites.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {spiritualYatras.map((yatra, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] cursor-pointer"
            >
              <img
                src={yatra.image}
                alt={`Aerial view of ${yatra.city} pilgrimage site in ${yatra.state}`}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-start translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-white/80 text-xs font-medium tracking-widest uppercase mb-2">
                  {yatra.state}
                </span>
                <h3
                  className="text-white text-2xl font-medium mb-3"
                  style={{ letterSpacing: "-0.02em" }}
                >
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
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-neutral-950 border border-gray-100 dark:border-white/10 rounded-[2rem] md:rounded-3xl p-8 sm:p-12 md:p-20 text-center flex flex-col items-center">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-4 md:mb-6"
            style={{ letterSpacing: "-0.03em" }}
          >
            Can't find your destination?
          </h2>
          <p className="text-black/60 dark:text-white/60 text-base md:text-lg max-w-xl mx-auto mb-8 md:mb-10">
            We fly to over 7,000 airports globally. Request a quote for any
            route, and our team will arrange the perfect charter for you.
          </p>
          <button className="inline-flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black text-lg font-medium px-8 py-3.5 rounded-full hover:bg-gray-800 dark:hover:bg-neutral-200 transition-colors duration-200">
            Request Custom Route
            <ArrowRight className="w-5 h-5 text-white dark:text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}
