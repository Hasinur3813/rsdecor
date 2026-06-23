import { notFound } from "next/navigation";
import { MOCK_PRODUCTS as productsData } from "@/lib/productsData";
import ProductBreadcrumb from "@/components/products/ProductBreadcrumb";
import ProductImageGallery from "@/components/products/ProductImageGallery";
import ProductInfo from "@/components/products/ProductInfo";
import WishlistButton from "@/components/products/WishlistButton";
import CostCalculator from "@/components/products/CostCalculator";
import ShareButtons from "@/components/products/ShareButtons";
import ProductTabs from "@/components/products/ProductTabs";
import ProductSpecsTable from "@/components/products/ProductSpecsTable";
import ProductWarranty from "@/components/products/ProductWarranty";
import RelatedProducts from "@/components/products/RelatedProducts";
import StickyAddToQuote from "@/components/products/StickyAddToQuote";

export async function generateStaticParams() {
  return productsData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = productsData.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | RS Wallpaper & Floor`,
    description: `Buy ${product.name} — ${product.category} from ৳${product.pricePerSqft}/sqft. ${product.warranty} warranty. Free site visit. All Bangladesh.`,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = productsData.find((p) => p.slug === slug);
  if (!product) return notFound();

  const relatedProducts = productsData
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="bg-light min-h-screen pb-24">
      <ProductBreadcrumb product={product} />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Image Gallery - Now sticky too! */}
          <div className="lg:col-span-7 xl:col-span-7 lg:sticky lg:top-24">
            <ProductImageGallery product={product} />
          </div>

          {/* Product Info Sidebar - Sticky */}
          <div className="lg:col-span-5 xl:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-6">
              <ProductInfo product={product} />
              <WishlistButton product={product} />
              <CostCalculator product={product} />
              <ShareButtons product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="container mx-auto px-4 pb-8 lg:pb-10">
        <ProductTabs product={product} />
      </section>

      {/* Specs Table */}
      <section className="container mx-auto px-4 pb-8 lg:pb-10">
        <ProductSpecsTable product={product} />
      </section>

      {/* Warranty Section */}
      <ProductWarranty product={product} />

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} />

      <StickyAddToQuote product={product} />
    </main>
  );
}
