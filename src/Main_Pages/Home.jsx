import React from 'react';
import { useState, useEffect } from 'react';

export default function Home(){
  return (
    <div className="min-h-screen bg-gray-50">
   


      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-50"
            src="/images/privatejet.png"
            alt="Private Jet"
          />
          <div className="absolute inset-0 bg-gray-00 mix-blend-multiply" aria-hidden="true"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            Welcome to <span className="text-blue-400">AceaAir</span>
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-300">
            Experience the pinnacle of luxury travel with our exclusive private jet services. Fly on your terms, with unmatched comfort and privacy.
          </p>
          <div className="mt-10">
            <a
              href="#"
              className="inline-block bg-blue-600 border border-transparent py-3 px-8 rounded-md text-base font-medium text-white hover:bg-blue-700"
            >
              Explore Our Fleet
            </a>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('flights')}
                className={`${activeTab === 'flights' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
              >
                Private Flights
              </button>
              <button
                onClick={() => setActiveTab('membership')}
                className={`${activeTab === 'membership' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
              >
                Membership
              </button>
              <button
                onClick={() => setActiveTab('empty-legs')}
                className={`${activeTab === 'empty-legs' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
              >
                Empty Legs
              </button>
            </nav>
          </div>
          <div className="p-6">
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="from" className="block text-sm font-medium text-gray-700">
                    From
                  </label>
                  <input
                    type="text"
                    id="from"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="City or Airport"
                  />
                </div>
                <div>
                  <label htmlFor="to" className="block text-sm font-medium text-gray-700">
                    To
                  </label>
                  <input
                    type="text"
                    id="to"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="City or Airport"
                  />
                </div>
                <div>
                  <label htmlFor="departure" className="block text-sm font-medium text-gray-700">
                    Departure
                  </label>
                  <input
                    type="date"
                    id="departure"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="passengers" className="block text-sm font-medium text-gray-700">
                    Passengers
                  </label>
                  <select
                    id="passengers"
                    value={passengers}
                    onChange={(e) => setPassengers(parseInt(e.target.value))}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Passenger' : 'Passengers'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Search Flights
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Why Choose AceaAir</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Unmatched Private Aviation
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Experience the difference with our premium private jet services.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 ring-4 ring-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium">
                    <a href="#" className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true"></span>
                      Time Efficiency
                    </a>
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Skip commercial airport hassles with direct access to thousands of private terminals worldwide. Our average boarding time is under 15 minutes.
                  </p>
                </div>
              </div>

              <div className="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 ring-4 ring-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium">
                    <a href="#" className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true"></span>
                      Global Coverage
                    </a>
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Access to over 5,000 airports worldwide compared to just 500 served by commercial airlines. Fly directly to your destination.
                  </p>
                </div>
              </div>

              <div className="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 ring-4 ring-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium">
                    <a href="#" className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true"></span>
                      Privacy & Security
                    </a>
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Complete confidentiality with discreet terminals and private lounges. All our crew undergo rigorous security vetting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fleet Preview */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Our Premium Fleet
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Select from our range of meticulously maintained aircraft.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            <div className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src="https://desertjet.com/app/uploads/2023/09/Desert-Jet-Citation-Sovereign.jpg"
                  alt="Light Jet"
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0"></span>
                      Phenom 300
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Light Jet</p>
                </div>
                <p className="text-sm font-medium text-gray-900">From $5,000/hr</p>
              </div>
            </div>

            <div className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src="/images/privatejet.png"
                  alt="Midsize Jet"
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0"></span>
                      Hawker 800XP  
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Midsize Jet</p>
                </div>
                <p className="text-sm font-medium text-gray-900">From $7,500/hr</p>
              </div>
            </div>
            <div className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src="https://hautejets.com/wp-content/uploads/2024/11/Dassault-Falcon-2000EX-featured-image.jpg"
                  alt="Heavy Jet"
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0"></span>
                      Gulfstream G550
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Heavy Jet</p>
                </div>
                <p className="text-sm font-medium text-gray-900">From $12,000/hr</p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href="#"
              className="inline-block bg-white border border-gray-300 rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-50"
            >
              View Full Fleet
            </a>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-blue-700 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base font-semibold tracking-wide text-blue-200 uppercase">Client Experiences</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              What Our Clients Say
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-12 w-12 rounded-full" src="https://randomuser.me/api/portraits/women/32.jpg" alt="Sarah Johnson" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Sarah Johnson</h3>
                  <p className="text-gray-500">CEO, Tech Innovations</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-600">
                  "AceaAir transformed my business travel. The ability to work undisturbed and arrive refreshed has been game-changing. Their attention to detail is unmatched."
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-12 w-12 rounded-full" src="https://randomuser.me/api/portraits/men/45.jpg" alt="Michael Chen" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Michael Chen</h3>
                  <p className="text-gray-500">Founder, Venture Capital</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-600">
                  "The safety record and professionalism of AceaAir's crew give me complete peace of mind when flying with my family. Worth every penny for the convenience."
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-12 w-12 rounded-full" src="https://randomuser.me/api/portraits/women/68.jpg" alt="Elena Rodriguez" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Elena Rodriguez</h3>
                  <p className="text-gray-500">Professional Athlete</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-600">
                  "As someone who travels constantly, AceaAir's flexibility has been invaluable. Last-minute schedule changes are handled seamlessly. The cabins are always immaculate."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to experience premium private aviation?</span>
            <span className="block text-blue-600">Contact our flight specialists today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Get a Quote
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Services</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">Private Charters</a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">Jet Cards</a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">Membership</a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">Empty Legs</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">About</a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">Safety</a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">Careers</a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">News</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">Contact</a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">FAQ</a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">Privacy</a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">Terms</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Connect</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">Instagram</a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">Twitter</a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">LinkedIn</a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">Facebook</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              &copy; 2023 AceaAir Private. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

