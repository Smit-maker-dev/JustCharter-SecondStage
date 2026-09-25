import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import LockImg from "/images/lock.png";
import { IoCheckmarkCircle } from "react-icons/io5";
import signoutImg from "/images/logout.png";
import axios from "../api/axiosInstance";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import * as yup from "yup";
import AuthWrapper from "../Components/Dialogs/AuthWrapper";
import { useNavigate } from "react-router-dom";
const basicInfoSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  dob: yup.date().nullable().required("Date of Birth is required"),
  gender: yup.string().required("Gender is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone Number must be 10 digits")
    .required("Phone Number is required"),
  street: yup.string().required("Street is required"),
  stateName: yup.string().required("State is required"),
  pincode: yup
    .string()
    .matches(/^\d{6}$/, "Pincode must be 6 digits")
    .required("Pincode is required"),
  country: yup.string().required("Country is required"),
});

const professionalSchema = yup.object().shape({
  companyName: yup.string().required("Company Name is required"),
  jobTitle: yup.string().required("Job Title is required"),
  industry: yup.string().required("Industry is required"),
  website: yup
    .string()
    .url("Enter a valid URL")
    .required("Website is required"),
  businessEmail: yup
    .string()
    .email("Enter a valid email")
    .required("Business Email is required"),
});

