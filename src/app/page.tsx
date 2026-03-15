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
} from "lucide-react";
import { GA_CITIES, GA_CATEGORIES, SEED_LISTINGS } from "@/lib/seed-data";
import Header from "@/components/Header";

const LAKE_AREAS = [
  { name: "Lake Lanier", slug: "lake-lanier", lat: 34.24, lng: -83.96, description: "North Georgia's most popular lake" },
  { name: "Lake Allatoona", slug: "lake-allatoona", lat: 34.17, lng: -84.72, description: "Northwest of Atlanta" },
  { name: "Lake Oconee", slug: "lake-oconee", lat: 33.55, lng: -83.40, description: "Putnam & Greene Counties" },
  { name: "Lake Hartwell", slug: "lake-hartwell", lat: 34.44, lng: -82.88, description: "GA-SC border lake" },
  { name: "Lake Sinclair", slug: "lake-sinclair", lat: 33.10, lng: -83.25, description: "Near Milledgeville" },
  { name: "Lake Blue Ridge", slug: "lake-blue-ridge", lat: 34.88, lng: -84.27, description: "Blue Ridge Mountains" },
];

const HERO_CATEGORIES = [
  { icon: <Snowflake size={24} />, label: "Ice Vending", href: "/georgia/ice-vending-machines", color: "bg-blue-500" },
  { icon: <Droplets size={24} />, label: "Water Refill", href: "/georgia/water-refill-stations", color: "bg-cyan-500" },
  { icon: <Snowflake size={24} />, label: "Dry Ice", href: "/georgia/dry-ice", color: "bg-indigo-500" },
  { icon: <Flame size={24} />, label: "Propane", href: "/georgia/propane-refill", color: "bg-orange-500" },
  { icon: <Beer size={24} />, label: "Beer Near Ice", href: "/georgia/beer-near-ice", color: "bg-yellow-600" },
  { icon: <Store size={24} />, label: "Convenience", href: "/georgia/convenience-stores", color: "bg-green-500" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Find Ice, Water &amp; Essentials
            <br />
            <span className="text-red-400">Fast in Georgia</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Ice vending, water refill, dry ice, propane, and nearby stores.
            One search. {SEED_LISTINGS.length}+ locations across Georgia.
          </p>

          <div className="mt-8 max-w-lg mx-auto">
            <Link
              href="/search"
              className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <Search size={20} className="text-gray-400" />
              <span className="text-gray-400 text-left flex-1">Search by town, ZIP, or business...</span>
              <ArrowRight size={20} className="text-primary" />
            </Link>
          </div>

          <Link href="/search" className="mt-4 inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
            <MapPin size={16} /> Use my location
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-foreground text-center mb-8">What are you looking for?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {HERO_CATEGORIES.map(({ icon, label, href, color }) => (
            <Link key={label} href={href} className="flex flex-col items-center gap-3 p-6 rounded-xl border border-border bg-surface hover:border-primary hover:shadow-md transition-all">
              <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white`}>{icon}</div>
              <span className="text-sm font-medium text-foreground">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Cities */}
      <section className="bg-surface-secondary py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {GA_CITIES.slice(0, 20).map((city) => (
              <Link key={city.slug} href={`/city/${city.slug}`} className="flex items-center gap-2 p-3 bg-surface rounded-lg border border-border hover:border-primary hover:shadow-sm transition-all">
                <MapPin size={14} className="text-primary shrink-0" />
                <span className="text-sm text-foreground font-medium truncate">{city.name}, GA</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lake Areas */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-foreground text-center mb-2">Lake Areas</h2>
        <p className="text-muted text-center text-sm mb-8">Find ice, water &amp; essentials near Georgia&apos;s top lakes</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {LAKE_AREAS.map((lake) => (
            <Link
              key={lake.slug}
              href={`/search?lat=${lake.lat}&lng=${lake.lng}&label=${encodeURIComponent(lake.name)}`}
              className="flex flex-col items-center gap-2 p-5 rounded-xl border border-border bg-surface hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Waves size={20} className="text-blue-500" />
              </div>
              <span className="text-sm font-medium text-foreground text-center group-hover:text-blue-600">{lake.name}</span>
              <span className="text-xs text-muted text-center">{lake.description}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories list */}
      <section className="bg-surface-secondary py-12">
        <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground text-center mb-8">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GA_CATEGORIES.map((cat) => (
            <Link key={cat.slug} href={`/georgia/${cat.slug}`} className="flex items-center justify-between p-4 bg-surface rounded-xl border border-border hover:border-primary hover:shadow-md transition-all group">
              <span className="font-medium text-foreground group-hover:text-primary">{cat.label} in Georgia</span>
              <ArrowRight size={16} className="text-muted group-hover:text-primary" />
            </Link>
          ))}
        </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-primary-light py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Georgia&apos;s #1 Ice &amp; Essentials Directory</h2>
          <p className="text-muted leading-relaxed">
            GACubes combines data from ice vending networks, dry ice suppliers, propane services, and Georgia&apos;s official alcohol license reports into one fast, mobile-friendly search experience.
          </p>
          <Link href="/about" className="inline-flex items-center gap-1 mt-4 text-primary font-medium text-sm hover:underline">
            Learn more <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-3">Search</h3>
              <div className="space-y-2">
                {GA_CATEGORIES.slice(0, 4).map((cat) => (
                  <Link key={cat.slug} href={`/georgia/${cat.slug}`} className="block text-sm text-muted hover:text-foreground">{cat.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-3">Cities</h3>
              <div className="space-y-2">
                {GA_CITIES.slice(0, 5).map((city) => (
                  <Link key={city.slug} href={`/city/${city.slug}`} className="block text-sm text-muted hover:text-foreground">{city.name}</Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-3">Company</h3>
              <div className="space-y-2">
                <Link href="/about" className="block text-sm text-muted hover:text-foreground">About</Link>
                <Link href="/advertise" className="block text-sm text-muted hover:text-foreground">Advertise</Link>
                <Link href="/submit" className="block text-sm text-muted hover:text-foreground">Submit Location</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-3">GACubes</h3>
              <p className="text-sm text-muted">Find ice, water refill, propane, and nearby stores fast in Georgia.</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-xs text-muted">
            &copy; {new Date().getFullYear()} GACubes. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
