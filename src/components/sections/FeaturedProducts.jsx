"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Heart, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Badge from "@/components/ui/Badge";

import "swiper/css";
import "swiper/css/navigation";

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
    { id: 1, name: "Royal Marble 3D Wallpaper", category: "3D Wallpapers", price: "৳140/sqft", badge: "Best Seller", gradient: "from-[#C8956C] to-[#D4B896]" },
    { id: 2, name: "Golden Damask Ceiling Paper", category: "Ceiling Papers", price: "৳140/sqft", badge: "Popular", gradient: "from-[#4A7C6F] to-[#7FB3A3]" },
    { id: 3, name: "Brick Stone 3D Panel", category: "3D Wallpapers", price: "৳140/sqft", badge: null, gradient: "from-[#B07A54] to-[#D4A87E]" },
    { id: 4, name: "White Marble Finish", category: "3D Wallpapers", price: "৳140/sqft", badge: "Trending", gradient: "from-[#8B7B9E] to-[#C4B8D2]" },
    { id: 5, name: "Nature Leaf Pattern", category: "3D Wallpapers", price: "৳140/sqft", badge: null, gradient: "from-[#5E9486] to-[#A3D4C5]" },
    { id: 6, name: "Geometric Modern Art", category: "3D Wallpapers", price: "৳140/sqft", badge: null, gradient: "from-[#3D3D3D] to-[#7A7A7A]" },
    { id: 7, name: "Rose Gold Texture", category: "Ceiling Papers", price: "৳140/sqft", badge: "New", gradient: "from-[#E8A87C] to-[#F5DCC8]" },
    { id: 8, name: "Classic Wooden Panel", category: "3D Wallpapers", price: "৳140/sqft", badge: null, gradient: "from-[#8B6914] to-[#C9A84C]" },
  ],
  new: [
    { id: 9, name: "Tropical Paradise Wall", category: "3D Wallpapers", price: "৳140/sqft", badge: "New", gradient: "from-[#2D8B57] to-[#5EBE82]" },
    { id: 10, name: "Aurora Ceiling Design", category: "Ceiling Papers", price: "৳140/sqft", badge: "New", gradient: "from-[#4A3B7C] to-[#8B73C0]" },
    { id: 11, name: "Luxury Silk Texture", category: "3D Wallpapers", price: "৳140/sqft", badge: "New", gradient: "from-[#C8956C] to-[#E0CBAE]" },
    { id: 12, name: "Ocean Breeze Pattern", category: "3D Wallpapers", price: "৳140/sqft", badge: "New", gradient: "from-[#2B6CB0] to-[#63B3ED]" },
    { id: 13, name: "Bamboo Zen Design", category: "3D Wallpapers", price: "৳140/sqft", badge: null, gradient: "from-[#68754B] to-[#A3B369]" },
    { id: 14, name: "Crystal Star Ceiling", category: "Ceiling Papers", price: "৳140/sqft", badge: "New", gradient: "from-[#4A7C6F] to-[#82C9B5]" },
    { id: 15, name: "Vintage Floral", category: "3D Wallpapers", price: "৳140/sqft", badge: null, gradient: "from-[#C87C8E] to-[#F0B4C4]" },
    { id: 16, name: "Modern Geometric Plus", category: "3D Wallpapers", price: "৳140/sqft", badge: "New", gradient: "from-[#E8A87C] to-[#F5C8A0]" },
  ],
  epoxy: [
    { id: 17, name: "Ocean Wave Epoxy Floor", category: "Epoxy Floors", price: "৳450/sqft", badge: "Popular", gradient: "from-[#1E6BB8] to-[#5BA4E0]" },
    { id: 18, name: "Galaxy Metallic Epoxy", category: "Epoxy Floors", price: "৳450/sqft", badge: "Premium", gradient: "from-[#1C1C2E] to-[#4A4A6A]" },
    { id: 19, name: "Marble Vein Epoxy", category: "Epoxy Floors", price: "৳450/sqft", badge: null, gradient: "from-[#8B8B8B] to-[#D4D4D4]" },
    { id: 20, name: "Lava Flow Metallic", category: "Epoxy Floors", price: "৳450/sqft", badge: "Hot", gradient: "from-[#B03A2E] to-[#E74C3C]" },
    { id: 21, name: "Pearl White Epoxy", category: "Epoxy Floors", price: "৳450/sqft", badge: null, gradient: "from-[#D4CFC9] to-[#F5F0EB]" },
    { id: 22, name: "Golden Sand Epoxy", category: "Epoxy Floors", price: "৳450/sqft", badge: "New", gradient: "from-[#C8956C] to-[#F0D8B4]" },
    { id: 23, name: "Jade Green Shimmer", category: "Epoxy Floors", price: "৳450/sqft", badge: null, gradient: "from-[#2E7D32] to-[#66BB6A]" },
    { id: 24, name: "Silver Storm Metallic", category: "Epoxy Floors", price: "৳450/sqft", badge: "Premium", gradient: "from-[#455A64] to-[#90A4AE]" },
  ],
};

/* ─────────────────────────────────────────
   Product Card
   ───────────────────────────────────────── */
const ProductCard = ({ name, category, price, badge, gradient }) => (
  <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-light-muted/50">
    {/* Image area */}
    <div className={`relative h-52 md:h-60 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
      {/* Badge */}
      {badge && (
        <Badge
          variant={badge === "Premium" ? "dark" : badge === "New" ? "secondary" : "primary"}
          size="xs"
          className="absolute top-3 left-3 z-10"
        >
          {badge}
        </Badge>
      )}

      {/* Wishlist button */}
      <button
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm text-dark-muted hover:text-red-500 hover:bg-white transition-all duration-200"
        aria-label="Add to wishlist"
      >
        <Heart className="w-4 h-4" />
      </button>

      {/* Decorative element */}
      <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm rotate-12 group-hover:rotate-0 transition-transform duration-500" />
    </div>

    {/* Info */}
    <div className="p-4">
      <span className="text-[10px] uppercase tracking-widest text-primary font-semibold">
        {category}
      </span>
      <h3 className="text-sm font-heading font-bold text-dark mt-1 line-clamp-1 group-hover:text-primary transition-colors">
        {name}
      </h3>
      <div className="flex items-center justify-between mt-3">
        <p className="text-sm font-bold text-dark">
          From <span className="text-primary">{price}</span>
        </p>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-dark transition-colors">
          <Eye className="w-3.5 h-3.5" />
          View Details
        </button>
      </div>
    </div>
  </div>
);

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
                  : "text-dark-muted hover:text-dark hover:bg-light-muted"
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
                <ProductCard {...product} />
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
