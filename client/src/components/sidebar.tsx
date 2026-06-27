"use client";
import { ChevronLeftIcon, House, PersonStanding, GraduationCap,School,BookOpen, CircleUserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { UserSidebarFooter } from "./UserSidebarFooter";

const menuItems = [
  {
    "label":"Home",
    "icon": House,
    "href":"/"
  },
  {
    "label":"Students",
    "icon": PersonStanding,
    "href":"/students"
  },
  {
    "label":"Teachers",
    "icon": GraduationCap ,
    "href":"/teachers"
  }
  ,{
    "label":"Classes",
    "icon": School,
    "href": "/classes"
  },
  {
    "label":"Subjects",
    "icon": BookOpen,
    "href": "/subjects"
  }
]

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }
  const pathname = usePathname();
  return (
    <div className="w-full h-screen max-h-screen flex ">
      {/* sidebar */}
      <div className={`${isSidebarOpen ? "w-64 h-full border-r border-gray-300" : "w-0 h-full border-r border-gray-300 "} transition-all duration-300 relative`}>
        <div className={`${isSidebarOpen ? "block":"hidden"} p-2`}>
          <div className="h-16 flex items-center">
            <h2 className="text-2xl font-bold text-gray-800 px-2">
              <span className="text-red-500">Mero </span>School
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            {
              menuItems.map((item,index)=>(
                <Link href={item.href} key={index} className={`flex items-center gap-2 p-2 hover:bg-gray-200 ${pathname === item.href ? "bg-orange-200" : ""}`}>
                  <div className="flex items-center gap-2">
                  <item.icon className="w-5 h-5" />
                    {item.label}  
                  </div>
                </Link>
              ))
            }
          </div>
          <UserSidebarFooter isSidebarOpen={isSidebarOpen} />
        </div>
      </div>
      {/* main content */}
      <div className="flex-1 h-full overflow-y-auto">
        <div className="h-16 w-full border-b border-gray-300 flex items-center px-4">
          <button className="p-1 rounded-full hover:bg-gray-200" onClick={handleSidebarToggle}>
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
