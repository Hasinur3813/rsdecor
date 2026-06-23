"use client";

import { useEffect, useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import FilterPanelContent from "@/components/products/FilterPanelContent";
import { useFilterDrawer } from "@/components/products/FilterDrawerContext";
import { useProductFilters } from "@/components/products/useProductFilters";
import { countActiveFilters } from "@/lib/productFilters";

export default function MobileFilterDrawer() {
  const { isOpen, closeDrawer, openDrawer } = useFilterDrawer();
  const { filters, activeCount, updateFilters, resetFilters } =
    useProductFilters();
  const [draft, setDraft] = useState(filters);

  useEffect(() => {
    if (isOpen) setDraft(filters);
  }, [isOpen, filters]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleDraftChange = (updates) => {
    setDraft((prev) => ({ ...prev, ...updates }));
  };

  const handleApply = () => {
    updateFilters(draft);
    closeDrawer();
  };

  const handleReset = () => {
    resetFilters();
    closeDrawer();
  };

  const draftActiveCount = countActiveFilters(draft);

  return (
    <>
      <button
        type="button"
        onClick={openDrawer}
        className={cn(
          "lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40",
          "inline-flex items-center gap-2 px-5 py-3 rounded-full",
          "bg-primary text-white text-sm font-semibold shadow-xl",
        )}
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters{activeCount > 0 ? ` (${activeCount})` : ""}
      </button>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50"
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          "lg:hidden fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-2xl",
          "max-h-[85vh] flex flex-col transition-transform duration-300",
          isOpen ? "translate-y-0" : "translate-y-full pointer-events-none",
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-light-muted">
          <h2 className="text-base font-heading font-bold text-dark">
            Filter Products
          </h2>
          <button
            type="button"
            onClick={closeDrawer}
            className="p-2 rounded-lg hover:bg-light text-dark-muted"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <FilterPanelContent
            filters={draft}
            onChange={handleDraftChange}
            activeCount={draftActiveCount}
            showHeader={false}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 p-5 border-t border-light-muted">
          <button
            type="button"
            onClick={handleReset}
            className="py-3 rounded-xl border-2 border-primary text-primary text-sm font-semibold"
          >
            Reset All
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="py-3 rounded-xl bg-primary text-white text-sm font-semibold"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}
