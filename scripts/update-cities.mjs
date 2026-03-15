#!/usr/bin/env node
/**
 * Finds cities in SEED_LISTINGS that aren't in GA_CITIES and adds them
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const seedPath = resolve(__dirname, '../src/lib/seed-data.ts');
const content = readFileSync(seedPath, 'utf8');

// Extract existing GA_CITIES slugs
const existingSlugs = new Set();
const slugRegex = /slug:"([^"]+)"/g;
let match;
while ((match = slugRegex.exec(content)) !== null) {
  existingSlugs.add(match[1]);
}
console.log(`Existing GA_CITIES: ${existingSlugs.size}`);

// Extract all unique cities from listings
const cityDataMap = new Map(); // city -> {lat, lng}
const listingCityRegex = /"city":"([^"]+)","state":"GA","zip":"([^"]+)","lat":([\d.-]+),"lng":([\d.-]+)/g;
while ((match = listingCityRegex.exec(content)) !== null) {
  const city = match[1];
  const slug = city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '') + '-ga';
  if (!cityDataMap.has(city)) {
    cityDataMap.set(city, { lat: parseFloat(match[3]), lng: parseFloat(match[4]) });
  }
}

// Georgia county lookup by approximate location (simplified)
const COUNTY_LOOKUP = {
  "Dahlonega": "Lumpkin", "Blue Ridge": "Fannin", "Blairsville": "Union",
  "Hiawassee": "Towns", "Young Harris": "Towns", "McCaysville": "Fannin",
  "Ellijay": "Gilmer", "Dillard": "Rabun", "Mountain City": "Rabun",
  "Tallulah Falls": "Habersham", "Clarkesville": "Habersham", "Cornelia": "Habersham",
  "Cleveland": "White", "Helen": "White", "Dawsonville": "Dawson",
  "Jasper": "Pickens", "Ball Ground": "Cherokee", "Cherry Log": "Gilmer",
  "Morganton": "Fannin", "Summerville": "Chattooga", "Trion": "Chattooga",
  "Chickamauga": "Walker", "LaFayette": "Walker", "Menlo": "Chattooga",
  "Lyerly": "Chattooga", "Chatsworth": "Murray", "Ringgold": "Catoosa",
  "Sandersville": "Washington", "Tennille": "Washington", "Wrightsville": "Johnson",
  "Swainsboro": "Emanuel", "Soperton": "Treutlen", "McRae-Helena": "Telfair",
  "Eastman": "Dodge", "Hawkinsville": "Pulaski", "Cochran": "Bleckley",
  "Gray": "Jones", "Eatonton": "Putnam", "Greensboro": "Greene",
  "Monticello": "Jasper", "Barnesville": "Lamar", "Zebulon": "Pike",
  "Fitzgerald": "Ben Hill", "Ocilla": "Irwin", "Ashburn": "Turner",
  "Cordele": "Crisp", "Vienna": "Dooly", "Americus": "Sumter",
  "Plains": "Sumter", "Montezuma": "Macon", "Dawson": "Terrell",
  "Camilla": "Mitchell", "Donalsonville": "Seminole", "Blakely": "Early",
  "Adel": "Cook", "Nashville": "Berrien", "Lakeland": "Lanier",
  "Homerville": "Clinch", "Blackshear": "Pierce", "Alma": "Bacon",
  "Baxley": "Appling", "Hazlehurst": "Jeff Davis", "Folkston": "Charlton",
  "Nahunta": "Brantley", "Woodbine": "Camden", "Darien": "McIntosh",
  "Reidsville": "Tattnall", "Claxton": "Evans", "Glennville": "Tattnall",
  "Lyons": "Toombs", "Hogansville": "Troup", "Greenville": "Meriwether",
  "Warm Springs": "Meriwether", "Pine Mountain": "Harris", "Hamilton": "Harris",
  "Manchester": "Meriwether", "Talbotton": "Talbot", "Waynesboro": "Burke",
  "Louisville": "Jefferson", "Thomson": "McDuffie", "Washington": "Wilkes",
  "Lumber City": "Telfair", "Unadilla": "Dooly", "Oglethorpe": "Macon",
  "Rochelle": "Wilcox", "Broxton": "Coffee", "Pearson": "Atkinson",
  "Enigma": "Berrien", "Ray City": "Berrien", "Sparks": "Cook",
  "Jeffersonville": "Twiggs", "Irwinton": "Wilkinson", "Alamo": "Wheeler",
  "Mount Vernon": "Montgomery", "Ailey": "Montgomery", "Stillmore": "Emanuel",
  "Wadley": "Jefferson", "Riceboro": "Liberty", "Midway": "Liberty",
  "Ludowici": "Long", "Pembroke": "Bryan",
  // Metro Atlanta additions
  "Sandy Springs": "Fulton", "Dunwoody": "DeKalb", "Roswell": "Fulton",
  "Alpharetta": "Fulton", "Johns Creek": "Fulton", "Suwanee": "Gwinnett",
  "Lilburn": "Gwinnett", "Stone Mountain": "DeKalb", "Tucker": "DeKalb",
  "Lithonia": "DeKalb", "Clarkston": "DeKalb", "Jonesboro": "Clayton",
  "East Point": "Fulton", "Mableton": "Cobb", "Austell": "Cobb",
  "Lithia Springs": "Douglas", "Stockbridge": "Henry", "Hampton": "Henry",
  "Locust Grove": "Henry", "Ellenwood": "Clayton", "Winder": "Barrow",
  "Monroe": "Walton", "Social Circle": "Walton", "Avondale Estates": "DeKalb",
  "Chamblee": "DeKalb", "Brookhaven": "DeKalb", "Powder Springs": "Cobb",
  "Fayetteville": "Fayette", "Smyrna": "Cobb", "College Park": "Fulton",
  "Conyers": "Rockdale", "McDonough": "Henry", "Grayson": "Gwinnett",
  "Snellville": "Gwinnett", "Doraville": "DeKalb", "Buford": "Gwinnett",
  "Duluth": "Gwinnett", "Calhoun": "Gordon", "Fort Oglethorpe": "Catoosa",
  "Hartwell": "Hart", "Lavonia": "Franklin", "St. Marys": "Camden",
  "Metter": "Candler", "West Point": "Troup", "Bainbridge": "Decatur",
  "Cairo": "Grady",
};

// Find missing cities
const newCities = [];
for (const [city, data] of cityDataMap) {
  const slug = city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '') + '-ga';
  if (!existingSlugs.has(slug)) {
    const county = COUNTY_LOOKUP[city] || "Unknown";
    newCities.push({
      name: city,
      slug,
      lat: data.lat,
      lng: data.lng,
      county,
    });
  }
}

console.log(`New cities to add: ${newCities.length}`);
if (newCities.length > 0) {
  console.log('Cities:', newCities.map(c => c.name).join(', '));
}

if (newCities.length === 0) {
  console.log('No new cities needed.');
  process.exit(0);
}

// Generate the city entries
const cityLines = newCities.map(c =>
  `  {name:"${c.name}",slug:"${c.slug}",lat:${c.lat},lng:${c.lng},county:"${c.county}"},`
).join('\n');

// Find end of GA_CITIES array
const gaCitiesEnd = content.indexOf('];', content.indexOf('export const GA_CITIES'));
if (gaCitiesEnd === -1) {
  console.error('Could not find end of GA_CITIES array');
  process.exit(1);
}

const newContent = content.slice(0, gaCitiesEnd) + cityLines + '\n' + content.slice(gaCitiesEnd);
writeFileSync(seedPath, newContent, 'utf8');
console.log(`Successfully added ${newCities.length} new cities to GA_CITIES`);
