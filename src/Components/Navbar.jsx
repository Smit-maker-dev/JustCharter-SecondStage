import React, { useEffect, useState } from "react";
import { FaAngleDown, FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from '../api/axiosInstance'
export default function Navbar() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // useEffect(() => {
  //   const fName = localStorage.getItem("first_name");
  //   const lName = localStorage.getItem("last_name");
  //   if (fName && lName) {
  //     setFirstName(fName);
  //     setLastName(lName);
  //   }
  // }, []);
useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get("/user"); 
      const { first_name, last_name } = response.data;

      if (first_name && last_name) {
        setFirstName(first_name);
        setLastName(last_name);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  fetchUser();
}, []);
  const initials = (firstName?.charAt(0) || "") + (lastName?.charAt(0) || "");

  const navigate = useNavigate();
  const toggleServicesMenu = () => setIsServicesOpen(!isServicesOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center space-x-2">
          <img src="/images/Logo.png" alt="AceaAir Logo" className="h-8" />
        </div>

        <ul className="hidden md:flex space-x-6 text-sm relative">
          <li
            className="cursor-pointer text-[#FFD700]"
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li
            className={`cursor-pointer transition-colors duration-300 ${
              isScrolled ? "text-[#000000]" : "text-[#FFFFFF]"
            }`}
          >
            Bookings
          </li>

          <li className="relative">
            <div
              onClick={toggleServicesMenu}
              className={`flex justify-center items-center space-x-1 cursor-pointer transition-colors duration-300 ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
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
          <li
            className={`cursor-pointer transition-colors duration-300 ${
              isScrolled ? "text-[#000000]" : "text-[#FFFFFF]"
            }`}
          >
            Event
          </li>
          <li
            className={`cursor-pointer transition-colors duration-300 ${
              isScrolled ? "text-[#000000]" : "text-[#FFFFFF]"
            }`}
          >
            Buy & Sell
          </li>
          <li
            className={`cursor-pointer transition-colors duration-300 ${
              isScrolled ? "text-[#000000]" : "text-[#FFFFFF]"
            }`}
          >
            About
          </li>
        </ul>

        {firstName && lastName ? (
          <div
            onClick={() => navigate("/account")}
            className="hidden md:flex items-center p-1.5 rounded space-x-2 cursor-pointer hover:bg-gray-400 transition"
          >
            <div className="h-8 w-8 bg-[#FF6B6B] rounded-full flex items-center justify-center text-white text-sm font-medium">
              {initials.toUpperCase()}
            </div>
            <span
              className={`text-sm transition-colors duration-300 ${
                isScrolled ? "text-[#FFD700]" : "text-[#FFFFFF]"
              }`}
            >
              {firstName} {lastName}
            </span>
          </div>
        ) : (
          <div className="hidden md:flex space-x-4">
            <button
              onClick={() => navigate("/register")}
              className="text-sm px-4 py-2  text-white rounded hover:bg-yellow-400 hover:text-black transition "
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate("/login")}
              className="text-sm px-10 py-2 bg-[#1A9FFF] text-white  rounded-md hover:bg-gray-100 transition"
            >
              Login
            </button>
          </div>
        )}

        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-xl ">
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
            <li
              className="cursor-pointer text-[#FFD700]"
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer transition-colors duration-300 ${
                isScrolled ? "text-[#000000]" : "text-[#FFFFFF]"
              }`}
            >
              Bookings
            </li>

            <li>
              <div
                onClick={toggleServicesMenu}
                className={`flex justify-center items-center space-x-1 cursor-pointer transition-colors duration-300 ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
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
            <li
              className={`cursor-pointer transition-colors duration-300 ${
                isScrolled ? "text-[#000000]" : "text-[#FFFFFF]"
              }`}
            >
              Event
            </li>
            <li
              className={`cursor-pointer transition-colors duration-300 ${
                isScrolled ? "text-[#000000]" : "text-[#FFFFFF]"
              }`}
            >
              Buy & Sell
            </li>
            <li
              className={`cursor-pointer transition-colors duration-300 ${
                isScrolled ? "text-[#000000]" : "text-[#FFFFFF]"
              }`}
            >
              About
            </li>
          </ul>
          <div className="profile-section">
            {firstName && lastName ? (
              <div
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/account");
                }}
                className="flex items-center p-2 rounded space-x-2 cursor-pointer hover:bg-gray-100 transition"
              >
                <div className="h-8 w-8 bg-[#FF6B6B] rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {initials.toUpperCase()}
                </div>
                <span
                  className={`text-sm transition-colors duration-300 ${
                    isScrolled ? "text-[#FFD700]" : "text-[#000000]"
                  }`}
                >
                  {firstName} {lastName}
                </span>
              </div>
            ) : (
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate("/register");
                  }}
                  className="text-sm px-4 py-2  text-black rounded hover:bg-yellow-400 transition"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate("/login");
                  }}
                  className="text-sm px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
