import { getProducts } from "./productsApi";

const PRODUCTS = getProducts();

export const PAGE_SIZE = 12;

export const SORT_OPTIONS = [
  "Featured",
  "Newest First",
  "Price: Low to High",
  "Price: High to Low",
  "Top Rated",
  "Most Reviewed",
];

export const TAG_OPTIONS = [
  "Floral",
  "Geometric",
  "Abstract",
  "Nature",
  "Marble",
  "Metallic",
  "Kids",
  "Luxury",
  "Modern",
  "Classic",
  "3D Effect",
  "Waterproof",
];

export function parseFilters(searchParams) {
  const get = (key) => searchParams.get(key) || "";

  const minPrice = get("minPrice");
  const maxPrice = get("maxPrice");

  return {
    q: get("q"),
    category: get("category") || "All Categories",
    room: get("room") ? get("room").split(",").filter(Boolean) : [],
    minPrice: minPrice ? Number(minPrice) : null,
    maxPrice: maxPrice ? Number(maxPrice) : null,
    pricePreset: get("pricePreset") || "All Prices",
    finish: get("finish") ? get("finish").split(",").filter(Boolean) : [],
    color: get("color") || "",
    warranty: get("warranty") || "Any Warranty",
    tags: get("tags") ? get("tags").split(",").filter(Boolean) : [],
    rating: get("rating") || "Any Rating",
    sort: get("sort") || "Featured",
    view: get("view") === "list" ? "list" : "grid",
    page: Math.max(1, Number(get("page")) || 1),
  };
}

export function filtersToSearchParams(filters, { resetPage = false } = {}) {
  const params = new URLSearchParams();

  if (filters.q) params.set("q", filters.q);
  if (filters.category && filters.category !== "All Categories") {
    params.set("category", filters.category);
  }
  if (filters.room?.length) params.set("room", filters.room.join(","));
  if (filters.minPrice != null && filters.minPrice !== "") {
    params.set("minPrice", String(filters.minPrice));
  }
  if (filters.maxPrice != null && filters.maxPrice !== "") {
    params.set("maxPrice", String(filters.maxPrice));
  }
  if (filters.pricePreset && filters.pricePreset !== "All Prices") {
    params.set("pricePreset", filters.pricePreset);
  }
  if (filters.finish?.length) params.set("finish", filters.finish.join(","));
  if (filters.color) params.set("color", filters.color);
  if (filters.warranty && filters.warranty !== "Any Warranty") {
    params.set("warranty", filters.warranty);
  }
  if (filters.tags?.length) params.set("tags", filters.tags.join(","));
  if (filters.rating && filters.rating !== "Any Rating") {
    params.set("rating", filters.rating);
  }
  if (filters.sort && filters.sort !== "Featured") params.set("sort", filters.sort);
  if (filters.view && filters.view !== "grid") params.set("view", filters.view);
  if (!resetPage && filters.page && filters.page > 1) {
    params.set("page", String(filters.page));
  }

  return params;
}

export function countActiveFilters(filters) {
  let count = 0;
  if (filters.q) count += 1;
  if (filters.category !== "All Categories") count += 1;
  if (filters.room?.length) count += 1;
  if (filters.pricePreset !== "All Prices" || filters.minPrice != null || filters.maxPrice != null) {
    count += 1;
  }
  if (filters.finish?.length) count += 1;
  if (filters.color) count += 1;
  if (filters.warranty !== "Any Warranty") count += 1;
  if (filters.tags?.length) count += 1;
  if (filters.rating !== "Any Rating") count += 1;
  return count;
}

function getMinRating(ratingFilter) {
  switch (ratingFilter) {
    case "5.0 only":
      return 5;
    case "4.0 & above":
      return 4;
    case "3.0 & above":
      return 3;
    default:
      return 0;
  }
}

export function filterProducts(products, filters) {
  let result = [...products];

  if (filters.q) {
    const q = filters.q.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q.replace(/\s+/g, ""))),
    );
  }

  if (filters.category !== "All Categories") {
    result = result.filter((p) => p.category === filters.category);
  }

  if (filters.room?.length) {
    result = result.filter((p) => filters.room.includes(p.roomType));
  }

  if (filters.pricePreset === "৳140/sqft") {
    result = result.filter((p) => p.pricePerSqft === 140);
  } else if (filters.pricePreset === "৳450/sqft") {
    result = result.filter((p) => p.pricePerSqft === 450);
  }

  if (filters.minPrice != null) {
    result = result.filter((p) => p.pricePerSqft >= filters.minPrice);
  }
  if (filters.maxPrice != null) {
    result = result.filter((p) => p.pricePerSqft <= filters.maxPrice);
  }

  if (filters.finish?.length) {
    result = result.filter((p) => filters.finish.includes(p.finish));
  }

  if (filters.color) {
    result = result.filter((p) => p.colorFamily === filters.color);
  }

  if (filters.warranty !== "Any Warranty") {
    result = result.filter((p) => p.warranty === filters.warranty);
  }

  if (filters.tags?.length) {
    result = result.filter((p) =>
      filters.tags.some((tag) =>
        p.tags.includes(tag.toLowerCase().replace(/\s+/g, "-")) ||
        p.tags.includes(tag.toLowerCase()) ||
        p.name.toLowerCase().includes(tag.toLowerCase()),
      ),
    );
  }

  const minRating = getMinRating(filters.rating);
  if (filters.rating === "5.0 only") {
    result = result.filter((p) => p.rating >= 5);
  } else if (minRating > 0) {
    result = result.filter((p) => p.rating >= minRating);
  }

  return result;
}

export function sortProducts(products, sort) {
  const sorted = [...products];

  switch (sort) {
    case "Newest First":
      return sorted.sort(
        (a, b) => Number(b.isNew) - Number(a.isNew) || b.id - a.id,
      );
    case "Price: Low to High":
      return sorted.sort((a, b) => a.pricePerSqft - b.pricePerSqft);
    case "Price: High to Low":
      return sorted.sort((a, b) => b.pricePerSqft - a.pricePerSqft);
    case "Top Rated":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "Most Reviewed":
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    case "Featured":
    default:
      return sorted.sort((a, b) => {
        const score = (p) =>
          Number(p.isFeatured) * 3 +
          Number(p.isBestSeller) * 2 +
          Number(p.isNew);
        return score(b) - score(a) || b.rating - a.rating;
      });
  }
}

export function getFilteredProducts(filters) {
  const filtered = filterProducts(PRODUCTS, filters);
  return sortProducts(filtered, filters.sort);
}

export const CATEGORY_COUNTS = {
  "All Categories": PRODUCTS.length,
  "3D Wallpaper": PRODUCTS.filter((p) => p.category === "3D Wallpaper").length,
  "3D Ceiling Paper": PRODUCTS.filter((p) => p.category === "3D Ceiling Paper")
    .length,
  "3D Epoxy Floor": PRODUCTS.filter((p) => p.category === "3D Epoxy Floor")
    .length,
};
