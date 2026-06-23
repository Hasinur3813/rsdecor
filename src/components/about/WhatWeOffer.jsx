import { Layers, Square, Grid, CheckCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";

const SERVICES = [
  {
    icon: Layers,
    iconColor: "text-primary",
    title: "3D Wallpapers",
    price: "Starting from ৳140/sqft",
    badge: "Most Popular",
    badgeVariant: "primary",
    features: [
      "Waterproof fabric material",
      "Washable with soap & water",
      "Tear-resistant",
      "Imported from China",
      "10 Year Warranty",
      "20-25 years lifespan",
    ],
  },
  {
    icon: Square,
    iconColor: "text-secondary",
    title: "3D Ceiling Papers",
    price: "Starting from ৳140/sqft",
    badge: "Top Rated",
    badgeVariant: "secondary",
    features: [
      "Same premium fabric as wallpapers",
      "Washable & tear-resistant",
      "Lightweight ceiling-safe adhesive",
      "China imported",
      "10 Year Warranty",
    ],
  },
  {
    icon: Grid,
    iconColor: "text-dark",
    title: "3D Epoxy Floors",
    price: "Starting from ৳450/sqft",
    badge: "Premium",
    badgeVariant: "dark",
    features: [
      "Professional epoxy resin",
      "2x stronger than tiles",
      "No joints — seamless finish",
      "Impact resistant",
      "Lifetime Guarantee",
    ],
  },
];

export default function WhatWeOffer() {
  return (
    <section id="what-we-offer" className="scroll-mt-20 py-16 md:py-24 bg-white">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-3">
            What We Offer
          </h2>
          <p className="text-dark-muted">
            Three premium services. One trusted team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="group relative rounded-2xl bg-light border border-light-muted/50 p-6 md:p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <Badge
                variant={service.badgeVariant}
                size="xs"
                className="absolute top-4 right-4"
              >
                {service.badge}
              </Badge>

              <service.icon className={`w-10 h-10 ${service.iconColor} mb-5`} />

              <h3 className="text-xl font-heading font-bold text-dark mb-1">
                {service.title}
              </h3>
              <p className="text-sm font-semibold text-primary mb-5">
                {service.price}
              </p>

              <ul className="space-y-2.5">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-dark-muted"
                  >
                    <CheckCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-dark-muted mt-10">
          All prices include labor and installation. Site visit available —
          only travelling cost applies.
        </p>
      </Container>
    </section>
  );
}
