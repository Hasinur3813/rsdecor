import { CheckCircle, X } from "lucide-react";

export default function ServiceComparison() {
  const features = [
    {
      name: "Price",
      wallpaper: "৳140/sqft",
      ceiling: "৳140/sqft",
      epoxy: "৳450/sqft",
    },
    {
      name: "Warranty",
      wallpaper: "10 Years",
      ceiling: "10 Years",
      epoxy: "Lifetime",
    },
    {
      name: "Material",
      wallpaper: "Fabric Paper",
      ceiling: "Fabric Paper",
      epoxy: "Epoxy Resin",
    },
    { name: "Washable", wallpaper: true, ceiling: true, epoxy: true },
    {
      name: "Install Time",
      wallpaper: "3–4 Days",
      ceiling: "3–4 Days",
      epoxy: "3–4 Days",
    },
    {
      name: "Lifespan",
      wallpaper: "20–25 Years",
      ceiling: "20–25 Years",
      epoxy: "Lifetime",
    },
    {
      name: "Best For",
      wallpaper: "Walls",
      ceiling: "Ceilings",
      epoxy: "Floors",
    },
    { name: "Customizable", wallpaper: true, ceiling: true, epoxy: true },
    { name: "Free Site Visit", wallpaper: true, ceiling: true, epoxy: true },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="font-playfair text-4xl font-bold text-dark mb-3">
          Which Service Is Right for You?
        </h2>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-150 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-dark text-white">
                <th className="text-left py-4 px-6 font-semibold">Feature</th>
                <th className="text-center py-4 px-6 font-semibold">
                  3D Wallpaper
                </th>
                <th className="text-center py-4 px-6 font-semibold bg-primary/20">
                  Ceiling Paper
                </th>
                <th className="text-center py-4 px-6 font-semibold">
                  Epoxy Floor
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="py-4 px-6 text-gray-700 font-medium">
                    {feature.name}
                  </td>
                  <td className="py-4 px-6 text-center text-gray-700">
                    {typeof feature.wallpaper === "boolean" ? (
                      feature.wallpaper ? (
                        <CheckCircle className="w-5 h-5 text-secondary mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      feature.wallpaper
                    )}
                  </td>
                  <td className="py-4 px-6 text-center text-gray-700 bg-primary/5">
                    {typeof feature.ceiling === "boolean" ? (
                      feature.ceiling ? (
                        <CheckCircle className="w-5 h-5 text-secondary mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      feature.ceiling
                    )}
                  </td>
                  <td className="py-4 px-6 text-center text-gray-700">
                    {typeof feature.epoxy === "boolean" ? (
                      feature.epoxy ? (
                        <CheckCircle className="w-5 h-5 text-secondary mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      feature.epoxy
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-4 md:hidden">
        Swipe to see full comparison →
      </p>
    </section>
  );
}
