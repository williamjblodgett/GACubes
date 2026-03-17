import fs from 'fs';
import https from 'https';
import http from 'http';

// Parse seed data
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
console.log(`Loaded ${listings.length} listings`);

// Haversine distance in miles
function haversine(lat1, lon1, lat2, lon2) {
  const R = 3959;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

// Build CSV for Census Geocoder batch API
// Format: Unique ID, Street address, City, State, ZIP
function buildCsv(listings) {
  return listings.map(l => {
    const addr = l.address.replace(/"/g, '""');
    return `${l.id},"${addr}","${l.city}","${l.state}","${l.zip}"`;
  }).join('\n');
}

// Submit batch to Census Geocoder
function submitBatch(csvData) {
  return new Promise((resolve, reject) => {
    const boundary = '----FormBoundary' + Math.random().toString(36).slice(2);
    let body = '';
    body += `--${boundary}\r\n`;
    body += `Content-Disposition: form-data; name="addressFile"; filename="addresses.csv"\r\n`;
    body += `Content-Type: text/csv\r\n\r\n`;
    body += csvData + '\r\n';
    body += `--${boundary}\r\n`;
    body += `Content-Disposition: form-data; name="benchmark"\r\n\r\n`;
    body += `Public_AR_Current\r\n`;
    body += `--${boundary}--\r\n`;

    const options = {
      hostname: 'geocoding.geo.census.gov',
      port: 443,
      path: '/geocoder/locations/addressbatch',
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(300000); // 5 min timeout
    req.write(body);
    req.end();
  });
}

// Parse Census Geocoder response
function parseResponse(responseText) {
  const results = {};
  const lines = responseText.trim().split('\n');
  for (const line of lines) {
    // CSV format: ID, Input Address, Match, MatchType, Matched Address, Coordinates, TIGER Line ID, Side
    // Coordinates are in "lng,lat" format
    const parts = line.split(/","/);
    if (parts.length < 2) continue;

    const id = parts[0].replace(/"/g, '').trim();
    const matchField = parts[2] ? parts[2].replace(/"/g, '').trim() : '';

    if (matchField === 'Match' || matchField === 'Non_Match' || matchField === 'Tie') {
      // Find coordinates - they're in format "-84.123,33.456"
      const coordMatch = line.match(/"(-?\d+\.\d+),(-?\d+\.\d+)"/);
      if (coordMatch) {
        results[id] = {
          matched: true,
          lng: parseFloat(coordMatch[1]),
          lat: parseFloat(coordMatch[2]),
          matchType: matchField
        };
      } else {
        results[id] = { matched: false };
      }
    } else {
      results[id] = { matched: false };
    }
  }
  return results;
}

// Process in batches of 1000 (Census API limit per batch)
const BATCH_SIZE = 1000;
const allResults = {};
const batches = [];
for (let i = 0; i < listings.length; i += BATCH_SIZE) {
  batches.push(listings.slice(i, i + BATCH_SIZE));
}

console.log(`Processing ${batches.length} batches of up to ${BATCH_SIZE}...`);

for (let i = 0; i < batches.length; i++) {
  const batch = batches[i];
  console.log(`\nBatch ${i+1}/${batches.length} (${batch.length} addresses)...`);

  const csv = buildCsv(batch);
  try {
    const response = await submitBatch(csv);
    const results = parseResponse(response);
    Object.assign(allResults, results);
    const matched = Object.values(results).filter(r => r.matched).length;
    console.log(`  Matched: ${matched}/${batch.length}`);
  } catch (err) {
    console.error(`  Batch ${i+1} failed: ${err.message}`);
  }

  // Small delay between batches
  if (i < batches.length - 1) {
    await new Promise(r => setTimeout(r, 2000));
  }
}

// Compare results
console.log('\n===== VERIFICATION RESULTS =====\n');

const errors = [];
let matched = 0;
let unmatched = 0;
let accurate = 0;

for (const listing of listings) {
  const id = String(listing.id);
  const result = allResults[id];

  if (!result || !result.matched) {
    unmatched++;
    continue;
  }

  matched++;
  const dist = haversine(listing.lat, listing.lng, result.lat, result.lng);

  if (dist > 0.5) { // Flag anything more than 0.5 miles off
    errors.push({
      id: listing.id,
      name: listing.name,
      address: listing.address,
      city: listing.city,
      zip: listing.zip,
      source: listing.source_name,
      storedLat: listing.lat,
      storedLng: listing.lng,
      actualLat: result.lat,
      actualLng: result.lng,
      errorMiles: Math.round(dist * 100) / 100
    });
  } else {
    accurate++;
  }
}

console.log(`Total listings: ${listings.length}`);
console.log(`Geocoder matched: ${matched}`);
console.log(`Geocoder unmatched: ${unmatched}`);
console.log(`Accurate (<0.5 mi): ${accurate}`);
console.log(`ERRORS (>0.5 mi): ${errors.length}`);

// Sort by error distance descending
errors.sort((a, b) => b.errorMiles - a.errorMiles);

console.log('\n--- ALL ERRORS (>0.5 miles off) ---\n');
console.log('Miles | ID | Name | Address | City | Stored Lat,Lng | Actual Lat,Lng');
console.log('-'.repeat(120));
for (const e of errors) {
  console.log(`${e.errorMiles.toFixed(1).padStart(5)} | ${String(e.id).padStart(5)} | ${e.name.slice(0,25).padEnd(25)} | ${e.address.slice(0,30).padEnd(30)} | ${e.city.padEnd(15)} | ${e.storedLat},${e.storedLng} | ${e.actualLat},${e.actualLng}`);
}

// Save full results to JSON for later use
fs.writeFileSync('./scripts/coord-errors.json', JSON.stringify(errors, null, 2));
console.log(`\nFull error details saved to scripts/coord-errors.json`);
