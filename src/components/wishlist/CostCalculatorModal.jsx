"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function CostCalculatorModal({ products, onClose }) {
  // Initialize dimensions for each product
  const [dimensions, setDimensions] = useState(
    products.reduce((acc, p) => {
      acc[p.id] = {
        width: 10,
        height: 8,
        walls: 4,
        length: 12,
      };
      return acc;
    }, {}),
  );

  // Calculate area and cost for a product
  const calculateForProduct = (product) => {
    const dims = dimensions[product.id];
    let area = 0;

    if (product.category === "3D Wallpaper") {
      area = dims.width * dims.height * dims.walls;
    } else {
      area = dims.width * dims.length;
    }

    const cost = area * product.pricePerSqft;
    return { area, cost };
  };

  const totalCost = products.reduce((sum, p) => {
    const { cost } = calculateForProduct(p);
    return sum + cost;
  }, 0);

  const resetAll = () => {
    setDimensions(
      products.reduce((acc, p) => {
        acc[p.id] = {
          width: 10,
          height: 8,
          walls: 4,
          length: 12,
        };
        return acc;
      }, {}),
    );
  };

  const generateWhatsAppMessage = () => {
    let message = "Project Cost Estimate:\n\n";
    products.forEach((p, i) => {
      const { area, cost } = calculateForProduct(p);
      message += `${i + 1}. ${p.name} (${p.category}): ${area} sqft → ৳${cost.toLocaleString("en-IN")}\n`;
    });
    message += `\nTotal: ৳${totalCost.toLocaleString("en-IN")}\n\nThanks!`;
    return message;
  };

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#2C2C2C] z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-[Playfair_Display] text-xl font-bold text-[#2C2C2C] mb-2">
          Estimate Project Cost
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {products.length > 0 && products.length !== products.length // Wait, check if it's a subset
            ? `Calculating for ${products.length} selected designs.`
            : `Enter your room dimensions for each saved design.`}
        </p>

        {/* Per product inputs */}
        <div className="flex flex-col gap-4 mb-4">
          {products.map((product) => {
            const dims = dimensions[product.id];
            const { area, cost } = calculateForProduct(product);

            return (
              <div key={product.id} className="bg-[#FAF7F2] rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm text-[#2C2C2C] truncate max-w-[70%]">
                    {product.name}
                  </h4>
                  <span className="bg-[#4A7C6F]/10 text-[#4A7C6F] text-xs px-2 py-0.5 rounded-full">
                    {product.category}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Width (ft)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={dims.width}
                      onChange={(e) =>
                        setDimensions((prev) => ({
                          ...prev,
                          [product.id]: {
                            ...prev[product.id],
                            width: Math.max(1, Number(e.target.value) || 0),
                          },
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C8956C]"
                    />
                  </div>

                  {product.category === "3D Wallpaper" ? (
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Height (ft)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={dims.height}
                        onChange={(e) =>
                          setDimensions((prev) => ({
                            ...prev,
                            [product.id]: {
                              ...prev[product.id],
                              height: Math.max(1, Number(e.target.value) || 0),
                            },
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C8956C]"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Length (ft)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={dims.length}
                        onChange={(e) =>
                          setDimensions((prev) => ({
                            ...prev,
                            [product.id]: {
                              ...prev[product.id],
                              length: Math.max(1, Number(e.target.value) || 0),
                            },
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C8956C]"
                      />
                    </div>
                  )}
                </div>

                {product.category === "3D Wallpaper" && (
                  <div className="mt-2">
                    <label className="block text-xs text-gray-500 mb-1">
                      Number of Walls
                    </label>
                    <select
                      value={dims.walls}
                      onChange={(e) =>
                        setDimensions((prev) => ({
                          ...prev,
                          [product.id]: {
                            ...prev[product.id],
                            walls: Number(e.target.value),
                          },
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C8956C]"
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Wall" : "Walls"}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="text-sm text-right mt-2">
                  <span className="text-[#C8956C] font-medium">
                    Area: {area} sqft → ৳{cost.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total summary */}
        <div className="bg-[#C8956C]/10 rounded-xl p-4 mb-4">
          <div className="space-y-2 mb-3">
            {products.map((p) => {
              const { cost } = calculateForProduct(p);
              return (
                <div key={p.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{p.category}</span>
                  <span className="text-[#2C2C2C] font-medium">
                    ৳{cost.toLocaleString("en-IN")}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="border-t border-[#C8956C]/20 pt-3">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-[#2C2C2C]">
                Total Estimate
              </span>
              <span className="text-[#C8956C] font-bold text-xl">
                ৳{totalCost.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 text-sm">50% Advance</span>
              <span className="text-[#4A7C6F] text-sm font-medium">
                ৳{(totalCost * 0.5).toLocaleString("en-IN")}
              </span>
            </div>
            <p className="text-xs text-gray-400">
              * Final cost confirmed after free site visit
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={resetAll}
            className="border border-gray-200 text-gray-600 rounded-xl py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Reset All
          </button>

          <a
            href={`https://wa.me/+8801976600300?text=${encodeURIComponent(
              generateWhatsAppMessage(),
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-[#25D366] text-white rounded-xl py-2.5 text-sm font-medium hover:opacity-90 transition-all"
          >
            Send to WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
