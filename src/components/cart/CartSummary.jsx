"use client";

import {
  Receipt,
  CreditCard,
  MessageCircle,
  Phone,
  Download,
  Shield,
  Clock,
  CheckCircle2,
  Zap,
} from "lucide-react";

export default function CartSummary({
  cartItems,
  totalCost,
  totalArea,
  advanceAmount,
  balanceAmount,
}) {
  const generateWhatsAppMessage = () => {
    let message = "Hi RS Wallpaper! I'd like a quote for:\n";
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.category}) — ${item.area} sqft — ৳${item.totalPrice.toLocaleString("en-IN")}\n`;
    });
    message += `\nTotal: ৳${totalCost.toLocaleString("en-IN")}\nPlease confirm availability and site visit date.`;
    return encodeURIComponent(message);
  };

  const generateUrgentWhatsAppMessage = () => {
    let message =
      "Hi RS Wallpaper! I'd like to place an URGENT order (products only, no installation services):\n";
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.category}) — ${item.area} sqft — ৳${item.totalPrice.toLocaleString("en-IN")}\n`;
    });
    message += `\nTotal: ৳${totalCost.toLocaleString("en-IN")}\nI understand and accept the urgent order terms and conditions.`;
    return encodeURIComponent(message);
  };

  const handleDownloadQuote = () => {
    let content = "RS Wallpaper - Quote\n";
    content += "==================\n\n";
    cartItems.forEach((item, index) => {
      content += `${index + 1}. ${item.name}\n`;
      content += `   Category: ${item.category}\n`;
      content += `   Dimensions: ${item.width}${item.unit} × ${item.height}${item.unit}${item.numWalls > 1 ? ` × ${item.numWalls} walls` : ""}\n`;
      content += `   Area: ${item.area} sqft\n`;
      content += `   Price per sqft: ৳${item.pricePerSqft}\n`;
      content += `   Total: ৳${item.totalPrice.toLocaleString("en-IN")}\n\n`;
    });
    content += "==================\n";
    content += `Total Area: ${totalArea.toFixed(2)} sqft\n`;
    content += `Total Cost: ৳${totalCost.toLocaleString("en-IN")}\n`;
    content += `Advance (50%): ৳${advanceAmount.toLocaleString("en-IN")}\n`;
    content += `Balance (50%): ৳${balanceAmount.toLocaleString("en-IN")}\n`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cart-quote.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="sticky top-24 flex flex-col gap-4">
      {/* Order Summary Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-semibold text-[#2C2C2C] flex items-center gap-2 mb-4">
          <Receipt className="w-5 h-5" />
          Order Summary
        </h3>

        <div className="space-y-3 mb-4">
          {cartItems.map((item) => (
            <div key={item.cartId} className="space-y-1">
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="truncate max-w-[180px]">{item.name}</span>
                  <span className="text-[10px] bg-[#4A7C6F]/10 text-[#4A7C6F] px-1.5 py-0.5 rounded-full">
                    {item.category.slice(0, 3)}
                  </span>
                </div>
                <span className="font-medium">
                  ৳{item.totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                {item.area} sqft
                {item.numWalls > 1 ? ` · ${item.numWalls} walls` : ""}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 my-3" />

        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>Total Area</span>
          <span>{totalArea.toFixed(2)} sqft</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total Cost</span>
          <span className="text-[#C8956C]">
            ৳{totalCost.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Payment Breakdown Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-semibold text-[#2C2C2C] flex items-center gap-2 mb-4">
          <CreditCard className="w-5 h-5" />
          Payment Plan
        </h3>

        <div className="space-y-3">
          <div className="bg-[#C8956C]/10 rounded-xl p-3 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-[#2C2C2C]">
                Advance (50%)
              </p>
              <p className="text-xs text-gray-500">Pay to confirm order</p>
            </div>
            <span className="text-[#C8956C] font-bold">
              ৳{advanceAmount.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="bg-gray-50 rounded-xl p-3 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-[#2C2C2C]">
                Balance (50%)
              </p>
              <p className="text-xs text-gray-500">Pay after installation</p>
            </div>
            <span className="text-gray-600 font-bold">
              ৳{balanceAmount.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-3 text-center">
          Final amount confirmed after free site visit & measurement.
        </p>
      </div>

      {/* CTA Buttons Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <a
          href={`https://wa.me/+8801772132818?text=${generateWhatsAppMessage()}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-xl py-3.5 font-semibold hover:bg-[#20BD5A] transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          Request Quote on WhatsApp
        </a>

        <a
          href="tel:+8801772132818"
          className="w-full flex items-center justify-center gap-2 border border-[#4A7C6F] text-[#4A7C6F] rounded-xl py-3 font-semibold hover:bg-[#4A7C6F]/5 transition-colors mt-3"
        >
          <Phone className="w-5 h-5" />
          Call for Quote
        </a>

        <div className="flex items-center gap-2 my-3">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        <button
          onClick={handleDownloadQuote}
          className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 rounded-xl py-2.5 text-sm hover:bg-gray-200 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download Quote as Text
        </button>
      </div>

      {/* Urgent Order Card */}
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-2xl p-5 shadow-sm">
        <h3 className="font-semibold text-[#2C2C2C] flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-orange-500" />
          Need Only Products?
        </h3>

        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-600 flex items-start gap-2">
            <span className="text-orange-500 font-bold">•</span>
            <span>
              <strong>Urgent Order Conditions:</strong>
            </span>
          </p>
          <ul className="space-y-1 pl-6">
            <li className="text-xs text-gray-500">
              No installation services included
            </li>
            <li className="text-xs text-gray-500">
              Full payment required upfront (50% advance + 50% balance)
            </li>
            <li className="text-xs text-gray-500">Delivery in 24-48 hours</li>
            <li className="text-xs text-gray-500">No returns or exchanges</li>
            <li className="text-xs text-gray-500">
              Customer responsible for installation
            </li>
          </ul>
        </div>

        <a
          href={`https://wa.me/+8801772132818?text=${generateUrgentWhatsAppMessage()}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl py-3.5 font-semibold hover:from-orange-600 hover:to-amber-600 transition-all shadow-md"
        >
          <Zap className="w-5 h-5" />
          Place Urgent Order Now
        </a>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Shield className="w-4 h-4 text-[#4A7C6F]" />
          <span>Site visit before any payment</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="w-4 h-4 text-[#4A7C6F]" />
          <span>Installation in 3–4 working days</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <CheckCircle2 className="w-4 h-4 text-[#4A7C6F]" />
          <span>50% balance only after your approval</span>
        </div>
      </div>
    </div>
  );
}
