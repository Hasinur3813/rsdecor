"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { ArrowRight, Eye, Award, Users, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

/* ─────────────────────────────────────────
   Slide data
   ───────────────────────────────────────── */
const SLIDES = [
  {
    id: 1,
    image: "/slider-1.jpg",
    alt: "Premium 3D wallpaper interior design",
    badge: "New Collection",
    heading: "Transform Your Walls Into Art",
    subtext:
      "Discover premium 3D wallpapers that add depth, texture and personality to every room in your home.",
    cta1: { label: "Explore Products", href: "/products" },
    cta2: { label: "View Portfolio", href: "/gallery" },
  },
  {
    id: 2,
    image: "/slider-2.jpg",
    alt: "Luxury 3D ceiling paper installation",
    badge: "Premium Finish",
    heading: "Luxury Ceilings, Redefined",
    subtext:
      "Elevate your interiors with breathtaking 3D ceiling papers. Sophistication meets craftsmanship.",
    cta1: { label: "Explore Products", href: "/products" },
    cta2: { label: "View Portfolio", href: "/gallery" },
  },
  {
    id: 3,
    image: "/slider-3.jpg",
    alt: "Stunning 3D epoxy floor finish",
    badge: "Lifetime Guarantee",
    heading: "Stunning Epoxy Floors",
    subtext:
      "Durable, glossy and mesmerizing — our 3D epoxy floors turn ordinary spaces into extraordinary experiences.",
    cta1: { label: "Explore Products", href: "/products" },
    cta2: { label: "View Portfolio", href: "/gallery" },
  },
];

/* ─────────────────────────────────────────
   Floating Stats Bar
   ───────────────────────────────────────── */
const STATS = [
  { icon: Award, value: "7+", label: "Years" },
  { icon: Users, value: "4000+", label: "Clients" },
  { icon: CheckCircle, value: "5000+", label: "Projects" },
];

const StatsBar = () => (
  <div className="absolute bottom-6 left-0 right-0 z-20">
    <div className="container">
      <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-xl border border-white/15 px-4 py-2.5 md:px-6 md:py-3 gap-4 md:gap-6">
        {STATS.map((stat, i) => (
          <div key={stat.label} className="flex items-center gap-3">
            {i > 0 && (
              <span className="w-px h-6 bg-white/20 hidden sm:block" />
            )}
            <div className="flex items-center gap-2 text-white">
              <stat.icon className="w-4 h-4 text-primary-light opacity-80" />
              <span className="text-sm md:text-base font-bold">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm text-white/60 hidden sm:inline">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────
   Hero Section
   ───────────────────────────────────────── */
export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="hero" className="relative w-full h-[85vh] min-h-[600px] max-h-[900px] overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={800}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletClass: "hero-bullet",
          bulletActiveClass: "hero-bullet-active",
          el: ".hero-pagination",
        }}
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full"
      >
        {SLIDES.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative">
            {/* Background image */}
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center"
            />

            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />

            {/* Slide content */}
            <div className="relative z-10 container h-full flex items-center">
              <div className="max-w-xl lg:max-w-2xl">
                <div
                  className={cn(
                    "transition-all duration-700",
                    activeIndex === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  )}
                >
                  {/* Badge */}
                  <Badge
                    variant="accent"
                    size="sm"
                    className="mb-5 animate-[fadeSlideUp_0.6s_ease_0.2s_both]"
                  >
                    {slide.badge}
                  </Badge>

                  {/* Heading */}
                  <h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.1] mb-5"
                    style={{
                      animationDelay: "0.35s",
                    }}
                  >
                    {slide.heading}
                  </h1>

                  {/* Subtext */}
                  <p className="text-base md:text-lg text-white/75 leading-relaxed max-w-lg mb-8">
                    {slide.subtext}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <Button
                      variant="filled"
                      size="lg"
                      href={slide.cta1.href}
                    >
                      {slide.cta1.label}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      href={slide.cta2.href}
                    >
                      <Eye className="w-4 h-4" />
                      {slide.cta2.label}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom pagination dots */}
      <div className="hero-pagination absolute bottom-20 left-0 right-0 z-20 container flex justify-start gap-2" />

      {/* Stats bar */}
      <StatsBar />

      {/* Custom bullet styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .hero-bullet {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 9999px;
            background: rgba(255, 255, 255, 0.35);
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .hero-bullet-active {
            background: var(--color-primary) !important;
            width: 32px;
          }
          @keyframes fadeSlideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `,
      }} />
    </section>
  );
}
