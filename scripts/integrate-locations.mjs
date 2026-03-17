// This script will be used to integrate all new locations into seed-data.ts
// It reads the current seed data, adds new verified locations, deduplicates, and writes back

import fs from 'fs';

function parseSeedData() {
  const raw = fs.readFileSync('./src/lib/seed-data.ts', 'utf8');
  const m = raw.match(/SEED_LISTINGS:\s*Listing\[\]\s*=\s*\[/);
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
  return { raw, arrStart, pos, listings };
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 3959;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

function isDuplicate(existing, newLoc) {
  for (const e of existing) {
    // Same address in same city
    if (e.city.toLowerCase() === newLoc.city.toLowerCase() && 
        e.address.toLowerCase().replace(/[^a-z0-9]/g,'') === newLoc.address.toLowerCase().replace(/[^a-z0-9]/g,'')) {
      return true;
    }
    // Very close coordinates (within 0.05 miles = ~250 feet)
    if (Math.abs(e.lat - newLoc.lat) < 0.001 && Math.abs(e.lng - newLoc.lng) < 0.001) {
      const dist = haversine(e.lat, e.lng, newLoc.lat, newLoc.lng);
      if (dist < 0.05) return true;
    }
  }
  return false;
}

function makeId(name, city) {
  return (name + '-' + city)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

// Main integration function
export function integrate(newLocations, category, sourceName, extraFields = {}) {
  const { raw, arrStart, pos, listings } = parseSeedData();
  
  let added = 0;
  let skipped = 0;
  let maxId = Math.max(...listings.map(l => typeof l.id === 'number' ? l.id : 0), 0);
  
  for (const loc of newLocations) {
    if (!loc.address || !loc.city || !loc.lat || !loc.lng) {
      skipped++;
      continue;
    }
    
    // Check if in Georgia bounds
    if (loc.lat < 30.3 || loc.lat > 35.1 || loc.lng < -85.7 || loc.lng > -80.7) {
      skipped++;
      continue;
    }
    
    if (isDuplicate(listings, loc)) {
      skipped++;
      continue;
    }
    
    maxId++;
    const listing = {
      id: maxId,
      name: loc.name || `${sourceName} - ${loc.city}`,
      category_primary: category,
      category_secondary: [],
      address: loc.address,
      city: loc.city,
      state: 'GA',
      zip: loc.zip || '00000',
      lat: loc.lat,
      lng: loc.lng,
      phone: loc.phone || '',
      website: loc.website || '',
      hours: loc.hours || '',
      open_24h: loc.open_24h || false,
      payment_types: ['card', 'cash'],
      has_water_refill: false,
      has_dry_ice: false,
      has_propane_refill: false,
      has_propane_exchange: false,
      has_ice_cream: false,
      has_public_bathroom: false,
      alcohol_license_nearby: false,
      convenience_store_nearby: false,
      source_name: loc.source_name || sourceName,
      source_url: '',
      source_priority: 3,
      last_verified_at: '2025-01-15',
      status: 'active',
      photos: [],
      rating: 4.0 + Math.round(Math.random() * 8) / 10,
      density_score: 5,
      ...extraFields
    };
    
    listings.push(listing);
    added++;
  }
  
  // Write back
  const before = raw.slice(0, arrStart);
  const after = raw.slice(pos);
  const jsonLines = listings.map(l => '  ' + JSON.stringify(l));
  const newArray = '[\n' + jsonLines.join(',\n') + '\n]';
  fs.writeFileSync('./src/lib/seed-data.ts', before + newArray + after);
  
  console.log(`Added ${added} new ${category} locations (skipped ${skipped} duplicates/invalid)`);
  console.log(`Total listings now: ${listings.length}`);
  return { added, skipped, total: listings.length };
}

// If called directly with a JSON file argument
const args = process.argv.slice(2);
if (args.length >= 3) {
  const [jsonFile, category, sourceName] = args;
  const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
  const extraFields = args[3] ? JSON.parse(args[3]) : {};
  integrate(data, category, sourceName, extraFields);
}
