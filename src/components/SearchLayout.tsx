"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SearchProvider, useSearch } from "@/lib/search-context";
import Sidebar from "./Sidebar";
import ResultsPanel from "./ResultsPanel";
import MapPanel from "./MapPanel";
import MobileNav from "./MobileNav";
import MobileFilters from "./MobileFilters";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import SavedListings from "./SavedListings";
import SearchAutocomplete from "./SearchAutocomplete";

function SearchLayoutInner() {
  const [mobileTab, setMobileTab] = useState<"search" | "map" | "saved" | "submit">("search");
  const { filters, updateFilters, locateMe, loading } = useSearch();
  const searchParams = useSearchParams();
  const appliedParams = useRef(false);

  useEffect(() => {
    if (appliedParams.current) return;
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    if (lat && lng) {
      appliedParams.current = true;
      updateFilters({
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      });
    } else {
      // Auto-locate to show closest results by default
      appliedParams.current = true;
      locateMe();
    }
  }, [searchParams, updateFilters, locateMe]);

  return (
    <div className="h-screen flex flex-col">
      {/* Mobile top bar */}
      <div className="lg:hidden bg-header-bg px-4 py-3 flex items-center gap-2">
        <Link href="/" className="flex items-center gap-1.5 mr-2">
          <Image src="/logos/39C1E6E2-AF08-4656-BAE7-AC123CC3B5BC.png" alt="GACubes" width={28} height={28} className="object-contain" />
        </Link>
        <div className="flex-1">
          <SearchAutocomplete
            value={filters.query}
            onChange={(val) => updateFilters({ query: val })}
            variant="dark"
            iconClassName="text-white/40"
            className="w-full pl-9 pr-3 py-2 border border-white/10 rounded-xl text-sm bg-white/5 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button onClick={locateMe} disabled={loading} className="p-2 bg-primary text-white rounded-xl">
          <MapPin size={18} />
        </button>
        <MobileFilters />
      </div>

      {/* Desktop 3-panel layout */}
      <div className="flex-1 flex overflow-hidden">
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <div className={`flex-1 min-w-0 ${mobileTab === "search" ? "block" : "hidden"} lg:block lg:max-w-md border-r border-border`}>
          <ResultsPanel />
        </div>

        <div className={`flex-1 ${mobileTab === "map" ? "block" : "hidden"} lg:block`}>
          <MapPanel />
        </div>

        {mobileTab === "saved" && (
          <div className="flex-1 lg:hidden flex flex-col bg-background">
            <SavedListings />
          </div>
        )}

        {mobileTab === "submit" && (
          <div className="flex-1 lg:hidden p-4 bg-surface">
            <div className="text-center py-8">
              <p className="text-foreground font-semibold">Submit a Location</p>
              <p className="text-muted text-sm mt-1">Know a location we&apos;re missing?</p>
              <Link href="/submit" className="inline-block mt-4 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold">
                Submit Location
              </Link>
            </div>
          </div>
        )}
      </div>

      <MobileNav activeTab={mobileTab} onTabChange={setMobileTab} />
    </div>
  );
}

function SearchLayoutWrapper() {
  return (
    <SearchProvider>
      <SearchLayoutInner />
    </SearchProvider>
  );
}

export default function SearchLayout() {
  return (
    <Suspense>
      <SearchLayoutWrapper />
    </Suspense>
  );
}
