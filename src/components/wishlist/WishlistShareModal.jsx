"use client";

import {
  X,
  Link2,
  MessageCircle,
  ExternalLink,
  Download,
  Check,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function WishlistShareModal({ products, onClose }) {
  const [copied, setCopied] = useState(false);

  const generateWishlistText = () => {
    const items = products
      .map(
        (p, i) =>
          `${i + 1}. ${p.name} (${p.category}) — ৳${p.pricePerSqft}/sqft`,
      )
      .join("\n");

    return `My RS Wallpaper Wishlist:\n\n${items}\n\nTotal designs: ${products.length}\nFor quotes: wa.me/+8801976600300`;
  };

  const shareText = generateWishlistText();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const downloadList = () => {
    const blob = new Blob([shareText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rs-wishlist.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#2C2C2C]"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-[Playfair_Display] text-xl font-bold text-[#2C2C2C] mb-2">
          Share Your Wishlist
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          Share your saved designs with family or get a group quote.
        </p>

        {/* Preview */}
        <div className="bg-[#FAF7F2] rounded-xl p-4 mb-4">
          <pre className="text-sm text-gray-700 font-mono max-h-32 overflow-y-auto whitespace-pre-wrap">
            {shareText}
          </pre>
        </div>

        {/* Share buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={copyToClipboard}
            className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 rounded-xl py-3 font-medium hover:bg-gray-200 transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Link2 className="w-4 h-4" />
            )}
            {copied ? "Copied!" : "Copy Text"}
          </button>

          <a
            href={`https://wa.me/+8801976600300?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-xl py-3 font-medium hover:opacity-90 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            Share on WhatsApp
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#1877F2] text-white rounded-xl py-3 font-medium hover:opacity-90 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            Share on Facebook
          </a>

          <button
            onClick={downloadList}
            className="flex items-center justify-center gap-2 bg-[#4A7C6F] text-white rounded-xl py-3 font-medium hover:opacity-90 transition-all"
          >
            <Download className="w-4 h-4" />
            Download List
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full border border-gray-200 text-gray-600 rounded-xl py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
