/**
 * AnnouncementStrip — scrolling marquee strip with offers/trust signals.
 * Pure CSS animation — no JS needed.
 */

const ITEMS = [
  "✦ Site Visit — Travelling Cost Only",
  "✦ 10 Year Warranty on Wallpaper",
  "✦ Lifetime Guarantee on Epoxy Floor",
  "✦ Serving All Over Bangladesh",
  "✦ 6000+ Designs Available",
];

export default function AnnouncementStrip() {
  // Duplicate items for seamless infinite scroll
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <section
      id="announcement-strip"
      className="bg-primary text-white overflow-hidden select-none"
    >
      <div className="relative flex items-center h-11 md:h-12">
        {/* Scrolling content */}
        <div
          className="flex items-center gap-8 whitespace-nowrap"
          style={{
            animation: "marquee 30s linear infinite",
          }}
        >
          {repeated.map((item, i) => (
            <span
              key={i}
              className="text-xs md:text-sm font-medium tracking-wide shrink-0 px-2"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Marquee keyframes */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
        `,
        }}
      />
    </section>
  );
}
