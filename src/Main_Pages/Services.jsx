import React from 'react'

export default function Services() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        // backgroundImage: "url('/images/Herosectionbg.jpeg')",
        backgroundImage: "url('https://images.pexels.com/photos/20640861/pexels-photo-20640861.jpeg')",
        fontFamily: "'Playfair Display', serif",
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <h1 className="relative z-10 text-3xl md:text-5xl font-bold text-white">
        Coming Soon
      </h1>
    </div>
  )
}
