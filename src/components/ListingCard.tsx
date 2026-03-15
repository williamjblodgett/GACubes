"use client";

import { Listing, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/types";
import { formatDistance } from "@/lib/geo";
import { getDensityLabel } from "@/lib/search";
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  Navigation,
  Beer,
  Star,
} from "lucide-react";

interface ListingCardProps {
  listing: Listing;
  selected?: boolean;
  onClick?: () => void;
  compact?: boolean;
}

export default function ListingCard({
  listing,
  selected,
  onClick,
  compact,
}: ListingCardProps) {
  const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    listing.address + ", " + listing.city + ", " + listing.state + " " + listing.zip
  )}`;

  return (
    <div
      onClick={onClick}
      className={`border rounded-xl p-4 transition-all cursor-pointer ${
        selected
          ? "border-blue-500 bg-blue-50 shadow-md"
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm truncate">
            {listing.name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
            <MapPin size={12} />
            <span className="truncate">
              {listing.address}, {listing.city}
            </span>
          </div>
        </div>
        {listing.distance != null && (
          <span className="text-xs font-medium text-blue-600 whitespace-nowrap">
            {formatDistance(listing.distance)}
          </span>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mt-2">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white ${
            CATEGORY_COLORS[listing.category_primary]
          }`}
        >
          {CATEGORY_LABELS[listing.category_primary]}
        </span>
        {listing.category_secondary.map((cat) => (
          <span
            key={cat}
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white ${CATEGORY_COLORS[cat]}`}
          >
            {CATEGORY_LABELS[cat]}
          </span>
        ))}
        {listing.open_24h && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
            24/7
          </span>
        )}
        {listing.alcohol_license_nearby && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <Beer size={10} />
            Drinks Nearby
          </span>
        )}
      </div>

      {!compact && (
        <>
          {/* Details */}
          <div className="mt-3 space-y-1 text-xs text-gray-600">
            {listing.hours && (
              <div className="flex items-center gap-1.5">
                <Clock size={12} className="text-gray-400" />
                <span>{listing.hours}</span>
              </div>
            )}
            {listing.phone && (
              <div className="flex items-center gap-1.5">
                <Phone size={12} className="text-gray-400" />
                <a
                  href={`tel:${listing.phone}`}
                  className="text-blue-600 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {listing.phone}
                </a>
              </div>
            )}
            {listing.rating && (
              <div className="flex items-center gap-1">
                <Star size={12} className="text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{listing.rating}</span>
              </div>
            )}
            {listing.density_score != null && (
              <div className="text-gray-400 text-xs">
                Area: {getDensityLabel(listing.density_score)}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-3">
            <a
              href={dirUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Navigation size={12} />
              Directions
            </a>
            {listing.phone && (
              <a
                href={`tel:${listing.phone}`}
                className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Phone size={12} />
                Call
              </a>
            )}
            {listing.website && (
              <a
                href={listing.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={12} />
                Site
              </a>
            )}
            <a
              href={`/listing/${listing.id}`}
              className="ml-auto text-xs text-blue-600 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              Details
            </a>
          </div>
        </>
      )}
    </div>
  );
}
