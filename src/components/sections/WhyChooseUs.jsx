import { Shield, Infinity, Palette, Home } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

/* ─────────────────────────────────────────
   Feature list data
   ───────────────────────────────────────── */
const FEATURES = [
  {
    icon: Shield,
    title: "10 Year Warranty",
    description: "Wallpaper & Ceiling Papers — premium quality that lasts.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Infinity,
    title: "Lifetime Guarantee",
    description: "Epoxy Floors — built to endure for a lifetime.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Palette,
    title: "6000+ Designs",
    description: "Huge catalog to choose from — something for every taste.",
    color: "text-[#8B7B9E]",
    bg: "bg-[#8B7B9E]/10",
  },
  {
    icon: Home,
    title: "Free Site Visit",
    description: "Expert visits before work — no commitment, no charge.",
    color: "text-[#E8A87C]",
    bg: "bg-[#E8A87C]/10",
  },
];

/* ─────────────────────────────────────────
   Process steps
   ───────────────────────────────────────── */
const STEPS = [
  { num: "01", title: "Contact", desc: "Reach out via WhatsApp or phone call." },
  { num: "02", title: "Site Visit", desc: "Our expert visits your location for free." },
  { num: "03", title: "Design Selection", desc: "Choose from 6000+ premium designs." },
  { num: "04", title: "Installation", desc: "Professional installation with warranty." },
];

/* ─────────────────────────────────────────
   WhyChooseUs Section
   ───────────────────────────────────────── */
export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-16 md:py-24 bg-light">
      <Container>
        <SectionTitle
          subtitle="Why RS Wallpaper"
          title="Why Choose Us"
          description="Trusted by 4000+ clients across Bangladesh for quality, reliability and stunning results."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Left — Feature list */}
          <div className="space-y-5">
            {FEATURES.map((feat) => (
              <div
                key={feat.title}
                className="group flex items-start gap-4 p-4 md:p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-light-muted/50"
              >
                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-xl ${feat.bg} flex items-center justify-center ${feat.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <feat.icon className="w-5 h-5" />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-base font-heading font-bold text-dark group-hover:text-primary transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-dark-muted mt-1 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right — Process card */}
          <div className="bg-white rounded-2xl shadow-sm border border-light-muted/50 p-6 md:p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-lg">🔄</span>
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-dark">
                  Our Process
                </h3>
                <p className="text-xs text-dark-muted">
                  Simple 4-step journey
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {STEPS.map((step, i) => (
                <div key={step.num} className="relative flex items-start gap-4">
                  {/* Connector line */}
                  {i < STEPS.length - 1 && (
                    <div className="absolute left-5 top-10 w-px h-[calc(100%+4px)] bg-gradient-to-b from-primary/30 to-primary/5" />
                  )}

                  {/* Step number */}
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-md">
                    {step.num}
                  </div>

                  {/* Step content */}
                  <div className="pt-1">
                    <h4 className="text-sm font-heading font-bold text-dark">
                      {step.title}
                    </h4>
                    <p className="text-xs text-dark-muted mt-0.5 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
