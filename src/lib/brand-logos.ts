const BRAND_LOGOS: Record<string, string> = {
  "Twice the Ice": "/logos/twice-the-ice.png",
  "Kooler Ice": "/logos/kooler-ice.png",
  "Kooler Ice HQ": "/logos/kooler-ice.png",
  "Ice House America": "/logos/ice-house-america.png",
  "Watermill Express": "/logos/watermill-express.png",
  "Primo Water": "/logos/primo-water.png",
  "QuikTrip": "/logos/quiktrip.png",
  "RaceTrac": "/logos/racetrac.png",
  "Circle K": "/logos/circle-k.png",
  "Buc-ee's": "/logos/buc-ees.png",
  "Parker's": "/logos/parkers.png",
  "Total Wine & More": "/logos/total-wine.png",
  "Piggly Wiggly": "/logos/piggly-wiggly.png",
  "Harvey's": "/logos/harveys.png",
  "Harvey's Supermarket": "/logos/harveys.png",
  "AmeriGas Propane": "/logos/amerigas.png",
  "U-Haul Propane": "/logos/u-haul.png",
  "Tractor Supply Propane": "/logos/tractor-supply.png",
  "Nugget Ice": "/logos/nugget-ice.png",
  "Fresh Ice 24/7": "/logos/fresh-ice-24-7.png",
  "Peach State Ice": "/logos/peach-state-ice.png",
  "Georgia Ice Express": "/logos/georgia-ice-express.png",
  "Ice Cold South": "/logos/ice-cold-south.png",
  "Quick Ice ATL": "/logos/quick-ice-atl.png",
  "Continental Carbonic": "/logos/continental-carbonic.png",
  "Penguin Dry Ice": "/logos/penguin-dry-ice.png",
  "Superior Dry Ice": "/logos/superior-dry-ice.png",
};

export function getBrandFromName(listingName: string): string {
  return listingName.split(" - ")[0].trim();
}

export function getBrandLogo(listingName: string): string | null {
  const brand = getBrandFromName(listingName);
  return BRAND_LOGOS[brand] ?? null;
}
