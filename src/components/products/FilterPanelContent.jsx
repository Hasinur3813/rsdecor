"use client";

import { useEffect, useState } from "react";
import { Search, X, ChevronDown, ChevronUp, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORY_COUNTS, TAG_OPTIONS } from "@/lib/productFilters";

const CATEGORIES = [
  "All Categories",
  "3D Wallpaper",
  "3D Ceiling Paper",
  "3D Epoxy Floor",
];

const ROOM_TYPES = [
  "Bedroom",
  "Living Room",
  "Kids Room",
  "Office",
  "Kitchen",
  "Dining Room",
  "Any Room",
];

const FINISHES = ["Matte", "Glossy", "Metallic", "3D Embossed"];

const COLOR_SWATCHES = [
  { label: "Warm", color: "#C8956C" },
  { label: "Cool", color: "#4A7C6F" },
  { label: "Neutral", color: "#D4B896" },
  { label: "Dark", color: "#2C2C2C" },
  { label: "Light", color: "#FAF7F2", border: true },
];

const WARRANTY_OPTIONS = [
  "Any Warranty",
  "10 Years",
  "Lifetime",
];

const RATING_OPTIONS = [
  { label: "5.0 only", stars: 5 },
  { label: "4.0 & above", stars: 4 },
  { label: "3.0 & above", stars: 3 },
  { label: "Any Rating", stars: 0 },
];


function Section({ title, children, defaultOpen = true, action }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-light-muted/60 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
      {/* Changed from <button> to <div> */}
      <div className="w-full flex items-center justify-between gap-2 mb-3">
        
        {/* Left side: Clickable title to toggle open/close */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 flex-1 text-left"
        >
          <span className="text-sm font-bold text-dark">{title}</span>
          {open ? (
            <ChevronUp className="w-4 h-4 text-dark-muted" />
          ) : (
            <ChevronDown className="w-4 h-4 text-dark-muted" />
          )}
        </button>

        {/* Right side: Independent action slot (Safe for other buttons!) */}
        {action && (
          <div className="flex items-center gap-2">
            {action}
          </div>
        )}
      </div>
      
      {open && children}
    </div>
  );
}

function CheckboxItem({ label, checked, onChange, count }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left transition-colors",
        checked
          ? "bg-primary/10 text-primary border-l-2 border-primary"
          : "text-dark-muted hover:bg-light",
      )}
    >
      <span
        className={cn(
          "w-4 h-4 rounded border flex items-center justify-center shrink-0",
          checked ? "bg-primary border-primary" : "border-gray-300 bg-white",
        )}
      >
        {checked && <Check className="w-3 h-3 text-white" />}
      </span>
      <span className="flex-1">{label}</span>
      {count != null && (
        <span className="text-xs text-dark-muted">({count})</span>
      )}
    </button>
  );
}

function RadioItem({ label, checked, onChange, count }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left transition-colors",
        checked
          ? "bg-primary/10 text-primary border-l-2 border-primary"
          : "text-dark-muted hover:bg-light",
      )}
    >
      <span
        className={cn(
          "w-4 h-4 rounded border flex items-center justify-center shrink-0",
          checked ? "bg-primary border-primary" : "border-gray-300 bg-white",
        )}
      >
        {checked && <Check className="w-3 h-3 text-white" />}
      </span>
      <span className="flex-1">{label}</span>
      {count != null && (
        <span className="text-xs text-dark-muted">({count})</span>
      )}
    </button>
  );
}

function StarRow({ count }) {
  return (
    <span className="flex text-amber-400 text-xs">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i}>{i <= count ? "★" : "☆"}</span>
      ))}
    </span>
  );
}

