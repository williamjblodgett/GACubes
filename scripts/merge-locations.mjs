#!/usr/bin/env node
/**
 * Converts compact location entries to full Listing format
 * and appends them to seed-data.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const seedPath = resolve(__dirname, '../src/lib/seed-data.ts');

// Source URLs by chain
const SOURCE_URLS = {
  "Twice the Ice": "https://twicetheice.com/locations",
  "Kooler Ice": "https://koolerice.com/locator-app",
  "Ice House America": "https://icehouseamerica.com",
  "Primo Water": "https://primowater.com/water-dispensers",
  "Watermill Express": "https://watermillexpress.com",
  "Airgas": "https://airgas.com",
  "Penguin Dry Ice": "https://penguindryice.com",
  "AmeriGas": "https://amerigas.com",
  "U-Haul": "https://uhaul.com",
  "Tractor Supply": "https://tractorsupply.com",
  "Circle K": "https://circlek.com",
  "QuikTrip": "https://quiktrip.com",
  "RaceTrac": "https://racetrac.com",
  "Parker's": "https://parkersav.com",
  "Flash Foods": "",
  "Buc-ee's": "https://buc-ees.com",
  "GA Alcohol License": "",
  "Independent": "",
};

const WEBSITE_URLS = {
  "Twice the Ice": "https://twicetheice.com",
  "Kooler Ice": "https://koolerice.com",
  "Ice House America": "https://icehouseamerica.com",
  "Primo Water": "https://primowater.com",
  "Watermill Express": "https://watermillexpress.com",
  "Airgas": "https://airgas.com",
  "Penguin Dry Ice": "https://penguindryice.com",
  "AmeriGas": "https://amerigas.com",
  "U-Haul": "https://uhaul.com",
  "Tractor Supply": "https://tractorsupply.com",
  "Circle K": "https://circlek.com",
  "QuikTrip": "https://quiktrip.com",
  "RaceTrac": "https://racetrac.com",
  "Parker's": "https://parkersav.com",
  "Flash Foods": "",
  "Buc-ee's": "https://buc-ees.com",
};

function compactToFull(entry, id) {
  const cp = entry.cp;
  const cs = entry.cs || [];
  const sn = entry.sn || "Independent";

  const isIce = cp === "ice-vending";
  const isConvenience = cp === "convenience-store" || cp === "beer-drinks" || cp === "package-store";
  const isPropane = cp === "propane-refill" || cp === "propane-exchange";

  let hours = "24/7";
  let open24h = true;
  if (isConvenience) { hours = "6AM-11PM daily"; open24h = false; }
  if (cp === "package-store") { hours = "Mon-Sat 9AM-11PM"; open24h = false; }
  if (cp === "dry-ice") { hours = "Mon-Fri 8AM-5PM, Sat 8AM-12PM"; open24h = false; }
  if (isPropane) { hours = "Mon-Sat 8AM-6PM"; open24h = false; }
  if (cp === "water-refill") { hours = "24/7"; open24h = true; }
  // Chains that are 24/7 for ice
  if (isIce) { hours = "24/7"; open24h = true; }
  // Convenience stores that are 24/7
  if (["QuikTrip", "RaceTrac", "Circle K"].includes(sn)) { hours = "24/7"; open24h = true; }
  if (sn === "Buc-ee's") { hours = "24/7"; open24h = true; }

  return {
    id: String(id),
    name: entry.n,
    category_primary: cp,
    category_secondary: cs,
    address: entry.a,
    city: entry.c,
    state: "GA",
    zip: entry.z,
    lat: entry.la,
    lng: entry.ln,
    phone: "",
    website: WEBSITE_URLS[sn] || "",
    hours,
    open_24h: open24h,
    payment_types: ["card", "cash"],
    has_water_refill: cs.includes("water-refill") || cp === "water-refill",
    has_dry_ice: cp === "dry-ice",
    has_propane_refill: cp === "propane-refill" || cs.includes("propane-refill"),
    has_propane_exchange: cp === "propane-exchange" || cs.includes("propane-exchange"),
    alcohol_license_nearby: cs.includes("beer-drinks") || cp === "beer-drinks" || cp === "package-store",
    convenience_store_nearby: cp === "convenience-store" || cs.includes("convenience-store"),
    source_name: sn,
    source_url: SOURCE_URLS[sn] || "",
    source_priority: 1,
    last_verified_at: "2025-12-01",
    status: "active",
    photos: [],
    rating: Number((3.5 + Math.random() * 1.5).toFixed(1)),
    density_score: Math.floor(Math.random() * 5) + 1,
  };
}

function listingToJson(l) {
  return JSON.stringify(l);
}

// Read the seed file
const seedContent = readFileSync(seedPath, 'utf8');

// Find the last ID in seed data
const idMatches = [...seedContent.matchAll(/"id":"(\d+)"/g)];
const lastId = Math.max(...idMatches.map(m => parseInt(m[1])));
console.log(`Last existing ID: ${lastId}`);

// Parse the compact files by extracting the array content
function parseCompactFile(filePath) {
  const content = readFileSync(filePath, 'utf8');
  // Extract array entries using regex
  const entries = [];
  const regex = /\{n:"([^"]*)",a:"([^"]*)",c:"([^"]*)",z:"([^"]*)",la:([\d.-]+),ln:([\d.-]+),cp:"([^"]*)",cs:\[([^\]]*)\],sn:"([^"]*)"\}/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const cs = match[8] ? match[8].split(',').map(s => s.trim().replace(/"/g, '')).filter(Boolean) : [];
    entries.push({
      n: match[1],
      a: match[2],
      c: match[3],
      z: match[4],
      la: parseFloat(match[5]),
      ln: parseFloat(match[6]),
      cp: match[7],
      cs,
      sn: match[9],
    });
  }
  return entries;
}

const metroFile = resolve(__dirname, '../src/lib/new-locations-metro-atlanta.ts');
const ruralFile = resolve(__dirname, '../src/lib/new-locations-rural-georgia.ts');

const metroEntries = parseCompactFile(metroFile);
const ruralEntries = parseCompactFile(ruralFile);

console.log(`Metro entries: ${metroEntries.length}`);
console.log(`Rural entries: ${ruralEntries.length}`);

// Convert all to full format
let nextId = lastId + 1;
const allNew = [...metroEntries, ...ruralEntries].map(entry => {
  const full = compactToFull(entry, nextId++);
  return full;
});

console.log(`Total new listings: ${allNew.length}`);
console.log(`Next available ID: ${nextId}`);

// Generate the JSON lines to append
const jsonLines = allNew.map(l => '  ' + listingToJson(l) + ',').join('\n');

// Find the closing bracket of SEED_LISTINGS array
// The array ends with "];" on its own line (after the last entry)
const arrayEndIndex = seedContent.lastIndexOf('];');
if (arrayEndIndex === -1) {
  console.error('Could not find end of SEED_LISTINGS array');
  process.exit(1);
}

// Insert new entries before the closing ];
const newContent = seedContent.slice(0, arrayEndIndex) + jsonLines + '\n' + seedContent.slice(arrayEndIndex);

writeFileSync(seedPath, newContent, 'utf8');
console.log('Successfully merged entries into seed-data.ts');
console.log(`New total: ${lastId + allNew.length} listings`);

// Output the next available ID for the small-town script
writeFileSync(resolve(__dirname, 'next-id.txt'), String(nextId), 'utf8');
