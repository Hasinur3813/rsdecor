import WishlistHero from "@/components/wishlist/WishlistHero";
import WishlistClient from "@/components/wishlist/WishlistClient";

export const metadata = {
  title: "My Wishlist | RS Wallpaper & Floor",
  description: "Your saved 3D wallpaper, ceiling paper and epoxy floor designs.",
};

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      <WishlistHero />
      <WishlistClient />
    </main>
  );
}
