"use client";

import Link from "next/link";
import { Listing, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/types";
import { formatDistance } from "@/lib/geo";
import { MapPin, Phone, Navigation, Beer } from "lucide-react";

interface ListingCardProps {
  listing: Listing;
  selected?: boolean;
  onClick?: () => void;
}

export default function ListingCard({ listing, selected, onClick }: ListingCardProps) {
  const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    listing.address + ", " + listing.city + ", GA " + listing.zip
  )}`;

  return (
    <div
      onClick={onClick}
      className={`border rounded-lg px-3 py-2.5 transition-all cursor-pointer ${
        selected
          ? "border-primary bg-primary-light shadow-sm"
          : "border-border bg-surface hover:border-muted hover:shadow-sm"
      }`}
    >
      {/* Row 1: Name + Distance */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold text-foreground text-sm truncate">
          {listing.name}
        </h3>
        {listing.distance != null && (
          <span className="text-xs font-medium text-primary whitespace-nowrap">
            {formatDistance(listing.distance)}
          </span>
        )}
      </div>

      {/* Row 2: Address */}
      <div className="flex items-center gap-1 text-xs text-muted mt-0.5">
        <MapPin size={11} className="shrink-0" />
        <span className="truncate">
          {listing.address}, {listing.city}
        </span>
      </div>

      {/* Row 3: Tags */}
      <div className="flex flex-wrap items-center gap-1 mt-1.5">
        <span
          className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium text-white ${
            CATEGORY_COLORS[listing.category_primary]
          }`}
        >
          {CATEGORY_LABELS[listing.category_primary]}
        </span>
        {listing.category_secondary.map((cat) => (
          <span
            key={cat}
            className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium text-white ${CATEGORY_COLORS[cat]}`}
          >
            {CATEGORY_LABELS[cat]}
          </span>
        ))}
        {listing.open_24h && (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
            24/7
          </span>
        )}
        {listing.alcohol_license_nearby && (
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
            <Beer size={9} />
            Drinks
          </span>
        )}
      </div>

      {/* Row 4: Actions */}
      <div className="flex items-center gap-3 mt-2 text-xs">
        <a
          href={dirUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-primary hover:underline font-medium"
          onClick={(e) => e.stopPropagation()}
        >
          <Navigation size={11} />
          Directions
        </a>
        {listing.phone && (
          <a
            href={`tel:${listing.phone}`}
            className="flex items-center gap-1 text-muted hover:text-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <Phone size={11} />
            Call
          </a>
        )}
        <Link
          href={`/listing/${listing.id}`}
          className="ml-auto text-primary hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          Details
        </Link>
      </div>
    </div>
  );
}
