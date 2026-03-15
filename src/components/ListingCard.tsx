"use client";

import Image from "next/image";
import Link from "next/link";
import { Listing, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/types";
import { formatDistance } from "@/lib/geo";
import { getBrandLogo, getBrandFromName } from "@/lib/brand-logos";
import { MapPin, Phone, Navigation, Beer, Star } from "lucide-react";

interface ListingCardProps {
  listing: Listing;
  selected?: boolean;
  onClick?: () => void;
}

export default function ListingCard({ listing, selected, onClick }: ListingCardProps) {
  const logoPath = getBrandLogo(listing.name);
  const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    listing.address + ", " + listing.city + ", GA " + listing.zip
  )}`;

  return (
    <div
      onClick={onClick}
      className={`border rounded-2xl px-4 py-3 transition-all cursor-pointer ${
        selected
          ? "border-primary bg-primary-light shadow-md"
          : "border-border bg-surface hover:border-primary/50 hover:shadow-md"
      }`}
    >
      {/* Row 1: Name + Distance */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {logoPath && (
            <Image
              src={logoPath}
              alt={getBrandFromName(listing.name)}
              width={24}
              height={24}
              className="rounded shrink-0 object-contain"
            />
          )}
          <h3 className="font-bold text-foreground text-sm truncate">
            {listing.name}
          </h3>
        </div>
        {listing.distance != null && (
          <span className="bg-primary text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap">
            {formatDistance(listing.distance)}
          </span>
        )}
      </div>

      {/* Row 2: Address */}
      <div className="flex items-center gap-1 text-xs text-muted mt-1">
        <MapPin size={11} className="shrink-0 text-primary" />
        <span className="truncate">
          {listing.address}, {listing.city}
        </span>
      </div>

      {/* Row 3: Rating + Tags */}
      <div className="flex flex-wrap items-center gap-1.5 mt-2">
        {listing.rating && (
          <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-foreground">
            <Star size={10} className="text-yellow-500 fill-yellow-500" />
            {listing.rating}
          </span>
        )}
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold text-white ${
            CATEGORY_COLORS[listing.category_primary]
          }`}
        >
          {CATEGORY_LABELS[listing.category_primary]}
        </span>
        {listing.category_secondary.map((cat) => (
          <span
            key={cat}
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold text-white ${CATEGORY_COLORS[cat]}`}
          >
            {CATEGORY_LABELS[cat]}
          </span>
        ))}
        {listing.open_24h && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
            24/7
          </span>
        )}
        {listing.alcohol_license_nearby && (
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
            <Beer size={9} />
            Drinks
          </span>
        )}
      </div>

      {/* Row 4: Actions */}
      <div className="flex items-center gap-3 mt-2.5 pt-2 border-t border-border text-xs">
        <a
          href={dirUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-primary hover:underline font-semibold"
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
          className="ml-auto text-primary font-semibold hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          Details →
        </Link>
      </div>
    </div>
  );
}
