"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, MapPin, Store } from "lucide-react";
import { getSuggestions, AutocompleteSuggestion } from "@/lib/autocomplete";
import { addRecentSearch } from "@/lib/recent-searches";

interface SearchAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  iconClassName?: string;
  variant?: "dark" | "light";
}

export default function SearchAutocomplete({
  value,
  onChange,
  placeholder = "Town, ZIP, or business...",
  className = "",
  iconClassName = "text-white/40",
  variant = "dark",
}: SearchAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value.length >= 2) {
      setSuggestions(getSuggestions(value));
    } else {
      setSuggestions([]);
    }
  }, [value]);

  const handleSelect = useCallback(
    (label: string) => {
      onChange(label);
      addRecentSearch(label);
      setIsOpen(false);
      setSuggestions([]);
      inputRef.current?.blur();
    },
    [onChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightIndex >= 0 && highlightIndex < suggestions.length) {
          handleSelect(suggestions[highlightIndex].label);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdownBg = variant === "dark"
    ? "bg-[#1a2535] border-white/10"
    : "bg-surface border-border";

  const itemHover = variant === "dark"
    ? "hover:bg-white/10"
    : "hover:bg-surface-secondary";

  const itemHighlight = variant === "dark"
    ? "bg-white/10"
    : "bg-surface-secondary";

  const textColor = variant === "dark" ? "text-white" : "text-foreground";
  const mutedColor = variant === "dark" ? "text-white/40" : "text-muted";

  return (
    <div ref={containerRef} className="relative">
      <Search size={variant === "dark" ? 18 : 16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconClassName}`} />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
          setHighlightIndex(-1);
        }}
        onFocus={() => {
          if (suggestions.length > 0) setIsOpen(true);
        }}
        onKeyDown={handleKeyDown}
        className={className}
      />
      {isOpen && suggestions.length > 0 && (
        <div className={`absolute top-full left-0 right-0 mt-1 ${dropdownBg} border rounded-xl shadow-lg z-[100] overflow-hidden`}>
          {suggestions.map((s, i) => (
            <button
              key={`${s.type}-${s.label}`}
              onClick={() => handleSelect(s.label)}
              className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm text-left transition-colors ${
                i === highlightIndex ? itemHighlight : itemHover
              } ${textColor}`}
            >
              {s.type === "city" ? (
                <MapPin size={13} className={mutedColor} />
              ) : (
                <Store size={13} className={mutedColor} />
              )}
              <span className="truncate flex-1">{s.label}</span>
              <span className={`text-[10px] font-medium ${mutedColor}`}>
                {s.type === "city" ? "City" : "Business"}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
