import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ArrowRight, Plane, Users, Package, Clock, ShieldCheck, HeartPulse, ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import ServicesPage from './pages/Services';
import DestinationsPage from './pages/Destinations';
import MembersPage from './pages/Members';
import AboutPage from './pages/About';
import EmptyLegsPage from './pages/EmptyLegs';
import FleetPage from './pages/Fleet';
import AircraftDetailsPage from './pages/AircraftDetails';

const LogoIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 256 256"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M 128 16 L 240 224 L 128 192 L 16 224 Z" />
  </svg>
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-20 px-6 py-5">
      <div className="max-w-[88rem] mx-auto w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <LogoIcon className="w-7 h-7 text-black" />
          <span className="text-2xl font-medium tracking-tight text-black">JustCharter</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/fleet" className="text-base text-gray-700 hover:text-black font-medium transition-colors duration-200">
            Fleet
          </Link>
          <Link to="/destinations" className="text-base text-gray-700 hover:text-black font-medium transition-colors duration-200">
            Destinations
          </Link>
          <Link to="/services" className="text-base text-gray-700 hover:text-black font-medium transition-colors duration-200">
            Services
          </Link>
          <Link to="/empty-legs" className="text-base text-gray-700 hover:text-black font-medium transition-colors duration-200">
            Empty Legs
          </Link>
          <Link to="/members" className="text-base text-gray-700 hover:text-black font-medium transition-colors duration-200">
            Members
          </Link>
          <Link to="/about" className="text-base text-gray-700 hover:text-black font-medium transition-colors duration-200">
            About
          </Link>
        </div>
        <div>
          <button className="bg-black text-white text-base font-medium px-7 py-2.5 rounded-full hover:bg-gray-800 transition-colors duration-200">
            Book a Flight
          </button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const brandList = [
    { name: 'Gulfstream', style: { fontFamily: 'Georgia, serif', fontWeight: 700, letterSpacing: '-0.02em', fontSize: '15px' } },
    { name: 'Bombardier', style: { fontFamily: 'Arial, sans-serif', fontWeight: 900, letterSpacing: '0.08em', fontSize: '13px', textTransform: 'uppercase' as const } },
    { name: 'Dassault', style: { fontFamily: 'Trebuchet MS', fontWeight: 600, letterSpacing: '0.01em', fontSize: '15px', fontStyle: 'italic' } },
    { name: 'Embraer', style: { fontFamily: 'Courier New, monospace', fontWeight: 700, letterSpacing: '0.12em', fontSize: '13px', textTransform: 'uppercase' as const } },
    { name: 'Cessna', style: { fontFamily: 'Palatino, Book Antiqua', fontWeight: 400, letterSpacing: '-0.01em', fontSize: '16px' } },
    { name: 'Pilatus', style: { fontFamily: 'Impact, Arial Narrow', fontWeight: 400, letterSpacing: '0.04em', fontSize: '14px' } },
    { name: 'Beechcraft', style: { fontFamily: 'Verdana, sans-serif', fontWeight: 700, letterSpacing: '-0.03em', fontSize: '13px' } },
  ];

  return (
    <div className="flex-1 px-6 pt-20 pb-6 flex items-end">
      <div className="relative w-full max-w-[88rem] mx-auto rounded-2xl overflow-hidden" style={{ height: 'calc(100vh - 96px)' }}>
        <div className="absolute inset-0 w-full h-full bg-black">
          <img
            referrerPolicy="no-referrer"
            className="object-cover absolute inset-0 w-full h-full animate-fade-1"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/N975QS_2002_Cessna_750_C-N_750-0175_Citation_X_%287039507775%29.jpg/1280px-N975QS_2002_Cessna_750_C-N_750-0175_Citation_X_%287039507775%29.jpg"
            alt="Private Jet Flying"
          />
          <img
            referrerPolicy="no-referrer"
            className="object-cover absolute inset-0 w-full h-full animate-fade-2"
            src="https://upload.wikimedia.org/wikipedia/commons/4/4d/BBJ_interior_2011.jpg"
            alt="Luxury Interior"
          />
        </div>
        <div className="relative z-10 flex flex-col items-start justify-start h-full p-12 pt-36 bg-gradient-to-r from-white/60 to-transparent backdrop-blur-[2px]">
          <h1 className="text-black text-5xl md:text-6xl font-medium leading-tight max-w-xl mb-4" style={{ letterSpacing: '-0.04em' }}>
            Your Journey,<br />Elevated.
          </h1>
          <p className="text-black/80 text-base md:text-lg max-w-md mb-8 leading-relaxed" style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}>
            An exclusive, on-demand charter network built for seamless bookings, absolute privacy, and unparalleled luxury travel.
          </p>
          <button className="inline-flex items-center gap-3 bg-black text-white text-base md:text-lg font-medium pl-8 pr-2 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200">
            Explore Fleet
            <span className="bg-white rounded-full p-2 flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-black" />
            </span>
          </button>

          <div className="mt-24 w-full max-w-md overflow-hidden mask-image-linear-gradient">
            <div className="marquee-track">
              {[...brandList, ...brandList].map((brand, i) => (
                <div key={i} className="mx-7 shrink-0 text-black/70 whitespace-nowrap" style={brand.style}>
                  {brand.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoSection() {
  return (
    <section className="bg-[#F5F5F5] px-6 py-24">
      <div className="max-w-[88rem] mx-auto w-full">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
          <div>
            <h2 className="text-black text-4xl md:text-5xl font-medium leading-tight mb-8" style={{ letterSpacing: '-0.03em' }}>
              Meet JustCharter.
            </h2>
            <button className="inline-flex items-center gap-3 bg-black text-white text-base font-medium pl-6 pr-1.5 py-1.5 rounded-full hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
              Discover more
              <span className="bg-white rounded-full p-1.5 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-black" />
              </span>
            </button>
          </div>
          <div>
            <p className="text-black/70 text-2xl md:text-3xl leading-relaxed">
              JustCharter is your personal gateway to private aviation and luxury travel. Skip the commercial lines and fly on your own terms, completely stress-free.
            </p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl sm:col-span-2 relative overflow-hidden">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Gulfstream_G650ER%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0749%29.jpg/1280px-Gulfstream_G650ER%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0749%29.jpg" 
              alt="Travel that inspires" 
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative p-7 min-h-80 flex flex-col justify-between z-10 h-full">
              <h3 className="text-white text-2xl font-medium leading-snug" style={{ letterSpacing: '-0.02em' }}>
                Travel that inspires
              </h3>
              <p className="text-white/90 text-base max-w-xs mt-8">
                Experience first-class comfort, exquisite dining, and total privacy every time you step on board.
              </p>
            </div>
          </div>

          <div className="bg-[#2B2644] rounded-2xl p-7 min-h-80 flex flex-col justify-between">
            <h3 className="text-white text-2xl font-medium leading-snug whitespace-pre-line" style={{ letterSpacing: '-0.02em' }}>
              {'Always ready,\nalways private.'}
            </h3>
            <p className="text-white/60 text-base mt-8">
              Gain on-demand access to a global fleet. No memberships required, no hidden fees.
            </p>
          </div>

          <div className="bg-[#2B2644] rounded-2xl p-7 min-h-80 flex flex-col justify-between">
            <h3 className="text-white text-2xl font-medium leading-snug whitespace-pre-line" style={{ letterSpacing: '-0.02em' }}>
              {'Fully\npersonalized'}
            </h3>
            <p className="text-white/60 text-base mt-8">
              From ground transportation to custom in-flight catering, your entire itinerary is handled by our concierge.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustedBySection() {
  const partners = [
    { name: 'AeroLux', style: { fontFamily: 'Times New Roman, serif', fontWeight: 400, letterSpacing: '0.02em', fontSize: '14px' } },
    { name: 'PRIMEJET', style: { fontFamily: 'Arial Black, sans-serif', fontWeight: 900, letterSpacing: '0.08em', fontSize: '16px' } },
    { name: 'GLOBALWINGS', style: { fontFamily: 'Impact', fontWeight: 700, letterSpacing: '0.05em', fontSize: '18px' } },
    { name: 'ApexAviation', style: { fontFamily: 'Georgia, serif', fontWeight: 600, letterSpacing: '-0.02em', fontSize: '17px' } },
    { name: 'Signature', style: { fontFamily: 'Helvetica, sans-serif', fontWeight: 700, letterSpacing: '-0.01em', fontSize: '15px' } },
    { name: 'ELITETRAVEL', style: { fontFamily: 'Verdana, sans-serif', fontWeight: 700, letterSpacing: '0.06em', fontSize: '14px', textTransform: 'uppercase' as const } },
    { name: 'NETWINGS', style: { fontFamily: 'Courier New, monospace', fontWeight: 700, letterSpacing: '0.18em', fontSize: '14px' } },
    { name: 'Virtuoso', style: { fontFamily: 'Palatino', fontWeight: 500, letterSpacing: '0.03em', fontSize: '15px' } },
  ];

  return (
    <section className="bg-[#F5F5F5] px-6 py-12">
      <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-center border-y border-black/5 py-12">
        <div className="md:col-span-1">
          <p className="text-black/70 text-base leading-relaxed whitespace-pre-line">
            {'Trusted by top executives\nand premium lifestyle brands.'}
          </p>
        </div>
        <div className="md:col-span-3 overflow-hidden">
          <div className="backers-track">
            {[...partners, ...partners].map((partner, i) => (
              <div key={i} className="mx-10 shrink-0 text-black/50 whitespace-nowrap" style={partner.style}>
                {partner.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    {
      icon: <Plane className="w-8 h-8 stroke-[1.5]" />,
      title: "Private Jet Charter",
      description: "On-demand access to a global fleet of private jets, tailored perfectly to your schedule and preferences."
    },
    {
      icon: <Users className="w-8 h-8 stroke-[1.5]" />,
      title: "Group Charter",
      description: "Dedicated aircraft for corporate events, sports teams, or large family gatherings, ensuring everyone travels together."
    },
    {
      icon: <HeartPulse className="w-8 h-8 stroke-[1.5]" />,
      title: "Air Ambulance",
      description: "Rapid-response medical evacuation and bed-to-bed transfers with specialized medical personnel on board."
    },
    {
      icon: <Package className="w-8 h-8 stroke-[1.5]" />,
      title: "Cargo Charter",
      description: "Urgent, oversized, or sensitive freight transport across the globe with guaranteed secure delivery."
    },
    {
      icon: <Clock className="w-8 h-8 stroke-[1.5]" />,
      title: "Empty Leg Flights",
      description: "Cost-effective luxury travel utilizing repositioning flights at significantly reduced charter rates."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 stroke-[1.5]" />,
      title: "Aircraft Management",
      description: "Comprehensive operational support, maintenance, and crew management for private aircraft owners."
    }
  ];

  return (
    <section className="bg-white px-6 py-24 border-t border-gray-100">
      <div className="max-w-[88rem] mx-auto w-full">
        <div className="mb-16">
           <h4 className="text-black/60 text-sm mb-3 font-medium tracking-wide uppercase">
            Our Services
          </h4>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6" style={{ letterSpacing: '-0.04em' }}>
            Comprehensive<br />Aviation Solutions
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {services.map((service, idx) => (
            <Link to="/services" key={idx} className="group block">
              <div className="mb-6 w-16 h-16 rounded-2xl bg-[#F5F5F5] flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-medium mb-4 group-hover:text-black/80 transition-colors" style={{ letterSpacing: '-0.02em' }}>{service.title}</h3>
              <p className="text-black/60 text-base leading-relaxed">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  return (
    <section className="bg-[#F5F5F5] px-6 py-24">
      <div className="max-w-[88rem] mx-auto w-full">
        <div className="mb-12 md:mb-16 max-w-2xl">
          <h4 className="text-black/60 text-sm mb-3 font-medium tracking-wide uppercase">
            JustCharter in Practice
          </h4>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6" style={{ letterSpacing: '-0.04em' }}>
            Tailored Journeys
          </h2>
          <p className="text-black/60 text-base md:text-lg leading-relaxed">
            Whether it's closing a crucial deal overseas, a spontaneous weekend getaway with family, or attending a major exclusive event, JustCharter adapts to your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">
          {/* Business Travel */}
          <div className="relative rounded-3xl overflow-hidden lg:col-span-8 group h-[400px] lg:h-full">
            <img
              referrerPolicy="no-referrer"
              className="object-cover absolute inset-0 w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
              src="https://upload.wikimedia.org/wikipedia/commons/4/4d/BBJ_interior_2011.jpg"
              alt="Business Travel"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-end items-start">
              <h3 className="text-white text-3xl md:text-4xl font-medium mb-4" style={{ letterSpacing: '-0.02em' }}>
                Business Travel
              </h3>
              <p className="text-white/85 text-base max-w-lg mb-8">
                Maximize efficiency with corporate charter solutions, offering total privacy to work and absolute schedule flexibility to keep you ahead of the competition.
              </p>
              <button className="inline-flex items-center gap-4 text-white text-base font-medium group/btn cursor-pointer w-fit">
                <span className="w-10 h-10 rounded-full bg-white/20 backdrop-blur border border-white/20 flex items-center justify-center group-hover/btn:bg-white transition-colors duration-200">
                  <ArrowRight className="w-4 h-4 text-white group-hover/btn:text-black transition-colors" />
                </span>
                View Corporate Solutions
              </button>
            </div>
          </div>
          
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Leisure Travel */}
            <div className="relative rounded-3xl overflow-hidden flex-1 group min-h-[300px]">
              <img
                referrerPolicy="no-referrer"
                className="object-cover absolute inset-0 w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Panoramic_view_of_Oia%2C_Santorini_island_%28Thira%29%2C_Greece.jpg/1280px-Panoramic_view_of_Oia%2C_Santorini_island_%28Thira%29%2C_Greece.jpg"
                alt="Leisure Travel"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <h3 className="text-white text-2xl font-medium mb-3" style={{ letterSpacing: '-0.02em' }}>
                  Leisure Getaways
                </h3>
                <p className="text-white/85 text-sm">
                  Seamlessly start your ultimate vacation from the very moment you step on board.
                </p>
              </div>
            </div>

            {/* Events / Group */}
            <div className="relative rounded-3xl overflow-hidden flex-1 group min-h-[300px]">
              <img
                referrerPolicy="no-referrer"
                className="object-cover absolute inset-0 w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Monte_Carlo_Port_Hercules_b.jpg/1280px-Monte_Carlo_Port_Hercules_b.jpg"
                alt="Group Charters"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <h3 className="text-white text-2xl font-medium mb-3" style={{ letterSpacing: '-0.02em' }}>
                  Group & Events
                </h3>
                <p className="text-white/85 text-sm">
                  Travel together to major sporting events or exclusive destinations in luxury.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FleetSection() {
  const fleet = [
    {
      category: 'Light Jets',
      name: 'Phenom 300E',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Embraer_505_Phenom_300%2C_Aerojet_JP7625910.jpg',
      pax: 'up to 7 pax',
      range: '2,010 nm',
    },
    {
      category: 'Midsize Jets',
      name: 'Citation Latitude',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/CS-LTI_Cessna_560_XLS_Citation_XLS_C56X_c_n_560-5798_-_NJE_%2843222541880%29.jpg/1280px-CS-LTI_Cessna_560_XLS_Citation_XLS_C56X_c_n_560-5798_-_NJE_%2843222541880%29.jpg',
      pax: 'up to 9 pax',
      range: '2,700 nm',
    },
    {
      category: 'Heavy Jets',
      name: 'Global 7500',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/2010-07-08_BD700_Tyrolean_OE-IGS_EDDF_03.jpg/1280px-2010-07-08_BD700_Tyrolean_OE-IGS_EDDF_03.jpg',
      pax: 'up to 14 pax',
      range: '7,700 nm',
    }
  ];

  return (
    <section className="bg-[#F5F5F5] px-6 py-24 border-y border-black/5">
      <div className="max-w-[88rem] mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h2 className="text-black text-4xl md:text-5xl font-medium leading-tight mb-4" style={{ letterSpacing: '-0.03em' }}>
              The Fleet.
            </h2>
            <p className="text-black/60 text-base md:text-lg max-w-md">
              A meticulously curated selection of the world's most advanced private aircraft, ready for any journey.
            </p>
          </div>
          <button className="inline-flex items-center gap-3 bg-white border border-black/10 text-black text-base font-medium px-6 py-2.5 rounded-full hover:bg-gray-50 transition-colors duration-200">
            View full fleet
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fleet.map((jet) => (
            <div key={jet.category} className="group cursor-pointer">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-6">
                <img 
                  src={jet.image} 
                  alt={jet.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:opacity-0" />
              </div>
              <p className="text-black/50 text-sm font-medium mb-1 tracking-wide uppercase">{jet.category}</p>
              <h3 className="text-2xl font-medium text-black mb-4" style={{ letterSpacing: '-0.02em' }}>{jet.name}</h3>
              <div className="flex items-center gap-6 border-t border-black/10 pt-4">
                <div>
                  <p className="text-black/50 text-xs mb-0.5">Capacity</p>
                  <p className="text-black font-medium">{jet.pax}</p>
                </div>
                <div>
                  <p className="text-black/50 text-xs mb-0.5">Range</p>
                  <p className="text-black font-medium">{jet.range}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AirAmbulanceSection() {
  return (
    <section className="bg-[#111111] px-6 py-24 text-white">
      <div className="max-w-[88rem] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group">
            <img
              referrerPolicy="no-referrer"
              className="object-cover absolute inset-0 w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/CH.SZ.Stoos_Fronalpstock_Sequence_Rescue-Helicopter_REGA_16K_16x9-R.jpg/1280px-CH.SZ.Stoos_Fronalpstock_Sequence_Rescue-Helicopter_REGA_16K_16x9-R.jpg"
              alt="Air Ambulance"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <div className="md:pl-8">
            <h4 className="text-white/50 text-sm mb-3 font-medium tracking-wide uppercase">
              Critical Care Transport
            </h4>
            <h2 className="text-4xl md:text-5xl font-medium leading-tight mb-6" style={{ letterSpacing: '-0.03em' }}>
              Air Ambulance &<br />Medical Evacuation
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-8 max-w-md">
              When every second counts, our global network provides rapid response air medical transport. Fully equipped with intensive care units and staffed by specialized medical teams, we ensure safe and efficient transfers worldwide.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                24/7 Global Dispatch
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                Bed-to-Bed Medical Care
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                Specialized Flight Nurses & Physicians
              </li>
            </ul>
            <button className="inline-flex items-center gap-3 bg-white text-black text-base font-medium px-7 py-3 rounded-full hover:bg-gray-100 transition-colors duration-200">
              Request Emergency Flight
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function YatrasSection() {
  const yatras = [
    { city: 'Char Dham', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Kedarnath_Temple_in_Rainy_season.jpg/1280px-Kedarnath_Temple_in_Rainy_season.jpg' },
    { city: 'Tirupati', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Tirumala_090615.jpg/1280px-Tirumala_090615.jpg' },
    { city: 'Varanasi', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Varanasi%2C_India%2C_Ghats%2C_Cremation_ceremony_in_progress.jpg/1280px-Varanasi%2C_India%2C_Ghats%2C_Cremation_ceremony_in_progress.jpg' },
    { city: 'Vaishno Devi', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Badrinath_Temple_%2C_Uttarakhand.jpg/1280px-Badrinath_Temple_%2C_Uttarakhand.jpg' }
  ];

  return (
    <section className="bg-[#FAF9F6] px-6 py-24 border-t border-black/5">
      <div className="max-w-[88rem] mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h4 className="text-black/50 text-sm font-medium tracking-wide uppercase mb-3">Divine Journeys</h4>
            <h2 className="text-black text-4xl md:text-5xl font-medium leading-tight mb-4" style={{ letterSpacing: '-0.03em' }}>
              Spiritual Yatra's.
            </h2>
            <p className="text-black/60 text-base md:text-lg">
              Embark on a transcendent journey to sacred destinations. Experience absolute comfort, helicopter transfers, and VIP access to the holy shrines, curated entirely by our dedicated spiritual concierge.
            </p>
          </div>
          <button className="inline-flex flex-shrink-0 items-center gap-3 bg-black text-white text-base font-medium px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors duration-200">
            Plan your Yatra
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {yatras.map((yatra) => (
            <Link to="/destinations" key={yatra.city} className="group cursor-pointer">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] mb-5">
                <img 
                  src={yatra.image} 
                  alt={yatra.city} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:opacity-0" />
              </div>
              <h3 className="text-2xl font-medium text-black" style={{ letterSpacing: '-0.02em' }}>{yatra.city}</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-black/50 text-sm">Helicopter + VIP Darshan</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function DestinationsSection() {
  const destinations = [
    { city: 'Aspen', image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Downtown_of_Aspen%2C_Colorado.jpg' },
    { city: 'Monaco', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Monte_Carlo_Port_Hercules_b.jpg/1280px-Monte_Carlo_Port_Hercules_b.jpg' },
    { city: 'London', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/London_Skyline_%28125508655%29.jpeg/1280px-London_Skyline_%28125508655%29.jpeg' },
    { city: 'Dubai', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/Burj_Khalifa_2021.jpg/1280px-Burj_Khalifa_2021.jpg' }
  ];

  return (
    <section className="bg-[#111111] px-6 py-24 text-white">
      <div className="max-w-[88rem] mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-medium leading-tight mb-16 text-center" style={{ letterSpacing: '-0.03em' }}>
          Fly anywhere.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {destinations.map((dest) => (
            <Link to="/destinations" key={dest.city} className="relative rounded-2xl overflow-hidden aspect-[3/4] group cursor-pointer">
              <img 
                src={dest.image} 
                alt={dest.city} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full flex items-end justify-between">
                <h3 className="text-xl md:text-2xl font-medium">{dest.city}</h3>
                <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black text-white px-6 py-20">
      <div className="max-w-[88rem] mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between mb-24 gap-12">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <LogoIcon className="w-7 h-7 text-white" />
              <span className="text-2xl font-medium tracking-tight text-white">JustCharter</span>
            </Link>
            <p className="text-white/60 text-base leading-relaxed">
              An exclusive, on-demand charter network built for seamless bookings, absolute privacy, and unparalleled luxury travel.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
            <div>
              <h4 className="text-white font-medium mb-6">Explore</h4>
              <ul className="space-y-4 text-white/60">
                <li><Link to="/fleet" className="hover:text-white transition-colors">Fleet</Link></li>
                <li><Link to="/destinations" className="hover:text-white transition-colors">Destinations</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
                <li><Link to="/members" className="hover:text-white transition-colors">Members</Link></li>
                <li><Link to="/empty-legs" className="hover:text-white transition-colors">Empty Legs</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-6">Company</h4>
              <ul className="space-y-4 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety First</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-white font-medium mb-6">Members</h4>
              <ul className="space-y-4 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Jet Card</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Corporate Accounts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Log In</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-white/40 text-sm">
          <p>&copy; {new Date().getFullYear()} JustCharter. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function MobileAppSection() {
  return (
    <section className="bg-black text-white px-6 py-32 overflow-hidden relative border-t border-white/10">
      <div className="max-w-[88rem] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="z-10">
          <h4 className="text-white/50 text-sm mb-4 font-medium tracking-wide uppercase">
            JustCharter App
          </h4>
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-medium leading-tight mb-6" style={{ letterSpacing: '-0.04em' }}>
            Aviation at your<br />fingertips.
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-lg">
            Book private jets, browse empty leg flights, and manage your itineraries seamlessly from your smartphone. Download the JustCharter app today for unparalleled control over your travel.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://play.google.com/store/apps/details?id=com.justcharter.app&hl=en" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white text-black px-6 py-3.5 rounded-2xl hover:bg-gray-100 transition-colors">
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
                <path d="M5.5 3.5C5.2 3.8 5 4.3 5 5v14c0 .7.2 1.2.5 1.5l.1.1 7.2-7.2v-.8l-7.2-7.2-.1.1zm8 8.1l2.3 2.3-2.6 1.5-1.9-1.9 2.2-1.9zm-2.8-2l-5-5c-.4-.4-1.1-.1-1.1.5v3.1l6.1 1.4zm5.1 4.5l2.6-1.5c.8-.5.8-1.3 0-1.7l-2.6-1.5-2.2 1.9 2.2 2.8z"/>
              </svg>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-70">Get it on</span>
                <span className="text-sm font-bold -mt-1">Google Play</span>
              </div>
            </a>
            <button className="flex items-center gap-3 bg-white/5 text-white px-6 py-3.5 rounded-2xl hover:bg-white/10 transition-colors border border-white/10">
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
                <path d="M17.6 13.9c-.1-2.9 2.4-4.3 2.5-4.4-1.3-1.9-3.4-2.2-4.1-2.3-1.7-.2-3.4 1-4.3 1-.9 0-2.3-1-3.7-1-1.9 0-3.6 1.1-4.5 2.7-2 3.4-.5 8.3 1.4 11 1 1.4 2.1 3 3.6 2.9 1.4-.1 2-1 3.7-1 1.7 0 2.2 1 3.7 1 1.6-.1 2.5-1.5 3.5-2.9 1.1-1.6 1.6-3.1 1.6-3.2-.1 0-2.8-1.1-2.9-4.3zM14.6 5.8c.8-1 1.3-2.3 1.1-3.6-1.1.1-2.5.7-3.3 1.7-.7.8-1.3 2.1-1.1 3.4 1.3.1 2.5-.6 3.3-1.5z"/>
              </svg>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-70">Download on the</span>
                <span className="text-sm font-bold -mt-1">App Store</span>
              </div>
            </button>
          </div>
        </div>
        <div className="relative h-[400px] lg:h-[500px] flex items-center justify-center lg:justify-end z-10 w-full mt-10 lg:mt-0">
           <img 
              referrerPolicy="no-referrer"
              src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="JustCharter App" 
              className="absolute w-[220px] md:w-[280px] rounded-[2.5rem] object-cover h-[450px] md:h-[560px] border-[6px] border-[#222] shadow-2xl z-20 top-1/2 -translate-y-1/2 rotate-[-5deg]" 
            />
             <img 
              referrerPolicy="no-referrer"
              src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Mobile App Interface" 
              className="absolute w-[220px] md:w-[280px] rounded-[2.5rem] object-cover h-[450px] md:h-[560px] border-[6px] border-[#222] shadow-2xl z-10 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-32 rotate-[5deg] opacity-60 backdrop-blur-sm" 
            />
        </div>
      </div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
    </section>
  );
}

function HomePage() {
  return (
    <>
      <div className="h-screen flex flex-col overflow-hidden relative">
        <HeroSection />
      </div>
      <InfoSection />
      <TrustedBySection />
      <ServicesSection />
      <UseCasesSection />
      <FleetSection />
      <AirAmbulanceSection />
      <YatrasSection />
      <DestinationsSection />
      <MobileAppSection />
    </>
  );
}

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col bg-[#F5F5F5] min-h-screen relative">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/empty-legs" element={<EmptyLegsPage />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/fleet/:id" element={<AircraftDetailsPage />} />
        </Routes>
        <Footer />
        <ScrollToTopButton />
      </div>
    </BrowserRouter>
  );
}
