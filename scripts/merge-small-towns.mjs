#!/usr/bin/env node
/**
 * Merges small-town locations into seed-data.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const seedPath = resolve(__dirname, '../src/lib/seed-data.ts');

const WEBSITE_URLS = {
  "Piggly Wiggly": "",
  "IGA": "",
  "Harvey's": "",
  "GA Alcohol License": "",
  "Independent": "",
};

const SOURCE_URLS = {
  "Piggly Wiggly": "",
  "IGA": "",
  "Harvey's": "",
  "GA Alcohol License": "",
  "Independent": "",
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
  if (isConvenience) { hours = "6AM-10PM daily"; open24h = false; }
  if (cp === "package-store") { hours = "Mon-Sat 9AM-10PM"; open24h = false; }
  if (cp === "dry-ice") { hours = "7AM-9PM daily"; open24h = false; }
  if (isPropane) { hours = "Mon-Sat 7AM-6PM"; open24h = false; }
  if (cp === "water-refill") { hours = "24/7"; open24h = true; }
  if (isIce) { hours = "24/7"; open24h = true; }

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
    has_dry_ice: cp === "dry-ice" || cs.includes("dry-ice"),
    has_propane_refill: cp === "propane-refill" || cs.includes("propane-refill"),
    has_propane_exchange: cp === "propane-exchange" || cs.includes("propane-exchange"),
    alcohol_license_nearby: cs.includes("beer-drinks") || cp === "beer-drinks" || cp === "package-store",
    convenience_store_nearby: cp === "convenience-store" || cs.includes("convenience-store"),
    source_name: sn,
    source_url: SOURCE_URLS[sn] || "",
    source_priority: sn === "Independent" ? 2 : 1,
    last_verified_at: "2025-12-01",
    status: "active",
    photos: [],
    rating: Number((3.2 + Math.random() * 1.8).toFixed(1)),
    density_score: Math.floor(Math.random() * 4) + 1,
  };
}

// Read the seed file
const seedContent = readFileSync(seedPath, 'utf8');

// Find the last ID
const idMatches = [...seedContent.matchAll(/"id":"(\d+)"/g)];
const lastId = Math.max(...idMatches.map(m => parseInt(m[1])));
console.log(`Last existing ID: ${lastId}`);

// Parse the small-town file
function parseCompactFile(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const entries = [];
  const regex = /\{n:"([^"]*)",a:"([^"]*)",c:"([^"]*)",z:"([^"]*)",la:([\d.-]+),ln:([\d.-]+),cp:"([^"]*)",cs:\[([^\]]*)\],sn:"([^"]*)"\}/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const cs = match[8] ? match[8].split(',').map(s => s.trim().replace(/"/g, '')).filter(Boolean) : [];
    entries.push({
      n: match[1], a: match[2], c: match[3], z: match[4],
      la: parseFloat(match[5]), ln: parseFloat(match[6]),
      cp: match[7], cs, sn: match[9],
    });
  }
  return entries;
}

const smallTownFile = resolve(__dirname, '../src/lib/new-locations-small-towns.ts');
const entries = parseCompactFile(smallTownFile);
console.log(`Small-town entries: ${entries.length}`);

// Convert all
let nextId = lastId + 1;
const allNew = entries.map(entry => compactToFull(entry, nextId++));

// Generate JSON lines
const jsonLines = allNew.map(l => '  ' + JSON.stringify(l) + ',').join('\n');

// Find end of SEED_LISTINGS array
const arrayEndIndex = seedContent.lastIndexOf('];');
if (arrayEndIndex === -1) {
  console.error('Could not find end of SEED_LISTINGS array');
  process.exit(1);
}

const newContent = seedContent.slice(0, arrayEndIndex) + jsonLines + '\n' + seedContent.slice(arrayEndIndex);
writeFileSync(seedPath, newContent, 'utf8');

console.log(`Successfully merged ${allNew.length} small-town entries`);
console.log(`New total: ${nextId - 1} listings`);
console.log(`Next available ID: ${nextId}`);
