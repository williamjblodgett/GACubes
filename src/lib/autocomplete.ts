import { SEED_LISTINGS } from "./seed-data";

export interface AutocompleteSuggestion {
  label: string;
  type: "business" | "city";
}

// Build indexes at module load time
const uniqueCities = new Set<string>();
const uniqueNames = new Set<string>();

for (const listing of SEED_LISTINGS) {
  uniqueCities.add(listing.city);
  uniqueNames.add(listing.name);
}

const cityEntries: AutocompleteSuggestion[] = Array.from(uniqueCities)
  .sort()
  .map((c) => ({ label: c, type: "city" }));

const nameEntries: AutocompleteSuggestion[] = Array.from(uniqueNames)
  .sort()
  .map((n) => ({ label: n, type: "business" }));

export function getSuggestions(query: string, limit = 8): AutocompleteSuggestion[] {
  if (!query || query.length < 2) return [];

  const q = query.toLowerCase();
  const results: AutocompleteSuggestion[] = [];

  // Cities first (prefix match)
  for (const entry of cityEntries) {
    if (results.length >= limit) break;
    if (entry.label.toLowerCase().startsWith(q)) {
      results.push(entry);
    }
  }

  // Then businesses (prefix match)
  for (const entry of nameEntries) {
    if (results.length >= limit) break;
    if (entry.label.toLowerCase().startsWith(q)) {
      results.push(entry);
    }
  }

  // If not enough, try includes match
  if (results.length < limit) {
    for (const entry of cityEntries) {
      if (results.length >= limit) break;
      if (!entry.label.toLowerCase().startsWith(q) && entry.label.toLowerCase().includes(q)) {
        results.push(entry);
      }
    }
    for (const entry of nameEntries) {
      if (results.length >= limit) break;
      if (!entry.label.toLowerCase().startsWith(q) && entry.label.toLowerCase().includes(q)) {
        results.push(entry);
      }
    }
  }

  return results;
}
