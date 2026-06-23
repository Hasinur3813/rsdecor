/**
 * Product data access layer.
 *
 * Swap `fetchProducts` implementation when the backend API is ready —
 * components and filters should not need changes.
 */

import { MOCK_PRODUCTS } from "./productsData";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

/**
 * Fetch all products from API (or mock data for now).
 * @returns {Promise<import('./productsData').Product[]>}
 */
export async function fetchProducts() {
  if (API_BASE) {
    const res = await fetch(`${API_BASE}/products`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  }

  // TODO: remove mock fallback once API is live
  return MOCK_PRODUCTS;
}

/**
 * Synchronous access for client-side filtering (uses mock until API hook is added).
 * @returns {import('./productsData').Product[]}
 */
export function getProducts() {
  return MOCK_PRODUCTS;
}

/**
 * @param {string} slug
 * @returns {import('./productsData').Product|null}
 */
export function getProductBySlug(slug) {
  return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
}

/**
 * @param {string} category
 * @param {number} [limit]
 */
export function getProductsByCategory(category, limit) {
  const items = MOCK_PRODUCTS.filter((p) => p.category === category);
  return limit ? items.slice(0, limit) : items;
}

/** Best sellers, new arrivals, featured — for homepage sections */
export function getFeaturedProducts({ limit = 8 } = {}) {
  return MOCK_PRODUCTS.filter(
    (p) => p.isFeatured || p.isBestSeller || p.isNew,
  ).slice(0, limit);
}

export function getBestSellers(limit = 8) {
  return MOCK_PRODUCTS.filter((p) => p.isBestSeller).slice(0, limit);
}

export function getNewArrivals(limit = 8) {
  return MOCK_PRODUCTS.filter((p) => p.isNew).slice(0, limit);
}

export function getEpoxyFloors(limit = 8) {
  return getProductsByCategory("3D Epoxy Floor", limit);
}
