"use client";

import { useState, useEffect } from "react";
import {
  Link2,
  MessageCircle,
  ExternalLink,
  Download,
  Check,
} from "lucide-react";

export default function ShareButtons({ product }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    // Safely get the URL after hydration
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUrl(window.location.href);
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const downloadSpecSheet = () => {
    const content = `
Product Specification Sheet
==========================
Product Name: ${product.name}
Category: ${product.category}
Price: ৳${product.pricePerSqft}/sqft
Warranty: ${product.warranty}
Rating: ${product.rating} (${product.reviewCount} reviews)
Material: ${product.material}
Finish: ${product.finish}
Best For: ${product.roomType}

Contact:
Phone: 01772-132818
WhatsApp: https://wa.me/+8801772132818
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${product.slug}-spec-sheet.txt`;
    a.click();
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={copyLink}
        className="p-3 rounded-xl bg-gray-100 text-dark-muted hover:bg-primary hover:text-white transition-all"
        title="Copy Link"
      >
        {copied ? (
          <Check className="w-5 h-5 text-green-600" />
        ) : (
          <Link2 className="w-5 h-5" />
        )}
      </button>
      <a
        href={
          url
            ? `https://wa.me/+8801772132818?text=${encodeURIComponent(url)}`
            : "#"
        }
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-xl bg-gray-100 text-dark-muted hover:bg-green-500 hover:text-white transition-all"
        title="Share on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
      <a
        href={
          url
            ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
            : "#"
        }
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-xl bg-gray-100 text-dark-muted hover:bg-blue-600 hover:text-white transition-all"
        title="Share on Facebook"
      >
        <ExternalLink className="w-5 h-5" />
      </a>
      <button
        onClick={downloadSpecSheet}
        className="p-3 rounded-xl bg-gray-100 text-dark-muted hover:bg-dark hover:text-white transition-all"
        title="Download Spec Sheet"
      >
        <Download className="w-5 h-5" />
      </button>
    </div>
  );
}
