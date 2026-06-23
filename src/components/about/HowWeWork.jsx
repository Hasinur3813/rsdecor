import { Phone, MapPin, Palette, CheckCircle } from "lucide-react";
import Container from "@/components/ui/Container";

const STEPS = [
  {
    number: 1,
    icon: Phone,
    title: "Contact Us",
    description:
      "Call or WhatsApp us to discuss your requirements and get a rough cost estimate for your room.",
  },
  {
    number: 2,
    icon: MapPin,
    title: "Site Visit",
    description:
      "If the estimate works for you, our expert visits your home for precise measurement — only travelling cost applies.",
  },
  {
    number: 3,
    icon: Palette,
    title: "Design & Advance",
    description:
      "Browse 6000+ designs and pick your favourite. Confirm with 50% advance payment after finalizing.",
  },
  {
    number: 4,
    icon: CheckCircle,
    title: "Installation",
    description:
      "Our professional team installs everything within 3-4 days. Balance payment on completion.",
  },
];

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="scroll-mt-20 py-16 md:py-24 bg-light">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-3">
            How We Work
          </h2>
          <p className="text-dark-muted max-w-2xl mx-auto">
            Simple, transparent, and fast. From first contact to finished room
            in 3-4 days.
          </p>
        </div>

        {/* Desktop timeline */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 relative">
          <div className="absolute top-12 left-[12.5%] right-[12.5%] h-px border-t-2 border-dashed border-primary/40" />

          {STEPS.map((step) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center mb-4 relative z-10">
                {step.number}
              </div>
              <step.icon className="w-7 h-7 text-secondary mb-3" />
              <h3 className="text-base font-heading font-bold text-dark mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-dark-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile vertical stepper */}
        <div className="lg:hidden space-y-0 border-l-2 border-dashed border-primary/40 ml-5 pl-8">
          {STEPS.map((step) => (
            <div key={step.number} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[calc(2rem+5px)] top-0 w-3 h-3 rounded-full bg-primary" />
              <div className="flex items-center gap-3 mb-2">
                <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                  {step.number}
                </span>
                <step.icon className="w-5 h-5 text-secondary" />
                <h3 className="text-base font-heading font-bold text-dark">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm text-dark-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
