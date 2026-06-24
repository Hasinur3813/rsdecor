"use client";

import { useState } from "react";
import Link from "next/link";
import { Layers, Square, Grid, Check, MessageCircle } from "lucide-react";

const iconMap = {
  Layers: Layers,
  Square: Square,
  Grid: Grid,
};

export default function ServicesCostEstimator() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [dimensions, setDimensions] = useState({});

  const services = [
    {
      id: "wallpaper",
      name: "3D Wallpapers",
      price: 140,
      icon: "Layers",
      type: "wallpaper",
    },
    {
      id: "ceiling",
      name: "3D Ceiling Papers",
      price: 140,
      icon: "Square",
      type: "ceiling",
    },
    {
      id: "epoxy",
      name: "3D Epoxy Floors",
      price: 450,
      icon: "Grid",
      type: "epoxy",
    },
  ];

  const toggleService = (serviceId) => {
    const isSelecting = !selectedServices.includes(serviceId);

    if (isSelecting) {
      // Add default dimensions when selecting
      setDimensions((prevDim) => ({
        ...prevDim,
        [serviceId]: { width: "", height: "", walls: 1, length: "" },
      }));
      setSelectedServices((prev) => [serviceId]);
    } else {
      // Remove dimensions when unselecting
      setDimensions((prevDim) => {
        const newDim = { ...prevDim };
        delete newDim[serviceId];
        return newDim;
      });
      setSelectedServices((prev) => prev.filter((id) => id !== serviceId));
    }
  };

  const updateDimensions = (serviceId, field, value) => {
    setDimensions((prev) => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        [field]: value,
      },
    }));
  };

  const calculateArea = (serviceId) => {
    const dims = dimensions[serviceId];
    if (!dims) return 0;
    const width = parseFloat(dims.width) || 0;
    const height = parseFloat(dims.height) || 0;
    const length = parseFloat(dims.length) || 0;
    const walls = parseInt(dims.walls) || 1;

    const service = services.find((s) => s.id === serviceId);

    if (service.type === "wallpaper") {
      return width * height * walls;
    }
    if (service.type === "ceiling" || service.type === "epoxy") {
      return width * (length || height);
    }
    return 0;
  };

  const totalCost = selectedServices.reduce((sum, serviceId) => {
    const service = services.find((s) => s.id === serviceId);
    const area = calculateArea(serviceId);
    return sum + area * service.price;
  }, 0);

  const advance = totalCost * 0.5;
  const balance = totalCost * 0.5;

  const reset = () => {
    setSelectedServices([]);
    setDimensions({});
  };

  const getWhatsAppMessage = () => {
    const serviceDetails = selectedServices
      .map((serviceId) => {
        const service = services.find((s) => s.id === serviceId);
        const area = calculateArea(serviceId);
        const cost = area * service.price;
        return `${service.name} (${area.toFixed(0)} sqft) - ৳${cost.toLocaleString("en-IN")}`;
      })
      .join("\n");

    return `Hi! I'd like to get a quote for the following services:\n\n${serviceDetails}\n\nTotal Estimated Cost: ৳${totalCost.toLocaleString("en-IN")}`;
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="font-playfair text-4xl font-bold text-dark mb-3">
          Estimate Your Project Cost
        </h2>
        <p className="text-gray-500">
          Select one or more services to calculate combined cost
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 max-w-3xl mx-auto">
        {/* Step 1: Service Selection */}
        <div className="mb-10">
          <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
              1
            </span>
            Select Services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {services.map((service) => {
              const Icon = iconMap[service.icon];
              const isSelected = selectedServices.includes(service.id);
              return (
                <button
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={`p-5 rounded-2xl border-2 transition-all text-left relative ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-primary/30"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                  {Icon && (
                    <Icon
                      className={`w-10 h-10 mb-3 ${isSelected ? "text-primary" : "text-gray-400"}`}
                    />
                  )}
                  <h4 className="font-bold text-dark mb-1">{service.name}</h4>
                  <p className="text-primary font-semibold">
                    ৳{service.price}/sqft
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Dimensions */}
        {selectedServices.length > 0 && (
          <div className="mb-10">
            <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                2
              </span>
              Enter Dimensions
            </h3>
            <div className="space-y-6">
              {selectedServices.map((serviceId) => {
                const service = services.find((s) => s.id === serviceId);
                const dims = dimensions[serviceId] || {};
                return (
                  <div key={serviceId} className="p-5 bg-light rounded-2xl">
                    <h4 className="font-bold text-dark mb-4">
                      {service.name} — Room Dimensions
                    </h4>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Width (ft)
                        </label>
                        <input
                          type="number"
                          value={dims.width}
                          onChange={(e) =>
                            updateDimensions(serviceId, "width", e.target.value)
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                          placeholder="e.g. 10"
                        />
                      </div>

                      {service.type === "wallpaper" ? (
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">
                            Height (ft)
                          </label>
                          <input
                            type="number"
                            value={dims.height}
                            onChange={(e) =>
                              updateDimensions(
                                serviceId,
                                "height",
                                e.target.value,
                              )
                            }
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                            placeholder="e.g. 8"
                          />
                        </div>
                      ) : (
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">
                            Length (ft)
                          </label>
                          <input
                            type="number"
                            value={dims.length}
                            onChange={(e) =>
                              updateDimensions(
                                serviceId,
                                "length",
                                e.target.value,
                              )
                            }
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                            placeholder="e.g. 12"
                          />
                        </div>
                      )}
                    </div>

                    {service.type === "wallpaper" && (
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Number of Walls
                        </label>
                        <select
                          value={dims.walls || 1}
                          onChange={(e) =>
                            updateDimensions(serviceId, "walls", e.target.value)
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                        >
                          {[1, 2, 3, 4].map((n) => (
                            <option key={n} value={n}>
                              {n} {n === 1 ? "Wall" : "Walls"}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Cost Breakdown */}
        {selectedServices.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                3
              </span>
              Cost Breakdown
            </h3>
            <div className="bg-primary/5 rounded-2xl p-6">
              <div className="space-y-3 mb-4">
                {selectedServices.map((serviceId) => {
                  const service = services.find((s) => s.id === serviceId);
                  const area = calculateArea(serviceId);
                  const cost = area * service.price;
                  return (
                    <div
                      key={serviceId}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-700">
                        {service.name} {area > 0 && `(${area.toFixed(0)} sqft)`}
                      </span>
                      <span className="font-semibold text-dark">
                        ৳{cost.toLocaleString("en-IN")}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-primary/20 pt-4 mt-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-dark text-lg">
                    Total Estimated Cost
                  </span>
                  <span className="font-playfair text-2xl font-bold text-primary">
                    ৳{totalCost.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Advance Required (50%)</span>
                  <span className="font-semibold text-secondary">
                    ৳{advance.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    Balance on Completion (50%)
                  </span>
                  <span className="font-semibold text-gray-500">
                    ৳{balance.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Buttons */}
        <div className="space-y-4">
          <button
            onClick={reset}
            className="block w-full text-center text-gray-500 hover:text-gray-700 font-medium"
          >
            Reset
          </button>
          <Link
            href={`https://wa.me/+8801976600300?text=${encodeURIComponent(getWhatsAppMessage())}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-xl bg-primary text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Get Exact Quote on WhatsApp
          </Link>
        </div>
      </div>
    </section>
  );
}
