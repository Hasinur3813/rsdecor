"use client";

import { useState } from "react";
import { ShoppingCart, Info } from "lucide-react";

export default function CostCalculator({ product }) {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("ft"); // 'ft' or 'in'
  const [numWalls, setNumWalls] = useState(1);

  const isEpoxy = product.category === "3D Epoxy Floor";

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

  const area = calculateArea();
  const totalPrice = area * product.pricePerSqft;
  const minOrderSize = 100; // Minimum 100 sq ft order

  return (
    <div className="bg-white rounded-2xl p-5 border border-light-muted shadow-sm">
      <h3 className="text-lg font-heading font-bold text-dark mb-2">
        Enter Dimensions
      </h3>

      {/* Info note */}
      <div className="flex items-start gap-2 mb-5 p-3 bg-light rounded-xl">
        <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
        <p className="text-xs text-dark-muted">
          We accept minimum {minOrderSize} sq ft size order in any material
        </p>
      </div>

      {/* Unit toggle */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setUnit("ft")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            unit === "ft"
              ? "bg-primary text-white"
              : "bg-gray-100 text-dark-muted hover:bg-gray-200"
          }`}
        >
          Feet (ft)
        </button>
        <button
          onClick={() => setUnit("in")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            unit === "in"
              ? "bg-primary text-white"
              : "bg-gray-100 text-dark-muted hover:bg-gray-200"
          }`}
        >
          Inches (in)
        </button>
      </div>

      {/* Dimensions inputs */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-xs text-dark-muted uppercase tracking-wide mb-1 font-medium">
            Width
          </label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-light-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            placeholder={`Width (${unit})`}
          />
        </div>
        <div>
          <label className="block text-xs text-dark-muted uppercase tracking-wide mb-1 font-medium">
            {isEpoxy ? "Length" : "Height"}
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-light-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            placeholder={`${isEpoxy ? "Length" : "Height"} (${unit})`}
          />
        </div>
      </div>

      {/* Number of walls (only for non-epoxy) */}
      {!isEpoxy && (
        <div className="mb-4">
          <label className="block text-xs text-dark-muted uppercase tracking-wide mb-1 font-medium">
            Number of Walls
          </label>
          <select
            value={numWalls}
            onChange={(e) => setNumWalls(parseInt(e.target.value))}
            className="w-full px-4 py-3 rounded-xl border border-light-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "Wall" : "Walls"}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Price display */}
      {area > 0 && (
        <div className="bg-primary/5 rounded-xl p-4 mb-5">
          <div className="grid grid-cols-2 gap-3 mb-2">
            <div>
              <p className="text-xs text-dark-muted uppercase tracking-wide">
                Total Area
              </p>
              <p className="text-xl font-bold text-dark">
                {area.toFixed(2)} sq ft
              </p>
            </div>
            <div>
              <p className="text-xs text-dark-muted uppercase tracking-wide">
                Price per sq ft
              </p>
              <p className="text-xl font-bold text-primary">
                ৳ {product.pricePerSqft}
              </p>
            </div>
          </div>
          <div className="border-t border-primary/20 pt-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm text-dark-muted">Total Cost</p>
              <p className="text-2xl font-heading font-bold text-primary">
                ৳ {totalPrice.toLocaleString("en-IN")}
              </p>
            </div>
            {area < minOrderSize && (
              <p className="text-xs text-red-500 font-medium">
                Minimum order size is {minOrderSize} sq ft. Please increase your
                dimensions.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Add to Cart button */}
      <button
        disabled={!width || !height || area < minOrderSize}
        className="w-full py-3.5 rounded-xl bg-primary text-white font-semibold text-lg hover:bg-primary-dark transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ShoppingCart className="w-5 h-5" />
        Add to Cart
      </button>

      {/* Reset button */}
      <button
        onClick={() => {
          setWidth("");
          setHeight("");
          setNumWalls(1);
        }}
        className="w-full mt-3 py-2.5 rounded-xl text-dark-muted hover:text-primary font-medium transition-colors"
      >
        Reset Dimensions
      </button>
    </div>
  );
}
