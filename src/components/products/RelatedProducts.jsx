"use client";

import Link from "next/link";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function RelatedProducts({ products }) {
  const swiperRef = useRef(null);
  if (!products.length) return null;
  const category = products[0].category;

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-3xl font-heading font-bold text-dark mb-2">
            You May Also Like
          </h2>
          <p className="text-dark-muted text-sm sm:text-base">
            More {category} designs
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/products?category=${encodeURIComponent(category)}`}
            className="px-5 py-2.5 rounded-xl border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all text-center"
          >
            View All {category}
          </Link>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-xl border border-light-muted flex items-center justify-center text-dark-muted hover:bg-primary hover:border-primary hover:text-white transition-all"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-xl border border-light-muted flex items-center justify-center text-dark-muted hover:bg-primary hover:border-primary hover:text-white transition-all"
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} viewMode="grid" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
