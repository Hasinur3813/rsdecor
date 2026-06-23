import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const HERO_STATS = [
  { value: "7+", label: "Years" },
  { value: "4000+", label: "Clients" },
  { value: "5000+", label: "Projects" },
  { value: "6000+", label: "Designs" },
];

export default function AboutHero() {
  return (
    <section
      id="about-hero"
      className="relative scroll-mt-20 overflow-hidden bg-[#1C1C1C]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-secondary/20" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <Container className="relative z-10 py-16 md:py-24 lg:py-28">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-white/50 mb-8"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/80">About Us</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <Badge variant="primary" size="md" className="mb-5">
              Est. 2017 · Natore → All Bangladesh
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.1] mb-6">
              We Transform Spaces Into Masterpieces
            </h1>

            <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-xl mb-8">
              RS 3D Wallpaper & Floor has been beautifying Bangladeshi homes for
              over 7 years with premium 3D wallpapers, ceiling papers, and
              epoxy floors — all backed by industry-leading warranties.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button variant="filled" size="lg" href="/gallery">
                View Our Work
              </Button>
              <Button variant="outline" size="lg" href="/contact">
                Contact Us
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-5 md:p-6 text-center"
              >
                <p className="text-3xl md:text-4xl font-heading font-bold text-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-white/70 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
