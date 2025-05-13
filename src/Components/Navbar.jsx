import React, { useState } from "react";
import logo from "../assets/Images/Logo.png";
import { FaAngleDown } from "react-icons/fa6";

export default function Navbar() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleServicesMenu = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="AceaAir Logo" className="h-8" />
        </div>

        <ul className="hidden md:flex space-x-6 text-sm relative">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">Bookings</li>

          <li className="relative">
            <div
              onClick={toggleServicesMenu}
              className="flex items-center space-x-1 cursor-pointer"
            >
              <span>Services</span>
              <FaAngleDown />
            </div>

            {isServicesOpen && (
              <ul className="absolute top-full left-0 right-16 mt-4 w-40 bg-white border border-gray-100 shadow-md rounded z-10">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Flight Booking
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Hotel Deals
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Travel Insurance
                </li>
              </ul>
            )}
          </li>
        <li className="cursor-pointer">About</li>
          <li className="cursor-pointer">Contact us</li>
        </ul>

        <div className="flex items-center bg-gray-50 p-1.5 rounded space-x-2 cursor-pointer">
          <div className="h-8 w-8 bg-[#FF6B6B] rounded-full flex items-center justify-center text-white text-sm font-medium">
            AV
          </div>
          <span className="text-sm text-[#FFD700]">Aarav Mehta</span>
        </div>
      </div>
    </nav>
  );
}
