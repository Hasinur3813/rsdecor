import Link from "next/link";
import { Heart, ChevronRight } from "lucide-react";

export default function WishlistHero() {
  return (
    <section className="bg-[#2C2C2C] py-12">
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Wishlist</span>
        </nav>

        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-10 h-10 rounded-full bg-[#C8956C]/20 flex items-center justify-center">
            <Heart className="w-6 h-6 text-[#C8956C] fill-[#C8956C]" />
          </div>

          <h1 className="font-[Playfair_Display] text-4xl font-bold text-white">
            My Wishlist
          </h1>

          <p className="text-gray-400 text-sm max-w-sm">
            Save your favourite designs and get a quote anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
