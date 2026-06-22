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
    gradient: "from-[#C8956C]/80 via-[#D4A87E]/60 to-[#E0CBAE]/40",
    emoji: "🏠",
  },
  {
    name: "3D Ceiling Papers",
    count: "80+ Designs",
    gradient: "from-[#4A7C6F]/80 via-[#5E9486]/60 to-[#7FB3A3]/40",
    emoji: "✨",
  },
  {
    name: "3D Epoxy Floors",
    count: "60+ Designs",
    gradient: "from-[#B07A54]/80 via-[#C8956C]/60 to-[#D4B896]/40",
    emoji: "💎",
  },
  {
    name: "Bedroom Designs",
    count: "200+ Designs",
    gradient: "from-[#8B7B9E]/80 via-[#A596B5]/60 to-[#C4B8D2]/40",
    emoji: "🛏️",
  },
  {
    name: "Kids Room",
    count: "150+ Designs",
    gradient: "from-[#E8A87C]/80 via-[#F0C4A0]/60 to-[#F5DCC8]/40",
    emoji: "🧸",
  },
  {
    name: "Office & Commercial",
    count: "90+ Designs",
    gradient: "from-[#3D3D3D]/80 via-[#5A5A5A]/60 to-[#7A7A7A]/40",
    emoji: "🏢",
  },
];

/* ─────────────────────────────────────────
   Category Card
   ───────────────────────────────────────── */
const CategoryCard = ({ name, count, gradient, emoji }) => (
  <a
    href="/products"
    className="group relative flex flex-col bg-light rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
  >
    {/* Image placeholder — gradient with emoji */}
    <div
      className={`relative h-48 md:h-56 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}
    >
      <span className="text-5xl md:text-6xl transition-transform duration-500 group-hover:scale-110">
        {emoji}
      </span>

      {/* Hover overlay */}
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
