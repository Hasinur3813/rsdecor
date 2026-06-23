import { Shield, Award, CheckCircle } from "lucide-react";

export default function ProductWarranty({ product }) {
  const isEpoxy = product.category === "3D Epoxy Floor";

  const coverageItems = isEpoxy
    ? [
        "Lifetime Bonding Guarantee",
        "No Delamination",
        "Crack Coverage",
        "Free Repair or Replacement",
      ]
    : [
        "Peeling Protection",
        "Color Fading Warranty",
        "Adhesive Failure Coverage",
        "Free Repair or Replacement",
      ];

  return (
    <section className="bg-accent/20 py-10 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Warranty Coverage */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border-l-4 border-secondary shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 sm:w-10 h-8 sm:h-10 text-secondary" />
              <h3 className="text-lg sm:text-xl font-heading font-bold text-dark">
                Warranty Coverage
              </h3>
            </div>
            <div className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-4">
              {product.warranty}
            </div>
            <ul className="space-y-2">
              {coverageItems.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-secondary flex-shrink-0" />
                  <span className="text-dark text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How to Claim */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border-l-4 border-primary shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-8 sm:w-10 h-8 sm:h-10 text-primary" />
              <h3 className="text-lg sm:text-xl font-heading font-bold text-dark">
                How to Claim
              </h3>
            </div>
            <ol className="space-y-3 mb-4">
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">
                  1
                </span>
                <span className="text-dark text-sm sm:text-base">
                  Call or WhatsApp us at 01772-132818
                </span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">
                  2
                </span>
                <span className="text-dark text-sm sm:text-base">
                  Describe the issue with photos
                </span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">
                  3
                </span>
                <span className="text-dark text-sm sm:text-base">
                  Our team visits within 3 days
                </span>
              </li>
            </ol>
            <p className="text-secondary font-semibold text-sm sm:text-base">
              All warranty claims are completely FREE of charge.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
