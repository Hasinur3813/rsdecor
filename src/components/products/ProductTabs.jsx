/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import ReviewsTab from "./ReviewsTab";
import { Check } from "lucide-react";

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("description");

  const isEpoxy = product.category === "3D Epoxy Floor";
  const isWallpaper = product.category === "3D Wallpaper";
  const isCeiling = product.category === "3D Ceiling Paper";

  const materialInfo = isEpoxy
    ? [
        {
          title: "Premium Epoxy Resin",
          description: "High-grade, industrial-strength epoxy resin formula",
          features: [
            "2x Stronger than traditional tiles",
            "Seamless, joint-free finish",
            "Impact and scratch resistant",
            "Waterproof and stain proof",
          ],
        },
      ]
    : [
        {
          title: "#1 Non-Woven Wallpaper (Glue Required)",
          description: "High-quality Non-Woven silk/smooth finish Wallpaper",
          features: [
            "Semi-Matt traditional wallpaper is a paper-based material",
            "Thickness 295 micron",
            "Easy for use and application",
            "Environment friendly Ink we used you can fix on this kids rooms also",
            "Apply can Smooth and textured Walls applicable with glue",
            "8-10 Years Lifespan",
          ],
        },
        {
          title: "#2 Canvas Texture Wallpaper (Glue Required)",
          description: "Semi-matt fabric with a canvas structure",
          features: [
            "Thickness 360 micron. Non-Woven Backing",
            "Easy for use and application",
            "Applicable with glue",
            "8-10 Years Lifespan",
            "It looks beautiful in both light and dark patterns.",
          ],
        },
        {
          title: "#3 Premium Leather Texture Wallpaper (Glue needed)",
          description: "Premium Quality with Shiny Leather Textured Wallpaper",
          features: [
            "Thickness 340 micro. Non-Woven Backing",
            "Easy for use and application",
            "Applicable with glue",
            "8-10 Years Lifespan",
            "Attractive on walls",
          ],
        },
      ];

  const faqItems = isEpoxy
    ? [
        {
          q: "How long does it take for the epoxy floor to cure?",
          a: "The epoxy floor takes about 24-48 hours to dry completely and 7 days to fully cure. You can walk on it after 24 hours but avoid heavy furniture for 7 days.",
        },
        {
          q: "Can epoxy be applied over existing tiles?",
          a: "Yes! Our epoxy can be applied over tiles after proper surface preparation. We'll ensure the tiles are clean, dry, and properly primed before application.",
        },
        {
          q: "How do I clean and maintain the epoxy floor?",
          a: "Clean with a damp mop and mild detergent. Avoid harsh chemicals. The seamless surface makes it very easy to maintain and keeps germs away.",
        },
        {
          q: "Will the epoxy floor crack?",
          a: "Our premium epoxy is highly resistant to cracking. However, in case of extreme structural movement, our lifetime guarantee covers it.",
        },
        {
          q: "Can I customize the color and design?",
          a: "Absolutely! We offer a wide range of colors and designs including marble effects, metallic finishes, and solid colors.",
        },
        {
          q: "What does the lifetime guarantee cover?",
          a: "Our lifetime guarantee covers peeling, delamination, and cracking due to installation defects. We'll repair or replace it free of charge.",
        },
      ]
    : [
        {
          q: "How do I clean the wallpaper?",
          a: "Our wallpapers are washable! Simply use a damp cloth with mild soap. Avoid harsh chemicals or abrasive scrubbers.",
        },
        {
          q: "What condition does the wall need to be in?",
          a: "Walls should be smooth, dry, and free from dust. We'll prepare the wall properly before installation for best results.",
        },
        {
          q: "Will the color fade over time?",
          a: "Our high-quality imported wallpapers are fade-resistant. The 10-year warranty covers fading issues.",
        },
        {
          q: "Can the wallpaper be removed later?",
          a: "Yes! Our wallpapers can be removed professionally without damaging the wall surface.",
        },
        {
          q: "Is it safe for kids and pets?",
          a: "Absolutely! Our wallpapers use non-toxic materials and are completely safe for children and pets.",
        },
        {
          q: "What if I'm not satisfied with the installation?",
          a: "Your satisfaction is our priority. We offer a satisfaction guarantee and will fix any issues to your liking.",
        },
      ];

  return (
    <div className="bg-white rounded-2xl border border-light-muted overflow-hidden">
      {/* Tab Bar */}
      <div className="flex overflow-x-auto border-b border-light-muted">
        {[
          { id: "description", label: "Description" },
          { id: "materials", label: "Materials" },
          { id: "reviews", label: "Reviews" },
          { id: "installation", label: "Installation Guide" },
          { id: "faq", label: "FAQ" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "text-primary border-b-2 border-primary"
                : "text-dark-muted hover:text-dark"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "description" && (
          <div className="prose prose-lg max-w-none">
            {isEpoxy ? (
              <>
                <h3 className="text-xl font-heading font-bold text-dark mb-4">
                  About This Epoxy Floor
                </h3>
                <p className="text-dark-muted mb-4">
                  Transform your space with our premium 3D epoxy floors. Made
                  from high-grade epoxy resin, our floors are twice as strong as
                  tiles and completely seamless, making them perfect for homes,
                  offices, and commercial spaces.
                </p>
                <h3 className="text-xl font-heading font-bold text-dark mb-4">
                  Strength & Durability
                </h3>
                <p className="text-dark-muted mb-4">
                  Our epoxy floors are impact-resistant, scratch-resistant, and
                  waterproof. The seamless finish prevents dirt and bacteria
                  from accumulating, making it hygienic and easy to clean.
                </p>
                <h3 className="text-xl font-heading font-bold text-dark mb-4">
                  Maintenance
                </h3>
                <p className="text-dark-muted">
                  Simply mop with mild detergent. No grout lines to scrub, no
                  tiles to replace. With our lifetime guarantee, you'll never
                  have to worry about your floor again!
                </p>
              </>
            ) : isCeiling ? (
              <>
                <h3 className="text-xl font-heading font-bold text-dark mb-4">
                  About This Ceiling Paper
                </h3>
                <p className="text-dark-muted mb-4">
                  Elevate your interiors with our premium 3D ceiling papers.
                  Designed specifically for ceiling applications, they add depth
                  and elegance to any room.
                </p>
                <h3 className="text-xl font-heading font-bold text-dark mb-4">
                  Material & Durability
                </h3>
                <p className="text-dark-muted mb-4">
                  Made from the same high-quality waterproof fabric as our
                  wallpapers, our ceiling papers are durable, washable, and
                  tear-resistant. They come with a 10-year warranty.
                </p>
                <h3 className="text-xl font-heading font-bold text-dark mb-4">
                  Perfect For
                </h3>
                <p className="text-dark-muted">
                  Bedrooms, living rooms, dining rooms, and office spaces. Our
                  ceiling papers transform the fifth wall into a stunning focal
                  point.
                </p>
              </>
            ) : (
              <>
                <h3 className="text-xl font-heading font-bold text-dark mb-4">
                  About This Wallpaper
                </h3>
                <p className="text-dark-muted mb-4">
                  Transform your walls with our premium 3D wallpapers. Imported
                  from the finest manufacturers, our wallpapers are designed to
                  impress and built to last.
                </p>
                <h3 className="text-xl font-heading font-bold text-dark mb-4">
                  Material & Durability
                </h3>
                <p className="text-dark-muted mb-4">
                  Made from high-quality waterproof fabric, our wallpapers are
                  washable, tear-resistant, and fade-resistant. With a lifespan
                  of 20-25 years and a 10-year warranty, they're an investment
                  that pays off.
                </p>
                <h3 className="text-xl font-heading font-bold text-dark mb-4">
                  Perfect For
                </h3>
                <p className="text-dark-muted">
                  Bedrooms, living rooms, kids' rooms, dining rooms, offices,
                  and commercial spaces. Create stunning accent walls or cover
                  entire rooms!
                </p>
              </>
            )}
          </div>
        )}

        {activeTab === "materials" && (
          <div className="space-y-6">
            {materialInfo.map((material, index) => (
              <div
                key={index}
                className="p-5 bg-light rounded-2xl border border-light-muted"
              >
                <h3 className="text-lg font-heading font-bold text-dark mb-3">
                  {material.title}
                </h3>
                <p className="text-dark-muted text-sm mb-4">
                  {material.description}
                </p>
                <ul className="space-y-2">
                  {material.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-dark text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Important Notes */}
            <div className="mt-6 p-5 bg-primary/5 rounded-2xl border border-primary/20">
              <h3 className="text-lg font-heading font-bold text-primary mb-3">
                Important Notes
              </h3>
              <ul className="space-y-2">
                {!isEpoxy && (
                  <>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span className="text-dark-muted text-sm">
                        You will get the wallpaper in numbered rolls that match,
                        starts from left side by numbers.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span className="text-dark-muted text-sm">
                        Wallpaper is applied by overlapping 2-2.5 cm (0.8-1
                        inch) overlapping the patterns next to each other (Left
                        to Right)
                      </span>
                    </li>
                  </>
                )}
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-dark-muted text-sm">
                    Colours on the prints may be slightly different from what
                    you see on your screen - that's because every display has
                    its own individual settings.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-dark-muted text-sm">
                    We use only original HP inks with Green guard certification
                    so you can be 100% sure that we care about your health and
                    also feel responsible for our environment.
                  </span>
                </li>
              </ul>
            </div>

            {/* Returns & Cancellations */}
            <div className="mt-4 p-5 bg-red-50 rounded-2xl border border-red-200">
              <h3 className="text-lg font-heading font-bold text-red-700 mb-3">
                Returns, Exchanges and Cancellations
              </h3>
              <ul className="space-y-2 text-dark-muted text-sm">
                <li>
                  • Unless your item is defective returns are not accepted,
                  every order is made on order, so it's impossible to exchange
                  it.
                </li>
                <li>
                  • As the wallpapers are made to order, we do not offer
                  refunds/returns (of course, if the item you receive is
                  damaged, we will replace it with a new one).
                </li>
                <li>• Exchanges are not accepted.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "reviews" && <ReviewsTab />}

        {activeTab === "installation" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  step: 1,
                  title: "Contact & Estimate",
                  desc: "Call or WhatsApp us for a free estimate",
                },
                {
                  step: 2,
                  title: "Site Visit",
                  desc: "Our team visits your site for measurements -Travelling cost applies",
                },
                {
                  step: 3,
                  title: "Design + Advance",
                  desc: "Choose your design and pay advance",
                },
                {
                  step: 4,
                  title: "Surface Prep",
                  desc: "We prepare the wall/floor properly",
                },
                {
                  step: 5,
                  title: "Professional Install",
                  desc: "Expert installation by our team",
                },
                {
                  step: 6,
                  title: "Quality Check",
                  desc: "Final inspection and handover",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex gap-4 items-start p-5 rounded-2xl bg-light border border-light-muted"
                >
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark mb-1">
                      {item.title}
                    </h4>
                    <p className="text-dark-muted text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-5 rounded-2xl bg-secondary/10 border-l-4 border-secondary">
              <h4 className="font-semibold text-secondary mb-2">💡 Pro Tip</h4>
              <p className="text-dark-muted">
                Book your installation during weekdays for faster scheduling!
                Our team usually completes most jobs within 3-4 days.
              </p>
            </div>
          </div>
        )}

        {activeTab === "faq" && (
          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <details
                key={index}
                className="border border-light-muted rounded-xl overflow-hidden group"
              >
                <summary className="px-6 py-4 cursor-pointer font-semibold text-dark flex items-center justify-between hover:bg-light-muted/50 transition-colors">
                  {item.q}
                  <span className="transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <div className="px-6 pb-5 border-t border-light-muted text-dark-muted">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
