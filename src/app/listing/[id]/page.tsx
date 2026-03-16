import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getListingById } from "@/lib/search";
import { SEED_LISTINGS } from "@/lib/seed-data";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/types";
import { getDensityLabel } from "@/lib/search";
import { getBrandLogo, getBrandFromName } from "@/lib/brand-logos";
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
  Store,
  IceCreamCone,
  Bath,
} from "lucide-react";
import CopyAddressButton from "@/components/CopyAddressButton";
import BackButton from "@/components/BackButton";

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

function CategoryIcon({ category, size = 64 }: { category: string; size?: number }) {
  const cls = "text-white/20";
  switch (category) {
    case "ice-vending": case "dry-ice": return <Snowflake size={size} className={cls} />;
    case "water-refill": return <Droplets size={size} className={cls} />;
    case "propane-refill": case "propane-exchange": return <Flame size={size} className={cls} />;
    case "convenience-store": return <Store size={size} className={cls} />;
    case "beer-drinks": case "package-store": return <Beer size={size} className={cls} />;
    case "ice-cream": return <IceCreamCone size={size} className={cls} />;
    case "public-bathroom": return <Bath size={size} className={cls} />;
    default: return <Store size={size} className={cls} />;
  }
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

  const nearby = SEED_LISTINGS
    .filter((l) => l.id !== listing.id && l.status === "active")
    .map((l) => ({ ...l, dist: haversineDistance(listing.lat, listing.lng, l.lat, l.lng) }))
    .filter((l) => l.dist <= 10)
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      {/* Compact header bar */}
      <div className={`${CATEGORY_COLORS[listing.category_primary]} relative`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-4xl mx-auto px-4 py-4">
          <BackButton className="text-white/80 mb-3" />
          <div className="flex items-center gap-3">
            {getBrandLogo(listing.name) ? (
              <Image
                src={getBrandLogo(listing.name)!}
                alt={getBrandFromName(listing.name)}
                width={40}
                height={40}
                className="rounded-lg object-contain shrink-0"
              />
            ) : (
              <CategoryIcon category={listing.category_primary} size={28} />
            )}
            <h1 className="text-xl font-bold text-white truncate">{listing.name}</h1>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {/* Info card */}
        <div className="bg-surface rounded-2xl shadow-lg p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-1.5 text-sm text-muted">
              <MapPin size={14} className="shrink-0" />
              <span>{listing.address}, {listing.city}, GA {listing.zip}</span>
            </div>
            {listing.rating && (
              <div className="flex items-center gap-1 bg-primary-light px-3 py-1.5 rounded-xl shrink-0">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-bold text-foreground">{listing.rating}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white ${CATEGORY_COLORS[listing.category_primary]}`}>
              {CATEGORY_LABELS[listing.category_primary]}
            </span>
            {listing.category_secondary.map((cat) => (
              <span key={cat} className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white ${CATEGORY_COLORS[cat]}`}>
                {CATEGORY_LABELS[cat]}
              </span>
            ))}
            {listing.open_24h && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">24/7</span>
            )}
          </div>
        </div>

        {/* Map card */}
        <div className="bg-surface rounded-2xl shadow-lg overflow-hidden">
          <div className="w-full h-48 relative">
            <iframe
              className="absolute inset-0 w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}&q=${encodeURIComponent(listing.name + ", " + fullAddr)}&zoom=15`}
              allowFullScreen
              title={`Map of ${listing.name}`}
            />
          </div>
          <div className="px-5 py-3 flex items-center justify-between border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted">
              <MapPin size={14} className="text-primary" />
              <span className="truncate">{fullAddr}</span>
            </div>
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-sm font-semibold hover:underline whitespace-nowrap"
            >
              Open on Maps
            </a>
          </div>
        </div>

        {/* Details card */}
        <div className="bg-surface rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-foreground mb-4 pb-3 border-b-2 border-primary inline-block">About</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted">Hours</p>
                  <p className="text-sm font-medium text-foreground">{listing.hours}</p>
                </div>
              </div>
              {listing.phone && (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Phone</p>
                    <a href={`tel:${listing.phone}`} className="text-sm font-medium text-primary hover:underline">{listing.phone}</a>
                  </div>
                </div>
              )}
              {listing.website && (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <ExternalLink size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Website</p>
                    <a href={listing.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline truncate block max-w-[200px]">
                      {listing.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <CreditCard size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted">Payment</p>
                  <p className="text-sm font-medium text-foreground">{listing.payment_types.join(", ")}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {listing.has_water_refill && (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center shrink-0">
                    <Droplets size={16} className="text-cyan-500" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Water Refill Available</span>
                </div>
              )}
              {listing.has_dry_ice && (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center shrink-0">
                    <Snowflake size={16} className="text-indigo-500" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Dry Ice Available</span>
                </div>
              )}
              {(listing.has_propane_refill || listing.has_propane_exchange) && (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center shrink-0">
                    <Flame size={16} className="text-orange-500" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {listing.has_propane_refill && "Propane Refill"}
                    {listing.has_propane_refill && listing.has_propane_exchange && " & "}
                    {listing.has_propane_exchange && "Propane Exchange"}
                  </span>
                </div>
              )}
              {listing.has_ice_cream && (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center shrink-0">
                    <IceCreamCone size={16} className="text-pink-500" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Ice Cream Available</span>
                </div>
              )}
              {listing.has_public_bathroom && (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center shrink-0">
                    <Bath size={16} className="text-teal-500" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Public Bathroom</span>
                </div>
              )}
              {listing.alcohol_license_nearby && (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center shrink-0">
                    <Beer size={16} className="text-yellow-600" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Beer / Drinks Nearby</span>
                </div>
              )}
              {listing.density_score != null && (
                <div className="text-xs text-muted mt-2">Area density: {getDensityLabel(listing.density_score)}</div>
              )}
            </div>
          </div>
        </div>

        {/* CTA - Directions */}
        <div className="bg-surface rounded-2xl shadow-lg p-5">
          <h3 className="text-sm font-bold text-foreground mb-3">Get Directions</h3>
          <div className="flex flex-wrap gap-2">
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors"
            >
              <Navigation size={16} />
              Google Maps
            </a>
            <a
              href={appleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-surface-secondary text-foreground border border-border rounded-xl text-sm font-medium hover:bg-border transition-colors"
            >
              <Map size={16} />
              Apple Maps
            </a>
            <a
              href={wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-surface-secondary text-foreground border border-border rounded-xl text-sm font-medium hover:bg-border transition-colors"
            >
              <Navigation size={16} />
              Waze
            </a>
            <CopyAddressButton address={fullAddr} />
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {listing.phone && (
              <a href={`tel:${listing.phone}`} className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors">
                <Phone size={16} /> Call Now
              </a>
            )}
            {listing.website && (
              <a href={listing.website} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-surface-secondary text-foreground border border-border rounded-xl text-sm font-medium hover:bg-border transition-colors">
                <ExternalLink size={16} /> Visit Website
              </a>
            )}
          </div>
        </div>

        {/* Source info */}
        <div className="bg-surface rounded-2xl shadow-sm p-4 flex items-center justify-between">
          <span className="text-xs text-muted">
            Source: {listing.source_name} · Last verified: {listing.last_verified_at}
          </span>
          <button className="flex items-center gap-1 text-xs text-orange-600 hover:underline">
            <AlertTriangle size={12} /> Report
          </button>
        </div>

        {/* Nearby listings */}
        {nearby.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-foreground mb-4">Nearby Locations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {nearby.map((l) => (
                <Link
                  key={l.id}
                  href={`/listing/${l.id}`}
                  className="bg-surface rounded-2xl shadow-sm border border-border p-4 hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{l.name}</h3>
                    <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                      {l.dist.toFixed(1)} mi
                    </span>
                  </div>
                  <p className="text-xs text-muted mt-1">{l.address}, {l.city}</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold text-white mt-2 ${CATEGORY_COLORS[l.category_primary]}`}>
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
              className="px-4 py-2 bg-surface border border-border rounded-full text-xs font-medium text-muted hover:border-primary hover:text-primary transition-colors"
            >
              Ice in {listing.city}
            </Link>
            <Link
              href={`/zip/${listing.zip}`}
              className="px-4 py-2 bg-surface border border-border rounded-full text-xs font-medium text-muted hover:border-primary hover:text-primary transition-colors"
            >
              Near {listing.zip}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
