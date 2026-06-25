"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  Bell,
  Sparkles,
  Tag,
  Clock,
  MessageCircle,
  Globe,
  Save,
  User,
  ShieldCheck,
  Trash2,
} from "lucide-react";

function ToggleSwitch({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
        enabled ? "bg-[#4A7C6F]" : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function SettingRow({
  icon: Icon,
  iconColor = "text-[#C8956C]",
  title,
  description,
  children,
  noBorder,
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 py-4 ${
        !noBorder ? "border-b border-gray-100" : ""
      }`}
    >
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className={`mt-0.5 flex-shrink-0 ${iconColor}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#2C2C2C]">{title}</p>
          {description && (
            <p className="text-xs text-gray-400 mt-0.5">{description}</p>
          )}
        </div>
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

export default function SettingsPageClient() {
  const { user } = useSelector((s) => s.auth);
  const [saving, setSaving] = useState(false);

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    newDesigns: true,
    promotions: false,
    siteVisitReminders: true,
    whatsappNotifications: false,
  });

  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("BDT");

  const handleSavePreferences = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Notification preferences saved!");
    setSaving(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#2C2C2C] font-playfair">
          Settings
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage your account preferences and privacy.
        </p>
      </div>

      {/* Card 1: Notification Preferences */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Bell className="w-4.5 h-4.5 text-[#C8956C]" />
          <h2 className="font-semibold text-[#2C2C2C]">
            Notification Preferences
          </h2>
        </div>

        <SettingRow
          icon={Bell}
          title="Order Status Updates"
          description="Get notified when your order status changes"
        >
          <ToggleSwitch
            enabled={notifications.orderUpdates}
            onChange={(val) =>
              setNotifications({ ...notifications, orderUpdates: val })
            }
          />
        </SettingRow>

        <SettingRow
          icon={Sparkles}
          title="New Design Arrivals"
          description="Be first to know about new collections"
        >
          <ToggleSwitch
            enabled={notifications.newDesigns}
            onChange={(val) =>
              setNotifications({ ...notifications, newDesigns: val })
            }
          />
        </SettingRow>

        <SettingRow
          icon={Tag}
          title="Promotional Offers"
          description="Discounts and seasonal deals"
        >
          <ToggleSwitch
            enabled={notifications.promotions}
            onChange={(val) =>
              setNotifications({ ...notifications, promotions: val })
            }
          />
        </SettingRow>

        <SettingRow
          icon={Clock}
          title="Site Visit Reminders"
          description="Reminder before your scheduled site visit"
        >
          <ToggleSwitch
            enabled={notifications.siteVisitReminders}
            onChange={(val) =>
              setNotifications({ ...notifications, siteVisitReminders: val })
            }
          />
        </SettingRow>

        <SettingRow
          icon={MessageCircle}
          iconColor="text-green-500"
          title="WhatsApp Notifications"
          description="Receive order updates directly on WhatsApp"
          noBorder
        >
          <ToggleSwitch
            enabled={notifications.whatsappNotifications}
            onChange={(val) =>
              setNotifications({ ...notifications, whatsappNotifications: val })
            }
          />
        </SettingRow>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleSavePreferences}
            disabled={saving}
            className="bg-[#C8956C] text-white rounded-xl px-5 py-2.5 text-sm font-semibold flex items-center gap-2 hover:bg-[#B8845C] transition-colors disabled:opacity-70"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Preferences"}
          </button>
        </div>
      </div>

      {/* Card 2: Appearance & Regional */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-4.5 h-4.5 text-[#C8956C]" />
          <h2 className="font-semibold text-[#2C2C2C]">
            Appearance & Regional
          </h2>
        </div>

        <SettingRow
          icon={Globe}
          title="Language"
          description="Choose your preferred language"
        >
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-[#2C2C2C] bg-white focus:outline-none focus:border-[#C8956C] focus:ring-2 focus:ring-[#C8956C]/20"
          >
            <option value="en">English</option>
            <option value="bn">বাংলা</option>
          </select>
        </SettingRow>

        <SettingRow
          icon={Globe}
          title="Currency"
          description="Default currency for pricing"
          noBorder
        >
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-[#2C2C2C] bg-white focus:outline-none focus:border-[#C8956C] focus:ring-2 focus:ring-[#C8956C]/20"
          >
            <option value="BDT">BDT (৳)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </SettingRow>
      </div>

      {/* Card 3: Account Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <User className="w-4.5 h-4.5 text-[#C8956C]" />
          <h2 className="font-semibold text-[#2C2C2C]">Account Settings</h2>
        </div>

        <SettingRow
          icon={User}
          title="Edit Profile"
          description="Update your name, photo, and contact info"
        >
          <button className="text-sm text-[#C8956C] hover:underline">
            Edit
          </button>
        </SettingRow>

        <SettingRow
          icon={ShieldCheck}
          title="Change Password"
          description="Secure your account with a new password"
        >
          <button className="text-sm text-[#C8956C] hover:underline">
            Change
          </button>
        </SettingRow>

        <SettingRow
          icon={Trash2}
          iconColor="text-red-500"
          title="Delete Account"
          description="Permanently delete your account and all data"
          noBorder
        >
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to delete your account? This cannot be undone.",
                )
              ) {
                toast.error(
                  "Please contact support at 01772-132818 to delete your account.",
                );
              }
            }}
            className="text-sm text-red-500 hover:text-red-600 font-medium"
          >
            Delete
          </button>
        </SettingRow>
      </div>
    </div>
  );
}
