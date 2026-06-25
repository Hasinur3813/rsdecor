"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearError } from "@/store/slices/authSlice";
import Link from "next/link";
import toast from "react-hot-toast";
import { Loader2, Mail, MailCheck, ArrowLeft } from "lucide-react";

export default function ForgotPasswordForm() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [viewState, setViewState] = useState("idle");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [resendCountdown, setResendCountdown] = useState(60);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    setSubmittedEmail(data.email);
    const result = await dispatch(forgotPassword(data.email));

    if (forgotPassword.fulfilled.match(result)) {
      setViewState("sent");
      toast.success("Reset link sent! Check your inbox.");
    } else {
      toast.error(result.payload || "Failed to send reset link");
      if (result.payload?.toLowerCase().includes("email")) {
        setError("email", { message: result.payload });
      }
      dispatch(clearError());
    }
  };

  const handleResend = async () => {
    const result = await dispatch(forgotPassword(submittedEmail));

    if (forgotPassword.fulfilled.match(result)) {
      toast.success("Email resent!");
      setResendCountdown(60);
    } else {
      toast.error(result.payload || "Failed to resend email");
    }
  };

  // Resend countdown timer
  useEffect(() => {
    if (viewState === "sent" && resendCountdown > 0) {
      const timer = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [viewState, resendCountdown]);

  // Format countdown (seconds to MM:SS)
  const formatCountdown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (viewState === "sent") {
    return (
      <div className="text-center space-y-6">
        <MailCheck className="w-16 h-16 text-[#4A7C6F] mx-auto" />

        <div>
          <h3 className="font-playfair text-2xl font-bold text-[#2C2C2C] mb-2">
            Check Your Inbox
          </h3>
          <p className="text-gray-500 mb-4">
            We sent a password reset link to:
          </p>
          <div className="bg-[#FAF7F2] rounded-xl px-4 py-2 font-medium text-[#C8956C] inline-block">
            {submittedEmail}
          </div>
        </div>

        <p className="text-sm text-gray-500">
          Didn&apos;t receive it? Check your spam folder or try again.
        </p>

        <div className="space-y-3">
          {/* Resend Email Button */}
          <button
            onClick={handleResend}
            disabled={loading || resendCountdown > 0}
            className="w-full border border-[#C8956C] text-[#C8956C] py-3 rounded-xl font-semibold hover:bg-[#C8956C]/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : resendCountdown > 0 ? (
              `Resend in ${formatCountdown(resendCountdown)}`
            ) : (
              "Resend Email"
            )}
          </button>

          {/* Back to Login Button */}
          <Link
            href="/login"
            className="w-full inline-block bg-[#2C2C2C] text-white py-3 rounded-xl font-semibold hover:bg-[#3a3a3a] transition-all"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Back to Login Link */}
      <Link
        href="/login"
        className="flex items-center gap-2 text-[#C8956C] text-sm font-medium hover:gap-3 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Login
      </Link>

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
            disabled={loading}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all outline-none ${
              errors.email
                ? "border-red-400 bg-red-50"
                : "border-gray-200 focus:border-[#C8956C] focus:ring-2 focus:ring-[#C8956C]/20"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
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

      {/* Send Reset Link Button */}
      <button
        onClick={handleSubmit(onSubmit)}
        disabled={loading}
        className="w-full bg-[#C8956C] text-white py-3 rounded-xl font-semibold hover:bg-[#B8845C] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Reset Link"
        )}
      </button>
    </div>
  );
}
