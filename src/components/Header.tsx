"use client";

import Link from "next/link";
import { useTheme } from "@/lib/theme-context";
import {
  Snowflake,
  Search,
  MapPin,
  ChevronDown,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
            <Snowflake size={22} className="text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">GACubes</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link
            href="/search"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-surface-secondary transition-colors"
          >
            <Search size={16} />
            Search
          </Link>
          <div className="relative group">
            <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-surface-secondary transition-colors">
              Browse by City
              <ChevronDown size={14} />
            </button>
          </div>
          <div className="relative group">
            <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-surface-secondary transition-colors">
              Categories
              <ChevronDown size={14} />
            </button>
          </div>
          <Link
            href="/submit"
            className="px-3 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-surface-secondary transition-colors"
          >
            Submit Location
          </Link>
          <Link
            href="/advertise"
            className="px-3 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-surface-secondary transition-colors"
          >
            Advertise
          </Link>
          <Link
            href="/about"
            className="px-3 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-surface-secondary transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface-secondary transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Find Near Me CTA */}
          <Link
            href="/search"
            className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            <MapPin size={16} />
            Find Near Me
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface-secondary"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-surface px-4 py-3 space-y-1">
          <Link
            href="/search"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-surface-secondary"
          >
            <Search size={16} />
            Search
          </Link>
          <Link
            href="/submit"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-surface-secondary"
          >
            Submit Location
          </Link>
          <Link
            href="/advertise"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-surface-secondary"
          >
            Advertise
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-surface-secondary"
          >
            About
          </Link>
          <Link
            href="/search"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium mt-2"
          >
            <MapPin size={16} />
            Find Near Me
          </Link>
        </div>
      )}
    </header>
  );
}
