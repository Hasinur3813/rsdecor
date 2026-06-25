"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function DashboardBreadcrumb() {
  const pathname = usePathname();

  const breadcrumbMap = {
    "/dashboard/profile": [{ label: "Dashboard", href: "/dashboard" }, { label: "My Profile" }],
    "/dashboard/orders": [{ label: "Dashboard", href: "/dashboard" }, { label: "My Orders" }],
    "/dashboard/settings": [{ label: "Dashboard", href: "/dashboard" }, { label: "Settings" }],
  };

  const getBreadcrumbs = () => {
    // Handle order details page
    if (pathname.startsWith("/dashboard/orders/")) {
      const id = pathname.split("/").pop();
      return [
        { label: "Dashboard", href: "/dashboard" },
        { label: "My Orders", href: "/dashboard/orders" },
        { label: `Order #${id}` },
      ];
    }

    return breadcrumbMap[pathname] || [{ label: "Dashboard" }];
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="flex items-center gap-1 text-sm">
      {breadcrumbs.map((crumb, index) => (
        <div key={index} className="flex items-center gap-1">
          {index > 0 && <ChevronRight className="w-3 h-3 text-gray-400" />}
          {crumb.href ? (
            <Link href={crumb.href} className="text-gray-400 hover:text-[#C8956C] transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-[#2C2C2C] font-medium">{crumb.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}
