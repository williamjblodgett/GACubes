#!/usr/bin/env node
/**
 * Deduplicates GA_CITIES array and standardizes format
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const seedPath = resolve(__dirname, '../src/lib/seed-data.ts');
const content = readFileSync(seedPath, 'utf8');

// Find GA_CITIES array boundaries
const startMarker = 'export const GA_CITIES: CityInfo[] = [';
const startIdx = content.indexOf(startMarker);
if (startIdx === -1) { console.error('Cannot find GA_CITIES'); process.exit(1); }

// Find the matching ];
let depth = 0;
let endIdx = -1;
for (let i = content.indexOf('[', startIdx); i < content.length; i++) {
  if (content[i] === '[') depth++;
  if (content[i] === ']') {
    depth--;
    if (depth === 0) { endIdx = i + 1; break; }
  }
}

const arrayContent = content.slice(content.indexOf('[', startIdx), endIdx);

// Extract all city entries (both formats)
const cities = new Map();

// Double-quoted format: {"name":"Acworth","slug":"acworth-ga",...}
const dqRegex = /\{"name":"([^"]+)","slug":"([^"]+)","lat":([\d.-]+),"lng":([\d.-]+),"county":"([^"]*)"\}/g;
let match;
while ((match = dqRegex.exec(arrayContent)) !== null) {
  if (!cities.has(match[2])) {
    cities.set(match[2], { name: match[1], slug: match[2], lat: parseFloat(match[3]), lng: parseFloat(match[4]), county: match[5] });
  }
}

// Unquoted format: {name:"Dahlonega",slug:"dahlonega-ga",...}
const uqRegex = /\{name:"([^"]+)",slug:"([^"]+)",lat:([\d.-]+),lng:([\d.-]+),county:"([^"]*)"\}/g;
while ((match = uqRegex.exec(arrayContent)) !== null) {
  if (!cities.has(match[2])) {
    cities.set(match[2], { name: match[1], slug: match[2], lat: parseFloat(match[3]), lng: parseFloat(match[4]), county: match[5] });
  }
}

// Sort by name
const sorted = [...cities.values()].sort((a, b) => a.name.localeCompare(b.name));

console.log(`Total unique cities: ${sorted.length}`);

// Rebuild the array in consistent format
const newArray = '[\n' + sorted.map(c =>
  `  {"name":"${c.name}","slug":"${c.slug}","lat":${c.lat},"lng":${c.lng},"county":"${c.county}"}`
).join(',\n') + '\n]';

const newContent = content.slice(0, content.indexOf('[', startIdx)) + newArray + content.slice(endIdx);
writeFileSync(seedPath, newContent, 'utf8');
console.log('GA_CITIES deduplicated and sorted');
