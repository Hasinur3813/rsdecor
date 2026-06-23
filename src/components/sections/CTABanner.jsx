import { Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

/* ─────────────────────────────────────────
   WhatsApp SVG icon (Lucide doesn't have brand icons)
   ───────────────────────────────────────── */
const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ─────────────────────────────────────────
   CTABanner Section
   ───────────────────────────────────────── */
export default function CTABanner() {
  return (
    <section id="cta-banner" className="relative overflow-hidden">
      {/* Gradient background — sage/terracotta blend */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3A6358] via-[#4A7C6F] to-[#C8956C]" />

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Decorative patterns */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative blurred circles */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-secondary/20 blur-3xl" />

      <Container className="relative z-10 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
            Ready to Transform{" "}
            <span className="text-primary-light">Your Home?</span>
          </h2>

          {/* Subtext */}
          <p className="mt-4 md:mt-5 text-base md:text-lg text-white/70 leading-relaxed max-w-lg mx-auto">
            Book a site visit — only travelling cost applies. Our experts will
            help you choose the perfect design.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 md:mt-10">
            <Button
              variant="whatsapp"
              size="lg"
              href="https://wa.me/8801772132818"
            >
              <WhatsAppIcon className="w-5 h-5" />
              WhatsApp Us
            </Button>

            <Button
              variant="outline"
              size="lg"
              href="tel:+8801772132818"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </Button>
          </div>

          {/* Trust note */}
          <p className="mt-6 text-xs text-white/40">
            Serving all over Bangladesh • 7+ years of experience • 4000+ happy
            clients
          </p>
        </div>
      </Container>
    </section>
  );
}
