"use client";

import { Calculator, MessageCircle, Phone, Shield } from "lucide-react";

export default function WishlistSummary({
  products,
  selectedIds,
  onOpenCalculator,
}) {
  const countWallpapers = products.filter(
    (p) => p.category === "3D Wallpaper",
  ).length;
  const countCeilings = products.filter(
    (p) => p.category === "3D Ceiling Paper",
  ).length;
  const countEpoxy = products.filter(
    (p) => p.category === "3D Epoxy Floor",
  ).length;

  const minCost = products.reduce((sum, p) => sum + p.pricePerSqft * 100, 0);
  const maxCost = products.reduce((sum, p) => sum + p.pricePerSqft * 200, 0);

  const allProductNames = products.map((p) => p.name).join(", ");

  return (
    <div className="sticky top-24 flex flex-col gap-4">
      {/* Summary Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-semibold text-[#2C2C2C] mb-3">Wishlist Summary</h3>

        <div className="space-y-2 mb-3">
          <div className="flex justify-between border-b border-gray-100 py-2 text-sm">
            <span className="text-gray-600">Total Saved Designs</span>
            <span className="font-medium text-[#2C2C2C]">
              {products.length}
            </span>
          </div>

          <div className="flex justify-between border-b border-gray-100 py-2 text-sm">
            <span className="text-gray-600">3D Wallpapers</span>
            <span className="font-medium text-[#2C2C2C]">
              {countWallpapers}
            </span>
          </div>

          <div className="flex justify-between border-b border-gray-100 py-2 text-sm">
            <span className="text-gray-600">Ceiling Papers</span>
            <span className="font-medium text-[#2C2C2C]">{countCeilings}</span>
          </div>

          <div className="flex justify-between border-b border-gray-100 py-2 text-sm">
            <span className="text-gray-600">Epoxy Floors</span>
            <span className="font-medium text-[#2C2C2C]">{countEpoxy}</span>
          </div>

          <div className="flex justify-between py-2 text-sm">
            <span className="text-gray-600">Selected</span>
            <span
              className={`font-medium ${
                selectedIds.length > 0 ? "text-[#C8956C]" : "text-gray-400"
              }`}
            >
              {selectedIds.length}
            </span>
          </div>
        </div>

        <div className="bg-[#FAF7F2] rounded-xl p-3 mt-2">
          <p className="text-xs text-gray-500 mb-1">Est. Cost Range</p>
          <div className="flex items-baseline gap-2">
            <span className="text-[#C8956C] font-bold text-lg">
              ৳{minCost.toLocaleString("en-IN")}
            </span>
            <span className="text-gray-400 text-xs">to</span>
            <span className="text-[#C8956C] font-bold text-lg">
              ৳{maxCost.toLocaleString("en-IN")}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">(per 100–200 sqft each)</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-semibold text-[#2C2C2C] mb-4">Quick Actions</h3>

        <div className="flex flex-col gap-3">
          <button
            onClick={onOpenCalculator}
            className="flex items-center justify-center gap-2 bg-[#C8956C] text-white rounded-xl py-3 font-medium w-full hover:opacity-90 transition-all"
          >
            <Calculator className="w-4 h-4" />
            Estimate Total Cost
          </button>

          <a
            href={`https://wa.me/+8801976600300?text=${encodeURIComponent(
              `Hi! I'd like a quote for these wishlist items: ${allProductNames}`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-xl py-3 font-medium w-full hover:opacity-90 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp All Designs
          </a>

          <a
            href="tel:+8801976600300"
            className="flex items-center justify-center gap-2 border border-[#4A7C6F] text-[#4A7C6F] rounded-xl py-3 font-medium w-full hover:bg-[#4A7C6F]/10 transition-all"
          >
            <Phone className="w-4 h-4" />
            Call for Bulk Quote
          </a>
        </div>
      </div>

      {/* Trust Note */}
      <div className="bg-[#4A7C6F]/10 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-[#4A7C6F] shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-[#2C2C2C] font-medium">
              Site Visit Included
            </p>
            <p className="text-xs text-gray-500 mt-1">
              We visit your home before any commitment. No travel cost in Dhaka
              city.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
