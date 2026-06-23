"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ProductCard from "@/components/ui/ProductCard";
import {
  getBestSellers,
  getNewArrivals,
  getEpoxyFloors,
} from "@/lib/productsApi";

import "swiper/css";
import "swiper/css/navigation";

const TABS = [
  { key: "best", label: "Best Sellers" },
  { key: "new", label: "New Arrivals" },
  { key: "epoxy", label: "Epoxy Floors" },
];

function toCardProps(product) {
  let badge = null;
  if (product.isNew) badge = "New";
  else if (product.isBestSeller) badge = "Best Seller";
  else if (product.warranty === "Lifetime") badge = "Premium";

  return {
    id: product.id,
    name: product.name,
    category: product.category,
    price: `৳${product.pricePerSqft}/sqft`,
    badge,
    image: product.image,
    alt: product.imageAlt,
  };
}

const PRODUCT_TABS = {
  best: getBestSellers(8).map(toCardProps),
  new: getNewArrivals(8).map(toCardProps),
  epoxy: getEpoxyFloors(8).map(toCardProps),
};

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
            {PRODUCT_TABS[activeTab].map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard {...product} />
              </SwiperSlide>
            ))}
          </Swiper>

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
