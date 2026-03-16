import Image from "next/image";
import Link from "next/link";
import {
  Snowflake,
  Droplets,
  Flame,
  Beer,
  Store,
  MapPin,
  Search,
  ArrowRight,
  Waves,
  Star,
  Clock,
} from "lucide-react";
import { GA_CITIES, GA_CATEGORIES, SEED_LISTINGS } from "@/lib/seed-data";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/types";
import { getBrandLogo, getBrandFromName } from "@/lib/brand-logos";
import Header from "@/components/Header";
import AdBanner from "@/components/AdBanner";

const LAKE_AREAS = [
  { name: "Lake Lanier", slug: "lake-lanier", lat: 34.24, lng: -83.96, description: "North Georgia's most popular lake" },
  { name: "Lake Allatoona", slug: "lake-allatoona", lat: 34.17, lng: -84.72, description: "Northwest of Atlanta" },
  { name: "Lake Oconee", slug: "lake-oconee", lat: 33.55, lng: -83.40, description: "Putnam & Greene Counties" },
  { name: "Lake Hartwell", slug: "lake-hartwell", lat: 34.44, lng: -82.88, description: "GA-SC border lake" },
  { name: "Lake Sinclair", slug: "lake-sinclair", lat: 33.10, lng: -83.25, description: "Near Milledgeville" },
  { name: "Lake Blue Ridge", slug: "lake-blue-ridge", lat: 34.88, lng: -84.27, description: "Blue Ridge Mountains" },
];

const HERO_CATEGORIES = [
  { icon: <Snowflake size={28} />, label: "Ice Vending", href: "/georgia/ice-vending-machines", color: "bg-blue-500" },
  { icon: <Droplets size={28} />, label: "Water Refill", href: "/georgia/water-refill-stations", color: "bg-cyan-500" },
  { icon: <Snowflake size={28} />, label: "Dry Ice", href: "/georgia/dry-ice", color: "bg-indigo-500" },
  { icon: <Flame size={28} />, label: "Propane", href: "/georgia/propane-refill", color: "bg-orange-500" },
  { icon: <Beer size={28} />, label: "Beer & Ice", href: "/georgia/beer-near-ice", color: "bg-yellow-600" },
  { icon: <Store size={28} />, label: "Convenience", href: "/georgia/convenience-stores", color: "bg-green-500" },
];

