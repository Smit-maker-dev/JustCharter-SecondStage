import React, { useState } from "react";
// import planimage from "../assets/images/privatejet.png";
// import Logo from "../assets/images/Logo.png";
// import Chekmark from "../assets/images/checkmark.png";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPass() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const resetToken = localStorage.getItem("resetToken");
    if (!resetToken) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Reset token missing. Please restart the password reset process.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Passwords do not match.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    if (newPassword.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Password should be at least 6 characters long.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    try {
      const response = await axios.post("/auth/reset-password", {
        reset_token: resetToken,
        new_password: newPassword,
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data?.message || "Password reset successfully!",
        confirmButtonColor: "#3085d6",
      });

      localStorage.removeItem("resetToken");
      navigate("/");
    } catch (error) {
      console.error(
        "Reset password failed:",
        error.response?.data || error.message
      );
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.message || "Password reset failed",
        confirmButtonColor: "#d33",
      });
    }
  };
  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden font-sans">
      <div className="hidden md:block md:w-1/2 h-full">
        <img
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
              <div className="relative">
                <input
                  type={showNewPass ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter password here"
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {newPassword && (
                  <span
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  >
                    {showNewPass ? (
                      <FaEyeSlash size={15} />
                    ) : (
                      <FaEye size={15} />
                    )}
                  </span>
                )}
              </div>
            </div>

            <label className="text-sm text-gray-800 mb-2 block">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPass ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password here"
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {confirmPassword && (
                <span
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                >
                  {showConfirmPass ? (
                    <FaEyeSlash size={15} />
                  ) : (
                    <FaEye size={15} />
                  )}
                </span>
              )}

              {/* ✅ Show checkmark only when passwords match and are non-empty */}
              {newPassword &&
                confirmPassword &&
                newPassword === confirmPassword && (
                  <img
                    src="/images/checkmark.png"
                    alt="Verified"
                    className="absolute right-10 top-2.5 h-5 w-5"
                  />
                )}
            </div>

            <button
              type="submit"
              className="w-full md:w-3/5 bg-blue-400 text-white py-2.5 mt-4 rounded-lg hover:bg-blue-700 transition"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
