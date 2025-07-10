import React from "react";
import {
  FaInstagram,
  FaEnvelope,
   FaFacebook
} from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 py-10 md:px-16 lg:px-24">
      <div className="flex flex-col lg:flex-row justify-between gap-5">
        <div className="mb-10 lg:mb-0 lg:w-1/4">
          <img
            src="/images/Logo.png"
            alt="JustCharter Logo"
            className="h-10 mb-4"
          />
          <p className="text-sm text-gray-400">
            Redefining the private aviation experience with uncompromising
            safety, service, and luxury.
          </p>
         
          <div className="flex gap-4 mt-6">
            <span className=" bg-[#FFFFFF1A]  w-13 h-13 flex items-center justify-center rounded-full text-black hover:scale-105 transition">
              <FaFacebook    size={28} className="font-bold h-10 w-10 text-[#FFD700]  p-1"  />
            </span>
            <span className="bg-[#FFFFFF1A]  w-13 h-13 flex items-center justify-center rounded-full text-black hover:scale-105 transition">
              <IoLogoLinkedin   size={28} className="font-bold h-10 w-10 text-[#FFD700]  p-1" />
            </span>
            <span className="bg-[#FFFFFF1A]  w-13 h-13 flex items-center justify-center rounded-full text-black hover:scale-105 transition">
              <FaInstagram size={28} className="font-bold h-10 w-10 text-[#FFD700]  p-1"/>
            </span>
            <span className="bg-[#FFFFFF1A]  w-13 h-13 flex items-center justify-center rounded-full text-black hover:scale-105 transition">
              <FaEnvelope size={28} className="font-bold h-10 w-10 text-[#FFD700]  p-1"/>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-20 text-sm">
          
          <div>
            <h3 className="text-[#FFD700] font-semibold mb-3">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Private Charter</li>
              <li>Membership Programs</li>
              <li>Aircraft Management</li>
              <li>Aircraft Sales & Acquisition</li>
              <li>Concierge Services</li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#FFD700] font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li>About Us</li>
              <li>Safety Standards</li>
              <li>Careers</li>
              <li>Press & Media</li>
              <li>Sustainability</li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#FFD700] font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Cookie Policy</li>
              <li>Accessibility</li>
              <li>FAQs</li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-700" />

      <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-2 md:space-y-0">
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
