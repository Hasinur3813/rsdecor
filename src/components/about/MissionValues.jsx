import { Target, Eye } from "lucide-react";
import Container from "@/components/ui/Container";
import AccordionValues from "@/components/about/AccordionValues";

export default function MissionValues() {
  return (
    <section id="mission-values" className="scroll-mt-20 py-16 md:py-24 bg-light">
      <Container>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark text-center mb-12 md:mb-16">
          Our Mission & Values
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm border-l-4 border-secondary">
              <Target className="w-8 h-8 text-secondary mb-4" />
              <h3 className="text-xl font-heading font-bold text-dark mb-3">
                Our Mission
              </h3>
              <p className="text-sm md:text-base text-dark-muted leading-relaxed">
                To transform every home in Bangladesh with premium quality 3D
                wallpapers and epoxy floors at fair prices, backed by honest
                service and the strongest warranties in the industry.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm border-l-4 border-primary">
              <Eye className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-heading font-bold text-dark mb-3">
                Our Vision
              </h3>
              <p className="text-sm md:text-base text-dark-muted leading-relaxed">
                To become Bangladesh&apos;s #1 trusted brand for home surface
                decoration — setting the standard for quality, craftsmanship, and
                customer satisfaction.
              </p>
            </div>
          </div>

          <AccordionValues />
        </div>
      </Container>
    </section>
  );
}
