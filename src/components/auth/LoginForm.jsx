"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PasswordInput from "./PasswordInput";
import AuthRedirectLink from "./AuthRedirectLink";
import { Loader2, LogIn, Mail } from "lucide-react";

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (loading) return;
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router, loading]);

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
    <div className="space-y-5">
      {/* Google Continue Button */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gray-200 text-[#2C2C2C] font-medium hover:bg-gray-50 transition-all"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.3v2.71h3.57c2.08-1.92 3.28-4.74 3.28-8.02z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.71c-.97.66-2.2 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.26v2.8C4.01 20.29 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.01H2.26C.8 9.82 0 12.86 0 12.86s.8 3.04 2.26 5.85l3.58-2.79z"
            fill="#FBBC05"
          />
          <path
            d="M12 4.75c1.63 0 3.07.55 4.23 1.63l3.17-3.16C17.46.99 14.98 0 12 0 7.7 0 4.01 2.71 2.26 6.6l3.58 2.79c.87-2.6 3.3-4.54 6.16-4.54z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-[#FAF7F2] text-gray-400">or</span>
        </div>
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

      {/* Password Field */}
      <PasswordInput
        id="password"
        label="Password"
        placeholder="Enter your password"
        register={register("password", {
          required: "Password is required",
        })}
        error={errors.password}
        disabled={loading}
      />

      {/* Forgot Password Link */}
      <div className="text-right">
        <a
          href="/forgot-password"
          className="text-sm text-[#C8956C] hover:underline"
        >
          Forgot your password?
        </a>
      </div>

      {/* Login Button */}
      <button
        onClick={handleSubmit(onSubmit)}
        disabled={loading}
        className="w-full bg-[#C8956C] text-white py-3 rounded-xl font-semibold hover:bg-[#B8845C] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Signing in...
          </>
        ) : (
          <>
            <LogIn className="w-5 h-5" />
            Sign In
          </>
        )}
      </button>

      {/* Footer Redirect */}
      <AuthRedirectLink
        text="Don't have an account?"
        linkText="Create one free"
        href="/register"
      />
    </div>
  );
}
