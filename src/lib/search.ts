import { Listing, SearchFilters } from "./types";
import { SEED_LISTINGS } from "./seed-data";

function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3959; // Earth radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function searchListings(filters: SearchFilters): Listing[] {
  let results = [...SEED_LISTINGS].filter((l) => l.status === "active");

  // Category filter
  if (filters.categories.length > 0) {
    results = results.filter(
      (l) =>
        filters.categories.includes(l.category_primary) ||
        l.category_secondary.some((c) => filters.categories.includes(c))
    );
  }

  // Boolean filters
  if (filters.openNow) {
    // Simplified: just check 24h for now since we don't parse hours strings
    results = results.filter((l) => l.open_24h);
  }
  if (filters.open24h) results = results.filter((l) => l.open_24h);
  if (filters.cardAccepted)
    results = results.filter((l) => l.payment_types.includes("card"));
  if (filters.hasWaterRefill)
    results = results.filter((l) => l.has_water_refill);
  if (filters.hasDryIce) results = results.filter((l) => l.has_dry_ice);
  if (filters.hasPropane)
    results = results.filter(
      (l) => l.has_propane_refill || l.has_propane_exchange
    );
  if (filters.hasIceCream)
    results = results.filter((l) => l.has_ice_cream);
  if (filters.hasPublicBathroom)
    results = results.filter((l) => l.has_public_bathroom);
  if (filters.nearBeer)
    results = results.filter((l) => l.alcohol_license_nearby);
  if (filters.highDensity)
    results = results.filter((l) => (l.density_score ?? 0) >= 5);

  // Distance filter
  if (filters.lat != null && filters.lng != null) {
    results = results
      .map((l) => ({
        ...l,
        distance: haversineDistance(filters.lat!, filters.lng!, l.lat, l.lng),
      }))
      .filter((l) => l.distance! <= filters.radius);
  }

  // Sort
  if (filters.sortBy === "distance" && filters.lat != null) {
    results.sort((a, b) => (a.distance ?? 999) - (b.distance ?? 999));
  } else if (filters.sortBy === "rating") {
    results.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  } else if (filters.sortBy === "density") {
    results.sort(
      (a, b) => (b.density_score ?? 0) - (a.density_score ?? 0)
    );
  }

  return results;
}

export function getListingById(id: string): Listing | undefined {
  return SEED_LISTINGS.find((l) => l.id === id);
}

export function getListingsByCity(city: string): Listing[] {
  return SEED_LISTINGS.filter(
    (l) => l.city.toLowerCase() === city.toLowerCase() && l.status === "active"
  );
}

export function getListingsByZip(zip: string): Listing[] {
  return SEED_LISTINGS.filter((l) => l.zip === zip && l.status === "active");
}

export function getListingsByCategory(category: string): Listing[] {
  return SEED_LISTINGS.filter(
    (l) =>
      (l.category_primary === category ||
        l.category_secondary.includes(category as Listing["category_primary"])) &&
      l.status === "active"
  );
}

export function getDensityLabel(score: number): string {
  if (score >= 7) return "High concentration";
  if (score >= 4) return "Good options";
  return "Sparse";
}
