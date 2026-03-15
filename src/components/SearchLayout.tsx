"use client";

import { useState } from "react";
import { SearchProvider, useSearch } from "@/lib/search-context";
import Sidebar from "./Sidebar";
import ResultsPanel from "./ResultsPanel";
import MapPanel from "./MapPanel";
import MobileNav from "./MobileNav";
import MobileFilters from "./MobileFilters";
import { Search, MapPin, Snowflake } from "lucide-react";

function SearchLayoutInner() {
  const [mobileTab, setMobileTab] = useState<
    "search" | "map" | "saved" | "submit"
  >("search");
  const { filters, updateFilters, locateMe, loading } = useSearch();

  return (
    <div className="h-screen flex flex-col">
      {/* Mobile top bar */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-2">
        <a href="/" className="flex items-center gap-1.5 mr-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <Snowflake size={16} className="text-white" />
          </div>
        </a>
        <div className="flex-1 relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Town, ZIP, or business..."
            value={filters.query}
            onChange={(e) => updateFilters({ query: e.target.value })}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={locateMe}
          disabled={loading}
          className="p-2 bg-blue-600 text-white rounded-lg"
        >
          <MapPin size={18} />
        </button>
        <MobileFilters />
      </div>

      {/* Desktop 3-panel layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - desktop only */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Center panel - results */}
        <div
          className={`flex-1 min-w-0 ${
            mobileTab === "search" ? "block" : "hidden"
          } lg:block lg:max-w-md border-r border-gray-200`}
        >
          <ResultsPanel />
        </div>

        {/* Right panel - map */}
        <div
          className={`flex-1 ${
            mobileTab === "map" ? "block" : "hidden"
          } lg:block`}
        >
          <MapPanel />
        </div>

        {/* Saved tab placeholder */}
        {mobileTab === "saved" && (
          <div className="flex-1 lg:hidden flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 text-sm">No saved locations yet.</p>
              <p className="text-gray-400 text-xs mt-1">
                Tap the bookmark icon on a listing to save it.
              </p>
            </div>
          </div>
        )}

        {/* Submit tab placeholder */}
        {mobileTab === "submit" && (
          <div className="flex-1 lg:hidden p-4">
            <div className="text-center py-8">
              <p className="text-gray-700 font-medium">
                Submit a Location
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Know an ice, water, or propane location we&apos;re missing?
              </p>
              <a
                href="/submit"
                className="inline-block mt-4 px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium"
              >
                Submit Location
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Mobile nav */}
      <MobileNav activeTab={mobileTab} onTabChange={setMobileTab} />
    </div>
  );
}

export default function SearchLayout() {
  return (
    <SearchProvider>
      <SearchLayoutInner />
    </SearchProvider>
  );
}
