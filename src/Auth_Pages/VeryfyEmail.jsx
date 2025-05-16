import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import Swal from "sweetalert2";
import Logo from "/images/Logo.png";
import PrivateJet from "/images/privatejet.png";
import Checkmark from "/images/checkmark.png";
export default function VerifyEmail() {
  const [code, setCode] = useState("");
  const [otpId, setOtpId] = useState(null);
  const [counter, setCounter] = useState(60);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;
  const otpSentRef = useRef(false);
  useEffect(() => {
    if (!userId || otpSentRef.current) return;

    otpSentRef.current = true;

    const lastOtpTime = localStorage.getItem("lastOtpSentTime");
    const now = Date.now();

    if (lastOtpTime) {
      const elapsed = (now - parseInt(lastOtpTime, 10)) / 1000;
      if (elapsed < 60) {
        setCounter(60 - Math.floor(elapsed));
        return;
      }
    }

    sendOtp();
  }, [userId]);

  useEffect(() => {
    if (counter === 0) return;

    const timer = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [counter]);

  const fetchLatestOtp = async () => {
    try {
      const response = await axios.post("/auth/get-last-otp", {
        user_id: userId,
      });

      const otp = response.data?.data?.otp;
      if (otp) setCode(otp.toString());
    } catch (error) {
      console.error(
        "Failed to fetch latest OTP:",
        error.response?.data || error.message
      );
    }
  };

  const sendOtp = async () => {
    try {
      const response = await axios.post("/auth/send-auth-otp", {
        user_id: userId,
      });

      const { otp_id, message } = response.data;
      setOtpId(otp_id);

      Swal.fire({
        icon: "success",
        title: "OTP Sent",
        text: message || "OTP sent successfully!",
        confirmButtonColor: "#3085d6",
      });

      localStorage.setItem("lastOtpSentTime", Date.now().toString());
      setCounter(60);

      await fetchLatestOtp();
    } catch (error) {
      console.error("OTP send failed:", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Failed to send OTP",
        text: error.response?.data?.message || "Sending OTP failed",
        confirmButtonColor: "#d33",
      });
    }
  };

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

      const { message, is_email_verified, is_phone_verified } = response.data;

      Swal.fire({
        icon: "success",
        title: "Success",
        text: message || "OTP verified successfully!",
        confirmButtonColor: "#3085d6",
      });

      if (!is_phone_verified) {
        navigate("/verifymobile", { state: { userId, otp_id: otpId } });
      } else {
        navigate("/dashboard");
      }
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
  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      <div className="hidden md:block md:w-1/2 h-full bg-gray-100 relative">
        <img
          src={PrivateJet}
          alt="Plane"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 pt-40 flex justify-center items-center bg-white p-5 md:p-10 overflow-y-auto">
        <div className="w-full max-w-lg">
          <div className="mb-4 h-10 w-full relative">
            <div className="h-full w-full bg-transparent">
              <img
                src={Logo}
                alt="AceaAir Logo"
                className="h-full w-auto object-contain"
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-black mb-1">
            Verify Your Email
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            We’ve sent a 6-digit code to your email. Enter it below.
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
                />

                <img
                  src={Checkmark}
                  alt="Verified"
                  className="absolute right-3 top-2.5 h-5 w-5"
                />
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
