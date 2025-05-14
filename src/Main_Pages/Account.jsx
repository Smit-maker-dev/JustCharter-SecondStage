import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import LockImg from "../assets/Images/Lockimage.png";
import { IoCheckmarkCircle } from "react-icons/io5";
import signoutImg from "../assets/Images/signout.png";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function Account() {
  const [tabIndex, setTabIndex] = useState(0);
  const [dob, setDob] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div className="bg-white min-h-screen p-4">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Your First Name"
                    />
                  </div>
                  <div>
                    <label className="text-sm">Last Name</label>
                    <input
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Your Last Name"
                    />
                  </div>
                  <div>
                    <label className="text-sm block mb-1">Date of Birth</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        format="DD/MM/YYYY"
                        value={dob}
                        onChange={(newValue) => setDob(newValue)}
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
                  </div>
                  <div>
                    <label className="text-sm mb-1 block">Gender</label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <p className="mt-4 text-md font-black">Contact Information</p>

                <div className="mt-4 grid md:grid-cols-2 gap-4 items-end">
                  <div>
                    <label className="text-sm">Email Address</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <IoCheckmarkCircle className="absolute text-blue-400 right-3 top-3 h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm mb-1 block">Phone Number</label>
                    <div className="relative">
                      <div className="flex">
                        <span className="inline-flex items-center px-4 py-3 border border-r-0 border-gray-300 text-sm rounded-l-md ">
                          +91
                        </span>
                        <input
                          name="phone"
                          type="tel"
                          placeholder="Enter Phone Number"
                          className="w-full px-4 py-3 border border-gray-300 text-sm rounded-r-md pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 text-sm cursor-pointer hover:font-bold">
                        Verify
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-md font-black">Address</p>
                <div className="mt-3 grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm">Street/House</label>
                    <input
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Your First Name"
                    />
                  </div>
                  <div>
                    <label className="text-sm">State</label>
                    <input
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Address here"
                    />
                  </div>
                  <div>
                    <label className="text-sm">Pincode</label>
                    <input
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Pincode here"
                    />
                  </div>
                  <div>
                    <label className="text-sm">Country</label>
                    <input
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Country here"
                    />
                  </div>
                </div>

                <button className="mt-6 bg-[#FFD700] hover:bg-yellow-500 text-[#4B5563] font-bold px-12 py-2 rounded-lg">
                  Save
                </button>
              </>
            )}

            {tabIndex === 1 && (
              <>
                <div className="mt-4 text-black text-sm">
                  <p className="mt-6 text-md  font-semibold ">
                    Company / Organization Name
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <label className="text-sm ">
                        Company/ Organization Name
                      </label>
                      <input
                        className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Company name here "
                      />
                    </div>
                    <div>
                      <label className="text-sm">Job Title / Role</label>
                      <select
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
                    </div>
                    <div>
                      <label className="text-sm mb-1 block">Industry</label>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select Your Industry
                        </option>
                        <option value="Film Industry"> Film Industry</option>
                        <option value="Bussness Industry">
                          Bussness Industry
                        </option>
                        <option value="Government Sector">
                          Government Sector
                        </option>
                        <option value="Other Sector">Other Sector</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm ">
                        Company/ Organization Website
                      </label>
                      <input
                        className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Company Website here "
                      />
                    </div>
                  </div>
                  <p className="mt-6 text-md font-semibold">Contact Information</p>
                  <div className="mt-4 grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm mb-1 block">
                        Bussness Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter email address here"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
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

                  <button className="mt-6 bg-[#FFD700] hover:bg-yellow-500 text-gray-800 font-bold px-12 py-2 rounded-lg">
                    Save
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="bg-white border-gray-500  rounded-lg   text-center">
            <div className="flex flex-col items-center space-y-2 shadow-sm p-10 rounded-xl">
              <div className="h-16 w-16 bg-gradient-to-br from-red-400 to-orange-400 text-white rounded-full flex items-center justify-center text-xl font-bold">
                AV
              </div>
              <div className="flex gap-1">
                <p className="text-sm font-semibold">Aarav Mehta</p>
                <span className="">
                  <IoCheckmarkCircle className=" text-green-500 right-0 top-3 h-5 w-5" />
                </span>
              </div>
              <div className="text-xs text-[#4B5563]">Global Ventures LLC</div>
              <button className="w-50 mt-4 border rounded-lg p-2.5 text-sm text-[#1A9FFF]">
                Flight History
              </button>
              <button className="w-50 bg-[#1A9FFF] text-white p-2.5 rounded-lg text-sm">
                My Flights
              </button>
            </div>

            <div className="button-section mt-4">
              <button className="text-sm border cursor-pointer border-gray-300 p-3 rounded-lg text-gray-700 flex items-center justify-between w-full mb-2">
                Change Password <img src={LockImg} alt="" className="h-5" />
              </button>
              <button className="text-sm border cursor-pointer border-red-400 p-3 rounded-lg text-red-500 flex items-center justify-between w-full mb-2">
                Log out <img src={signoutImg} alt="" className="h-4" />
              </button>
              <button className="w-full bg-[#FF4D4F] text-white rounded-lg  p-3  text-sm">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
