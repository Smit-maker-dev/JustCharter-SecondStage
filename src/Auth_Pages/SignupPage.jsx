import React, { useState } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../api/axiosInstance";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
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
    marketing: false,
  });
  const [errors, setErrors] = useState({});
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
      const { id: userId, is_email_verified, is_phone_verified } = response.data.data;
      Swal.fire({
        icon: "success",
        title: "Signup Successful",
        text: "Please check your email to verify your account.",
        confirmButtonColor: "#3085d6",
      });
      if (!is_email_verified || !is_phone_verified) {
        navigate("/verifyemail", { state: { userId } });
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      } else if (err.response) {
        console.error("API Error:", err.response.data);
        Swal.fire({
          icon: "error",
          title: "Signup Failed",
          text:
            err.response.data.message ||
            "Something went wrong. Please try again.",
          confirmButtonColor: "#d33",
        });
      } else {
        console.error("Unexpected Error:", err);
        Swal.fire({
          icon: "error",
          title: "Unexpected Error",
          text: "An unexpected error occurred. Please try again later.",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      <div className="hidden md:block md:w-1/2 h-full">
        <img
          src="/images/privatejet.png"
          alt="Plane"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-6 md:p-10 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="mb-4">
            <img src="/images/Logo.png" alt="AceaAir Logo" className="h-10" />
          </div>

          <h2 className="text-2xl font-bold text-black mb-6">
            Welcome to AceaAir
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
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
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
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password here"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Enter password here"
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formData.password === formData.confirmPassword &&
                    formData.confirmPassword.length > 0 && (
                      <img
                        src="images/checkmark.png"
                        alt="Checkmark"
                        className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2"
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
                className="mt-1"
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
              className="w-full md:w-3/5 bg-blue-400 text-white py-2.5 mt-4 rounded-lg hover:bg-blue-700 transition"
            >
              Sign up
            </button>

            <p className="text-sm mt-4">
              Already have an account?
              <Link to="/Loginpage" className="text-blue-600 underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
