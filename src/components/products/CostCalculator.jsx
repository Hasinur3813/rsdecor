
"use client";

import { useState } from "react";

export default function CostCalculator({ product }) {
  const [mode, setMode] = useState("room");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [walls, setWalls] = useState(4);
  const [sqft, setSqft] = useState("");

  const isEpoxy = product.category === "3D Epoxy Floor";

  let totalArea = 0;
  if (mode === "room") {
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    totalArea = isEpoxy ? w * h : w * h * walls;
  } else {
    totalArea = parseFloat(sqft) || 0;
  }

  const totalCost = totalArea * product.pricePerSqft;
  const discount = !isEpoxy && walls === 4 ? 0.05 : 0;
  const finalCost = totalCost * (1 - discount);

  const reset = () => {
    setWidth("");
    setHeight("");
    setWalls(4);
    setSqft("");
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-light-muted">
      <h3 className="text-lg font-heading font-bold text-dark mb-4">
        Cost Calculator
      </h3>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-5 bg-light-muted rounded-xl p-1">
        <button
          onClick={() => setMode("room")}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
            mode === "room"
              ? "bg-white text-primary shadow-sm"
              : "text-dark-muted hover:text-dark"
          }`}
        >
          By Room Size
        </button>
        <button
          onClick={() => setMode("sqft")}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
            mode === "sqft"
              ? "bg-white text-primary shadow-sm"
              : "text-dark-muted hover:text-dark"
          }`}
        >
          By Sqft
        </button>
      </div>

      {/* Inputs */}
      <div className="space-y-4 mb-5">
        {mode === "room" ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-dark-muted uppercase tracking-wide mb-1">
                  Width (ft)
                </label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-light-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="10"
                />
              </div>
              <div>
                <label className="block text-xs text-dark-muted uppercase tracking-wide mb-1">
                  Height (ft)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-light-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="8"
                />
              </div>
            </div>
            {!isEpoxy && (
              <div>
                <label className="block text-xs text-dark-muted uppercase tracking-wide mb-1">
                  Number of Walls
                </label>
                <select
                  value={walls}
                  onChange={(e) => setWalls(parseInt(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-light-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                >
                  {[1, 2, 3, 4].map((w) => (
                    <option key={w} value={w}>
                      {w} {w === 1 ? "Wall" : "Walls"}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        ) : (
          <div>
            <label className="block text-xs text-dark-muted uppercase tracking-wide mb-1">
              Total Square Feet
            </label>
            <input
              type="number"
              value={sqft}
              onChange={(e) => setSqft(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-light-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="200"
            />
          </div>
        )}
      </div>

      {/* Output */}
      <div className="bg-primary/5 rounded-2xl p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-dark-muted">Total Area</span>
          <span className="font-bold text-dark">{totalArea.toFixed(0)} sqft</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-dark-muted">Estimated Cost</span>
          <span className="text-2xl font-heading font-bold text-primary">
            ৳{finalCost.toLocaleString("en-IN")}
          </span>
        </div>
        {discount > 0 && (
          <p className="text-green-600 text-sm mt-2">🎉 5% discount applied!</p>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={reset}
          className="flex-1 py-3 rounded-xl border border-light-muted text-dark-muted font-semibold hover:bg-light-muted transition-colors"
        >
          Reset
        </button>
        <a
          href="/contact"
          className="flex-1 py-3 rounded-xl bg-primary text-white font-semibold text-center hover:bg-primary-dark transition-colors"
        >
          Book Free Site Visit →
        </a>
      </div>
    </div>
  );
}
