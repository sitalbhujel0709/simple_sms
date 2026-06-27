"use client";
import React, { useState } from "react";
import { useAuth } from "./providers/AuthProvider";
import { LogOut, Settings, MoreVertical, CircleUserRound } from "lucide-react";
import Link from "next/link";

export const UserSidebarFooter = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  if (!user) {
    return (
      <div className="absolute bottom-0 right-0 w-full p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <CircleUserRound className="w-8 h-8 text-gray-400" />
          {isSidebarOpen && <span className="text-sm text-gray-500">Loading...</span>}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute bottom-0 right-0 w-full border-t border-gray-200 bg-white">
      {/* Popover Menu */}
      {showMenu && isSidebarOpen && (
        <div className="absolute bottom-full left-2 right-2 mb-2 bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden z-50">
          <div className="p-2">
            <Link href="/profile" className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700 transition-colors">
              <Settings className="w-4 h-4 text-gray-500" />
              Settings
            </Link>
            <button 
              onClick={logout}
              className="w-full flex items-center gap-2 p-2 hover:bg-red-50 rounded-lg text-sm text-red-600 transition-colors text-left"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              Sign out
            </button>
          </div>
        </div>
      )}

      {/* Main Footer Button */}
      <div 
        className="p-3 w-full flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors"
        onClick={() => setShowMenu(!showMenu)}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="relative">
            <img 
              src={`https://placehold.co/40x40/png`} 
              alt={user.name || "User"} 
              className="w-10 h-10 rounded-full object-cover border border-gray-200 shrink-0" 
            />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          
          {isSidebarOpen && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-gray-900 truncate">{user.name}</span>
              <span className="text-xs text-gray-500 truncate capitalize">{user.role?.toLowerCase() || 'User'}</span>
            </div>
          )}
        </div>

        {isSidebarOpen && (
          <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
