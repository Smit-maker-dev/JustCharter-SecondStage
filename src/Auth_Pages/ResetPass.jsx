import React from "react";
// import planimage from "../assets/images/privatejet.png";
// import Logo from "../assets/images/Logo.png";
// import Chekmark from "../assets/images/checkmark.png";
import { useNavigate } from "react-router-dom";

export default function ResetPass() {
  const navigate = useNavigate()
    const handleSubmit = (e) => {
    e.preventDefault();
  
    navigate('/OTP_verification');
  };
  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden font-sans">
      <div className="hidden md:block md:w-1/2 h-full">
        <img
          // src={planimage}
          src="/images/privatejet.png"
          alt="Plane"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6 md:p-12 pt-24">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <img src="/images/Logo.png" alt="AceaAir Logo" className="h-10" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
            Reset Password
          </h2>
          <p className="text-sm text-gray-600 mb-8">
            Enter and confirm your new password to complete the reset
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm text-gray-800 mb-2 block">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter password here"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <label className="text-sm text-gray-800 mb-2 block">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter password here"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <img
                // src={Chekmark}
                src="/images/checkmark.png"
                alt="Verified"
                className="absolute right-3 top-2.5 h-5 w-5"
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-3/5 bg-blue-400 text-white py-2.5 mt-4 rounded-lg hover:bg-blue-700 transition"
            >
              save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
