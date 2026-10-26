import React from "react";
import { FaInstagram, FaEnvelope, FaFacebook } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-stone-50 text-[#002F5C] border-t border-stone-200 px-6 py-10 md:px-16 lg:px-24">
      <div className="flex flex-col lg:flex-row justify-between gap-5">
        <div className="mb-10 lg:mb-0 lg:w-1/4">
          <Logo
            variant="light"
            alt="JustCharter Logo"
            className="h-10 mb-4"
          />
          <p className="text-sm text-stone-600">
            Redefining the private aviation experience with uncompromising
            safety, service, and luxury.
          </p>

          <div className="flex gap-4 mt-6">
            <span className="bg-stone-200/70 border border-stone-300 w-12 h-12 flex items-center justify-center rounded-full text-[#002F5C] hover:scale-105 transition shadow-xs">
              <FaFacebook
                size={24}
                className="font-bold text-[#FFD200]"
              />
            </span>
            <span className="bg-stone-200/70 border border-stone-300 w-12 h-12 flex items-center justify-center rounded-full text-[#002F5C] hover:scale-105 transition shadow-xs">
              <IoLogoLinkedin
                size={24}
                className="font-bold text-[#FFD200]"
              />
            </span>
            <span className="bg-stone-200/70 border border-stone-300 w-12 h-12 flex items-center justify-center rounded-full text-[#002F5C] hover:scale-105 transition shadow-xs">
              <FaInstagram
                size={24}
                className="font-bold text-[#FFD200]"
              />
            </span>
            <span className="bg-stone-200/70 border border-stone-300 w-12 h-12 flex items-center justify-center rounded-full text-[#002F5C] hover:scale-105 transition shadow-xs">
              <FaEnvelope
                size={24}
                className="font-bold text-[#FFD200]"
              />
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-20 text-sm">
          <div>
            <h3 className="text-[#002F5C] font-bold text-xs uppercase tracking-wider mb-3">Services</h3>
            <ul className="space-y-2 text-stone-600">
              <li>
                <Link to="/fleet" className="hover:text-[#002F5C] transition">
                  Private Charter
                </Link>
              </li>
              <li>
                <Link to="/air-ambulance" className="hover:text-[#002F5C] transition">
                  Air Ambulance
                </Link>
              </li>
              <li>
                <a href="/#how-it-works" className="hover:text-[#002F5C] transition">
                  How It Works
                </a>
              </li>
              <li>
                <Link to="/for-operators" className="hover:text-[#002F5C] transition">
                  For Operators
                </Link>
              </li>
              <li>
                <Link to="/request-quote" className="hover:text-[#002F5C] transition">
                  Request a Quote
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#002F5C] font-bold text-xs uppercase tracking-wider mb-3">Company</h3>
            <ul className="space-y-2 text-stone-600">
              <li>
                <Link to="/about" className="hover:text-[#002F5C] transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/about#safety" className="hover:text-[#002F5C] transition">
                  Safety Standards
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#002F5C] font-bold text-xs uppercase tracking-wider mb-3">Legal</h3>
            {/* TODO: CONFIRM WITH CLIENT — Accessibility policy page (no route/component exists in repo; client to supply if required) */}
            <ul className="space-y-2 text-stone-600">
              <li>
                <Link to="/terms_conditions" className="hover:text-[#002F5C] transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy_policy" className="hover:text-[#002F5C] transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/cancellation-policy"
                  className="hover:text-[#002F5C] transition"
                >
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <a href="/#faq" className="hover:text-[#002F5C] transition">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="my-8 border-stone-300" />

      <div className="flex flex-col md:flex-row justify-between items-center text-xs text-stone-600 space-y-3 md:space-y-0">
        <p>© {new Date().getFullYear()} JustCharter. All rights reserved.</p>
        <p className="text-stone-600 font-light text-center md:text-right max-w-lg">
          JustCharter is a charter booking platform. Flights are operated by independent, licensed operators.
        </p>
      </div>
    </footer>
  );
}
