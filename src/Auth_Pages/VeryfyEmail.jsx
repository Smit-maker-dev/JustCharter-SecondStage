import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "/images/Logo.png";
import PrivateJet from "/images/privatejet.png";
import OTPInput from "../Components/OTPInput";
export default function VerifyEmail() {
  const [code, setCode] = useState("");
  const [otpId, setOtpId] = useState(null);
  const [counter, setCounter] = useState(60);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;
  const [loading, setLoading] = useState(false);

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

    setTimeout(() => {
      sendOtp();
    }, 1000);
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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await axios.post("/auth/get-last-otp", {
        user_id: userId,
      });

      const otp = response.data?.data?.otp;
      if (otp) setCode(otp.toString());
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch latest OTP"
      );
      console.error("Fetch OTP failed:", error);
    }
  };
  const sendOtp = async () => {
    try {
      const response = await axios.post("/auth/send-auth-otp", {
        user_id: userId,
      });

      const { otp_id, message } = response.data;
      setOtpId(otp_id);

      toast.success(message || "OTP sent successfully");
      localStorage.setItem("lastOtpSentTime", Date.now().toString());
      setCounter(60);

      await fetchLatestOtp();
    } catch (error) {
      toast.error(error.response?.data?.message || "Sending OTP failed");
      console.error("Send OTP error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!otpId) {
      toast.error("OTP ID missing. Please resend OTP.");
      return;
    }

    try {
      const response = await axios.post("/auth/verify-auth-otp", {
        otp_id: otpId,
        otp: code,
      });

      const { message, is_email_verified, is_phone_verified } = response.data;

      toast.success(message || "OTP verified successfully");

      if (!is_phone_verified) {
        navigate("/verifymobile", { state: { userId, otp_id: otpId } });
      } else {
        navigate("/Home");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
      console.error("OTP verification failed:", error);
    } finally {
      setLoading(false);
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
                alt="JustCharter Logo"
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
                  className="text-blue-500 underline cursor-pointer"
                >
                  Resend OTP
                </button>
              )}
            </p>
          
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full md:w-3/5 bg-[#1A9FFF] text-white py-2.5 mt-4 rounded-lg hover:bg-blue-500 transition"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Please wait...</span>
                </div>
              ) : (
                "Verify"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
