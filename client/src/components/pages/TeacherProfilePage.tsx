"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import TeacherQuickActions from "../blocs/TeacherQuickActions";
import TeacherInfoCard from "../blocs/TeacherInfoCard";
import TeacherSubjectsCard from "../blocs/TeacherSubjectsCard";

const TeacherProfilePage = ({ teacherId }: { teacherId: string }) => {
  const [teacher, setTeacher] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/teachers/${teacherId}`);
        console.log(res.data)
        setTeacher(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load teacher data");
      } finally {
        setLoading(false);
      }
    };
    if (teacherId) {
      fetchTeacher();
    }
  }, [teacherId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 p-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="min-h-screen bg-slate-100 p-4 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Teacher not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 space-y-4">
      <TeacherQuickActions />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <TeacherInfoCard teacher={teacher} />
        <TeacherSubjectsCard teacherId={teacherId} />
      </div>
    </div>
  );
};

export default TeacherProfilePage;
