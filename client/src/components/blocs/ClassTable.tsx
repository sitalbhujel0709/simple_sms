"use client";
import React, { useEffect, useState } from "react";
import {
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  MoreVertical,
  School,
  Layers,
  LayoutGrid,
} from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import ClassModal from "./ClassModal";
import ClassEditModal from "./ClassEditModal";

const ClassTable = () => {
  const [classes, setClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingClass, setEditingClass] = useState<any>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const fetchClasses = async () => {
    try {
      const res = await axiosInstance.get("/classrooms");
      setClasses(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load classes");
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleDelete = async (id: number, name: string, section: string) => {
    if (!confirm(`Are you sure you want to delete class "${name} - ${section}"?`)) {
      return;
    }
    try {
      await axiosInstance.delete(`/classrooms/${id}`);
      toast.success("Class deleted successfully!");
      fetchClasses();
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to delete class";
      toast.error(message);
    }
  };

  const handleEdit = (classItem: any) => {
    setEditingClass(classItem);
    setIsEditOpen(true);
  };

  const filteredClasses = classes.filter(
    (cls: any) =>
      cls.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.section?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Count unique sections
  const uniqueSections = new Set(classes.map((c: any) => c.section)).size;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Class Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create, view, and manage all classes and their sections.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ClassModal onClassCreated={fetchClasses} />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
            <School size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Classes</p>
            <p className="text-2xl font-bold text-gray-900">
              {classes.length}
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-green-50 p-3 rounded-lg text-green-600">
            <Layers size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Sections</p>
            <p className="text-2xl font-bold text-gray-900">
              {uniqueSections}
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-orange-50 p-3 rounded-lg text-orange-600">
            <LayoutGrid size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Unique Grades</p>
            <p className="text-2xl font-bold text-gray-900">
              {new Set(classes.map((c: any) => c.name)).size}
            </p>
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
              placeholder="Search by class name or section..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                <th className="px-6 py-4">Class</th>
                <th className="px-6 py-4">Section</th>
                <th className="px-6 py-4">Full Name</th>
                <th className="px-6 py-4">Created At</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredClasses.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    <School className="w-10 h-10 mx-auto mb-3 opacity-40" />
                    <p className="font-medium">No classes found</p>
                    <p className="text-sm mt-1">
                      Try adjusting your search or add a new class.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredClasses.map((cls: any) => (
                  <tr
                    key={cls.id}
                    className="hover:bg-gray-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                          <School className="w-4 h-4" />
                        </div>
                        <p className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                          {cls.name}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold tracking-wide">
                        {cls.section}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-700">
                        {cls.name} - {cls.section}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-700">
                        {cls.createdAt
                          ? new Date(cls.createdAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-gray-400">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(cls)}
                          className="p-1.5 hover:bg-gray-100 rounded-md transition-colors hover:text-blue-600"
                          title="Edit Class"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(cls.id, cls.name, cls.section)
                          }
                          className="p-1.5 hover:bg-red-50 rounded-md transition-colors hover:text-red-600"
                          title="Delete Class"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {/* Fallback for touch devices */}
                      <button className="p-1.5 group-hover:opacity-0 text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium text-gray-900">
              {filteredClasses.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-900">
              {classes.length}
            </span>{" "}
            results
          </p>
        </div>
      </div>

      {/* Edit Modal */}
      <ClassEditModal
        classData={editingClass}
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setEditingClass(null);
        }}
        onClassUpdated={fetchClasses}
      />
    </div>
  );
};

export default ClassTable;