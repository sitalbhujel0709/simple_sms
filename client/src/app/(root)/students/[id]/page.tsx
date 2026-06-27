"use client";

import { useMemo, useState, use } from "react";
import StudentEnrollmentsCard from "@/components/blocs/StudentEnrollmentsCard";

export default function StudentProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const subjects = ["Mathematics", "Science", "English"];

  const teachers = [
    { subject: "Mathematics", teacher: "Ram Sir" },
    { subject: "Science", teacher: "Hari Sir" },
  ];

  const [currentClass, setCurrentClass] = useState("10A");
  const [attendanceStatus, setAttendanceStatus] = useState("Pending");
  const [lastAction, setLastAction] = useState("No demo action yet");
  const [demoCount, setDemoCount] = useState(0);

  const nextClass = useMemo(() => {
    const match = currentClass.match(/^(\d+)([A-Z])$/);

    if (!match) {
      return currentClass;
    }

    return `${Number(match[1]) + 1}${match[2]}`;
  }, [currentClass]);

  const handleAction = (action: string) => {
    setDemoCount((count) => count + 1);
    setLastAction(action);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-2xl bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
                Demo Mode
              </div>
              <h1 className="text-3xl font-bold">Student Profile</h1>
              <p className="mt-2 max-w-2xl text-slate-300">
                Complete student information and enrollment details with demo-only actions for admin review.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setAttendanceStatus("Present");
                  handleAction("Marked student present for demo");
                }}
                className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-400"
              >
                Mark Present
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentClass(nextClass);
                  handleAction(`Promoted preview to ${nextClass}`);
                }}
                className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-400"
              >
                Promote Preview
              </button>
              <button
                type="button"
                onClick={() => {
                  handleAction("Generated demo parent reminder");
                }}
                className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
              >
                Send Reminder
              </button>
              <button
                type="button"
                onClick={() => {
                  setAttendanceStatus("Pending");
                  setCurrentClass("10A");
                  setDemoCount(0);
                  setLastAction("Demo state reset");
                }}
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
              >
                Reset Demo
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-800">
                Student Information
              </h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Local demo only
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-slate-500">Name</p>
                <p className="font-medium">Ningwa Iwa</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-medium">ning@example.com</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p className="font-medium">9812345670</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Demo actions</p>
                <p className="font-medium text-slate-900">{demoCount} executed</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-800">
              Current Enrollment
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500">Class</p>
                <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                  {currentClass}
                </span>
              </div>

              <div>
                <p className="text-sm text-slate-500">Academic Year</p>
                <p className="text-xl font-semibold">2026</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Attendance</p>
                <p className="text-sm font-semibold text-slate-900">{attendanceStatus}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Last demo action</p>
                <p className="text-sm font-medium text-slate-700">{lastAction}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-800">
              Subjects
            </h2>

            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <button
                  key={subject}
                  type="button"
                  onClick={() => handleAction(`Selected subject: ${subject}`)}
                  className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-800">
              Teachers
            </h2>

            <div className="space-y-3">
              {teachers.map((item) => (
                <button
                  key={item.subject}
                  type="button"
                  onClick={() => handleAction(`Opened teacher card for ${item.teacher}`)}
                  className="flex w-full items-center justify-between rounded-lg border border-slate-200 p-3 text-left transition-colors hover:border-sky-300 hover:bg-sky-50"
                >
                  <span className="font-medium">{item.subject}</span>
                  <span className="text-slate-600">{item.teacher}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-800">
              Quick Demo Panel
            </h2>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => handleAction("Prepared printable report preview")}
                className="rounded-xl border border-slate-200 px-4 py-3 text-left transition-colors hover:border-slate-300 hover:bg-slate-50"
              >
                <p className="font-semibold text-slate-900">Print Preview</p>
                <p className="text-sm text-slate-500">Demo-only export action</p>
              </button>

              <button
                type="button"
                onClick={() => handleAction("Copied parent contact details")}
                className="rounded-xl border border-slate-200 px-4 py-3 text-left transition-colors hover:border-slate-300 hover:bg-slate-50"
              >
                <p className="font-semibold text-slate-900">Copy Contact</p>
                <p className="text-sm text-slate-500">Shows interaction for admin</p>
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-800">
              Demo Activity
            </h2>

            <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              {lastAction}
            </div>
          </div>
        </div>

        {/* Real Enrollment API integration */}
        <StudentEnrollmentsCard studentId={id} />
      </div>
    </div>
  );
}