import { Metadata } from "next";
import Link from "next/link";
import { SEED_LISTINGS } from "@/lib/seed-data";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/types";
import { MapPin, ArrowRight } from "lucide-react";
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
    <div className="min-h-screen bg-surface-secondary">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm text-muted mb-4">
          <Link href="/" className="hover:text-primary">Home</Link><span>/</span><span className="text-foreground">ZIP {code}</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Ice &amp; Essentials Near {code}</h1>
        <p className="text-muted mb-8">Find ice vending, water refill, dry ice, propane near ZIP code {code} in Georgia.</p>

        {listings.length === 0 ? (
          <div className="bg-surface rounded-xl border border-border p-8 text-center">
            <p className="text-muted">No listings found near {code} yet.</p>
            <Link href="/submit" className="inline-flex items-center gap-1 mt-3 text-primary text-sm hover:underline">Submit a location <ArrowRight size={14} /></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listings.map((l) => (
              <Link key={l.id} href={`/listing/${l.id}`} className="bg-surface rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
                <h2 className="font-semibold text-foreground">{l.name}</h2>
                <div className="flex items-center gap-1 text-sm text-muted mt-1"><MapPin size={14} />{l.address}, {l.city}</div>
                <div className="flex flex-wrap gap-1 mt-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium text-white ${CATEGORY_COLORS[l.category_primary]}`}>{CATEGORY_LABELS[l.category_primary]}</span>
                  {l.open_24h && <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">24/7</span>}
                </div>
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
