import { MessageCircle, Phone, ExternalLink } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function AboutCTA() {
  return (
    <section id="about-cta" className="scroll-mt-20 py-16 md:py-24 bg-[#1C1C1C]">
      <Container className="text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
          Ready to Transform Your Home?
        </h2>

        <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-10">
          Book a site visit today — only travelling cost applies. No hidden
          charges — just honest advice and stunning results.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <Button
            variant="whatsapp"
            size="lg"
            href="https://wa.me/8801772132818"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Us
          </Button>
          <Button variant="filled" size="lg" href="tel:+8801772132818">
            <Phone className="w-4 h-4" />
            Call Now
          </Button>
          <Button variant="outline" size="lg" href="/products">
            <ExternalLink className="w-4 h-4" />
            View Products
          </Button>
        </div>

        <p className="text-xs text-white/40">
          Serving all over Bangladesh | Response within 1 hour
        </p>
      </Container>
    </section>
  );
}
