"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const VALUES = [
  {
    title: "Customer First",
    content:
      "Your trust and satisfaction is everything. We do not begin work until you are 100% happy with the design and cost estimate.",
  },
  {
    title: "Quality Without Compromise",
    content:
      "We import only premium waterproof fabric paper from China — washable, tear-resistant, and guaranteed for 10 years.",
  },
  {
    title: "Transparency",
    content:
      "No hidden costs. You get a full cost breakdown upfront, and we provide a signed money receipt for every transaction.",
  },
  {
    title: "Speed & Reliability",
    content:
      "From measurement to installation, we complete every project within 3 to 4 days as promised.",
  },
  {
    title: "Nationwide Service",
    content:
      "We serve all 64 districts of Bangladesh. No location is too far when it comes to delivering quality.",
  },
];

export default function AccordionValues() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-2">
      {VALUES.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={item.title}
            className={cn(
              "rounded-xl border border-light-muted overflow-hidden transition-colors duration-200",
              isOpen && "border-l-4 border-l-primary bg-primary/5",
            )}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className={cn(
                "w-full flex items-center justify-between gap-4 px-5 py-4 text-left",
                isOpen && "bg-primary/10",
              )}
            >
              <span className="text-sm font-semibold text-dark">{item.title}</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-primary shrink-0 transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
              />
            </button>

            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0",
              )}
            >
              <p className="px-5 pb-4 text-sm text-dark-muted leading-relaxed">
                {item.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
