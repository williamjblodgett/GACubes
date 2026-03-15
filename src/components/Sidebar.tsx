"use client";

import { useSearch } from "@/lib/search-context";
import {
  CATEGORY_LABELS,
  CategoryType,
  RADIUS_OPTIONS,
  SearchFilters,
} from "@/lib/types";
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
    <aside className="w-full lg:w-80 bg-surface border-r border-border flex flex-col h-full overflow-y-auto">
      <div className="p-4 border-b border-border">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Snowflake size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">GACubes</span>
        </a>
        <p className="text-xs text-muted mt-1">Georgia Ice + Water + Essentials</p>
      </div>

      <div className="p-4 border-b border-border space-y-3">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Town, ZIP, or business..."
            value={filters.query}
            onChange={(e) => updateFilters({ query: e.target.value })}
            className="w-full pl-10 pr-3 py-2.5 border border-border rounded-lg text-sm bg-surface text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          />
        </div>
        <button
          onClick={locateMe}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover disabled:opacity-50 transition-colors"
        >
          <MapPin size={16} />
          {loading ? "Locating..." : "Use My Location"}
        </button>
      </div>

      <div className="p-4 border-b border-border">
        <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Categories</h3>
        <div className="space-y-1">
          {(Object.keys(CATEGORY_LABELS) as CategoryType[]).map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                filters.categories.includes(cat)
                  ? "bg-primary-light text-primary font-medium"
                  : "text-foreground hover:bg-surface-secondary"
              }`}
            >
              {CATEGORY_ICONS[cat]}
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-b border-border">
        <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Distance</h3>
        <div className="flex gap-2 flex-wrap">
          {RADIUS_OPTIONS.map((r) => (
            <button
              key={r}
              onClick={() => updateFilters({ radius: r })}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filters.radius === r
                  ? "bg-primary text-white"
                  : "bg-surface-secondary text-muted hover:text-foreground"
              }`}
            >
              {r} mi
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-b border-border">
        <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Quick Filters</h3>
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
            <label key={key} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={filters[key] as boolean}
                onChange={() => updateFilters({ [key]: !filters[key] })}
                className="rounded border-border text-primary focus:ring-primary"
              />
              {icon}
              {label}
            </label>
          ))}
        </div>
      </div>

      <div className="p-4 border-b border-border">
        <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Sort By</h3>
        <select
          value={filters.sortBy}
          onChange={(e) => updateFilters({ sortBy: e.target.value as SearchFilters["sortBy"] })}
          className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-surface text-foreground focus:ring-2 focus:ring-primary outline-none"
        >
          <option value="distance">Closest First</option>
          <option value="rating">Highest Rated</option>
          <option value="density">Most Options Nearby</option>
        </select>
      </div>

      <div className="p-4">
        <button
          onClick={resetFilters}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm text-muted hover:text-foreground transition-colors"
        >
          <RotateCcw size={14} />
          Reset Filters
        </button>
      </div>
    </aside>
  );
}
