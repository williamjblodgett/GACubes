import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getListingById } from "@/lib/search";
import { SEED_LISTINGS } from "@/lib/seed-data";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/types";
import { getDensityLabel } from "@/lib/search";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  Navigation,
  Star,
  Beer,
  CreditCard,
  Droplets,
  Snowflake,
  Flame,
  AlertTriangle,
} from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const listing = getListingById(id);
  if (!listing) return { title: "Not Found" };
  return {
    title: `${listing.name} - GACubes`,
    description: `${listing.name} in ${listing.city}, GA. ${CATEGORY_LABELS[listing.category_primary]}. ${listing.hours}.`,
  };
}

export function generateStaticParams() {
  return SEED_LISTINGS.map((l) => ({ id: l.id }));
}

export default async function ListingPage({ params }: Props) {
  const { id } = await params;
  const listing = getListingById(id);
  if (!listing) notFound();

  const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    listing.address + ", " + listing.city + ", " + listing.state + " " + listing.zip
  )}`;

  const nearby = SEED_LISTINGS.filter(
    (l) => l.id !== listing.id && l.city === listing.city && l.status === "active"
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/search"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{listing.name}</h1>
            <p className="text-sm text-gray-500">
              {listing.city}, {listing.state} {listing.zip}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Map placeholder */}
        <div className="w-full h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-gray-200 flex items-center justify-center relative overflow-hidden">
          <MapPin size={48} className="text-blue-400" />
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            Interactive map with API key
          </div>
        </div>

        {/* Details card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${
                CATEGORY_COLORS[listing.category_primary]
              }`}
            >
              {CATEGORY_LABELS[listing.category_primary]}
            </span>
            {listing.category_secondary.map((cat) => (
              <span
                key={cat}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${CATEGORY_COLORS[cat]}`}
              >
                {CATEGORY_LABELS[cat]}
              </span>
            ))}
            {listing.open_24h && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                24/7
              </span>
            )}
            {listing.status === "active" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-600">
                Active
              </span>
            )}
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {listing.address}
                  </p>
                  <p className="text-sm text-gray-500">
                    {listing.city}, {listing.state} {listing.zip}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock size={18} className="text-gray-400 shrink-0" />
                <p className="text-sm text-gray-700">{listing.hours}</p>
              </div>

              {listing.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-gray-400 shrink-0" />
                  <a
                    href={`tel:${listing.phone}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {listing.phone}
                  </a>
                </div>
              )}

              {listing.website && (
                <div className="flex items-center gap-3">
                  <ExternalLink
                    size={18}
                    className="text-gray-400 shrink-0"
                  />
                  <a
                    href={listing.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline truncate"
                  >
                    {listing.website}
                  </a>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {listing.rating && (
                <div className="flex items-center gap-2">
                  <Star
                    size={18}
                    className="text-yellow-500 fill-yellow-500"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {listing.rating} / 5
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <CreditCard size={18} className="text-gray-400" />
                <span className="text-sm text-gray-700">
                  {listing.payment_types.join(", ")}
                </span>
              </div>

              {listing.has_water_refill && (
                <div className="flex items-center gap-2">
                  <Droplets size={18} className="text-cyan-500" />
                  <span className="text-sm text-gray-700">
                    Water Refill Available
                  </span>
                </div>
              )}

              {listing.has_dry_ice && (
                <div className="flex items-center gap-2">
                  <Snowflake size={18} className="text-indigo-500" />
                  <span className="text-sm text-gray-700">
                    Dry Ice Available
                  </span>
                </div>
              )}

              {(listing.has_propane_refill || listing.has_propane_exchange) && (
                <div className="flex items-center gap-2">
                  <Flame size={18} className="text-orange-500" />
                  <span className="text-sm text-gray-700">
                    {listing.has_propane_refill && "Propane Refill"}
                    {listing.has_propane_refill &&
                      listing.has_propane_exchange &&
                      " & "}
                    {listing.has_propane_exchange && "Propane Exchange"}
                  </span>
                </div>
              )}

              {listing.alcohol_license_nearby && (
                <div className="flex items-center gap-2">
                  <Beer size={18} className="text-yellow-600" />
                  <span className="text-sm text-gray-700">
                    Beer / Drinks Nearby
                  </span>
                </div>
              )}

              {listing.density_score != null && (
                <div className="text-xs text-gray-400">
                  Area density: {getDensityLabel(listing.density_score)}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
            <a
              href={dirUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Navigation size={16} />
              Get Directions
            </a>
            {listing.phone && (
              <a
                href={`tel:${listing.phone}`}
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                <Phone size={16} />
                Call
              </a>
            )}
            {listing.website && (
              <a
                href={listing.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                <ExternalLink size={16} />
                Visit Website
              </a>
            )}
          </div>
        </div>

        {/* Source info */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              Source: {listing.source_name} &middot; Last verified:{" "}
              {listing.last_verified_at}
            </div>
            <button className="flex items-center gap-1 text-xs text-orange-600 hover:underline">
              <AlertTriangle size={12} />
              Report Issue
            </button>
          </div>
        </div>

        {/* Sponsor slot */}
        <div className="bg-gray-100 rounded-xl border border-gray-200 p-6 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
            Sponsored
          </p>
          <p className="text-sm text-gray-500">
            Want to feature your business here?{" "}
            <Link href="/advertise" className="text-blue-600 hover:underline">
              Advertise with GACubes
            </Link>
          </p>
        </div>

        {/* Nearby */}
        {nearby.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Nearby in {listing.city}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {nearby.map((l) => (
                <Link
                  key={l.id}
                  href={`/listing/${l.id}`}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium text-gray-900 text-sm">
                    {l.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{l.address}</p>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white mt-2 ${
                      CATEGORY_COLORS[l.category_primary]
                    }`}
                  >
                    {CATEGORY_LABELS[l.category_primary]}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related searches */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Related Searches
          </h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/city/${listing.city.toLowerCase().replace(/\s+/g, "-")}-ga`}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-blue-300"
            >
              Ice in {listing.city}
            </Link>
            <Link
              href={`/zip/${listing.zip}`}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-blue-300"
            >
              Near {listing.zip}
            </Link>
            <Link
              href={`/georgia/${listing.category_primary === "ice-vending" ? "ice-vending-machines" : listing.category_primary}`}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-blue-300"
            >
              {CATEGORY_LABELS[listing.category_primary]} in Georgia
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
