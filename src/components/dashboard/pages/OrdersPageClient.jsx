"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  CheckCircle,
  Clock,
  CreditCard,
  Search,
  X,
  Eye,
  MessageCircle,
  Phone,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  SearchX,
} from "lucide-react";

export const demoOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-11-10",
    status: "Completed",
    items: [
      {
        name: "Royal Floral 3D Wallpaper",
        category: "3D Wallpaper",
        area: 240,
        pricePerSqft: 140,
        price: 33600,
        gradientFrom: "#C8956C",
        gradientTo: "#D4B896",
      },
    ],
    totalCost: 33600,
    advancePaid: 16800,
    balanceDue: 0,
    address: "House 12, Road 5, Dhanmondi, Dhaka",
    phone: "01772132818",
    siteVisitDate: "2024-11-08",
    installDate: "2024-11-12",
    note: "Bedroom and living room walls",
  },
  {
    id: "ORD-2024-002",
    date: "2024-12-01",
    status: "In Progress",
    items: [
      {
        name: "Ocean Blue Epoxy",
        category: "3D Epoxy Floor",
        area: 180,
        pricePerSqft: 450,
        price: 81000,
        gradientFrom: "#1e3a5f",
        gradientTo: "#4A7C6F",
      },
      {
        name: "Cloud Dream Ceiling",
        category: "3D Ceiling Paper",
        area: 120,
        pricePerSqft: 140,
        price: 16800,
        gradientFrom: "#b8d4e8",
        gradientTo: "#e8f4fd",
      },
    ],
    totalCost: 97800,
    advancePaid: 48900,
    balanceDue: 48900,
    address: "Flat 3B, Mirpur 10, Dhaka",
    phone: "01976600300",
    siteVisitDate: "2024-11-28",
    installDate: "2024-12-03",
    note: "",
  },
  {
    id: "ORD-2024-003",
    date: "2024-12-15",
    status: "Confirmed",
    items: [
      {
        name: "Golden Damask Wallpaper",
        category: "3D Wallpaper",
        area: 160,
        pricePerSqft: 140,
        price: 22400,
        gradientFrom: "#c9a84c",
        gradientTo: "#D4B896",
      },
    ],
    totalCost: 22400,
    advancePaid: 11200,
    balanceDue: 11200,
    address: "Block C, Bashundhara R/A, Dhaka",
    phone: "01772132818",
    siteVisitDate: "2024-12-18",
    installDate: "2024-12-22",
    note: "Master bedroom only",
  },
  {
    id: "ORD-2024-004",
    date: "2024-12-20",
    status: "Pending",
    items: [
      {
        name: "Marble White Epoxy Floor",
        category: "3D Epoxy Floor",
        area: 200,
        pricePerSqft: 450,
        price: 90000,
        gradientFrom: "#e8e8e8",
        gradientTo: "#ffffff",
      },
    ],
    totalCost: 90000,
    advancePaid: 0,
    balanceDue: 90000,
    address: "Road 11, Uttara Sector 7, Dhaka",
    phone: "01973600700",
    siteVisitDate: "",
    installDate: "",
    note: "Full drawing room floor",
  },
  {
    id: "ORD-2024-005",
    date: "2024-10-05",
    status: "Cancelled",
    items: [
      {
        name: "Tropical Leaf Wallpaper",
        category: "3D Wallpaper",
        area: 100,
        pricePerSqft: 140,
        price: 14000,
        gradientFrom: "#4A7C6F",
        gradientTo: "#2C2C2C",
      },
    ],
    totalCost: 14000,
    advancePaid: 0,
    balanceDue: 0,
    address: "Agrabad, Chittagong",
    phone: "01772132818",
    siteVisitDate: "",
    installDate: "",
    note: "Cancelled by customer",
  },
];

