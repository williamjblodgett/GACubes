import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GA_CITIES, SEED_LISTINGS } from "@/lib/seed-data";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/types";
import { MapPin, ArrowRight } from "lucide-react";
import Header from "@/components/Header";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = GA_CITIES.find((c) => c.slug === slug);
  if (!city) return { title: "Not Found" };
  return { title: `Ice & Essentials in ${city.name}, GA - GACubes`, description: `Find ice, water, propane in ${city.name}, Georgia.` };
}

export function generateStaticParams() { return GA_CITIES.map((c) => ({ slug: c.slug })); }

export default async function CityPage({ params }: Props) {
  const { slug } = await params;
  const city = GA_CITIES.find((c) => c.slug === slug);
  if (!city) notFound();
  const listings = SEED_LISTINGS.filter((l) => l.city.toLowerCase() === city.name.toLowerCase() && l.status === "active");

  return (
    <div className="min-h-screen bg-surface-secondary">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm text-muted mb-4">
          <Link href="/" className="hover:text-primary">Home</Link><span>/</span><span className="text-foreground">{city.name}, GA</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Ice &amp; Essentials in {city.name}, GA</h1>
        <p className="text-muted mb-8">Find ice vending, water refill, dry ice, propane, and nearby stores in {city.name}, Georgia.</p>

        {listings.length === 0 ? (
          <div className="bg-surface rounded-xl border border-border p-8 text-center">
            <p className="text-muted">No listings found in {city.name} yet.</p>
            <Link href="/submit" className="inline-flex items-center gap-1 mt-3 text-primary text-sm hover:underline">Submit a location <ArrowRight size={14} /></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listings.map((l) => (
              <Link key={l.id} href={`/listing/${l.id}`} className="bg-surface rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
                <h2 className="font-semibold text-foreground">{l.name}</h2>
                <div className="flex items-center gap-1 text-sm text-muted mt-1"><MapPin size={14} />{l.address}</div>
                <div className="flex flex-wrap gap-1 mt-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium text-white ${CATEGORY_COLORS[l.category_primary]}`}>{CATEGORY_LABELS[l.category_primary]}</span>
                  {l.open_24h && <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">24/7</span>}
                </div>
                <p className="text-xs text-muted mt-2">{l.hours}</p>
              </Link>
            ))}
          </div>
        )}
        <div className="mt-8">
          <Link href="/search" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover">Search all of Georgia <ArrowRight size={16} /></Link>
        </div>
      </main>
    </div>
  );
}
