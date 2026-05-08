import {
  ArrowRight,
  Plane,
  Users,
  Package,
  Clock,
  ShieldCheck,
  HeartPulse,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import AirAmbulanceModal from "../components/AirAmbulanceModal";
import BookingModal from "../components/BookingModal";

export default function Services() {
  const [isAirAmbulanceOpen, setIsAirAmbulanceOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>();

  const detailedServices = [
    {
      id: "private-jet",
      icon: <Plane className="w-10 h-10 stroke-[1.5]" />,
      title: "Private Jet Charter",
      subtitle: "Unparalleled privacy and flexibility",
      description:
        "Experience the ultimate in bespoke travel. Our private jet charters offer on-demand access to a global fleet of light, midsize, and heavy jets. Skip the commercial lines, fly directly to your destination on your own schedule, and enjoy custom catering and onboard amenities.",
      features: [
        "Access to 7,000+ airports worldwide",
        "Depart in as little as 2 hours from booking",
        "Personalized in-flight catering",
        "Complete privacy for work or relaxation",
      ],
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/4d/BBJ_interior_2011.jpg",
    },
    {
      id: "group-charter",
      icon: <Users className="w-10 h-10 stroke-[1.5]" />,
      title: "Group Charter",
      subtitle: "Logistics perfected for large parties",
      description:
        "When coordinating travel for corporate events, sports teams, or large family gatherings, our group charter services ensure everyone travels together comfortably. We arrange dedicated airliners with custom seating configurations and branding options.",
      features: [
        "Accommodates up to 300+ passengers",
        "Customized check-in experiences",
        "Dedicated account manager for logistics",
        "Options for branded headrests and aircraft exterior",
      ],
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Monte_Carlo_Port_Hercules_b.jpg/1280px-Monte_Carlo_Port_Hercules_b.jpg",
    },
    {
      id: "air-ambulance",
      icon: <HeartPulse className="w-10 h-10 stroke-[1.5]" />,
      title: "Air Ambulance",
      subtitle: "Critical care transport worldwide",
      description:
        "When every second counts, our global network provides rapid response air medical transport. Fully equipped with intensive care units and staffed by specialized medical teams, we ensure safe and efficient transfers back home or to specialized facilities.",
      features: [
        "24/7 global dispatch and operations",
        "Bed-to-bed medical care coordination",
        "Specialized flight nurses and physicians",
        "State-of-the-art onboard medical equipment",
      ],
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/CH.SZ.Stoos_Fronalpstock_Sequence_Rescue-Helicopter_REGA_16K_16x9-R.jpg/1280px-CH.SZ.Stoos_Fronalpstock_Sequence_Rescue-Helicopter_REGA_16K_16x9-R.jpg",
    },
    {
      id: "cargo-charter",
      icon: <Package className="w-10 h-10 stroke-[1.5]" />,
      title: "Cargo Charter",
      subtitle: "Secure transport for critical freight",
      description:
        "For urgent, oversized, hazardous, or high-value freight that commercial airlines can't handle, our cargo charter solutions provide guaranteed delivery. We match your specific freight requirements with the ideal aircraft.",
      features: [
        "Transport for outsized or heavy cargo",
        "Time-critical AOG (Aircraft on Ground) parts transport",
        "Secure transport of high-value goods",
        "End-to-end logistics tracking",
      ],
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/An-124_ready.jpg/1280px-An-124_ready.jpg",
    },
    {
      id: "empty-legs",
      icon: <Clock className="w-10 h-10 stroke-[1.5]" />,
      title: "Empty Leg Flights",
      subtitle: "Luxury travel at exceptional value",
      description:
        "Take advantage of aircraft repositioning flights at significantly reduced charter rates—often up to 75% off the standard price. Spontaneous travelers can enjoy the full private jet experience at a fraction of the cost.",
      features: [
        "Significant cost savings on luxury travel",
        "Frequently updated availability",
        "Opportunities for heavily discounted one-way trips",
        "The complete private charter experience",
      ],
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/CS-LTI_Cessna_560_XLS_Citation_XLS_C56X_c_n_560-5798_-_NJE_%2843222541880%29.jpg/1280px-CS-LTI_Cessna_560_XLS_Citation_XLS_C56X_c_n_560-5798_-_NJE_%2843222541880%29.jpg",
    },
    {
      id: "aircraft-management",
      icon: <ShieldCheck className="w-10 h-10 stroke-[1.5]" />,
      title: "Aircraft Management",
      subtitle: "Hassle-free ownership",
      description:
        "We provide comprehensive operational support, maintenance oversight, and crew management for private aircraft owners. Enjoy the benefits of ownership without the day-to-day administrative burdens.",
      features: [
        "Hiring and training of flight crews",
        "Maintenance coordination and oversight",
        "Regulatory compliance and safety audits",
        "Charter revenue generation when not in use",
      ],
      image:
        "https://upload.wikimedia.org/wikipedia/commons/8/8f/Embraer_505_Phenom_300%2C_Aerojet_JP7625910.jpg",
    },
  ];

  return (
    <div className="bg-[#F5F5F5] dark:bg-neutral-900 min-h-screen pt-20 md:pt-24 pb-16 md:pb-24">
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mt-8 md:mt-16 mb-12 md:mb-24">
        <h1
          className="text-4xl md:text-5xl lg:text-7xl font-medium leading-[1.1] md:leading-tight mb-6 md:mb-8"
          style={{ letterSpacing: "-0.04em" }}
        >
          Aviation Solutions
          <br />
          Without Limits.
        </h1>
        <p className="text-black/60 dark:text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
          From executing meticulous corporate travel to managing life-saving
          medical evacuations, explore our complete suite of global aviation
          services.
        </p>
      </div>

      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 flex flex-col gap-20 md:gap-32">
        {detailedServices.map((service, index) => (
          <div
            key={service.id}
            className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-20`}
          >
            <div className="w-full lg:w-1/2 relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                <img
                  referrerPolicy="no-referrer"
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000 ease-out"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="mb-6 w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center">
                {service.icon}
              </div>
              <h4 className="text-black/50 dark:text-white/50 text-sm mb-3 font-medium tracking-wide uppercase">
                {service.subtitle}
              </h4>
              <h2
                className="text-3xl md:text-4xl font-medium mb-6"
                style={{ letterSpacing: "-0.03em" }}
              >
                {service.title}
              </h2>
              <p className="text-black/70 dark:text-white/70 text-base md:text-lg leading-relaxed mb-8">
                {service.description}
              </p>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-black dark:text-white shrink-0 mt-0.5" />
                    <span className="text-black/80 dark:text-white/80">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  if (service.id === "air-ambulance") {
                    setIsAirAmbulanceOpen(true);
                  } else {
                    setSelectedService(service.title);
                    setIsBookingOpen(true);
                  }
                }}
                className="inline-flex items-center gap-3 bg-white dark:bg-neutral-950 border border-black/10 dark:border-white/20 text-black dark:text-white text-base font-medium px-8 py-3 rounded-full hover:bg-black hover:text-white transition-colors duration-200"
              >
                Inquire Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mt-20 md:mt-32">
        <div className="bg-black text-white rounded-[2rem] md:rounded-3xl p-8 sm:p-12 md:p-20 text-center flex flex-col items-center">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-4 md:mb-6"
            style={{ letterSpacing: "-0.03em" }}
          >
            Ready to experience the exceptional?
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto mb-8 md:mb-10">
            Contact our dedicated concierge team today to discuss your next
            journey or to learn more about our comprehensive services.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-white dark:bg-neutral-950 text-black dark:text-white text-lg font-medium px-8 py-3.5 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors duration-200"
          >
            Contact Us
            <ArrowRight className="w-5 h-5 text-black dark:text-white" />
          </Link>
        </div>
      </div>

      <AirAmbulanceModal
        isOpen={isAirAmbulanceOpen}
        onClose={() => setIsAirAmbulanceOpen(false)}
      />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        aircraftName={
          selectedService ? `Service: ${selectedService}` : undefined
        }
      />
    </div>
  );
}
