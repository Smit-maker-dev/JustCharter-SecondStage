import React, { useEffect, useState } from "react";
import { FaAngleDown, FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axiosInstance";
import Logo from "./Logo";
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
  const showScrolledStyle = !isHome || isScrolled || isMobileMenuOpen;

  const initials = (firstName?.charAt(0) || "") + (lastName?.charAt(0) || "");
  const navigate = useNavigate();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Fleet", path: "/fleet" },
    { label: "How It Works", path: "/#how-it-works" },
    { label: "For Operators", path: "/for-operators" },
    { label: "About", path: "/about" },
  ];

  const handleNavClick = (path) => {
    setIsMobileMenuOpen(false);
    if (path.startsWith("/#")) {
      const id = path.replace("/#", "");
      if (location.pathname === "/") {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
      navigate(path);
      return;
    }
    navigate(path);
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
  }, [location]);

  return (
    <>
      {/* Subtle gradient scrim behind transparent header over hero (rgba(0,0,0,0.45) to 0, 120px tall) */}
      {!showScrolledStyle && (
        <div
          aria-hidden="true"
          className="fixed top-0 left-0 w-full h-[120px] pointer-events-none z-40 transition-opacity duration-300 bg-gradient-to-b from-black/45 to-transparent"
        />
      )}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          showScrolledStyle ? "bg-white shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="mx-auto px-6 sm:px-10 flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 cursor-pointer flex-shrink-0" onClick={() => navigate("/")}>
            <Logo
              variant={showScrolledStyle ? "light" : "dark"}
              alt="JustCharter Logo"
              className="h-8 sm:h-8 md:h-8 lg:h-9 w-auto object-contain transition-all duration-300"
            />
          </div>

          <ul className="hidden lg:flex items-center space-x-6 text-sm relative">
            {navItems.map((item) => {
              const isActive =
                item.path.startsWith("/#")
                  ? location.pathname === "/" && location.hash === item.path.replace("/", "")
                  : location.pathname === item.path;
              return (
                <li
                  key={item.label}
                  className={`cursor-pointer transition-colors duration-300 font-medium ${
                    isActive
                      ? "text-[#8A6D00] font-extrabold"
                      : showScrolledStyle
                      ? "text-[#002F5C] hover:text-[#8A6D00]"
                      : "text-white hover:text-[#FFD200]"
                  }`}
                  onClick={() => handleNavClick(item.path)}
                >
                  {item.label}
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => navigate("/request-quote")}
              className="cursor-pointer text-xs sm:text-sm px-5 py-2 rounded-full font-semibold transition bg-[#FFD200] text-[#002F5C] hover:bg-[#e6be00] shadow-sm whitespace-nowrap"
            >
              Request Quote
            </button>

            {firstName && lastName ? (
              <div
                onClick={() => navigate("/account")}
                className="flex items-center p-1.5 rounded-full space-x-2 cursor-pointer hover:bg-stone-100/30 transition"
              >
                <div className="h-8 w-8 bg-[#FFD200] text-[#002F5C] font-bold rounded-full flex items-center justify-center text-xs">
                  {initials.toUpperCase()}
                </div>
                <span
                  className={`text-sm transition-colors duration-300 font-medium ${
                    showScrolledStyle ? "text-[#002F5C]" : "text-white"
                  }`}
                >
                  {firstName} {lastName}
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigate("/register")}
                  className={`cursor-pointer text-xs sm:text-sm px-3.5 py-2 rounded-full transition font-medium ${
                    showScrolledStyle
                      ? "text-[#002F5C] hover:bg-stone-100"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Sign Up
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className={`cursor-pointer text-xs sm:text-sm px-4 py-1.5 rounded-full transition font-medium border ${
                    showScrolledStyle
                      ? "border-[#002F5C]/30 text-[#002F5C] hover:bg-stone-100"
                      : "border-white/40 text-white hover:bg-white/10"
                  }`}
                >
                  Login
                </button>
              </div>
            )}
          </div>

          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className={`text-xl transition-colors duration-300 ${
                showScrolledStyle ? "text-[#002F5C]" : "text-white"
              }`}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <IoClose /> : <FaBars />}
            </button>
          </div>
        </div>

        <div
          className={`lg:hidden fixed top-16 left-0 w-full bg-white transition-all duration-300 ease-in-out overflow-hidden shadow-lg border-b border-stone-200 ${
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col items-center text-sm space-y-4 py-6 px-6">
            <ul className="space-y-4 text-center w-full">
              {navItems.map((item) => {
                const isActive =
                  item.path.startsWith("/#")
                    ? location.pathname === "/" && location.hash === item.path.replace("/", "")
                    : location.pathname === item.path;
                return (
                  <li
                    key={item.label}
                    className={`cursor-pointer py-1 transition-colors text-base font-medium ${
                      isActive
                        ? "text-[#FFD200] font-bold"
                        : "text-[#002F5C] hover:text-[#8A6D00]"
                    }`}
                    onClick={() => handleNavClick(item.path)}
                  >
                    {item.label}
                  </li>
                );
              })}
            </ul>

            <div className="w-full pt-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/request-quote");
                }}
                className="w-full py-3 rounded-full text-sm font-semibold bg-[#FFD200] text-[#002F5C] hover:bg-[#e6be00] shadow-sm transition"
              >
                Request Quote
              </button>
            </div>

            <div className="profile-section w-full pt-2">
              {firstName && lastName ? (
                <div
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate("/account");
                  }}
                  className="flex items-center justify-center p-2 rounded-full space-x-2 cursor-pointer bg-stone-50 hover:bg-stone-100 transition"
                >
                  <div className="h-8 w-8 bg-[#002F5C] text-[#FFD200] font-bold rounded-full flex items-center justify-center text-xs">
                    {initials.toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-[#002F5C]">
                    {firstName} {lastName}
                  </span>
                </div>
              ) : (
                <div className="flex space-x-3 justify-center">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate("/register");
                    }}
                    className="flex-1 text-sm py-2.5 rounded-full border border-stone-300 text-[#002F5C] hover:bg-stone-50 transition font-medium"
                  >
                    Sign Up
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate("/login");
                    }}
                    className="flex-1 text-sm py-2.5 rounded-full border border-[#002F5C] bg-[#002F5C] text-white hover:bg-[#002447] transition font-medium"
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
