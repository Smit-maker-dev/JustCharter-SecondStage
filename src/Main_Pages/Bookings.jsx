import React from "react";

export default function Bookings() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/Herosectionbg.jpeg')",
        fontFamily: "'Playfair Display', serif",
      }}
    >
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <h1 className="relative z-10 text-3xl md:text-5xl font-bold text-white">
       Bookings will be Coming Soon
      </h1>
    </div>
  );
}
