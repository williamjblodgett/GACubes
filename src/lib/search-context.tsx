"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import { SearchState, SearchFilters, DEFAULT_FILTERS, Listing } from "./types";
import { searchListings } from "./search";
import { getUserLocation } from "./geo";

interface SearchContextValue extends SearchState {
  updateFilters: (partial: Partial<SearchFilters>) => void;
  resetFilters: () => void;
  selectListing: (id: string | null) => void;
  locateMe: () => Promise<void>;
  runSearch: () => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SearchState>({
    filters: DEFAULT_FILTERS,
    results: [],
    selectedId: null,
    loading: false,
    locationLabel: "Georgia",
  });

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const runSearch = useCallback(() => {
    setState((prev) => {
      const results = searchListings(prev.filters);
      return { ...prev, results, loading: false };
    });
  }, []);

  const updateFilters = useCallback(
    (partial: Partial<SearchFilters>) => {
      if ("query" in partial && Object.keys(partial).length === 1) {
        // Debounce query-only changes
        setState((prev) => ({
          ...prev,
          filters: { ...prev.filters, ...partial },
          loading: true,
        }));
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
          setState((prev) => {
            const results = searchListings(prev.filters);
            return { ...prev, results, loading: false };
          });
        }, 300);
      } else {
        setState((prev) => {
          const filters = { ...prev.filters, ...partial };
          const results = searchListings(filters);
          return { ...prev, filters, results };
        });
      }
    },
    []
  );

  const resetFilters = useCallback(() => {
    setState((prev) => {
      const results = searchListings(DEFAULT_FILTERS);
      return {
        ...prev,
        filters: DEFAULT_FILTERS,
        results,
        locationLabel: "Georgia",
      };
    });
  }, []);

  const selectListing = useCallback((id: string | null) => {
    setState((prev) => ({ ...prev, selectedId: id }));
  }, []);

  const locateMe = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const { lat, lng } = await getUserLocation();
      setState((prev) => {
        const filters = { ...prev.filters, lat, lng };
        const results = searchListings(filters);
        return {
          ...prev,
          filters,
          results,
          loading: false,
          locationLabel: `Near ${lat.toFixed(2)}, ${lng.toFixed(2)}`,
        };
      });
    } catch {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  return (
    <SearchContext.Provider
      value={{
        ...state,
        updateFilters,
        resetFilters,
        selectListing,
        locateMe,
        runSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch(): SearchContextValue {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within SearchProvider");
  return ctx;
}

export function useSearchResults(): Listing[] {
  return useSearch().results;
}
