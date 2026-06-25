"use client";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";

const StudentProfilePage = () => {
  return (
    <div className="min-h-screen bg-slate-100 p-4">
      {/* Quick Actions */}
      <div className="w-full rounded-xl p-4 bg-gray-700 text-white">
        <div className="flex justify-between">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-semibold">Student Profile</h2>
            <p className="text-orange-100">
              View and manage student information and enrollment details.
            </p>
          </div>
          <div className=" max-w-sm flex flex-wrap items-center gap-4">
            <button onClick={()=> toast.error("hello")} className="px-4 py-1 rounded-full bg-yellow-400">
              <span className="text-white text-sm font-semibold">
                Edit Profile
              </span>
            </button>
            <button className="px-4 py-1 rounded-full bg-green-500">
              <span className="text-white text-sm font-semibold">
                Mark Present
              </span>
            </button>
            <button className="px-4 py-1 rounded-full bg-blue-500">
              <span className="text-white text-sm font-semibold">Promote</span>
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {/* Student Information Cards */}
        <div className="col-span-2 rounded-xl p-4 bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold mb-2">Student Information</h3>
            <button className="px-4 py-1 rounded-full bg-green-200 text-green-800 font-semibold hover:bg-green-300 transition-colors">
              active
            </button>
          </div>
          <div className="flex gap-4 items-center ">
            <div className="max-w-50 p-2">
              <Image
                src="https://placehold.co/200x200/png"
                alt="Student Image"
                width={200}
                height={200}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className=" flex gap-8">
                <div>
                  <label>Name:</label>
                  <p className="text-gray-700">John Doe</p>
                </div>
                <div>
                  <label>Email:</label>
                  <p className="text-gray-700">john.doe@example.com</p>
                </div>
              </div>
              <div className=" flex gap-8">
                <div>
                  <label className="text-sm">Date of Birth:</label>
                  <p className="text-gray-700 font-semibold">January 1, 2000</p>
                </div>
                <div>
                  <label className="text-sm">Class:</label>
                  <p className="text-gray-700 font-semibold">10 A</p>
                </div>
                <div>
                  <label>Address:</label>
                  <p className="text-gray-700">
                    123 Main Street, City, State 12345
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 rounded-xl p-4 bg-white">
          <h3 className="text-xl font-semibold mb-4 ">Current Enrollment</h3>

          <div className="flex flex-col gap-2">
            <div>
              <label className="text-sm text-gray-500">Class</label>
              <p className="text-lg font-semibold">10 A</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Academic Year</label>
              <p className="text-lg font-semibold">2026</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Attendance</label>
              <p className="text-lg font-semibold">95%</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="col-span-1 rounded-xl p-4 bg-white">
          <h3 className="text-xl font-semibold mb-4">Academic Performance</h3>
          <div className="flex flex-col gap-1">
            <div className="flex px-4 py-1 justify-between bg-amber-100 rounded-lg">
              <span className="text-gray-700">Mathematics</span>
              <span className="text-gray-700 font-semibold">A</span>
            </div>
            <div className="flex px-4 py-1 justify-between bg-amber-100 rounded-lg">
              <span className="text-gray-700">Science</span>
              <span className="text-gray-700 font-semibold">B+</span>
            </div>
            <div className="flex px-4 py-1 justify-between bg-amber-100 rounded-lg">
              <span className="text-gray-700">History</span>
              <span className="text-gray-700 font-semibold">A-</span>
            </div>
          </div>
        </div>
        <div className="col-span-1 rounded-xl p-4 bg-white">
          <h3 className="text-xl font-semibold mb-4">Behavioral Records</h3>
          <p className="text-gray-700">No data available</p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;
