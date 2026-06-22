"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  Layers,
  Search,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Phone,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, MEGA_MENU_DATA, SOCIAL_LINKS } from "@/lib/constants";

/* ─────────────────────────────────────────
   Inline SVG icons for socials (Lucide doesn't
   ship brand icons, so we use compact SVGs)
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

/* ─────────────────────────────────────────
   MEGA DROPDOWN (Desktop)
   ───────────────────────────────────────── */
const MegaDropdown = ({ isVisible }) => (
  <div
    className={cn(
      "absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-white rounded-xl shadow-xl border border-light-muted",
      "transition-all duration-200 ease-out origin-top",
      isVisible
        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
        : "opacity-0 scale-[0.97] -translate-y-2 pointer-events-none"
    )}
  >
    <div className="grid grid-cols-3 gap-0 p-6">
      {/* Column 1 — Wallpapers */}
      <div className="pr-6 border-r border-light-muted">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4 font-body">
          {MEGA_MENU_DATA.wallpapers.title}
        </h4>
        <ul className="space-y-2.5">
          {MEGA_MENU_DATA.wallpapers.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex items-center gap-2 text-sm text-dark-muted hover:text-primary transition-colors duration-200"
              >
                <span className="w-1 h-1 rounded-full bg-accent group-hover:bg-primary transition-colors duration-200" />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Column 2 — Flooring */}
      <div className="px-6 border-r border-light-muted">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4 font-body">
          {MEGA_MENU_DATA.flooring.title}
        </h4>
        <ul className="space-y-2.5">
          {MEGA_MENU_DATA.flooring.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex items-center gap-2 text-sm text-dark-muted hover:text-primary transition-colors duration-200"
              >
                <span className="w-1 h-1 rounded-full bg-accent group-hover:bg-primary transition-colors duration-200" />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Column 3 — Featured card */}
      <div className="pl-6">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4 font-body">
          {MEGA_MENU_DATA.featured.title}
        </h4>
        <Link
          href={MEGA_MENU_DATA.featured.href}
          className="group block rounded-lg overflow-hidden bg-light hover:shadow-md transition-shadow duration-200"
        >
          {/* Placeholder image area */}
          <div className="relative h-28 bg-gradient-to-br from-primary/20 via-accent/30 to-secondary/20 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary/60 group-hover:text-primary transition-colors duration-200" />
            <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-primary text-white rounded-full">
              {MEGA_MENU_DATA.featured.label}
            </span>
          </div>
          <div className="p-3">
            <p className="text-xs text-dark-muted leading-relaxed">
              {MEGA_MENU_DATA.featured.description}
            </p>
            <span className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-primary group-hover:gap-2 transition-all duration-200">
              Explore <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────
   MOBILE DRAWER
   ───────────────────────────────────────── */
const MobileDrawer = ({ isOpen, onClose }) => {
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleSubMenu = (key) => {
    setExpandedMenu((prev) => (prev === key ? null : key));
  };

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-dark/50 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-[300px] max-w-[85vw] bg-white z-50 flex flex-col",
          "transition-transform duration-300 ease-out shadow-xl",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between p-4 border-b border-light-muted">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-primary" />
            <span className="text-lg font-heading font-bold text-dark">
              RS Wallpaper
            </span>
          </Link>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-light-muted transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-dark-muted" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                {link.hasMegaMenu ? (
                  /* Expandable Products link */
                  <div>
                    <button
                      onClick={() => toggleSubMenu("products")}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        expandedMenu === "products"
                          ? "bg-primary/10 text-primary"
                          : "text-dark hover:bg-light-muted"
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          expandedMenu === "products" && "rotate-180"
                        )}
                      />
                    </button>

                    {/* Accordion content */}
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300 ease-out",
                        expandedMenu === "products"
                          ? "max-h-[500px] opacity-100"
                          : "max-h-0 opacity-0"
                      )}
                    >
                      <div className="pl-4 py-2 space-y-3">
                        {/* Wallpapers section */}
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/70 px-3 mb-1.5">
                            {MEGA_MENU_DATA.wallpapers.title}
                          </p>
                          <ul className="space-y-0.5">
                            {MEGA_MENU_DATA.wallpapers.links.map((sub) => (
                              <li key={sub.href}>
                                <Link
                                  href={sub.href}
                                  onClick={onClose}
                                  className="block px-3 py-1.5 text-sm text-dark-muted hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Flooring section */}
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/70 px-3 mb-1.5">
                            {MEGA_MENU_DATA.flooring.title}
                          </p>
                          <ul className="space-y-0.5">
                            {MEGA_MENU_DATA.flooring.links.map((sub) => (
                              <li key={sub.href}>
                                <Link
                                  href={sub.href}
                                  onClick={onClose}
                                  className="block px-3 py-1.5 text-sm text-dark-muted hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-dark hover:bg-light-muted hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* CTA in drawer */}
          <div className="px-6 mt-6">
            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Phone className="w-4 h-4" />
              Get Free Quote
            </Link>
          </div>
        </nav>

        {/* Social icons at bottom */}
        <div className="border-t border-light-muted p-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-dark-muted mb-3">
            Follow Us
          </p>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-light hover:bg-primary/10 text-dark-muted hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <SocialIcon platform={social.platform} className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

/* ─────────────────────────────────────────
   NAVBAR (Main export)
   ───────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const megaMenuTimeout = useRef(null);

  // ── Scroll listener ──
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Mega menu hover with delay (prevents flicker) ──
  const openMegaMenu = useCallback(() => {
    clearTimeout(megaMenuTimeout.current);
    setMegaMenuOpen(true);
  }, []);

  const closeMegaMenu = useCallback(() => {
    megaMenuTimeout.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 150);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ── ANNOUNCEMENT BAR ── */}
      <div className="bg-primary text-white">
        <div className="container flex items-center justify-between h-9 text-xs">
          <p className="flex items-center gap-1.5 truncate">
            <span className="hidden sm:inline">🇧🇩</span>
            <span className="hidden sm:inline">Serving all over Bangladesh</span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span>WhatsApp:</span>
              <a
                href="https://wa.me/8801772132818"
                className="font-semibold hover:underline"
              >
                01772-132818
              </a>
            </span>
          </p>
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-white/80 hover:text-white transition-colors"
                aria-label={social.label}
              >
                <SocialIcon platform={social.platform} className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN NAVBAR ── */}
      <nav
        className={cn(
          "bg-white/95 backdrop-blur-md border-b transition-all duration-300",
          scrolled
            ? "py-2 border-light-muted shadow-md"
            : "py-3.5 border-transparent shadow-none"
        )}
      >
        <div className="container flex items-center justify-between gap-4">
          {/* Left: hamburger (mobile) + Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-1.5 -ml-1.5 rounded-lg hover:bg-light-muted transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-dark" />
            </button>

            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Layers className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-heading font-bold text-dark">
                RS <span className="text-primary">Wallpaper</span>
              </span>
            </Link>
          </div>

          {/* Center: Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li
                key={link.href}
                className="relative"
                {...(link.hasMegaMenu
                  ? {
                      onMouseEnter: openMegaMenu,
                      onMouseLeave: closeMegaMenu,
                    }
                  : {})}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "relative flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                    "text-dark-muted hover:text-primary hover:bg-primary/5",
                    "after:absolute after:bottom-0.5 after:left-3 after:right-3 after:h-[2px] after:bg-primary",
                    "after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left"
                  )}
                >
                  {link.label}
                  {link.hasMegaMenu && (
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 transition-transform duration-200",
                        megaMenuOpen && "rotate-180"
                      )}
                    />
                  )}
                </Link>

                {/* Mega dropdown (only for Products) */}
                {link.hasMegaMenu && (
                  <MegaDropdown isVisible={megaMenuOpen} />
                )}
              </li>
            ))}
          </ul>

          {/* Right: icons + CTA */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              className="p-2 rounded-lg text-dark-muted hover:text-primary hover:bg-primary/5 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              className="hidden sm:flex p-2 rounded-lg text-dark-muted hover:text-primary hover:bg-primary/5 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </button>

            <button
              className="relative p-2 rounded-lg text-dark-muted hover:text-primary hover:bg-primary/5 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {/* Item badge */}
              <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-primary rounded-full ring-2 ring-white">
                0
              </span>
            </button>

            {/* CTA Button — desktop */}
            <Link
              href="/contact"
              className="hidden md:flex items-center gap-1.5 ml-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark active:scale-[0.97] transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Phone className="w-3.5 h-3.5" />
              Get Free Quote
            </Link>
          </div>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <MobileDrawer
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}
