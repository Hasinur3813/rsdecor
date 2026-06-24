"use client";

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export default function CartEmpty() {
  return (
    <div className="py-24 flex flex-col items-center gap-6 text-center">
      <ShoppingCart className="w-20 h-20 text-gray-200" />
      <h2 className="text-2xl font-heading text-[#2C2C2C]">Your Cart is Empty</h2>
      <p className="text-gray-500 max-w-sm mx-auto">
        You haven't added any designs yet. Browse our collection, configure your dimensions and add to cart.
      </p>
      <Link
        href="/products"
        className="bg-[#C8956C] text-white px-8 py-3 rounded-2xl font-semibold hover:bg-[#b08050] transition-colors"
      >
        Browse Products
      </Link>
      <div className="flex items-center gap-2">
        <span className="text-gray-400">or</span>
        <Link href="/wishlist" className="text-[#4A7C6F] underline text-sm">
          View Wishlist →
        </Link>
      </div>
    </div>
  );
}
