import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";

const STATS = ["6000+ Designs", "3 Categories", "All Bangladesh Delivery"];

export default function ProductsHero() {
  return (
    <section
      id="products-hero"
      className="relative scroll-mt-20 overflow-hidden bg-dark py-14 md:py-16"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/25 via-transparent to-transparent" />

      <Container className="relative z-10">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-white/50 mb-6"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/80">Products</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
              Our Product Collection
            </h1>
            <p className="text-sm md:text-base text-white/60">
              6000+ designs across wallpapers, ceiling papers and epoxy floors
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {STATS.map((stat) => (
              <span
                key={stat}
                className="px-4 py-2 rounded-full bg-white/10 text-white text-xs md:text-sm font-medium"
              >
                {stat}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
