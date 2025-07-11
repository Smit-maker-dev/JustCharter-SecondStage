import React, { useEffect, useState } from "react";
import {
  Star,
  PlaneTakeoff,
  Shield,
  Calendar,
  Clock,
  Users,
  Check,
} from "lucide-react";
import { IoVolumeHighOutline } from "react-icons/io5";
import { IoVolumeMuteOutline } from "react-icons/io5";
const aircraftData = [
  {
    id: 1,
    name: "Gulfstream G700",
    category: "Long Range",
    imageUrl: "/images/gulfstrem.jpg",
    specs: [
      { label: "Max Range", value: "7,500 nm" },
      { label: "Max Speed", value: "516 kts" },
      { label: "Passengers", value: "up to 19" },
      { label: "Cabin Height", value: "6 ft 3 in" },
    ],
    tag: "Long Range",
  },
  {
    id: 2,
    name: "Bombardier Global 7500",
    category: "Ultra Long Range",
    imageUrl: "/images/bombardier.webp",
    specs: [
      { label: "Max Range", value: "7,700 nm" },
      { label: "Max Speed", value: "516 kts" },
      { label: "Passengers", value: "up to 19" },
      { label: "Cabin Height", value: "6 ft 2 in" },
    ],
    tag: "Ultra Long Range",
  },
  {
    id: 3,
    name: "Cessna Citation Latitude",
    category: "Midsize",
    imageUrl: "/images/cessna.webp",
    specs: [
      { label: "Max Range", value: "2,700 nm" },
      { label: "Max Speed", value: "446 kts" },
      { label: "Passengers", value: "up to 9" },
      { label: "Cabin Height", value: "6 ft" },
    ],
    tag: "Midsize",
  },
  {
    id: 4,
    name: "Dassault Falcon 10X",
    category: "Long Range",
    imageUrl: "/images/DassaultFalcon.jpg",
    specs: [
      { label: "Max Range", value: "7,500 nm" },
      { label: "Max Speed", value: "520 kts" },
      { label: "Passengers", value: "up to 19" },
      { label: "Cabin Height", value: "6 ft 8" },
    ],
    tag: "Long Range",
  },
  {
    id: 5,
    name: "Gulfstream G800",
    category: "Long Range",
    imageUrl: "/images/gulfG800.jpg",
    specs: [
      { label: "Max Range", value: "8,000 nm" },
      { label: "Max Speed", value: "516 kts" },
      { label: "Passengers", value: "up to 19" },
      { label: "Cabin Height", value: "6 ft 3 in" },
    ],
    tag: "Long Range",
  },
  {
    id: 6,
    name: "Boeing Business Jet 777X (BBJ 777X)",
    category: "Ultra Long Range",
    imageUrl: "/images/BoeingBusinessjet.jpg",
    specs: [
      { label: "Max Range", value: "11,645 nm" },
      { label: "Max Speed", value: "516 kts" },
      { label: "Passengers", value: "up to 75" },
      { label: "Cabin Height", value: "7 ft 1 in" },
    ],
    tag: "Ultra Long Range",
  },
  {
    id: 7,
    name: "Airbus ACJ350 XWB",
    category: "Ultra Long Range",
    imageUrl: "/images/ACJ350XWB.webp",
    specs: [
      { label: "Max Range", value: "11,100nm" },
      { label: "Max Speed", value: "528 kts" },
      { label: "Passengers", value: "up to 25" },
      { label: "Cabin Height", value: "7 ft 10 in" },
    ],
    tag: "Ultra Long Range",
  },
  {
    id: 8,
    name: "Embraer Praetor 500",
    category: "Midsize",
    imageUrl: "/images/embraerPraetor.webp",
    specs: [
      { label: "Max Range", value: "3,340 nm" },
      { label: "Max Speed", value: "466 kts" },
      { label: "Passengers", value: "up to 9" },
      { label: "Cabin Height", value: "6 ft" },
    ],
    tag: "Midsize",
  },
  {
    id: 9,
    name: "Bombardier Challenger 3500",
    category: "Midsize",
    imageUrl: "/images/reBrandAC.jpg",
    specs: [
      { label: "Max Range", value: "3,340 nm" },
      { label: "Max Speed", value: "466 kts" },
      { label: "Passengers", value: "up to 9" },
      { label: "Cabin Height", value: "6 ft" },
    ],
    tag: "Midsize",
  },
];

