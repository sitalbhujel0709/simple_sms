import React from "react";
import { Eye } from "lucide-react";
import StudentModal from "./StudentModal";
import Link from "next/link";

const StudentTable = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Students</h2>
          <input
            type="text"
            className="outline-2 focus:ring-2 focus:ring-orange-500 px-2 py-1 focus:outline-none text-sm"
            placeholder="Search students..."
          />
        </div>
        <StudentModal />
      </div>
      <div className="">
        <table className="border-collapse w-full">
          <thead className=" border-b border-gray-300 bg-orange-100">
            <tr className="">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Name
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Email
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Role
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Gender
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3">John Doe</td>
              <td className="px-4 py-3">john.doe@example.com</td>
              <td className="px-4 py-3">Student</td>
              <td className="px-4 py-3">Male</td>
              <td className="px-4 py-3">
                <button className=" border border-gray-300 p-1 rounded-full hover:bg-orange-200 ">
                  <Link href={`/students/1`}>
                    <Eye className="w-5 h-5" />
                  </Link>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
