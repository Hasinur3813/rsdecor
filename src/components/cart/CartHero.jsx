import Link from "next/link";
import { ShoppingCart, ChevronRight } from "lucide-react";

export default function CartHero() {
  return (
    <section className="py-8 bg-[#2C2C2C]">
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-2 text-white text-sm mb-6">
          <Link href="/" className="hover:text-[#C8956C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400">Cart</span>
        </nav>
        <div className="text-center">
          <ShoppingCart className="w-10 h-10 text-[#C8956C] mx-auto mb-4" />
          <h1 className="text-4xl font-heading text-white mb-2">My Cart</h1>
          <p className="text-gray-400 text-sm">
            Review your designs, adjust dimensions and request a quote.
          </p>
        </div>
      </div>
    </section>
  );
}
