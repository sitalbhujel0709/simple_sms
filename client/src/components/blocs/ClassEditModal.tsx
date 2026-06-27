"use client";
import axiosInstance from "@/lib/axios";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ClassEditModalProps {
  classData: any;
  isOpen: boolean;
  onClose: () => void;
  onClassUpdated: () => void;
}

const ClassEditModal: React.FC<ClassEditModalProps> = ({
  classData,
  isOpen,
  onClose,
  onClassUpdated,
}) => {
  const [name, setName] = useState("");
  const [section, setSection] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (classData) {
      setName(classData.name || "");
      setSection(classData.section || "");
    }
  }, [classData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !section.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      await axiosInstance.patch(`/classrooms/${classData.id}`, {
        name: name.trim(),
        section: section.trim(),
      });
      toast.success("Class updated successfully!");
      onClose();
      onClassUpdated();
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to update class";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h3 className="text-lg font-bold text-gray-900">Edit Class</h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="editClassName"
              className="text-sm font-semibold text-gray-700"
            >
              Class Name
            </label>
            <input
              type="text"
              id="editClassName"
              placeholder="e.g. 10, 11, 12"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="editClassSection"
              className="text-sm font-semibold text-gray-700"
            >
              Section
            </label>
            <input
              type="text"
              id="editClassSection"
              placeholder="e.g. A, B, C"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassEditModal;
