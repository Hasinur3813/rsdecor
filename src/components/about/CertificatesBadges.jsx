import {
  Shield,
  Infinity,
  Award,
  Users,
  Package,
  Truck,
} from "lucide-react";
import Container from "@/components/ui/Container";

const BADGES = [
  {
    icon: Shield,
    title: "10 Year Warranty",
    subtitle: "Wallpapers & Ceiling Papers",
  },
  {
    icon: Infinity,
    title: "Lifetime Guarantee",
    subtitle: "Epoxy Floors",
  },
  {
    icon: Award,
    title: "7+ Years Experience",
    subtitle: "Est. 2017",
  },
  {
    icon: Users,
    title: "4000+ Happy Clients",
    subtitle: "All over Bangladesh",
  },
  {
    icon: Package,
    title: "China Imported Materials",
    subtitle: "Premium fabric paper",
  },
  {
    icon: Truck,
    title: "Site Visit Available",
    subtitle: "Travelling cost only",
  },
];

export default function CertificatesBadges() {
  return (
    <section id="trust-badges" className="scroll-mt-20 py-16 md:py-24 bg-white">
      <Container>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark text-center mb-12 md:mb-16">
          Why Thousands Trust Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {BADGES.map((badge) => (
            <div
              key={badge.title}
              className="rounded-xl bg-light p-6 border border-transparent hover:border-primary/30 transition-colors duration-200"
            >
              <badge.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-base font-heading font-bold text-dark mb-1">
                {badge.title}
              </h3>
              <p className="text-sm text-dark-muted">{badge.subtitle}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
