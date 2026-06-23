
"use client";

import { useState, useEffect, useRef } from "react";
import { Phone, MessageCircle } from "lucide-react";

export default function StickyAddToQuote({ product }) {
  const [isVisible, setIsVisible] = useState(true);
  const footerRef = useRef(null);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  if (!isVisible) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-light-muted shadow-lg z-40 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-dark truncate">{product.name}</p>
          <p className="text-primary font-bold">
            ৳{product.pricePerSqft}
            <span className="text-dark-muted font-normal text-sm">/sqft</span>
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href="tel:+8801772132818"
            className="p-3 rounded-xl bg-secondary text-white"
          >
            <Phone className="w-5 h-5" />
          </a>
          <a
            href={`https://wa.me/+8801772132818?text=${encodeURIComponent(`Hi! I want a quote for ${product.name}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-semibold"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp Quote</span>
          </a>
        </div>
      </div>
    </div>
  );
}
