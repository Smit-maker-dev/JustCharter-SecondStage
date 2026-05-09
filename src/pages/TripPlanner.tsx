import { Helmet } from 'react-helmet-async';
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { Plane, Calendar, Users, MapPin, Search, CheckCircle2, Navigation, ChevronDown, ChevronUp, Info, Coffee, ChevronLeft, ChevronRight, Sparkles, Wand2, Share2, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import { ClientOnly } from '../components/ClientOnly';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { AIRPORTS, Airport } from '../data/airports';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isBefore, startOfToday } from 'date-fns';

// Fix for default marker icon in leaflet
const icon = L.divIcon({
  className: 'custom-leaflet-icon',
  html: `<div style="background-color: black; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

// Mock data for suggested options
const MOCK_OPTIONS = [
  {
    id: 1,
    aircraft: 'Citation Latitude',
    type: 'Midsize Jet',
    duration: '2h 45m',
    price: '$18,500',
    seats: 9,
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&q=75&fm=webp&auto=format',
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
    image: 'https://images.unsplash.com/photo-1583072233615-5858cf818af0?w=1200&q=75&fm=webp&auto=format',
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
    image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?w=1200&q=75&fm=webp&auto=format',
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
<Helmet><title>AI Trip Planner | Plan Your Private Jet Trip | JustCharter</title><meta name="description" content="AI Trip Planner | Plan Your Private Jet Trip | JustCharter" /><script type="application/ld+json">{`{ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://just-charter-second-stage.vercel.app/" }, { "@type": "ListItem", "position": 2, "name": "TripPlanner", "item": "https://just-charter-second-stage.vercel.app/tripplanner" }]}`}</script></Helmet>
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

const CenterMap = ({ bounds }: { bounds: L.LatLngBoundsExpression }) => {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map, bounds]);
  return null;
};

const FlightRouteMap = ({ departure, arrival, departureCoords, arrivalCoords }: { departure: string, arrival: string, departureCoords: [number, number], arrivalCoords: [number, number] }) => {
  // Leaflet uses [lat, lon], while d3-geo coords were [lon, lat]
  const start: [number, number] = [departureCoords[1], departureCoords[0]];
  const end: [number, number] = [arrivalCoords[1], arrivalCoords[0]];
  
  const bounds = L.latLngBounds(start, end);

  return (
    <div className="w-full h-[250px] sm:h-[300px] bg-neutral-100 dark:bg-neutral-800 border border-black/5 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm relative mb-8 z-0">
      <ClientOnly fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg" />}>
        <Suspense>
          <MapContainer 
            scrollWheelZoom={false}
            dragging={false}
            touchZoom={false}
            className="w-full h-full outline-none"
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            />
            <CenterMap bounds={bounds} />
            
            <Polyline 
              positions={[start, end]} 
              color="black" 
              weight={3} 
              dashArray="6 6" 
              opacity={0.5} 
            />
            
            <Marker position={start} icon={icon}>
              <Popup>{departure || 'New York'}</Popup>
            </Marker>
            <Marker position={end} icon={icon}>
              <Popup>{arrival || 'London'}</Popup>
            </Marker>
          </MapContainer>
        </Suspense>
      </ClientOnly>
      <div className="absolute top-4 left-4 right-4 sm:right-auto bg-white/90 dark:bg-black/80 backdrop-blur px-5 py-3 rounded-2xl border border-black/10 dark:border-white/10 shadow-sm flex flex-col gap-1 z-[400]">
        <span className="text-[10px] font-bold tracking-widest uppercase text-black/50 dark:text-white/50">Flight Path Highlights</span>
        <span className="font-medium text-sm flex items-center gap-2">
          {departure || 'New York'}
          <Plane className="w-3 h-3 text-black/40 dark:text-white/40" />
          {arrival || 'London'}
        </span>
      </div>
    </div>
  );
};

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const p = 0.017453292519943295;
  const c = Math.cos;
  const a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  return 12742 * Math.asin(Math.sqrt(a));
};

