import React from "react";
import { FaInstagram, FaEnvelope, FaFacebook } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-stone-50 text-[#002F5C] border-t border-stone-200 px-6 py-10 md:px-16 lg:px-24">
      <div className="flex flex-col lg:flex-row justify-between gap-5">
        <div className="mb-10 lg:mb-0 lg:w-1/4">
          <img
            src="/images/Blacklogo.png"
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
            <h3 className="text-[#FFD200] font-semibold mb-3">Services</h3>
            <ul className="space-y-2 text-stone-600">
              <li>Private Charter</li>
              <li>Membership Programs</li>
              <li>Aircraft Management</li>
              <li>Aircraft Sales & Acquisition</li>
              <li>Concierge Services</li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#FFD200] font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-stone-600">
              <li>
                <Link to="/about" className="hover:text-[#002F5C] transition">
                  About Us
                </Link>
              </li>
              <li>Safety Standards</li>
              <li>Careers</li>
              <li>Press & Media</li>
              <li>Sustainability</li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#FFD200] font-semibold mb-3">Legal</h3>
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
                <Link
                  to="/accessibility"
                  className="hover:text-[#002F5C] transition"
                >
                  Accessibility
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-[#002F5C] transition">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="my-8 border-stone-300" />

      <div className="flex flex-col md:flex-row justify-between items-center text-xs text-stone-500 space-y-2 md:space-y-0">
        <p>© 2025 JustCharter. All rights reserved.</p>
        <div className="flex gap-4">
          <span>ARG/US Platinum Rated</span>
          <span>Wyvern Wingman</span>
          <span>IS-BAO Stage 3</span>
        </div>
      </div>
    </footer>
  );
}
