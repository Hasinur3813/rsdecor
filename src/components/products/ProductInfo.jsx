import { Shield, CheckCircle, Truck, Clock } from "lucide-react";

export default function ProductInfo({ product }) {
  const isEpoxy = product.category === "3D Epoxy Floor";

  const features = isEpoxy
    ? [
        "Epoxy Resin Construction",
        "2x Stronger Than Tiles",
        "Seamless No Joints",
        "Impact Resistant",
        "Lifetime Guarantee",
      ]
    : [
        "Waterproof Fabric",
        "Washable Surface",
        "Tear Resistant",
        "10 Year Warranty",
        "20-25 Year Lifespan",
        "Professional Installation",
      ];

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Badge Row */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs sm:text-sm font-semibold">
          {product.category}
        </span>
        <span className="px-3 py-1 rounded-full bg-gray-100 text-dark-muted text-xs sm:text-sm font-medium">
          {product.roomType}
        </span>
        {product.isNew && (
          <span className="px-3 py-1 rounded-full bg-secondary text-white text-xs sm:text-sm font-semibold">
            New
          </span>
        )}
        {product.isBestSeller && (
          <span className="px-3 py-1 rounded-full bg-primary text-white text-xs sm:text-sm font-semibold">
            Best Seller
          </span>
        )}
      </div>

      {/* Product Name */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-dark leading-tight">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-amber-400 text-lg sm:text-xl">
          {"★".repeat(Math.round(product.rating))}
          {"☆".repeat(5 - Math.round(product.rating))}
        </span>
        <span className="font-bold text-dark">{product.rating}</span>
        <span className="text-dark-muted text-sm">
          ({product.reviewCount} reviews)
        </span>
        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
          Verified Purchase
        </span>
      </div>

      {/* Price Block */}
      <div className="bg-light rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-heading font-bold text-primary">
            ৳{product.pricePerSqft}
          </span>
          <span className="text-base sm:text-lg text-dark-muted">/sqft</span>
        </div>
        <p className="text-dark-muted text-sm sm:text-base">
          All inclusive — materials + labor + installation
        </p>
        <div className="flex items-center gap-2">
          <Shield className="w-4 sm:w-5 h-4 sm:h-5 text-secondary" />
          <span className="font-semibold text-dark text-sm sm:text-base">
            {product.warranty} Warranty
          </span>
        </div>
      </div>

      {/* Quick Specs */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div className="border border-light-muted rounded-xl p-3 sm:p-4 bg-white">
          <p className="text-[10px] sm:text-xs text-dark-muted uppercase tracking-wide">
            Material
          </p>
          <p className="font-semibold text-dark text-sm sm:text-base">
            {product.material}
          </p>
        </div>
        <div className="border border-light-muted rounded-xl p-3 sm:p-4 bg-white">
          <p className="text-[10px] sm:text-xs text-dark-muted uppercase tracking-wide">
            Finish
          </p>
          <p className="font-semibold text-dark text-sm sm:text-base">
            {product.finish}
          </p>
        </div>
        <div className="border border-light-muted rounded-xl p-3 sm:p-4 bg-white">
          <p className="text-[10px] sm:text-xs text-dark-muted uppercase tracking-wide">
            Best For
          </p>
          <p className="font-semibold text-dark text-sm sm:text-base">
            {product.roomType}
          </p>
        </div>
        <div className="border border-light-muted rounded-xl p-3 sm:p-4 bg-white">
          <p className="text-[10px] sm:text-xs text-dark-muted uppercase tracking-wide">
            Washable
          </p>
          <p className="font-semibold text-dark text-sm sm:text-base">Yes</p>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-secondary flex-shrink-0" />
            <span className="text-dark text-sm sm:text-base">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Buttons */}
      <div className="flex flex-col gap-3">
        <a
          href={`https://wa.me/+8801772132818?text=${encodeURIComponent(`Hi! I want a quote for ${product.name}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 sm:py-4 rounded-2xl bg-primary text-white font-semibold text-base sm:text-lg hover:bg-primary-dark transition-all shadow-md hover:shadow-lg text-center"
        >
          Get Free Quote
        </a>
        <a
          href="tel:+8801772132818"
          className="w-full py-3 sm:py-4 rounded-2xl bg-secondary text-white font-semibold text-base sm:text-lg hover:bg-secondary-dark transition-all shadow-md hover:shadow-lg text-center"
        >
          Call Now
        </a>
      </div>

      {/* Notes */}
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <div className="flex items-center gap-2 text-dark-muted">
          <Truck className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0" />
          <span className="text-sm sm:text-base">Free site visit</span>
        </div>
        <div className="flex items-center gap-2 text-dark-muted">
          <Clock className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0" />
          <span className="text-sm sm:text-base">Install in 3–4 days</span>
        </div>
      </div>
    </div>
  );
}
