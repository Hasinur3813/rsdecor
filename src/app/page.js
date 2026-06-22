import Hero from "@/components/sections/Hero";
import AnnouncementStrip from "@/components/sections/AnnouncementStrip";
import Categories from "@/components/sections/Categories";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import PriceCalculator from "@/components/sections/PriceCalculator";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <main className="flex-1 overflow-x-hidden">
      <Hero />
      <AnnouncementStrip />
      <Categories />
      <FeaturedProducts />
      <WhyChooseUs />
      <PriceCalculator />
      <Stats />
      <Testimonials />
      <CTABanner />
    </main>
  );
}
