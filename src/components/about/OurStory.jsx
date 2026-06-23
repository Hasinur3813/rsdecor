import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";

const TIMELINE = [
  { year: "2017", label: "Founded" },
  { year: "2019", label: "1000+ clients" },
  { year: "2021", label: "3000+ projects" },
  { year: "2024", label: "4000+ projects" },
  { year: "2026", label: "6000+ projects" },
];

export default function OurStory() {
  return (
    <section id="our-story" className="scroll-mt-20 py-16 md:py-24 bg-white">
      <Container>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark text-center mb-12 md:mb-16">
          Our Story
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="space-y-5 text-dark-muted leading-relaxed">
            <p>
              RS 3D Wallpaper & Floor was founded by Md. Rasel Khandaker with a
              simple vision — to make beautiful, durable, and affordable home
              decoration accessible to every Bangladeshi family. What began as a
              small venture has grown into one of Bangladesh&apos;s most trusted
              3D wallpaper and epoxy floor brands.
            </p>
            <p>
              Over 7 years, we have completed 5000+ projects across Dhaka,
              Chittagong, Rajshahi, Sylhet, and beyond. We import premium
              waterproof fabric wallpapers directly from China, ensuring the
              highest quality at the best price. Our epoxy floors are crafted
              with professional-grade epoxy resin — twice as strong as
              traditional tiles, with no joints and a lifetime guarantee.
            </p>
            <p>
              We believe your home deserves the best. That&apos;s why we offer a
              site visit before any work begins (travelling cost only), helping
              you choose the perfect design from our catalog of 6000+ options.
              Our team handles everything — measurement, design selection, and
              installation — all within 3 to 4 days.
            </p>
          </div>

          <div className="rounded-2xl bg-light border-l-4 border-secondary p-6 md:p-8 shadow-sm">
            <Badge variant="primary" size="sm" className="mb-4">
              Founded
            </Badge>

            <p className="text-6xl md:text-7xl font-heading font-bold text-dark mb-8">
              2017
            </p>

            <ul className="space-y-6">
              {TIMELINE.map((item, i) => (
                <li key={item.year} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <span className="w-3 h-3 rounded-full bg-primary shrink-0 mt-1" />
                    {i < TIMELINE.length - 1 && (
                      <span className="w-px flex-1 min-h-6 bg-primary/30 mt-1" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary">
                      {item.year}
                    </p>
                    <p className="text-sm text-dark-muted">{item.label}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
