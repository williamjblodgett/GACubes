const STORAGE_KEY = "gacubes-recent-searches";
const MAX_RECENT = 5;

export interface RecentSearch {
  query: string;
  timestamp: number;
}

export function getRecentSearches(): RecentSearch[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as RecentSearch[];
  } catch {
    return [];
  }
}

export function addRecentSearch(query: string): void {
  if (!query.trim() || query.trim().length < 2) return;
  try {
    const existing = getRecentSearches();
    const filtered = existing.filter(
      (s) => s.query.toLowerCase() !== query.trim().toLowerCase()
    );
    const updated = [
      { query: query.trim(), timestamp: Date.now() },
      ...filtered,
    ].slice(0, MAX_RECENT);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore storage errors
  }
}

export function removeRecentSearch(index: number): void {
  try {
    const existing = getRecentSearches();
    existing.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // ignore
  }
}

export function clearRecentSearches(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
