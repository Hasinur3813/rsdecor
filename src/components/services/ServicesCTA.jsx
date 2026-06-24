import Link from "next/link";
import { MessageCircle, Phone, Layers, Clock } from "lucide-react";

export default function ServicesCTA() {
  return (
    <section className="bg-[#1C1C1C] py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="font-playfair text-4xl font-bold mb-6 leading-tight text-white">
            Ready to Transform Your Home?
          </h3>
          <p className="text-gray-300 text-lg mb-8">
            Book a site visit today — no commitment, no hidden charges.
          </p>

          {/* Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <span className="px-5 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
              ✓ Site Visit
            </span>
            <span className="px-5 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
              ✓ 3–4 Day Install
            </span>
            <span className="px-5 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
              ✓ All Bangladesh
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="https://wa.me/+8801976600300?text=Hi! I'd like to book a free site visit."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: "#25D366" }}
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </Link>
            <Link
              href="tel:+8801976600300"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-semibold transition-all hover:opacity-90"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </Link>
            <Link
              href="/products"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white text-white font-semibold transition-all hover:bg-white hover:text-dark"
            >
              <Layers className="w-5 h-5" />
              View Products
            </Link>
          </div>

          {/* Bottom Note */}
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <Clock className="w-4 h-4" />
            <span>
              We respond within 1 hour during business hours (Sat–Thu, 9AM–8PM)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
