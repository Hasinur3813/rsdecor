import CartHero from "@/components/cart/CartHero";
import CartClient from "@/components/cart/CartClient";

export const metadata = {
  title: "My Cart | RS Wallpaper & Floor",
  description: "Review your selected designs and get a quote.",
};

export default function CartPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      <CartHero />
      <CartClient />
    </main>
  );
}