const AirportAutocomplete = ({ name, id, placeholder, onSelect, error, onChange }: { name: string, id?: string, placeholder: string, onSelect: (airport: Airport | null) => void, error?: string, onChange?: () => void }) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [isSearchingNearby, setIsSearchingNearby] = useState(false);
  const [nearbyAirports, setNearbyAirports] = useState<{airport: Airport, distance: number}[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = query.length > 0 ? AIRPORTS.filter(a => 
    a.city.toLowerCase().includes(query.toLowerCase()) || 
    a.code.toLowerCase().includes(query.toLowerCase()) || 
    a.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 50) : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    let active = true;
    if (query.length > 2 && filtered.length === 0) {
      setIsSearchingNearby(true);
      const timer = setTimeout(async () => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`);
          if (!res.ok) throw new Error('API Error');
          const data = await res.json();
          if (data && data.length > 0 && active) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            const airportsWithDist = AIRPORTS.map(a => ({
              airport: a,
              distance: getDistance(lat, lon, a.lat, a.lon)
            })).sort((a, b) => a.distance - b.distance).slice(0, 5);
            setNearbyAirports(airportsWithDist);
          } else if (active) {
            setNearbyAirports([]);
          }
        } catch (e) {
          if (active) setNearbyAirports([]);
        } finally {
          if (active) setIsSearchingNearby(false);
        }
      }, 700);
      return () => { active = false; clearTimeout(timer); };
    } else {
      setNearbyAirports([]);
      setIsSearchingNearby(false);
    }
    return () => { active = false; };
  }, [query, filtered.length]);

  return (
    <div className="relative" ref={containerRef}>
      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40 dark:text-white/40" />
      <input
        id={id}
        name={name}
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          onSelect(null);
          onChange?.();
        }}
        onFocus={() => setOpen(true)}
        className={`w-full bg-gray-50 dark:bg-black/50 border ${error ? 'border-red-500/50 focus:ring-red-500/20 text-red-900 dark:text-red-100 placeholder:text-red-500/50' : 'border-black/10 dark:border-white/10 focus:ring-black/5 dark:focus:ring-white/5 text-black dark:text-white'} rounded-2xl px-12 py-3.5 sm:py-4 focus:outline-none focus:ring-2 transition-all`}
      />
      {error && <p className="text-red-500 text-xs font-medium mt-1.5 ml-2 absolute -bottom-5">{error}</p>}
      {open && query.length > 0 && (
        <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-2xl shadow-xl max-h-[300px] overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.map(a => (
              <div 
                key={a.code}
                className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer flex justify-between items-center border-b border-black/5 dark:border-white/5 last:border-0"
                onClick={() => {
                  setQuery(`${a.city} (${a.code})`);
                  setOpen(false);
                  onSelect(a);
                }}
              >
                <div>
                  <div className="font-medium text-sm">{a.city}</div>
                  <div className="text-xs text-black/50 dark:text-white/50">{a.name}</div>
                </div>
                <div className="font-bold text-sm tracking-widest bg-black/5 dark:bg-white/10 px-2 py-1 rounded-md">{a.code}</div>
              </div>
            ))
          ) : isSearchingNearby ? (
             <div className="px-4 py-5 text-center text-sm text-black/50 dark:text-white/50">
               <div className="w-5 h-5 mx-auto mb-2 border-2 border-black/30 dark:border-white/30 border-t-black dark:border-t-white rounded-full animate-spin" />
               Searching for nearby airports...
             </div>
          ) : nearbyAirports.length > 0 ? (
             <div>
               <div className="px-4 py-2 bg-black/5 dark:bg-white/5 text-xs font-semibold text-black/50 dark:text-white/50 uppercase tracking-widest">
                 Suggested nearby airports
               </div>
               {nearbyAirports.map(({airport: a, distance}) => (
                 <div 
                   key={a.code}
                   className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer flex justify-between items-center border-b border-black/5 dark:border-white/5 last:border-0"
                   onClick={() => {
                     setQuery(`${a.city} (${a.code})`);
                     setOpen(false);
                     onSelect(a);
                   }}
                 >
                   <div>
                     <div className="font-medium text-sm">{a.city}</div>
                     <div className="text-xs text-black/50 dark:text-white/50">{a.name} <span className="inline-block ml-1 px-1.5 py-0.5 bg-brand/10 text-brand rounded text-[10px]">{Math.round(distance)} km</span></div>
                   </div>
                   <div className="font-bold text-sm tracking-widest bg-black/5 dark:bg-white/10 px-2 py-1 rounded-md">{a.code}</div>
                 </div>
               ))}
             </div>
          ) : (
            <div className="px-4 py-5 text-center text-sm text-black/50 dark:text-white/50">
               No airports found. Try another location.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const CustomDatePicker = ({ id, date, setDate, placeholder = "Select date", error }: { id?: string, date: Date | null, setDate: (d: Date) => void, placeholder?: string, error?: string }) => {
  const [open, setOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(date || startOfToday()));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const nextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const prevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isBefore(startOfMonth(subMonths(currentMonth, 1)), startOfMonth(startOfToday()))) {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
  };

  const handleDateClick = (d: Date) => {
    if (!isBefore(d, startOfToday())) {
      setDate(d);
      setOpen(false);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <Calendar className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${error ? 'text-red-500/50' : 'text-black/40 dark:text-white/40'} pointer-events-none`} />
      <div 
        id={id}
        onClick={() => setOpen(!open)}
        className={`w-full bg-gray-50 dark:bg-black/50 border ${error ? 'border-red-500/50 ring-red-500/20' : 'border-black/10 dark:border-white/10 focus:ring-black/5 dark:focus:ring-white/5'} rounded-2xl px-12 py-3.5 sm:py-4 focus:outline-none focus:ring-2 transition-all cursor-pointer select-none flex items-center ${error ? 'text-red-900 dark:text-red-100' : 'text-black dark:text-white'}`}
      >
        <span className={date ? "" : (error ? "text-red-500/50 w-full" : "text-black/50 dark:text-white/50 w-full")}>{date ? format(date, 'MMM dd, yyyy') : placeholder}</span>
        <ChevronDown className="absolute right-4 w-5 h-5 text-black/40 dark:text-white/40 pointer-events-none" />
      </div>
      {error && <p className="text-red-500 text-xs font-medium mt-1.5 ml-2 absolute -bottom-5">{error}</p>}
      
      {open && (
        <div className="absolute z-50 top-full left-0 mt-2 bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-3xl shadow-xl p-4 w-full sm:w-[320px]">
          <div className="flex justify-between items-center mb-4 px-2">
            <button aria-label="Previous month" type="button" onClick={prevMonth} className={`p-1.5 rounded-full transition-colors ${!isBefore(startOfMonth(subMonths(currentMonth, 1)), startOfMonth(startOfToday())) ? 'hover:bg-gray-100 dark:hover:bg-neutral-800' : 'opacity-30 cursor-not-allowed'}`}>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="font-medium">{format(currentMonth, 'MMMM yyyy')}</div>
            <button aria-label="Next month" type="button" onClick={nextMonth} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center mb-2 px-1">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-[11px] font-semibold text-black/40 dark:text-white/40 uppercase tracking-widest">{day}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1 px-1">
            {Array.from({ length: startOfMonth(currentMonth).getDay() }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {daysInMonth.map(d => {
              const isPast = isBefore(d, startOfToday()) && !isToday(d);
              const isSelected = date ? isSameDay(d, date) : false;
              return (
                <button
                  type="button"
                  key={d.toISOString()}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDateClick(d); }}
                  disabled={isPast}
                  className={`
                    w-full aspect-square rounded-full flex items-center justify-center text-sm md:text-[15px] transition-all relative group
                    ${isPast ? 'opacity-30 cursor-not-allowed' : 'hover:bg-brand/10 hover:text-brand'}
                    ${isSelected ? 'bg-brand text-white hover:bg-brand hover:text-white shadow-md' : ''}
                    ${isToday(d) && !isSelected ? 'text-brand font-bold' : ''}
                  `}
                >
                  <span className="relative z-10">{format(d, 'd')}</span>
                  {isToday(d) && !isSelected && <span className="absolute bottom-1 w-1 h-1 bg-brand rounded-full"></span>}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const CustomDropdown = ({ id, options, value, onChange, icon: Icon, placeholder }: { id?: string, options: {label: string, value: string}[], value: string, onChange: (val: string) => void, icon?: any, placeholder?: string }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.value === value);

  return (
    <div className="relative" ref={containerRef}>
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40 dark:text-white/40 pointer-events-none" />}
      <div 
        id={id}
        onClick={() => setOpen(!open)}
        className="w-full bg-gray-50 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-2xl px-12 py-3.5 sm:py-4 focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 transition-all text-black dark:text-white cursor-pointer select-none flex items-center"
      >
        <span className={selectedOption ? "" : "text-black/50 dark:text-white/50 w-full"}>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown className={`absolute right-4 w-5 h-5 text-black/40 dark:text-white/40 pointer-events-none transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </div>
      
      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-2xl shadow-xl max-h-60 overflow-y-auto py-2">
          {options.map(option => (
            <div 
              key={option.value}
              className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer flex items-center justify-between transition-colors ${option.value === value ? 'text-brand font-medium bg-brand/5 dark:bg-brand/10' : ''}`}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              <span>{option.label}</span>
              {option.value === value && <CheckCircle2 className="w-4 h-4 text-brand" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      components={{
        h2: ({ node, ...props }) => (
          <h2 className="text-xl md:text-2xl font-semibold mt-12 mb-6 flex items-center gap-3 text-black dark:text-white group/h2" {...props}>
            <span className="w-1 h-8 bg-brand rounded-full transition-all group-hover/h2:h-10" />
            {props.children}
          </h2>
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-[11px] font-bold mt-8 mb-4 text-brand uppercase tracking-[0.25em] flex items-center gap-2" {...props}>
            <div className="h-px flex-1 bg-black/5 dark:bg-white/10" />
            <span>{props.children}</span>
            <div className="h-px flex-1 bg-black/5 dark:bg-white/10" />
          </h3>
        ),
        p: ({ node, ...props }) => (
          <p className="mb-6 leading-[1.8] text-black/70 dark:text-white/70 text-sm md:text-lg font-light" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="mb-8 space-y-4" {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="flex items-start gap-4 p-4 bg-black/[0.02] dark:bg-white/[0.02] rounded-2xl border border-black/5 dark:border-white/5 transition-all hover:border-brand/30">
            <CheckCircle2 className="w-5 h-5 text-brand mt-0.5 shrink-0" />
            <span className="text-black/80 dark:text-white/80 text-sm md:text-base leading-relaxed">{props.children}</span>
          </li>
        ),
        blockquote: ({ node, ...props }) => (
          <div className="my-10 relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-brand/30 rounded-full" />
            <div className="p-6 md:p-8 bg-gradient-to-br from-brand/10 to-transparent dark:from-brand/20 rounded-3xl border border-brand/10 italic text-base md:text-xl text-black/90 dark:text-white/95 font-medium leading-relaxed shadow-sm">
              <span className="text-4xl text-brand/20 font-serif absolute -top-4 -left-2 tracking-tighter">"</span>
              {props.children}
            </div>
          </div>
        ),
        strong: ({ node, ...props }) => (
          <strong className="font-semibold text-black dark:text-white px-1 py-0.5 bg-black/5 dark:bg-white/10 rounded" {...props} />
        )
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default function TripPlanner() {
  const [mounted, setMounted] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [aiText, setAiText] = useState('');
  const [aiError, setAiError] = useState('');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [departureCoords, setDepartureCoords] = useState<[number, number]>([-74.006, 40.7128]);
  const [arrivalCoords, setArrivalCoords] = useState<[number, number]>([-0.1276, 51.5072]);

  const [selectedDepAirport, setSelectedDepAirport] = useState<Airport | null>(null);
  const [selectedArrAirport, setSelectedArrAirport] = useState<Airport | null>(null);
  const [flightDate, setFlightDate] = useState<Date | null>(null);
  const [passengers, setPassengers] = useState<string>("1");
  const [aircraftClass, setAircraftClass] = useState<string>("any");
  const [formErrors, setFormErrors] = useState<{departure?: string; arrival?: string; date?: string}>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dep = formData.get('departure') as string;
    const arr = formData.get('arrival') as string;
    const aiPrompt = formData.get('aiPrompt') as string;

    const newErrors: {departure?: string; arrival?: string; date?: string} = {};
    if (!aiPrompt?.trim()) {
      if (!dep || dep.trim() === '') newErrors.departure = "Departure location is required";
      if (!arr || arr.trim() === '') newErrors.arrival = "Arrival location is required";
      if (!flightDate) newErrors.date = "Please select a departure date";

      if (Object.keys(newErrors).length > 0) {
        setFormErrors(newErrors);
        return;
      }
    }

    setFormErrors({});
    setIsSearching(true);

    if (dep) setDeparture(dep);
    if (arr) setArrival(arr);

    const fetchCoords = async (place: string): Promise<[number, number] | null> => {
      // Find exactly in AIRPORTS first, checking by city/code combination string 
      const matched = AIRPORTS.find(a => `${a.city} (${a.code})` === place);
      if (matched) return [matched.lon, matched.lat];

      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`);
        const data = await res.json();
        if (data && data.length > 0) {
          return [parseFloat(data[0].lon), parseFloat(data[0].lat)];
        }
      } catch (e) {
        console.error("Geocoding error", e);
      }
      return null;
    };

    if (dep && arr) {
      const [c1, c2] = await Promise.all([
        selectedDepAirport ? Promise.resolve([selectedDepAirport.lon, selectedDepAirport.lat] as [number, number]) : fetchCoords(dep), 
        selectedArrAirport ? Promise.resolve([selectedArrAirport.lon, selectedArrAirport.lat] as [number, number]) : fetchCoords(arr)
      ]);
      if (c1) setDepartureCoords(c1);
      if (c2) setArrivalCoords(c2);
    }

    setAiText('');
    setAiError('');
    setHasSearched(true);
    
    try {
      const prompt = aiPrompt?.trim() ? aiPrompt : `Act as a senior executive charter consultant for JustCharter. Analyze the mission from ${dep} to ${arr} for ${passengers} passengers on ${flightDate ? format(flightDate, 'MMM do, yyyy') : 'an upcoming date'}. Recommend the optimal aircraft from the ${aircraftClass} category.

Structure your response using Markdown:
1. Start with a brief, high-end "Executive Mission Summary".
2. Use ## for the recommended Aircraft (e.g. ## Global 7500).
3. Use ### PERFORMANCE & INTERIOR for technical specifications.
4. Use a > block for a "Broker's Intelligent Insight" - something technical or luxury-focused about this specific aircraft or route.
5. Finish with a "FLIGHT DYNAMICS" section detailing Estimated Flight Time (EFT), potential fuel considerations, and approximate pricing range.
6. Use professional, confident, and technical language suitable for high-net-worth clients.`;
      
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      let text = '';
      for await (const chunk of response) {
        text += chunk.text;
        setAiText(text);
      }
    } catch (err) {
      console.error(err);
      setAiError('Failed to fetch AI recommendations. Please check your connection.');
    } finally {
      setIsSearching(false);
    }
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
          <div className="lg:col-span-4 h-fit lg:sticky lg:top-32">
            <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-3xl p-5 sm:p-8 shadow-sm relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand/5 dark:bg-brand/10 rounded-full blur-3xl pointer-events-none" />
              
              <h2 className="text-xl sm:text-2xl font-medium mb-6 flex items-center gap-2 relative z-10">
                <Navigation className="w-5 h-5 text-black/50 dark:text-white/50" />
                Flight Details
              </h2>
              
              <form onSubmit={handleSearch} className="space-y-4 sm:space-y-5">
                <div className="space-y-1.5 pb-2">
                  <label htmlFor="aiPrompt" className="text-sm font-medium text-black/70 dark:text-white/70 ml-1">Describe your trip</label>
                  <textarea 
                    id="aiPrompt"
                    name="aiPrompt"
                    rows={3}
                    placeholder="E.g., Plan a weekend in Monaco next month for 4 people..."
                    className="w-full bg-gray-50 dark:bg-black/50 border border-black/10 dark:border-white/10 focus:ring-black/5 dark:focus:ring-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 transition-all text-black dark:text-white"
                  />
                  <div className="flex flex-wrap gap-2 mt-2 ml-1">
                    {["Plan a weekend in Monaco", "Business trip London to Dubai", "European city hopping"].map((chip, idx) => (
                      <button 
                        key={idx}
                        type="button"
                        onClick={(e) => {
                          const form = e.currentTarget.closest('form');
                          if (form) {
                            const textarea = form.querySelector('textarea[name="aiPrompt"]') as HTMLTextAreaElement;
                            if (textarea) textarea.value = chip;
                          }
                        }}
                        className="text-xs bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full px-3 py-1.5 transition-colors text-black/70 dark:text-white/70"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 my-2">
                  <div className="flex-1 h-px bg-black/5 dark:bg-white/5" />
                  <span className="text-xs font-medium text-black/40 dark:text-white/40 uppercase tracking-widest">OR USE FORM</span>
                  <div className="flex-1 h-px bg-black/5 dark:bg-white/5" />
                </div>

                <div className="space-y-1.5 pb-2">
                  <label htmlFor="departure" className="text-sm font-medium text-black/70 dark:text-white/70 ml-1">Departure</label>
                  <AirportAutocomplete 
                    name="departure" 
                    id="departure"
                    placeholder="City or Airport Code" 
                    onSelect={setSelectedDepAirport}
                    error={formErrors.departure}
                    onChange={() => setFormErrors(prev => ({...prev, departure: undefined}))}
                  />
                </div>

                <div className="space-y-1.5 pb-2">
                  <label htmlFor="arrival" className="text-sm font-medium text-black/70 dark:text-white/70 ml-1">Arrival</label>
                  <AirportAutocomplete 
                    name="arrival" 
                    id="arrival"
                    placeholder="City or Airport Code" 
                    onSelect={setSelectedArrAirport}
                    error={formErrors.arrival}
                    onChange={() => setFormErrors(prev => ({...prev, arrival: undefined}))}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
                  <div className="space-y-1.5">
                    <label htmlFor="flightDate" className="text-sm font-medium text-black/70 dark:text-white/70 ml-1">Date</label>
                    <CustomDatePicker 
                      id="flightDate"
                      date={flightDate} 
                      setDate={(d) => { setFlightDate(d); setFormErrors(prev => ({...prev, date: undefined})); }} 
                      placeholder="Departure Date" 
                      error={formErrors.date}
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label htmlFor="passengers" className="text-sm font-medium text-black/70 dark:text-white/70 ml-1">Passengers</label>
                    <CustomDropdown
                      id="passengers"
                      icon={Users}
                      value={passengers}
                      onChange={setPassengers}
                      options={[
                        { label: '1 Passenger', value: '1' },
                        { label: '2 Passengers', value: '2' },
                        { label: '3 Passengers', value: '3' },
                        { label: '4 Passengers', value: '4' },
                        { label: '5 Passengers', value: '5' },
                        { label: '6 Passengers', value: '6' },
                        { label: '7 Passengers', value: '7' },
                        { label: '8+ Passengers', value: '8' },
                      ]}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="aircraftClass" className="text-sm font-medium text-black/70 dark:text-white/70 ml-1">Aircraft Class</label>
                  <CustomDropdown
                    id="aircraftClass"
                    icon={Plane}
                    value={aircraftClass}
                    onChange={setAircraftClass}
                    options={[
                      { label: 'Any Class', value: 'any' },
                      { label: 'Light Jet', value: 'light' },
                      { label: 'Midsize Jet', value: 'midsize' },
                      { label: 'Heavy Jet', value: 'heavy' },
                      { label: 'Ultra Long Range', value: 'ultra-long' },
                    ]}
                  />
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
                <FlightRouteMap departure={departure} arrival={arrival} departureCoords={departureCoords} arrivalCoords={arrivalCoords} />
                
                {/* AI Recommendations */}
                {(aiText || isSearching || aiError) && (
                  <div className="bg-white dark:bg-neutral-900 border-2 border-brand/20 dark:border-brand/10 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-[0.03] dark:opacity-[0.05] group-hover:scale-110 transition-transform duration-700">
                      <Sparkles className="w-48 h-48" />
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-brand/10 dark:bg-brand/20 rounded-2xl">
                          <Wand2 className="w-7 h-7 text-brand" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-medium">AI Broker Recommendations</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <p className="text-[10px] font-bold tracking-widest uppercase text-black/40 dark:text-white/40">Broker Online | Low Latency</p>
                          </div>
                        </div>
                      </div>
                      
                      {!isSearching && aiText && (
                        <div className="flex gap-2">
                          <button className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-black/50 dark:text-white/50" aria-label="Bookmark">
                            <Bookmark className="w-5 h-5" />
                          </button>
                          <button className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-black/50 dark:text-white/50" aria-label="Share">
                            <Share2 className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {aiError ? (
                      <div className="bg-red-50 dark:bg-red-900/10 text-red-800 dark:text-red-400 p-6 rounded-3xl text-sm mb-6 flex items-center gap-4 border border-red-100 dark:border-red-900/20">
                        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                          <Info className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold mb-0.5">Consultation Interrupted</p>
                          <p className="opacity-80">{aiError}</p>
                        </div>
                        <button 
                          onClick={() => {
                            const form = document.querySelector('form');
                            if (form) form.requestSubmit();
                          }}
                          className="px-5 py-2 bg-red-800 dark:bg-red-600 text-white rounded-full text-xs font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20"
                        >
                          Retry
                        </button>
                      </div>
                    ) : null}

                    {aiText ? (
                      <div>
                        <div className="prose-none transition-all duration-700 ease-out animate-in fade-in slide-in-from-bottom-4">
                          <MarkdownRenderer content={aiText} />
                          {isSearching && <span className="inline-block w-3 h-5 ml-2 bg-brand animate-pulse align-middle rounded-sm shadow-[0_0_10px_rgba(var(--color-brand-rgb),0.5)]" />}
                        </div>
                        
                        {!isSearching && (
                          <div className="mt-12 pt-10 border-t border-black/10 dark:border-white/10 flex flex-wrap gap-6 items-center">
                            <div className="flex -space-x-3 items-center">
                              {[1, 2, 3].map(i => (
                                <div key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-neutral-900 bg-gray-200 dark:bg-neutral-800 overflow-hidden shadow-sm">
                                  <img src={`https://i.pravatar.cc/100?u=charter_${i}`} alt="Broker avatar" className="w-full h-full object-cover" />
                                </div>
                              ))}
                              <div className="w-12 h-12 rounded-full border-4 border-white dark:border-neutral-900 bg-black text-white text-[11px] flex items-center justify-center font-bold shadow-lg">
                                +12
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-bold text-black dark:text-white mb-0.5 tracking-wide">Executive Review Team</p>
                              <p className="text-[10px] uppercase tracking-widest text-black/40 dark:text-white/40">Verified by Ops | Available 24/7</p>
                            </div>

                            <Link 
                               to={`/contact?trip=${encodeURIComponent(aiText.substring(0, 100))}`}
                              className="px-10 py-4 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold hover:bg-brand hover:text-white dark:hover:bg-brand dark:hover:text-white transition-all transform hover:scale-105 active:scale-95 text-sm ml-auto shadow-2xl shadow-brand/20 group/btn flex items-center gap-2"
                            >
                              Finalize Booking
                              <Navigation className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </Link>
                          </div>
                        )}
                      </div>
                    ) : isSearching && !aiText && !aiError ? (
                      <div className="space-y-10 py-6">
                        <div className="flex items-center gap-5 text-black/80 dark:text-white/90">
                          <div className="relative">
                            <div className="w-10 h-10 border-4 border-brand/20 border-t-brand rounded-full animate-spin" />
                            <Wand2 className="w-4 h-4 text-brand absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                          </div>
                          <div>
                            <span className="font-bold text-lg tracking-tight block">Intelligent Flight Analysis</span>
                            <span className="text-xs uppercase tracking-[0.2em] opacity-40">Scanning 42,000 Private Terminals</span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="h-4 bg-gradient-to-r from-black/5 via-black/10 to-black/5 dark:from-white/5 dark:via-white/10 dark:to-white/5 rounded-full w-full animate-pulse" />
                          <div className="h-4 bg-gradient-to-r from-black/5 via-black/10 to-black/5 dark:from-white/5 dark:via-white/10 dark:to-white/5 rounded-full w-[92%] animate-pulse delay-75" />
                          <div className="h-4 bg-gradient-to-r from-black/5 via-black/10 to-black/5 dark:from-white/5 dark:via-white/10 dark:to-white/5 rounded-full w-[96%] animate-pulse delay-150" />
                          <div className="h-4 bg-gradient-to-r from-black/5 via-black/10 to-black/5 dark:from-white/5 dark:via-white/10 dark:to-white/5 rounded-full w-[85%] animate-pulse delay-300" />
                        </div>
                      </div>
                    ) : null}

                    {!aiText && !isSearching && !aiError && (
                      <div className="py-20 text-center space-y-6">
                        <div className="w-20 h-20 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Sparkles className="w-10 h-10 text-black/20 dark:text-white/20" />
                        </div>
                        <h4 className="text-xl font-medium">Consultation Pending</h4>
                        <p className="text-black/50 dark:text-white/50 max-w-xs mx-auto">Input your journey parameters and our proprietary AI will curate a personalized mission profile for you.</p>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <div>
                    <h3 className="text-2xl font-medium">Standard Fleet Options</h3>
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
