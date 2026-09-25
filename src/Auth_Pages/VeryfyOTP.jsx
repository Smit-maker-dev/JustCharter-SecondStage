import React, { useEffect, useState } from "react";
import Logo from "/images/Blacklogo.png";
import PrivateJet from "/images/privatejet.png";
import Checkmark from "/images/checkmark.png";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../api/axiosInstance";
import OTPInput from "../Components/OTPInput";

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!otpId) {
  //     toast.error("OTP ID missing. Please resend OTP.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post("/auth/verify-auth-otp", {
  //       otp_id: otpId,
  //       otp: code,
  //     });

  //     console.log("Full OTP Verify Response:", response);

  //     const token = response.data?.token;

  //     // if (!token) {
  //     //   console.error("Token not found in response:", response.data?.token);
  //     //   throw new Error("Authentication token not received");
  //     // }

  //     localStorage.setItem("authToken", token);
  //     console.log("Token successfully saved to localStorage:", token);

  //     toast.success(response.data?.message || "OTP verified successfully!");

  //     navigate("/reset_password");
  //   } catch (error) {
  //     console.error(
  //       "OTP verification failed:",
  //       error.response?.data || error.message
  //     );

  //     localStorage.removeItem("authToken");

  //     toast.error(
  //       error.response?.data?.message ||
  //         error.message ||
  //         "OTP verification failed"
  //     );
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpId) {
      toast.error("OTP ID missing. Please resend OTP.");
      return;
    }

    try {
      const response = await axios.post("/auth/verify-auth-otp", {
        otp_id: otpId,
        otp: code,
      });

      console.log("Full OTP Verify Response:", response);

      const token = response.data?.token;
      const resetToken = response.data?.reset_token;

      if (token) {
        localStorage.setItem("authToken", token);
        console.log("Auth token stored:", token);
      }

      if (resetToken) {
        localStorage.setItem("resetToken", resetToken);
        console.log("Reset token stored:", resetToken);
      }

      toast.success(response.data?.message || "OTP verified successfully!");

      navigate("/reset_password");
    } catch (error) {
      console.error(
        "OTP verification failed:",
        error.response?.data || error.message
      );

      localStorage.removeItem("authToken");

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "OTP verification failed"
      );
    }
  };

  const sendOtp = async () => {
    if (!email) {
      toast.error("Email not found. Please go back and enter your email.");
      return;
    }

    try {
      const response = await axios.post("/auth/forgot-password", { email });

      const newOtpId = response.data?.otp_id;
      if (!newOtpId) throw new Error("Failed to get new OTP ID");

      toast.success(response.data?.message || "OTP resent to your email.");

      setCounter(60);
      location.state.otpId = newOtpId;
    } catch (error) {
      console.error("Resend OTP error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      <ToastContainer />
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
            <img src={Logo} alt="JustCharter Logo" className="h-10" />
          </div>

          <h2 className="text-2xl font-bold text-[#4A3B2A] mb-1">
            OTP Verification
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            We’ve sent a 6-digit code to your email
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm text-[#4A3B2A] mb-1 block">
                Enter Verification Code
              </label>

              <OTPInput code={code} setCode={setCode} />
            </div>

            <p className="text-sm text-gray-500">
              Didn’t receive the code?{" "}
              {counter > 0 ? (
                <span className="text-gray-400">Resend in {counter}s</span>
              ) : (
                <button
                  type="button"
                  onClick={sendOtp}
                  className="text-[#FF9C0A] underline cursor-pointer"
                >
                  Resend OTP
                </button>
              )}
            </p>

            <button
              type="submit"
              className="cursor-pointer w-full md:w-3/5 bg-blue-400 text-white py-2.5 mt-4 rounded-lg hover:bg-[#e08800] transition"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
