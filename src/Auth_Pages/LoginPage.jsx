import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../api/axiosInstance";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/auth/login", {
        email: email.trim(),
        password: password.trim(),
        type: "user",
        deviceType: "web",
        deviceToken: "abc",
        deviceId: "chromev123",
      });

      const { data } = response.data;

      if (!data || !data.access_token) {
        toast.error("Invalid login credentials");
        return;
      }

      const access_token = data.access_token;
      const user = data;

      toast.success("Login successful!", { autoClose: 1500 });

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("first_name", user.first_name);
      localStorage.setItem("last_name", user.last_name);

      setTimeout(() => {  
        navigate("/");
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid login credentials");
    }finally {
      setLoading(false);
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

      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <img src="/images/Blacklogo.png" alt="JustCharter Logo" className="h-11" />
          </div>

          <h2 className="text-3xl font-bold text-[#4A3B2A] mb-8">
            Welcome to JustCharter
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm text-[#4A3B2A] mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-sm text-[#4A3B2A] mb-2 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordShown ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password here"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  required
                />
                {password && (
                  <button
                    type="button"
                    onClick={() => setPasswordShown((prev) => !prev)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
                  >
                    {passwordShown ? (
                      <FaEye size={15} />
                    ) : (
                      <FaEyeSlash size={15} />
                    )}
                  </button>
                )}
              </div>
              <div className="text-right mt-1">
                <Link
                  to="/forget_password"
                  className="text-red-500 text-sm underline hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

             <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full md:w-3/5 font-semibold bg-blue-400 text-white py-2.5 mt-4 rounded-lg hover:bg-[#e08800] transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                  <span>Please wait...</span>
                </span>
              ) : (
                "Login"
              )}
            </button>
            <p className="text-sm mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#FF9C0A] hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
