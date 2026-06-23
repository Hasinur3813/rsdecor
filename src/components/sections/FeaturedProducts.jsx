"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ProductCard from "@/components/ui/ProductCard";

import "swiper/css";
import "swiper/css/navigation";

const PRODUCT_IMAGES = [
  "/slider-1.jpg",
  "/slider-2.jpg",
  "/slider-3.jpg",
  "/wallpaper1.jpg",
  "/categories/wallpaper.jpg",
  "/categories/celingpaper.jpg",
  "/categories/floor.jpg",
  "/categories/bedroom.jpg",
  "/categories/kids.jpg",
  "/categories/office.jpg",
];

function getProductImage(id) {
  return PRODUCT_IMAGES[(id * 7 + 3) % PRODUCT_IMAGES.length];
}

/* ─────────────────────────────────────────
   Tab / Product data
   ───────────────────────────────────────── */
const TABS = [
  { key: "best", label: "Best Sellers" },
  { key: "new", label: "New Arrivals" },
  { key: "epoxy", label: "Epoxy Floors" },
];

const PRODUCTS = {
  best: [
    {
      id: 1,
      name: "Royal Marble 3D Wallpaper",
      category: "3D Wallpapers",
      price: "৳140/sqft",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Golden Damask Ceiling Paper",
      category: "Ceiling Papers",
      price: "৳140/sqft",
      badge: "Popular",
    },
    {
      id: 3,
      name: "Brick Stone 3D Panel",
      category: "3D Wallpapers",
      price: "৳140/sqft",
      badge: null,
    },
    {
      id: 4,
      name: "White Marble Finish",
      category: "3D Wallpapers",
      price: "৳140/sqft",
      badge: "Trending",
    },
    {
      id: 5,
      name: "Nature Leaf Pattern",
      category: "3D Wallpapers",
      price: "৳140/sqft",
      badge: null,
    },
    {
      id: 6,
      name: "Geometric Modern Art",
      category: "3D Wallpapers",
      price: "৳140/sqft",
      badge: null,
    },
    {
      id: 7,
      name: "Rose Gold Texture",
      category: "Ceiling Papers",
      price: "৳140/sqft",
      badge: "New",
    },
    {
      id: 8,
      name: "Classic Wooden Panel",
      category: "3D Wallpapers",
      price: "৳140/sqft",
      badge: null,
    },
  ],
  new: [
    {
      id: 9,
      name: "Tropical Paradise Wall",
      category: "3D Wallpapers",
      price: "৳140/sqft",
      badge: "New",
    },
    {
      id: 10,
      name: "Aurora Ceiling Design",
      category: "Ceiling Papers",
      price: "৳140/sqft",
      badge: "New",
    },
    {
      id: 11,
      name: "Luxury Silk Texture",
      category: "3D Wallpapers",
      price: "৳140/sqft",
      badge: "New",
    },
    {
      id: 12,
      name: "Ocean Breeze Pattern",
      category: "3D Wallpapers",
      price: "৳140/sqft",
      badge: "New",
    },
    {
      id: 13,
      name: "Bamboo Zen Design",
      category: "3D Wallpapers",
      price: "৳140/sqft",
      badge: null,
    },
    {
      id: 14,
      name: "Crystal Star Ceiling",
      category: "Ceiling Papers",
      price: "৳140/sqft",
      badge: "New",
    },
    {
      id: 15,
      name: "Vintage Floral",
      category: "3D Wallpapers",
      price: "৳140/sqft",
      badge: null,
    },
    {
      id: 16,
      name: "Modern Geometric Plus",
      category: "3D Wallpapers",
      price: "৳140/sqft",
      badge: "New",
    },
  ],
  epoxy: [
    {
      id: 17,
      name: "Ocean Wave Epoxy Floor",
      category: "Epoxy Floors",
      price: "৳450/sqft",
      badge: "Popular",
    },
    {
      id: 18,
      name: "Galaxy Metallic Epoxy",
      category: "Epoxy Floors",
      price: "৳450/sqft",
      badge: "Premium",
    },
    {
      id: 19,
      name: "Marble Vein Epoxy",
      category: "Epoxy Floors",
      price: "৳450/sqft",
      badge: null,
    },
    {
      id: 20,
      name: "Lava Flow Metallic",
      category: "Epoxy Floors",
      price: "৳450/sqft",
      badge: "Hot",
    },
    {
      id: 21,
      name: "Pearl White Epoxy",
      category: "Epoxy Floors",
      price: "৳450/sqft",
      badge: null,
    },
    {
      id: 22,
      name: "Golden Sand Epoxy",
      category: "Epoxy Floors",
      price: "৳450/sqft",
      badge: "New",
    },
    {
      id: 23,
      name: "Jade Green Shimmer",
      category: "Epoxy Floors",
      price: "৳450/sqft",
      badge: null,
    },
    {
      id: 24,
      name: "Silver Storm Metallic",
      category: "Epoxy Floors",
      price: "৳450/sqft",
      badge: "Premium",
    },
  ],
};

/* ─────────────────────────────────────────
   FeaturedProducts Section
   ───────────────────────────────────────── */
export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("best");

  return (
    <section id="featured-products" className="py-16 md:py-24 bg-light">
      <Container>
        <SectionTitle
          subtitle="Curated for You"
          title="Featured Products"
          description="Handpicked designs loved by thousands of happy clients across Bangladesh."
        />

        {/* Tab switcher */}
        <div className="flex items-center justify-center gap-1 mb-10 p-1 bg-white rounded-xl shadow-sm w-fit mx-auto">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "px-4 md:px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200",
                activeTab === tab.key
                  ? "bg-primary text-white shadow-sm"
                  : "text-dark-muted hover:text-dark hover:bg-light-muted",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Swiper */}
        <div className="relative overflow-hidden px-1 -mx-1">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              prevEl: ".fp-prev",
              nextEl: ".fp-next",
            }}
            breakpoints={{
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {PRODUCTS[activeTab].map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard
                  {...product}
                  image={getProductImage(product.id)}
                  alt={product.name}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom navigation */}
          <button
            className="fp-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-light-muted flex items-center justify-center text-dark-muted hover:text-primary hover:border-primary/30 transition-all duration-200"
            aria-label="Previous products"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            className="fp-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-light-muted flex items-center justify-center text-dark-muted hover:text-primary hover:border-primary/30 transition-all duration-200"
            aria-label="Next products"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </Container>
    </section>
  );
}
