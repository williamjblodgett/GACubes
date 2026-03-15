"use client";

import { useState } from "react";
import { useSearch } from "@/lib/search-context";
import { CATEGORY_LABELS, CategoryType, RADIUS_OPTIONS } from "@/lib/types";
import { SlidersHorizontal, X } from "lucide-react";

export default function MobileFilters() {
  const [open, setOpen] = useState(false);
  const { filters, updateFilters, resetFilters } = useSearch();

  const toggleCategory = (cat: CategoryType) => {
    const cats = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    updateFilters({ categories: cats });
  };

  const activeCount =
    filters.categories.length +
    [
      filters.openNow,
      filters.open24h,
      filters.cardAccepted,
      filters.hasWaterRefill,
      filters.hasDryIce,
      filters.hasPropane,
      filters.nearBeer,
      filters.highDensity,
    ].filter(Boolean).length;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
      >
        <SlidersHorizontal size={16} />
        Filters
        {activeCount > 0 && (
          <span className="ml-1 w-5 h-5 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Filters</h2>
              <button onClick={() => setOpen(false)}>
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(CATEGORY_LABELS) as CategoryType[]).map(
                    (cat) => (
                      <button
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          filters.categories.includes(cat)
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {CATEGORY_LABELS[cat]}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Distance */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Distance
                </h3>
                <div className="flex gap-2">
                  {RADIUS_OPTIONS.map((r) => (
                    <button
                      key={r}
                      onClick={() => updateFilters({ radius: r })}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                        filters.radius === r
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {r} mi
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle Filters */}
              <div className="space-y-2">
                {[
                  { key: "openNow" as const, label: "Open Now" },
                  { key: "open24h" as const, label: "24/7" },
                  { key: "cardAccepted" as const, label: "Card Accepted" },
                  { key: "hasWaterRefill" as const, label: "Water Refill" },
                  { key: "hasDryIce" as const, label: "Dry Ice" },
                  { key: "hasPropane" as const, label: "Propane" },
                  { key: "nearBeer" as const, label: "Near Beer / Drinks" },
                  { key: "highDensity" as const, label: "High Density Area" },
                ].map(({ key, label }) => (
                  <label
                    key={key}
                    className="flex items-center justify-between py-2"
                  >
                    <span className="text-sm text-gray-700">{label}</span>
                    <input
                      type="checkbox"
                      checked={filters[key] as boolean}
                      onChange={() =>
                        updateFilters({ [key]: !filters[key] })
                      }
                      className="rounded border-gray-300 text-blue-600"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  resetFilters();
                  setOpen(false);
                }}
                className="flex-1 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700"
              >
                Reset
              </button>
              <button
                onClick={() => setOpen(false)}
                className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
