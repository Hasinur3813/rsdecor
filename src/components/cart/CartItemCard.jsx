"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Pencil, ExternalLink, AlertTriangle, Shield } from "lucide-react";

export default function CartItemCard({ item, onRemove, onEdit }) {
  const [isRemoving, setIsRemoving] = useState(false);
  const isEpoxy = item.category === "3D Epoxy Floor";
  const minOrderSize = 100;

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => onRemove(item.cartId), 300);
  };

  return (
    <div
      className={`bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 hover:border-[#C8956C]/30 transition-all ${
        isRemoving ? "opacity-0 transition-opacity duration-300" : ""
      }`}
    >
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Gradient image */}
        <div className="relative w-full sm:w-24 h-32 sm:h-24 rounded-xl shrink-0">
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
            }}
          />
          <div className="absolute bottom-2 left-2 right-2">
            <span className="text-[10px] bg-[#4A7C6F] text-white px-1.5 py-0.5 rounded">
              {item.category}
            </span>
          </div>
        </div>

        {/* Product info */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-[#2C2C2C] text-base line-clamp-1">
                {item.name}
              </h4>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="bg-[#4A7C6F]/10 text-[#4A7C6F] text-xs px-2 py-0.5 rounded-full">
                  {item.category}
                </span>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                  {item.finish}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Shield className="w-3 h-3 text-[#4A7C6F]" />
                <span className="text-xs text-[#4A7C6F]">{item.warranty}</span>
              </div>
            </div>
            <button
              onClick={handleRemove}
              className="p-2 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-500 transition-colors flex-shrink-0"
              aria-label="Remove item"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Dimensions details */}
          <div className="bg-[#FAF7F2] rounded-xl p-3 sm:p-4 mt-4">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
              Room Dimensions
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="text-center">
                <p className="font-bold text-[#2C2C2C] text-base">
                  {item.width} {item.unit}
                </p>
                <p className="text-xs text-gray-400">Width</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-[#2C2C2C] text-base">
                  {item.height} {item.unit}
                </p>
                <p className="text-xs text-gray-400">
                  {isEpoxy ? "Length" : "Height"}
                </p>
              </div>
              {!isEpoxy && (
                <div className="text-center">
                  <p className="font-bold text-[#2C2C2C] text-base">
                    {item.numWalls}
                  </p>
                  <p className="text-xs text-gray-400">Walls</p>
                </div>
              )}
              <div className="text-center">
                <p className="font-bold text-[#2C2C2C] text-base">
                  {item.area} sqft
                </p>
                <p className="text-xs text-gray-400">Total Area</p>
              </div>
            </div>

            {item.area < minOrderSize && (
              <div className="flex items-center gap-2 mt-3 text-xs text-red-500">
                <AlertTriangle className="w-3 h-3" />
                <span>Below minimum 100 sqft order</span>
              </div>
            )}
          </div>

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 pt-4 border-t border-gray-100 gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">
                ৳{item.pricePerSqft}/sqft × {item.area} sqft
              </span>
              <span className="text-xl font-bold text-[#C8956C]">
                ৳{item.totalPrice.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => onEdit(item)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1 border border-gray-200 text-gray-600 text-sm px-3 py-2 rounded-xl hover:border-[#C8956C] hover:text-[#C8956C] transition-colors"
              >
                <Pencil className="w-4 h-4" />
                Edit Dimensions
              </button>
              <Link
                href={`/products/${item.slug}`}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1 bg-gray-100 text-gray-600 text-sm px-3 py-2 rounded-xl hover:bg-[#C8956C]/10 hover:text-[#C8956C] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Product
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
