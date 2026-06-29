"use client";

import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logoutUser } from "@/store/slices/authSlice";
import toast from "react-hot-toast";
import { Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";
import DashboardBreadcrumb from "./DashboardBreadcrumb";

export default function DashboardTopbar({ user }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const notificationsRef = useRef(null);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const getUserInitials = () => {
    if (!user?.name) return "?";
    const names = user.name.split(" ");
    return names
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast.success("Logged out successfully");
    router.push("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-gray-100 h-16 flex items-center justify-between px-4 lg:px-8">
      <DashboardBreadcrumb />

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 text-gray-400 hover:text-[#C8956C] transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50">
              <div className="p-3 border-b border-gray-100 text-sm">
                <p className="text-gray-700">Your quote request was received</p>
                <p className="text-gray-400 text-xs mt-1">2 hours ago</p>
              </div>
              <div className="p-3 border-b border-gray-100 text-sm">
                <p className="text-gray-700">New designs added to 3D Wallpaper</p>
                <p className="text-gray-400 text-xs mt-1">1 day ago</p>
              </div>
              <div className="p-3 text-sm">
                <p className="text-gray-700">Site visit confirmed for tomorrow</p>
                <p className="text-gray-400 text-xs mt-1">2 days ago</p>
              </div>
              <button className="p-3 text-xs text-[#C8956C] w-full text-left hover:bg-gray-50 rounded-b-2xl">
                Mark all as read
              </button>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-gray-200"></div>

        {/* User Avatar + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-[#C8956C] flex items-center justify-center text-white text-sm font-semibold">
              {getUserInitials()}
            </div>
            <span className="hidden sm:block text-sm font-medium text-[#2C2C2C]">{user?.name}</span>
            <ChevronDown className="w-[14px] h-[14px] text-gray-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 py-2">
              <Link href="/dashboard/profile" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <User className="w-4 h-4" />
                My Profile
              </Link>
              <Link href="/dashboard/settings" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <Settings className="w-4 h-4" />
                Settings
              </Link>
              <div className="border-t border-gray-100 my-2"></div>
              <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
