"use client";

import { useState } from "react";
import Link from "next/link";

export default function ServicesTabSection() {
  const [activeTab, setActiveTab] = useState("wallpaper");

  const services = {
    wallpaper: {
      id: "wallpaper",
      badge: "Wallpapers",
      title: "3D Wallpapers",
      description:
        "Our premium 3D wallpapers transform ordinary walls into stunning focal points. Made from high-quality, washable fabric, they are durable, fade-resistant, and easy to maintain. With thousands of designs to choose from, you can create the perfect look for any room in your home.",
      includes: [
        "Professional site measurement",
        "Surface preparation advice",
        "Premium imported adhesive",
        "Expert installation with attention to detail",
        "Perfect edge finishing",
        "Complete cleanup after installation",
        "10-year warranty card",
      ],
      idealFor: [
        "Living Room",
        "Bedroom",
        "Kids Room",
        "Dining Room",
        "Office",
        "Commercial Space",
      ],
      price: "140",
      specs: [
        { icon: "Price", label: "Price per sqft", value: "৳140" },
        { icon: "Shield", label: "Warranty", value: "10 Years" },
        { icon: "Globe", label: "Material Origin", value: "Imported" },
        { icon: "Clock", label: "Installation Time", value: "3–4 Days" },
        {
          icon: "Paintbrush",
          label: "Surface Requirement",
          value: "Smooth & Dry",
        },
        { icon: "Calendar", label: "Lifespan", value: "20–25 Years" },
        { icon: "Droplets", label: "Maintenance", value: "Washable" },
      ],
    },
    ceiling: {
      id: "ceiling",
      badge: "Ceiling Papers",
      title: "3D Ceiling Papers",
      description:
        "Elevate your interiors with our stunning 3D ceiling papers. Designed specifically for ceiling applications, they add depth, elegance, and a touch of luxury to any room. Whether you want a subtle texture or a bold pattern, our ceiling papers deliver exceptional results.",
      includes: [
        "Professional site measurement",
        "Surface preparation advice",
        "Premium imported adhesive",
        "Expert installation with precision",
        "Perfect edge finishing",
        "Complete cleanup after installation",
        "10-year warranty card",
      ],
      idealFor: [
        "Bedroom",
        "Living Room",
        "Dining Room",
        "Office",
        "Hotel Lobby",
        "Restaurant",
      ],
      price: "140",
      specs: [
        { icon: "Price", label: "Price per sqft", value: "৳140" },
        { icon: "Shield", label: "Warranty", value: "10 Years" },
        { icon: "Globe", label: "Material Origin", value: "Imported" },
        { icon: "Clock", label: "Installation Time", value: "3–4 Days" },
        {
          icon: "Paintbrush",
          label: "Surface Requirement",
          value: "Smooth & Dry",
        },
        { icon: "Calendar", label: "Lifespan", value: "20–25 Years" },
        { icon: "Droplets", label: "Maintenance", value: "Washable" },
      ],
    },
    epoxy: {
      id: "epoxy",
      badge: "Epoxy Floors",
      title: "3D Epoxy Floors",
      description:
        "Our premium 3D epoxy floors create seamless, stunning surfaces that are incredibly durable and easy to maintain. Made from industrial-grade epoxy resin, they are twice as strong as traditional tiles and completely waterproof. Perfect for homes, offices, and commercial spaces.",
      includes: [
        "Professional site inspection",
        "Surface grinding & preparation",
        "High-quality primer coat",
        "Premium base epoxy coat",
        "Custom 3D design layer",
        "Protective top clear coat",
        "Final polish & finishing",
        "Lifetime guarantee certificate",
      ],
      idealFor: [
        "Living Room",
        "Bedroom",
        "Kitchen",
        "Bathroom",
        "Office",
        "Showroom",
        "Garage",
      ],
      price: "450",
      specs: [
        { icon: "Price", label: "Price per sqft", value: "৳450" },
        { icon: "Shield", label: "Warranty", value: "Lifetime" },
        { icon: "Globe", label: "Material Origin", value: "Premium Grade" },
        { icon: "Clock", label: "Installation Time", value: "3–4 Days" },
        {
          icon: "Paintbrush",
          label: "Surface Requirement",
          value: "Concrete Base",
        },
        { icon: "Calendar", label: "Lifespan", value: "Lifetime" },
        { icon: "Droplets", label: "Maintenance", value: "Easy Clean" },
      ],
    },
  };

  const currentService = services[activeTab];

  return (
    <section
      id={activeTab}
      className="container mx-auto px-4 py-16 scroll-mt-20"
    >
      <div className="text-center mb-12">
        <h2 className="font-playfair text-4xl font-bold text-dark mb-3">
          Explore Our Services
        </h2>
        <p className="text-gray-500">
          Detailed information for each premium service
        </p>
      </div>

      {/* Tab Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {Object.values(services).map((service) => (
          <button
            key={service.id}
            onClick={() => setActiveTab(service.id)}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === service.id
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {service.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left - Detailed Info */}
        <div>
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            {currentService.badge}
          </span>
          <h3 className="font-playfair text-3xl font-bold text-dark mb-6">
            {currentService.title}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-8">
            {currentService.description}
          </p>

          {/* What's Included */}
          <div className="mb-8">
            <h4 className="font-bold text-dark text-lg mb-4">
              What's Included
            </h4>
            <ul className="space-y-3">
              {currentService.includes.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <PackageCheck className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ideal For */}
          <div className="mb-8">
            <h4 className="font-bold text-dark text-lg mb-4">Ideal For</h4>
            <div className="flex flex-wrap gap-2">
              {currentService.idealFor.map((room, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium"
                >
                  {room}
                </span>
              ))}
            </div>
          </div>

          {/* Price Note */}
          <div className="p-5 rounded-2xl bg-primary/10 border border-primary/20">
            <p className="text-dark font-semibold mb-2">
              Starting from ৳{currentService.price}/sqft — all inclusive
            </p>
            <p className="text-gray-600 text-sm">
              No hidden charges. Full breakdown given before work begins.
            </p>
          </div>
        </div>

        {/* Right - Specs Card */}
        <div>
          <div className="sticky top-24 bg-light rounded-2xl p-6">
            <h4 className="font-bold text-dark text-lg mb-6">Quick Specs</h4>
            <div className="space-y-4 mb-8">
              {currentService.specs.map((spec, i) => {
                const SpecIcon = getSpecIcon(spec.icon);
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      {SpecIcon && (
                        <SpecIcon className="w-5 h-5 text-primary" />
                      )}
                      <span className="text-gray-600">{spec.label}</span>
                    </div>
                    <span className="font-semibold text-dark">
                      {spec.value}
                    </span>
                  </div>
                );
              })}
            </div>
            <Link
              href={`https://wa.me/+8801976600300?text=${encodeURIComponent(
                `Hi! I'd like to get a quote for ${currentService.title} service.`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3.5 rounded-xl bg-primary text-white font-semibold text-center transition-all hover:opacity-90"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function getSpecIcon(name) {
  const icons = {
    Price: TagsIcon,
    Shield: ShieldIcon,
    Globe: GlobeIcon,
    Clock: ClockIcon,
    Paintbrush: PaintbrushIcon,
    Calendar: CalendarIcon,
    Droplets: DropletsIcon,
  };
  return icons[name] || null;
}

import {
  PackageCheck,
  Tags as TagsIcon,
  Shield as ShieldIcon,
  Globe as GlobeIcon,
  Clock as ClockIcon,
  Paintbrush as PaintbrushIcon,
  Calendar as CalendarIcon,
  Droplets as DropletsIcon,
} from "lucide-react";
