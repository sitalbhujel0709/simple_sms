"use client";
import axiosInstance from "@/lib/axios";
import { X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface SubjectModalProps {
  onSubjectCreated: () => void;
  classes: any[];
}

const SubjectModal: React.FC<SubjectModalProps> = ({ onSubjectCreated, classes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [classId, setClassId] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setSubjectName("");
    setSubjectCode("");
    setClassId("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!subjectName.trim() || !subjectCode.trim() || !classId.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      await axiosInstance.post("/subjects", {
        subjectName: subjectName.trim(),
        subjectCode: subjectCode.trim(),
        classId: Number(classId),
      });
      toast.success("Subject created successfully!");
      resetForm();
      setIsOpen(false);
      onSubjectCreated();
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to create subject";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors shadow-sm"
      >
        + Add Subject
      </button>
      {isOpen && (
        <div className="fixed z-50 inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">
                Create New Subject
              </h3>
              <button
                onClick={() => {
                  setIsOpen(false);
                  resetForm();
                }}
                className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="subjectName"
                  className="text-sm font-semibold text-gray-700"
                >
                  Subject Name
                </label>
                <input
                  type="text"
                  id="subjectName"
                  placeholder="e.g. Mathematics, Science"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="subjectCode"
                  className="text-sm font-semibold text-gray-700"
                >
                  Subject Code
                </label>
                <input
                  type="text"
                  id="subjectCode"
                  placeholder="e.g. MATH101"
                  value={subjectCode}
                  onChange={(e) => setSubjectCode(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="classId"
                  className="text-sm font-semibold text-gray-700"
                >
                  Class
                </label>
                <select
                  id="classId"
                  value={classId}
                  onChange={(e) => setClassId(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all bg-white"
                >
                  <option value="" disabled>Select a class</option>
                  {classes.map((c: any) => (
                    <option key={c.id} value={c.id}>
                      {c.name} - {c.section}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating..." : "Create Subject"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectModal;
