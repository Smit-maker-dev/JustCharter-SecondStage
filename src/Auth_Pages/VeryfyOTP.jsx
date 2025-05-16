import React, { useEffect, useState } from "react";
import Logo from "/images/Logo.png";
import PrivateJet from "/images/privatejet.png";
import Checkmark from "/images/checkmark.png";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../api/axiosInstance";

export default function VeryfyOTP() {
  const [code, setCode] = useState("");
  const [counter, setCounter] = useState(60);
  const location = useLocation();
  const navigate = useNavigate();
  const { email, otpId } = location.state || {};

  useEffect(() => {
    if (counter === 0) return;
    const timer = setInterval(() => setCounter((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpId) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "OTP ID missing. Please resend OTP.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    try {
      const response = await axios.post("/auth/verify-auth-otp", {
        otp_id: otpId,
        otp: code,
      });

      const resetToken = response.data.reset_token; 

      if (!resetToken) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Reset token not received from server.",
          confirmButtonColor: "#d33",
        });
        return;
      }

      
      localStorage.setItem("resetToken", resetToken);

      Swal.fire({
        icon: "success",
        title: "Verified",
        text: response.data?.message || "OTP verified successfully!",
        confirmButtonColor: "#3085d6",
      });

      navigate("/reset_password"); 
    } catch (error) {
      console.error(
        "OTP verification failed:",
        error.response?.data || error.message
      );
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: error.response?.data?.message || "OTP verification failed",
        confirmButtonColor: "#d33",
      });
    }
  };

  const sendOtp = async () => {
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Email not found. Please go back and enter your email.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    try {
      const response = await axios.post("/auth/forgot-password", { email });

      const newOtpId = response.data?.otp_id;
      if (!newOtpId) throw new Error("Failed to get new OTP ID");

      Swal.fire({
        icon: "success",
        title: "OTP Sent",
        text: response.data?.message || "OTP resent to your email.",
        confirmButtonColor: "#3085d6",
      });

      setCounter(60);
      location.state.otpId = newOtpId;
    } catch (error) {
      console.error("Resend OTP error:", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to resend OTP",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      <div className="hidden md:block md:w-1/2 h-full">
        <img
          src={PrivateJet}
          alt="Plane"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 pt-40 flex justify-center items-center bg-white p-5 md:p-10 overflow-y-auto">
        <div className="w-full max-w-lg">
          <div className="flex justify-start mb-6">
            <img src={Logo} alt="AceaAir Logo" className="h-10" />
          </div>

          <h2 className="text-2xl font-bold text-black mb-1">
            OTP Verification
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            We’ve sent a 6-digit code to your email
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm text-gray-800 mb-1 block">
                Enter Verification Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="6 - Digit code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {code.length === 6 && (
                  <img
                    src={Checkmark}
                    alt="Verified"
                    className="absolute right-3 top-2.5 h-5 w-5"
                  />
                )}
              </div>
            </div>

            <p className="text-sm text-gray-500">
              Didn’t receive the code?{" "}
              {counter > 0 ? (
                <span className="text-gray-400">Resend in {counter}s</span>
              ) : (
                <button
                  type="button"
                  onClick={sendOtp}
                  className="text-blue-500 underline cursor-pointer"
                >
                  Resend OTP
                </button>
              )}
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
