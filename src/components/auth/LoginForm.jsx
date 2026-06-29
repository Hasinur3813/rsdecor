"use client";

import { useEffect, useState } from "react";
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
  const [redirectTo, setRedirectTo] = useState("/");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    if (redirect && redirect.startsWith("/")) {
      setTimeout(() => {
        setRedirectTo(redirect);
      }, 0);
    }
  }, []);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (loading) return;
    if (isAuthenticated) {
      toast.success("Welcome back!");
      router.push(redirectTo);
    }
  }, [isAuthenticated, router, loading, redirectTo]);

  useEffect(() => {
    if (error && typeof error === "string") {
      toast.error(error);

      if (error.toLowerCase().includes("email")) {
        setError("email", { message: error });
      }
      if (error.toLowerCase().includes("password")) {
        setError("password", { message: error });
      }

      dispatch(clearError());
    }
  }, [error, setError, dispatch]);

  return (
    <div className="space-y-5">
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

      <div className="text-right">
        <a
          href="/forgot-password"
          className="text-sm text-[#C8956C] hover:underline"
        >
          Forgot your password?
        </a>
      </div>

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

      <AuthRedirectLink
        text="Don't have an account?"
        linkText="Create one free"
        href="/register"
      />
    </div>
  );
}
