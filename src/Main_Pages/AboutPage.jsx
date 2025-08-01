import { Calendar, Clock, PlaneTakeoff, Shield, Star, Users } from "lucide-react";
import React from "react";
import { FaGlobe, FaCompass } from "react-icons/fa";
export default function AboutPage() {
  const values = [
    {
      title: "Excellence",
      description: "Setting the highest standards in private aviation",
    },
    {
      title: "Privacy",
      description: "Ensuring discretion and confidentiality",
    },
    {
      title: "Safety",
      description: "Unwavering commitment to your security",
    },
    {
      title: "Satisfaction",
      description: "Exceeding expectations at every altitude",
    },
  ];
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
  return (
    <div className="Aout_us_page">
      {/* Hero Section */}
      <section
        className=" relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/AboutHeroImage.jpg')",
          // backgroundImage: "url('https://cdn-62f78522c1ac18fe3c623dbe.closte.com/wp-content/uploads/2023/06/Travelling-by-private-jethere-are-all-the-advantagesA.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50 bg-opacity-60"></div>
        <div className="relative text-center px-4">
          <h1 className=" text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            <span
              className="text-[#DFA93B] shadow"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Luxury Meets the Sky
            </span>
          </h1>
          <p className="text-[#FFFFFF] mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
            Experience Private Aviation Redefined
          </p>
        </div>
      </section>
      {/* About Section */}
      <section className="bg-[#E5E7EB] py-10 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className=" mx-[110px] text-center">
          <h2
            className="text-2xl sm:text-3xl md:text-[28px] font-semibold text-[#1A1F2C] mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            About Us
          </h2>
          <p className="text-sm sm:text-base md:text-[18px] text-[#000000] leading-relaxed mb-6">
            Welcome to JustCharter, where luxury meets the sky. We specialize in
            providing unparalleled private aviation services tailored to meet
            the unique needs of discerning clients worldwide. Our mission is to
            elevate every flight experience with exceptional service,
            world-class safety standards, and a commitment to excellence.
          </p>
          <p className="text-sm sm:text-base md:text-[18px] text-[#000000] leading-relaxed">
            At JustCharter, safety is our highest priority. Our rigorous maintenance
            protocols, experienced crew selection, and continuous training
            programs ensure that every flight meets the industry's most
            stringent safety requirements.
          </p>
        </div>
      </section>
      {/* Third Section */}
      <div className="px-4 py-10 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4 sm:px-6 lg:px-8">
          {/* Vision */}
          <div className="cursor-pointer border-2 border-gray-300 rounded-xl p-4 md:p-8 hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-[#1A9FFF] text-3xl">
                <FaGlobe />
              </div>
              <h3 className="text-lg md:text-xl font-semibold">Our Vision</h3>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              To revolutionize private aviation by setting new standards in
              luxury, safety, and personalized service, making exceptional air
              travel accessible to discerning clients worldwide.
            </p>
          </div>

          {/* Mission */}
          <div className="cursor-pointer border-2 border-gray-300 rounded-xl p-4 md:p-8 hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-[#1A9FFF] text-3xl">
                <FaCompass />
              </div>
              <h3 className="text-lg md:text-xl font-semibold">Our Mission</h3>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              To deliver unparalleled private aviation experiences through
              cutting-edge technology, exceptional customer service, and
              unwavering commitment to safety and comfort.
            </p>
          </div>
        </div>
      </div>
      {/*  Why choose us*/}
      <div className="premium-aviation-services bg-[#F9FAFB] mt-2  py-18 px-6">
        <section className="max-w-7xl mx-auto text-center">
          <h1
            className="text-[28px] font-bold mb-4 text-[#1A1F2C]"
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Why Choose Us
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg py-8 px-6 text-center shadow-sm hover:shadow-md transition">
              <PlaneTakeoff className="mx-auto mb-4 text-[#1A9FFF]" size={36} />
              <h3 className="font-semibold mb-2">Private Charter</h3>
              <p className="text-sm text-gray-600">
                Tailored flight experiences to meet your specific needs, with
                access to over 5,000 airports worldwide.
              </p>
            </div>

            <div className="bg-white rounded-lg py-8 px-6 text-center shadow-sm hover:shadow-md transition">
              <Shield className="mx-auto mb-4 text-[#1A9FFF]" size={36} />
              <h3 className="font-semibold mb-2">Safety First</h3>
              <p className="text-sm text-gray-600">
                Our fleet meets the highest safety standards with rigorous
                maintenance and experienced flight crews.
              </p>
            </div>

            <div className=" bg-white rounded-lg py-8 px-6 text-center shadow-sm hover:shadow-md transition">
              <Calendar className="mx-auto mb-4 text-[#1A9FFF]" size={36} />
              <h3 className="font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-sm text-gray-600">
                Fly on your terms with departure times that suit your schedule,
                avoiding commercial airline constraints.
              </p>
            </div>

            <div className="bg-white rounded-lg py-8 px-6 text-center shadow-sm hover:shadow-md transition">
              <Clock className="mx-auto mb-4 text-[#1A9FFF]" size={36} />
              <h3 className="font-semibold mb-2">Time Efficiency</h3>
              <p className="text-sm text-gray-600">
                Skip long security lines and boarding processes, making your
                journey faster and more comfortable.
              </p>
            </div>
          </div>
        </section>
      </div>
      {/* Our Values */}
      <div className="px-4 py-12 md:py-18 bg-white">
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
          }}
          className="text-center text-xl md:text-[28px] font-semibold text-gray-800 mb-10"
        >
          Our Values
        </h1>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer border-2 border-gray-300 rounded-xl p-6  hover:shadow-md transition"
            >
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm md:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Testimonials */}
      <div className="bg-[#F9FAFB] py-18  px-4 sm:px-6 lg:px-20">
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
              className="bg-white rounded-[8px] shadow-md p-7 flex flex-col justify-between mx-7"
            >
              <div className="mb-4 ">
                <div className="flex items-center mb-2 ">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-[#DFA93B] fill-[#DFA93B] mr-1"
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
      </div>
    </div>
  );
}
