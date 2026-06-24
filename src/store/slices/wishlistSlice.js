import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    hydrateWishlist: (state, action) => {
      state.items = action.payload;
    },
    addToWishlist: (state, action) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
        if (typeof window !== "undefined") {
          localStorage.setItem("rs_wishlist", JSON.stringify(state.items));
        }
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((id) => id !== action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("rs_wishlist", JSON.stringify(state.items));
      }
    },
    clearWishlist: (state) => {
      state.items = [];
      if (typeof window !== "undefined") {
        localStorage.setItem("rs_wishlist", JSON.stringify(state.items));
      }
    },
    removeSelectedFromWishlist: (state, action) => {
      state.items = state.items.filter((id) => !action.payload.includes(id));
      if (typeof window !== "undefined") {
        localStorage.setItem("rs_wishlist", JSON.stringify(state.items));
      }
    },
  },
});

export const {
  hydrateWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  removeSelectedFromWishlist,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
