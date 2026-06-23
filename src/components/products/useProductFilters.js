"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  parseFilters,
  filtersToSearchParams,
  countActiveFilters,
} from "@/lib/productFilters";

export function useProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filterKey = searchParams.toString();
  const filters = useMemo(
    () => parseFilters(new URLSearchParams(filterKey)),
    [filterKey],
  );
  const activeCount = countActiveFilters(filters);

  const updateFilters = useCallback(
    (updates, { resetPage = true } = {}) => {
      const next = { ...filters, ...updates };
      if (resetPage) next.page = 1;
      const params = filtersToSearchParams(next, { resetPage });
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [filters, pathname, router],
  );

  const resetFilters = useCallback(() => {
    const params = new URLSearchParams();
    if (filters.sort && filters.sort !== "Featured") {
      params.set("sort", filters.sort);
    }
    if (filters.view === "list") params.set("view", "list");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [filters.sort, filters.view, pathname, router]);

  const setPage = useCallback(
    (page) => {
      updateFilters({ page }, { resetPage: false });
    },
    [updateFilters],
  );

  return { filters, activeCount, updateFilters, resetFilters, setPage };
}