// Get featured listings (pick some with good data)
const FEATURED = SEED_LISTINGS.filter(l => l.status === "active").slice(0, 8);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero - dark section with search */}
      <section className="bg-header-bg text-white">
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-12 md:pt-12 md:pb-16">
          <div className="flex items-center gap-3 mb-6">
            <Image
              src="/logos/39C1E6E2-AF08-4656-BAE7-AC123CC3B5BC.png"
              alt="GACubes"
              width={80}
              height={80}
              className="object-contain"
              priority
            />
            <div>
              <div className="flex items-center gap-2 text-primary text-sm font-medium mb-1">
                <MapPin size={16} />
                <span>Georgia, USA</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                Find Ice, Water &amp;
                <br />
                <span className="text-primary">Essentials Near You</span>
              </h1>
            </div>
          </div>
          <p className="mt-3 text-white/60 max-w-lg">
            {SEED_LISTINGS.length}+ locations across Georgia. Ice vending, water refill, dry ice, propane, and nearby stores.
          </p>

          {/* Search bar */}
          <div className="mt-6 max-w-lg">
            <Link
              href="/search"
              className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <Search size={20} className="text-gray-400" />
              <span className="text-gray-400 text-left flex-1">Search by town, ZIP, or business...</span>
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0">
                <ArrowRight size={18} className="text-white" />
              </div>
            </Link>
          </div>

          {/* Ad unit in hero area */}
          <div className="mt-8 max-w-lg">
            <AdBanner slot="HOME_HERO" format="horizontal" className="rounded-2xl overflow-hidden" />
          </div>
        </div>
      </section>

      {/* Categories grid */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Categories</h2>
          <Link href="/search" className="text-primary text-sm font-medium hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {HERO_CATEGORIES.map(({ icon, label, href, color }) => (
            <Link
              key={label}
              href={href}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-surface border border-border hover:border-primary hover:shadow-lg transition-all group"
            >
              <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                {icon}
              </div>
              <span className="text-xs font-semibold text-foreground text-center">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Nearest / Featured listings */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Nearest Locations</h2>
          <Link href="/search" className="text-primary text-sm font-medium hover:underline">See All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURED.map((l) => (
            <Link
              key={l.id}
              href={`/listing/${l.id}`}
              className="bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all group p-4"
            >
              <div className="flex items-center gap-2.5">
                {getBrandLogo(l.name) ? (
                  <Image
                    src={getBrandLogo(l.name)!}
                    alt={getBrandFromName(l.name)}
                    width={32}
                    height={32}
                    className="rounded-lg shrink-0 object-contain"
                  />
                ) : (
                  <div className={`w-8 h-8 ${CATEGORY_COLORS[l.category_primary]} rounded-lg flex items-center justify-center shrink-0`}>
                    {l.category_primary === "ice-vending" && <Snowflake size={16} className="text-white" />}
                    {l.category_primary === "water-refill" && <Droplets size={16} className="text-white" />}
                    {l.category_primary === "dry-ice" && <Snowflake size={16} className="text-white" />}
                    {(l.category_primary === "propane-refill" || l.category_primary === "propane-exchange") && <Flame size={16} className="text-white" />}
                    {l.category_primary === "convenience-store" && <Store size={16} className="text-white" />}
                    {(l.category_primary === "beer-drinks" || l.category_primary === "package-store") && <Beer size={16} className="text-white" />}
                  </div>
                )}
                <h3 className="font-bold text-foreground text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {l.name}
                </h3>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted mt-2">
                <MapPin size={12} className="shrink-0" />
                <span className="truncate">{l.address}, {l.city}</span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-1.5">
                  {l.rating && (
                    <span className="inline-flex items-center gap-0.5">
                      <Star size={12} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-semibold text-foreground">{l.rating}</span>
                    </span>
                  )}
                  {l.open_24h && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                      24/7
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${CATEGORY_COLORS[l.category_primary]}`}>
                  {CATEGORY_LABELS[l.category_primary]}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Ad between sections */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <AdBanner slot="HOME_TOP" format="horizontal" />
      </div>

      {/* Browse by City */}
      <section className="bg-surface py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-bold text-foreground mb-6">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {GA_CITIES.slice(0, 20).map((city) => (
              <Link
                key={city.slug}
                href={`/city/${city.slug}`}
                className="flex items-center gap-2.5 p-3 bg-background rounded-xl border border-border hover:border-primary hover:shadow-sm transition-all"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin size={14} className="text-primary" />
                </div>
                <span className="text-sm text-foreground font-medium truncate">{city.name}, GA</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/search" className="text-primary text-sm font-medium hover:underline">
              View all {GA_CITIES.length} cities →
            </Link>
          </div>
        </div>
      </section>

      {/* Lake Areas */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-foreground mb-2">Lake Areas</h2>
        <p className="text-muted text-sm mb-6">Find ice, water &amp; essentials near Georgia&apos;s top lakes</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {LAKE_AREAS.map((lake) => (
            <Link
              key={lake.slug}
              href={`/search?lat=${lake.lat}&lng=${lake.lng}&label=${encodeURIComponent(lake.name)}`}
              className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-surface border border-border hover:border-blue-400 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <Waves size={22} className="text-blue-500" />
              </div>
              <span className="text-sm font-semibold text-foreground text-center group-hover:text-blue-600">{lake.name}</span>
              <span className="text-[11px] text-muted text-center">{lake.description}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Ad between sections */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <AdBanner slot="HOME_MID" format="horizontal" />
      </div>

      {/* Browse by Category */}
      <section className="bg-surface py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-bold text-foreground mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {GA_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/georgia/${cat.slug}`}
                className="flex items-center justify-between p-4 bg-background rounded-xl border border-border hover:border-primary hover:shadow-md transition-all group"
              >
                <span className="font-medium text-foreground group-hover:text-primary">{cat.label} in Georgia</span>
                <ArrowRight size={16} className="text-muted group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About CTA */}
      <section className="bg-primary-light py-10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-foreground mb-3">Georgia&apos;s #1 Ice &amp; Essentials Directory</h2>
          <p className="text-muted leading-relaxed text-sm">
            GACubes combines data from ice vending networks, dry ice suppliers, propane services, and Georgia&apos;s official alcohol license reports into one fast, mobile-friendly search experience.
          </p>
          <Link href="/about" className="inline-flex items-center gap-1 mt-4 text-primary font-semibold text-sm hover:underline">
            Learn more <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-header-bg text-white/80 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-white text-sm mb-3">Search</h3>
              <div className="space-y-2">
                {GA_CATEGORIES.slice(0, 4).map((cat) => (
                  <Link key={cat.slug} href={`/georgia/${cat.slug}`} className="block text-sm text-white/50 hover:text-white">{cat.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm mb-3">Cities</h3>
              <div className="space-y-2">
                {GA_CITIES.slice(0, 5).map((city) => (
                  <Link key={city.slug} href={`/city/${city.slug}`} className="block text-sm text-white/50 hover:text-white">{city.name}</Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm mb-3">Company</h3>
              <div className="space-y-2">
                <Link href="/about" className="block text-sm text-white/50 hover:text-white">About</Link>
                <Link href="/advertise" className="block text-sm text-white/50 hover:text-white">Advertise</Link>
                <Link href="/submit" className="block text-sm text-white/50 hover:text-white">Submit Location</Link>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Image src="/logos/39C1E6E2-AF08-4656-BAE7-AC123CC3B5BC.png" alt="GACubes" width={32} height={32} className="object-contain" />
                <span className="font-bold text-white">GACubes</span>
              </div>
              <p className="text-sm text-white/50">Find ice, water refill, propane, and nearby stores fast in Georgia.</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-xs text-white/40">
            <p>&copy; {new Date().getFullYear()} GACubes. All rights reserved.</p>
            <p className="mt-2">Brand names, logos, and trademarks shown are the property of their respective owners and are used solely to identify listed businesses.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
