import { Metadata } from "next";
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
} from "lucide-react";
import { GA_CITIES, GA_CATEGORIES, SEED_LISTINGS } from "@/lib/seed-data";

export const metadata: Metadata = {
  title: "GACubes - Georgia Ice, Water & Essentials Finder",
  description:
    "Find ice vending machines, water refill stations, dry ice, propane, and nearby stores fast in Georgia. The #1 Georgia essentials directory.",
};

const HERO_CATEGORIES = [
  {
    icon: <Snowflake size={24} />,
    label: "Ice Vending",
    href: "/georgia/ice-vending-machines",
    color: "bg-blue-500",
  },
  {
    icon: <Droplets size={24} />,
    label: "Water Refill",
    href: "/georgia/water-refill-stations",
    color: "bg-cyan-500",
  },
  {
    icon: <Snowflake size={24} />,
    label: "Dry Ice",
    href: "/georgia/dry-ice",
    color: "bg-indigo-500",
  },
  {
    icon: <Flame size={24} />,
    label: "Propane",
    href: "/georgia/propane-refill",
    color: "bg-orange-500",
  },
  {
    icon: <Beer size={24} />,
    label: "Beer Near Ice",
    href: "/georgia/beer-near-ice",
    color: "bg-yellow-600",
  },
  {
    icon: <Store size={24} />,
    label: "Convenience",
    href: "/georgia/convenience-stores",
    color: "bg-green-500",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <Snowflake size={22} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">GACubes</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/search"
              className="text-gray-600 hover:text-gray-900"
            >
              Search
            </Link>
            <Link
              href="/submit"
              className="text-gray-600 hover:text-gray-900"
            >
              Submit Location
            </Link>
            <Link
              href="/advertise"
              className="text-gray-600 hover:text-gray-900"
            >
              Advertise
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Find Ice, Water &amp; Essentials
            <br />
            <span className="text-blue-200">Fast in Georgia</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Ice vending, water refill, dry ice, propane, and nearby stores.
            One search. {SEED_LISTINGS.length}+ locations across Georgia.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-lg mx-auto">
            <Link
              href="/search"
              className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <Search size={20} className="text-gray-400" />
              <span className="text-gray-400 text-left flex-1">
                Search by town, ZIP, or business...
              </span>
              <ArrowRight size={20} className="text-blue-600" />
            </Link>
          </div>

          {/* GPS button */}
          <Link
            href="/search"
            className="mt-4 inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm transition-colors"
          >
            <MapPin size={16} />
            Use my location
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          What are you looking for?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {HERO_CATEGORIES.map(({ icon, label, href, color }) => (
            <Link
              key={label}
              href={href}
              className="flex flex-col items-center gap-3 p-6 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
            >
              <div
                className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white`}
              >
                {icon}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular cities */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Browse by City
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {GA_CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/city/${city.slug}`}
                className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <MapPin size={14} className="text-blue-500 shrink-0" />
                <span className="text-sm text-gray-700 font-medium truncate">
                  {city.name}, GA
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category landing links */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Browse by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GA_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/georgia/${cat.slug}`}
              className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <span className="font-medium text-gray-700 group-hover:text-blue-600">
                {cat.label} in Georgia
              </span>
              <ArrowRight
                size={16}
                className="text-gray-400 group-hover:text-blue-600"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* About teaser */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Georgia&apos;s #1 Ice &amp; Essentials Directory
          </h2>
          <p className="text-gray-600 leading-relaxed">
            GACubes combines data from ice vending networks, dry ice suppliers,
            propane services, and Georgia&apos;s official alcohol license reports
            into one fast, mobile-friendly search experience. Whether you&apos;re
            planning a cookout, stocking a cooler, or need propane refilled,
            we help you find what you need nearby.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-1 mt-4 text-blue-600 font-medium text-sm hover:underline"
          >
            Learn more <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 text-sm mb-3">
                Search
              </h3>
              <div className="space-y-2">
                {GA_CATEGORIES.slice(0, 4).map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/georgia/${cat.slug}`}
                    className="block text-sm text-gray-500 hover:text-gray-700"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm mb-3">
                Cities
              </h3>
              <div className="space-y-2">
                {GA_CITIES.slice(0, 5).map((city) => (
                  <Link
                    key={city.slug}
                    href={`/city/${city.slug}`}
                    className="block text-sm text-gray-500 hover:text-gray-700"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm mb-3">
                Company
              </h3>
              <div className="space-y-2">
                <Link
                  href="/about"
                  className="block text-sm text-gray-500 hover:text-gray-700"
                >
                  About
                </Link>
                <Link
                  href="/advertise"
                  className="block text-sm text-gray-500 hover:text-gray-700"
                >
                  Advertise
                </Link>
                <Link
                  href="/submit"
                  className="block text-sm text-gray-500 hover:text-gray-700"
                >
                  Submit Location
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm mb-3">
                GACubes
              </h3>
              <p className="text-sm text-gray-500">
                Find ice, water refill, propane, and nearby stores fast in
                Georgia.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} GACubes. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
