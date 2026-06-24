import { createSlice } from "@reduxjs/toolkit";

const saveCartToStorage = (items) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("rs_cart", JSON.stringify(items));
  }
};

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateCart: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      state.items.push(action.payload);
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.cartId !== action.payload,
      );
      saveCartToStorage(state.items);
    },
    updateCartItem: (state, action) => {
      const { cartId, updates } = action.payload;
      state.items = state.items.map((item) =>
        item.cartId === cartId ? { ...item, ...updates } : item,
      );
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    },
  },
});

export const {
  hydrateCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
