import Image from "next/image";
import { Eye, Heart } from "lucide-react";
import Badge from "./Badge";

/* ─────────────────────────────────────────
   Product Card
   ───────────────────────────────────────── */
const ProductCard = ({ name, category, price, badge, image, alt }) => (
  <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-light-muted/50">
    <div className="relative h-52 md:h-60 overflow-hidden">
      <Image
        src={image}
        alt={alt || name}
        fill
        sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />

      {badge && (
        <Badge
          variant={
            badge === "Premium"
              ? "dark"
              : badge === "New"
                ? "secondary"
                : "primary"
          }
          size="xs"
          className="absolute top-3 left-3 z-10"
        >
          {badge}
        </Badge>
      )}

      <button
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm text-dark-muted hover:text-red-500 hover:bg-white transition-all duration-200"
        aria-label="Add to wishlist"
      >
        <Heart className="w-4 h-4" />
      </button>
    </div>

    <div className="p-4">
      <span className="text-[10px] uppercase tracking-widest text-primary font-semibold">
        {category}
      </span>
      <h3 className="text-sm font-heading font-bold text-dark mt-1 line-clamp-1 group-hover:text-primary transition-colors">
        {name}
      </h3>
      <div className="flex items-center justify-between mt-3">
        <p className="text-sm font-bold text-dark">
          From <span className="text-primary">{price}</span>
        </p>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-dark transition-colors">
          <Eye className="w-3.5 h-3.5" />
          View Details
        </button>
      </div>
    </div>
  </div>
);

export default ProductCard;