const statusConfig = {
  Pending: { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-400" },
  Confirmed: { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-400" },
  "In Progress": {
    bg: "bg-orange-100",
    text: "text-orange-700",
    dot: "bg-[#C8956C]",
  },
  Completed: {
    bg: "bg-green-100",
    text: "text-green-700",
    dot: "bg-[#4A7C6F]",
  },
  Cancelled: { bg: "bg-red-100", text: "text-red-600", dot: "bg-red-400" },
};

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-BD", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

const filters = [
  "All",
  "Pending",
  "Confirmed",
  "In Progress",
  "Completed",
  "Cancelled",
];
const ROWS_PER_PAGE = 5;

function SortIcon({ field, sortField, sortDir }) {
  if (sortField !== field)
    return <ChevronsUpDown className="w-3.5 h-3.5 text-gray-300" />;
  return sortDir === "asc" ? (
    <ChevronUp className="w-3.5 h-3.5 text-[#C8956C]" />
  ) : (
    <ChevronDown className="w-3.5 h-3.5 text-[#C8956C]" />
  );
}

const getPageNumbers = (current, total) => {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, 4, "...", total];
  if (current >= total - 2)
    return [1, "...", total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
};

export default function OrdersPageClient() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);

  // Derived data
  const filterCounts = filters.reduce((acc, f) => {
    acc[f] =
      f === "All"
        ? demoOrders.length
        : demoOrders.filter((o) => o.status === f).length;
    return acc;
  }, {});

  const processed = demoOrders
    .filter((o) => {
      const matchFilter = activeFilter === "All" || o.status === activeFilter;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.items.some((i) => i.name.toLowerCase().includes(q)) ||
        o.address.toLowerCase().includes(q);
      return matchFilter && matchSearch;
    })
    .sort((a, b) => {
      let valA, valB;
      if (sortField === "date") {
        valA = new Date(a.date).getTime();
        valB = new Date(b.date).getTime();
      } else if (sortField === "total") {
        valA = a.totalCost;
        valB = b.totalCost;
      } else if (sortField === "status") {
        valA = a.status;
        valB = b.status;
      }
      if (sortDir === "asc") return valA > valB ? 1 : -1;
      return valA < valB ? 1 : -1;
    });

  const totalPages = Math.ceil(processed.length / ROWS_PER_PAGE);
  const paginated = processed.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE,
  );

  // Reset page on filter/search change
  useEffect(() => {
    setTimeout(() => setCurrentPage(1), 0);
  }, [activeFilter, searchQuery]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const handleClearFilters = () => {
    setActiveFilter("All");
    setSearchQuery("");
  };

  const handleWhatsApp = (e, order) => {
    e.stopPropagation();
    const phone = order.phone.startsWith("0")
      ? "88" + order.phone
      : order.phone;
    window.open(
      `https://wa.me/${phone}?text=Hi, I'm inquiring about order ${order.id}`,
      "_blank",
    );
  };

  const handleView = (e, id) => {
    e.stopPropagation();
    router.push(`/dashboard/orders/${id}`);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Section 1: Page Header */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C2C2C] font-playfair">
            My Orders
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Track and manage all your orders
          </p>
        </div>
        <a
          href="tel:+8801772132818"
          className="border border-gray-200 text-gray-600 text-sm rounded-xl px-4 py-2.5 flex items-center gap-2 hover:border-[#C8956C] hover:text-[#C8956C] transition-all"
        >
          <Phone className="w-3.5 h-3.5" />
          Need Help?
        </a>
      </div>

      {/* Section 2: Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C8956C]/10 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-[#C8956C]" />
          </div>
          <div>
            <p className="text-xl font-bold text-[#2C2C2C]">
              {demoOrders.length}
            </p>
            <p className="text-xs text-gray-400">Total Orders</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <p className="text-xl font-bold text-[#2C2C2C]">
              {demoOrders.filter((o) => o.status === "Completed").length}
            </p>
            <p className="text-xs text-gray-400">Completed</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
            <Clock className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <p className="text-xl font-bold text-[#2C2C2C]">
              {demoOrders.filter((o) => o.status === "In Progress").length}
            </p>
            <p className="text-xs text-gray-400">In Progress</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#4A7C6F]/10 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-[#4A7C6F]" />
          </div>
          <div>
            <p className="text-xl font-bold text-[#2C2C2C]">
              ৳
              {demoOrders
                .reduce((s, o) => s + o.advancePaid, 0)
                .toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-gray-400">Total Paid</p>
          </div>
        </div>
      </div>

      {/* Section 3: Filter + Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex gap-2 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeFilter === filter
                  ? "bg-[#C8956C] text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter}
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded-full ml-0.5 ${
                  activeFilter === filter
                    ? "bg-white/30 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {filterCounts[filter]}
              </span>
            </button>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order ID, product name or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#C8956C] focus:ring-2 focus:ring-[#C8956C]/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="text-sm text-gray-500 flex items-center whitespace-nowrap self-center">
            {processed.length} result{processed.length !== 1 ? "s" : ""}
            {(activeFilter !== "All" || searchQuery) && (
              <button
                onClick={handleClearFilters}
                className="text-[#C8956C] hover:underline ml-2"
              >
                · Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Section 4: Table (Desktop) + Cards (Mobile) */}
      {/* Desktop Table */}
      <div className="hidden sm:block bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-[200px]">
                Order
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-[220px]">
                Items
              </th>
              <th
                className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-pointer hover:text-[#2C2C2C] transition-colors select-none"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center gap-1">
                  Date
                  <SortIcon
                    field="date"
                    sortField={sortField}
                    sortDir={sortDir}
                  />
                </div>
              </th>
              <th
                className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-pointer hover:text-[#2C2C2C] transition-colors select-none"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center gap-1">
                  Status
                  <SortIcon
                    field="status"
                    sortField={sortField}
                    sortDir={sortDir}
                  />
                </div>
              </th>
              <th
                className="px-5 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-pointer hover:text-[#2C2C2C] transition-colors select-none"
                onClick={() => handleSort("total")}
              >
                <div className="flex items-center justify-end gap-1">
                  Amount
                  <SortIcon
                    field="total"
                    sortField={sortField}
                    sortDir={sortDir}
                  />
                </div>
              </th>
              <th className="px-5 py-3.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide w-[120px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <SearchX className="w-10 h-10 text-gray-200" />
                    <p className="text-gray-400 font-medium">No orders found</p>
                    {(activeFilter !== "All" || searchQuery) && (
                      <button
                        onClick={handleClearFilters}
                        className="text-[#C8956C] text-sm hover:underline"
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 hover:bg-[#FAF7F2] transition-colors group cursor-pointer"
                  onClick={() => router.push(`/dashboard/orders/${order.id}`)}
                >
                  <td className="px-5 py-4">
                    <p className="font-mono text-sm font-bold text-[#2C2C2C] group-hover:text-[#C8956C] transition-colors">
                      #{order.id}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5" />
                      {formatDate(order.date)}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    {order.items.length === 1 ? (
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-lg flex-shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${order.items[0].gradientFrom}, ${order.items[0].gradientTo})`,
                          }}
                        />
                        <div>
                          <p className="text-sm text-[#2C2C2C] line-clamp-1 max-w-[160px]">
                            {order.items[0].name}
                          </p>
                          <p className="text-[11px] text-gray-400">
                            {order.items[0].category}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="relative w-10 h-8">
                          <div
                            className="absolute left-0 top-0 w-8 h-8 rounded-lg border-2 border-white"
                            style={{
                              background: `linear-gradient(135deg, ${order.items[0].gradientFrom}, ${order.items[0].gradientTo})`,
                            }}
                          />
                          <div
                            className="absolute left-3 top-0 w-8 h-8 rounded-lg border-2 border-white z-10"
                            style={{
                              background: `linear-gradient(135deg, ${order.items[1].gradientFrom}, ${order.items[1].gradientTo})`,
                            }}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#2C2C2C]">
                            {order.items.length} items
                          </p>
                          <p className="text-[11px] text-gray-400 max-w-[140px] truncate">
                            {order.items.map((i) => i.category).join(", ")}
                          </p>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">
                    <p className="font-medium">{formatDate(order.date)}</p>
                    {order.installDate && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        Install: {formatDate(order.installDate)}
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${statusConfig[order.status].bg} ${statusConfig[order.status].text}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${statusConfig[order.status].dot}`}
                      />
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <p className="font-bold text-[#2C2C2C] text-sm">
                      ৳{order.totalCost.toLocaleString("en-IN")}
                    </p>
                    {order.balanceDue > 0 ? (
                      <p className="text-[11px] text-amber-600 font-medium mt-0.5">
                        Due: ৳{order.balanceDue.toLocaleString("en-IN")}
                      </p>
                    ) : order.status === "Completed" ? (
                      <p className="text-[11px] text-green-600 mt-0.5">
                        Fully Paid
                      </p>
                    ) : null}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={(e) => handleView(e, order.id)}
                        className="inline-flex items-center gap-1 border border-gray-200 text-gray-600 text-xs rounded-lg px-3 py-1.5 hover:border-[#C8956C] hover:text-[#C8956C] transition-all"
                      >
                        <Eye className="w-3 h-3" />
                        View
                      </button>
                      {order.status !== "Cancelled" && (
                        <button
                          onClick={(e) => handleWhatsApp(e, order)}
                          className="w-7 h-7 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden flex flex-col gap-3">
        {paginated.length === 0 ? (
          <div className="py-16 text-center">
            <SearchX className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 font-medium mb-3">No orders found</p>
            {(activeFilter !== "All" || searchQuery) && (
              <button
                onClick={handleClearFilters}
                className="text-[#C8956C] text-sm hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          paginated.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-4 shadow-sm border-l-4"
              style={{
                borderLeftColor:
                  order.status === "Pending"
                    ? "#fbbf24"
                    : order.status === "Confirmed"
                      ? "#3b82f6"
                      : order.status === "In Progress"
                        ? "#C8956C"
                        : order.status === "Completed"
                          ? "#4A7C6F"
                          : "#ef4444",
              }}
            >
              {/* Top row */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-mono text-sm font-bold text-[#2C2C2C]">
                    #{order.id}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {formatDate(order.date)}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusConfig[order.status].bg} ${statusConfig[order.status].text}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${statusConfig[order.status].dot}`}
                  />
                  {order.status}
                </span>
              </div>

              {/* Middle row */}
              <div className="mt-3 flex items-center gap-3">
                {order.items.length === 1 ? (
                  <>
                    <div
                      className="w-10 h-10 rounded-lg flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${order.items[0].gradientFrom}, ${order.items[0].gradientTo})`,
                      }}
                    />
                    <div>
                      <p className="text-sm font-medium text-[#2C2C2C] line-clamp-1">
                        {order.items[0].name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {order.items[0].category}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="relative w-10 h-10">
                      <div
                        className="absolute left-0 top-0 w-8 h-8 rounded-lg border-2 border-white"
                        style={{
                          background: `linear-gradient(135deg, ${order.items[0].gradientFrom}, ${order.items[0].gradientTo})`,
                        }}
                      />
                      <div
                        className="absolute left-3 top-0 w-8 h-8 rounded-lg border-2 border-white z-10"
                        style={{
                          background: `linear-gradient(135deg, ${order.items[1].gradientFrom}, ${order.items[1].gradientTo})`,
                        }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#2C2C2C]">
                        {order.items.length} items
                      </p>
                      <p className="text-[11px] text-gray-400 truncate">
                        {order.items.map((i) => i.category).join(", ")}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom row */}
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                <p className="font-bold text-[#C8956C]">
                  ৳{order.totalCost.toLocaleString("en-IN")}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/dashboard/orders/${order.id}`)}
                    className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 hover:border-[#C8956C] hover:text-[#C8956C] transition-all"
                  >
                    View
                  </button>
                  {order.status !== "Cancelled" && (
                    <button
                      onClick={(e) => handleWhatsApp(e, order)}
                      className="w-7 h-7 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Section 5: Table Footer */}
      {totalPages > 0 && (
        <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            Showing {Math.max(1, (currentPage - 1) * ROWS_PER_PAGE + 1)}–
            {Math.min(currentPage * ROWS_PER_PAGE, processed.length)} of{" "}
            {processed.length} order{processed.length !== 1 ? "s" : ""}
            {(activeFilter !== "All" || searchQuery) && (
              <span className="text-gray-400">
                {" "}
                (filtered from {demoOrders.length} total)
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
                currentPage === 1
                  ? "opacity-40 cursor-not-allowed bg-white text-gray-300"
                  : "border border-gray-200 hover:border-[#C8956C] hover:text-[#C8956C] text-gray-500"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {getPageNumbers(currentPage, totalPages).map((page, idx) => (
              <span key={idx}>
                {page === "..." ? (
                  <span className="px-2 text-gray-400 text-sm select-none">
                    ...
                  </span>
                ) : (
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                      page === currentPage
                        ? "bg-[#C8956C] text-white shadow-sm"
                        : "border border-gray-200 text-gray-600 hover:border-[#C8956C] hover:text-[#C8956C]"
                    }`}
                  >
                    {page}
                  </button>
                )}
              </span>
            ))}
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
                currentPage === totalPages || totalPages === 0
                  ? "opacity-40 cursor-not-allowed bg-white text-gray-300"
                  : "border border-gray-200 hover:border-[#C8956C] hover:text-[#C8956C] text-gray-500"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-gray-400 ml-2">
              {ROWS_PER_PAGE} per page
            </span>
          </div>
        </div>
      )}

      {/* Section 6: Quick Contact Strip */}
      <div className="bg-[#2C2C2C] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-white text-sm font-medium">
            Have questions about an order?
          </p>
          <p className="text-gray-400 text-xs mt-0.5">
            Our team responds within 1 hour during business hours.
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href="tel:+8801772132818"
            className="border border-white/20 text-white rounded-xl px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-white/10 transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            Call Us
          </a>
          <a
            href="https://wa.me/8801772132818"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white rounded-xl px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-green-500 transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
