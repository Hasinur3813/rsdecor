import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ProductBreadcrumb({ product }) {
  return (
    <>
      <nav className="container mx-auto px-4 pt-6">
        <ol className="flex items-center gap-2 text-sm text-dark-muted">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="w-4 h-4" />
          </li>
          <li>
            <Link
              href="/products"
              className="hover:text-primary transition-colors"
            >
              Products
            </Link>
          </li>
          <li>
            <ChevronRight className="w-4 h-4" />
          </li>
          <li>
            <Link
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className="hover:text-primary transition-colors"
            >
              {product.category}
            </Link>
          </li>
          <li>
            <ChevronRight className="w-4 h-4" />
          </li>
          <li className="text-primary font-medium truncate max-w-[200px]">
            {product.name}
          </li>
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://rsdecor.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Products",
                item: "https://rsdecor.com/products",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: product.category,
                item: `https://rsdecor.com/products?category=${encodeURIComponent(product.category)}`,
              },
              {
                "@type": "ListItem",
                position: 4,
                name: product.name,
              },
            ],
          }),
        }}
      />
    </>
  );
}
