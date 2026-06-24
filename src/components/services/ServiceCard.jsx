import Link from "next/link";
import { Layers, Shield, Square, Grid, CheckCircle } from "lucide-react";

const iconMap = {
  Layers: Layers,
  Shield: Shield,
  Square: Square,
  Grid: Grid,
};

export default function ServiceCard({ service, featured = false }) {
  const Icon = iconMap[service.icon];
  const WarrantyIcon = iconMap[service.warrantyIcon];

  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative ${
        featured ? "ring-2 ring-primary scale-105" : ""
      }`}
    >
      {/* Badge for featured */}
      {featured && (
        <div className="absolute -top-3 -right-3 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
          Most Popular
        </div>
      )}

      {/* Icon */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
        style={{ backgroundColor: `${service.color}15` }}
      >
        {Icon && <Icon className="w-8 h-8" style={{ color: service.color }} />}
      </div>

      {/* Title & Tagline */}
      <h3 className="font-playfair text-xl font-bold text-dark mb-2">
        {service.title}
      </h3>
      <p className="text-gray-500 text-sm mb-6">{service.tagline}</p>

      {/* Price Block */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2 mb-2">
          <span
            className="font-playfair text-3xl font-bold"
            style={{ color: service.color }}
          >
            {service.price}
          </span>
          <span className="text-gray-500">{service.unit}</span>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm">
          {WarrantyIcon && (
            <WarrantyIcon
              className="w-4 h-4"
              style={{ color: service.color }}
            />
          )}
          {service.warranty}
        </div>
      </div>

      {/* Features */}
      <ul className="mb-6 space-y-2">
        {service.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 shrink-0 text-secondary" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Link
        href={`https://wa.me/+8801772132818?text=${encodeURIComponent(
          `Hi! I'd like to get a quote for ${service.title} service.`,
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full py-3 rounded-xl text-white font-semibold text-center transition-all hover:opacity-90"
        style={{ backgroundColor: service.color }}
      >
        {service.cta}
      </Link>
    </div>
  );
}
