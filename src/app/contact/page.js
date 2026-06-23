import ContactHero from "@/components/contact/ContactHero";
import ContactInfoCards from "@/components/contact/ContactInfoCards";
import ContactForm from "@/components/contact/ContactForm";
import MapSection from "@/components/contact/MapSection";
import BusinessHours from "@/components/contact/BusinessHours";
import FAQSection from "@/components/contact/FAQSection";
import ContactCTA from "@/components/contact/ContactCTA";

export const metadata = {
  title: "Contact Us | RS Wallpaper & Floor",
  description:
    "Get in touch with RS 3D Wallpaper & Floor. Call, WhatsApp, or visit us in Dhaka. Site visits available across Bangladesh — only travelling cost applies.",
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <ContactHero />
      <ContactInfoCards />
      <section id="contact-form-map" className="scroll-mt-20 py-16 bg-light">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <ContactForm />
          <MapSection />
        </div>
      </section>
      <BusinessHours />
      <FAQSection />
      <ContactCTA />
    </main>
  );
}
