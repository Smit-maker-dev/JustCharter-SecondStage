import React, { useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoMdCloseCircle } from "react-icons/io";
import Checkmark from "/images/checkmark.png";
import axios from "../../api/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgetPasswordDialog from "./ForgetPasswordDialog";

const ChangePasswordDialog = ({ open, onClose }) => {
  const [formValues, setFormValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [isForgetDialogOpen, setIsForgetDialogOpen] = useState(false);
  const handleChange = (field) => (e) => {
    setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const toggleShow = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const passwordsMatch =
    formValues.confirmPassword.length > 0 &&
    formValues.newPassword === formValues.confirmPassword;

  const handleSubmit = async () => {
    if (
      !formValues.oldPassword ||
      !formValues.newPassword ||
      !formValues.confirmPassword
    ) {
      toast.error("All fields are required.");
      return;
    }

    if (formValues.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (formValues.newPassword !== formValues.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await axios.post("/auth/change-password", {
        old_password: formValues.oldPassword,
        new_password: formValues.newPassword,
      });

      toast.success("Password changed successfully!");
      setFormValues({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(onClose, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Password change failed.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, padding: "10px 20px" },
        className: "relative group",
      }}
    >
      <DialogContent className="p-8 sm:p-8 font-inter relative bg-white">
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <IoMdCloseCircle className="w-5 h-5 text-gray-500 hover:text-red-500" />
        </button>

        <h2 className="text-[24px] font-bold text-[#002F5C] mb-2">
          Change Password
        </h2>
        <p className="text-[16px] text-gray-600 mb-8">
          Enter and confirm your new password to complete the Change
        </p>

        <div className="flex items-center justify-between mb-2">
          <label className="text-[14px]  text-[#002F5C]">Old Password</label>
        </div>
        <div className="relative">
          <input
            type={showPassword.old ? "text" : "password"}
            placeholder="Enter password here"
            value={formValues.oldPassword}
            onChange={handleChange("oldPassword")}
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formValues.oldPassword && (
            <span
              onClick={() => toggleShow("old")}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPassword.old ? <FiEyeOff /> : <FiEye />}
            </span>
          )}
        </div>
        <div className="forget-div text-end">
          <a
            href="#"
            //  onClick={() => setIsForgetDialogOpen(true)}
            className=" text-[15px] text-red-500 mt-3 underline me-2  "
          >
            Forgot password?
          </a>
          <ForgetPasswordDialog
            open={isForgetDialogOpen}
            onClose={() => setIsForgetDialogOpen(false)}
            onSuccess={(data) => {
              setIsForgetDialogOpen(false);
            }}
          />
        </div>
        <label className="block mt-6 mb-2 text-[15px]  text-[#002F5C]">
          New Password
        </label>
        <div className="relative">
          <input
            type={showPassword.new ? "text" : "password"}
            placeholder="Enter password here"
            value={formValues.newPassword}
            onChange={handleChange("newPassword")}
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formValues.newPassword && (
            <span
              onClick={() => toggleShow("new")}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPassword.new ? <FiEyeOff /> : <FiEye />}
            </span>
          )}
        </div>
        <label className="block mt-6 mb-2 text-[15px]  text-[#002F5C]">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showPassword.confirm ? "text" : "password"}
            placeholder="Enter password here"
            value={formValues.confirmPassword}
            onChange={handleChange("confirmPassword")}
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {passwordsMatch && (
            <img
              src={Checkmark}
              alt="Checkmark"
              className="w-5 h-5 absolute right-10 top-1/2 transform -translate-y-1/2"
            />
          )}

          {formValues.confirmPassword && (
            <span
              onClick={() => toggleShow("confirm")}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPassword.confirm ? <FiEyeOff /> : <FiEye />}
            </span>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="cursor-pointer w-full md:w-3/5  bg-[#FFD200] text-white py-2.5 mt-4 rounded-lg hover:bg-[#e6be00] transition"
        >
          Save
        </button>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
