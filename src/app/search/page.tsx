import { Metadata } from "next";
import SearchLayout from "@/components/SearchLayout";

export const metadata: Metadata = {
  title: "Search - GACubes | Georgia Ice, Water & Essentials",
  description:
    "Search for ice vending, water refill, dry ice, propane, and nearby stores across Georgia. Filter by location, category, and more.",
};

export default function SearchPage() {
  return <SearchLayout />;
}
