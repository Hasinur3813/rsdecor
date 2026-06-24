"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X, MapPin, Star } from "lucide-react";

export default function WishlistGrid({
  products,
  selectedIds,
  setSelectedIds,
  onRemove,
}) {
  const [removingId, setRemovingId] = useState(null);

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleRemove = (id) => {
    setRemovingId(id);
    setTimeout(() => {
      onRemove(id);
      setRemovingId(null);
    }, 300);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-3 h-3 ${
            i < Math.floor(rating)
              ? "text-amber-400 fill-amber-400"
              : "text-gray-200 fill-gray-200"
          }`}
        />,
      );
    }
    return stars;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((p) => {
        const isSelected = selectedIds.includes(p.id);
        const isRemoving = removingId === p.id;

        return (
          <div
            key={p.id}
            className={`bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md ${
              isSelected ? "ring-2 ring-[#C8956C] ring-offset-2" : ""
            } ${isRemoving ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
          >
            {/* Image area */}
            <div className="relative aspect-4/3">
              <div
                className="absolute inset-0"
                style={{
                  background: `url(${p.image})`,
                  backgroundSize: `cover`,
                  backgroundPosition: `center center`,
                  backgroundPosition: `no-repeat`,
                }}
              />

              {/* Checkbox */}
              <button
                onClick={() => toggleSelection(p.id)}
                className="absolute top-3 left-3 w-6 h-6 rounded-sm shadow-sm flex items-center justify-center z-10 transition-colors"
                style={{
                  backgroundColor: isSelected
                    ? "#C8956C"
                    : "rgba(255,255,255,0.8)",
                  border: isSelected
                    ? "2px solid #C8956C"
                    : "2px solid #d1d5db",
                }}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
              </button>

              {/* Remove button */}
              <button
                onClick={() => handleRemove(p.id)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center z-10 hover:bg-red-50 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600 hover:text-red-600" />
              </button>

              {/* Category pill */}
              <div className="absolute bottom-3 left-3">
                <span className="bg-[#4A7C6F] text-white text-xs px-2 py-1 rounded-full font-medium">
                  {p.category}
                </span>
              </div>

              {/* New badge */}
              {p.isNew && (
                <div className="absolute bottom-3 right-3">
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    New
                  </span>
                </div>
              )}
            </div>

            {/* Content area */}
            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-semibold text-[#2C2C2C] line-clamp-2 text-sm">
                {p.name}
              </h3>

              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {p.roomType}
                </p>

                <span className="inline-flex w-max bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                  {p.finish}
                </span>
              </div>

              <div className="flex items-center justify-between mt-1">
                <span className="text-[#C8956C] font-bold text-lg">
                  ৳{p.pricePerSqft}/sqft
                </span>
                {/* <span className="bg-[#4A7C6F]/10 text-[#4A7C6F] text-xs px-2 py-0.5 rounded-full font-medium">
                  {p.warranty === "10yr" ? "10yr" : "Lifetime"}
                </span> */}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <a
                  href={`https://wa.me/+8801976600300?text=${encodeURIComponent(
                    `Hi! I'd like to get a quote for ${p.name} (${p.category}).`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#C8956C] text-white text-sm py-2 rounded-xl font-medium text-center hover:opacity-90 transition-all"
                >
                  Get Quote
                </a>

                <Link
                  href={`/products/${p.slug}`}
                  className="bg-gray-100 text-gray-700 text-sm py-2 rounded-xl font-medium text-center hover:bg-gray-200 transition-all"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
