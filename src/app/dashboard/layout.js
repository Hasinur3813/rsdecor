import DashboardShell from "@/components/dashboard/DashboardShell";

export const metadata = {
  title: {
    template: "%s | Dashboard — RS Wallpaper",
    default: "Dashboard — RS Wallpaper",
  },
  description: "Manage your profile, orders and account settings.",
};

export default function DashboardLayout({ children }) {
  return <DashboardShell>{children}</DashboardShell>;
}
