"use client";

import { useState, useEffect } from "react";
import { Clock, X } from "lucide-react";
import { getRecentSearches, removeRecentSearch, clearRecentSearches, RecentSearch } from "@/lib/recent-searches";
import { useSearch } from "@/lib/search-context";

export default function RecentSearches() {
  const [searches, setSearches] = useState<RecentSearch[]>([]);
  const [mounted, setMounted] = useState(false);
  const { updateFilters } = useSearch();

  useEffect(() => {
    setMounted(true);
    setSearches(getRecentSearches());
  }, []);

  if (!mounted || searches.length === 0) return null;

  const handleSelect = (query: string) => {
    updateFilters({ query });
  };

  const handleRemove = (index: number) => {
    removeRecentSearch(index);
    setSearches(getRecentSearches());
  };

  const handleClear = () => {
    clearRecentSearches();
    setSearches([]);
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Recent</span>
        <button
          onClick={handleClear}
          className="text-[10px] text-white/30 hover:text-white/60 transition-colors"
        >
          Clear
        </button>
      </div>
      {searches.map((s, i) => (
        <div
          key={s.timestamp}
          className="flex items-center gap-2 group"
        >
          <button
            onClick={() => handleSelect(s.query)}
            className="flex-1 flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-white/60 hover:text-white hover:bg-white/5 transition-colors text-left truncate"
          >
            <Clock size={11} className="shrink-0 text-white/30" />
            <span className="truncate">{s.query}</span>
          </button>
          <button
            onClick={() => handleRemove(i)}
            className="opacity-0 group-hover:opacity-100 p-1 text-white/30 hover:text-white/60 transition-all"
          >
            <X size={11} />
          </button>
        </div>
      ))}
    </div>
  );
}
