import Image from "next/image";
import React from "react";
import { Mail, Phone, MapPin, Calendar, User, Briefcase } from "lucide-react";

interface TeacherInfoCardProps {
  teacher: any;
}

const TeacherInfoCard: React.FC<TeacherInfoCardProps> = ({ teacher }) => {
  return (
    <div className="col-span-1 lg:col-span-2 rounded-xl p-6 bg-white shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold uppercase tracking-wider">
          Active
        </span>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Profile Image */}
        <div className="shrink-0 flex flex-col items-center gap-3">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-50 shadow-sm">
            <Image
              src="https://placehold.co/200x200/png"
              alt={teacher.user?.name || "Teacher Image"}
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center">
            <h4 className="text-lg font-bold text-gray-900">{teacher.name}</h4>
            <p className="text-sm text-gray-500 font-medium">{teacher.role || "Teacher"}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Email Address</p>
              <p className="text-sm font-semibold text-gray-800 break-all">{teacher.email || "N/A"}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Phone Number</p>
              <p className="text-sm font-semibold text-gray-800">{teacher.phoneNumber || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Date of Birth</p>
              <p className="text-sm font-semibold text-gray-800">
                {teacher.dateOfBirth ? new Date(teacher.dateOfBirth).toLocaleDateString() : "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Gender</p>
              <p className="text-sm font-semibold text-gray-800 capitalize">
                {teacher.gender ? teacher.gender.toLowerCase() : "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:col-span-2">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Address</p>
              <p className="text-sm font-semibold text-gray-800">{teacher.address || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherInfoCard;
