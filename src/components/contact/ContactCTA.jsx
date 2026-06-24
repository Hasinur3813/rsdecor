import { Phone, MessageCircle, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=RS+3D+Wallpaper+and+Floor+Kuril+Chourasta+Dhaka";

export default function ContactCTA() {
  return (
    <section id="contact-cta" className="scroll-mt-20 py-16 md:py-24 bg-dark">
      <Container className="text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
          Still Have Questions?
        </h2>

        <p className="text-base md:text-lg text-gray-300 max-w-xl mx-auto mb-10">
          We&apos;re just a call or message away. No question is too small.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <a
            href="tel:+8801976600300"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call 01772-132818
          </a>
          <a
            href="https://wa.me/+8801976600300"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-lg bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1EBE57] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Now
          </a>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-lg border-2 border-white/80 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            <MapPin className="w-4 h-4" />
            Visit Our Office
          </a>
        </div>

        <p className="text-xs text-white/40">
          Serving all 64 districts of Bangladesh since 2017
        </p>
      </Container>
    </section>
  );
}
