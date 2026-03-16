"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/lib/favorites-context";

interface FavoriteButtonProps {
  listingId: string;
  size?: number;
  className?: string;
}

export default function FavoriteButton({ listingId, size = 14, className = "" }: FavoriteButtonProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(listingId);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleFavorite(listingId);
      }}
      className={`transition-colors ${className}`}
      aria-label={favorited ? "Remove from saved" : "Save location"}
    >
      <Heart
        size={size}
        className={
          favorited
            ? "fill-red-500 text-red-500"
            : "text-muted hover:text-red-400"
        }
      />
    </button>
  );
}
