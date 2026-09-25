import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OTPInput from "../Components/OTPInput";

export default function VeryfyMobileNo() {
  const [code, setCode] = useState("");
  const [otpId, setOtpId] = useState(null);
  const [counter, setCounter] = useState(60);
  const [initialOtpSent, setInitialOtpSent] = useState(false);
  const otpSentRef = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;
 const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!userId || otpSentRef.current) return;

    otpSentRef.current = true;
    setTimeout(() => {
      sendOtp();
    }, 1500);
  }, [userId]);

  useEffect(() => {
    if (counter === 0) return;
    const timer = setInterval(() => setCounter((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  const fetchLatestOtp = async () => {
    try {
      const res = await axios.post("/auth/get-last-otp", {
        user_id: userId,
      });
      const otp = res.data?.data?.otp;
      if (otp) setCode(otp.toString());
    } catch (err) {
      console.error("Dev OTP fetch failed", err.response?.data || err.message);
    }
  };

  const sendOtp = async () => {
    try {
      const response = await axios.post("/auth/send-auth-otp", {
        user_id: userId,
      });
      const { otp_id, message } = response.data;
      setOtpId(otp_id);

      toast.success(message || "OTP sent successfully!");

      setCounter(60);

      setTimeout(() => {
        fetchLatestOtp();
      }, 1200);
    } catch (error) {
      console.error("OTP send failed:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Sending OTP failed");
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

      const { message, is_phone_verified, data } = response.data;

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      toast.success(message || "Mobile number verified!");

      if (is_phone_verified) {
        navigate("/");
      }
    } catch (error) {
      console.error(
        "OTP verification failed:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "OTP verification failed");
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
       <ToastContainer  autoClose={3000} hideProgressBar />
      <div className="hidden md:block md:w-1/2 h-full">
        <img
          src="/images/privatejet.png"
          alt="Plane"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 pt-40 flex justify-center items-center bg-white p-5 md:p-10 overflow-y-auto">
        <div className="w-full max-w-lg">
          <div className="flex justify-start mb-7">
            <img src="/images/Blacklogo.png" alt="JustCharter Logo" className="h-10" />
          </div>

          <h2 className="text-2xl font-bold text-[#002F5C] mb-1">
            Verify Your Mobile Number
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            We’ve sent a 6-digit code to your mobile number. Enter it below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm text-[#002F5C] mb-1 block">
                Enter Verification Code
              </label>
              <OTPInput code={code} setCode={setCode} />
              {/* <div className="relative">
                <input
                  type="text"
                  placeholder="6 - Digit code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  autoComplete="one-time-code"
                  inputMode="numeric"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <img
                  src="/images/checkmark.png"
                  alt="Verified"
                  className="absolute right-3 top-2.5 h-5 w-5"
                />
              </div> */}
            </div>

            <p className="text-sm text-gray-500">
              Didn’t receive the code?{" "}
              {counter > 0 ? (
                <span className="text-gray-400">Resend in {counter}s</span>
              ) : (
                <button
                  type="button"
                  onClick={sendOtp}
                  className="text-[#FFD200] underline cursor-pointer"
                >
                  Resend OTP
                </button>
              )}
            </p>

            <button 
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full md:w-3/5 bg-[#FFD200] text-white py-2.5 mt-4 rounded-lg hover:bg-[#FFD200] transition"
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
