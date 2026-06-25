"use client";

import Link from "next/link";
import { demoOrders } from "./OrdersPageClient";
import {
  PackageX,
  ChevronLeft,
  FileText,
  MapPin,
  CheckCircle,
  Hammer,
  Star,
  XCircle,
  Calendar,
  Package,
  Clock,
  CreditCard,
  Info,
  MessageCircle,
  Phone,
  Download,
  HelpCircle,
} from "lucide-react";

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-BD", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "N/A";

const statusConfig = {
  Pending: { bg: "bg-amber-100", text: "text-amber-700" },
  Confirmed: { bg: "bg-blue-100", text: "text-blue-700" },
  "In Progress": { bg: "bg-[#C8956C]/15", text: "text-[#C8956C]" },
  Completed: { bg: "bg-[#4A7C6F]/15", text: "text-[#4A7C6F]" },
  Cancelled: { bg: "bg-red-100", text: "text-red-600" },
};

export default function OrderDetailClient({ orderId }) {
  const order = demoOrders.find((o) => o.id === orderId);

  const statusToStep = {
    Pending: 0,
    Confirmed: 2,
    "In Progress": 3,
    Completed: 4,
    Cancelled: -1,
  };
  const currentStep = order ? statusToStep[order.status] : -1;

  const timelineSteps = order
    ? [
        {
          key: "requested",
          label: "Quote Requested",
          description: "Order placed and quote request submitted",
          date: order.date,
          icon: FileText,
        },
        {
          key: "visit",
          label: "Site Visit Scheduled",
          description: "Our expert will visit for measurement",
          date: order.siteVisitDate,
          icon: MapPin,
        },
        {
          key: "confirmed",
          label: "Design Confirmed",
          description: "Design finalized and advance payment received",
          date: order.siteVisitDate,
          icon: CheckCircle,
        },
        {
          key: "installation",
          label: "Installation In Progress",
          description: "Our team is installing your designs",
          date: order.installDate,
          icon: Hammer,
        },
        {
          key: "completed",
          label: "Completed & Handed Over",
          description: "Installation complete, balance payment received",
          date: order.status === "Completed" ? order.installDate : "",
          icon: Star,
        },
      ]
    : [];

  const handleDownloadInvoice = () => {
    if (!order) return;

    const invoiceContent = `RS 3D Wallpaper & Floor — Invoice
================================
Order ID: ${order.id}
Date: ${order.date}
Status: ${order.status}

ITEMS:
${order.items.map((i) => `${i.name} | ${i.area} sqft | ৳${i.price}`).join("\n")}

Total Cost: ৳${order.totalCost}
Advance Paid: ৳${order.advancePaid}
Balance Due: ৳${order.balanceDue}

Delivery Address: ${order.address}
Phone: ${order.phone}
Site Visit: ${order.siteVisitDate || "N/A"}
Install Date: ${order.installDate || "N/A"}

RS Wallpaper & Floor | 01772-132818 | wa.me/+8801772132818`;

    const blob = new Blob([invoiceContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${order.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Not found state
  if (!order) {
    return (
      <div className="py-20 flex flex-col items-center gap-4">
        <PackageX className="w-16 h-16 text-gray-200" />
        <h1 className="text-2xl font-bold text-[#2C2C2C] font-playfair">
          Order Not Found
        </h1>
        <p className="text-sm text-gray-400">
          The order ID {orderId} doesn&apos;t exist in your account.
        </p>
        <Link
          href="/dashboard/orders"
          className="bg-[#C8956C] text-white rounded-xl px-6 py-3 flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Back + Header Row */}
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard/orders"
          className="text-sm text-[#C8956C] hover:underline flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          My Orders
        </Link>
      </div>

      {/* Main Grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-5">
          {/* Card 1: Order Header */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start flex-wrap gap-3">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                  Order Details
                </p>
                <h1 className="text-2xl font-bold text-[#2C2C2C] font-playfair">
                  {order.id}
                </h1>
              </div>
              <span
                className={`rounded-full px-4 py-1.5 text-sm font-semibold ${statusConfig[order.status].bg} ${statusConfig[order.status].text}`}
              >
                {order.status}
              </span>
            </div>

            {/* Info Pills */}
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="flex items-center gap-2 bg-[#FAF7F2] rounded-xl px-4 py-2.5">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wide">
                    Order Date
                  </p>
                  <p className="text-sm font-medium text-[#2C2C2C]">
                    {formatDate(order.date)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-[#FAF7F2] rounded-xl px-4 py-2.5">
                <MapPin className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wide">
                    Site Visit
                  </p>
                  <p className="text-sm font-medium text-[#2C2C2C]">
                    {order.siteVisitDate
                      ? formatDate(order.siteVisitDate)
                      : "Not scheduled"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-[#FAF7F2] rounded-xl px-4 py-2.5">
                <Hammer className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wide">
                    Installation
                  </p>
                  <p className="text-sm font-medium text-[#2C2C2C]">
                    {order.installDate
                      ? formatDate(order.installDate)
                      : "Not scheduled"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-[#FAF7F2] rounded-xl px-4 py-2.5">
                <Phone className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wide">
                    Contact
                  </p>
                  <p className="text-sm font-medium text-[#2C2C2C]">
                    {order.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Note */}
            {order.note && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mt-4 flex items-start gap-2 text-sm">
                <MessageCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-amber-800">{order.note}</p>
              </div>
            )}
          </div>

          {/* Card 2: Order Items */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <Package className="w-4.5 h-4.5 text-[#C8956C]" />
              <h2 className="font-semibold text-[#2C2C2C]">Order Items</h2>
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full ml-auto">
                {order.items.length}{" "}
                {order.items.length === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="flex flex-col divide-y divide-gray-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 py-4">
                  <div
                    className="w-14 h-14 rounded-xl flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#2C2C2C] text-sm">
                      {item.name}
                    </p>
                    <span className="text-[11px] bg-[#4A7C6F]/10 text-[#4A7C6F] rounded-full px-2 py-0.5 w-fit mt-1 inline-block">
                      {item.category}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      ৳{item.pricePerSqft}/sqft × {item.area} sqft
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-[#2C2C2C]">
                      ৳{item.price.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-gray-400">{item.area} sqft</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 mt-2 border-t-2 border-gray-100">
              <p className="font-semibold text-[#2C2C2C]">Total Amount</p>
              <p className="text-2xl font-bold text-[#C8956C] font-playfair">
                ৳{order.totalCost.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* Card 3: Order Timeline */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-4.5 h-4.5 text-[#C8956C]" />
              <h2 className="font-semibold text-[#2C2C2C]">Order Progress</h2>
            </div>

            {order.status === "Cancelled" ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                <XCircle className="w-6 h-6 text-red-500" />
                <div>
                  <p className="font-semibold text-red-700">Order Cancelled</p>
                  <p className="text-sm text-red-500">
                    This order was cancelled.
                    {order.note && ` ${order.note}`}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                {timelineSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  return (
                    <div key={step.key} className="flex gap-4 relative">
                      {/* Left: Connector Column */}
                      <div className="flex flex-col items-center w-8 flex-shrink-0">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                            index < currentStep
                              ? "bg-[#4A7C6F]"
                              : index === currentStep
                                ? "bg-[#C8956C] ring-4 ring-[#C8956C]/20"
                                : "bg-gray-100 border-2 border-gray-200"
                          }`}
                        >
                          {index < currentStep ? (
                            <CheckCircle className="w-4 h-4 text-white" />
                          ) : (
                            <StepIcon
                              className={`w-4 h-4 ${
                                index === currentStep
                                  ? "text-white"
                                  : "text-gray-300"
                              }`}
                            />
                          )}
                        </div>
                        {index < timelineSteps.length - 1 && (
                          <div
                            className={`w-0.5 flex-1 min-h-[32px] mt-1 transition-colors duration-300 ${
                              index < currentStep
                                ? "bg-[#4A7C6F]"
                                : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>
                      {/* Right: Step Content */}
                      <div className="flex-1 pb-6">
                        <p
                          className={`text-sm font-semibold ${
                            index <= currentStep
                              ? "text-[#2C2C2C]"
                              : "text-gray-400"
                          }`}
                        >
                          {step.label}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {step.description}
                        </p>
                        {step.date && index <= currentStep && (
                          <p className="text-xs text-[#4A7C6F] font-medium mt-1 flex items-center gap-1">
                            <Calendar className="w-2.75 h-2.75" />
                            {formatDate(step.date)}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-5">
          {/* Payment Summary Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
            <div className="flex items-center gap-2 mb-5">
              <CreditCard className="w-4.5 h-4.5 text-[#C8956C]" />
              <h2 className="font-semibold text-[#2C2C2C]">Payment Summary</h2>
            </div>

            <div className="flex flex-col gap-3">
              {/* Row 1: Total Cost */}
              <div className="flex justify-between items-center bg-[#FAF7F2] rounded-xl px-4 py-3">
                <p className="text-sm font-medium">Total Cost</p>
                <p className="font-bold text-[#2C2C2C]">
                  ৳{order.totalCost.toLocaleString("en-IN")}
                </p>
              </div>
              {/* Row 2: Advance Paid */}
              <div className="flex justify-between items-center bg-[#4A7C6F]/10 rounded-xl px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-[#4A7C6F]">
                    Advance Paid (50%)
                  </p>
                  <p className="text-xs text-gray-400">Paid to confirm order</p>
                </div>
                <p className="font-bold text-[#4A7C6F]">
                  ৳{order.advancePaid.toLocaleString("en-IN")}
                </p>
              </div>
              {/* Row 3: Balance Due */}
              <div
                className={`flex justify-between items-center rounded-xl px-4 py-3 ${
                  order.balanceDue > 0 ? "bg-amber-50" : "bg-gray-50"
                }`}
              >
                <div>
                  <p
                    className={`text-sm font-medium ${
                      order.balanceDue > 0 ? "text-amber-700" : "text-gray-500"
                    }`}
                  >
                    Balance Due (50%)
                  </p>
                  <p className="text-xs text-gray-400">
                    Pay after installation
                  </p>
                </div>
                {order.balanceDue > 0 ? (
                  <p className="font-bold text-amber-700">
                    ৳{order.balanceDue.toLocaleString("en-IN")}
                  </p>
                ) : (
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-[#4A7C6F]" />
                    <p className="font-bold text-[#4A7C6F]">Paid</p>
                  </div>
                )}
              </div>
            </div>

            <p className="text-xs text-gray-400 text-center mt-3 flex items-center justify-center gap-1">
              <Info className="w-3 h-3" />
              Accepted: bKash, Bank Transfer, Cash
            </p>

            {order.balanceDue > 0 && (
              <a
                href={`https://wa.me/${order.phone.startsWith("0") ? "88" + order.phone : order.phone}?text=Hi, I'd like to pay the balance for order ${order.id}. Amount: ৳${order.balanceDue}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white rounded-xl py-3 w-full font-semibold text-sm flex items-center justify-center gap-2 mt-4"
              >
                <MessageCircle className="w-4 h-4" />
                Pay Balance on WhatsApp
              </a>
            )}

            <button
              onClick={handleDownloadInvoice}
              className="border border-gray-200 text-gray-600 rounded-xl py-2.5 w-full text-sm flex items-center justify-center gap-2 mt-3 hover:border-[#C8956C] hover:text-[#C8956C] transition-all"
            >
              <Download className="w-4 h-4" />
              Download Invoice
            </button>
          </div>

          {/* Need Help Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="w-4.5 h-4.5 text-[#C8956C]" />
              <h2 className="font-semibold text-[#2C2C2C]">Need Help?</h2>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              For any questions about this order, contact us directly.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+8801772132818"
                className="border border-gray-200 text-[#2C2C2C] rounded-xl py-3 w-full text-sm font-medium flex items-center justify-center gap-2 hover:border-[#C8956C] hover:text-[#C8956C] transition-all"
              >
                <Phone className="w-4 h-4" />
                Call Us
              </a>
              <a
                href={`https://wa.me/8801772132818?text=Hi, I have a question about order ${order.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white rounded-xl py-3 w-full text-sm font-medium flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp About This Order
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
