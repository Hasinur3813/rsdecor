"use client";

import { useState, useRef } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const SERVICE_OPTIONS = [
  "Select a Service",
  "3D Wallpaper",
  "3D Ceiling Paper",
  "3D Epoxy Floor",
  "Full Room Package (Wall + Ceiling + Floor)",
  "Not Sure — Need Advice",
];

const INITIAL_FORM = {
  name: "",
  phone: "",
  district: "",
  service: "Select a Service",
  roomSize: "",
  message: "",
};

const PHONE_PATTERN = /^01[3-9]\d{8}$/;

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const fieldRefs = useRef({});

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim() || form.name.trim().length < 2) {
      nextErrors.name = "Please enter your full name (at least 2 characters).";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (!PHONE_PATTERN.test(form.phone.trim())) {
      nextErrors.phone = "Enter a valid Bangladeshi number (e.g. 01772132818).";
    }

    if (!form.district.trim()) {
      nextErrors.district = "Please enter your district or city.";
    }

    if (form.service === "Select a Service") {
      nextErrors.service = "Please select a service.";
    }

    setErrors(nextErrors);

    const firstErrorField = ["name", "phone", "district", "service"].find(
      (key) => nextErrors[key],
    );

    if (firstErrorField && fieldRefs.current[firstErrorField]) {
      fieldRefs.current[firstErrorField].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setStatus("loading");

    // TODO: Integrate with backend API / email service
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStatus("success");
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setStatus("idle");
  };

  const inputClass = (field) =>
    cn(
      "w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all",
      "focus:border-primary focus:ring-2 focus:ring-primary/20",
      errors[field]
        ? "border-red-400 bg-red-50"
        : "border-gray-200 bg-white",
    );

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-5" />
        <h2 className="text-2xl font-heading font-bold text-dark mb-3">
          Message Sent Successfully!
        </h2>
        <p className="text-dark-muted leading-relaxed mb-8">
          Thank you, {form.name}! We&apos;ve received your message and will
          contact you on {form.phone} within 1 hour.
        </p>
        <button
          type="button"
          onClick={resetForm}
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 md:p-8">
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark mb-2">
        Send Us a Message
      </h2>
      <p className="text-sm text-dark-muted mb-6">
        Fill in the form below and we&apos;ll get back to you within 1 hour.
      </p>

      {status === "error" && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
          Something went wrong. Please try calling us directly at 01772-132818.
        </div>
      )}

      <div className="space-y-5">
        <div ref={(el) => (fieldRefs.current.name = el)}>
          <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-widest text-dark-muted mb-2">
            Full Name *
          </label>
          <input
            id="contact-name"
            type="text"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className={inputClass("name")}
            placeholder="Your full name"
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>
          )}
        </div>

        <div ref={(el) => (fieldRefs.current.phone = el)}>
          <label htmlFor="contact-phone" className="block text-xs font-semibold uppercase tracking-widest text-dark-muted mb-2">
            Phone Number *
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className={inputClass("phone")}
            placeholder="01XXXXXXXXX"
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p>
          )}
        </div>

        <div ref={(el) => (fieldRefs.current.district = el)}>
          <label htmlFor="contact-district" className="block text-xs font-semibold uppercase tracking-widest text-dark-muted mb-2">
            District / City *
          </label>
          <input
            id="contact-district"
            type="text"
            value={form.district}
            onChange={(e) => updateField("district", e.target.value)}
            className={inputClass("district")}
            placeholder="e.g. Dhaka, Rajshahi, Chittagong"
          />
          {errors.district && (
            <p className="mt-1.5 text-xs text-red-600">{errors.district}</p>
          )}
        </div>

        <div ref={(el) => (fieldRefs.current.service = el)}>
          <label htmlFor="contact-service" className="block text-xs font-semibold uppercase tracking-widest text-dark-muted mb-2">
            Service Interested In *
          </label>
          <select
            id="contact-service"
            value={form.service}
            onChange={(e) => updateField("service", e.target.value)}
            className={inputClass("service")}
          >
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="mt-1.5 text-xs text-red-600">{errors.service}</p>
          )}
        </div>

        <div>
          <label htmlFor="contact-room-size" className="block text-xs font-semibold uppercase tracking-widest text-dark-muted mb-2">
            Room Size (optional)
          </label>
          <input
            id="contact-room-size"
            type="text"
            value={form.roomSize}
            onChange={(e) => updateField("roomSize", e.target.value)}
            className={inputClass("roomSize")}
            placeholder="e.g. 12ft x 14ft"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-widest text-dark-muted mb-2">
            Message
          </label>
          <textarea
            id="contact-message"
            rows={4}
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            className={cn(inputClass("message"), "resize-none")}
            placeholder="Tell us more about your requirements, budget, or any questions..."
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={status === "loading"}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark disabled:opacity-70 disabled:cursor-not-allowed transition-all"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </div>
    </div>
  );
}
