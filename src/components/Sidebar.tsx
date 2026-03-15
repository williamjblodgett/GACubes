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
  const { filters, updateFilters, resetFilters, locateMe, loading } =
    useSearch();

  const toggleCategory = (cat: CategoryType) => {
    const cats = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    updateFilters({ categories: cats });
  };

  return (
    <aside className="w-full lg:w-80 bg-white border-r border-gray-200 flex flex-col h-full overflow-y-auto">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Snowflake size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">GACubes</span>
        </a>
        <p className="text-xs text-gray-500 mt-1">
          Georgia Ice + Water + Essentials
        </p>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-200 space-y-3">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Town, ZIP, or business..."
            value={filters.query}
            onChange={(e) => updateFilters({ query: e.target.value })}
            className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <button
          onClick={locateMe}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <MapPin size={16} />
          {loading ? "Locating..." : "Use My Location"}
        </button>
      </div>

      {/* Categories */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Categories
        </h3>
        <div className="space-y-1">
          {(Object.keys(CATEGORY_LABELS) as CategoryType[]).map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                filters.categories.includes(cat)
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {CATEGORY_ICONS[cat]}
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Distance */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Distance
        </h3>
        <div className="flex gap-2 flex-wrap">
          {RADIUS_OPTIONS.map((r) => (
            <button
              key={r}
              onClick={() => updateFilters({ radius: r })}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filters.radius === r
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {r} mi
            </button>
          ))}
        </div>
      </div>

      {/* Quick Filters */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Quick Filters
        </h3>
        <div className="space-y-2">
          {[
            {
              key: "openNow" as const,
              label: "Open Now",
              icon: <Clock size={14} />,
            },
            {
              key: "open24h" as const,
              label: "24/7",
              icon: <Clock size={14} />,
            },
            {
              key: "cardAccepted" as const,
              label: "Card Accepted",
              icon: <CreditCard size={14} />,
            },
            {
              key: "hasWaterRefill" as const,
              label: "Water Refill",
              icon: <Droplets size={14} />,
            },
            {
              key: "hasDryIce" as const,
              label: "Dry Ice",
              icon: <Snowflake size={14} />,
            },
            {
              key: "hasPropane" as const,
              label: "Propane",
              icon: <Flame size={14} />,
            },
            {
              key: "nearBeer" as const,
              label: "Near Beer / Drinks",
              icon: <Beer size={14} />,
            },
            {
              key: "highDensity" as const,
              label: "High Density Area",
              icon: <BarChart3 size={14} />,
            },
          ].map(({ key, label, icon }) => (
            <label
              key={key}
              className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters[key] as boolean}
                onChange={() =>
                  updateFilters({ [key]: !filters[key] })
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              {icon}
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Sort By
        </h3>
        <select
          value={filters.sortBy}
          onChange={(e) =>
            updateFilters({
              sortBy: e.target.value as SearchFilters["sortBy"],
            })
          }
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="distance">Closest First</option>
          <option value="rating">Highest Rated</option>
          <option value="density">Most Options Nearby</option>
        </select>
      </div>

      {/* Reset */}
      <div className="p-4">
        <button
          onClick={resetFilters}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <RotateCcw size={14} />
          Reset Filters
        </button>
      </div>
    </aside>
  );
}
