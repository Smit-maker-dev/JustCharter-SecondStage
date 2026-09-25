import React, { useState } from "react";
import { MapPin, Calendar, Users, ArrowRight, ShieldCheck } from "lucide-react";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";

export default function HeroSectionV3() {
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [tripType, setTripType] = useState("one-way");
  const [bookingData, setBookingData] = useState({
    from: "New Delhi (DEL)",
    to: "Paris Le Bourget (LBG)",
    date: "2026-09-28",
    passengers: "4 Guests",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("V3 Search:", bookingData);
  };

  return (
    <div className="relative font-sans bg-white overflow-hidden">
      
      {/* Floating Audio Mute Control Pill */}
      <button
        onClick={() => setIsAudioMuted(!isAudioMuted)}
        className="cursor-pointer fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-slate-900 text-white shadow-2xl hover:scale-105 transition-all border border-slate-700"
        aria-label={isAudioMuted ? "Unmute video" : "Mute video"}
      >
        {isAudioMuted ? (
          <IoVolumeMuteOutline size={20} />
        ) : (
          <IoVolumeHighOutline size={20} />
        )}
      </button>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between pt-24 pb-14">
        
        {/* Background Video with Soft White Bottom Fade Gradient */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            muted={isAudioMuted}
            loop
            playsInline
            className="w-full h-full object-cover object-center scale-105 filter brightness-[0.88]"
          >
            <source
              src="/images/Paradigm Shift_ The Next-Gen Gulfstream Fleet (2023).mp4"
              type="video/mp4"
            />
          </video>
          {/* Subtle Top & Bottom White Fade Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-white"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white my-auto pt-8 pb-12">
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05] max-w-5xl mx-auto mb-6">
            Private Aviation <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#FF9C0A]">
              Made Simple
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-slate-100 font-light max-w-2xl mx-auto mb-4 leading-relaxed">
            Experience seamless corporate travel with our premium fleet.
          </p>

          <div className="inline-block bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            <span className="text-xs text-[#FF9C0A] font-semibold uppercase tracking-[0.2em]">
              Over 500+ Destinations Worldwide
            </span>
          </div>
        </div>

        {/* REWORKED HERO SEARCH BAR: 32px Outer Container, Apple iOS-Style Segmented Control, 12px Floating Button Inset */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 w-full">
          <div className="bg-white/98 backdrop-blur-2xl rounded-[32px] p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.12)] border border-slate-200/80">
            
            {/* Top Tier: Apple/iOS-Style Segmented Control & Right-Aligned Direct Quote Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-100">
              
              {/* Apple iOS-Style Segmented Control (Shared track bg-slate-100/90, floating active pill) */}
              <div className="inline-flex items-center bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/60 shadow-inner">
                {["one-way", "round-trip", "multi-city"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTripType(type)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      tripType === type
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-600 hover:text-[#002F5C]"
                    }`}
                  >
                    {type.replace("-", " ")}
                  </button>
                ))}
              </div>

              {/* Right-Aligned Direct Charter Quote Badge Pill */}
              <div className="inline-flex items-center space-x-2 bg-[#FF9C0A]/10 border border-[#FF9C0A]/30 px-4 py-2 rounded-full">
                <ShieldCheck className="w-4 h-4 text-[#FF9C0A]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF9C0A]">
                  Direct Charter Quote
                </span>
              </div>
            </div>

            {/* Bottom Tier: Input Fields + Floating Inset Search CTA Button (Nested 20px radius) */}
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3.5 items-center">
              
              {/* From Input Card */}
              <div className="lg:col-span-3 bg-slate-50/90 hover:bg-slate-100/80 border border-slate-200/60 rounded-2xl p-3.5 transition-colors">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FF9C0A]" />
                  <span>From</span>
                </label>
                <input
                  type="text"
                  name="from"
                  value={bookingData.from}
                  onChange={handleInputChange}
                  className="w-full bg-transparent text-xs sm:text-sm font-bold text-[#002F5C] focus:outline-none"
                />
              </div>

              {/* To Input Card */}
              <div className="lg:col-span-3 bg-slate-50/90 hover:bg-slate-100/80 border border-slate-200/60 rounded-2xl p-3.5 transition-colors">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FF9C0A]" />
                  <span>To</span>
                </label>
                <input
                  type="text"
                  name="to"
                  value={bookingData.to}
                  onChange={handleInputChange}
                  className="w-full bg-transparent text-xs sm:text-sm font-bold text-[#002F5C] focus:outline-none"
                />
              </div>

              {/* Date Input Card */}
              <div className="lg:col-span-2 bg-slate-50/90 hover:bg-slate-100/80 border border-slate-200/60 rounded-2xl p-3.5 transition-colors">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-[#FF9C0A]" />
                  <span>Date</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleInputChange}
                  className="w-full bg-transparent text-xs font-bold text-[#002F5C] focus:outline-none cursor-pointer"
                />
              </div>

              {/* Guests Input Card */}
              <div className="lg:col-span-2 bg-slate-50/90 hover:bg-slate-100/80 border border-slate-200/60 rounded-2xl p-3.5 transition-colors">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5 mb-1">
                  <Users className="w-3.5 h-3.5 text-[#FF9C0A]" />
                  <span>Guests</span>
                </label>
                <select
                  name="passengers"
                  value={bookingData.passengers}
                  onChange={handleInputChange}
                  className="w-full bg-transparent text-xs font-bold text-[#002F5C] focus:outline-none cursor-pointer"
                >
                  <option value="1-4 Guests">1 - 4 Guests</option>
                  <option value="4 Guests">4 Guests</option>
                  <option value="5-9 Guests">5 - 9 Guests</option>
                  <option value="10-19 Guests">10 - 19 Guests</option>
                </select>
              </div>

              {/* Search Flights CTA Button (12px inset gap, rounded-2xl math) */}
              <div className="lg:col-span-2">
                <button
                  type="submit"
                  className="w-full h-full min-h-[52px] bg-[#FF9C0A] hover:bg-[#e08800] text-[#002F5C] font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 border border-[#FF9C0A] cursor-pointer"
                >
                  <span>Search Flights</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>
        </div>

      </section>
    </div>
  );
}
