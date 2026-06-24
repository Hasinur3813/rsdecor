"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, ChevronLeft } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItem,
  clearCart,
} from "@/store/slices/cartSlice";
import CartEmpty from "./CartEmpty";
import CartItemCard from "./CartItemCard";
import CartSummary from "./CartSummary";
import EditDimensionsModal from "./EditDimensionsModal";
import CartCheckoutBar from "./CartCheckoutBar";

export default function CartClient() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleUpdateItem = (cartId, updates) => {
    dispatch(updateCartItem({ cartId, updates }));
  };

  const handleRemoveItem = (cartId) => {
    dispatch(removeFromCart(cartId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalArea = cartItems.reduce((sum, item) => sum + item.area, 0);
  const totalCost = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const advanceAmount = totalCost * 0.5;
  const balanceAmount = totalCost * 0.5;

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowEditModal(true);
  };

  return (
    <div className="pb-24 lg:pb-10">
      {cartItems.length === 0 ? (
        <CartEmpty />
      ) : (
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Items list */}
            <div className="lg:sticky top-26 flex-1 min-w-0 flex flex-col gap-4 lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto lg:pr-2">
              {/* Cart header row */}
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-500">
                  {cartItems.length} item{cartItems.length > 1 ? "s" : ""} in
                  cart
                </p>
                <button
                  onClick={handleClearCart}
                  className="text-sm text-red-400 hover:text-red-600 flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Cart
                </button>
              </div>
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.cartId}
                  item={item}
                  onRemove={handleRemoveItem}
                  onEdit={handleEdit}
                />
              ))}
              {/* Continue shopping link */}
              <Link
                href="/products"
                className="flex items-center gap-2 text-[#C8956C] text-sm font-medium mt-2 w-fit hover:gap-3 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                Continue Shopping
              </Link>
            </div>
            {/* Summary sidebar */}
            <aside className="w-full lg:w-96 shrink-0 lg:sticky lg:top-24 lg:self-start">
              <CartSummary
                cartItems={cartItems}
                totalCost={totalCost}
                totalArea={totalArea}
                advanceAmount={advanceAmount}
                balanceAmount={balanceAmount}
              />
            </aside>
          </div>
        </div>
      )}
      {showEditModal && editingItem && (
        <EditDimensionsModal
          item={editingItem}
          onClose={() => {
            setShowEditModal(false);
            setEditingItem(null);
          }}
          onSave={(cartId, updates) => {
            handleUpdateItem(cartId, updates);
            setShowEditModal(false);
            setEditingItem(null);
          }}
        />
      )}
      <CartCheckoutBar
        totalCost={totalCost}
        itemCount={cartItems.length}
        cartItems={cartItems}
      />
    </div>
  );
}
