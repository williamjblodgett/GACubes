"use client";

import { useSearch } from "@/lib/search-context";
import ListingCard from "./ListingCard";

export default function ResultsPanel() {
  const { results, selectedId, selectListing, locationLabel, loading } =
    useSearch();

  return (
    <div className="flex flex-col h-full">
      {/* Context strip */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            {locationLabel}
          </span>
          <span className="text-xs text-gray-500">
            {results.length} result{results.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </div>
        )}

        {!loading && results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No results found.</p>
            <p className="text-gray-400 text-xs mt-1">
              Try adjusting your filters or search area.
            </p>
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
