"use client";

import { useState, useEffect } from "react";
import { useSearch } from "@/lib/search-context";
import { CATEGORY_LABELS, CategoryType, RADIUS_OPTIONS } from "@/lib/types";
import { SlidersHorizontal, X } from "lucide-react";

export default function MobileFilters() {
  const [open, setOpen] = useState(false);
  const { filters, updateFilters, resetFilters } = useSearch();

  // Lock body scroll when modal is open to prevent map interaction behind
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [open]);

  const toggleCategory = (cat: CategoryType) => {
    const cats = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    updateFilters({ categories: cats });
  };

  const activeCount =
    filters.categories.length +
    [filters.openNow, filters.open24h, filters.cardAccepted, filters.hasWaterRefill,
     filters.hasDryIce, filters.hasPropane, filters.nearBeer, filters.highDensity].filter(Boolean).length;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white hover:bg-white/10"
      >
        <SlidersHorizontal size={16} />
        {activeCount > 0 && (
          <span className="w-5 h-5 bg-primary text-white rounded-full text-[10px] font-bold flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          onTouchMove={(e) => {
            // Allow scrolling inside the content area but prevent backdrop touch-through
            const target = e.target as HTMLElement;
            if (!target.closest("[data-filter-content]")) {
              e.preventDefault();
            }
          }}
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            onTouchEnd={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 bg-surface rounded-t-3xl flex flex-col"
            style={{ maxHeight: "70vh" }}
          >
            <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
              <h2 className="font-bold text-foreground">Filters</h2>
              <button onClick={() => setOpen(false)} className="p-1">
                <X size={24} className="text-muted" />
              </button>
            </div>

            <div
              data-filter-content
              className="p-4 space-y-5 overflow-y-auto flex-1 min-h-0 overscroll-contain"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div>
                <h3 className="text-sm font-bold text-foreground mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(CATEGORY_LABELS) as CategoryType[]).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                        filters.categories.includes(cat)
                          ? "bg-primary text-white"
                          : "bg-surface-secondary text-muted hover:text-foreground"
                      }`}
                    >
                      {CATEGORY_LABELS[cat]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-foreground mb-3">Distance</h3>
                <div className="flex gap-2">
                  {RADIUS_OPTIONS.map((r) => (
                    <button
                      key={r}
                      onClick={() => updateFilters({ radius: r })}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold ${
                        filters.radius === r ? "bg-primary text-white" : "bg-surface-secondary text-muted"
                      }`}
                    >
                      {r} mi
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
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
                  <label key={key} className="flex items-center justify-between py-1.5">
                    <span className="text-sm text-foreground">{label}</span>
                    <input
                      type="checkbox"
                      checked={filters[key] as boolean}
                      onChange={() => updateFilters({ [key]: !filters[key] })}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div
              className="p-4 border-t border-border flex gap-3 shrink-0"
              style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
            >
              <button
                onClick={() => { resetFilters(); setOpen(false); }}
                className="flex-1 py-3.5 border border-border rounded-xl text-sm font-semibold text-foreground active:bg-surface-secondary"
              >
                Reset
              </button>
              <button
                onClick={() => setOpen(false)}
                className="flex-1 py-3.5 bg-primary text-white rounded-xl text-sm font-bold active:bg-primary-hover"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
