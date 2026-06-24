"use client";

import { useState } from "react";

export default function BeforeAfterSlider() {
  const transformations = [
    {
      id: "wallpaper",
      title: "Bedroom Wallpaper",
      beforeLabel: "Plain Wall",
      afterLabel: "3D Wallpaper",
      beforeBg: "bg-gray-300",
      afterBg: "bg-gradient-to-br from-primary to-accent",
      resultText: "Transformed in 2 days ✓",
    },
    {
      id: "ceiling",
      title: "Ceiling Paper",
      beforeLabel: "Plain Ceiling",
      afterLabel: "3D Ceiling Paper",
      beforeBg: "bg-gray-200",
      afterBg: "bg-gradient-to-br from-secondary to-dark",
      resultText: "Elevated your space ✓",
    },
    {
      id: "epoxy",
      title: "Epoxy Floor",
      beforeLabel: "Bare Floor",
      afterLabel: "3D Epoxy Floor",
      beforeBg: "bg-stone-300",
      afterBg: "bg-gradient-to-br from-dark to-slate-700",
      resultText: "Seamless & beautiful ✓",
    },
  ];

  return (
    <section className="bg-light py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-dark mb-3">
            The RS Difference
          </h2>
          <p className="text-gray-500">See the transformation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {transformations.map((item) => (
            <BeforeAfterCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfterCard({ item }) {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div className="group">
      <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-4">
        {/* Before */}
        <div
          className={`absolute inset-0 transition-all duration-500 flex items-center justify-center ${
            item.beforeBg
          } ${showAfter ? "opacity-0 translate-y-full" : "opacity-100 translate-y-0"}`}
        >
          <span className="text-2xl font-bold text-dark/60">
            {item.beforeLabel}
          </span>
          <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
            Before
          </div>
        </div>

        {/* After */}
        <div
          className={`absolute inset-0 transition-all duration-500 flex items-center justify-center ${
            item.afterBg
          } ${showAfter ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}`}
        >
          <span className="text-2xl font-bold text-white/90">
            {item.afterLabel}
          </span>
          <div className="absolute bottom-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
            After
          </div>
        </div>
      </div>

      <div className="text-center">
        <h3 className="font-playfair text-xl font-bold text-dark mb-2">
          {item.title}
        </h3>
        <button
          onClick={() => setShowAfter(!showAfter)}
          className="inline-flex items-center gap-1 text-primary font-semibold hover:gap-2 transition-all"
        >
          {showAfter ? <>← See Before</> : <>See After →</>}
        </button>
        <p className="mt-2 text-secondary font-medium">{item.resultText}</p>
      </div>
    </div>
  );
}
