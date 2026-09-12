import React, { useState } from "react";
import { MapPin, Calendar, Users, ArrowRight, ShieldCheck } from "lucide-react";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";

export default function HeroSectionV5() {
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [tripType, setTripType] = useState("one-way");
  const [bookingData, setBookingData] = useState({
    from: "New Delhi (DEL)",
    to: "Paris Le Bourget (LBG)",
    date: "2026-09-28",
    passengers: "4 Guests",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("V5 Search:", bookingData);
  };

  return (
    <div className="relative font-sans bg-white text-stone-900 overflow-hidden">
      
      {/* Floating Audio Control Pill */}
      <button
        onClick={() => setIsAudioMuted(!isAudioMuted)}
        className="cursor-pointer fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-white/90 text-stone-900 shadow-md hover:shadow-lg backdrop-blur-md transition-all border border-stone-200/80"
        aria-label={isAudioMuted ? "Unmute video" : "Mute video"}
      >
        {isAudioMuted ? (
          <IoVolumeMuteOutline size={20} />
        ) : (
          <IoVolumeHighOutline size={20} />
        )}
      </button>

      {/* Hero Full Screen Viewport */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between pt-28 pb-16 bg-stone-900">
        
        {/* Background Video Media with Soft Vignette */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            muted={isAudioMuted}
            loop
            playsInline
            className="w-full h-full object-cover object-center scale-105 filter brightness-[0.75]"
          >
            <source
              src="/images/Paradigm Shift_ The Next-Gen Gulfstream Fleet (2023).mp4"
              type="video/mp4"
            />
          </video>
          {/* Subtle top & bottom soft fade overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/20 to-white/95"></div>
        </div>

        {/* Hero Central Story Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white my-auto pt-10 pb-16">
          
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#DFA93B]"></span>
            <span className="text-xs font-serif italic tracking-widest uppercase text-stone-100">
              Over 500+ Destinations Worldwide
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tight text-white leading-[1.08] mb-6 max-w-4xl mx-auto drop-shadow-sm">
            Private Aviation <br className="hidden sm:block" />
            <span className="italic font-serif font-light text-stone-200">
              Made Simple
            </span>
          </h1>

          <p className="text-base sm:text-xl text-stone-200 font-sans font-light max-w-2xl mx-auto leading-relaxed">
            Experience seamless corporate travel with our premium fleet.
          </p>
        </div>

        {/* Grounded Embedded Booking Bar (Overlapping Hero Bottom Edge) */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 w-full -mb-24 sm:-mb-28">
          <div className="bg-white/98 backdrop-blur-2xl rounded-2xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.06)] border border-stone-200/80">
            
            {/* Top Bar: Minimalist Trip Selector & Direct Quote Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-5 border-b border-stone-100">
              
              {/* Minimalist Segment Buttons */}
              <div className="inline-flex items-center bg-stone-100/90 p-1 rounded-xl border border-stone-200/60">
                {["one-way", "round-trip", "multi-city"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTripType(type)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      tripType === type
                        ? "bg-white text-stone-900 shadow-sm"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    {type.replace("-", " ")}
                  </button>
                ))}
              </div>

              {/* Direct Charter Quote Badge */}
              <div className="inline-flex items-center space-x-2 bg-stone-50 border border-stone-200/80 px-4 py-2 rounded-full">
                <ShieldCheck className="w-4 h-4 text-[#DFA93B]" />
                <span className="text-xs font-serif italic text-stone-800">
                  Direct Charter Quote
                </span>
              </div>
            </div>

            {/* Input Controls */}
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 items-center">
              
              {/* From */}
              <div className="lg:col-span-3 bg-stone-50/90 hover:bg-stone-100/80 border border-stone-200/70 rounded-xl p-3.5 transition-all">
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 flex items-center space-x-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#DFA93B]" />
                  <span>From</span>
                </label>
                <input
                  type="text"
                  name="from"
                  value={bookingData.from}
                  onChange={handleInputChange}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-stone-900 focus:outline-none"
                />
              </div>

              {/* To */}
              <div className="lg:col-span-3 bg-stone-50/90 hover:bg-stone-100/80 border border-stone-200/70 rounded-xl p-3.5 transition-all">
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 flex items-center space-x-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#DFA93B]" />
                  <span>To</span>
                </label>
                <input
                  type="text"
                  name="to"
                  value={bookingData.to}
                  onChange={handleInputChange}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-stone-900 focus:outline-none"
                />
              </div>

              {/* Date */}
              <div className="lg:col-span-2 bg-stone-50/90 hover:bg-stone-100/80 border border-stone-200/70 rounded-xl p-3.5 transition-all">
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 flex items-center space-x-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-[#DFA93B]" />
                  <span>Date</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleInputChange}
                  className="w-full bg-transparent text-xs font-semibold text-stone-900 focus:outline-none cursor-pointer"
                />
              </div>

              {/* Guests */}
              <div className="lg:col-span-2 bg-stone-50/90 hover:bg-stone-100/80 border border-stone-200/70 rounded-xl p-3.5 transition-all">
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 flex items-center space-x-1.5 mb-1">
                  <Users className="w-3.5 h-3.5 text-[#DFA93B]" />
                  <span>Guests</span>
                </label>
                <select
                  name="passengers"
                  value={bookingData.passengers}
                  onChange={handleInputChange}
                  className="w-full bg-transparent text-xs font-semibold text-stone-900 focus:outline-none cursor-pointer"
                >
                  <option value="1-4 Guests">1 - 4 Guests</option>
                  <option value="4 Guests">4 Guests</option>
                  <option value="5-9 Guests">5 - 9 Guests</option>
                  <option value="10-19 Guests">10 - 19 Guests</option>
                </select>
              </div>

              {/* CTA Button */}
              <div className="lg:col-span-2">
                <button
                  type="submit"
                  className="w-full h-full min-h-[52px] bg-[#DFA93B] hover:bg-[#c9952f] text-stone-950 font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center space-x-2 cursor-pointer border border-[#d29c30]"
                >
                  <span>Search Flights</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>
        </div>

      </section>
      
      {/* Spacer to handle negative margin overlapping bottom container cleanly */}
      <div className="h-28 sm:h-32 bg-white"></div>
    </div>
  );
}