const filters = ["All Aircraft", "Long Range", "Ultra Long Range", "Midsize"];
const testimonials = [
  {
    name: "Jonathan Harrington",
    title: "CEO, Harrington Industries",
    quote:
      "The level of service provided by JustCharter is unmatched. From the moment we boarded to landing, every detail was handled flawlessly.",
  },
  {
    name: "Sophia Williams",
    title: "Entertainment Executive",
    quote:
      "As someone who flies privately over 40 times a year, I can confidently say JustCharter offers the most seamless and luxurious experience in the market.",
  },
  {
    name: "Alexander Chen",
    title: "Global Investment Director",
    quote:
      "The privacy and comfort allowed me to arrive refreshed and prepared for my meetings. The crew’s attention to detail was exceptional.",
  },
];
const certifications = [
  "ARGUS Platinum",
  "Wyvern Wingman",
  "IS-BAO Stage 3",
  "IBAC",
];

const commitments = [
  "Two-pilot operation for all flights, regardless of aircraft size",
  "Crew experience exceeding 5,000 flight hours on average",
  "Quarterly safety training and emergency simulations",
  "24/7 flight monitoring and weather analysis",
  "Comprehensive maintenance after every flight",
];
const advantages = [
  "No initiation fees or hidden costs",
  "Guaranteed availability with just 24 hours notice",
  "Access to our entire fleet of premium aircraft",
  "Complimentary catering and ground transportation",
  "Dedicated concierge service for all your travel needs",
];
export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All Aircraft");
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
  const filteredData =
    activeFilter === "All Aircraft"
      ? aircraftData.filter((a) => [1, 2, 3].includes(a.id))
      : aircraftData.filter((a) => a.category === activeFilter);

  return (
    <>
      {/* Old Section-1 */}
      {/* <div className="Hero-section">
        <section
          className="relative h-screen bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: "url('/images/Herosectionbg.jpeg')" }}
        >
          <div className="absolute inset-0 bg-black/50"></div>

          <div className="relative z-10 text-white text-center w-full px-6 md:hidden">
            <h1
              className="text-[36px] font-bold leading-snug mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Private Aviation <br /> Made Simple
            </h1>

            <p className="text-base mb-2 text-white">
              Experience seamless corporate travel <br />
              with our premium fleet
            </p>

            <p className="text-sm mb-6 text-white/70">
              Over 500+ destinations worldwide
            </p>

            <div className="flex justify-center gap-4">
              <button className="bg-white text-black px-6 py-2 cursor-pointer rounded-full text-sm font-semibold hover:bg-[#FFD700] transition">
                Plan Flight
              </button>

              <button className="border border-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-black transition">
                Explore
              </button>
            </div>
          </div>

          <div className="relative z-10 text-white text-center max-w-2xl px-4 hidden md:block">
            <h1
              className="text-[48px] font-bold mb-4 leading-tight text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Private Aviation Made Simple
            </h1>

            <p className="text-[24px] md:text-lg mb-3">
              Experience seamless corporate travel with our{" "}
              <br className="hidden md:block" />
              premium fleet
            </p>

            <p className="text-sm md:text-base mb-6 text-gray-300">
              Over 500+ destinations worldwide
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-black px-6 py-2 rounded-full text-sm hover:bg-gray-200 transition">
                Plan Flight
              </button>
              <button className="border border-white px-6 py-2 rounded-full text-sm hover:bg-white hover:text-black transition">
                Explore
              </button>
            </div>
          </div>
        </section>
      </div> */}
      {/* Section-1 - Fixed Hero Section */}
      {/* <div className="Hero-section">
        <section
          className="relative h-screen bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: "url('/images/Herosectionbg.jpeg')" }}
        >
          <div className="absolute inset-0 bg-black/50"></div>

          <div className="relative z-10 text-white text-center w-full px-6 md:hidden">
            <h1
              className="text-[36px] font-bold leading-snug mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Private Aviation <br /> Made Simple
            </h1>
            <p className="text-base mb-2">
              Experience seamless corporate travel <br />
              with our premium fleet
            </p>
            <p className="text-sm mb-6 text-white/70">
              Over 500+ destinations worldwide
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#FFD700] transition-colors duration-200">
                Plan Flight
              </button>
              <button className="border border-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-black transition-colors duration-200">
                Explore
              </button>
            </div>
          </div>

          <div className="relative z-10 text-white text-center max-w-2xl px-4 hidden md:block">
            <h1
              className="text-[48px] font-bold mb-4 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Private Aviation Made Simple
            </h1>
            <p className="text-[24px] md:text-lg mb-3">
              Experience seamless corporate travel with our premium fleet
            </p>
            <p className="text-sm md:text-base mb-6 text-gray-300">
              Over 500+ destinations worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="cursor-pointer bg-white text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#FFD700] transition-colors duration-200">
                Plan Flight
              </button>
              <button className="border border-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-black transition-colors duration-200">
                Explore
              </button>
            </div>
          </div>
        </section>
      </div> */}
      {/* Section-1 - Hero Section with Video Background */}
      <div className="Hero-section">
        <section className="relative h-screen overflow-hidden flex items-center justify-center">
          {/* <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src="/images/Paradigm Shift_ The Next-Gen Gulfstream Fleet (2023).mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-black/50"></div>
          </div> */}
          {/* <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className="cursor-pointer fixed bottom-6 right-6 z-50 bg-black/30 border border-white text-white p-3 rounded-full shadow-md hover:bg-black/70 transition-all duration-200 backdrop-blur-sm"
            aria-label={isAudioMuted ? "Unmute video" : "Mute video"}
          >
            {isAudioMuted ? (
              <IoVolumeMuteOutline size={20} />
            ) : (
              <IoVolumeHighOutline size={20} />
            )}
          </button> */}
          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className={`cursor-pointer fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-md hover:bg-black/70 transition-all duration-200 backdrop-blur-sm ${
              scrolled
                ? "bg-white/90 border-black/20 text-black hover:bg-white"
                : "bg-black/30 border-white text-white"
            }`}
            aria-label={isAudioMuted ? "Unmute video" : "Mute video"}
          >
            {isAudioMuted ? (
              <IoVolumeMuteOutline size={20} />
            ) : (
              <IoVolumeHighOutline size={20} />
            )}
          </button>
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted={isAudioMuted}
              loop
              playsInline
              className="w-full h-full object-cover object-center"
            >
              <source
                src="/images/Paradigm Shift_ The Next-Gen Gulfstream Fleet (2023).mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          {/* Content (same as before) */}
          <div className="relative z-10 text-white text-center w-full px-6 md:hidden">
            <h1
              className="text-[36px] font-bold leading-snug mb-4"
              style={{ fontFamily: "'Playfair Display', serif"
               }}
            >
              Private Aviation <br /> Made Simple
            </h1>
            <p className="text-base mb-2">
              Experience seamless corporate travel <br />
              with our premium fleet
            </p>
            <p className="text-sm mb-6 text-white">
              Over 500+ destinations worldwide
            </p>
            <div className="flex justify-center gap-4">
              <button className="cursor-pointer bg-white text-black px-6 py-2 rounded-full text-sm font-semibold hover:text-yellow-500 hover:bg-[#FFD700] transition-colors duration-200">
                Plan Flight
              </button>
              <button className="border border-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-black transition-colors duration-200">
                Explore
              </button>
            </div>
          </div>

          <div className="relative z-10 text-white text-center max-w-2xl px-4 hidden md:block">
            <h1
              className="text-[48px] font-bold mb-4 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Private Aviation Made Simple
            </h1>
            <p className="text-[24px] md:text-lg mb-3">
              Experience seamless corporate travel with our premium fleet
            </p>
            <p className="text-sm md:text-base mb-6 text-white">
              Over 500+ destinations worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="cursor-pointer bg-white text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#FFD700] transition-colors duration-200">
                Plan Flight
              </button>
              <button className="border border-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-black transition-colors duration-200">
                Explore
              </button>
            </div>
          </div>
        </section>
      </div>
      {/* Section-2 */}
      <div className="premium-aviation-services bg-white mt-2 mb-7 py-16 px-6">
        <section className="max-w-7xl mx-auto text-center">
          <h1
            className="text-[28px] font-bold mb-4 text-[#1A1F2C]"
            style={{
              fontFamily: "'Playfair Display', serif"
            }}
          >
            Premium Aviation Services
          </h1>
          <p className="text-base text-[#4B5563] mb-10">
            Experience the pinnacle of luxury travel with our comprehensive
            range of private aviation services <br />
            designed to meet your every need.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className=" rounded-lg py-8 px-6 text-center shadow-sm hover:shadow-md transition">
              <PlaneTakeoff
                className="mx-auto mb-4 text-yellow-400"
                size={36}
              />
              <h3 className="font-semibold mb-2">Private Charter</h3>
              <p className="text-sm text-gray-600">
                Tailored flight experiences to meet your specific needs, with
                access to over 5,000 airports worldwide.
              </p>
            </div>

            <div className=" rounded-lg py-8 px-6 text-center shadow-sm hover:shadow-md transition">
              <Shield className="mx-auto mb-4 text-yellow-400" size={36} />
              <h3 className="font-semibold mb-2">Safety First</h3>
              <p className="text-sm text-gray-600">
                Our fleet meets the highest safety standards with rigorous
                maintenance and experienced flight crews.
              </p>
            </div>

            <div className=" rounded-lg py-8 px-6 text-center shadow-sm hover:shadow-md transition">
              <Calendar className="mx-auto mb-4 text-yellow-400" size={36} />
              <h3 className="font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-sm text-gray-600">
                Fly on your terms with departure times that suit your schedule,
                avoiding commercial airline constraints.
              </p>
            </div>

            <div className=" rounded-lg py-8 px-6 text-center shadow-sm hover:shadow-md transition">
              <Clock className="mx-auto mb-4 text-yellow-400" size={36} />
              <h3 className="font-semibold mb-2">Time Efficiency</h3>
              <p className="text-sm text-gray-600">
                Skip long security lines and boarding processes, making your
                journey faster and more comfortable.
              </p>
            </div>
          </div>
        </section>
      </div>
      {/* Section-3 */}
      <div className="Exceptional-Aircraft-Selection">
        <div className="bg-[#F9FAFB] py-15 px-6 lg:px-14">
          <div className="max-w-7xl mx-auto text-center">
            <h2
              className="text-3xl font-semibold text-gray-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Exceptional Aircraft Selection
            </h2>
            <p className="mt-2 text-gray-600">
              Explore our meticulously maintained fleet of luxury aircraft, each
              offering <br /> unparalleled comfort and <br /> performance.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`cursor-pointer px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none ${
                    activeFilter === filter
                      ? "bg-black text-white shadow"
                      : "text-gray-700 border border-gray-300"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
              {filteredData.map((aircraft) => (
                <div
                  key={aircraft.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
                >
                  <div className="relative">
                    <img
                      src={aircraft.imageUrl}
                      alt={aircraft.name}
                      className="w-full h-56 object-cover"
                    />
                    <span className="absolute top-3 right-3 bg-gray-900 text-white text-xs px-2 py-1 rounded-full">
                      {aircraft.tag}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg text-start font-bold text-gray-900">
                        {aircraft.name}
                      </h3>
                      <ul className="mt-3 space-y-2">
                        {aircraft.specs.map((spec, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="mt-1 w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0 mr-2"></span>
                            <span className="text-gray-700 text-sm">
                              {spec.label}: {spec.value}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a
                      href="#"
                      className="mt-4 text-sm font-medium text-gray-900 underline text-start"
                    >
                      Inspect aircraft &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a
                href="#"
                className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md text-gray-900 text-sm font-medium bg-white hover:bg-gray-50 transition"
              >
                Explore Full Fleet &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="About-JustCharter py-14 px-10 mb-7 md:px-20 bg-white">
        <section className="flex flex-col lg:flex-row items-center gap-10 px-6">
          <div className="lg:w-1/2 w-full">
            <p className="text-[18px] text-yellow-500 font-medium mb-1">
              ABOUT JUSTCHARTER
            </p>
            <h2
              className="text-[28px] md:text-3xl font-semibold text-gray-900 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The Premier Choice for Private Aviation
            </h2>
            <p className="text-gray-600 leading-relaxed text-[16px]">
              With over 20 years of experience in luxury aviation, JustCharter
              has established itself as the premier choice for discerning
              travelers who demand nothing but the best. Our commitment to
              excellence, safety, and personalized service sets us apart in the
              private aviation industry.
            </p>

            <div className="grid text-center grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
              <div>
                <p className="text-xl font-bold text-gray-900">20+</p>
                <p className="text-sm text-gray-500 leading-tight">
                  Years
                  <br />
                  Experience
                </p>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">50+</p>
                <p className="text-sm text-gray-500 leading-tight">
                  Luxury
                  <br />
                  Aircraft
                </p>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">180+</p>
                <p className="text-sm text-gray-500 leading-tight">
                  Global
                  <br />
                  Destinations
                </p>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">10K+</p>
                <p className="text-sm text-gray-500 leading-tight">
                  Satisfied
                  <br />
                  Clients
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full ">
            <img
              src="/images/cessna.webp"
              alt="Private Jet"
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>
        </section>
      </div>
      {/* Section-5 */}
      <div className="bg-[#F9FAFB] py-16 px-4 sm:px-6 lg:px-20">
        <div className="text-center mb-12">
          <h2
            className="text-[28px] font-semibold text-[#1A1A1A] tracking-wider"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            TESTIMONIALS
          </h2>
          <p className="text-[#020817] mt-1 text-[18px]">
            Trusted by Discerning Clients
          </p>
          <p className="mt-4 text-[#374151] max-w-2xl mx-auto">
            See what our distinguished clientele have to say about their
            experiences with JustCharter Luxury Journeys.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-9">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-7 flex flex-col justify-between"
            >
              <div className="mb-4 ">
                <div className="flex items-center mb-2 ">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-yellow-400 fill-yellow-400 mr-1"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 italic">
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="flex items-center mt-6">
                <div className="w-12 h-12 bg-[#B3B9D5] rounded-full flex items-center justify-center text-gray-500 text-sm font-semibold">
                  <Users />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-[#222939]">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-[#4B5563]">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 bg-white rounded-xl shadow-md p-5 text-center max-w-[79rem] mx-auto">
          <p className="text-[20px] sm:text-xl lg:text-[20px] italic text-[#000000] leading-relaxed">
            <span>
              "JustCharter consistently exceeds our expectations, setting the
              gold standard for luxury private aviation."
            </span>
          </p>
          <p className="mt-4 text-sm sm:text-base text-[#000000]">
            Global Luxury Travel Magazine
          </p>
        </div>
      </div>
      {/* section-6 */}
      <div className="safety-section">
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[18px] text-[#F3C623] uppercase mb-2">
                Safety First
              </p>
              <h2
                className="text-[28px] sm:text-3xl font-semibold  text-[#1A1A1A] mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Uncompromising Safety Standards
              </h2>
              <p className="text-gray-700 mb-4">
                At JustCharter, safety is our highest priority. Our rigorous
                maintenance protocols, experienced crew selection, and
                continuous training programs ensure that every flight meets the
                industry's most stringent safety requirements.
              </p>
              <p className="text-gray-700 mb-6">
                Our fleet undergoes comprehensive inspections that exceed
                regulatory standards, and our pilots are among the most
                experienced in the industry, with extensive training beyond what
                is mandated.
              </p>

              <div className="flex flex-wrap gap-3">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 border border-gray-200 px-3 py-1.5 rounded-sm text-sm bg-white "
                  >
                    <Shield className="text-yellow-500 w-4 h-4" />
                    {cert}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F9FAFB] p-6 sm:p-8 rounded-xl ">
              <h3 className="text-[28px] font-semibold text-gray-900 mb-6">
                Our Safety Commitments
              </h3>
              <ul className="space-y-3 mb-6">
                {commitments.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-gray-700"
                  >
                    <Star className="w-4 h-4 text-yellow-500 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xl font-bold text-gray-900">100%</p>
                  <p className="text-sm text-gray-600">Safety Rating</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">0</p>
                  <p className="text-sm text-gray-600">Incidents</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">24/7</p>
                  <p className="text-sm text-gray-600">Support</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* section-7 */}
      <div className="Membership-Advantages-section bg-[#F9FAFB]">
        <section className=" py-16 px-4 sm:px-6 lg:px-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Membership Advantages
              </h2>
              <p className="text-gray-700 mb-6">
                Our membership programs provide consistent access to our premium
                fleet with guaranteed availability, fixed hourly rates, and
                exclusive benefits tailored to your travel needs.
              </p>
              <ul className="space-y-4 mb-6">
                {advantages.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-gray-700"
                  >
                    <Check className="text-[#F3C623] w-5 h-5 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="inline-flex items-center font-semibold text-black hover:underline transition"
              >
                Learn More
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>

            <div className="relative w-full max-w-[600px] mx-auto p-5">
              <div className="aspect-[16/9] rounded-xl overflow-hidden shadow-lg ">
                <img
                  src="/images/oskar-kadaksoo.jpg"
                  alt="Luxury interior"
                  className="w-full h-full object-cover "
                />
              </div>
              <div className="absolute bottom-0 right-0  bg-[#1A1A1A] text-white px-10 py-4 rounded-lg shadow-md text-center">
                <p className="text-sm">Starting at</p>
                <p className="text-xl font-semibold">$4,500</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
