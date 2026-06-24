"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function WishlistEmpty() {
  const categories = [
    {
      name: "3D Wallpaper",
      image: "/categories/wallpaper.jpg",
      filter: "3D Wallpaper",
    },
    {
      name: "3D Ceiling Paper",
      image: "/categories/celingpaper.jpg",
      filter: "3D Ceiling Paper",
    },
    {
      name: "3D Epoxy Floor",
      image: "/categories/floor.jpg",
      filter: "3D Epoxy Floor",
    },
  ];

  return (
    <div className="py-24 flex flex-col items-center gap-6 text-center">
      <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-2">
        <Heart className="w-10 h-10 text-gray-200" />
      </div>

      <div>
        <h2 className="font-[Playfair_Display] text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-3">
          Your Wishlist is Empty
        </h2>
        <p className="text-gray-500 max-w-sm mx-auto text-sm md:text-base">
          You haven&apos;t saved any designs yet. Browse our collection and tap
          the heart icon to save your favourites.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 w-full max-w-4xl">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/products?category=${encodeURIComponent(cat.filter)}`}
            className="group bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-[#C8956C]/30"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-all">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="font-bold text-base text-[#2C2C2C] mb-1">
              {cat.name}
            </h3>
            <p className="text-[#C8956C] text-xs font-semibold flex items-center justify-center gap-1">
              Browse Products
              <span>→</span>
            </p>
          </Link>
        ))}
      </div>

      <Link
        href="/products"
        className="mt-8 bg-[#C8956C] text-white px-10 py-3.5 rounded-2xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-[#C8956C]/20"
      >
        Browse All Products
      </Link>

      <div className="flex items-center gap-3 mt-4">
        <span className="text-gray-300 text-sm">Or</span>
        <a
          href="https://wa.me/+8801976600300?text=Hi!%20I%20need%20help%20choosing%20wallpapers%20or%20flooring."
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4A7C6F] underline text-sm font-semibold"
        >
          Need help choosing? WhatsApp us →
        </a>
      </div>
    </div>
  );
}
