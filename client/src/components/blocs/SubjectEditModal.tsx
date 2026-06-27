"use client";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";

interface SubjectEditModalProps {
  subjectData: any;
  isOpen: boolean;
  onClose: () => void;
  onSubjectUpdated: () => void;
  classes: any[];
}

const SubjectEditModal: React.FC<SubjectEditModalProps> = ({
  subjectData,
  isOpen,
  onClose,
  onSubjectUpdated,
  classes,
}) => {
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [classId, setClassId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (subjectData) {
      setSubjectName(subjectData.subjectName || "");
      setSubjectCode(subjectData.subjectCode || "");
      setClassId(subjectData.classId?.toString() || "");
    }
  }, [subjectData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!subjectName.trim() || !subjectCode.trim() || !classId.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      await axiosInstance.patch(`/subjects/${subjectData.id}`, {
        subjectName: subjectName.trim(),
        subjectCode: subjectCode.trim(),
        classId: Number(classId),
      });
      toast.success("Subject updated successfully!");
      onClose();
      onSubjectUpdated();
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to update subject";
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
          <h3 className="text-lg font-bold text-gray-900">Edit Subject</h3>
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
              htmlFor="editSubjectName"
              className="text-sm font-semibold text-gray-700"
            >
              Subject Name
            </label>
            <input
              type="text"
              id="editSubjectName"
              placeholder="e.g. Mathematics, Science"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="editSubjectCode"
              className="text-sm font-semibold text-gray-700"
            >
              Subject Code
            </label>
            <input
              type="text"
              id="editSubjectCode"
              placeholder="e.g. MATH101"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="editClassId"
              className="text-sm font-semibold text-gray-700"
            >
              Class
            </label>
            <select
              id="editClassId"
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

export default SubjectEditModal;
