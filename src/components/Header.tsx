"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/lib/theme-context";
import {
  Search,
  MapPin,
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
    <header className="bg-header-bg text-header-fg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5">
          <Image
            src="/39C1E6E2-AF08-4656-BAE7-AC123CC3B5BC.png"
            alt="GACubes"
            width={44}
            height={44}
            className="object-contain"
            priority
          />
          <span className="text-xl font-bold text-white">GACubes</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link
            href="/search"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Search size={16} />
            Search
          </Link>
          <Link
            href="/submit"
            className="px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            Submit
          </Link>
          <Link
            href="/advertise"
            className="px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            Advertise
          </Link>
          <Link
            href="/about"
            className="px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            href="/search"
            className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors"
          >
            <MapPin size={16} />
            Find Near Me
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-header-bg px-4 py-3 space-y-1">
          <Link
            href="/search"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-white/90 hover:bg-white/10"
          >
            <Search size={16} />
            Search
          </Link>
          <Link
            href="/submit"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-white/90 hover:bg-white/10"
          >
            Submit Location
          </Link>
          <Link
            href="/advertise"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-white/90 hover:bg-white/10"
          >
            Advertise
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-white/90 hover:bg-white/10"
          >
            About
          </Link>
          <Link
            href="/search"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold mt-2"
          >
            <MapPin size={16} />
            Find Near Me
          </Link>
        </div>
      )}
    </header>
  );
}
