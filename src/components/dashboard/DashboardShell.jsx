"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchSession } from "@/store/slices/authSlice";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";
import DashboardMobileNav from "./DashboardMobileNav";
import { Loader2 } from "lucide-react";

export default function DashboardShell({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, sessionChecked, user } = useSelector((s) => s.auth);

  useEffect(() => {
    if (!sessionChecked) {
      dispatch(fetchSession());
    }
  }, [dispatch, sessionChecked]);

  useEffect(() => {
    if (sessionChecked && !isAuthenticated) {
      router.replace("/login?redirect=/dashboard");
    }
  }, [sessionChecked, isAuthenticated, router]);

  if (!sessionChecked || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-[#C8956C]" />
          <p className="text-gray-500 text-sm">Checking your session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex">
      <DashboardSidebar user={user} />
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        <DashboardTopbar user={user} />
        <main className="flex-1 p-4 lg:p-8 pb-24 lg:pb-8">{children}</main>
      </div>
      <DashboardMobileNav />
    </div>
  );
}
