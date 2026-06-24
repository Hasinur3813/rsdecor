"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

export default function WishlistEmpty() {
  const categories = [
    {
      name: "3D Wallpaper",
      gradient: "linear-gradient(135deg, #C8956C, #D4B896)",
      filter: "3D Wallpaper",
    },
    {
      name: "3D Ceiling Paper",
      gradient: "linear-gradient(135deg, #4A7C6F, #2C2C2C)",
      filter: "3D Ceiling Paper",
    },
    {
      name: "3D Epoxy Floor",
      gradient: "linear-gradient(135deg, #2C2C2C, #4A7C6F)",
      filter: "3D Epoxy Floor",
    },
  ];

  return (
    <div className="py-24 flex flex-col items-center gap-6 text-center">
      <Heart className="w-20 h-20 text-gray-200" />

      <div>
        <h2 className="font-[Playfair_Display] text-2xl font-bold text-[#2C2C2C] mb-3">
          Your Wishlist is Empty
        </h2>
        <p className="text-gray-500 max-w-sm mx-auto">
          You haven't saved any designs yet. Browse our collection and tap the
          heart icon to save your favourites.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 w-full max-w-xl">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/products?category=${encodeURIComponent(cat.filter)}`}
            className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-[#C8956C]"
          >
            <div
              className="aspect-video rounded-xl mb-3"
              style={{ background: cat.gradient }}
            />
            <h3 className="font-semibold text-sm text-[#2C2C2C] mb-1">
              {cat.name}
            </h3>
            <p className="text-[#C8956C] text-xs font-medium flex items-center gap-1">
              Browse →
            </p>
          </Link>
        ))}
      </div>

      <Link
        href="/products"
        className="mt-4 bg-[#C8956C] text-white px-8 py-3 rounded-2xl font-semibold hover:opacity-90 transition-all"
      >
        Browse All Products
      </Link>

      <div className="flex items-center gap-3 mt-2">
        <span className="text-gray-300 text-sm">Or</span>
        <a
          href="https://wa.me/+8801976600300?text=Hi!%20I%20need%20help%20choosing%20wallpapers%20or%20flooring."
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4A7C6F] underline text-sm font-medium"
        >
          Need help choosing? WhatsApp us →
        </a>
      </div>
    </div>
  );
}
