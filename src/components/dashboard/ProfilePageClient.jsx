"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/store/slices/authSlice";
import {
  Mail,
  User,
  Phone,
  MapPin,
  Camera,
  Lock,
  AlertTriangle,
  Save,
  Loader2,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import PasswordInput from "@/components/auth/PasswordInput";

export default function ProfilePageClient() {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const [saving, setSaving] = useState(false);
  const [changingPwd, setChangingPwd] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileInputRef = useRef(null);

  // Profile Form
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty, errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      district: user?.district || "",
    },
  });

  const onSubmitProfile = async (data) => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    dispatch(updateUser(data));
    toast.success("Profile updated successfully!");
    setSaving(false);
  };

  // Password Form
  const {
    register: regPwd,
    handleSubmit: handlePwd,
    watch: watchPwd,
    reset: resetPwd,
    formState: { errors: pwdErrors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmitPassword = async () => {
    setChangingPwd(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Password updated successfully!");
    resetPwd();
    setChangingPwd(false);
  };

  // Password Strength
  const getStrength = (pwd) => {
    let s = 0;
    if (pwd?.length >= 8) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/[0-9]/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    return s;
  };

  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = [
    "",
    "bg-red-400",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-green-500",
  ];
  const newPwd = watchPwd("newPassword");
  const strength = getStrength(newPwd);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setUploadingPhoto(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const photoUrl = event.target.result;
        await new Promise((r) => setTimeout(r, 800));
        dispatch(updateUser({ photo: photoUrl }));
        toast.success("Profile photo updated!");
        setUploadingPhoto(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Failed to upload photo");
      setUploadingPhoto(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Card 1: Profile Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            {user?.photo ? (
              <img
                src={user.photo}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-[#C8956C] flex items-center justify-center text-white text-2xl font-bold">
                {user?.name
                  ?.split(" ")
                  .slice(0, 2)
                  .map((n, i) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
            <button
              onClick={handlePhotoClick}
              disabled={uploadingPhoto}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-[#C8956C] hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {uploadingPhoto ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Camera className="w-4 h-4" />
              )}
            </button>
            {user?.photo && (
              <button
                onClick={() => {
                  dispatch(updateUser({ photo: null }));
                  toast.success("Profile photo removed");
                }}
                className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-semibold text-[#2C2C2C]">
              {user?.name}
            </h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Card 2: Edit Profile */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <User className="w-5 h-5 text-[#C8956C]" />
          <h3 className="font-semibold text-[#2C2C2C]">Edit Profile</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#2C2C2C]">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all outline-none ${
                  errors.name
                    ? "border-red-400 bg-red-50 focus:ring-red-200"
                    : "border-gray-200 focus:border-[#C8956C] focus:ring-2 focus:ring-[#C8956C]/20"
                }`}
                {...register("name", { required: "Name is required" })}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                ⚠ {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#2C2C2C]">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all outline-none ${
                  errors.email
                    ? "border-red-400 bg-red-50 focus:ring-red-200"
                    : "border-gray-200 focus:border-[#C8956C] focus:ring-2 focus:ring-[#C8956C]/20"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                ⚠ {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#2C2C2C]">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all outline-none ${
                  errors.phone
                    ? "border-red-400 bg-red-50 focus:ring-red-200"
                    : "border-gray-200 focus:border-[#C8956C] focus:ring-2 focus:ring-[#C8956C]/20"
                }`}
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^01[3-9]\d{8}$/,
                    message: "Enter a valid Bangladeshi phone number",
                  },
                })}
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                ⚠ {errors.phone.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#2C2C2C]">
              District
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#C8956C] focus:ring-2 focus:ring-[#C8956C]/20 outline-none"
                {...register("district")}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => reset()}
            disabled={!isDirty}
            className={`border border-gray-200 text-gray-600 rounded-xl px-5 py-2.5 text-sm ${!isDirty ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Discard
          </button>
          <button
            onClick={handleSubmit(onSubmitProfile)}
            disabled={!isDirty || saving}
            className="bg-[#C8956C] text-white rounded-xl px-6 py-2.5 text-sm font-semibold flex items-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card 3: Change Password */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Lock className="w-5 h-5 text-[#C8956C]" />
          <h3 className="font-semibold text-[#2C2C2C]">Change Password</h3>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <PasswordInput
              id="currentPassword"
              label="Current Password"
              placeholder="••••••••"
              registration={regPwd("currentPassword", {
                required: "Current password is required",
              })}
              error={pwdErrors.currentPassword}
            />
          </div>

          <div>
            <PasswordInput
              id="newPassword"
              label="New Password"
              placeholder="••••••••"
              registration={regPwd("newPassword", {
                required: "New password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
                validate: {
                  hasUppercase: (v) =>
                    /[A-Z]/.test(v) ||
                    "Must contain at least 1 uppercase letter",
                  hasNumber: (v) =>
                    /[0-9]/.test(v) || "Must contain at least 1 number",
                },
              })}
              error={pwdErrors.newPassword}
            />

            {newPwd && (
              <div className="mt-2">
                <div className="flex gap-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-all ${
                        i < strength ? colors[strength] : "bg-gray-200"
                      }`}
                    ></div>
                  ))}
                </div>
                {strength > 0 && (
                  <p
                    className={`text-xs mt-1 ${colors[strength].replace("bg-", "text-")}`}
                  >
                    {labels[strength]}
                  </p>
                )}
              </div>
            )}
          </div>

          <div>
            <PasswordInput
              id="confirmPassword"
              label="Confirm New Password"
              placeholder="••••••••"
              registration={regPwd("confirmPassword", {
                required: "Please confirm your password",
                validate: (v) =>
                  v === watchPwd("newPassword") || "Passwords do not match",
              })}
              error={pwdErrors.confirmPassword}
            />
          </div>
        </div>

        <div className="flex justify-end mt-2">
          <button
            onClick={handlePwd(onSubmitPassword)}
            disabled={changingPwd}
            className="bg-[#C8956C] text-white rounded-xl px-6 py-2.5 text-sm font-semibold flex items-center gap-2"
          >
            {changingPwd ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </div>
      </div>

      {/* Card 4: Danger Zone */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-100">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <h3 className="font-semibold text-red-500">Danger Zone</h3>
        </div>
        <p className="text-xs text-gray-400 mt-1 mb-4">
          These actions are irreversible. Please be careful.
        </p>

        <div className="flex justify-between items-center py-4 border-b border-gray-100">
          <div>
            <p className="text-sm font-medium text-[#2C2C2C]">
              Deactivate Account
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              Temporarily disable your account
            </p>
          </div>
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Deactivate your account? You can reactivate by logging in again.",
                )
              ) {
                toast.info(
                  "Please contact support at 01772-132818 to deactivate.",
                );
              }
            }}
            className="border border-red-300 text-red-500 text-sm rounded-xl px-4 py-2 hover:bg-red-50 transition-colors"
          >
            Deactivate
          </button>
        </div>

        <div className="flex justify-between items-center py-4">
          <div>
            <p className="text-sm font-medium text-red-600">Delete Account</p>
            <p className="text-xs text-gray-400 mt-0.5">
              Permanently delete all your data. Cannot be undone.
            </p>
          </div>
          <button
            onClick={() => {
              if (
                window.confirm(
                  "This will permanently delete your account and all data. Are you sure?",
                )
              ) {
                toast.error(
                  "Please contact support at 01772-132818 to delete your account.",
                );
              }
            }}
            className="bg-red-500 text-white text-sm rounded-xl px-4 py-2 hover:bg-red-600 transition-colors"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
