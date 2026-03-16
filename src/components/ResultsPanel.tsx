"use client";

import { useSearch } from "@/lib/search-context";
import ListingCard from "./ListingCard";
import ListingCardSkeleton from "./ListingCardSkeleton";
import { SearchX, RotateCcw } from "lucide-react";

export default function ResultsPanel() {
  const { results, selectedId, selectListing, locationLabel, loading, resetFilters } = useSearch();

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="px-4 py-3 border-b border-border bg-surface">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-foreground">{locationLabel}</span>
          <span className="text-xs text-muted font-medium">
            {loading ? "Searching..." : `${results.length} result${results.length !== 1 ? "s" : ""}`}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {loading && (
          <>
            <ListingCardSkeleton />
            <ListingCardSkeleton />
            <ListingCardSkeleton />
            <ListingCardSkeleton />
            <ListingCardSkeleton />
          </>
        )}

        {!loading && results.length === 0 && (
          <div className="text-center py-12 px-4">
            <SearchX size={32} className="mx-auto text-muted mb-3" />
            <p className="text-foreground text-sm font-semibold">No results found</p>
            <div className="text-muted text-xs mt-2 space-y-1">
              <p>Try a broader search radius</p>
              <p>Remove some category or quick filters</p>
              <p>Search by city name or ZIP code</p>
            </div>
            <button
              onClick={resetFilters}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-xl text-xs font-semibold hover:bg-primary-hover transition-colors"
            >
              <RotateCcw size={12} />
              Reset All Filters
            </button>
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
