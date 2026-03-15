"use client";

import { useSearch } from "@/lib/search-context";
import {
  CATEGORY_LABELS,
  CategoryType,
  RADIUS_OPTIONS,
  SearchFilters,
} from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Snowflake,
  Droplets,
  Flame,
  Beer,
  Store,
  Clock,
  CreditCard,
  BarChart3,
  RotateCcw,
} from "lucide-react";

const CATEGORY_ICONS: Record<CategoryType, React.ReactNode> = {
  "ice-vending": <Snowflake size={16} />,
  "water-refill": <Droplets size={16} />,
  "dry-ice": <Snowflake size={16} />,
  "propane-refill": <Flame size={16} />,
  "propane-exchange": <Flame size={16} />,
  "convenience-store": <Store size={16} />,
  "beer-drinks": <Beer size={16} />,
  "package-store": <Beer size={16} />,
};

export default function Sidebar() {
  const { filters, updateFilters, resetFilters, locateMe, loading } = useSearch();

  const toggleCategory = (cat: CategoryType) => {
    const cats = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    updateFilters({ categories: cats });
  };

  return (
    <aside className="w-full lg:w-80 bg-header-bg text-white flex flex-col h-full overflow-y-auto">
      <div className="p-4 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logos/39C1E6E2-AF08-4656-BAE7-AC123CC3B5BC.png" alt="GACubes" width={32} height={32} className="object-contain" />
          <span className="text-xl font-bold text-white">GACubes</span>
        </Link>
        <p className="text-xs text-white/40 mt-1">Georgia Ice + Water + Essentials</p>
      </div>

      <div className="p-4 border-b border-white/10 space-y-3">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Town, ZIP, or business..."
            value={filters.query}
            onChange={(e) => updateFilters({ query: e.target.value })}
            className="w-full pl-10 pr-3 py-2.5 border border-white/10 rounded-xl text-sm bg-white/5 text-white placeholder:text-white/40 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          />
        </div>
        <button
          onClick={locateMe}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover disabled:opacity-50 transition-colors"
        >
          <MapPin size={16} />
          {loading ? "Locating..." : "Use My Location"}
        </button>
      </div>

      <div className="p-4 border-b border-white/10">
        <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">Categories</h3>
        <div className="space-y-1">
          {(Object.keys(CATEGORY_LABELS) as CategoryType[]).map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors ${
                filters.categories.includes(cat)
                  ? "bg-primary/20 text-primary font-semibold"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {CATEGORY_ICONS[cat]}
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-b border-white/10">
        <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">Distance</h3>
        <div className="flex gap-2 flex-wrap">
          {RADIUS_OPTIONS.map((r) => (
            <button
              key={r}
              onClick={() => updateFilters({ radius: r })}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                filters.radius === r
                  ? "bg-primary text-white"
                  : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10"
              }`}
            >
              {r} mi
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-b border-white/10">
        <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">Quick Filters</h3>
        <div className="space-y-2">
          {[
            { key: "openNow" as const, label: "Open Now", icon: <Clock size={14} /> },
            { key: "open24h" as const, label: "24/7", icon: <Clock size={14} /> },
            { key: "cardAccepted" as const, label: "Card Accepted", icon: <CreditCard size={14} /> },
            { key: "hasWaterRefill" as const, label: "Water Refill", icon: <Droplets size={14} /> },
            { key: "hasDryIce" as const, label: "Dry Ice", icon: <Snowflake size={14} /> },
            { key: "hasPropane" as const, label: "Propane", icon: <Flame size={14} /> },
            { key: "nearBeer" as const, label: "Near Beer / Drinks", icon: <Beer size={14} /> },
            { key: "highDensity" as const, label: "High Density Area", icon: <BarChart3 size={14} /> },
          ].map(({ key, label, icon }) => (
            <label key={key} className="flex items-center gap-2 text-sm text-white/70 cursor-pointer hover:text-white">
              <input
                type="checkbox"
                checked={filters[key] as boolean}
                onChange={() => updateFilters({ [key]: !filters[key] })}
                className="rounded border-white/20 bg-white/5 text-primary focus:ring-primary"
              />
              {icon}
              {label}
            </label>
          ))}
        </div>
      </div>

      <div className="p-4 border-b border-white/10">
        <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">Sort By</h3>
        <select
          value={filters.sortBy}
          onChange={(e) => updateFilters({ sortBy: e.target.value as SearchFilters["sortBy"] })}
          className="w-full border border-white/10 rounded-xl px-3 py-2 text-sm bg-white/5 text-white focus:ring-2 focus:ring-primary outline-none"
        >
          <option value="distance">Closest First</option>
          <option value="rating">Highest Rated</option>
          <option value="density">Most Options Nearby</option>
        </select>
      </div>

      <div className="p-4">
        <button
          onClick={resetFilters}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm text-white/40 hover:text-white transition-colors"
        >
          <RotateCcw size={14} />
          Reset Filters
        </button>
      </div>
    </aside>
  );
}
