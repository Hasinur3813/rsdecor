import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

/* ─────────────────────────────────────────
   Category data
   ───────────────────────────────────────── */
const CATEGORIES = [
  {
    name: "3D Wallpapers",
    count: "120+ Designs",
    image: "/categories/wallpaper.jpg",
    alt: "3D wallpaper interior design",
  },
  {
    name: "3D Ceiling Papers",
    count: "80+ Designs",
    image: "/categories/celingpaper.jpg",
    alt: "3D ceiling paper installation",
  },
  {
    name: "3D Epoxy Floors",
    count: "60+ Designs",
    image: "/categories/floor.jpg",
    alt: "3D epoxy floor finish",
  },
  {
    name: "Bedroom Designs",
    count: "200+ Designs",
    image: "/categories/bedroom.jpg",
    alt: "Bedroom wallpaper design",
  },
  {
    name: "Kids Room",
    count: "150+ Designs",
    image: "/categories/kids.jpg",
    alt: "Kids room wallpaper design",
  },
  {
    name: "Office & Commercial",
    count: "90+ Designs",
    image: "/categories/office.jpg",
    alt: "Office and commercial interior design",
  },
];

/* ─────────────────────────────────────────
   Category Card
   ───────────────────────────────────────── */
const CategoryCard = ({ name, count, image, alt }) => (
  <a
    href="/products"
    className="group relative flex flex-col bg-light rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
  >
    <div className="relative h-48 md:h-56 overflow-hidden">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
    </div>

    {/* Content */}
    <div className="flex items-center justify-between p-4 md:p-5">
      <div>
        <h3 className="text-base font-heading font-bold text-dark group-hover:text-primary transition-colors duration-200">
          {name}
        </h3>
        <p className="text-xs text-dark-muted mt-0.5">{count}</p>
      </div>

      {/* Arrow */}
      <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
        <ArrowUpRight className="w-4 h-4" />
      </span>
    </div>
  </a>
);

/* ─────────────────────────────────────────
   Categories Section
   ───────────────────────────────────────── */
export default function Categories() {
  return (
    <section id="categories" className="py-16 md:py-24 bg-white">
      <Container>
        <SectionTitle
          subtitle="Our Collections"
          title="Browse by Category"
          description="Explore our curated categories to find the perfect design for every room in your home."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.name} {...cat} />
          ))}
        </div>
      </Container>
    </section>
  );
}
