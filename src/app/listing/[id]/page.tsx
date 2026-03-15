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
  Map,
} from "lucide-react";
import CopyAddressButton from "@/components/CopyAddressButton";

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

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3959;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default async function ListingPage({ params }: Props) {
  const { id } = await params;
  const listing = getListingById(id);
  if (!listing) notFound();

  const fullAddr = `${listing.address}, ${listing.city}, GA ${listing.zip}`;
  const encodedAddr = encodeURIComponent(fullAddr);
  const googleUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddr}`;
  const appleUrl = `https://maps.apple.com/?daddr=${encodedAddr}`;
  const wazeUrl = `https://waze.com/ul?ll=${listing.lat},${listing.lng}&navigate=yes`;

  // Find nearby listings within 10 miles
  const nearby = SEED_LISTINGS
    .filter((l) => l.id !== listing.id && l.status === "active")
    .map((l) => ({ ...l, dist: haversineDistance(listing.lat, listing.lng, l.lat, l.lng) }))
    .filter((l) => l.dist <= 10)
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Header */}
      <header className="bg-surface border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/search" className="p-2 rounded-lg hover:bg-surface-secondary transition-colors">
            <ArrowLeft size={20} className="text-muted" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">{listing.name}</h1>
            <p className="text-sm text-muted">{listing.city}, GA {listing.zip}</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Static map showing pin + street context */}
        <div className="w-full h-64 bg-surface rounded-xl border border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
            {/* Grid for map feel */}
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={`h-${i}`} className="absolute w-full border-t border-gray-400" style={{ top: `${i * 10}%` }} />
              ))}
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={`v-${i}`} className="absolute h-full border-l border-gray-400" style={{ left: `${i * 10}%` }} />
              ))}
            </div>

            {/* Main pin */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-8 h-8 bg-primary rounded-full border-3 border-white shadow-xl flex items-center justify-center">
                <MapPin size={16} className="text-white" />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-surface px-2 py-0.5 rounded text-xs font-medium text-foreground shadow">
                {listing.name}
              </div>
            </div>

            {/* Nearby pins on the map */}
            {nearby.slice(0, 4).map((nl, i) => {
              const angle = (i * 90 + 45) * (Math.PI / 180);
              const radius = 25 + Math.random() * 15;
              const x = 50 + Math.cos(angle) * radius;
              const y = 50 + Math.sin(angle) * radius;
              return (
                <div
                  key={nl.id}
                  className={`absolute w-3 h-3 rounded-full border border-white shadow ${CATEGORY_COLORS[nl.category_primary].replace('bg-', 'bg-')}`}
                  style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                  title={nl.name}
                />
              );
            })}
          </div>
          <div className="absolute bottom-2 right-2 bg-surface/80 rounded px-2 py-1 text-xs text-muted">
            Add Google Maps API key for street-level view
          </div>
        </div>

        {/* Details card */}
        <div className="bg-surface rounded-xl border border-border p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${CATEGORY_COLORS[listing.category_primary]}`}>
              {CATEGORY_LABELS[listing.category_primary]}
            </span>
            {listing.category_secondary.map((cat) => (
              <span key={cat} className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${CATEGORY_COLORS[cat]}`}>
                {CATEGORY_LABELS[cat]}
              </span>
            ))}
            {listing.open_24h && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">24/7</span>
            )}
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-muted mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">{listing.address}</p>
                  <p className="text-sm text-muted">{listing.city}, GA {listing.zip}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-muted shrink-0" />
                <p className="text-sm text-foreground">{listing.hours}</p>
              </div>
              {listing.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-muted shrink-0" />
                  <a href={`tel:${listing.phone}`} className="text-sm text-primary hover:underline">{listing.phone}</a>
                </div>
              )}
              {listing.website && (
                <div className="flex items-center gap-3">
                  <ExternalLink size={18} className="text-muted shrink-0" />
                  <a href={listing.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline truncate">
                    {listing.website}
                  </a>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {listing.rating && (
                <div className="flex items-center gap-2">
                  <Star size={18} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium text-foreground">{listing.rating} / 5</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <CreditCard size={18} className="text-muted" />
                <span className="text-sm text-foreground">{listing.payment_types.join(", ")}</span>
              </div>
              {listing.has_water_refill && (
                <div className="flex items-center gap-2">
                  <Droplets size={18} className="text-cyan-500" />
                  <span className="text-sm text-foreground">Water Refill Available</span>
                </div>
              )}
              {listing.has_dry_ice && (
                <div className="flex items-center gap-2">
                  <Snowflake size={18} className="text-indigo-500" />
                  <span className="text-sm text-foreground">Dry Ice Available</span>
                </div>
              )}
              {(listing.has_propane_refill || listing.has_propane_exchange) && (
                <div className="flex items-center gap-2">
                  <Flame size={18} className="text-orange-500" />
                  <span className="text-sm text-foreground">
                    {listing.has_propane_refill && "Propane Refill"}
                    {listing.has_propane_refill && listing.has_propane_exchange && " & "}
                    {listing.has_propane_exchange && "Propane Exchange"}
                  </span>
                </div>
              )}
              {listing.alcohol_license_nearby && (
                <div className="flex items-center gap-2">
                  <Beer size={18} className="text-yellow-600" />
                  <span className="text-sm text-foreground">Beer / Drinks Nearby</span>
                </div>
              )}
              {listing.density_score != null && (
                <div className="text-xs text-muted">Area density: {getDensityLabel(listing.density_score)}</div>
              )}
            </div>
          </div>

          {/* Navigation app buttons */}
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3">Get Directions</h3>
            <div className="flex flex-wrap gap-2">
              <a
                href={googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
              >
                <Navigation size={16} />
                Google Maps
              </a>
              <a
                href={appleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-surface-secondary text-foreground border border-border rounded-lg text-sm font-medium hover:bg-border transition-colors"
              >
                <Map size={16} />
                Apple Maps
              </a>
              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-surface-secondary text-foreground border border-border rounded-lg text-sm font-medium hover:bg-border transition-colors"
              >
                <Navigation size={16} />
                Waze
              </a>
              <CopyAddressButton address={fullAddr} />
            </div>
          </div>

          {/* Call / Website */}
          <div className="flex flex-wrap gap-2 mt-4">
            {listing.phone && (
              <a href={`tel:${listing.phone}`} className="flex items-center gap-2 px-4 py-2.5 bg-surface-secondary text-foreground border border-border rounded-lg text-sm font-medium hover:bg-border transition-colors">
                <Phone size={16} /> Call
              </a>
            )}
            {listing.website && (
              <a href={listing.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 bg-surface-secondary text-foreground border border-border rounded-lg text-sm font-medium hover:bg-border transition-colors">
                <ExternalLink size={16} /> Website
              </a>
            )}
          </div>
        </div>

        {/* Source info */}
        <div className="bg-surface rounded-xl border border-border p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted">
              Source: {listing.source_name} &middot; Last verified: {listing.last_verified_at}
            </div>
            <button className="flex items-center gap-1 text-xs text-orange-600 hover:underline">
              <AlertTriangle size={12} /> Report Issue
            </button>
          </div>
        </div>

        {/* Sponsor slot */}
        <div className="bg-surface-secondary rounded-xl border border-border p-6 text-center">
          <p className="text-xs text-muted uppercase tracking-wider mb-1">Sponsored</p>
          <p className="text-sm text-muted">
            Want to feature your business here?{" "}
            <Link href="/advertise" className="text-primary hover:underline">Advertise with GACubes</Link>
          </p>
        </div>

        {/* Nearby listings - cards */}
        {nearby.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-foreground mb-4">Nearby Locations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {nearby.map((l) => (
                <Link
                  key={l.id}
                  href={`/listing/${l.id}`}
                  className="bg-surface rounded-xl border border-border p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium text-foreground text-sm">{l.name}</h3>
                    <span className="text-xs text-primary font-medium">{l.dist.toFixed(1)} mi</span>
                  </div>
                  <p className="text-xs text-muted mt-1">{l.address}, {l.city}</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white mt-2 ${CATEGORY_COLORS[l.category_primary]}`}>
                    {CATEGORY_LABELS[l.category_primary]}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related searches */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-3">Related Searches</h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/city/${listing.city.toLowerCase().replace(/\s+/g, "-")}-ga`}
              className="px-3 py-1.5 bg-surface border border-border rounded-full text-xs text-muted hover:border-primary hover:text-primary"
            >
              Ice in {listing.city}
            </Link>
            <Link
              href={`/zip/${listing.zip}`}
              className="px-3 py-1.5 bg-surface border border-border rounded-full text-xs text-muted hover:border-primary hover:text-primary"
            >
              Near {listing.zip}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
