"use client";

import { Phone, MessageCircle, Zap } from 'lucide-react';

export default function CartCheckoutBar({ totalCost, itemCount, cartItems }) {
  const generateWhatsAppMessage = () => {
    let message = "Hi RS Wallpaper! I'd like a quote for:\n";
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.category}) — ${item.area} sqft — ৳${item.totalPrice.toLocaleString("en-IN")}\n`;
    });
    message += `\nTotal: ৳${totalCost.toLocaleString("en-IN")}\nPlease confirm availability and site visit date.`;
    return encodeURIComponent(message);
  };

  const generateUrgentWhatsAppMessage = () => {
    let message = "Hi RS Wallpaper! I'd like to place an URGENT order (products only, no installation services):\n";
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.category}) — ${item.area} sqft — ৳${item.totalPrice.toLocaleString("en-IN")}\n`;
    });
    message += `\nTotal: ৳${totalCost.toLocaleString("en-IN")}\nI understand and accept the urgent order terms and conditions.`;
    return encodeURIComponent(message);
  };

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 lg:hidden z-50 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)] border-t border-gray-100 px-4 py-3">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div>
          <p className="text-xs text-gray-400">
            {itemCount} item{itemCount > 1 ? "s" : ""}
          </p>
          <p className="text-lg font-bold text-[#C8956C]">
            ৳{totalCost.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href="tel:+8801772132818"
            className="flex items-center justify-center p-3 rounded-xl border border-[#4A7C6F] text-[#4A7C6F] hover:bg-[#4A7C6F]/5 transition-colors"
          >
            <Phone className="w-5 h-5" />
          </a>
          <a
            href={`https://wa.me/+8801772132818?text=${generateWhatsAppMessage()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#20BD5A] transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Quote
          </a>
        </div>
      </div>
      
      {/* Urgent Order Button for Mobile */}
      <a
        href={`https://wa.me/+8801772132818?text=${generateUrgentWhatsAppMessage()}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl py-2.5 font-semibold text-xs hover:from-orange-600 hover:to-amber-600 transition-all shadow-md"
      >
        <Zap className="w-4 h-4" />
        Need Only Products? Place Urgent Order
      </a>
    </div>
  );
}
