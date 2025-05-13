import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import LockImg from "../assets/Images/Lockimage.png";
import { IoCheckmarkCircle } from "react-icons/io5";
import signoutImg from "../assets/Images/signout.png";
export default function Account() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div className="bg-white min-h-screen p-4">
      <div className="max-w-6xl mx-auto mt-6">
        <div className="heading-section">
          <h2 className="text-2xl font-semibold mb-1">Account</h2>
          <p className="text-sm text-gray-600 mb-6">
            Manage your profile and preferences
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
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
                    <label className="text-sm">Date of Birth</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm">Gender</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Select gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
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
                    <label className="text-sm">Phone Number</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-4 py-3 border border-r-0 border-gray-300 text-sm rounded-l-md">
                        +91
                      </span>
                      <input
                        name="phone"
                        type="tel"
                        placeholder="Enter Phone Number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-r-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
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
                  <input className="p-2 border rounded" placeholder="State" />
                  <input className="p-2 border rounded" placeholder="Pincode" />
                  <input className="p-2 border rounded" placeholder="Country" />
                </div>

                <button className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded">
                  Save
                </button>
              </>
            )}

            {tabIndex === 1 && (
              <div className="mt-6 text-gray-600 text-sm">
                <p>Professional Details content goes here...</p>
              </div>
            )}
          </div>

          <div className="bg-white border-gray-500  rounded-lg   text-center">
            <div className="flex flex-col items-center space-y-2 shadow-sm p-10 rounded-xl">
              <div className="h-16 w-16 bg-gradient-to-br from-red-400 to-orange-400 text-white rounded-full flex items-center justify-center text-xl font-bold">
                AV
              </div>
              <div className="text-sm font-semibold">
                Aarav Mehta <span className="text-green-500">✔</span>
              </div>
              <div className="text-xs text-gray-500">Global Ventures LLC</div>
              <button className="w-full mt-4 border rounded px-3 py-2 text-sm text-blue-600">
                Flight History
              </button>
              <button className="w-full bg-blue-500 text-white py-2 rounded text-sm">
                My Flights
              </button>
            </div>

            <div className="button-section mt-4">
              <button className="text-sm border cursor-pointer border-gray-300 p-2.5 rounded-lg text-gray-700 flex items-center justify-between w-full mb-2">
                Change Password <img src={LockImg} alt="" className="h-5" />
              </button>
              <button className="text-sm border cursor-pointer border-red-400 p-2.5 rounded-lg text-red-500 flex items-center justify-between w-full mb-2">
                Log out <img src={signoutImg} alt="" className="h-4" />
              </button>
              <button className="w-full bg-[#FF4D4F] text-white rounded-lg  py-2.5  text-sm">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
