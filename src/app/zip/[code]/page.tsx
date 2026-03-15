import { Metadata } from "next";
import Link from "next/link";
import { SEED_LISTINGS } from "@/lib/seed-data";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/types";
import { MapPin, ArrowRight, Star } from "lucide-react";
import Header from "@/components/Header";

interface Props { params: Promise<{ code: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  return { title: `Ice Near Me ${code} - GACubes`, description: `Find ice, water, propane near ZIP ${code} in Georgia.` };
}

export function generateStaticParams() {
  return [...new Set(SEED_LISTINGS.map((l) => l.zip))].map((z) => ({ code: z }));
}

export default async function ZipPage({ params }: Props) {
  const { code } = await params;
  const listings = SEED_LISTINGS.filter((l) => l.zip === code && l.status === "active");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero banner */}
      <div className="bg-header-bg text-white py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-3">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">ZIP {code}</span>
          </div>
          <h1 className="text-3xl font-bold">Ice &amp; Essentials Near {code}</h1>
          <p className="text-white/60 mt-2">Find ice vending, water refill, dry ice, propane near ZIP code {code} in Georgia.</p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {listings.length === 0 ? (
          <div className="bg-surface rounded-2xl border border-border p-10 text-center">
            <p className="text-muted">No listings found near {code} yet.</p>
            <Link href="/submit" className="inline-flex items-center gap-1 mt-3 text-primary text-sm font-semibold hover:underline">Submit a location <ArrowRight size={14} /></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listings.map((l) => (
              <Link key={l.id} href={`/listing/${l.id}`} className="bg-surface rounded-2xl border border-border p-5 hover:shadow-lg hover:border-primary/30 transition-all group">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-bold text-foreground group-hover:text-primary transition-colors">{l.name}</h2>
                  {l.rating && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-foreground shrink-0">
                      <Star size={12} className="text-yellow-500 fill-yellow-500" /> {l.rating}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted mt-1">
                  <MapPin size={14} className="text-primary shrink-0" />
                  {l.address}, {l.city}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold text-white ${CATEGORY_COLORS[l.category_primary]}`}>{CATEGORY_LABELS[l.category_primary]}</span>
                  {l.open_24h && <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">24/7</span>}
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="mt-8">
          <Link href="/search" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors">
            Search all of Georgia <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    </div>
  );
}
