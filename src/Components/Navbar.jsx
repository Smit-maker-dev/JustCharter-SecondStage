import React, { useEffect, useState } from "react";
import { FaAngleDown, FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axiosInstance";
export default function Navbar() {
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
  //   const token =
  //     localStorage.getItem("token") || localStorage.getItem("access_token");
  //   if (!token) return;

  //   const fetchUser = async () => {
  //     try {
  //       const response = await axios.get("/user");
  //       const { first_name, last_name } = response.data.data;

  //       if (first_name && last_name) {
  //         setFirstName(first_name);
  //         setLastName(last_name);
  //       }
  //     } catch (error) {
  //       if (process.env.NODE_ENV === "development") {
  //         console.error("Failed to fetch user data:", error);
  //       }
  //     }
  //   };

  //   fetchUser();
  // }, []);
  useEffect(() => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("access_token");
    if (!token) return;

    const fetchUser = async () => {
      try {
        const useAccessToken = Boolean(localStorage.getItem("access_token"));

        const response = await axios.get("/user", {
          useAccessToken: useAccessToken,
        });

        const { first_name, last_name } = response.data.data;

        if (first_name && last_name) {
          setFirstName(first_name);
          setLastName(last_name);
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    fetchUser();
  }, []);

  const location = useLocation();
  const isHome = location.pathname === "/";
  const showScrolledStyle = !isHome || isScrolled;

  const initials = (firstName?.charAt(0) || "") + (lastName?.charAt(0) || "");

  const navigate = useNavigate();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          showScrolledStyle ? "bg-white shadow-sm" : "bg-transparent "
        }`}
      >
        <div className=" mx-auto px-10 flex items-center justify-between h-16 ">
          <div className="flex items-center space-x-2">
            {/* <img src="/images/Logo.png" alt="JustCharter Logo" className="h-5" /> */}
            <img
              src="/brand/logo.svg"
              alt="JustCharter Logo"
              className="h-8 sm:h-8 md:h-8 lg:h-9 w-auto object-contain transition duration-300"
            />
          </div>

          <ul className="hidden lg:flex space-x-6 text-sm relative">
            {[
              { label: "Home", path: "/" },
              { label: "Fleet", path: "/fleet" },
              { label: "Services", path: "/services" },
              { label: "About", path: "/about" },
              { label: "Privacy & Policy", path: "/privacy_policy" },
            ].map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li
                  key={item.label}
                  className={`cursor-pointer transition-colors duration-300 ${
                    isActive
                      ? "text-[#8A6D00] font-extrabold"
                      : showScrolledStyle
                      ? "text-[#002F5C]"
                      : "text-white"
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </li>
              );
            })}
          </ul>

          {firstName && lastName ? (
            <div
              onClick={() => navigate("/account")}
              className="hidden md:flex items-center p-1.5 rounded space-x-2 cursor-pointer hover:bg-gray-400 transition"
            >
              <div className="h-8 w-8 bg-[#FFD200] text-[#1A1A1A] font-bold rounded-full flex items-center justify-center text-sm font-medium">
                {initials.toUpperCase()}
              </div>
              <span
                className={`text-sm transition-colors duration-300 ${
                  showScrolledStyle ? "text-[#8A6D00]" : "text-[#FFFFFF]"
                }`}
              >
                {firstName} {lastName}
              </span>
            </div>
          ) : (
            <div className="hidden lg:flex space-x-4">
              <button
                onClick={() => navigate("/register")}
                className={`cursor-pointer text-sm px-6 py-2 rounded-md transition font-medium ${
                  showScrolledStyle
                    ? "text-[#002F5C] hover:bg-[#FFFBEA] hover:text-[#1A1A1A]"
                    : "text-white hover:bg-[#FFD200] hover:text-[#1A1A1A]"
                }`}
              >
                Sign Up
              </button>
              <button
                onClick={() => navigate("/login")}
                className={`text-sm px-10 py-2 rounded-md transition cursor-pointer font-bold bg-[#FFD200] text-[#1A1A1A] hover:bg-[#E6BC00]`}
              >
                Login
              </button>
            </div>
          )}

          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className={`text-xl transition-colors duration-300 ${
                showScrolledStyle ? "text-[#002F5C]" : "text-white"
              }`}
            >
              {isMobileMenuOpen ? <IoClose /> : <FaBars />}
            </button>
          </div>
        </div>

        <div
          className={`lg:hidden fixed top-16 left-0 w-full bg-white transition-all duration-500 ease-in-out overflow-hidden shadow-md ${
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center text-sm space-y-4 py-6">
            {/* <ul className="space-y-4 text-center">
              <li
                className="cursor-pointer text-[#FFD200]"
                onClick={() => navigate("/")}
              >
                Home
              </li>
              <li
                className={`cursor-pointer transition-colors duration-300 ${
                  showScrolledStyle ? "text-[#000000]" : "text-[#002F5C]"
                }`}
                onClick={() => navigate("/bookings")}
              >
                Bookings
              </li>

              <li>
                <div
                  className={`flex justify-center items-center space-x-1 cursor-pointer transition-colors duration-300 ${
                    showScrolledStyle ? "text-[#002F5C]" : "text-[#002F5C]"
                  }`}
                >
                  <span>Services</span>
                </div>
              </li>
              <li
                className={`cursor-pointer transition-colors duration-300 ${
                  showScrolledStyle ? "text-[#000000]" : "text-[#002F5C]"
                }`}
              >
                Event
              </li>
              <li
                className={`cursor-pointer transition-colors duration-300 ${
                  showScrolledStyle ? "text-[#000000]" : "text-[#002F5C]"
                }`}
              >
                Buy & Sell
              </li>
              <li
                className={`cursor-pointer transition-colors duration-300 ${
                  showScrolledStyle ? "text-[#000000]" : "text-[#002F5C]"
                }`}
              >
                About
              </li>
            </ul> */}
            <ul className="space-y-4 text-center">
              {[
                { label: "Home", path: "/" },
                { label: "Fleet", path: "/fleet" },
                { label: "Services", path: "/services" },
                { label: "About", path: "/about" },
                { label: "Privacy & Policy", path: "/privacy_policy" },
              ].map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li
                    key={item.label}
                    className={`cursor-pointer transition-colors duration-300 ${
                      isActive
                        ? "text-[#FFD200] font-semibold"
                        : showScrolledStyle
                        ? "text-[#002F5C]"
                        : "text-[#002F5C]"
                    }`}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate(item.path);
                    }}
                  >
                    {item.label}
                  </li>
                );
              })}
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
                      showScrolledStyle ? "text-[#FFD200]" : "text-[#002F5C]"
                    }`}
                  >
                    {firstName} {lastName}
                  </span>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <button
                    onClick={() => navigate("/register")}
                    className={`text-sm px-4 py-2 rounded transition ${
                      showScrolledStyle
                        ? "text-[#002F5C] hover:bg-[#FFD200] border"
                        : "text-[#002F5C] hover:bg-[#FFD200] border hover:text-white"
                    }`}
                  >
                    Sign Up
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate("/login");
                    }}
                    className={`text-sm px-4 py-2 rounded transition ${
                      showScrolledStyle
                        ? "text-white shadow-md bg-[#FFD200] hover:bg-[#e6be00]"
                        : "text-white shadow-md bg-[#FFD200] hover:bg-[#e6be00]"
                    }`}
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
