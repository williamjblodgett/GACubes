import { NextRequest, NextResponse } from "next/server";
import { searchListings } from "@/lib/search";
import { SearchFilters, DEFAULT_FILTERS, CategoryType } from "@/lib/types";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const filters: SearchFilters = {
    ...DEFAULT_FILTERS,
    query: searchParams.get("q") || "",
    lat: searchParams.has("lat") ? Number(searchParams.get("lat")) : undefined,
    lng: searchParams.has("lng") ? Number(searchParams.get("lng")) : undefined,
    radius: Number(searchParams.get("radius")) || DEFAULT_FILTERS.radius,
    categories: searchParams.has("categories")
      ? (searchParams.get("categories")!.split(",") as CategoryType[])
      : [],
    openNow: searchParams.get("openNow") === "true",
    open24h: searchParams.get("open24h") === "true",
    cardAccepted: searchParams.get("cardAccepted") === "true",
    hasWaterRefill: searchParams.get("hasWaterRefill") === "true",
    hasDryIce: searchParams.get("hasDryIce") === "true",
    hasPropane: searchParams.get("hasPropane") === "true",
    nearBeer: searchParams.get("nearBeer") === "true",
    highDensity: searchParams.get("highDensity") === "true",
    sortBy:
      (searchParams.get("sortBy") as SearchFilters["sortBy"]) ||
      DEFAULT_FILTERS.sortBy,
  };

  const results = searchListings(filters);

  return NextResponse.json({
    results,
    total: results.length,
    filters: {
      lat: filters.lat,
      lng: filters.lng,
      radius: filters.radius,
    },
  });
}