export default function Account() {
  const [tabIndex, setTabIndex] = useState(0);
  const [dob, setDob] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: null,
    gender: "",
    email: "",
    phoneNumber: "",
    street: "",
    stateName: "",
    pincode: "",
    country: "",
  });
  const [professionalData, setProfessionalData] = useState({
    companyName: "",
    jobTitle: "",
    industry: "",
    companyWebsite: "",
    businessEmail: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const useAccessToken = Boolean(localStorage.getItem("access_token"));

        const res = await axios.get("/user", {
          useAccessToken: useAccessToken, 
        });

        const user = res.data.data;

        setFormData({
          firstName: user.first_name || "",
          lastName: user.last_name || "",
          phoneNumber: user.phone_number || "",
          email: user.email || "",
          dob: user.dob ? dayjs(user.dob) : null,
          gender: user.gender || "",
          street: user.address || "",
          stateName: user.state || "",
          pincode: user.pincode || "",
          country: user.country || "",
        });

        if (user.profession) {
          setProfessionalData({
            companyName: user.profession.company_name || "",
            jobTitle: user.profession.job_role || "",
            industry: user.profession.industry || "",
            website: user.profession.website || "",
            businessEmail: user.profession.business_email || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };

    fetchUserProfile();
  }, []);

  const handleProfessionalChange = (e) => {
    const { name, value } = e.target;
    setProfessionalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSaveProfessionalInfo = async () => {
    try {
      await professionalSchema.validate(professionalData, {
        abortEarly: false,
      });

      const payload = {
        company_name: professionalData.companyName,
        job_role: professionalData.jobTitle,
        industry: professionalData.industry,
        website: professionalData.website,
        business_email: professionalData.businessEmail,
      };

      const response = await axios.patch("/user/update-profession", payload);

      if (response.status === 200) {
        toast.success("Professional details updated successfully!");

        setProfessionalData({
          companyName: "",
          jobTitle: "",
          industry: "",
          website: "",
          businessEmail: "",
          telephone: "",
        });

        setErrors({});
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error("Error updating professional details:", error);

      if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        const message =
          error?.response?.data?.message ||
          "Failed to update professional info.";
        toast.error(message);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveBasicInfo = async () => {
    try {
      await basicInfoSchema.validate(formData, { abortEarly: false });
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        gender: formData.gender,
        dob: formData.dob ? formData.dob.format("YYYY-MM-DD") : null,
        address: formData.street,
        state: formData.stateName,
        pincode: formData.pincode,
        country: formData.country,
      };

      const response = await axios.patch("/user/update-profile", payload);

      if (response.status === 200) {
        toast.success("Profile updated successfully!");

        setFormData({
          firstName: "",
          lastName: "",
          dob: null,
          gender: "",
          email: "",
          phoneNumber: "",
          street: "",
          stateName: "",
          pincode: "",
          country: "",
        });
        setErrors({});
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        const message =
          error?.response?.data?.message || "Failed to update profile.";
        toast.error(message);
      }
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  const handleLogout = () => {
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("access_token");
    localStorage.removeItem("token");

    delete axios.defaults.headers.common["Authorization"];

    navigate("/login", { replace: true });

    toast.success("Logged out successfully");
  };
  return (
    <div className="bg-white min-h-screen p-4 mt-14">
      <div className="max-w-6xl mx-auto mt-3">
        <div className="heading-section">
          <h2 className="text-2xl font-semibold mb-1">Account</h2>
          <p className="text-sm text-gray-600 mb-6">
            Manage your profile and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white p-6 rounded-lg border border-gray-100 shadow-md">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
              >
                <Tab
                  label="Basic Information"
                  sx={{ textTransform: "capitalize", fontSize: "medium" }}
                />
                <Tab
                  label="Professional Details"
                  sx={{ textTransform: "capitalize" }}
                />
              </Tabs>
            </Box>

            {tabIndex === 0 && (
              <>
                <p className="mt-5 text-md font-black">Personal Details</p>
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className="text-sm">First Name</label>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter Your First Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm">Last Name</label>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter Your Last Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm block mb-1">Date of Birth</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        format="DD/MM/YYYY"
                        value={formData.dob}
                        onChange={(newValue) => {
                          setFormData((prev) => ({
                            ...prev,
                            dob: newValue,
                          }));
                        }}
                        slotProps={{
                          textField: {
                            variant: "standard",
                            fullWidth: true,
                            InputProps: {
                              disableUnderline: true,
                              sx: {
                                height: "48px",
                                paddingLeft: "16px",
                                paddingRight: "16px",
                                border: "1px solid #D1D5DB",
                                borderRadius: "6px",
                                fontSize: "0.875rem",
                              },
                            },
                            inputProps: {
                              sx: {
                                padding: 0,
                              },
                            },
                          },
                        }}
                      />
                    </LocalizationProvider>
                    {errors.dob && (
                      <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm mb-1 block">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                    >
                      <option value="" disabled>
                        Select gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.gender}
                      </p>
                    )}
                  </div>
                </div>

                <p className="mt-4 text-md font-black">Contact Information</p>
                <div className="mt-4 grid md:grid-cols-2 gap-4 items-end">
                  <div>
                    <label className="text-sm">Email Address</label>
                    <div className="relative">
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <IoCheckmarkCircle className="absolute text-blue-400 right-3 top-3 h-5 w-5" />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm mb-1 block">Phone Number</label>
                    <div className="relative">
                      <div className="flex">
                        <span className="inline-flex items-center px-4 py-3 border border-r-0 border-gray-300 text-sm rounded-l-md">
                          +91
                        </span>
                        <input
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          type="tel"
                          placeholder="Enter Phone Number"
                          className="w-full px-4 py-3 border border-gray-300 text-sm rounded-r-md pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 text-sm cursor-pointer hover:font-bold">
                        Verify
                      </span>
                    </div>
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                </div>

                <p className="mt-4 text-md font-black">Address</p>
                <div className="mt-3 grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm">Street/House</label>
                    <input
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Street/House"
                    />
                    {errors.street && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.street}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm">State</label>
                    <input
                      name="stateName"
                      value={formData.stateName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter State"
                    />
                    {errors.stateName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.stateName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm">Pincode</label>
                    <input
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Pincode"
                    />
                    {errors.pincode && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.pincode}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm">Country</label>
                    <input
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Country"
                    />
                    {errors.country && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.country}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleSaveBasicInfo}
                  className="cursor-pointer mt-6 bg-[#FF9C0A] hover:bg-yellow-500 text-[#4B5563] font-bold px-12 py-2 rounded-lg"
                >
                  Save
                </button>
              </>
            )}

            {tabIndex === 1 && (
              <>
                <div className="mt-4 text-[#002F5C] text-sm">
                  <p className="mt-6 text-md  font-semibold ">
                    Company / Organization Name
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <label className="text-sm ">
                        Company/ Organization Name
                      </label>
                      <input
                        name="companyName"
                        value={professionalData.companyName}
                        onChange={handleProfessionalChange}
                        className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Company name here "
                      />
                      {errors.companyName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.companyName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm">Job Title / Role</label>
                      <select
                        name="jobTitle"
                        value={professionalData.jobTitle}
                        onChange={handleProfessionalChange}
                        className="w-full px-4  py-3 border border-gray-300 rounded-md text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                        defaultValue=""
                      >
                        <option value="" className="text-gray-400" disabled>
                          Enter job title here
                        </option>
                        <option value="Bussness Owner">Bussness Owner</option>
                        <option value="Government Officer">
                          Government Officer
                        </option>
                        <option value="Personal Assistant">
                          Personal Assistant
                        </option>
                        <option value="Chief Executive Officer">
                          Chief Executive Officer
                        </option>
                        <option value="Operation Manager">
                          Operation Manager
                        </option>
                      </select>
                      {errors.jobTitle && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.jobTitle}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm mb-1 block">Industry</label>
                      <select
                        name="industry"
                        value={professionalData.industry}
                        onChange={handleProfessionalChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select Your Industry
                        </option>
                        <option value="IT Industry"> IT Industry</option>
                        <option value="Film Industry"> Film Industry</option>
                        <option value="Bussness Industry">
                          Bussness Industry
                        </option>
                        <option value="Government Sector">
                          Government Sector
                        </option>
                        <option value="Other Sector">Other Sector</option>
                      </select>
                      {errors.industry && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.industry}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm ">
                        Company/ Organization Website
                      </label>
                      <input
                        name="website"
                        value={professionalData.website}
                        onChange={handleProfessionalChange}
                        className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Company Website here "
                      />
                      {errors.website && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.website}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="mt-6 text-md font-semibold">
                    Contact Information
                  </p>
                  <div className="mt-4 grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm mb-1 block">
                        Bussness Email
                      </label>
                      <input
                        name="businessEmail"
                        value={professionalData.businessEmail}
                        onChange={handleProfessionalChange}
                        type="email"
                        placeholder="Enter email address here"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.businessEmail && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.businessEmail}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm mb-1 block">Phone Number</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-4 py-3 border border-r-0 border-gray-300 text-sm rounded-l-md  text-gray-600">
                          +91
                        </span>
                        <input
                          type="tel"
                          placeholder="1234567890"
                          className="w-full px-4 py-3 border border-gray-300 rounded-r-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSaveProfessionalInfo}
                    className="cursor-pointer mt-6 bg-[#FF9C0A] hover:bg-yellow-500 text-[#002F5C] font-bold px-12 py-2 rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="bg-white border-gray-500  rounded-lg   text-center">
            <div className="flex flex-col items-center space-y-2 shadow-sm p-10 rounded-xl">
              <div className="h-16 w-16 bg-gradient-to-br from-red-400 to-orange-400 text-white rounded-full flex items-center justify-center text-xl font-bold">
                {formData?.firstName?.[0]?.toUpperCase()}
                {formData?.lastName?.[0]?.toUpperCase()}
              </div>

              <div className="flex gap-1 items-center">
                <p className="text-sm font-semibold">
                  {formData?.firstName} {formData?.lastName}
                </p>
                <IoCheckmarkCircle className="text-green-500 h-5 w-5" />
              </div>

              <div className="text-xs text-[#4B5563]">
                {professionalData?.companyName}
              </div>
              <button className="w-50 mt-4 border rounded-lg p-2.5 text-sm text-[#FF9C0A]">
                Flight History
              </button>
              <button className="w-50 bg-[#FF9C0A] text-white p-2.5 rounded-lg text-sm">
                My Flights
              </button>
            </div>

            <div className="button-section mt-4">
              <button
                onClick={() => setIsDialogOpen(true)}
                className="text-sm border cursor-pointer border-gray-300 p-3 rounded-lg text-gray-700 flex items-center justify-between w-full mb-2"
              >
                Change Password <img src={LockImg} alt="" className="h-5" />
              </button>
              <AuthWrapper
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                initialStep="changePassword"
              />
              <button
                className="text-sm border cursor-pointer border-red-400 p-3 rounded-lg text-red-500 flex items-center justify-between w-full mb-2"
                onClick={handleLogout}
              >
                Log out <img src={signoutImg} alt="" className="h-4" />
              </button>
              <button className="w-full bg-[#FF4D4F] text-white rounded-lg  p-3  text-sm">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
