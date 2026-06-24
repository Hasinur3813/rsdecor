"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Portal from "@/components/layout/Portal";

export default function EditDimensionsModal({ item, onClose, onSave }) {
  const [width, setWidth] = useState(item.width.toString());
  const [height, setHeight] = useState(item.height.toString());
  const [unit, setUnit] = useState(item.unit);
  const [numWalls, setNumWalls] = useState(item.numWalls);

  const isEpoxy = item.category === "3D Epoxy Floor";
  const minOrderSize = 100;

  // Calculate dimensions in feet
  const getWidthFt = () => {
    if (unit === "ft") return parseFloat(width) || 0;
    return (parseFloat(width) || 0) / 12;
  };

  const getHeightFt = () => {
    if (unit === "ft") return parseFloat(height) || 0;
    return (parseFloat(height) || 0) / 12;
  };

  // Calculate total area
  const calculateArea = () => {
    const w = getWidthFt();
    const h = getHeightFt();
    if (isEpoxy) {
      return w * h;
    }
    return w * h * numWalls;
  };

  const newArea = calculateArea();
  const newTotalPrice = newArea * item.pricePerSqft;
  const priceDiff = newTotalPrice - item.totalPrice;

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSave = () => {
    onSave(item.cartId, {
      width: parseFloat(width),
      height: parseFloat(height),
      unit,
      numWalls: isEpoxy ? 1 : numWalls,
      area: parseFloat(newArea.toFixed(2)),
      totalPrice: parseFloat(newTotalPrice.toFixed(2)),
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Portal>
      <div
        className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4"
        onClick={handleBackdropClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-6 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-heading font-bold text-[#2C2C2C]">
              Edit Dimensions
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-500 truncate">{item.name}</p>

          {/* Body */}
          <div className="mt-6 space-y-4">
            {/* Unit toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setUnit("ft")}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  unit === "ft"
                    ? "bg-[#C8956C] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Feet (ft)
              </button>
              <button
                onClick={() => setUnit("in")}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  unit === "in"
                    ? "bg-[#C8956C] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Inches (in)
              </button>
            </div>

            {/* Dimensions inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1 font-medium">
                  Width
                </label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C8956C] focus:ring-2 focus:ring-[#C8956C]/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1 font-medium">
                  {isEpoxy ? "Length" : "Height"}
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C8956C] focus:ring-2 focus:ring-[#C8956C]/20 outline-none"
                />
              </div>
            </div>

            {/* Number of walls (only for non-epoxy) */}
            {!isEpoxy && (
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1 font-medium">
                  Number of Walls
                </label>
                <select
                  value={numWalls}
                  onChange={(e) => setNumWalls(parseInt(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C8956C] focus:ring-2 focus:ring-[#C8956C]/20 outline-none"
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Wall" : "Walls"}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Live preview */}
            <div className="bg-[#C8956C]/5 rounded-xl p-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Area:</span>
                <span className="font-semibold text-[#2C2C2C]">
                  {newArea.toFixed(2)} sqft
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-gray-600">Cost:</span>
                <span className="font-semibold text-[#C8956C]">
                  ৳{newTotalPrice.toLocaleString("en-IN")}
                </span>
              </div>

              {newArea < minOrderSize && (
                <p className="text-xs text-red-500 font-medium mb-3">
                  ⚠ Minimum order is 100 sqft
                </p>
              )}

              {priceDiff !== 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#C8956C]/20">
                  <span className="text-xs text-gray-500 line-through">
                    ৳{item.totalPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs font-semibold text-[#C8956C]">
                    ৳{newTotalPrice.toLocaleString("en-IN")}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      priceDiff > 0 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {priceDiff > 0 ? "+" : ""}৳
                    {Math.abs(priceDiff).toLocaleString("en-IN")}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Footer buttons */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button
              onClick={onClose}
              className="py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!width || !height || newArea < minOrderSize}
              className="py-3 rounded-xl bg-[#C8956C] text-white font-semibold hover:bg-[#b08050] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}
