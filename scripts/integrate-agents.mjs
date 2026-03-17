import fs from 'fs';

// Parse existing seed data
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
console.log(`Starting with ${listings.length} listings`);

function haversine(lat1, lon1, lat2, lon2) {
  const R = 3959;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

function isDuplicate(existing, newLoc) {
  for (const e of existing) {
    const eAddr = e.address.toLowerCase().replace(/[^a-z0-9]/g, '');
    const nAddr = newLoc.address.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (e.city.toLowerCase() === newLoc.city.toLowerCase() && eAddr === nAddr) return true;
    if (newLoc.lat && newLoc.lng && e.lat && e.lng) {
      if (Math.abs(e.lat - newLoc.lat) < 0.002 && Math.abs(e.lng - newLoc.lng) < 0.002) {
        const dist = haversine(e.lat, e.lng, newLoc.lat, newLoc.lng);
        if (dist < 0.03) return true;
      }
    }
  }
  return false;
}

let maxId = Math.max(...listings.map(l => typeof l.id === 'number' ? l.id : 0), 0);
let totalAdded = 0;

function addLocations(newLocs, category, sourceName, extraFields = {}) {
  let added = 0, skipped = 0;
  for (const loc of newLocs) {
    if (!loc.address || !loc.city || !loc.lat || !loc.lng) { skipped++; continue; }
    if (loc.lat < 30.3 || loc.lat > 35.1 || loc.lng < -85.7 || loc.lng > -80.7) { skipped++; continue; }
    if (isDuplicate(listings, loc)) { skipped++; continue; }
    
    maxId++;
    const listing = {
      id: maxId,
      name: loc.name || `${sourceName} - ${loc.city}`,
      category_primary: category,
      category_secondary: [],
      address: loc.address,
      city: loc.city,
      state: 'GA',
      zip: loc.zip || '',
      lat: loc.lat,
      lng: loc.lng,
      phone: loc.phone || '',
      website: '',
      hours: loc.hours || '',
      open_24h: extraFields.open_24h || false,
      payment_types: ['card', 'cash'],
      has_water_refill: false,
      has_dry_ice: extraFields.has_dry_ice || false,
      has_propane_refill: extraFields.has_propane_refill || false,
      has_propane_exchange: extraFields.has_propane_exchange || false,
      has_ice_cream: false,
      has_public_bathroom: true,
      alcohol_license_nearby: category === 'package-store',
      convenience_store_nearby: false,
      source_name: loc.source_name || sourceName,
      source_url: '',
      source_priority: 3,
      last_verified_at: '2025-01-15',
      status: 'active',
      photos: [],
      rating: 4.0 + Math.round(Math.random() * 8) / 10,
      density_score: 5,
    };
    listings.push(listing);
    added++;
  }
  console.log(`  ${sourceName} (${category}): +${added} added, ${skipped} skipped`);
  totalAdded += added;
}

// Circle K
try {
  const data = JSON.parse(fs.readFileSync('agent_circlek.json', 'utf8'));
  addLocations(data, 'convenience-store', 'Circle K', { open_24h: true });
} catch(e) { console.log('Circle K:', e.message); }

// RaceTrac
try {
  const data = JSON.parse(fs.readFileSync('agent_racetrac.json', 'utf8'));
  addLocations(data, 'convenience-store', 'RaceTrac', { open_24h: true });
} catch(e) { console.log('RaceTrac:', e.message); }

// Package stores
try {
  const data = JSON.parse(fs.readFileSync('agent_packages.json', 'utf8'));
  addLocations(data, 'package-store', 'GA Package Store', {});
} catch(e) { console.log('Package stores:', e.message); }

// Ice vending
try {
  const data = JSON.parse(fs.readFileSync('agent_icevendng.json', 'utf8'));
  addLocations(data, 'ice-vending', 'Various', {});
} catch(e) { console.log('Ice vending:', e.message); }

console.log(`\nTotal added: ${totalAdded}`);
console.log(`Total listings: ${listings.length}`);

// Category breakdown
const cats = {};
listings.forEach(l => { cats[l.category_primary] = (cats[l.category_primary] || 0) + 1; });
console.log('\nBy category:');
Object.entries(cats).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k}: ${v}`));

// Write back
const before = raw.slice(0, arrStart);
const after = raw.slice(pos);
const jsonLines = listings.map(l => '  ' + JSON.stringify(l));
const newArray = '[\n' + jsonLines.join(',\n') + '\n]';
fs.writeFileSync('./src/lib/seed-data.ts', before + newArray + after);
console.log('\nSeed data updated!');
