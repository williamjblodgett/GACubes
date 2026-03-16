"use client";

import { useFavorites } from "@/lib/favorites-context";
import { SEED_LISTINGS } from "@/lib/seed-data";
import ListingCard from "./ListingCard";
import { Heart } from "lucide-react";

export default function SavedListings() {
  const { favoriteIds } = useFavorites();

  const listings = favoriteIds
    .map((id) => SEED_LISTINGS.find((l) => l.id === id))
    .filter(Boolean) as typeof SEED_LISTINGS;

  if (listings.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <Heart size={32} className="mx-auto text-muted mb-3" />
          <p className="text-muted text-sm font-medium">No saved locations yet.</p>
          <p className="text-muted text-xs mt-1">
            Tap the heart icon on a listing to save it.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-2">
      <div className="px-1 py-2">
        <span className="text-sm font-bold text-foreground">
          {listings.length} saved location{listings.length !== 1 ? "s" : ""}
        </span>
      </div>
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
