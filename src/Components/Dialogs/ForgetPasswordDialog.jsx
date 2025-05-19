import React, { useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import { IoMdCloseCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosInstance';
import { toast } from 'react-toastify';

export default function ForgetPasswordDialog({ open, onClose, onSuccess }) {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("/auth/forgot-password", { email });
    const otpId = response.data?.otp_id;
    if (!otpId) throw new Error("OTP ID not returned from server.");

    toast.success("OTP sent to your email!");
    onSuccess({ email, otpId }); 
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to send reset link");
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
          position: 'relative',
        },
        className: 'group',
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 text-gray-500 hover:text-red-500"
      >
        <IoMdCloseCircle className="w-5 h-5 text-gray-500 hover:text-red-500" />
      </button>

      <DialogContent className="p-6 sm:p-8 font-inter bg-white relative">
        <h2 className="text-[22px] sm:text-[24px] font-bold text-black mb-2">
          Forgot Password
        </h2>
        <p className="text-[15px] sm:text-[16px] text-gray-600 mb-6">
          Get back into your account
        </p>

        <form onSubmit={handleSubmit}>
          <label className="block text-[14px] sm:text-[15px] text-black mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="mt-6 flex justify-center sm:justify-start">
            <button
              type="submit"
              className="w-full sm:w-3/5 bg-[#1A9FFF] text-white py-2.5 rounded-lg hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
