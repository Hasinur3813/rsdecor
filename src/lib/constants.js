/* =========================================
   RS Decor — Site Constants
   ========================================= */

// --- Navigation Links ---
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products", hasMegaMenu: true },
  { label: "Gallery", href: "/gallery" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// --- Unified Product Categories ---
// Single source of truth for mega menu, sidebar filters, and footer.
// `filter` maps directly to the product filter system's URL search params.
export const PRODUCT_CATEGORIES = {
  wallpapers: {
    title: "Wallpapers",
    items: [
      { label: "3D Wallpapers", slug: "3d-wallpapers", filter: { category: "3D Wallpaper" } },
      { label: "Ceiling Papers", slug: "ceiling-papers", filter: { category: "3D Ceiling Paper" } },
      { label: "Kids Room", slug: "kids-room", filter: { category: "3D Wallpaper", room: "Kids Room" } },
      { label: "Bedroom", slug: "bedroom", filter: { category: "3D Wallpaper", room: "Bedroom" } },
      { label: "Living Room", slug: "living-room", filter: { category: "3D Wallpaper", room: "Living Room" } },
      { label: "Office", slug: "office", filter: { category: "3D Wallpaper", room: "Office" } },
    ],
  },
  flooring: {
    title: "Flooring",
    items: [
      { label: "3D Epoxy Floor", slug: "3d-epoxy-floor", filter: { category: "3D Epoxy Floor" } },
      { label: "Marble Finish", slug: "marble-finish", filter: { category: "3D Epoxy Floor", finish: "Matte" } },
      { label: "Metallic Finish", slug: "metallic-finish", filter: { category: "3D Epoxy Floor", finish: "Metallic" } },
    ],
  },
  featured: {
    title: "Featured",
    label: "New Arrivals",
    description: "Discover our latest premium collection of wallpapers and flooring.",
    image: "/images/featured-arrivals.jpg",
  },
};

/**
 * Build a /products?... URL from a filter object.
 * Used by mega menu, footer, and anywhere else that links to filtered products.
 */
export function buildProductFilterURL(filter) {
  const params = new URLSearchParams();
  if (filter.category) params.set("category", filter.category);
  if (filter.room) params.set("room", filter.room);
  if (filter.finish) params.set("finish", filter.finish);
  if (filter.tags) params.set("tags", filter.tags);
  const query = params.toString();
  return query ? `/products?${query}` : "/products";
}

// --- Footer Link Groups ---
export const FOOTER_LINKS = {
  products: [
    ...PRODUCT_CATEGORIES.wallpapers.items.slice(0, 3).map((item) => ({
      label: item.label,
      href: buildProductFilterURL(item.filter),
    })),
    ...PRODUCT_CATEGORIES.flooring.items.slice(0, 1).map((item) => ({
      label: item.label,
      href: buildProductFilterURL(item.filter),
    })),
    { label: "Kids Room Wallpaper", href: buildProductFilterURL({ category: "3D Wallpaper", room: "Kids Room" }) },
    { label: "Office Wallpaper", href: buildProductFilterURL({ category: "3D Wallpaper", room: "Office" }) },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Portfolio", href: "/gallery" },
    { label: "Services", href: "/services" },
    { label: "FAQ", href: "/faq" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Return Policy", href: "/returns" },
  ],
};

// --- Social Links ---
export const SOCIAL_LINKS = [
  { platform: "facebook", href: "https://facebook.com/rsdecor", label: "Facebook" },
  { platform: "youtube", href: "https://youtube.com/@rsdecor", label: "YouTube" },
  { platform: "whatsapp", href: "https://wa.me/8801772132818", label: "WhatsApp" },
];

// --- Product Placeholders ---
export const PRODUCT_PLACEHOLDERS = [
  {
    id: 1,
    name: "Royal Marble 3D Wallpaper",
    slug: "royal-marble-3d-wallpaper",
    category: "3D Wallpapers",
    price: 1200,
    currency: "BDT",
    image: "/images/products/placeholder-1.jpg",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Golden Damask Ceiling Paper",
    slug: "golden-damask-ceiling-paper",
    category: "Ceiling Papers",
    price: 950,
    currency: "BDT",
    image: "/images/products/placeholder-2.jpg",
    badge: "New",
  },
  {
    id: 3,
    name: "Ocean Wave Epoxy Floor",
    slug: "ocean-wave-epoxy-floor",
    category: "Epoxy Floors",
    price: 3500,
    currency: "BDT",
    image: "/images/products/placeholder-3.jpg",
    badge: null,
  },
  {
    id: 4,
    name: "Brick Stone 3D Panel",
    slug: "brick-stone-3d-panel",
    category: "3D Wallpapers",
    price: 1100,
    currency: "BDT",
    image: "/images/products/placeholder-4.jpg",
    badge: "Popular",
  },
  {
    id: 5,
    name: "Floral Luxury Ceiling Art",
    slug: "floral-luxury-ceiling-art",
    category: "Ceiling Papers",
    price: 1400,
    currency: "BDT",
    image: "/images/products/placeholder-5.jpg",
    badge: null,
  },
  {
    id: 6,
    name: "Galaxy Metallic Epoxy",
    slug: "galaxy-metallic-epoxy",
    category: "Epoxy Floors",
    price: 4200,
    currency: "BDT",
    image: "/images/products/placeholder-6.jpg",
    badge: "Premium",
  },
];

// --- Homepage(section) Category List ---
export const CATEGORIES = [
  {
    name: "3D Wallpapers",
    slug: "3d-wallpapers",
    description: "Transform your walls with stunning 3D visual effects.",
    image: "/images/categories/3d-wallpapers.jpg",
  },
  {
    name: "Ceiling Papers",
    slug: "ceiling-papers",
    description: "Elegant ceiling designs for a luxurious finish.",
    image: "/images/categories/ceiling-papers.jpg",
  },
  {
    name: "Epoxy Floors",
    slug: "epoxy-floors",
    description: "Durable, glossy epoxy flooring solutions.",
    image: "/images/categories/epoxy-floors.jpg",
  },
  {
    name: "Custom Designs",
    slug: "custom-designs",
    description: "Bespoke wallpaper and floor designs tailored to you.",
    image: "/images/categories/custom-designs.jpg",
  },
];

// --- Site Info ---
export const SITE_INFO = {
  name: "RS 3D Wallpaper & Floor",
  shortName: "RS Wallpaper",
  owner: "Md. Rasel Khandaker",
  tagline: "Premium 3D wallpapers, ceiling papers & epoxy floors for beautiful Bangladeshi homes.",
  phones: ["01772-132818", "01976-600300"],
  whatsapp: "01772-132818",
  email: "info@rswallfloor.com",
  address: "Natore, Rajshahi, Bangladesh",
  hours: "Sat–Thu, 9 AM – 8 PM",
  stats: [
    { label: "Years Experience", value: "7+" },
    { label: "Happy Clients", value: "4000+" },
    { label: "All Bangladesh", value: "🇧🇩" },
  ],
};
