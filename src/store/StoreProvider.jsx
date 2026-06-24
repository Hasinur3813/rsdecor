"use client";

import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore } from ".";
import { hydrateWishlist } from "./slices/wishlistSlice";
import { hydrateCart } from "./slices/cartSlice";
import { initAuth } from "./slices/authSlice";

export default function StoreProvider({ children }) {
  const [store] = useState(makeStore);

  useEffect(() => {
    // Initialize auth first
    store.dispatch(initAuth());

    // Hydrate wishlist from localStorage
    try {
      const savedWishlist = localStorage.getItem("rs_wishlist");
      if (savedWishlist) {
        store.dispatch(hydrateWishlist(JSON.parse(savedWishlist)));
      }
    } catch (e) {
      console.error("Failed to hydrate wishlist:", e);
    }

    // Hydrate cart from localStorage
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
