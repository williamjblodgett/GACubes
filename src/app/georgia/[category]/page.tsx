import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GA_CATEGORIES, SEED_LISTINGS, GA_CITIES } from "@/lib/seed-data";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/types";
import { getListingsByCategory } from "@/lib/search";
import { MapPin, ArrowLeft, ArrowRight, Snowflake } from "lucide-react";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const cat = GA_CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return { title: "Not Found" };
  return {
    title: `${cat.label} in Georgia - GACubes`,
    description: `Find ${cat.label.toLowerCase()} across Georgia. Browse by city or search near you.`,
  };
}

export function generateStaticParams() {
  return GA_CATEGORIES.map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const cat = GA_CATEGORIES.find((c) => c.slug === slug);
  if (!cat) notFound();

  const listings = getListingsByCategory(cat.category);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="p-2 rounded-lg hover:bg-gray-100">
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Snowflake size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">GACubes</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/" className="hover:text-blue-600">Georgia</Link>
          <span>/</span>
          <span className="text-gray-900">{cat.label}</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {cat.label} in Georgia
        </h1>
        <p className="text-gray-600 mb-8">
          Find {cat.label.toLowerCase()} locations across Georgia. Browse all
          listings or search by city and ZIP.
        </p>

        {/* Listings */}
        {listings.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <p className="text-gray-500">No listings found yet.</p>
            <Link
              href="/submit"
              className="inline-flex items-center gap-1 mt-3 text-blue-600 text-sm hover:underline"
            >
              Submit a location <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {listings.map((l) => (
              <Link
                key={l.id}
                href={`/listing/${l.id}`}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
              >
                <h2 className="font-semibold text-gray-900">{l.name}</h2>
                <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                  <MapPin size={14} />
                  {l.address}, {l.city}, GA {l.zip}
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${
                      CATEGORY_COLORS[l.category_primary]
                    }`}
                  >
                    {CATEGORY_LABELS[l.category_primary]}
                  </span>
                  {l.open_24h && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      24/7
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-2">{l.hours}</p>
              </Link>
            ))}
          </div>
        )}

        {/* City links for this category */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {cat.label} by City
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {GA_CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/city/${city.slug}`}
                className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 text-sm text-gray-700 font-medium"
              >
                <MapPin size={14} className="text-blue-500 shrink-0" />
                {city.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Search all categories <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    </div>
  );
}
