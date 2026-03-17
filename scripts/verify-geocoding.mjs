#!/usr/bin/env node
/**
 * Verify and fix geocoding for all location data files using Google Geocoding API.
 * Usage: node scripts/verify-geocoding.mjs [--fix]
 *
 * The Geocoding API is the cheapest Google Maps API for address -> coordinates ($5/1000 requests).
 */

import fs from 'fs';
import path from 'path';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyBPBRg6MsYXZtDbSjl8nOxnTMehqIm2iRU';
const FIX_MODE = process.argv.includes('--fix');
const THRESHOLD_KM = 1.0; // Flag locations where geocoded result is >1km from stored coords

// Haversine distance in km
function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function geocode(address) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status === 'OK' && data.results.length > 0) {
    const loc = data.results[0].geometry.location;
    const formattedAddress = data.results[0].formatted_address;
    return { lat: loc.lat, lng: loc.lng, formattedAddress };
  }
  return null;
}

// Rate limit: 50 requests per second max for Geocoding API
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function verifyFile(filePath) {
  console.log(`\n=== Verifying: ${filePath} ===`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const locations = JSON.parse(raw);

  const issues = [];

  for (let i = 0; i < locations.length; i++) {
    const loc = locations[i];
    const fullAddress = `${loc.address}, ${loc.city}, ${loc.state} ${loc.zip}`;

    const result = await geocode(fullAddress);
    await sleep(100); // Stay well under rate limit

    if (!result) {
      console.log(`  [WARN] Could not geocode: ${fullAddress}`);
      issues.push({ index: i, location: loc, issue: 'GEOCODE_FAILED', fullAddress });
      continue;
    }

    const dist = haversine(loc.lat, loc.lng, result.lat, result.lng);

    if (dist > THRESHOLD_KM) {
      console.log(`  [MISMATCH] ${fullAddress}`);
      console.log(`    Stored:   lat=${loc.lat}, lng=${loc.lng}`);
      console.log(`    Google:   lat=${result.lat}, lng=${result.lng}`);
      console.log(`    Google addr: ${result.formattedAddress}`);
      console.log(`    Distance: ${dist.toFixed(2)} km`);

      issues.push({
        index: i,
        location: loc,
        issue: 'COORD_MISMATCH',
        fullAddress,
        storedLat: loc.lat,
        storedLng: loc.lng,
        googleLat: result.lat,
        googleLng: result.lng,
        googleAddress: result.formattedAddress,
        distanceKm: dist
      });

      if (FIX_MODE) {
        // Round to 4 decimal places (11m precision - sufficient for store locations)
        locations[i].lat = Math.round(result.lat * 10000) / 10000;
        locations[i].lng = Math.round(result.lng * 10000) / 10000;
        console.log(`    [FIXED] Updated to lat=${locations[i].lat}, lng=${locations[i].lng}`);
      }
    } else {
      // OK
      process.stdout.write('.');
    }
  }

  if (FIX_MODE && issues.some(i => i.issue === 'COORD_MISMATCH')) {
    fs.writeFileSync(filePath, JSON.stringify(locations, null, 2) + '\n');
    console.log(`\n  [SAVED] ${filePath}`);
  }

  console.log(`\n  Total: ${locations.length}, Issues: ${issues.length}`);
  return issues;
}

async function main() {
  console.log(`Mode: ${FIX_MODE ? 'FIX' : 'VERIFY ONLY'}`);
  console.log(`Threshold: ${THRESHOLD_KM} km`);

  // Verify the JSON data source files
  const files = [
    'publix_locations.json',
    'kroger_locations.json',
    'qt_locations.json',
    'georgia_propane_locations.json',
    'georgia_retail_ice_locations.json',
  ];

  const allIssues = {};

  for (const file of files) {
    const filePath = path.resolve(file);
    if (!fs.existsSync(filePath)) {
      console.log(`  [SKIP] ${file} not found`);
      continue;
    }

    try {
      const issues = await verifyFile(filePath);
      if (issues.length > 0) {
        allIssues[file] = issues;
      }
    } catch (err) {
      console.log(`  [ERROR] ${file}: ${err.message}`);
    }
  }

  // Summary
  console.log('\n\n=== SUMMARY ===');
  let totalIssues = 0;
  for (const [file, issues] of Object.entries(allIssues)) {
    console.log(`${file}: ${issues.length} issues`);
    totalIssues += issues.length;
  }
  if (totalIssues === 0) {
    console.log('All locations verified successfully!');
  } else {
    console.log(`\nTotal issues: ${totalIssues}`);
    if (!FIX_MODE) {
      console.log('Run with --fix to automatically correct coordinates.');
    }
  }
}

main().catch(console.error);
