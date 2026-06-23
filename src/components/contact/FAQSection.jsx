import { ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";

const FAQS = [
  {
    q: "How much does 3D wallpaper cost?",
    a: "Our 3D wallpapers and ceiling papers start from ৳140 per square foot, inclusive of materials and labor. For a standard bedroom wall (approx. 12ft × 10ft = 120 sqft), the total would be around ৳16,800.",
  },
  {
    q: "How much does 3D epoxy floor cost?",
    a: "Our 3D epoxy floors start from ৳450 per square foot, including all materials and professional installation. Epoxy floors are twice as strong as tiles with no joints and come with a lifetime guarantee.",
  },
  {
    q: "Do you offer a site visit?",
    a: "Yes. Once you get a rough estimate and decide to proceed, we send our expert to your home for precise measurement — only travelling cost applies.",
  },
  {
    q: "How long does installation take?",
    a: "From final measurement to complete installation, we typically finish within 3 to 4 working days.",
  },
  {
    q: "What warranty do you offer?",
    a: "3D wallpapers and ceiling papers come with a 10-year warranty. 3D epoxy floors come with a lifetime guarantee.",
  },
  {
    q: "What condition should the wall/floor be in before installation?",
    a: "Walls and ceilings should be painted or whitewashed (sealer or regular paint). Floors need to have a net finish or existing tiles — we install epoxy on top.",
  },
  {
    q: "Can I wash the wallpaper?",
    a: "Yes! Our wallpapers are made from waterproof fabric and can be washed with soap and water without any damage.",
  },
  {
    q: "Do you serve outside Dhaka?",
    a: "Yes, we serve all 64 districts of Bangladesh. Travel charges may apply for remote areas — contact us for details.",
  },
  {
    q: "How do I pay? Is it safe?",
    a: "We take 50% advance after design confirmation, and the remaining 50% after installation is complete. We provide a signed money receipt for all transactions.",
  },
  {
    q: "How do I get started?",
    a: "Simply call or WhatsApp us at 01772-132818. Tell us your room size and which service you're interested in, and we'll give you a cost estimate right away.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="scroll-mt-20 py-16 md:py-24 bg-light">
      <Container>
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-dark-muted">
            Everything you need to know before getting started
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {FAQS.map((faq) => (
            <details
              key={faq.q}
              className="group border border-gray-200 rounded-xl mb-3 bg-white open:border-primary transition-colors"
            >
              <summary className="px-6 py-4 cursor-pointer font-semibold text-dark list-none flex justify-between items-center gap-4 [&::-webkit-details-marker]:hidden group-open:text-primary">
                {faq.q}
                <ChevronDown className="w-4 h-4 shrink-0 text-primary transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
