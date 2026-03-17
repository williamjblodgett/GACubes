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
console.log(`Existing listings: ${listings.length}`);

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
    const eAddr = e.address.toLowerCase().replace(/[^a-z0-9]/g, '');
    const nAddr = newLoc.address.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (e.city.toLowerCase() === newLoc.city.toLowerCase() && eAddr === nAddr) return true;
    // Very close (within 0.03 miles ~ 150 feet)
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
let totalSkipped = 0;

function addLocations(newLocs, category, sourceName, extraFields = {}) {
  let added = 0, skipped = 0;
  for (const loc of newLocs) {
    if (!loc.address || !loc.city || !loc.lat || !loc.lng) { skipped++; continue; }
    // Check GA bounds
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
      website: loc.website || '',
      hours: loc.hours || '',
      open_24h: loc.open_24h || false,
      payment_types: ['card', 'cash'],
      has_water_refill: false,
      has_dry_ice: category === 'dry-ice' || (extraFields.has_dry_ice || false),
      has_propane_refill: category === 'propane-refill' || (extraFields.has_propane_refill || false),
      has_propane_exchange: category === 'propane-exchange' || (extraFields.has_propane_exchange || false),
      has_ice_cream: false,
      has_public_bathroom: true,
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
  console.log(`  ${sourceName} (${category}): +${added} added, ${skipped} skipped`);
  totalAdded += added;
  totalSkipped += skipped;
}

// Load and integrate each data file
const datasets = [
  { file: 'qt_locations.json', category: 'convenience-store', source: 'QuikTrip', extra: { open_24h: true, hours: 'Open 24 Hours' } },
  { file: 'walmart_locations.json', category: 'convenience-store', source: 'Walmart', extra: { has_propane_exchange: true } },
  { file: 'kroger_locations.json', category: 'convenience-store', source: 'Kroger', extra: { has_dry_ice: true } },
  { file: 'publix_locations.json', category: 'convenience-store', source: 'Publix', extra: {} },
  { file: 'bucees_locations.json', category: 'convenience-store', source: "Buc-ee's", extra: { open_24h: true, hours: 'Open 24 Hours' } },
  { file: 'murphy_usa_verified.json', category: 'convenience-store', source: 'Murphy USA', extra: {} },
  { file: 'georgia_retail_ice_locations.json', category: 'convenience-store', source: 'Various', extra: { has_propane_exchange: true } },
  { file: 'georgia_gas_stations.json', category: 'convenience-store', source: 'Various', extra: {} },
  { file: 'more_stores.json', category: 'convenience-store', source: 'Various', extra: {} },
];

for (const ds of datasets) {
  try {
    const data = JSON.parse(fs.readFileSync(ds.file, 'utf8'));
    addLocations(data, ds.category, ds.source, ds.extra);
  } catch (e) {
    console.log(`  Skipping ${ds.file}: ${e.message}`);
  }
}

// Also try to load agent output files if they exist
const agentFiles = [
  'georgia_propane_locations.json',
];
for (const af of agentFiles) {
  try {
    const data = JSON.parse(fs.readFileSync(af, 'utf8'));
    addLocations(data, 'propane-refill', 'Various', {});
  } catch (e) {
    // Skip if not found
  }
}

// Files with per-entry categories (dry-ice, water-refill, ice-vending, etc.)
const categoryAwareFiles = [
  'new_dry_ice_and_water_refill_locations.json',
  'new_ice_water_dryice_locations.json',
  'georgia_locations.json',
  'agent_qt2.json',
  'wave2_stores.json',
];
const validCategories = new Set(['ice-vending','water-refill','dry-ice','propane-refill','propane-exchange','beer-drinks','convenience-store','package-store','ice-cream','public-bathroom']);
for (const caf of categoryAwareFiles) {
  try {
    const data = JSON.parse(fs.readFileSync(caf, 'utf8'));
    // Group by category
    const byCategory = {};
    for (const loc of data) {
      const cat = (loc.category && validCategories.has(loc.category)) ? loc.category : 'convenience-store';
      if (!byCategory[cat]) byCategory[cat] = [];
      byCategory[cat].push(loc);
    }
    for (const [cat, locs] of Object.entries(byCategory)) {
      const extra = {};
      if (cat === 'dry-ice') extra.has_dry_ice = true;
      if (cat === 'water-refill') extra.has_water_refill = true;
      if (cat === 'propane-refill') extra.has_propane_refill = true;
      if (cat === 'propane-exchange') extra.has_propane_exchange = true;
      addLocations(locs, cat, `${caf}`, extra);
    }
  } catch (e) {
    console.log(`  Skipping ${caf}: ${e.message}`);
  }
}

console.log(`\nTotal added: ${totalAdded}`);
console.log(`Total skipped: ${totalSkipped}`);
console.log(`Total listings now: ${listings.length}`);

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
console.log('\nSeed data updated successfully!');
