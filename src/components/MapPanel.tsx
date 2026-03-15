"use client";

import { useEffect, useRef, useState } from "react";
import { useSearch } from "@/lib/search-context";
import { CATEGORY_COLORS, GA_CENTER } from "@/lib/types";
import type { Listing } from "@/lib/types";

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

export default function MapPanel() {
  const { results, selectedId, selectListing, filters } = useSearch();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.CircleMarker[]>([]);
  const userMarkerRef = useRef<L.CircleMarker | null>(null);
  const [ready, setReady] = useState(false);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);

  // Initialize map once
  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    let cancelled = false;

    (async () => {
      const L = await import("leaflet");
      if (cancelled) return;
      leafletRef.current = L;

      // Fix default marker icons (Leaflet issue with bundlers)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapContainerRef.current!, {
        center: [GA_CENTER.lat, GA_CENTER.lng],
        zoom: 7,
        zoomControl: true,
        attributionControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;
      setReady(true);
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update markers when results change
  useEffect(() => {
    if (!ready || !mapRef.current || !leafletRef.current) return;
    const L = leafletRef.current;
    const map = mapRef.current;

    // Clear old markers
    for (const m of markersRef.current) {
      map.removeLayer(m);
    }
    markersRef.current = [];

    // Add new markers
    for (const listing of results) {
      const color = getMarkerColor(listing);
      const isSelected = listing.id === selectedId;

      const marker = L.circleMarker([listing.lat, listing.lng], {
        radius: isSelected ? 10 : 6,
        fillColor: color,
        color: isSelected ? "#ffffff" : color,
        weight: isSelected ? 3 : 1,
        opacity: 1,
        fillOpacity: 0.85,
      });

      marker.bindTooltip(listing.name, { direction: "top", offset: [0, -8] });
      marker.on("click", () => selectListing(listing.id));
      marker.addTo(map);
      markersRef.current.push(marker);
    }
  }, [results, selectedId, ready, selectListing]);

  // Pan to selected listing
  useEffect(() => {
    if (!ready || !mapRef.current || !selectedId) return;
    const listing = results.find((l) => l.id === selectedId);
    if (listing) {
      mapRef.current.setView([listing.lat, listing.lng], Math.max(mapRef.current.getZoom(), 12), {
        animate: true,
      });
    }
  }, [selectedId, ready, results]);

  // Update user location marker
  useEffect(() => {
    if (!ready || !mapRef.current || !leafletRef.current) return;
    const L = leafletRef.current;
    const map = mapRef.current;

    if (userMarkerRef.current) {
      map.removeLayer(userMarkerRef.current);
      userMarkerRef.current = null;
    }

    if (filters.lat && filters.lng) {
      const marker = L.circleMarker([filters.lat, filters.lng], {
        radius: 10,
        fillColor: "#ef4444",
        color: "#ffffff",
        weight: 3,
        opacity: 1,
        fillOpacity: 0.9,
      });
      marker.bindTooltip("Your Location", { direction: "top", offset: [0, -12] });
      marker.addTo(map);
      userMarkerRef.current = marker;

      map.setView([filters.lat, filters.lng], 11, { animate: true });
    }
  }, [filters.lat, filters.lng, ready]);

  return (
    <div className="relative w-full h-full">
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin=""
      />
      <div ref={mapContainerRef} className="absolute inset-0 z-0" />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface-secondary">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-muted text-sm">Loading map...</p>
          </div>
        </div>
      )}
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-surface/90 backdrop-blur-sm rounded-lg p-3 text-xs shadow-lg z-[1000]">
        <p className="font-medium text-foreground mb-1.5">Legend</p>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          {([
            ["#3b82f6", "Ice Vending"],
            ["#06b6d4", "Water Refill"],
            ["#6366f1", "Dry Ice"],
            ["#f97316", "Propane"],
            ["#22c55e", "Convenience"],
            ["#a855f7", "Package Store"],
          ] as const).map(([color, label]) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: color }} />
              <span className="text-muted">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
