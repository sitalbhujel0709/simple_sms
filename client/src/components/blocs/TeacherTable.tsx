"use client";
import React, { useEffect, useState } from "react";
import { Eye, Edit, Trash2, Search, Filter, MoreVertical, Plus, UserCheck, Users, BookOpen } from "lucide-react";
import TeacherModal from "./TeacherModal";
import Link from "next/link";
import axiosInstance from "@/lib/axios";

const TeacherTable = () => {
  const [teachers, setTeachers] = useState([]);
  
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axiosInstance.get("/teachers");
        setTeachers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTeachers();
  }, []);
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Teacher Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all your teachers, view profiles, and update details.</p>
        </div>
        <div className="flex items-center gap-3">
            <TeacherModal />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-blue-50 p-3 rounded-lg text-blue-600"><Users size={24}/></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Teachers</p>
            <p className="text-2xl font-bold text-gray-900">84</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-green-50 p-3 rounded-lg text-green-600"><UserCheck size={24}/></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Active Teachers</p>
            <p className="text-2xl font-bold text-gray-900">79</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-orange-50 p-3 rounded-lg text-orange-600"><BookOpen size={24}/></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Departments</p>
            <p className="text-2xl font-bold text-gray-900">12</p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search teachers by name, ID, or email..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Teacher</th>
                <th className="px-6 py-4">Gender</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Date of Birth</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {teachers.map((teacher: any) => (
                <tr key={teacher.userId} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img src={`https://placehold.co/40x40/png`} alt={teacher.user?.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                      <div>
                        <p className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">{teacher.user?.name}</p>
                        <p className="text-xs text-gray-500">{teacher.user?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-700 capitalize">{teacher.gender?.toLowerCase()}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-medium text-gray-700">{teacher.phoneNumber}</p>
                    <p className="text-xs text-gray-500">{teacher.address}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-700">
                      {teacher.dateOfBirth ? new Date(teacher.dateOfBirth).toLocaleDateString() : 'N/A'}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-gray-400">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/teachers/${teacher.userId}`} className="p-1.5 hover:bg-gray-100 rounded-md transition-colors hover:text-gray-900" title="View Details">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors hover:text-blue-600" title="Edit Teacher">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-red-50 rounded-md transition-colors hover:text-red-600" title="Delete Teacher">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {/* Fallback for touch devices - standard dots */}
                    <button className="p-1.5 group-hover:opacity-0 text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination mock */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing <span className="font-medium text-gray-900">1</span> to <span className="font-medium text-gray-900">5</span> of <span className="font-medium text-gray-900">84</span> results</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-500 bg-gray-50 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 border border-orange-500 bg-orange-50 rounded-md text-sm font-medium text-orange-600">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">3</button>
            <span className="px-2 text-gray-500">...</span>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherTable;
