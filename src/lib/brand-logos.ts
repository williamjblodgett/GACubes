const BRAND_LOGOS: Record<string, string> = {
  "Twice the Ice": "/logos/twice-the-ice.svg",
  "Kooler Ice": "/logos/kooler-ice.svg",
  "Kooler Ice HQ": "/logos/kooler-ice.svg",
  "Ice House America": "/logos/ice-house-america.svg",
  "Watermill Express": "/logos/watermill-express.svg",
  "Primo Water": "/logos/primo-water.svg",
  "QuikTrip": "/logos/quiktrip.svg",
  "RaceTrac": "/logos/racetrac.svg",
  "Circle K": "/logos/circle-k.svg",
  "Buc-ee's": "/logos/buc-ees.svg",
  "Parker's": "/logos/parkers.svg",
  "Total Wine & More": "/logos/total-wine.svg",
  "Piggly Wiggly": "/logos/piggly-wiggly.svg",
  "Harvey's": "/logos/harveys.svg",
  "Harvey's Supermarket": "/logos/harveys.svg",
  "AmeriGas Propane": "/logos/amerigas.svg",
  "U-Haul Propane": "/logos/u-haul.svg",
  "Tractor Supply Propane": "/logos/tractor-supply.svg",
  "Nugget Ice": "/logos/nugget-ice.svg",
  "Fresh Ice 24/7": "/logos/fresh-ice-24-7.svg",
  "Peach State Ice": "/logos/peach-state-ice.svg",
  "Georgia Ice Express": "/logos/georgia-ice-express.svg",
  "Ice Cold South": "/logos/ice-cold-south.svg",
  "Quick Ice ATL": "/logos/quick-ice-atl.svg",
  "Continental Carbonic": "/logos/continental-carbonic.svg",
  "Penguin Dry Ice": "/logos/penguin-dry-ice.svg",
  "Superior Dry Ice": "/logos/superior-dry-ice.svg",
};

export function getBrandFromName(listingName: string): string {
  return listingName.split(" - ")[0].trim();
}

export function getBrandLogo(listingName: string): string | null {
  const brand = getBrandFromName(listingName);
  return BRAND_LOGOS[brand] ?? null;
}
