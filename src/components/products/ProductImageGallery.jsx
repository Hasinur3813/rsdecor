"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";

// Gallery images using available public images
const getGalleryImages = (product) => {
  const baseImages = [
    product.image,
    "/slider-1.jpg",
    "/slider-2.jpg",
    "/slider-3.jpg",
  ];

  // Add category-specific images if available
  const categoryImages = {
    "3D Wallpaper": ["/categories/wallpaper.jpg"],
    "3D Ceiling Paper": ["/categories/celingpaper.jpg"],
    "3D Epoxy Floor": ["/categories/floor.jpg"],
  };

  const categoryImg = categoryImages[product.category];
  if (categoryImg && !baseImages.includes(categoryImg[0])) {
    baseImages.push(categoryImg[0]);
  }

  // Return unique images
  return [...new Set(baseImages)];
};

export default function ProductImageGallery({ product }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const galleryImages = getGalleryImages(product);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightboxOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft")
        setSelectedIndex((prev) =>
          prev === 0 ? galleryImages.length - 1 : prev - 1,
        );
      if (e.key === "ArrowRight")
        setSelectedIndex((prev) =>
          prev === galleryImages.length - 1 ? 0 : prev + 1,
        );
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, galleryImages.length]);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Thumbnails - left side on md+ */}
        <div className="flex md:flex-col gap-2 md:gap-3 overflow-x-auto md:overflow-x-visible order-2 md:order-1 scrollbar-hide">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`w-16 h-16 sm:w-20 sm:h-20 md:w-16 md:h-16 lg:w-20 lg:h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all relative ${
                selectedIndex === index
                  ? "border-primary shadow-md scale-105"
                  : "border-transparent hover:border-primary/50 hover:scale-105"
              }`}
            >
              <Image
                src={image}
                alt={`${product.name} ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1 order-1 md:order-2">
          <div className="aspect-4/3 w-full max-w-125 mx-auto md:max-w-none rounded-2xl bg-light-muted relative overflow-hidden shadow-lg cursor-zoom-in group">
            <Image
              src={galleryImages[selectedIndex]}
              alt={product.imageAlt || product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              {product.isNew && (
                <span className="px-3 py-1 rounded-full bg-secondary text-white text-xs font-semibold shadow-sm">
                  New
                </span>
              )}
              {product.isBestSeller && (
                <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold shadow-sm">
                  Best Seller
                </span>
              )}
            </div>
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute bottom-4 right-4 z-10 p-3 rounded-full bg-white/95 text-dark hover:bg-white hover:scale-110 transition-all shadow-lg opacity-0 group-hover:opacity-100"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox using Portal */}
      {lightboxOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-9999 bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(false);
              }}
              className="absolute top-4 right-4 text-white hover:text-primary hover:bg-white/10 transition-all p-3 rounded-full"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) =>
                  prev === 0 ? galleryImages.length - 1 : prev - 1,
                );
              }}
              className="absolute left-4 text-white hover:text-primary hover:bg-white/10 transition-all p-3 rounded-full"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) =>
                  prev === galleryImages.length - 1 ? 0 : prev + 1,
                );
              }}
              className="absolute right-4 text-white hover:text-primary hover:bg-white/10 transition-all p-3 rounded-full"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
            <div className="relative w-full max-w-6xl aspect-[4/3] rounded-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <Image
                src={galleryImages[selectedIndex]}
                alt={product.imageAlt || product.name}
                fill
                sizes="(max-width: 1536px) 100vw, 1536px"
                className="object-contain"
              />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium">
              {selectedIndex + 1} / {galleryImages.length}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
