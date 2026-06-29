"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/store/slices/authSlice";
import toast from "react-hot-toast";
import {
  Layers,
  User,
  ShoppingBag,
  Heart,
  ShoppingCart,
  Settings,
  ExternalLink,
  LogOut,
} from "lucide-react";

const navItems = [
  {
    label: "My Profile",
    href: "/dashboard/profile",
    icon: User,
    description: "Personal info & photo",
  },
  {
    label: "My Orders",
    href: "/dashboard/orders",
    icon: ShoppingBag,
    description: "Order history & status",
  },
  {
    label: "Wishlist",
    href: "/wishlist",
    icon: Heart,
    description: "Saved designs",
    external: true,
  },
  {
    label: "My Cart",
    href: "/cart",
    icon: ShoppingCart,
    description: "Current cart",
    external: true,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    description: "Password & preferences",
  },
];

export default function DashboardSidebar({ user }) {
  const pathname = usePathname();
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

  const isActive = (item) => {
    if (item.href === "/dashboard/orders") {
      return pathname.startsWith("/dashboard/orders");
    }
    return pathname === item.href;
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#2C2C2C]  flex-col hidden lg:flex">
      {/* Top: Brand + User Info */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Layers className="w-6 h-6 text-[#C8956C]" />
          <Link
            href={"/"}
            className="text-lg font-playfair font-bold text-white"
          >
            RS Wallpaper
          </Link>
        </div>

        <div className="mt-6">
          <div className="w-12 h-12 rounded-full bg-[#C8956C] flex items-center justify-center text-white text-lg font-bold mb-3">
            {getUserInitials()}
          </div>
          <p className="text-white font-semibold text-sm truncate">
            {user?.name}
          </p>
          <p className="text-gray-400 text-xs truncate">{user?.email}</p>
          <Link
            href="/dashboard/profile"
            className="text-[#C8956C] text-xs mt-1 hover:underline inline-block"
          >
            View Profile →
          </Link>
        </div>
      </div>

      {/* Middle: Nav Items */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <p className="text-[10px] tracking-widest text-gray-500 px-3 mb-2 uppercase">
          NAVIGATION
        </p>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-200 group ${
                  active
                    ? "bg-[#C8956C] text-white"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon
                  className={`w-[18px] h-[18px] ${active ? "text-white" : "text-gray-500 group-hover:text-white"}`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.label}</p>
                  {!active && (
                    <p className="text-[11px] opacity-60">{item.description}</p>
                  )}
                </div>
                {item.external && (
                  <ExternalLink className="w-3 h-3 opacity-50" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom: Quick Actions */}
      <div className="p-4 border-t border-white/10">
        <Link
          href="/products"
          className="flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors"
        >
          <Layers className="w-4 h-4" />
          Browse Products
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-400 text-sm hover:text-red-400 transition-colors mt-3 w-full"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
