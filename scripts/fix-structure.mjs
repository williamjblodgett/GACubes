#!/usr/bin/env node
/**
 * Fix the seed-data.ts structure:
 * - SEED_LISTINGS array should contain all listings (IDs 1-890)
 * - GA_CITIES array should contain only city entries
 * - GA_CATEGORIES array should contain only category entries
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const seedPath = resolve(__dirname, '../src/lib/seed-data.ts');
const content = readFileSync(seedPath, 'utf8');

// Extract all listing entries (objects with "id" field)
const listings = [];
const listingRegex = /\{"id":"(\d+)"[^}]+\}/g;
let match;
while ((match = listingRegex.exec(content)) !== null) {
  listings.push({ id: parseInt(match[1]), json: match[0] });
}
// Deduplicate by ID
const seenIds = new Set();
const uniqueListings = [];
for (const l of listings) {
  if (!seenIds.has(l.id)) {
    seenIds.add(l.id);
    uniqueListings.push(l);
  }
}
uniqueListings.sort((a, b) => a.id - b.id);
console.log(`Total unique listings: ${uniqueListings.length}`);
console.log(`ID range: ${uniqueListings[0].id} - ${uniqueListings[uniqueListings.length - 1].id}`);

// Extract GA_CITIES entries
const cities = [];
const cityRegex = /\{"name":"([^"]+)","slug":"([^"]+)","lat":([\d.e-]+),"lng":([\d.e-]+),"county":"([^"]*)"\}/g;
while ((match = cityRegex.exec(content)) !== null) {
  cities.push(match[0]);
}
// Deduplicate by slug
const seenSlugs = new Set();
const uniqueCities = [];
for (const c of cities) {
  const slugMatch = c.match(/"slug":"([^"]+)"/);
  if (slugMatch && !seenSlugs.has(slugMatch[1])) {
    seenSlugs.add(slugMatch[1]);
    uniqueCities.push(c);
  }
}
uniqueCities.sort();
console.log(`Total unique cities: ${uniqueCities.length}`);

// Extract the file header (imports and type declaration)
const headerEnd = content.indexOf('export const SEED_LISTINGS');
const header = content.slice(0, headerEnd);

// Extract GA_CATEGORIES (find it in the original content)
const catStart = content.indexOf('export const GA_CATEGORIES');
let catEnd = content.indexOf('];', catStart);
// Find the actual GA_CATEGORIES entries (objects with slug/label/category)
const catEntries = [];
const catRegex = /\{ slug: "([^"]+)", label: "([^"]+)", category: "([^"]+)" as const \}/g;
while ((match = catRegex.exec(content)) !== null) {
  catEntries.push(match[0]);
}
console.log(`GA_CATEGORIES entries: ${catEntries.length}`);

// Rebuild the file
const newContent = `${header}export const SEED_LISTINGS: Listing[] = [
${uniqueListings.map(l => '  ' + l.json + ',').join('\n')}
];

export const GA_CITIES: CityInfo[] = [
${uniqueCities.map(c => '  ' + c + ',').join('\n')}
];

export const GA_CATEGORIES = [
${catEntries.map(c => '  ' + c + ',').join('\n')}
];
`;

writeFileSync(seedPath, newContent, 'utf8');
console.log('File structure fixed successfully');
console.log(`File size: ${(newContent.length / 1024).toFixed(0)} KB`);
