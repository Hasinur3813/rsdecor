"use client";

import { useRef, useMemo } from "react";
import { ChevronLeft, ChevronRight, SearchX } from "lucide-react";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/products/ProductCard";
import { useProductFilters } from "@/components/products/useProductFilters";
import { getFilteredProducts, PAGE_SIZE } from "@/lib/productFilters";

function getPageNumbers(current, total) {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set([1, total, current, current - 1, current + 1]);
  const sorted = [...pages]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  const result = [];
  for (let i = 0; i < sorted.length; i += 1) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push("...");
    }
    result.push(sorted[i]);
  }
  return result;
}

export default function ProductsGrid() {
  const gridRef = useRef(null);
  const { filters, resetFilters, setPage } = useProductFilters();

  const filtered = useMemo(() => getFilteredProducts(filters), [filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(filters.page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handlePageChange = (page) => {
    setPage(page);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (filtered.length === 0) {
    return (
      <div ref={gridRef} className="py-20 text-center">
        <SearchX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-heading font-bold text-dark mb-2">
          No Products Found
        </h3>
        <p className="text-dark-muted mb-6">
          Try adjusting your filters or search term
        </p>
        <button
          type="button"
          onClick={resetFilters}
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-primary text-primary text-sm font-semibold hover:bg-primary/5 transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    );
  }

  return (
    <div ref={gridRef}>
      <div
        className={cn(
          filters.view === "list"
            ? "flex flex-col gap-4"
            : "grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-2  lg:gap-6",
        )}
      >
        {paginated.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            viewMode={filters.view}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <p className="text-sm text-dark-muted">
            Page {currentPage} of {totalPages}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 bg-white text-dark-muted hover:border-primary/30 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {getPageNumbers(currentPage, totalPages).map((page, i) =>
              page === "..." ? (
                <span key={`ellipsis-${i}`} className="px-2 text-dark-muted">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  type="button"
                  onClick={() => handlePageChange(page)}
                  className={cn(
                    "min-w-[2.5rem] h-10 rounded-lg text-sm font-semibold transition-colors",
                    page === currentPage
                      ? "bg-primary text-white"
                      : "bg-white border border-gray-200 text-dark-muted hover:bg-primary/10",
                  )}
                >
                  {page}
                </button>
              ),
            )}

            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 bg-white text-dark-muted hover:border-primary/30 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
