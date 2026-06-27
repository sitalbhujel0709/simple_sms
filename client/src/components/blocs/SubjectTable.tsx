"use client";
import React, { useEffect, useState } from "react";
import {
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  MoreVertical,
  BookOpen,
  Hash,
  Layers,
} from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import SubjectModal from "./SubjectModal";
import SubjectEditModal from "./SubjectEditModal";

const SubjectTable = () => {
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingSubject, setEditingSubject] = useState<any>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const fetchSubjects = async () => {
    try {
      const res = await axiosInstance.get("/subjects");
      setSubjects(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load subjects");
    }
  };

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
    fetchSubjects();
    fetchClasses();
  }, []);

  const handleDelete = async (id: number, subjectName: string) => {
    if (!confirm(`Are you sure you want to delete subject "${subjectName}"?`)) {
      return;
    }
    try {
      await axiosInstance.delete(`/subjects/${id}`);
      toast.success("Subject deleted successfully!");
      fetchSubjects();
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to delete subject";
      toast.error(message);
    }
  };

  const handleEdit = (subject: any) => {
    setEditingSubject(subject);
    setIsEditOpen(true);
  };

  const filteredSubjects = subjects.filter((subject: any) =>
    subject.subjectName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.subjectCode?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getClassName = (classId: number) => {
    const cls: any = classes.find((c: any) => c.id === classId);
    return cls ? `${cls.name} - ${cls.section}` : `ID: ${classId}`;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Subject Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage all subjects, view details, and update information.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <SubjectModal onSubjectCreated={fetchSubjects} classes={classes} />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Subjects</p>
            <p className="text-2xl font-bold text-gray-900">
              {subjects.length}
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-green-50 p-3 rounded-lg text-green-600">
            <Hash size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Unique Codes</p>
            <p className="text-2xl font-bold text-gray-900">
              {new Set(subjects.map((s: any) => s.subjectCode)).size}
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-orange-50 p-3 rounded-lg text-orange-600">
            <Layers size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Classes Covered</p>
            <p className="text-2xl font-bold text-gray-900">
              {new Set(subjects.map((s: any) => s.classId)).size}
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
              placeholder="Search by name or code..."
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
                <th className="px-6 py-4">Subject Name</th>
                <th className="px-6 py-4">Subject Code</th>
                <th className="px-6 py-4">Class</th>
                <th className="px-6 py-4">Created At</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSubjects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
                    <p className="font-medium">No subjects found</p>
                    <p className="text-sm mt-1">Try adjusting your search or add a new subject.</p>
                  </td>
                </tr>
              ) : (
                filteredSubjects.map((subject: any) => (
                  <tr
                    key={subject.id}
                    className="hover:bg-gray-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <p className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                          {subject.subjectName}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide">
                        {subject.subjectCode}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-700 font-medium">
                        {getClassName(subject.classId)}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-700">
                        {subject.createdAt
                          ? new Date(subject.createdAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-gray-400">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/subjects/${subject.id}`}
                          className="p-1.5 hover:bg-gray-100 rounded-md transition-colors hover:text-gray-900"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleEdit(subject)}
                          className="p-1.5 hover:bg-gray-100 rounded-md transition-colors hover:text-blue-600"
                          title="Edit Subject"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(subject.id, subject.subjectName)}
                          className="p-1.5 hover:bg-red-50 rounded-md transition-colors hover:text-red-600"
                          title="Delete Subject"
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

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium text-gray-900">
              {filteredSubjects.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-900">
              {subjects.length}
            </span>{" "}
            results
          </p>
        </div>
      </div>
      
      {/* Edit Modal */}
      <SubjectEditModal
        subjectData={editingSubject}
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setEditingSubject(null);
        }}
        onSubjectUpdated={fetchSubjects}
        classes={classes}
      />
    </div>
  );
};

export default SubjectTable;