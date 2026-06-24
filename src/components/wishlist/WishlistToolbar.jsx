"use client";

import { Calculator, Share2, Trash2, X } from "lucide-react";
import { useState } from "react";

export default function WishlistToolbar({
  count,
  total,
  sortBy,
  setSortBy,
  filterCategory,
  setFilterCategory,
  selectedIds,
  setSelectedIds,
  allIds,
  onClearAll,
  onOpenShare,
  onOpenCalculator,
  onRemoveSelected,
}) {
  const [confirmClear, setConfirmClear] = useState(false);

  const isAllSelected =
    selectedIds.length > 0 && selectedIds.length === allIds.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(allIds);
    }
  };

  const categories = [
    "All",
    "3D Wallpaper",
    "3D Ceiling Paper",
    "3D Epoxy Floor",
  ];

  return (
    <div className="bg-white rounded-3xl p-4 md:p-6 mb-6 shadow-md border border-gray-100">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        {/* Info Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-2xl">
            <span className="text-sm font-semibold text-gray-800">
              {count} of {total}
            </span>
            <span className="text-xs text-gray-500">saved designs</span>
          </div>
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-[#C8956C]/10 border border-[#C8956C]/30 rounded-2xl">
              <div className="w-2 h-2 rounded-full bg-[#C8956C]"></div>
              <span className="text-sm font-semibold text-[#C8956C]">
                {selectedIds.length} selected
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <button
            onClick={toggleSelectAll}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-2xl border border-gray-200 transition-all"
          >
            {isAllSelected ? "Deselect All" : "Select All"}
          </button>

          {selectedIds.length > 0 && (
            <>
              <button
                onClick={onOpenCalculator}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#C8956C] hover:opacity-90 rounded-2xl shadow-sm transition-all"
              >
                <Calculator className="w-4.5 h-4.5" />
                <span className="hidden sm:inline">Estimate Cost</span>
                <span className="sm:hidden">Estimate</span>
              </button>

              <button
                onClick={onRemoveSelected}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-2xl border border-red-200 transition-all"
              >
                <Trash2 className="w-4.5 h-4.5" />
                <span className="hidden sm:inline">Remove Selected</span>
                <span className="sm:hidden">Remove</span>
              </button>
            </>
          )}

          <button
            onClick={onOpenShare}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#4A7C6F] bg-[#4A7C6F]/5 hover:bg-[#4A7C6F]/10 rounded-2xl border border-[#4A7C6F]/20 transition-all"
          >
            <Share2 className="w-4.5 h-4.5" />
            <span className="hidden sm:inline">Share Wishlist</span>
            <span className="sm:hidden">Share</span>
          </button>

          {/* Clear All */}
          {confirmClear ? (
            <div className="flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 rounded-2xl">
              <span className="text-xs font-semibold text-red-700">
                Confirm?
              </span>
              <button
                onClick={onClearAll}
                className="text-xs font-bold text-red-600 hover:text-red-800"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmClear(false)}
                className="text-xs font-bold text-gray-500 hover:text-gray-700"
              >
                No
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmClear(true)}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-gray-500 hover:text-gray-700 rounded-2xl hover:bg-gray-50 transition-all"
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100 mb-6"></div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-5 py-2.5 text-sm font-semibold rounded-2xl transition-all duration-200 ${
                filterCategory === cat
                  ? "bg-[#C8956C] text-white shadow-md shadow-[#C8956C]/20"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Sort by
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-200 bg-gray-50 text-gray-800 text-sm font-medium rounded-2xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#C8956C]/30 focus:border-[#C8956C]"
          >
            <option value="Date Added">Date Added</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
            <option value="Top Rated">Top Rated</option>
            <option value="Name A–Z">Name A–Z</option>
          </select>
        </div>
      </div>
    </div>
  );
}
