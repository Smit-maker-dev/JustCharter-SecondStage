import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@mui/material";
import { IoMdCloseCircle } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import Checkmark from "/images/checkmark.png";
import { toast } from "react-toastify";
import axios from "../../api/axiosInstance";

export default function VerifyOtpDialog({
  open,
  onClose,
  email,
  otpId,
  onSuccess,
}) {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (!open) return;

    setTimer(60);
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [open]);
  const handleVerify = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const response = await axios.post("/auth/verify-auth-otp", {
        otp_id: otpId,
        otp: otp,
      });

      const resetToken = response.data.reset_token;
      if (!resetToken) {
        toast.error("Reset token missing in response");
        return;
      }

      localStorage.setItem("resetToken", resetToken);
      toast.success(response.data?.message || "OTP verified successfully!");

      onSuccess(); // ✅ TRIGGER CHANGE PASSWORD DIALOG
    } catch (error) {
      console.error(
        "OTP verification failed:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "OTP verification failed");
    }
  };
  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Email not found. Please go back and enter your email.");
      return;
    }

    try {
      const response = await axios.post("/auth/forgot-password", { email });

      const newOtpId = response.data?.otp_id;
      if (!newOtpId) throw new Error("Failed to get new OTP ID");

      toast.success(response.data?.message || "OTP resent to your email.");
      setTimer(60);
    } catch (error) {
      console.error("Resend OTP error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          px: { xs: 2, sm: 4 },
          py: { xs: 6, sm: 10 },
          position: "relative",
        },
        className: "group",
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 text-gray-500 hover:text-red-500"
      >
        <IoMdCloseCircle className="w-5 h-5 text-gray-500 hover:text-red-500" />
      </button>

      <DialogContent className="p-6 sm:p-8 font-inter bg-white relative">
        <h2 className="text-[22px] sm:text-[24px] font-bold text-[#002F5C] mb-2">
          OTP Verification
        </h2>
        <p className="text-[15px] sm:text-[16px] text-gray-600 mb-8">
          We’ve sent a 6-digit code to your email
        </p>

        <label className="block text-[14px] sm:text-[15px] text-[#002F5C] mb-2">
          Enter Verification Code
        </label>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="6 - Digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full pr-10 px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {otp.length === 6 && (
            <img
              src={Checkmark}
              alt="Verified"
              className="absolute right-3 top-2.5 h-5 w-5"
            />
          )}
        </div>

        <p className="text-sm text-gray-700 mb-6">
          Didn’t receive the code?{" "}
          {timer > 0 ? (
            <span className="text-gray-400">Resend in {timer}s</span>
          ) : (
            <span
              className="text-[#FFB817] cursor-pointer"
              onClick={handleResendOtp}
            >
              Resend
            </span>
          )}
        </p>

        <button
          onClick={handleVerify}
          className="cursor-pointer w-full md:w-3/5  bg-[#FFB817] text-white py-2.5 mt-4 rounded-lg hover:bg-[#e5a510] transition"
        >
          Verify
        </button>
      </DialogContent>
    </Dialog>
  );
}
