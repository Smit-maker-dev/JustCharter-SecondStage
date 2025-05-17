import React, { useEffect, useState } from "react";
import { FaAngleDown, FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const fName = localStorage.getItem("first_name");
    const lName = localStorage.getItem("last_name");
    if (fName && lName) {
      
      setFirstName(fName);
      setLastName(lName);
    }
  }, []);

  const initials = (firstName?.charAt(0) || "") + (lastName?.charAt(0) || "");

  const navigate = useNavigate();
  const toggleServicesMenu = () => setIsServicesOpen(!isServicesOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-white shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center space-x-2">
          <img src="/images/Logo.png" alt="AceaAir Logo" className="h-8" />
        </div>

        <ul className="hidden md:flex space-x-6 text-sm relative">
          <li className="cursor-pointer" onClick={() => navigate("/Home")}>
            Home
          </li>
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

        <div
          onClick={() => navigate("/account")}
          className="hidden md:flex items-center bg-gray-50 p-1.5 rounded space-x-2 cursor-pointer hover:bg-gray-100 transition"
        >
          <div className="h-8 w-8 bg-[#FF6B6B] rounded-full flex items-center justify-center text-white text-sm font-medium">
            {initials.toUpperCase()}
          </div>
          <span className="text-sm text-[#FFD700]">
            {firstName} {lastName}
          </span>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-xl">
            {isMobileMenuOpen ? <IoClose /> : <FaBars />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden fixed top-16 left-0 w-full bg-white transition-all duration-500 ease-in-out overflow-hidden shadow-md ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center text-sm space-y-4 py-6">
          <ul className="space-y-4 text-center">
            <li className="cursor-pointer" onClick={() => navigate("/Home")}>
              Home
            </li>
            <li className="cursor-pointer">Bookings</li>

            <li>
              <div
                onClick={toggleServicesMenu}
                className="flex justify-center items-center space-x-1 cursor-pointer"
              >
                <span>Services</span>
                <FaAngleDown />
              </div>
              {isServicesOpen && (
                <ul className="mt-2 space-y-1 text-gray-700 text-center">
                  <li className="cursor-pointer">Flight Booking</li>
                  <li className="cursor-pointer">Hotel Deals</li>
                  <li className="cursor-pointer">Travel Insurance</li>
                </ul>
              )}
            </li>

            <li className="cursor-pointer">About</li>
            <li className="cursor-pointer">Contact us</li>
          </ul>
          <div className="profile-section">
            <div
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/account");
              }}
              className="flex items-center bg-gray-50 p-2 rounded space-x-2 cursor-pointer hover:bg-gray-100 transition"
            >
              <div className="h-8 w-8 bg-[#FF6B6B] rounded-full flex items-center justify-center text-white text-sm font-medium">
                {initials.toUpperCase()}
              </div>
              <span className="text-sm text-[#FFD700]">
                {firstName} {lastName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
