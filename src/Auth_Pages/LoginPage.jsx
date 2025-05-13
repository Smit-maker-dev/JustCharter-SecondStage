import React from "react";
import planimage from "../assets/Images/Login&signup pagei image.png";
import Logo from "../assets/Images/Logo.png";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden font-sans">
      <div className="hidden md:block md:w-1/2 h-full">
        <img
          src={planimage}
          alt="Plane"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <img src={Logo} alt="AceaAir Logo" className="h-10" />
          </div>

          <h2 className="text-3xl font-bold text-black mb-8">
            Welcome to AceaAir
          </h2>

          <form className="space-y-6">
            <div>
              <label className="text-sm text-gray-800 mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter email here"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-800 mb-2 block">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password here"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="text-right mt-1">
                <Link
                  to="/forget_password"
                  className="text-red-500 text-sm underline hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full md:w-3/5 bg-blue-400 text-white py-2.5 mt-4 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>

            <p className="text-sm  mt-4">
              Doesn't have an account?{" "}
              <Link to="/" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
