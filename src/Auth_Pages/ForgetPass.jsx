import React from "react";
import planimage from "../assets/Images/Login&signup pagei image.png";
import Logo from "../assets/Images/Logo.png";
import { useNavigate } from "react-router-dom";
export default function ForgetPass() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/reset_password");
  };

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      <div className="hidden md:block md:w-1/2 h-full">
        <img
          src={planimage}
          alt="Plane"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 pt-40 flex justify-center items-center bg-white p-5 md:p-10 overflow-y-auto">
        <div className="w-full max-w-lg">
          <div className="flex justify-start mb-6">
            <img src={Logo} alt="AceaAir Logo" className="h-10" />
          </div>

          <h2 className="text-2xl font-bold text-black mb-2">
            Forgot Password
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Get back into your account
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm text-gray-800 mb-1 block">
                Email Address
              </label>
              <div className="">
                <input
                  type="text"
                  placeholder="Enter email here"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full md:w-3/5 bg-blue-400 text-white py-2.5 mt-4 rounded-lg hover:bg-blue-700 transition"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
