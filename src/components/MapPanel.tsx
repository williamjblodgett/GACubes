"use client";

import { useSearch } from "@/lib/search-context";
import { GA_CENTER, CATEGORY_COLORS } from "@/lib/types";

const MARKER_COLORS: Record<string, string> = {
  "bg-blue-500": "#3b82f6",
  "bg-cyan-500": "#06b6d4",
  "bg-indigo-500": "#6366f1",
  "bg-orange-500": "#f97316",
  "bg-amber-500": "#f59e0b",
  "bg-green-500": "#22c55e",
  "bg-yellow-600": "#ca8a04",
  "bg-purple-500": "#a855f7",
};

export default function MapPanel() {
  const { results, selectedId, selectListing, filters } = useSearch();

  const center = filters.lat && filters.lng
    ? { lat: filters.lat, lng: filters.lng }
    : GA_CENTER;

  return (
    <div className="relative w-full h-full bg-gray-100">
      {/* Static map placeholder - replace with Google Maps when API key available */}
      <div className="absolute inset-0 flex flex-col">
        {/* Map background */}
        <div className="flex-1 relative bg-gradient-to-br from-green-50 to-blue-50 overflow-hidden">
          {/* Grid lines for map feel */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute w-full border-t border-gray-400"
                style={{ top: `${i * 5}%` }}
              />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute h-full border-l border-gray-400"
                style={{ left: `${i * 5}%` }}
              />
            ))}
          </div>

          {/* State outline hint */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-9xl font-bold text-gray-200 select-none">
              GA
            </span>
          </div>

          {/* Marker dots */}
          {results.map((listing) => {
            const colorClass = CATEGORY_COLORS[listing.category_primary];
            const color = MARKER_COLORS[colorClass] || "#3b82f6";
            // Project lat/lng to relative position within Georgia bounds
            const x = ((listing.lng - (-85.6)) / ((-80.8) - (-85.6))) * 100;
            const y = ((34.8 - listing.lat) / (34.8 - 30.4)) * 100;

            return (
              <button
                key={listing.id}
                onClick={() => selectListing(listing.id)}
                className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-150 z-10 ${
                  listing.id === selectedId ? "scale-150 ring-2 ring-blue-400" : ""
                }`}
                style={{
                  left: `${Math.max(5, Math.min(95, x))}%`,
                  top: `${Math.max(5, Math.min(95, y))}%`,
                  backgroundColor: color,
                }}
                title={listing.name}
              />
            );
          })}

          {/* User location marker */}
          {center.lat !== GA_CENTER.lat && (
            <div
              className="absolute w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-20"
              style={{
                left: `${Math.max(5, Math.min(95, ((center.lng - (-85.6)) / ((-80.8) - (-85.6))) * 100))}%`,
                top: `${Math.max(5, Math.min(95, ((34.8 - center.lat) / (34.8 - 30.4)) * 100))}%`,
              }}
            >
              <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-50" />
            </div>
          )}

          {/* Map attribution */}
          <div className="absolute bottom-2 right-2 bg-white/80 rounded px-2 py-1 text-xs text-gray-500">
            Add Google Maps API key for interactive map
          </div>
        </div>
      </div>
    </div>
  );
}