export default function FilterPanelContent({
  filters,
  onChange,
  onReset,
  activeCount = 0,
  showHeader = true,
}) {
  const [searchInput, setSearchInput] = useState(filters.q || "");

  useEffect(() => {
    setSearchInput(filters.q || "");
  }, [filters.q]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== (filters.q || "")) {
        onChange({ q: searchInput });
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput, filters.q, onChange]);

  const toggleArray = (key, value) => {
    const current = filters[key] || [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ [key]: next });
  };

  const toggleTag = (tag) => {
    const current = filters.tags || [];
    const next = current.includes(tag)
      ? current.filter((t) => t !== tag)
      : [...current, tag];
    onChange({ tags: next });
  };

  return (
    <div>
      {showHeader && (
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-heading font-bold text-dark">
            Filters{" "}
            {activeCount > 0 && (
              <span className="text-primary">({activeCount})</span>
            )}
          </h2>
        </div>
      )}

      <Section title="Search Products">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-muted" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search designs..."
            className="w-full border border-gray-200 rounded-xl pl-10 pr-10 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => {
                setSearchInput("");
                onChange({ q: "" });
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-muted hover:text-dark"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </Section>

      <Section title="Category">
        <div className="space-y-1">
          {CATEGORIES.map((cat) => (
            <RadioItem
              key={cat}
              label={cat}
              count={CATEGORY_COUNTS[cat]}
              checked={filters.category === cat}
              onChange={() => onChange({ category: cat })}
            />
          ))}
        </div>
      </Section>

      <Section
        title="Room Type"
        action={
          filters.room?.length > 0 ? (
            <button
              type="button"
              onClick={() => onChange({ room: [] })}
              className="text-xs text-primary font-semibold"
            >
              Clear
            </button>
          ) : null
        }
      >
        <div className="space-y-1">
          {ROOM_TYPES.map((room) => (
            <CheckboxItem
              key={room}
              label={room}
              checked={filters.room?.includes(room)}
              onChange={() => toggleArray("room", room)}
            />
          ))}
        </div>
      </Section>

      <Section title="Price Range">
        <div className="flex flex-wrap gap-2 mb-3">
          {["All Prices", "৳140/sqft", "৳450/sqft"].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() =>
                onChange({
                  pricePreset: preset,
                  minPrice: null,
                  maxPrice: null,
                })
              }
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-semibold transition-colors",
                filters.pricePreset === preset
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-dark-muted hover:bg-primary/10",
              )}
            >
              {preset}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min ৳"
            value={filters.minPrice ?? ""}
            onChange={(e) =>
              onChange({
                minPrice: e.target.value ? Number(e.target.value) : null,
                pricePreset: "All Prices",
              })
            }
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <input
            type="number"
            placeholder="Max ৳"
            value={filters.maxPrice ?? ""}
            onChange={(e) =>
              onChange({
                maxPrice: e.target.value ? Number(e.target.value) : null,
                pricePreset: "All Prices",
              })
            }
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
        <p className="text-[11px] text-dark-muted mt-2">Per square foot</p>
      </Section>

      <Section
        title="Finish / Texture"
        action={
          filters.finish?.length > 0 ? (
            <button
              type="button"
              onClick={() => onChange({ finish: [] })}
              className="text-xs text-primary font-semibold"
            >
              Clear
            </button>
          ) : null
        }
      >
        <div className="space-y-1">
          {FINISHES.map((finish) => (
            <CheckboxItem
              key={finish}
              label={finish}
              checked={filters.finish?.includes(finish)}
              onChange={() => toggleArray("finish", finish)}
            />
          ))}
        </div>
      </Section>

      <Section title="Color Family">
        <div className="flex flex-wrap gap-4 justify-center">
          {COLOR_SWATCHES.map((swatch) => (
            <button
              key={swatch.label}
              type="button"
              onClick={() =>
                onChange({
                  color: filters.color === swatch.label ? "" : swatch.label,
                })
              }
              className="flex flex-col items-center gap-1.5"
            >
              <span
                className={cn(
                  "w-8 h-8 rounded-full transition-transform",
                  swatch.border && "border border-gray-300",
                  filters.color === swatch.label &&
                    "ring-2 ring-offset-2 ring-primary scale-110",
                )}
                style={{ backgroundColor: swatch.color }}
              />
              <span className="text-[10px] text-dark-muted">{swatch.label}</span>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Warranty">
        <div className="space-y-1">
          {WARRANTY_OPTIONS.map((option) => (
            <RadioItem
              key={option}
              label={
                option === "10 Years"
                  ? "10 Years (Wallpaper & Ceiling)"
                  : option === "Lifetime"
                    ? "Lifetime (Epoxy Floor)"
                    : option
              }
              checked={filters.warranty === option}
              onChange={() => onChange({ warranty: option })}
            />
          ))}
        </div>
      </Section>

      <Section title="Popular Tags">
        <div className="flex flex-wrap gap-2">
          {TAG_OPTIONS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold transition-colors",
                filters.tags?.includes(tag)
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-primary/10",
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Minimum Rating">
        <div className="space-y-1">
          {RATING_OPTIONS.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => onChange({ rating: option.label })}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left transition-colors",
                filters.rating === option.label
                  ? "bg-primary/10 text-primary"
                  : "text-dark-muted hover:bg-light",
              )}
            >
              {option.stars > 0 ? (
                <StarRow count={option.stars} />
              ) : (
                <span className="text-xs text-gray-400">☆</span>
              )}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </Section>

      {activeCount > 0 && onReset && (
        <button
          type="button"
          onClick={onReset}
          className="w-full mt-2 py-3 rounded-xl border-2 border-primary text-primary text-sm font-semibold hover:bg-primary/5 transition-colors"
        >
          Reset All Filters
        </button>
      )}
    </div>
  );
}
