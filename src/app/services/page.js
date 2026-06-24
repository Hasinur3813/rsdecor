import ServicesHero from "@/components/services/ServicesHero";
import ServiceCard from "@/components/services/ServiceCard";
import ServicesTabSection from "@/components/services/ServicesTabSection";
import ServiceProcess from "@/components/services/ServiceProcess";
import BeforeAfterSlider from "@/components/services/BeforeAfterSlider";
import ServiceComparison from "@/components/services/ServiceComparison";
import ServicesCostEstimator from "@/components/services/ServicesCostEstimator";
import ServiceAreas from "@/components/services/ServiceAreas";
import ServicesCTA from "@/components/services/ServicesCTA";

export const metadata = {
  title: "Our Services | RS Wallpaper & Floor",
  description:
    "Professional 3D wallpaper, ceiling paper and epoxy floor installation across Bangladesh. Free site visit. 10-year warranty. Starting ৳140/sqft.",
};

export default function ServicesPage() {
  const wallpaperData = {
    icon: "Layers",
    iconColor: "#C8956C",
    title: "3D Wallpapers",
    tagline: "Transform your walls into art",
    price: "৳140",
    unit: "/sqft",
    warranty: "10 Year Warranty",
    warrantyIcon: "Shield",
    badge: "Most Popular",
    color: "#C8956C",
    features: [
      "High-quality imported fabric",
      "Waterproof & washable",
      "Tear-resistant",
      "6000+ design options",
      "Professional installation",
      "10-year warranty",
    ],
    cta: "Get Wallpaper Quote",
    href: "/services#wallpaper",
  };

  const ceilingData = {
    icon: "Square",
    iconColor: "#4A7C6F",
    title: "3D Ceiling Papers",
    tagline: "Elevate your interiors",
    price: "৳140",
    unit: "/sqft",
    warranty: "10 Year Warranty",
    warrantyIcon: "Shield",
    badge: "Premium",
    color: "#4A7C6F",
    features: [
      "Premium ceiling-specific material",
      "Easy to install & maintain",
      "Adds depth & luxury",
      "Wide range of designs",
      "Professional installation",
      "10-year warranty",
    ],
    cta: "Get Ceiling Quote",
    href: "/services#ceiling",
  };

  const epoxyData = {
    icon: "Grid",
    iconColor: "#C8956C",
    title: "3D Epoxy Floors",
    tagline: "Seamless & stunning floors",
    price: "৳450",
    unit: "/sqft",
    warranty: "Lifetime Guarantee",
    warrantyIcon: "Shield",
    badge: "Premium",
    color: "#C8956C",
    features: [
      "Industrial-grade epoxy resin",
      "2x stronger than tiles",
      "Completely seamless",
      "Waterproof & stain-resistant",
      "Professional installation",
      "Lifetime guarantee",
    ],
    cta: "Get Epoxy Quote",
    href: "/services#epoxy",
  };

  return (
    <main className="min-h-screen bg-light">
      {/* <ServicesHero /> */}

      {/* Service Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-dark">
            What We Offer
          </h2>
          <p className="text-gray-500 mt-3">
            Three premium services. One trusted team.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard service={wallpaperData} />
          <ServiceCard service={ceilingData} featured={true} />
          <ServiceCard service={epoxyData} />
        </div>
      </section>

      <ServicesTabSection />
      <ServiceProcess />
      <BeforeAfterSlider />
      <ServiceComparison />
      <ServicesCostEstimator />
      <ServiceAreas />
      <ServicesCTA />
    </main>
  );
}
