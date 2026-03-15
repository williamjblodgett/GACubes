"use client";

import { useSearch } from "@/lib/search-context";
import ListingCard from "./ListingCard";

export default function ResultsPanel() {
  const { results, selectedId, selectListing, locationLabel, loading } = useSearch();

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="px-4 py-3 border-b border-border bg-surface">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-foreground">{locationLabel}</span>
          <span className="text-xs text-muted font-medium">
            {results.length} result{results.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        )}

        {!loading && results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted text-sm">No results found.</p>
            <p className="text-muted text-xs mt-1">Try adjusting your filters or search area.</p>
          </div>
        )}

        {!loading &&
          results.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              selected={listing.id === selectedId}
              onClick={() => selectListing(listing.id)}
            />
          ))}
      </div>
    </div>
  );
}
