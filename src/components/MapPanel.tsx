"use client";

import { useEffect, useCallback, useMemo } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
} from "@vis.gl/react-google-maps";
import { useSearch } from "@/lib/search-context";
import { CATEGORY_COLORS, GA_CENTER } from "@/lib/types";
import type { Listing } from "@/lib/types";

const GOOGLE_MAPS_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

const HEX_COLORS: Record<string, string> = {
  "bg-blue-500": "#3b82f6",
  "bg-cyan-500": "#06b6d4",
  "bg-indigo-500": "#6366f1",
  "bg-orange-500": "#f97316",
  "bg-amber-500": "#f59e0b",
  "bg-green-500": "#22c55e",
  "bg-yellow-600": "#ca8a04",
  "bg-purple-500": "#a855f7",
};

function getMarkerColor(listing: Listing): string {
  const colorClass = CATEGORY_COLORS[listing.category_primary];
  return HEX_COLORS[colorClass] || "#dc2626";
}

/** Handles panning the map to selected listings or user location */
function MapController({
  selectedId,
  results,
  userLat,
  userLng,
}: {
  selectedId: string | null;
  results: Listing[];
  userLat?: number;
  userLng?: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map || !selectedId) return;
    const listing = results.find((l) => l.id === selectedId);
    if (listing) {
      map.panTo({ lat: listing.lat, lng: listing.lng });
      const zoom = map.getZoom();
      if (zoom != null && zoom < 12) map.setZoom(12);
    }
  }, [selectedId, map, results]);

  useEffect(() => {
    if (!map || !userLat || !userLng) return;
    map.panTo({ lat: userLat, lng: userLng });
    map.setZoom(11);
  }, [userLat, userLng, map]);

  return null;
}

export default function MapPanel() {
  const { results, selectedId, selectListing, filters } = useSearch();

  const handleMarkerClick = useCallback(
    (id: string) => selectListing(id),
    [selectListing],
  );

  return (
    <div className="relative w-full h-full">
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <Map
          defaultCenter={{ lat: GA_CENTER.lat, lng: GA_CENTER.lng }}
          defaultZoom={7}
          mapId="gacubes-map"
          gestureHandling="greedy"
          disableDefaultUI={false}
          className="w-full h-full"
        >
          {results.map((listing) => {
            const isSelected = listing.id === selectedId;
            const color = getMarkerColor(listing);
            return (
              <AdvancedMarker
                key={listing.id}
                position={{ lat: listing.lat, lng: listing.lng }}
                onClick={() => handleMarkerClick(listing.id)}
                title={listing.name}
              >
                <div
                  style={{
                    width: isSelected ? 20 : 12,
                    height: isSelected ? 20 : 12,
                    borderRadius: "50%",
                    backgroundColor: color,
                    border: isSelected
                      ? "3px solid #ffffff"
                      : `1px solid ${color}`,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    cursor: "pointer",
                    transition: "width 0.15s, height 0.15s",
                  }}
                />
              </AdvancedMarker>
            );
          })}

          {/* Info window for selected listing */}
          {selectedId &&
            (() => {
              const sel = results.find((l) => l.id === selectedId);
              if (!sel) return null;
              return (
                <InfoWindow
                  position={{ lat: sel.lat, lng: sel.lng }}
                  onCloseClick={() => selectListing(null)}
                  pixelOffset={[0, -14]}
                >
                  <div style={{ minWidth: 160, fontFamily: "sans-serif" }}>
                    <p
                      style={{
                        margin: "0 0 4px",
                        fontWeight: 700,
                        fontSize: 14,
                        color: "#111",
                      }}
                    >
                      {sel.name}
                    </p>
                    <p
                      style={{
                        margin: "0 0 2px",
                        fontSize: 12,
                        color: "#6b7280",
                      }}
                    >
                      {sel.category_primary.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </p>
                    <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>
                      {sel.address}, {sel.city}
                    </p>
                  </div>
                </InfoWindow>
              );
            })()}

          {/* User location marker */}
          {filters.lat && filters.lng && (
            <AdvancedMarker
              position={{ lat: filters.lat, lng: filters.lng }}
              title="Your Location"
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  backgroundColor: "#ef4444",
                  border: "3px solid #ffffff",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                }}
              />
            </AdvancedMarker>
          )}

          <MapController
            selectedId={selectedId}
            results={results}
            userLat={filters.lat}
            userLng={filters.lng}
          />
        </Map>
      </APIProvider>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-surface/90 backdrop-blur-sm rounded-2xl p-3 text-xs shadow-lg z-10">
        <p className="font-medium text-foreground mb-1.5">Legend</p>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          {(
            [
              ["#3b82f6", "Ice Vending"],
              ["#06b6d4", "Water Refill"],
              ["#6366f1", "Dry Ice"],
              ["#f97316", "Propane"],
              ["#22c55e", "Convenience"],
              ["#a855f7", "Package Store"],
            ] as const
          ).map(([color, label]) => (
            <div key={label} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: color }}
              />
              <span className="text-muted">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
