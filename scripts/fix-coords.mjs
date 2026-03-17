import fs from 'fs';
import { parse } from 'path';

// Haversine distance
function haversine(lat1, lon1, lat2, lon2) {
  const R = 3959;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

// Normalize address for matching
function normalizeAddr(addr) {
  return addr.toLowerCase()
    .replace(/\bave\b/g, 'avenue')
    .replace(/\bblvd\b/g, 'boulevard')
    .replace(/\bdr\b/g, 'drive')
    .replace(/\bst\b/g, 'street')
    .replace(/\brd\b/g, 'road')
    .replace(/\bpkwy?\b/g, 'parkway')
    .replace(/\bhwy\b/g, 'highway')
    .replace(/\bln\b/g, 'lane')
    .replace(/\bct\b/g, 'court')
    .replace(/\bpl\b/g, 'place')
    .replace(/\bcir\b/g, 'circle')
    .replace(/\bne\b|\bnw\b|\bse\b|\bsw\b/g, '')
    .replace(/[^a-z0-9]/g, '');
}

// Parse CSV
function parseCSV(text) {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  return lines.slice(1).map(line => {
    // Handle quoted fields
    const fields = [];
    let current = '';
    let inQuote = false;
    for (const ch of line) {
      if (ch === '"') { inQuote = !inQuote; continue; }
      if (ch === ',' && !inQuote) { fields.push(current.trim()); current = ''; continue; }
      current += ch;
    }
    fields.push(current.trim());
    const obj = {};
    headers.forEach((h, i) => obj[h] = fields[i] || '');
    return obj;
  });
}

// Load seed data
const raw = fs.readFileSync('./src/lib/seed-data.ts', 'utf8');
const m = raw.match(/SEED_LISTINGS[^=]*=\s*\[/);
const arrStart = m.index + m[0].length - 1;
let depth = 1, pos = arrStart + 1, inStr = false, esc = false;
while (depth > 0 && pos < raw.length) {
  const ch = raw[pos];
  if (esc) { esc = false; pos++; continue; }
  if (ch === '\\' && inStr) { esc = true; pos++; continue; }
  if (ch === '"') { inStr = !inStr; pos++; continue; }
  if (!inStr) { if (ch === '[') depth++; else if (ch === ']') depth--; }
  pos++;
}
const listings = JSON.parse(raw.slice(arrStart, pos));
console.log(`Loaded ${listings.length} seed listings`);

// Load verified datasets
const krogerData = parseCSV(fs.readFileSync('/tmp/kroger_real.csv', 'utf8'))
  .filter(r => r.state === 'GA');
const homedepotData = parseCSV(fs.readFileSync('/tmp/homedepot_real.csv', 'utf8'))
  .filter(r => r.state === 'GA');
const publixData = parseCSV(fs.readFileSync('/tmp/publix_real.csv', 'utf8'))
  .filter(r => r.state === 'GA');

console.log(`Verified data: Kroger=${krogerData.length}, HomeDepot=${homedepotData.length}, Publix=${publixData.length}`);

// Build lookup maps by normalized address+city
function buildLookup(data, addrField, cityField, latField, lngField) {
  const map = new Map();
  for (const row of data) {
    const addr = row[addrField];
    const city = row[cityField];
    const lat = parseFloat(row[latField]);
    const lng = parseFloat(row[lngField]);
    if (!addr || !city || isNaN(lat) || isNaN(lng)) continue;
    const key = normalizeAddr(addr) + '|' + city.toLowerCase().trim();
    map.set(key, { lat, lng, addr, city });
    // Also try without direction suffixes
    const key2 = normalizeAddr(addr.replace(/\s+(NE|NW|SE|SW|N|S|E|W)$/i, '')) + '|' + city.toLowerCase().trim();
    if (!map.has(key2)) map.set(key2, { lat, lng, addr, city });
  }
  return map;
}

const krogerLookup = buildLookup(krogerData, 'address', 'city', 'latitude', 'longitude');
const homedepotLookup = buildLookup(homedepotData, 'street', 'city', 'latitude', 'longitude');
const publixLookup = buildLookup(publixData, 'street', 'city', 'latitude', 'longitude');

// Also build ZIP-based lookups for fallback matching
function buildZipLookup(data, addrField, cityField, zipField, latField, lngField) {
  const map = new Map();
  for (const row of data) {
    const zip = row[zipField]?.slice(0, 5);
    const lat = parseFloat(row[latField]);
    const lng = parseFloat(row[lngField]);
    if (!zip || isNaN(lat) || isNaN(lng)) continue;
    if (!map.has(zip)) map.set(zip, []);
    map.set(zip, [...map.get(zip), { lat, lng, addr: row[addrField], city: row[cityField] }]);
  }
  return map;
}

const krogerByZip = buildZipLookup(krogerData, 'address', 'city', 'zip', 'latitude', 'longitude');
const homedepotByZip = buildZipLookup(homedepotData, 'street', 'city', 'zip', 'latitude', 'longitude');
const publixByZip = buildZipLookup(publixData, 'street', 'city', 'zip', 'latitude', 'longitude');

// Match and compare
const corrections = [];
let matchedCount = 0;
let accurateCount = 0;

for (const listing of listings) {
  const key = normalizeAddr(listing.address) + '|' + listing.city.toLowerCase().trim();
  const key2 = normalizeAddr(listing.address.replace(/\s+(NE|NW|SE|SW|N|S|E|W)$/i, '')) + '|' + listing.city.toLowerCase().trim();

  let match = null;
  let matchSource = '';

  // Try direct address match
  if (listing.name.includes('Kroger') || listing.source_name === 'Kroger') {
    match = krogerLookup.get(key) || krogerLookup.get(key2);
    matchSource = 'Kroger dataset';
  }
  if (!match && (listing.name.includes('Home Depot') || listing.source_name === 'Home Depot')) {
    match = homedepotLookup.get(key) || homedepotLookup.get(key2);
    matchSource = 'Home Depot dataset';
  }
  if (!match && (listing.name.includes('Publix') || listing.source_name === 'Publix')) {
    match = publixLookup.get(key) || publixLookup.get(key2);
    matchSource = 'Publix dataset';
  }

  // Fallback: try ZIP + closest address in same ZIP
  if (!match) {
    let zipLookup = null;
    if (listing.name.includes('Kroger') || listing.source_name === 'Kroger') {
      zipLookup = krogerByZip; matchSource = 'Kroger dataset (zip)';
    } else if (listing.name.includes('Home Depot') || listing.source_name === 'Home Depot') {
      zipLookup = homedepotByZip; matchSource = 'Home Depot dataset (zip)';
    } else if (listing.name.includes('Publix') || listing.source_name === 'Publix') {
      zipLookup = publixByZip; matchSource = 'Publix dataset (zip)';
    }

    if (zipLookup) {
      const zipEntries = zipLookup.get(listing.zip?.slice(0, 5));
      if (zipEntries) {
        if (zipEntries.length === 1) {
          match = zipEntries[0];
        } else if (zipEntries.length > 1) {
          // Find closest match by stored coords (imperfect but helpful)
          let closest = null;
          let closestDist = Infinity;
          for (const entry of zipEntries) {
            const dist = haversine(listing.lat, listing.lng, entry.lat, entry.lng);
            if (dist < closestDist) { closestDist = dist; closest = entry; }
          }
          if (closest && closestDist < 10) { // Within 10 miles
            match = closest;
          }
        }
      }
    }
  }

  if (match) {
    matchedCount++;
    const dist = haversine(listing.lat, listing.lng, match.lat, match.lng);
    if (dist > 0.3) { // More than 0.3 miles off
      corrections.push({
        id: listing.id,
        name: listing.name,
        address: listing.address,
        city: listing.city,
        zip: listing.zip,
        source: listing.source_name,
        oldLat: listing.lat,
        oldLng: listing.lng,
        newLat: match.lat,
        newLng: match.lng,
        errorMiles: Math.round(dist * 100) / 100,
        matchSource
      });
    } else {
      accurateCount++;
    }
  }
}

console.log(`\nMatched: ${matchedCount}`);
console.log(`Accurate (<0.3 mi): ${accurateCount}`);
console.log(`Need correction: ${corrections.length}`);

// Sort by error distance
corrections.sort((a, b) => b.errorMiles - a.errorMiles);

console.log('\n=== CORRECTIONS NEEDED ===\n');
console.log(`${'Miles'.padStart(6)} | ${'ID'.padStart(5)} | ${'Name'.padEnd(30)} | ${'Address'.padEnd(35)} | ${'City'.padEnd(15)} | Old Lat,Lng -> New Lat,Lng`);
console.log('-'.repeat(160));
for (const c of corrections) {
  console.log(`${c.errorMiles.toFixed(1).padStart(6)} | ${String(c.id).padStart(5)} | ${c.name.slice(0,30).padEnd(30)} | ${c.address.slice(0,35).padEnd(35)} | ${c.city.padEnd(15)} | ${c.oldLat},${c.oldLng} -> ${c.newLat},${c.newLng}`);
}

// Save corrections
fs.writeFileSync('./scripts/coord-corrections.json', JSON.stringify(corrections, null, 2));
console.log(`\nSaved ${corrections.length} corrections to scripts/coord-corrections.json`);

// Now apply corrections to seed-data.ts
let seedContent = fs.readFileSync('./src/lib/seed-data.ts', 'utf8');
let fixCount = 0;

for (const c of corrections) {
  // Find and replace the specific lat/lng for this listing ID
  // Match pattern: "id":XXXX or "id":"XXXX" followed by lat and lng values
  const idStr = typeof c.id === 'number' ? `"id":${c.id}` : `"id":"${c.id}"`;
  const idx = seedContent.indexOf(idStr);
  if (idx === -1) continue;

  // Find the lat and lng values for this entry
  const entryEnd = seedContent.indexOf('}', idx);
  const entryText = seedContent.slice(idx, entryEnd);

  const latPattern = `"lat":${c.oldLat}`;
  const lngPattern = `"lng":${c.oldLng}`;

  if (entryText.includes(latPattern) && entryText.includes(lngPattern)) {
    const newEntry = entryText
      .replace(latPattern, `"lat":${c.newLat}`)
      .replace(lngPattern, `"lng":${c.newLng}`);
    seedContent = seedContent.slice(0, idx) + newEntry + seedContent.slice(idx + entryText.length);
    fixCount++;
  }
}

fs.writeFileSync('./src/lib/seed-data.ts', seedContent);
console.log(`\nApplied ${fixCount} fixes to src/lib/seed-data.ts`);

// Also fix source JSON files
const sourceFiles = [
  { file: 'kroger_locations.json', latField: 'lat', lngField: 'lng' },
  { file: 'publix_locations.json', latField: 'lat', lngField: 'lng' },
  { file: 'georgia_propane_locations.json', latField: 'lat', lngField: 'lng' },
  { file: 'wave2_stores.json', latField: 'lat', lngField: 'lng' },
];

for (const sf of sourceFiles) {
  try {
    let content = fs.readFileSync(sf.file, 'utf8');
    let sourceFixCount = 0;
    for (const c of corrections) {
      const oldLatStr = `"${sf.latField}":${c.oldLat}`;
      const oldLat2 = `"${sf.latField}": ${c.oldLat}`;
      const oldLngStr = `"${sf.lngField}":${c.oldLng}`;
      const oldLng2 = `"${sf.lngField}": ${c.oldLng}`;

      // Check if this file contains this entry
      if (content.includes(c.address) && (content.includes(String(c.oldLat)) || content.includes(String(c.oldLng)))) {
        if (content.includes(oldLatStr)) {
          content = content.replace(oldLatStr, `"${sf.latField}":${c.newLat}`);
          sourceFixCount++;
        } else if (content.includes(oldLat2)) {
          content = content.replace(oldLat2, `"${sf.latField}": ${c.newLat}`);
          sourceFixCount++;
        }
        if (content.includes(oldLngStr)) {
          content = content.replace(oldLngStr, `"${sf.lngField}":${c.newLng}`);
        } else if (content.includes(oldLng2)) {
          content = content.replace(oldLng2, `"${sf.lngField}": ${c.newLng}`);
        }
      }
    }
    if (sourceFixCount > 0) {
      fs.writeFileSync(sf.file, content);
      console.log(`Fixed ${sourceFixCount} entries in ${sf.file}`);
    }
  } catch (e) {
    // File may not exist
  }
}
