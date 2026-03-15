# GACubes — Full Feature List & Build Summary

## What is GACubes?
A Progressive Web App (PWA) that helps people find ice vending machines, water refill stations, dry ice, propane, beer/drinks, convenience stores, and package stores across the entire state of Georgia.

**Live at**: gacubes.com

---

## 12 Feature Areas

### 1. Search & Discovery
- Full-text search by town name, ZIP code, or business name
- Geolocation "Find Near Me" — uses device GPS to find nearest locations
- 8 category filters: Ice Vending, Water Refill, Dry Ice, Propane Refill, Propane Exchange, Convenience Store, Beer & Drinks, Package Store
- Distance radius filtering: 5 / 10 / 25 / 50 mile options
- Boolean quick-filters: Open Now, 24/7, Card Accepted, Water Refill, Dry Ice, Propane, Near Beer/Drinks, High Density Area
- Sort options: Closest First, Highest Rated, Most Options Nearby
- Haversine distance calculation for accurate mile-based distance display

### 2. Interactive Map (Google Maps)
- Full-screen interactive Google Map centered on Georgia
- Color-coded markers by category (blue=ice, cyan=water, indigo=dry ice, orange=propane refill, amber=propane exchange, green=convenience, yellow=beer, purple=package)
- Marker popups showing business name, category, and address on click
- Selected listing highlighting — larger marker when a listing is selected
- User location marker (red pin) showing GPS position
- Map legend in bottom-left corner explaining all category colors
- Map/Satellite toggle

### 3. Listing Detail Pages (3,140 individual pages)
- Hero section with category-colored header and brand logo
- Business name, full address, star rating, category tags
- Embedded Google Map showing exact pin
- Full details: hours, phone, website, payment types accepted
- Feature indicators: Water Refill, Dry Ice, Propane Refill/Exchange, Beer/Drinks Nearby
- One-tap navigation: Google Maps, Apple Maps, Waze, Copy Address buttons
- Call Now and Visit Website action buttons
- Nearby Locations section — up to 6 listings within 10 miles with distances
- Related Searches links (e.g., "Ice in [City]", "Near [ZIP]")
- Source attribution and Report button

### 4. Browse Pages
- City pages (329 cities) — all listings in a specific Georgia city
- ZIP code pages (374 ZIP codes) — all listings near a ZIP code
- Category pages (8 categories) — all listings of a specific type statewide
- All with breadcrumb navigation and SEO-optimized content

### 5. Home Page
- Hero banner with search bar
- 6 quick-access category icons for one-tap browsing
- "Nearest Locations" — 8 featured listing cards with brand logos and ratings
- "Browse by City" — top 20 Georgia cities
- "Lake Areas" — 6 major Georgia lakes with nearby location links
- "Browse by Category" — links to all 8 category landing pages
- About CTA and footer with quick links

### 6. Mobile Experience
- Fully responsive — optimized layouts for phone, tablet, desktop
- Mobile bottom navigation bar: Search, Map, Saved, Submit
- Mobile filter modal — slide-up bottom sheet with all filters, Apply/Reset buttons
- Touch-optimized — large tap targets, swipe-friendly scrolling
- Viewport-fit: cover for edge-to-edge display on notched devices
- Safe area insets for iPhone notch/Dynamic Island

### 7. PWA (Progressive Web App)
- Installable to home screen on iOS and Android
- Standalone display mode — runs like a native app
- Service Worker with network-first caching strategy
- Offline fallback — cached pages available without internet
- 512x512 maskable app icon
- Custom splash screen with theme colors

### 8. Dark Mode
- System-preference detection — auto-matches OS theme
- Manual toggle — Sun/Moon icon in header
- Persisted preference via localStorage
- Full dark color scheme for all pages and components

### 9. Brand Logo System
- 25+ brand logos as SVGs (Twice the Ice, Kooler Ice, QuikTrip, RaceTrac, Circle K, Buc-ee's, Parker's, AmeriGas, U-Haul, Tractor Supply, Total Wine, etc.)
- Auto-detected from business name
- Displayed on listing cards, detail pages, and home page
- Graceful fallback to category icon when no logo available

### 10. SEO & Static Generation
- 3,140 pre-rendered listing pages (SSG)
- 329 pre-rendered city pages
- 374 pre-rendered ZIP code pages
- 8 pre-rendered category pages
- Full metadata (title, description, keywords) on every page
- Apple Web App meta tags
- Static export — no server required (hosted on any CDN)

### 11. Submit & Advertise
- Submit a Location form — name, category, address, city, ZIP, phone, website, hours, and feature checkboxes
- Advertise page — Featured Listings, Sponsored Placement, Analytics & Tracking service cards with contact CTA

### 12. Additional Features
- Copy Address button (clipboard API)
- Back navigation buttons throughout
- Star ratings on all listings
- Density scoring (1-10 scale showing how many options are nearby)
- Secondary categories — listings can belong to multiple categories
- Payment type indicators (card, cash, mobile)
- Open/closed status with 24/7 badge

---

## What It Took to Build

### Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16.1.6 | React framework with SSG and static export |
| React 19.2.3 | UI rendering |
| TypeScript 5 | Type safety across all code |
| Tailwind CSS 4 | Utility-first styling |
| Google Maps API (@vis.gl/react-google-maps) | Interactive maps |
| Leaflet / React-Leaflet | Alternative map support |
| Lucide React | Icon system (200+ icons) |

### Codebase Stats

| Metric | Count |
|--------|-------|
| TypeScript/TSX files | 31 |
| Total lines of code | ~7,200 |
| Components | 11 |
| Page routes | 10 |
| Library/utility files | 10 |
| Brand logo SVGs | 25 |
| Seed data entries | 3,140 locations |
| Unique cities covered | 329 |
| Unique ZIP codes | 374 |
| Pre-rendered pages | ~3,850+ |

### Architecture
- No backend / no database — all data is embedded in seed-data.ts (2 MB)
- Static export (output: "export") — deployable to any CDN (Vercel, Netlify, GitHub Pages)
- Client-side search — all filtering, sorting, and distance calculations happen in the browser
- Context-based state management — SearchProvider and ThemeProvider via React Context
- Haversine formula for geographic distance calculations
- Custom geolocation with high-accuracy GPS and 10-second timeout

### Design System
- Primary color: #4A9FD9 (icy blue)
- Header: #1a2332 (dark navy)
- 8 category colors for visual distinction
- Inter font with system fallbacks
- Responsive breakpoints: mobile-first, lg: desktop sidebar
- Custom CSS variables for light/dark mode theming
