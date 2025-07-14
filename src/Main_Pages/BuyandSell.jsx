import React from "react";

export default function BuyAndSell() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/2245276/pexels-photo-2245276.jpeg')",
        fontFamily: "'Playfair Display', serif",
      }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />

      <h1 className="relative z-10 text-3xl md:text-5xl font-bold text-white">
        Coming Soon
      </h1>
    </div>
  );
}

//new commit changes