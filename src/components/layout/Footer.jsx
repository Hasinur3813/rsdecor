"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Layers,
  MapPin,
  Phone,
  Clock,
  Mail,
  Send,
  ArrowRight,
  Award,
  Users,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FOOTER_LINKS, SOCIAL_LINKS, SITE_INFO } from "@/lib/constants";

/* ─────────────────────────────────────────
   Social SVG icons (same as Navbar — brand icons
   aren't available in Lucide)
   ───────────────────────────────────────── */
const SocialIcon = ({ platform, className = "w-4 h-4" }) => {
  switch (platform) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      );
    default:
      return null;
  }
};

/* Stat icon picker */
const StatIcon = ({ label }) => {
  if (label.includes("Year")) return <Award className="w-4 h-4" />;
  if (label.includes("Client")) return <Users className="w-4 h-4" />;
  return <Globe className="w-4 h-4" />;
};

/* ─────────────────────────────────────────
   NEWSLETTER STRIP
   ───────────────────────────────────────── */
const NewsletterStrip = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: integrate with newsletter API
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="relative bg-accent/40 overflow-hidden">
      {/* Subtle diagonal pattern via CSS */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            currentColor 20px,
            currentColor 21px
          )`,
        }}
      />

      <div className="container relative py-12 md:py-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
          {/* Text */}
          <div className="text-center md:text-left shrink-0">
            <h3 className="text-xl md:text-2xl font-heading font-bold text-dark">
              Stay Updated on New Designs & Offers
            </h3>
            <p className="mt-1.5 text-sm text-dark-muted max-w-md">
              Get the latest wallpaper trends and exclusive deals delivered to your inbox.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex w-full md:w-auto items-stretch gap-0 max-w-md"
          >
            <div className="relative flex-1 min-w-0">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-muted/50 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className={cn(
                  "w-full h-11 pl-10 pr-4 text-sm bg-white border border-r-0 border-accent-dark/20",
                  "rounded-l-lg outline-none transition-colors",
                  "placeholder:text-dark-muted/40 focus:border-primary focus:ring-1 focus:ring-primary/20"
                )}
              />
            </div>
            <button
              type="submit"
              disabled={submitted}
              className={cn(
                "flex items-center gap-2 px-5 h-11 text-sm font-semibold text-white rounded-r-lg transition-all duration-200 shrink-0",
                submitted
                  ? "bg-secondary"
                  : "bg-primary hover:bg-primary-dark active:scale-[0.97]"
              )}
            >
              {submitted ? (
                <>Subscribed!</>
              ) : (
                <>
                  Subscribe
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────
   FOOTER (Main export)
   ───────────────────────────────────────── */
export default function Footer() {
  return (
    <footer className="mt-auto">
      {/* ── NEWSLETTER STRIP ── */}
      <NewsletterStrip />

      {/* ── MAIN FOOTER ── */}
      <div className="bg-[#1C1C1C] text-white/80">
        <div className="container py-14 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* ── Col 1: Brand ── */}
            <div className="sm:col-span-2 lg:col-span-1">
              {/* Logo */}
              <Link href="/" className="inline-flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                  <Layers className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xl font-heading font-bold text-white">
                  RS <span className="text-primary">Wallpaper</span>
                </span>
              </Link>

              {/* Tagline */}
              <p className="mt-4 text-sm leading-relaxed text-white/60 max-w-xs">
                {SITE_INFO.tagline}
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-2 mt-5">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-white/5 text-white/50 hover:bg-primary/15 hover:text-primary transition-all duration-200"
                    aria-label={social.label}
                  >
                    <SocialIcon platform={social.platform} className="w-4 h-4" />
                  </a>
                ))}
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-3 mt-6">
                {SITE_INFO.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white/5 text-xs"
                  >
                    <StatIcon label={stat.label} />
                    <span className="font-semibold text-primary">{stat.value}</span>
                    <span className="text-white/50">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Col 2: Products ── */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-white mb-5">
                Products
              </h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.products.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-primary transition-colors duration-200"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      <span className="group-hover:underline group-hover:decoration-primary/50 underline-offset-4">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 3: Company ── */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-white mb-5">
                Company
              </h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-primary transition-colors duration-200"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      <span className="group-hover:underline group-hover:decoration-primary/50 underline-offset-4">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 4: Contact ── */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-white mb-5">
                Contact
              </h4>
              <ul className="space-y-3.5">
                {/* Address */}
                <li className="flex items-start gap-2.5 text-sm text-white/55">
                  <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                  <span>{SITE_INFO.address}</span>
                </li>

                {/* Phone numbers */}
                {SITE_INFO.phones.map((phone) => (
                  <li key={phone}>
                    <a
                      href={`tel:+880${phone.replace(/[^0-9]/g, "")}`}
                      className="flex items-center gap-2.5 text-sm text-white/55 hover:text-primary transition-colors"
                    >
                      <Phone className="w-4 h-4 text-primary shrink-0" />
                      {phone}
                    </a>
                  </li>
                ))}

                {/* Business hours */}
                <li className="flex items-center gap-2.5 text-sm text-white/55">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  {SITE_INFO.hours}
                </li>

                {/* WhatsApp CTA */}
                <li className="pt-1">
                  <a
                    href={`https://wa.me/880${SITE_INFO.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] text-white text-sm font-semibold rounded-lg hover:bg-[#1EBE57] active:scale-[0.97] transition-all duration-200 shadow-sm"
                  >
                    <SocialIcon platform="whatsapp" className="w-4 h-4" />
                    Chat on WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="border-t border-white/10">
          <div className="container py-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/35">
              {/* Copyright */}
              <p>
                &copy; {new Date().getFullYear()} RS Wallpaper &amp; Floor. All rights reserved.
              </p>

              {/* Legal links */}
              <div className="flex items-center gap-1">
                {FOOTER_LINKS.legal.map((link, i) => (
                  <span key={link.href} className="flex items-center gap-1">
                    {i > 0 && <span className="text-white/15">|</span>}
                    <Link
                      href={link.href}
                      className="hover:text-white/60 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </span>
                ))}
              </div>

              {/* Developer credit */}
              <p className="text-white/25">
                Developed by Hasinur Rahman
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
