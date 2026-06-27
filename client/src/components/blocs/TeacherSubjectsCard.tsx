"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import { BookOpen, Plus, Trash2, BookX } from "lucide-react";

interface TeacherSubjectsCardProps {
  teacherId: string;
}

const TeacherSubjectsCard: React.FC<TeacherSubjectsCardProps> = ({ teacherId }) => {
  const [assignedSubjects, setAssignedSubjects] = useState<any[]>([]);
  const [allSubjects, setAllSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");

  const fetchAssignedSubjects = async () => {
    try {
      const res = await axiosInstance.get(`/subject-teachers/subjects/${teacherId}`);
      // The API returns an array of SubjectTeacher objects which includes the subject
      setAssignedSubjects(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load assigned subjects");
    }
  };

  const fetchAllSubjects = async () => {
    try {
      const res = await axiosInstance.get("/subjects");
      setAllSubjects(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load all subjects");
    }
  };

  const loadData = async () => {
    setLoading(true);
    await Promise.all([fetchAssignedSubjects(), fetchAllSubjects()]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [teacherId]);

  const handleAssignSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubject) return;

    try {
      setAssigning(true);
      await axiosInstance.post(`/subject-teachers/assign/${selectedSubject}`, {
        teacherId: Number(teacherId),
      });
      toast.success("Subject assigned successfully");
      setSelectedSubject("");
      fetchAssignedSubjects();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to assign subject");
    } finally {
      setAssigning(false);
    }
  };

  const handleRemoveSubject = async (subjectId: number) => {
    if (!confirm("Are you sure you want to remove this subject from the teacher?")) return;
    
    try {
      await axiosInstance.delete(`/subject-teachers/remove/${teacherId}/${subjectId}`);
      toast.success("Subject removed successfully");
      fetchAssignedSubjects();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to remove subject");
    }
  };

  // Filter out subjects that are already assigned
  const assignedSubjectIds = assignedSubjects.map(st => st.subjectId);
  const availableSubjects = allSubjects.filter(sub => !assignedSubjectIds.includes(sub.id));

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2 flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-100 p-2.5 rounded-lg text-purple-600">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Assigned Subjects</h2>
          <p className="text-sm text-gray-500">Manage subjects taught by this teacher</p>
        </div>
      </div>

      {/* Assign Subject Form */}
      <form onSubmit={handleAssignSubject} className="mb-6 flex gap-3">
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all bg-white"
        >
          <option value="" disabled>Select a subject to assign</option>
          {availableSubjects.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.subjectName} ({sub.subjectCode}) - Class ID: {sub.classId}
            </option>
          ))}
          {availableSubjects.length === 0 && (
            <option value="" disabled>All subjects already assigned</option>
          )}
        </select>
        <button
          type="submit"
          disabled={!selectedSubject || assigning}
          className="px-4 py-2.5 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Assign
        </button>
      </form>

      {/* Assigned Subjects List */}
      <div className="flex-1 border rounded-lg border-gray-200 overflow-hidden bg-gray-50/50">
        {assignedSubjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-gray-400 h-full">
            <BookX className="w-12 h-12 mb-3 opacity-40" />
            <p className="font-medium">No subjects assigned</p>
            <p className="text-sm mt-1">Assign a subject using the dropdown above.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {assignedSubjects.map((st) => (
              <li key={st.id} className="p-4 bg-white hover:bg-gray-50 transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{st.subject.subjectName}</p>
                    <p className="text-xs text-gray-500 font-medium">
                      Code: {st.subject.subjectCode} • Class ID: {st.subject.classId}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveSubject(st.subjectId)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title="Remove Subject"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TeacherSubjectsCard;
