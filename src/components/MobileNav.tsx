"use client";

import { Search, Map, Bookmark, PlusCircle } from "lucide-react";

type Tab = "search" | "map" | "saved" | "submit";

interface MobileNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function MobileNav({ activeTab, onTabChange }: MobileNavProps) {
  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "search", label: "Search", icon: <Search size={20} /> },
    { key: "map", label: "Map", icon: <Map size={20} /> },
    { key: "saved", label: "Saved", icon: <Bookmark size={20} /> },
    { key: "submit", label: "Submit", icon: <PlusCircle size={20} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-50 lg:hidden">
      <div className="flex items-center justify-around py-2">
        {tabs.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => onTabChange(key)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors ${
              activeTab === key ? "text-primary" : "text-muted hover:text-foreground"
            }`}
          >
            {icon}
            <span className="text-[10px] font-semibold">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
