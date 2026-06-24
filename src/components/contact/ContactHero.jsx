import Link from "next/link";
import { ChevronRight, Phone, MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";

const FacebookIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default function ContactHero() {
  return (
    <section
      id="contact-hero"
      className="relative scroll-mt-20 overflow-hidden bg-[#1C1C1C]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-secondary/20" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <Container className="relative z-10 py-16 md:py-24">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center justify-center gap-1.5 text-xs text-white/50 mb-8"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/80">Contact Us</span>
        </nav>

        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="primary" size="md" className="mb-5">
            We Respond Within 1 Hour
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.1] mb-6">
            Let&apos;s Transform Your Space Together
          </h1>

          <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-10">
            Have a question? Want a cost estimate? Just reach out — our team is
            ready to help you find the perfect design for your home.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="tel:+8801976600300"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call Us
            </a>
            <a
              href="https://wa.me/+8801976600300"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1EBE57] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <a
              href="https://www.facebook.com/rsintl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full bg-[#1877F2] text-white text-sm font-semibold hover:bg-[#166FE0] transition-colors"
            >
              <FacebookIcon />
              Facebook
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
