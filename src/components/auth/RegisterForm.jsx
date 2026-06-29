"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError, clearRegisterSuccess } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PasswordInput from "./PasswordInput";
import AuthRedirectLink from "./AuthRedirectLink";
import { Loader2, User, Mail, Phone, MapPin, UserPlus, CheckCircle2 } from "lucide-react";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, registerSuccess } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const password = watch("password");

  // Password strength logic
  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-500"];

  const passwordStrength = getPasswordStrength(password || "");

  const onSubmit = async (data) => {
    await dispatch(registerUser(data));
  };

  useEffect(() => {
    if (registerSuccess) {
      toast.success("Account created! Please sign in.");
      dispatch(clearRegisterSuccess());
      router.push("/login");
    }
  }, [registerSuccess, router, dispatch]);

  useEffect(() => {
    if (error && typeof error === "string") {
      toast.error(error);
      
      if (error.toLowerCase().includes("email")) {
        setError("email", { message: error });
      }
      if (error.toLowerCase().includes("password")) {
        setError("password", { message: error });
      }

      return () => {
        dispatch(clearError());
      };
    }
  }, [error, setError, dispatch]);

  return (
    <div className="space-y-4">
      {/* Full Name Field */}
      <div className="space-y-1">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-[#2C2C2C]"
        >
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all outline-none ${
              errors.name
                ? "border-red-400 bg-red-50"
                : "border-gray-200 focus:border-[#C8956C] focus:ring-2 focus:ring-[#C8956C]/20"
            }`}
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
          />
        </div>
        {errors.name && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            ⚠ {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-1">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[#2C2C2C]"
        >
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all outline-none ${
              errors.email
                ? "border-red-400 bg-red-50"
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
          <p className="text-xs text-red-500 flex items-center gap-1">
            ⚠ {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone Field */}
      <div className="space-y-1">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-[#2C2C2C]"
        >
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            id="phone"
            type="tel"
            placeholder="01XXXXXXXXX"
            className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all outline-none ${
              errors.phone
                ? "border-red-400 bg-red-50"
                : "border-gray-200 focus:border-[#C8956C] focus:ring-2 focus:ring-[#C8956C]/20"
            }`}
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^01[3-9]\d{8}$/,
                message: "Enter a valid Bangladeshi phone number (e.g. 01XXXXXXXXX)",
              },
            })}
          />
        </div>
        {errors.phone && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            ⚠ {errors.phone.message}
          </p>
        )}
      </div>

      {/* District Field */}
      <div className="space-y-1">
        <label
          htmlFor="district"
          className="block text-sm font-medium text-[#2C2C2C]"
        >
          District
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            id="district"
            type="text"
            placeholder="Your district"
            className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all outline-none ${
              errors.district
                ? "border-red-400 bg-red-50"
                : "border-gray-200 focus:border-[#C8956C] focus:ring-2 focus:ring-[#C8956C]/20"
            }`}
            {...register("district", {
              required: "District is required",
            })}
          />
        </div>
        {errors.district && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            ⚠ {errors.district.message}
          </p>
        )}
      </div>

      {/* Password Field with Strength Meter */}
      <div className="space-y-2">
        <PasswordInput
          id="password"
          label="Password"
          placeholder="Create a password"
          register={register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            pattern: {
              value: /(?=.*[A-Z])(?=.*\d)/,
              message: "Password must contain at least 1 uppercase letter and 1 digit",
            },
          })}
          error={errors.password}
          disabled={loading}
        />
        {/* Password Strength Meter */}
        {password && (
          <div className="space-y-1">
            <div className="flex gap-1 h-1.5">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-300 ${
                    i < passwordStrength ? strengthColors[passwordStrength] : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <p className={`text-xs ${passwordStrength >= 3 ? "text-green-600" : "text-gray-500"}`}>
              {strengthLabels[passwordStrength]}
            </p>
          </div>
        )}
      </div>

      {/* Confirm Password Field */}
      <PasswordInput
        id="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your password"
        register={register("confirmPassword", {
          required: "Please confirm your password",
          validate: (value) =>
            value === password || "Passwords do not match",
        })}
        error={errors.confirmPassword}
        disabled={loading}
      />

      {/* Terms Checkbox */}
      <div className="flex items-start gap-2">
        <input
          id="terms"
          type="checkbox"
          className="mt-1 h-4 w-4 text-[#C8956C] border-gray-300 rounded focus:ring-[#C8956C]"
          {...register("terms", {
            required: "You must agree to the terms and conditions",
          })}
        />
        <label htmlFor="terms" className="text-sm text-gray-500">
          I agree to the <a href="#" className="text-[#C8956C] hover:underline">terms and conditions</a>
        </label>
      </div>
      {errors.terms && (
        <p className="text-xs text-red-500 flex items-center gap-1 -mt-2">
          ⚠ {errors.terms.message}
        </p>
      )}

      {/* Register Button */}
      <button
        onClick={handleSubmit(onSubmit)}
        disabled={loading}
        className="w-full bg-[#C8956C] text-white py-3 rounded-xl font-semibold hover:bg-[#B8845C] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Creating Account...
          </>
        ) : (
          <>
            <UserPlus className="w-5 h-5" />
            Create Account
          </>
        )}
      </button>

      {/* Redirect Link */}
      <AuthRedirectLink
        text="Already have an account?"
        linkText="Sign In"
        href="/login"
      />
    </div>
  );
}
