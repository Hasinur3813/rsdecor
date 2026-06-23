import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

function StarRating({ rating, reviewCount }) {
  return (
    <div className="flex items-center gap-1.5 text-xs">
      <span className="text-amber-400 tracking-tight">
        {"★".repeat(Math.round(rating))}
        {"☆".repeat(5 - Math.round(rating))}
      </span>
      <span className="font-semibold text-dark">{rating}</span>
      <span className="text-dark-muted">({reviewCount} reviews)</span>
    </div>
  );
}

function ProductImage({ product, className }) {
  return (
    <div className={cn("relative overflow-hidden bg-light-muted", className)}>
      <Image
        src={product.image}
        alt={product.imageAlt || product.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
        {product.isNew && (
          <Badge variant="secondary" size="xs">
            New
          </Badge>
        )}
        {product.isBestSeller && (
          <Badge variant="primary" size="xs">
            Best Seller
          </Badge>
        )}
      </div>

      <button
        type="button"
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 text-dark-muted hover:text-red-500 transition-colors"
        aria-label="Add to wishlist"
      >
        <Heart className="w-4 h-4" />
      </button>

      <div className="absolute bottom-3 left-3">
        <span className="px-2.5 py-1 rounded-full bg-secondary text-white text-[10px] font-semibold uppercase tracking-wide">
          {product.category}
        </span>
      </div>
    </div>
  );
}

export default function ProductCard({ product, viewMode = "grid" }) {
  const warrantyShort =
    product.warranty === "Lifetime" ? "Lifetime" : "10yr";

  if (viewMode === "list") {
    return (
      <div className="group bg-white rounded-2xl shadow-sm border border-light-muted/50 overflow-hidden hover:shadow-md transition-all duration-300">
        <div className="flex flex-col sm:flex-row">
          <ProductImage
            product={product}
            className="w-full sm:w-48 shrink-0 aspect-[4/3] sm:aspect-auto sm:min-h-[180px]"
          />

          <div className="flex-1 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-heading font-bold text-dark group-hover:text-primary transition-colors line-clamp-2">
                {product.name}
              </h3>
              <p className="flex items-center gap-1 text-xs text-dark-muted mt-1">
                <MapPin className="w-3 h-3" />
                {product.roomType}
              </p>
              <div className="mt-2">
                <StarRating
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                />
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="px-2 py-0.5 rounded-full bg-gray-100 text-[10px] font-medium text-dark-muted">
                  {product.finish}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-[10px] font-semibold text-secondary">
                  {warrantyShort}
                </span>
              </div>
              <p className="text-lg font-bold text-primary mt-3">
                ৳{product.pricePerSqft}
                <span className="text-sm font-normal text-dark-muted">
                  /sqft
                </span>
              </p>
            </div>

            <div className="flex sm:flex-col gap-2 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
              >
                Get Quote
              </Link>
              <Link
                href={`/products/${product.slug}`}
                className="inline-flex items-center justify-center p-2.5 rounded-xl bg-gray-100 text-dark-muted hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="View product details"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-light-muted/50 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      <ProductImage product={product} className="aspect-[4/3]" />

      <div className="p-4">
        <h3 className="text-sm font-heading font-bold text-dark group-hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        <p className="flex items-center gap-1 text-xs text-dark-muted mt-1">
          <MapPin className="w-3 h-3" />
          {product.roomType}
        </p>

        <div className="mt-2">
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        </div>

        <div className="flex items-center justify-between mt-3">
          <p className="text-lg font-bold text-primary">
            ৳{product.pricePerSqft}
            <span className="text-xs font-normal text-dark-muted">/sqft</span>
          </p>
          <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-[10px] font-semibold text-secondary">
            {warrantyShort}
          </span>
        </div>

        <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-gray-100 text-[10px] font-medium text-dark-muted">
          {product.finish}
        </span>

        <div className="flex gap-2 mt-4">
          <Link
            href="/contact"
            className="flex-1 inline-flex items-center justify-center py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
          >
            Get Quote
          </Link>
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center justify-center p-2.5 rounded-xl bg-gray-100 text-dark-muted hover:text-primary hover:bg-primary/10 transition-colors"
            aria-label="View product details"
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
