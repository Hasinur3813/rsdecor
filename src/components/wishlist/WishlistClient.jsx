"use client";

import { useState } from "react";
import { MOCK_PRODUCTS as productsData } from "@/lib/productsData";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, clearWishlist, removeSelectedFromWishlist } from "@/store/slices/wishlistSlice";
import WishlistEmpty from "./WishlistEmpty";
import WishlistToolbar from "./WishlistToolbar";
import WishlistGrid from "./WishlistGrid";
import WishlistSummary from "./WishlistSummary";
import WishlistShareModal from "./WishlistShareModal";
import CostCalculatorModal from "./CostCalculatorModal";

export default function WishlistClient() {
  const dispatch = useDispatch();
  const wishlistIds = useSelector((state) => state.wishlist.items);
  const [sortBy, setSortBy] = useState("Date Added");
  const [filterCategory, setFilterCategory] = useState("All");
  const [selectedIds, setSelectedIds] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);

  // Derived state
  const wishlistProducts = productsData.filter((p) =>
    wishlistIds.includes(p.id),
  );

  const filtered = [...wishlistProducts]
    .filter((p) => filterCategory === "All" || p.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "Price: Low to High":
          return a.pricePerSqft - b.pricePerSqft;
        case "Price: High to Low":
          return b.pricePerSqft - a.pricePerSqft;
        case "Top Rated":
          return b.rating - a.rating;
        case "Name A–Z":
          return a.name.localeCompare(b.name);
        case "Date Added":
        default:
          return b.id - a.id; // Assume higher id = newer
      }
    });

  const removeItem = (id) => {
    dispatch(removeFromWishlist(id));
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  };

  const clearAll = () => {
    dispatch(clearWishlist());
    setSelectedIds([]);
  };

  const removeSelected = () => {
    dispatch(removeSelectedFromWishlist(selectedIds));
    setSelectedIds([]);
  };

  // Update removeSelected function
  // Let's patch the toolbar to use this instead
  const toolbarProps = {
    count: filtered.length,
    total: wishlistProducts.length,
    sortBy,
    setSortBy,
    filterCategory,
    setFilterCategory,
    selectedIds,
    setSelectedIds,
    allIds: filtered.map((p) => p.id),
    onClearAll: clearAll,
    onOpenShare: () => setShowShareModal(true),
    onOpenCalculator: () => setShowCalculatorModal(true),
    onRemoveSelected: removeSelected,
  };

  return (
    <div className="container mx-auto px-4 py-10">
      {wishlistProducts.length === 0 ? (
        <WishlistEmpty />
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <WishlistToolbar {...toolbarProps} />
            <WishlistGrid
              products={filtered}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
              onRemove={removeItem}
            />
          </div>
          <aside className="w-full lg:w-80 shrink-0">
            <WishlistSummary
              products={wishlistProducts}
              selectedIds={selectedIds}
              onOpenCalculator={() => setShowCalculatorModal(true)}
            />
          </aside>
        </div>
      )}

      {showShareModal && (
        <WishlistShareModal
          products={wishlistProducts}
          onClose={() => setShowShareModal(false)}
        />
      )}

      {showCalculatorModal && (
        <CostCalculatorModal
          products={
            selectedIds.length > 0
              ? wishlistProducts.filter((p) => selectedIds.includes(p.id))
              : wishlistProducts
          }
          onClose={() => setShowCalculatorModal(false)}
        />
      )}
    </div>
  );
}
