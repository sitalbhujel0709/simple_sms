"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import { GraduationCap, Plus, Trash2, CalendarDays } from "lucide-react";

interface StudentEnrollmentsCardProps {
  studentId: string;
}

const StudentEnrollmentsCard: React.FC<StudentEnrollmentsCardProps> = ({ studentId }) => {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [academicYears, setAcademicYears] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedAcademicYearId, setSelectedAcademicYearId] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [enrollmentsRes, classesRes, yearsRes] = await Promise.all([
        axiosInstance.get(`/enrollments/student/${studentId}`),
        axiosInstance.get("/classrooms"),
        axiosInstance.get("/academic-years"),
      ]);
      setEnrollments(enrollmentsRes.data);
      setClasses(classesRes.data);
      setAcademicYears(yearsRes.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load enrollment data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (studentId) {
      fetchData();
    }
  }, [studentId]);

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClassId || !selectedAcademicYearId) {
      toast.error("Please select both a class and an academic year.");
      return;
    }

    try {
      setEnrolling(true);
      await axiosInstance.post(`/enrollments/student/${studentId}`, {
        classId: Number(selectedClassId),
        academicYearId: Number(selectedAcademicYearId),
      });
      toast.success("Student enrolled successfully!");
      setSelectedClassId("");
      setSelectedAcademicYearId("");
      fetchData(); // Refresh list
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to enroll student");
    } finally {
      setEnrolling(false);
    }
  };

  const handleUnenroll = async (enrollmentId: number) => {
    if (!confirm("Are you sure you want to remove this enrollment?")) return;
    try {
      await axiosInstance.delete(`/enrollments/${enrollmentId}`);
      toast.success("Enrollment removed successfully");
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to remove enrollment");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-2.5 rounded-lg text-blue-600">
          <GraduationCap className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Enrollment History</h2>
          <p className="text-sm text-gray-500">Manage student classes and academic years</p>
        </div>
      </div>

      {/* Enroll Form */}
      <form onSubmit={handleEnroll} className="mb-6 flex flex-col sm:flex-row gap-3">
        <select
          value={selectedAcademicYearId}
          onChange={(e) => setSelectedAcademicYearId(e.target.value)}
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 bg-white"
        >
          <option value="" disabled>Select Academic Year</option>
          {academicYears.map((year) => (
            <option key={year.id} value={year.id}>
              {year.year}
            </option>
          ))}
        </select>

        <select
          value={selectedClassId}
          onChange={(e) => setSelectedClassId(e.target.value)}
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 bg-white"
        >
          <option value="" disabled>Select Class</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name} - {cls.section}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={!selectedClassId || !selectedAcademicYearId || enrolling}
          className="px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          Enroll
        </button>
      </form>

      {/* Enrollments List */}
      <div className="flex-1 border rounded-lg border-gray-200 overflow-hidden bg-gray-50/50">
        {enrollments.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-gray-400 h-full">
            <CalendarDays className="w-12 h-12 mb-3 opacity-40" />
            <p className="font-medium">No active enrollments</p>
            <p className="text-sm mt-1">Enroll the student using the form above.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {enrollments.map((enr) => (
              <li key={enr.id} className="p-4 bg-white hover:bg-gray-50 transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 px-3 py-1 rounded-md">
                    <p className="text-green-700 font-bold text-sm">{enr.academicYear?.year}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {enr.class?.name} - {enr.class?.section}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                      Enrolled on {new Date(enr.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleUnenroll(enr.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title="Remove Enrollment"
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

export default StudentEnrollmentsCard;
