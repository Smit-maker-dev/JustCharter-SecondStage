import React from "react";
// import planimage from "../assets/images/privatejet.png";
// import Logo from "../assets/images/Logo.png";
// import GreenCheck from "../assets/images/checkmark.png";
import { useNavigate } from "react-router-dom";

export default function VeryfyMobileNo() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    navigate('/Loginpage');
  };
  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      <div className="hidden md:block md:w-1/2 h-full">
        <img
          // src={planimage}
          src="/images/privatejet.png"
          alt="Plane"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 pt-40 flex justify-center items-center bg-white p-5 md:p-10 overflow-y-auto">
        <div className="w-full max-w-lg">
          <div className="flex justify-start mb-6">
            <img src="/images/Logo.png" alt="AceaAir Logo" className="h-10" />
          </div>

          <h2 className="text-2xl font-bold text-black mb-1">
            Verify Your Mobile Number
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            We’ve sent a 4-digit code to your mobile number ending in 1234.
            Enter it below.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm text-gray-800 mb-1 block">
                Enter Verification Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="4 - Digit code"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <img
                  // src={GreenCheck}
                  src="/images/checkmark.png"
                  alt="Verified"
                  className="absolute right-3 top-2.5 h-5 w-5"
                />
              </div>
            </div>

            <p className="text-sm text-gray-500">
              Didn’t receive the code?{" "}
              <span className="text-gray-400">Resend in 30s</span>
            </p>

            <button
              type="submit"
              className="w-full md:w-3/5 bg-blue-400 text-white py-2.5 mt-4 rounded-lg hover:bg-blue-700 transition"
            >
              Verify
            </button>   
          </form>
        </div>
      </div>
    </div>
  );
}
