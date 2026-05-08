import {
  ArrowRight,
  Users,
  Gauge,
  MapPin,
  Briefcase,
  ChevronRight,
  X,
  Bell,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';
import BookingModal from "../components/BookingModal";

interface Aircraft {
  name: string;
  image: string;
  passengers: string;
  speed: string;
  range: string;
  luggage: string;
  estPrice: string;
}

export default function Fleet() {
  const [selectedForComparison, setSelectedForComparison] = useState<
    Aircraft[]
  >([]);
  const [showComparisonDialog, setShowComparisonDialog] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedAircraftForBooking, setSelectedAircraftForBooking] = useState<
    string | undefined
  >(undefined);

  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifyType, setNotifyType] = useState("both");
  const [notifySuccess, setNotifySuccess] = useState(false);
  const [notifyCategories, setNotifyCategories] = useState<string[]>([]);

  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail) return;
    setNotifySuccess(true);
    setTimeout(() => {
      setNotifySuccess(false);
      setNotifyEmail("");
      setNotifyCategories([]);
    }, 3000);
  };

  const toggleCompare = (jet: Aircraft) => {
    setSelectedForComparison((prev) => {
      const isSelected = prev.find((p) => p.name === jet.name);
      if (isSelected) {
        return prev.filter((p) => p.name !== jet.name);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, jet];
    });
  };

  const categories = [
    {
      id: "ultra-long",
      title: "Ultra Long Range",
      description:
        "The pinnacle of private aviation, offering intercontinental range, maximum passenger capacity, and unparalleled luxury features including multiple cabin zones and full galleys.",
      aircraft: [
        {
          name: "Gulfstream G650ER",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Gulfstream_G650ER%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0749%29.jpg/1280px-Gulfstream_G650ER%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0749%29.jpg",
          passengers: "14-19",
          speed: "Mach 0.925",
          range: "7,500 nm",
          luggage: "195 cu ft",
          estPrice: "Est. $10,500 / hr",
        },
        {
          name: "Global 7500",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/EC-MLR_Gulfstream_G650_SCQ_03.jpg/1280px-EC-MLR_Gulfstream_G650_SCQ_03.jpg",
          passengers: "19",
          speed: "Mach 0.925",
          range: "7,700 nm",
          luggage: "195 cu ft",
          estPrice: "Est. $11,000 / hr",
        },
      ],
    },
    {
      id: "super-midsize",
      title: "Super Midsize & Heavy Jets",
      description:
        "Ideal for cross-country and transatlantic travel. Generous headroom, stand-up cabins, and enhanced cruising speeds.",
      aircraft: [
        {
          name: "Challenger 350",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/4/4d/BBJ_interior_2011.jpg",
          passengers: "9-10",
          speed: "Mach 0.83",
          range: "3,200 nm",
          luggage: "106 cu ft",
          estPrice: "Est. $6,500 / hr",
        },
        {
          name: "Citation Longitude",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/CS-LTI_Cessna_560_XLS_Citation_XLS_C56X_c_n_560-5798_-_NJE_%2843222541880%29.jpg/1280px-CS-LTI_Cessna_560_XLS_Citation_XLS_C56X_c_n_560-5798_-_NJE_%2843222541880%29.jpg",
          passengers: "12",
          speed: "Mach 0.84",
          range: "3,500 nm",
          luggage: "112 cu ft",
          estPrice: "Est. $7,000 / hr",
        },
      ],
    },
    {
      id: "light",
      title: "Light & Very Light Jets",
      description:
        "Fast, efficient, and cost-effective. Perfect for short-haul journeys of up to 3 hours between regional airports.",
      aircraft: [
        {
          name: "Phenom 300E",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/8/8f/Embraer_505_Phenom_300%2C_Aerojet_JP7625910.jpg",
          passengers: "7-8",
          speed: "Mach 0.80",
          range: "1,971 nm",
          luggage: "84 cu ft",
          estPrice: "Est. $3,500 / hr",
        },
      ],
    },
    {
      id: "helicopters",
      title: "Helicopters",
      description:
        "Perfect for short urban transfers, skipping traffic, and accessing remote locations with precision and ease.",
      aircraft: [
        {
          name: "Sikorsky S-76",
          image:
            "https://images.unsplash.com/photo-1549524570-5b565a049963?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          passengers: "6-8",
          speed: "155 knots",
          range: "400 nm",
          luggage: "38 cu ft",
          estPrice: "Est. $4,000 / hr",
        },
        {
          name: "Airbus H145",
          image:
            "https://images.unsplash.com/photo-1627953258757-ad6d2ee178db?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          passengers: "8",
          speed: "135 knots",
          range: "350 nm",
          luggage: "32 cu ft",
          estPrice: "Est. $3,500 / hr",
        },
      ],
    },
    {
      id: "yachts",
      title: "Luxury Yachts",
      description:
        "Experience the ultimate freedom on the water. Curated superyachts for bespoke coastal journeys and luxurious escapes.",
      aircraft: [
        {
          name: "Sunseeker 95",
          image:
            "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          passengers: "10-12",
          speed: "26 knots",
          range: "1,250 nm",
          luggage: "Custom",
          estPrice: "Est. $60,000 / week",
        },
        {
          name: "Benetti Oasis 40M",
          image:
            "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          passengers: "10",
          speed: "16 knots",
          range: "4,000 nm",
          luggage: "Custom",
          estPrice: "Est. $250,000 / week",
        },
      ],
    },
  ];

  return (
    <div className="bg-[#F5F5F5] dark:bg-neutral-900 min-h-screen pt-20 md:pt-24 pb-16 md:pb-24">
      <Helmet>
        <title>Our Fleet - JustCharter</title>
        <meta name="description" content="Explore JustCharter's elite global fleet of more than 3,000 strictly vetted premier aircraft, tailored for any mission." />
      </Helmet>
      {/* Hero Section */}
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mt-8 md:mt-16 mb-12 md:mb-20">
        <h4 className="text-black/50 dark:text-white/50 text-sm mb-4 font-medium tracking-wide uppercase">
          The JustCharter Fleet
        </h4>
        <h1
          className="text-4xl md:text-5xl lg:text-7xl font-medium leading-[1.1] md:leading-tight mb-6 md:mb-8"
          style={{ letterSpacing: "-0.04em" }}
        >
          Crafted for every mission.
        </h1>
        <p className="text-black/60 dark:text-white/60 text-xl max-w-2xl leading-relaxed">
          Unlock access to an elite global fleet of more than 3,000 strictly
          vetted premier aircraft. Whatever your itinerary, we provide the
          perfect jet.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mb-12">
        <div className="flex flex-wrap gap-2 md:gap-3">
          <button
            onClick={() => setSelectedCategoryFilter("all")}
            className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
              selectedCategoryFilter === "all"
                ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-sm"
                : "bg-transparent text-black/70 border-gray-200 hover:border-black/30 dark:text-white/70 dark:border-white/10 dark:hover:border-white/30"
            }`}
          >
            All Aircraft
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryFilter(cat.id)}
              className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                selectedCategoryFilter === cat.id
                  ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-sm"
                  : "bg-transparent text-black/70 border-gray-200 hover:border-black/30 dark:text-white/70 dark:border-white/10 dark:hover:border-white/30"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mb-24 md:mb-32 space-y-20 md:space-y-32">
        {categories
          .filter(
            (cat) =>
              selectedCategoryFilter === "all" ||
              cat.id === selectedCategoryFilter,
          )
          .map((category) => (
            <div
              key={category.id}
              className="pt-8 border-t border-gray-200 dark:border-white/20"
            >
              <div className="flex flex-col md:flex-row justify-between items-start mb-8 md:mb-12 gap-4 md:gap-8">
                <div className="max-w-xl">
                  <h2
                    className="text-3xl md:text-4xl font-medium mb-3 md:mb-4"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    {category.title}
                  </h2>
                  <p className="text-black/60 dark:text-white/60 text-base md:text-lg leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {isLoading ? (
                  <>
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="bg-white dark:bg-neutral-950 rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10 flex flex-col h-full animate-pulse"
                      >
                        <div className="relative aspect-[16/10] bg-gray-200 dark:bg-neutral-800" />
                        <div className="p-6 md:p-8 flex-1 flex flex-col">
                          <div className="h-6 bg-gray-200 dark:bg-neutral-800 rounded w-1/2 mb-8" />
                          <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                            {[1, 2, 3, 4].map((j) => (
                              <div key={j}>
                                <div className="h-3 bg-gray-200 dark:bg-neutral-800 rounded w-1/3 mb-2" />
                                <div className="h-4 bg-gray-200 dark:bg-neutral-800 rounded w-1/2" />
                              </div>
                            ))}
                          </div>
                          <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/10">
                            <div>
                              <div className="h-3 bg-gray-200 dark:bg-neutral-800 rounded w-1/3 mb-2" />
                              <div className="h-5 bg-gray-200 dark:bg-neutral-800 rounded w-3/4" />
                            </div>
                            <div className="h-10 w-24 bg-gray-200 dark:bg-neutral-800 rounded-full" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  category.aircraft.map((jet, idx) => {
                    const isSelected = selectedForComparison.some(
                      (c) => c.name === jet.name,
                    );
                    return (
                      <div
                        key={idx}
                        className={`bg-white dark:bg-neutral-950 rounded-3xl overflow-hidden group border flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01] ${isSelected ? "border-black dark:border-white ring-2 ring-black dark:ring-white/20" : "border-gray-100 dark:border-white/10"}`}
                      >
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <img
                            src={jet.image}
                            alt={jet.name}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                          <div
                            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 cursor-zoom-in"
                            onClick={() => setZoomedImage(jet.image)}
                          />

                          {/* Compare Button */}
                          <div className="absolute top-4 right-4 z-20">
                            <button
                              onClick={() => toggleCompare(jet)}
                              className={`px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-md transition-all duration-300 border focus:outline-none flex items-center gap-1.5 ${isSelected ? "bg-black/90 text-white border-black/90 dark:bg-white/90 dark:text-black dark:border-white/90" : "bg-black/30 text-white border-white/20 hover:bg-black/50"}`}
                            >
                              {isSelected ? "Added to Compare" : "+ Compare"}
                            </button>
                          </div>

                          <div className="absolute bottom-6 left-6 text-white text-2xl font-medium tracking-tight">
                            {jet.name}
                          </div>
                        </div>
                        <div className="p-6 md:p-8">
                          <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-2 text-black/50 dark:text-white/50 text-sm font-medium tracking-wide uppercase">
                                <Users className="w-4 h-4 shrink-0" />
                                Passengers
                              </div>
                              <span className="text-lg font-medium">
                                Up to {jet.passengers}
                              </span>
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-2 text-black/50 dark:text-white/50 text-sm font-medium tracking-wide uppercase">
                                <MapPin className="w-4 h-4 shrink-0" />
                                Range
                              </div>
                              <span className="text-lg font-medium">
                                {jet.range}
                              </span>
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-2 text-black/50 dark:text-white/50 text-sm font-medium tracking-wide uppercase">
                                <Gauge className="w-4 h-4 shrink-0" />
                                Cruise Speed
                              </div>
                              <span className="text-lg font-medium">
                                {jet.speed}
                              </span>
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-2 text-black/50 dark:text-white/50 text-sm font-medium tracking-wide uppercase">
                                <Briefcase className="w-4 h-4 shrink-0" />
                                Luggage
                              </div>
                              <span className="text-lg font-medium">
                                {jet.luggage}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-6 pt-6 border-t border-gray-100 dark:border-white/10">
                            <span className="text-black/50 dark:text-white/50 font-medium tracking-wide uppercase text-sm">
                              Estimated Price
                            </span>
                            <span className="text-xl font-medium">
                              {jet.estPrice}
                            </span>
                          </div>

                          <div className="flex flex-col xl:flex-row gap-3">
                            <Link
                              to={`/fleet/${jet.name.toLowerCase().replace(/ /g, "-")}`}
                              className="flex-1 block py-4 text-center text-sm font-medium text-black dark:text-white bg-[#F5F5F5] dark:bg-neutral-900 rounded-full hover:bg-gray-200 transition-colors duration-200"
                            >
                              View Details
                            </Link>
                            <button className="flex-1 py-4 text-center text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800 dark:hover:bg-neutral-200 transition-colors duration-200">
                              Request Flight
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ))}
      </div>

      {/* Floating Comparison Bar */}
      {selectedForComparison.length > 0 && (
        <div
          className={`fixed bottom-0 left-0 right-0 z-40 bg-black text-white px-4 py-4 md:py-6 shadow-2xl transform transition-transform border-t border-white/10 dark:bg-neutral-900 ${showComparisonDialog ? "translate-y-full" : "translate-y-0"}`}
        >
          <div className="max-w-[88rem] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-lg font-medium">
                {selectedForComparison.length}{" "}
                {selectedForComparison.length === 1 ? "aircraft" : "aircrafts"}{" "}
                selected
              </span>
              <span className="text-sm text-white/60 hidden sm:inline">
                (Select up to 3 for comparison)
              </span>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setSelectedForComparison([])}
                className="px-6 py-3 rounded-full text-sm font-medium hover:bg-white/10 transition-colors duration-200 border border-transparent w-full sm:w-auto"
              >
                Clear
              </button>
              <button
                onClick={() => setShowComparisonDialog(true)}
                disabled={selectedForComparison.length < 2}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-colors duration-200 w-full sm:w-auto ${selectedForComparison.length < 2 ? "bg-white/20 text-white/50 cursor-not-allowed" : "bg-white text-black hover:bg-gray-200"}`}
              >
                Compare Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {showComparisonDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6 overflow-y-auto">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowComparisonDialog(false)}
          ></div>
          <div className="relative bg-white dark:bg-neutral-950 w-full xl:max-w-[80rem] rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 overflow-hidden flex flex-col max-h-full">
            <button
              onClick={() => setShowComparisonDialog(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors z-10 text-black dark:text-white bg-white dark:bg-neutral-900 shadow-md"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl md:text-3xl font-medium mb-8">
              Compare Aircraft
            </h2>

            <div className="overflow-x-auto pb-4">
              <div className="min-w-[800px] xl:min-w-0 w-full">
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: `repeat(${selectedForComparison.length}, minmax(0, 1fr))`,
                  }}
                >
                  {selectedForComparison.map((jet, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col gap-6 px-4 ${idx > 0 && "border-l border-gray-200 dark:border-white/10"}`}
                    >
                      <div className="relative aspect-video rounded-2xl overflow-hidden mb-2">
                        <img
                          src={jet.image}
                          alt={jet.name}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-medium">{jet.name}</h3>

                      <div className="flex flex-col gap-4 text-sm mt-4">
                        <div className="py-3 border-b border-gray-100 dark:border-white/5">
                          <div className="text-black/50 dark:text-white/50 uppercase tracking-wider text-[10px] mb-1 font-semibold">
                            Passengers
                          </div>
                          <div className="font-medium text-lg">
                            {jet.passengers}
                          </div>
                        </div>
                        <div className="py-3 border-b border-gray-100 dark:border-white/5">
                          <div className="text-black/50 dark:text-white/50 uppercase tracking-wider text-[10px] mb-1 font-semibold">
                            Range
                          </div>
                          <div className="font-medium text-lg">{jet.range}</div>
                        </div>
                        <div className="py-3 border-b border-gray-100 dark:border-white/5">
                          <div className="text-black/50 dark:text-white/50 uppercase tracking-wider text-[10px] mb-1 font-semibold">
                            Cruise Speed
                          </div>
                          <div className="font-medium text-lg">{jet.speed}</div>
                        </div>
                        <div className="py-3 border-b border-gray-100 dark:border-white/5">
                          <div className="text-black/50 dark:text-white/50 uppercase tracking-wider text-[10px] mb-1 font-semibold">
                            Luggage
                          </div>
                          <div className="font-medium text-lg">
                            {jet.luggage}
                          </div>
                        </div>
                        <div className="py-3 border-b border-gray-100 dark:border-white/5">
                          <div className="text-black/50 dark:text-white/50 uppercase tracking-wider text-[10px] mb-1 font-semibold">
                            Est. Price
                          </div>
                          <div className="font-medium text-lg">
                            {jet.estPrice}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedAircraftForBooking(jet.name);
                          setIsBookingModalOpen(true);
                          setShowComparisonDialog(false);
                        }}
                        className="w-full mt-4 bg-black text-white dark:bg-white dark:text-black py-4 rounded-full font-medium hover:bg-black/90 dark:hover:bg-white/90 transition-colors"
                      >
                        Request {jet.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fleet Updates & Alerts Section */}
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mb-24">
        <div className="bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/10 rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center mb-6 mx-auto lg:mx-0">
              <Bell className="w-5 h-5" />
            </div>
            <h2
              className="text-3xl md:text-4xl font-medium mb-4"
              style={{ letterSpacing: "-0.02em" }}
            >
              Fleet Updates & Alerts
            </h2>
            <p className="text-black/60 dark:text-white/60 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Sign up for notifications and be the first to know when new
              premium aircraft join our fleet or when exclusive price drop
              opportunities arise.
            </p>
          </div>

          <div className="w-full lg:w-[480px]">
            <form
              onSubmit={handleNotifySubmit}
              className="bg-white dark:bg-neutral-950 p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10"
            >
              {notifySuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">
                    You're on the list!
                  </h3>
                  <p className="text-black/60 dark:text-white/60">
                    We'll keep you updated with the latest fleet alerts.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-black/80 dark:text-white/80 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="notifyType"
                      className="block text-sm font-medium text-black/80 dark:text-white/80 mb-2"
                    >
                      Notification Type
                    </label>
                    <div className="relative">
                      <select
                        id="notifyType"
                        value={notifyType}
                        onChange={(e) => setNotifyType(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white cursor-pointer transition-all pr-12 mb-4"
                      >
                        <option value="both">
                          Both (New Aircraft & Price Drops)
                        </option>
                        <option value="new_aircraft">
                          New Aircraft Announcements
                        </option>
                        <option value="price_drops">
                          Price Drop Alerts Only
                        </option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black/40 dark:text-white/40">
                        <ChevronRight className="w-5 h-5 rotate-90" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black/80 dark:text-white/80 mb-3">
                      Preferred Categories
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setNotifyCategories((prev) =>
                              prev.includes(cat.id)
                                ? prev.filter((c) => c !== cat.id)
                                : [...prev, cat.id],
                            );
                          }}
                          className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 ${notifyCategories.includes(cat.id) ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-sm" : "bg-transparent text-black/70 border-gray-200 hover:border-black/30 dark:text-white/70 dark:border-white/10 dark:hover:border-white/30"}`}
                        >
                          {cat.title}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white dark:bg-white dark:text-black mt-2 py-3.5 rounded-xl font-medium hover:bg-black/90 dark:hover:bg-white/90 transition-colors"
                  >
                    Subscribe Now
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6">
        <div className="bg-black text-white rounded-[2rem] md:rounded-3xl p-8 sm:p-12 md:p-20 text-center flex flex-col items-center">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-4 md:mb-6 max-w-2xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Need assistance choosing the right aircraft?
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto mb-8 md:mb-10">
            Our aviation experts operate 24/7. Let us analyze your mission and
            recommend the optimal aircraft for your itinerary, passenger count,
            and cargo.
          </p>
          <button className="inline-flex items-center gap-2 md:gap-3 bg-white dark:bg-neutral-950 text-black dark:text-white text-base md:text-lg font-medium px-6 md:px-8 py-3 md:py-3.5 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors duration-200">
            Contact Advisors
            <ArrowRight className="w-5 h-5 text-black dark:text-white" />
          </button>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        aircraftName={selectedAircraftForBooking}
      />

      {/* Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-sm animate-in fade-in duration-300 cursor-zoom-out"
          onClick={() => setZoomedImage(null)}
        >
          <button
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setZoomedImage(null);
            }}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={zoomedImage}
            alt="Aircraft Zoomed"
            loading="lazy"
            className="w-full max-w-7xl max-h-[85vh] object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </div>
  );
}
