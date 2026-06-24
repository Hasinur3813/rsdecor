"use client";

import { useState, useEffect } from "react";
import { MOCK_PRODUCTS as productsData } from "@/lib/productsData";
import WishlistEmpty from "./WishlistEmpty";
import WishlistToolbar from "./WishlistToolbar";
import WishlistGrid from "./WishlistGrid";
import WishlistSummary from "./WishlistSummary";
import WishlistShareModal from "./WishlistShareModal";
import CostCalculatorModal from "./CostCalculatorModal";

export default function WishlistClient() {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [sortBy, setSortBy] = useState("Date Added");
  const [filterCategory, setFilterCategory] = useState("All");
  const [selectedIds, setSelectedIds] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);

  // Load wishlist from localStorage
  useEffect(() => {
    const loadWishlist = () => {
      const saved = localStorage.getItem("rs_wishlist");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Use setTimeout to avoid sync setState in effect
          setTimeout(() => setWishlistIds(parsed), 0);
        } catch (e) {
          console.error("Failed to load wishlist:", e);
        }
      }
    };
    loadWishlist();
  }, []);

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
    const updated = wishlistIds.filter((wid) => wid !== id);
    setWishlistIds(updated);
    localStorage.setItem("rs_wishlist", JSON.stringify(updated));
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  };

  const clearAll = () => {
    setWishlistIds([]);
    setSelectedIds([]);
    localStorage.removeItem("rs_wishlist");
  };

  const removeSelected = () => {
    const updated = wishlistIds.filter((id) => !selectedIds.includes(id));
    setWishlistIds(updated);
    localStorage.setItem("rs_wishlist", JSON.stringify(updated));
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
