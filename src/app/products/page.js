import { Suspense } from "react";
import ProductsHero from "@/components/products/ProductsHero";
import ProductsSidebar from "@/components/products/ProductsSidebar";
import ProductsToolbar from "@/components/products/ProductsToolbar";
import ProductsGrid from "@/components/products/ProductsGrid";
import MobileFilterDrawer from "@/components/products/MobileFilterDrawer";
import { FilterDrawerProvider } from "@/components/products/FilterDrawerContext";

export const metadata = {
  title: "Products | RS Wallpaper & Floor — 6000+ Designs",
  description:
    "Browse our collection of 3D wallpapers, ceiling papers and epoxy floors. 6000+ designs available. Serving all of Bangladesh.",
};

export default function ProductsPage() {
  return (
    <main className="bg-light min-h-screen flex-1">
      <ProductsHero />
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-20 text-center text-dark-muted">
            Loading products...
          </div>
        }
      >
        <FilterDrawerProvider>
          <div className="container mx-auto px-4 py-10">
            <div className="flex gap-8">
              <aside className="hidden lg:block w-72 shrink-0">
                <ProductsSidebar />
              </aside>
              <div className="flex-1 min-w-0">
                <ProductsToolbar />
                <ProductsGrid />
              </div>
            </div>
          </div>
          <MobileFilterDrawer />
        </FilterDrawerProvider>
      </Suspense>
    </main>
  );
}
