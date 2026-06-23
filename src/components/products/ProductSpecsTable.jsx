
export default function ProductSpecsTable({ product }) {
  const isEpoxy = product.category === "3D Epoxy Floor";
  const isWallpaperOrCeiling = product.category === "3D Wallpaper" || product.category === "3D Ceiling Paper";

  const commonSpecs = [
    { label: "Product Name", value: product.name },
    { label: "Category", value: product.category },
    { label: "Best For", value: product.roomType },
    { label: "Finish", value: product.finish },
    { label: "Color Family", value: product.colorFamily },
    { label: "Price", value: `৳${product.pricePerSqft}/sqft` },
    { label: "Warranty", value: product.warranty },
    { label: "Rating", value: `${product.rating} (${product.reviewCount} reviews)` },
    { label: "Installation", value: "Professional (Included)" },
    { label: "Install Time", value: "3-4 days" },
  ];

  const extraSpecs = isEpoxy
    ? [
        { label: "Material", value: "Epoxy Resin" },
        { label: "Strength", value: "2x Stronger Than Tiles" },
        { label: "Joints", value: "Seamless" },
        { label: "Cure Time", value: "24-48 hours" },
        { label: "Surface Required", value: "Clean & Dry" },
        { label: "Maintenance", value: "Easy - Mop with Mild Detergent" },
        { label: "Guarantee", value: "Lifetime" },
      ]
    : [
        { label: "Material", value: product.material },
        { label: "Water Resistance", value: "100% Waterproof" },
        { label: "Washable", value: "Yes" },
        { label: "Tear Resistant", value: "Yes" },
        { label: "Lifespan", value: "20-25 Years" },
        { label: "Surface Required", value: "Smooth & Dry" },
        { label: "Adhesive Type", value: "Premium (Included)" },
      ];

  const allSpecs = [...commonSpecs, ...extraSpecs];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-light-muted overflow-hidden">
      <div className="p-6 border-b border-light-muted bg-dark">
        <h2 className="text-2xl font-heading font-bold text-white">
          Full Specifications
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody>
            {allSpecs.map((spec, index) => (
              <tr
                key={index}
                className={`border-b border-light-muted ${index % 2 === 0 ? "bg-light" : "bg-white"}`}
              >
                <td className="px-6 py-4 font-semibold text-dark w-1/3">
                  {spec.label}
                </td>
                <td className="px-6 py-4 text-dark-muted">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
