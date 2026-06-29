"use client";

import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import toast from "react-hot-toast";
import { makeStore } from ".";
import { hydrateWishlist } from "./slices/wishlistSlice";
import { hydrateCart } from "./slices/cartSlice";
import { fetchSession, clearSession } from "./slices/authSlice";
import { setSessionExpiredHandler } from "@/lib/axiosInstance";

export default function StoreProvider({ children }) {
  const [store] = useState(makeStore);

  useEffect(() => {
    setSessionExpiredHandler(() => {
      store.dispatch(clearSession());
      toast.error("Your session has expired. Please sign in again.");
    });

    store.dispatch(fetchSession());

    try {
      const savedWishlist = localStorage.getItem("rs_wishlist");
      if (savedWishlist) {
        store.dispatch(hydrateWishlist(JSON.parse(savedWishlist)));
      }
    } catch (e) {
      console.error("Failed to hydrate wishlist:", e);
    }

    try {
      const savedCart = localStorage.getItem("rs_cart");
      if (savedCart) {
        store.dispatch(hydrateCart(JSON.parse(savedCart)));
      }
    } catch (e) {
      console.error("Failed to hydrate cart:", e);
    }
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
