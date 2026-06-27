"use client";
import React from "react";
import { toast } from "react-toastify";

const TeacherQuickActions = () => {
  return (
    <div className="w-full rounded-xl p-4 bg-gray-700 text-white shadow-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-semibold">Teacher Profile</h2>
          <p className="text-orange-100">
            View and manage teacher information and details.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => toast.info("Edit feature coming soon")}
            className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 transition-colors shadow-sm"
          >
            <span className="text-white text-sm font-semibold">
              Edit Profile
            </span>
          </button>
          <button
            onClick={() => toast.info("Messaging feature coming soon")}
            className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors shadow-sm"
          >
            <span className="text-white text-sm font-semibold">
              Message
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherQuickActions;
