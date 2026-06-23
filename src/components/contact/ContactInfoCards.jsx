import {
  Phone,
  MessageCircle,
  MapPin,
  Share2,
  ExternalLink,
} from "lucide-react";
import Container from "@/components/ui/Container";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=RS+3D+Wallpaper+and+Floor+Kuril+Chourasta+Dhaka";

function FacebookIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YouTubeIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const CARDS = [
  {
    icon: Phone,
    iconBg: "bg-primary/10 text-primary",
    title: "Call Us",
    lines: ["01772-132818", "01976-600300", "01973-600700"],
    sub: "Available Sat–Thu, 9AM–8PM",
    button: { label: "Call Now", href: "tel:+8801772132818", className: "bg-primary hover:bg-primary-dark text-white" },
  },
  {
    icon: MessageCircle,
    iconBg: "bg-[#25D366]/10 text-[#25D366]",
    title: "WhatsApp",
    lines: ["01772-132818"],
    sub: "Send a message anytime — we reply within 1 hour during business hours",
    button: {
      label: "Chat Now",
      href: "https://wa.me/+8801772132818",
      className: "bg-[#25D366] hover:bg-[#1EBE57] text-white",
      external: true,
    },
  },
  {
    icon: MapPin,
    iconBg: "bg-secondary/10 text-secondary",
    title: "Visit Our Office",
    lines: [
      "K-57/4, Kuril Chourasta",
      "Beside Jamuna Future Park",
      "Pragati Sarani Road, Dhaka",
    ],
    sub: "Walk-in welcome during business hours",
    button: {
      label: "Get Directions",
      href: MAPS_URL,
      className: "bg-secondary hover:bg-secondary-dark text-white",
      external: true,
    },
  },
  {
    icon: Share2,
    iconBg: "bg-accent/30 text-dark",
    title: "Follow Us",
    lines: ["facebook.com/rsintl", "@rs3dwallpaperfloor882"],
    sub: "See our latest work, designs and client reviews",
    social: true,
  },
];

export default function ContactInfoCards() {
  return (
    <section id="contact-info" className="scroll-mt-20 py-12 md:py-16 bg-white">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="relative rounded-2xl bg-white border border-light-muted/50 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${card.iconBg}`}
              >
                <card.icon className="w-5 h-5" />
              </div>

              <h3 className="text-base font-heading font-bold text-dark mb-3">
                {card.title}
              </h3>

              <ul className="space-y-1 mb-3">
                {card.lines.map((line, i) => (
                  <li
                    key={line}
                    className={`text-sm ${i === 0 ? "font-semibold text-dark" : "text-dark-muted"}`}
                  >
                    {line}
                  </li>
                ))}
              </ul>

              <p className="text-xs text-dark-muted mb-5 leading-relaxed">
                {card.sub}
              </p>

              {card.button && (
                <a
                  href={card.button.href}
                  {...(card.button.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={`inline-flex items-center justify-center gap-1.5 w-full px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${card.button.className}`}
                >
                  {card.button.label}
                  {card.button.external && (
                    <ExternalLink className="w-3.5 h-3.5" />
                  )}
                </a>
              )}

              {card.social && (
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.facebook.com/rsintl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <FacebookIcon />
                  </a>
                  <a
                    href="https://www.youtube.com/@rs3dwallpaperfloor882"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-red-500/10 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                    aria-label="YouTube"
                  >
                    <YouTubeIcon />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
