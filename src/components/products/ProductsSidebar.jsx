"use client";

import FilterPanelContent from "@/components/products/FilterPanelContent";
import { useProductFilters } from "@/components/products/useProductFilters";

export default function ProductsSidebar() {
  const { filters, activeCount, updateFilters, resetFilters } =
    useProductFilters();

  return (
    <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto bg-white rounded-2xl shadow-sm border border-light-muted/50 p-5">
      <FilterPanelContent
        filters={filters}
        onChange={updateFilters}
        onReset={resetFilters}
        activeCount={activeCount}
      />
    </div>
  );
}
