#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const seedPath = resolve(__dirname, '../src/lib/seed-data.ts');
const content = readFileSync(seedPath, 'utf8');

// Find GA_CITIES boundaries
const startMarker = 'export const GA_CITIES: CityInfo[] = [';
const startIdx = content.indexOf(startMarker);
if (startIdx === -1) { console.error('Cannot find GA_CITIES'); process.exit(1); }

const arrStart = startIdx + startMarker.length - 1; // the [
// Find matching ]
let depth = 0;
let endIdx = -1;
for (let i = arrStart; i < content.length; i++) {
  if (content[i] === '[') depth++;
  if (content[i] === ']') { depth--; if (depth === 0) { endIdx = i + 1; break; } }
}

const arrayStr = content.slice(arrStart, endIdx);
console.log('Array length:', arrayStr.length, 'chars');

// Parse entries - match both formats
const cities = new Map();

// Format 1: {"name":"X","slug":"X",...}
const re1 = /\{"name":"([^"]+)","slug":"([^"]+)","lat":([\d.e-]+),"lng":([\d.e-]+),"county":"([^"]*)"\}/g;
let m;
while ((m = re1.exec(arrayStr)) !== null) {
  const slug = m[2];
  if (!cities.has(slug)) {
    cities.set(slug, { name: m[1], slug, lat: parseFloat(m[3]), lng: parseFloat(m[4]), county: m[5] || "" });
  }
}

// Format 2: {name:"X",slug:"X",...}
const re2 = /\{name:"([^"]+)",slug:"([^"]+)",lat:([\d.e-]+),lng:([\d.e-]+),county:"([^"]*)"\}/g;
while ((m = re2.exec(arrayStr)) !== null) {
  const slug = m[2];
  if (!cities.has(slug)) {
    cities.set(slug, { name: m[1], slug, lat: parseFloat(m[3]), lng: parseFloat(m[4]), county: m[5] || "" });
  }
}

const sorted = [...cities.values()].sort((a, b) => a.name.localeCompare(b.name));
console.log(`Unique cities: ${sorted.length}`);

// Rebuild
const newArr = '[\n' + sorted.map(c =>
  `  {"name":"${c.name}","slug":"${c.slug}","lat":${c.lat},"lng":${c.lng},"county":"${c.county}"}`
).join(',\n') + '\n]';

const before = content.slice(0, arrStart);
const after = content.slice(endIdx);
const newContent = before + newArr + after;
writeFileSync(seedPath, newContent, 'utf8');
console.log('Done - GA_CITIES cleaned up');
