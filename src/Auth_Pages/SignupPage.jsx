import React, { useState } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "/images/Logo.png";
import PrivateJet from "/images/privatejet.png";
import Checkmark from "/images/checkmark.png";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(10)
    .required("Phone number is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    marketing: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});

      const payload = {
        email: formData.email,
        phone_number: formData.phone,
        country_code: 91,
        first_name: formData.firstName,
        last_name: formData.lastName,
        password: formData.password,
        type: "user",
        deviceType: "web",
        deviceToken: "abc",
        deviceId: "chromev123",
      };

      const response = await axios.post("/auth/register", payload);
      const {
        id: userId,
        is_email_verified,
        is_phone_verified,
      } = response.data.data;

      toast.success("Signup successful!");

      if (!is_email_verified || !is_phone_verified) {
        navigate("/verifyemail", { state: { userId } });
      }
    } catch (err) {
    if (err.name === "ValidationError") {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
        // toast.error(error.message);  
      });
      setErrors(newErrors);
    } else if (err.response && err.response.data && err.response.data.message) {
      
      toast.error(err.response.data.message);
    } else {
      
      // toast.error("An unexpected error occurred. Please try again later.");
      console.error("Unexpected Error:", err);
    }
  } finally {
    setIsSubmitting(false);
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

      <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-6 md:p-10 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="mb-4 h-10 w-full relative">
            <div className="h-full w-full bg-transparent">
              <img
                src={Logo}
                alt="JustCharter Logo"
                className="h-full w-auto object-contain"
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-black mb-6">
            Welcome to JustCharter
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-700">Email Address</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email here"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-700">Phone Number</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 text-sm rounded-l-md">
                  +91
                </span>
                <input
                  name="phone"
                  inputMode="numeric"
                  maxLength={10}
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    const rawValue = e.target.value;
                    const cleanedValue = rawValue.replace(/\D/g, "");
                    handleChange({
                      target: {
                        name: "phone",
                        value: cleanedValue,
                      },
                    });
                  }}
                  placeholder="Enter number here"
                  className="w-full px-4 py-2 border border-gray-300 rounded-r-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone}</p>
              )}
            </div>
            <div className="flex space-x-2">
              <div className="w-1/2">
                <label className="text-sm text-gray-700">First Name</label>
                <input
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name here"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">{errors.firstName}</p>
                )}
              </div>
              <div className="w-1/2">
                <label className="text-sm text-gray-700">Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name here"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="w-1/2">
                <label className="text-sm text-gray-700">
                  Create New Password
                </label>
                <div className="relative mt-1">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter New password "
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formData.password.length > 0 && (
                    <span
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  )}
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>

              <div className="w-1/2">
                <label className="text-sm text-gray-700">
                  Confirm Password
                </label>
                <div className="relative mt-1">
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Enter Confirm password here"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formData.confirmPassword.length > 0 && (
                    <span
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  )}
                  {formData.password === formData.confirmPassword &&
                    formData.confirmPassword.length > 0 && (
                      <img
                        src={Checkmark}
                        alt="Checkmark"
                        className="w-5 h-5 absolute right-10 top-1/2 transform -translate-y-1/2"
                      />
                    )}
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-2 mt-2">
              <input
                name="marketing"
                type="checkbox"
                checked={formData.marketing}
                onChange={handleChange}
                className="mt-1  accent-black"
              />
              <span className="text-sm text-black">
                I want to receive emails about the product, feature updates,
                events, and marketing promotions.
              </span>
            </div>
            <p className="text-xs mt-2 text-gray-600">
              By creating an account, you agree to the{" "}
              <a href="#" className="underline text-gray-800">
                Terms
              </a>{" "}
              and Condition{" "}
              <a href="#" className="underline text-gray-800">
                Privacy & Policy
              </a>
              .
            </p>
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full md:w-3/5 font-semibold bg-blue-400 text-white py-2.5 mt-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                  <span>Please wait...</span>
                </span>
              ) : (
                "Sign up"
              )}
            </button>

            <p className="text-sm mt-4">
              Already have an account ?{" "}
              <Link to="/Login" className="text-blue-600 underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
