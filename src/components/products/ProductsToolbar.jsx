"use client";

import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { SORT_OPTIONS } from "@/lib/productFilters";
import { useProductFilters } from "@/components/products/useProductFilters";
import { useFilterDrawer } from "@/components/products/FilterDrawerContext";
import { getFilteredProducts } from "@/lib/productFilters";

export default function ProductsToolbar() {
  const { filters, activeCount, updateFilters } = useProductFilters();
  const { openDrawer } = useFilterDrawer();

  const allFiltered = getFilteredProducts(filters);
  const total = allFiltered.length;
  const start = total === 0 ? 0 : (filters.page - 1) * 12 + 1;
  const end = Math.min(filters.page * 12, total);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex items-center gap-2 flex-wrap">
        <p className="text-sm text-dark-muted">
          Showing{" "}
          <span className="font-semibold text-dark">
            {start}–{end}
          </span>{" "}
          of <span className="font-semibold text-dark">{total}</span> products
        </p>
        {activeCount > 0 && (
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            Filtered
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <select
          value={filters.sort}
          onChange={(e) => updateFilters({ sort: e.target.value })}
          className="border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary bg-white"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div className="hidden sm:flex items-center gap-1 p-1 bg-gray-100 rounded-xl">
          <button
            type="button"
            onClick={() => updateFilters({ view: "grid" }, { resetPage: false })}
            className={cn(
              "p-2 rounded-lg transition-colors",
              filters.view === "grid"
                ? "bg-primary text-white"
                : "text-dark-muted hover:bg-white",
            )}
            aria-label="Grid view"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => updateFilters({ view: "list" }, { resetPage: false })}
            className={cn(
              "p-2 rounded-lg transition-colors",
              filters.view === "list"
                ? "bg-primary text-white"
                : "text-dark-muted hover:bg-white",
            )}
            aria-label="List view"
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={openDrawer}
          className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeCount > 0 && (
            <span className="bg-white/20 px-1.5 rounded-full text-xs">
              {activeCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
