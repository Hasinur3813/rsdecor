"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/store/slices/wishlistSlice";

export default function WishlistButton({ product }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.includes(product.id);
  const [showToast, setShowToast] = useState("");

  const toggleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
      setShowToast("Removed from Wishlist");
    } else {
      dispatch(addToWishlist(product.id));
      setShowToast("Added to Wishlist ❤️");
    }
    setTimeout(() => setShowToast(""), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleWishlist}
        className={`w-full py-3 rounded-2xl border-2 transition-all flex items-center justify-center gap-2 font-semibold ${
          isWishlisted
            ? "border-red-200 bg-red-50 text-red-600"
            : "border-light-muted bg-white text-dark hover:border-primary hover:text-primary"
        }`}
      >
        <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
        {isWishlisted ? "Saved to Wishlist" : "Save to Wishlist"}
      </button>
      {showToast && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 rounded-xl bg-dark text-white text-sm whitespace-nowrap">
          {showToast}
        </div>
      )}
    </div>
  );
}
