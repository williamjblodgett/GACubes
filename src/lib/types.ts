export interface Listing {
  id: string;
  name: string;
  category_primary: CategoryType;
  category_secondary: CategoryType[];
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
  phone: string;
  website: string;
  hours: string;
  open_24h: boolean;
  payment_types: PaymentType[];
  has_water_refill: boolean;
  has_dry_ice: boolean;
  has_propane_refill: boolean;
  has_propane_exchange: boolean;
  alcohol_license_nearby: boolean;
  convenience_store_nearby: boolean;
  source_name: string;
  source_url: string;
  source_priority: number;
  last_verified_at: string;
  status: "active" | "closed" | "unverified";
  photos: string[];
  rating?: number;
  density_score?: number;
  distance?: number;
}

export type CategoryType =
  | "ice-vending"
  | "water-refill"
  | "dry-ice"
  | "propane-refill"
  | "propane-exchange"
  | "convenience-store"
  | "beer-drinks"
  | "package-store";

export type PaymentType = "cash" | "card" | "mobile";

export interface SearchFilters {
  query: string;
  lat?: number;
  lng?: number;
  radius: number;
  categories: CategoryType[];
  openNow: boolean;
  open24h: boolean;
  cardAccepted: boolean;
  hasWaterRefill: boolean;
  hasDryIce: boolean;
  hasPropane: boolean;
  nearBeer: boolean;
  highDensity: boolean;
  sortBy: "distance" | "rating" | "density";
}

export interface SearchState {
  filters: SearchFilters;
  results: Listing[];
  selectedId: string | null;
  loading: boolean;
  locationLabel: string;
}

export const CATEGORY_LABELS: Record<CategoryType, string> = {
  "ice-vending": "Ice Vending",
  "water-refill": "Water Refill",
  "dry-ice": "Dry Ice",
  "propane-refill": "Propane Refill",
  "propane-exchange": "Propane Exchange",
  "convenience-store": "Convenience Store",
  "beer-drinks": "Beer & Drinks",
  "package-store": "Package Store",
};

export const CATEGORY_COLORS: Record<CategoryType, string> = {
  "ice-vending": "bg-blue-500",
  "water-refill": "bg-cyan-500",
  "dry-ice": "bg-indigo-500",
  "propane-refill": "bg-orange-500",
  "propane-exchange": "bg-amber-500",
  "convenience-store": "bg-green-500",
  "beer-drinks": "bg-yellow-600",
  "package-store": "bg-purple-500",
};

export const DEFAULT_FILTERS: SearchFilters = {
  query: "",
  radius: 25,
  categories: [],
  openNow: false,
  open24h: false,
  cardAccepted: false,
  hasWaterRefill: false,
  hasDryIce: false,
  hasPropane: false,
  nearBeer: false,
  highDensity: false,
  sortBy: "distance",
};

export const GA_CENTER = { lat: 32.9, lng: -83.4 };

export const RADIUS_OPTIONS = [5, 10, 25, 50];

export interface CityInfo {
  name: string;
  slug: string;
  lat: number;
  lng: number;
  county: string;
  population?: number;
}
