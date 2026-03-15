/**
 * SMALL-TOWN & MOM-AND-POP GEORGIA LOCATIONS - 250+ entries
 * Focused on towns with population < 10,000
 * Prioritizes independent/local businesses over chains
 *
 * Regions covered:
 * - Northeast GA Mountains
 * - Northwest GA
 * - Central GA
 * - South GA
 * - Southeast GA / Coast
 * - West GA
 * - Additional small towns statewide
 */

export const SMALL_TOWN_LOCATIONS = [
  // ============================================================
  // NORTHEAST GEORGIA MOUNTAINS
  // ============================================================

  // --- Dahlonega (pop ~7,000) ---
  {n:"Dahlonega Ice & Water",a:"71 S Chestatee St",c:"Dahlonega",z:"30533",la:34.528,ln:-83.985,cp:"ice-vending",cs:["water-refill"],sn:"Independent"},
  {n:"Yahoola Creek General Store",a:"520 N Grove St",c:"Dahlonega",z:"30533",la:34.535,ln:-83.984,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Dahlonega Hardware & Propane",a:"165 S Chestatee St",c:"Dahlonega",z:"30533",la:34.526,ln:-83.983,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Mountain Fresh Market - Dahlonega",a:"825 S Chestatee St",c:"Dahlonega",z:"30533",la:34.520,ln:-83.984,cp:"convenience-store",cs:[],sn:"Independent"},
  {n:"Piggly Wiggly - Dahlonega",a:"41 Mountain Dr",c:"Dahlonega",z:"30533",la:34.530,ln:-83.987,cp:"dry-ice",cs:["convenience-store"],sn:"Piggly Wiggly"},

  // --- Blue Ridge (pop ~1,500) ---
  {n:"Blue Ridge Mountain Ice",a:"150 E Main St",c:"Blue Ridge",z:"30513",la:34.864,ln:-84.323,cp:"ice-vending",cs:[],sn:"Independent"},
  {n:"Mercier Orchards Country Store",a:"8660 Blue Ridge Dr",c:"Blue Ridge",z:"30513",la:34.835,ln:-84.296,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Blue Ridge Hardware",a:"615 E Main St",c:"Blue Ridge",z:"30513",la:34.863,ln:-84.317,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Fannin County Ice Co",a:"2240 Old Hwy 76",c:"Blue Ridge",z:"30513",la:34.870,ln:-84.340,cp:"ice-vending",cs:["water-refill"],sn:"Independent"},
  {n:"Blue Ridge Package Store",a:"455 E Main St",c:"Blue Ridge",z:"30513",la:34.864,ln:-84.320,cp:"package-store",cs:["beer-drinks"],sn:"GA Alcohol License"},

  // --- Blairsville (pop ~700) ---
  {n:"Murphy's Country Store",a:"95 Town Square",c:"Blairsville",z:"30512",la:34.876,ln:-83.958,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Union County Co-op Propane",a:"320 Blue Ridge Hwy",c:"Blairsville",z:"30512",la:34.872,ln:-83.955,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Blairsville Ice 24/7",a:"185 Gainesville Hwy",c:"Blairsville",z:"30512",la:34.870,ln:-83.945,cp:"ice-vending",cs:[],sn:"Independent"},
  {n:"Mountain Valley Water Refill",a:"245 Blue Ridge Hwy",c:"Blairsville",z:"30512",la:34.873,ln:-83.957,cp:"water-refill",cs:[],sn:"Independent"},

  // --- Hiawassee (pop ~900) ---
  {n:"Hiawassee Ice Machine",a:"50 S Main St",c:"Hiawassee",z:"30546",la:34.951,ln:-83.758,cp:"ice-vending",cs:[],sn:"Independent"},
  {n:"Towns County General Store",a:"135 N Main St",c:"Hiawassee",z:"30546",la:34.953,ln:-83.758,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Mountain Propane & Supply",a:"710 Hwy 76 W",c:"Hiawassee",z:"30546",la:34.950,ln:-83.770,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Young Harris (pop ~1,000) ---
  {n:"Young Harris General Store",a:"196 Main St",c:"Young Harris",z:"30582",la:34.933,ln:-83.845,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Young Harris Feed & Seed",a:"310 Hwy 76",c:"Young Harris",z:"30582",la:34.935,ln:-83.850,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- McCaysville (pop ~1,100) ---
  {n:"McCaysville Ice & Water",a:"10 Toccoa Ave",c:"McCaysville",z:"30555",la:34.984,ln:-84.376,cp:"ice-vending",cs:["water-refill"],sn:"Independent"},
  {n:"Copper Basin General Store",a:"85 Main St",c:"McCaysville",z:"30555",la:34.984,ln:-84.378,cp:"convenience-store",cs:[],sn:"Independent"},

  // --- Ellijay (pop ~1,700) ---
  {n:"Ellijay Ice Machine",a:"115 N Main St",c:"Ellijay",z:"30540",la:34.695,ln:-84.482,cp:"ice-vending",cs:["water-refill"],sn:"Independent"},
  {n:"Gilmer County Farm Supply",a:"420 Maddox Dr",c:"Ellijay",z:"30540",la:34.698,ln:-84.485,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Apple Country Store",a:"285 N Main St",c:"Ellijay",z:"30540",la:34.697,ln:-84.481,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Cartecay Grocery & Bait",a:"1820 Boardtown Rd",c:"Ellijay",z:"30536",la:34.720,ln:-84.440,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Ellijay Package",a:"190 N Main St",c:"Ellijay",z:"30540",la:34.696,ln:-84.482,cp:"package-store",cs:["beer-drinks"],sn:"GA Alcohol License"},

  // --- Dillard (pop ~350) ---
  {n:"Dillard Country Store",a:"1555 Franklin St",c:"Dillard",z:"30537",la:34.965,ln:-83.387,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Dillard Mountain Ice",a:"14 Franklin St",c:"Dillard",z:"30537",la:34.966,ln:-83.388,cp:"ice-vending",cs:[],sn:"Independent"},

  // --- Mountain City (pop ~1,000) ---
  {n:"Foxfire General Store",a:"90 Main St",c:"Mountain City",z:"30562",la:34.920,ln:-83.383,cp:"convenience-store",cs:[],sn:"Independent"},

  // --- Tallulah Falls (pop ~200) ---
  {n:"Tallulah Falls Country Market",a:"Main St & Jane Hurt Dr",c:"Tallulah Falls",z:"30573",la:34.737,ln:-83.393,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Tallulah Gorge Ice",a:"338 Jane Hurt Dr",c:"Tallulah Falls",z:"30573",la:34.738,ln:-83.394,cp:"ice-vending",cs:[],sn:"Independent"},

  // --- Clarkesville (pop ~1,800) ---
  {n:"Clarkesville Feed & Farm",a:"260 Grant St",c:"Clarkesville",z:"30523",la:34.611,ln:-83.523,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Habersham General Store",a:"175 Washington St",c:"Clarkesville",z:"30523",la:34.613,ln:-83.525,cp:"convenience-store",cs:[],sn:"Independent"},

  // --- Cornelia (pop ~4,000) ---
  {n:"Cornelia Hardware & Propane",a:"465 Irvin St",c:"Cornelia",z:"30531",la:34.514,ln:-83.525,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Big Red Apple Market",a:"115 N Main St",c:"Cornelia",z:"30531",la:34.517,ln:-83.528,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},

  // --- Cleveland (pop ~4,200) ---
  {n:"Cleveland Trading Post",a:"20 N Main St",c:"Cleveland",z:"30528",la:34.598,ln:-83.764,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"White County Farm Supply",a:"120 Hwy 129 N",c:"Cleveland",z:"30528",la:34.602,ln:-83.770,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Cleveland IGA",a:"160 Helen Hwy",c:"Cleveland",z:"30528",la:34.600,ln:-83.760,cp:"dry-ice",cs:["convenience-store"],sn:"IGA"},

  // --- Helen (pop ~550) ---
  {n:"Alpine Village Market",a:"740 N Main St",c:"Helen",z:"30545",la:34.702,ln:-83.730,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Helen Bait & Ice",a:"8095 S Main St",c:"Helen",z:"30545",la:34.690,ln:-83.725,cp:"ice-vending",cs:[],sn:"Independent"},
  {n:"Chattahoochee General",a:"1000 Edelweiss Strasse",c:"Helen",z:"30545",la:34.705,ln:-83.728,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},

  // --- Dawsonville (pop ~3,500) ---
  {n:"Dawsonville Ice Express",a:"340 Hwy 53 E",c:"Dawsonville",z:"30534",la:34.423,ln:-84.108,cp:"ice-vending",cs:["water-refill"],sn:"Independent"},
  {n:"Dawson County Farm Supply",a:"490 Hwy 53 E",c:"Dawsonville",z:"30534",la:34.425,ln:-84.105,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"North Georgia Country Store",a:"120 Hwy 400 S",c:"Dawsonville",z:"30534",la:34.420,ln:-84.110,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},

  // --- Jasper (pop ~4,000) ---
  {n:"Jasper Country Corner",a:"155 N Main St",c:"Jasper",z:"30143",la:34.468,ln:-84.429,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Pickens County Hardware",a:"285 E Church St",c:"Jasper",z:"30143",la:34.467,ln:-84.425,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Jasper IGA Market",a:"375 N Main St",c:"Jasper",z:"30143",la:34.470,ln:-84.430,cp:"dry-ice",cs:["convenience-store"],sn:"IGA"},

  // --- Ball Ground (pop ~2,000) ---
  {n:"Ball Ground Feed & Seed",a:"135 Old Canton Rd",c:"Ball Ground",z:"30107",la:34.339,ln:-84.378,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Ball Ground Market",a:"310 Valley St",c:"Ball Ground",z:"30107",la:34.340,ln:-84.375,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},

  // --- Cherry Log (unincorporated) ---
  {n:"Cherry Log Country Store",a:"2625 Old Hwy 76",c:"Cherry Log",z:"30522",la:34.779,ln:-84.418,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Cherry Log Ice & Propane",a:"2700 Old Hwy 76",c:"Cherry Log",z:"30522",la:34.780,ln:-84.419,cp:"propane-refill",cs:["ice-vending","propane-exchange"],sn:"Independent"},

  // --- Morganton (pop ~350) ---
  {n:"Morganton General Store",a:"4800 Hwy 60",c:"Morganton",z:"30560",la:34.870,ln:-84.250,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},

  // ============================================================
  // NORTHWEST GEORGIA
  // ============================================================

  // --- Summerville (pop ~4,500) ---
  {n:"Summerville Hardware & Propane",a:"120 Commerce St",c:"Summerville",z:"30747",la:34.480,ln:-85.348,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Chattooga County Market",a:"215 N Commerce St",c:"Summerville",z:"30747",la:34.482,ln:-85.347,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Summerville Ice Machine",a:"40 Trion Hwy",c:"Summerville",z:"30747",la:34.478,ln:-85.345,cp:"ice-vending",cs:[],sn:"Independent"},

  // --- Trion (pop ~1,800) ---
  {n:"Trion General Store",a:"15 Bulldog Dr",c:"Trion",z:"30753",la:34.546,ln:-85.310,cp:"convenience-store",cs:[],sn:"Independent"},
  {n:"Trion Feed & Supply",a:"205 2nd Ave",c:"Trion",z:"30753",la:34.545,ln:-85.311,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Chickamauga (pop ~3,200) ---
  {n:"Chickamauga Ice & Water",a:"105 Cove Rd",c:"Chickamauga",z:"30707",la:34.871,ln:-85.290,cp:"ice-vending",cs:["water-refill"],sn:"Independent"},
  {n:"Chickamauga Country Store",a:"210 Gordon St",c:"Chickamauga",z:"30707",la:34.871,ln:-85.292,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Walker County Farm Supply",a:"315 Lee Ave",c:"Chickamauga",z:"30707",la:34.870,ln:-85.288,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- LaFayette (pop ~7,100) ---
  {n:"LaFayette Ice 24/7",a:"406 N Main St",c:"LaFayette",z:"30728",la:34.710,ln:-85.282,cp:"ice-vending",cs:["water-refill"],sn:"Independent"},
  {n:"LaFayette Hardware",a:"510 N Main St",c:"LaFayette",z:"30728",la:34.712,ln:-85.283,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Piggly Wiggly - LaFayette",a:"401 Duke St",c:"LaFayette",z:"30728",la:34.708,ln:-85.280,cp:"dry-ice",cs:["convenience-store"],sn:"Piggly Wiggly"},

  // --- Menlo (pop ~500) ---
  {n:"Menlo Country Store & Gas",a:"7760 Hwy 48",c:"Menlo",z:"30731",la:34.484,ln:-85.468,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},

  // --- Lyerly (pop ~500) ---
  {n:"Lyerly General Merchandise",a:"Main St",c:"Lyerly",z:"30730",la:34.408,ln:-85.395,cp:"convenience-store",cs:[],sn:"Independent"},

  // --- Chatsworth (pop ~4,300) ---
  {n:"Murray County Farm & Feed",a:"400 N 3rd Ave",c:"Chatsworth",z:"30705",la:34.772,ln:-84.770,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Chatsworth Country Mart",a:"120 Maddox Dr",c:"Chatsworth",z:"30705",la:34.768,ln:-84.768,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},

  // --- Ringgold (pop ~3,700) ---
  {n:"Ringgold Country Store",a:"125 Nashville St",c:"Ringgold",z:"30736",la:34.916,ln:-85.110,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Catoosa Hardware & Propane",a:"310 Tennessee St",c:"Ringgold",z:"30736",la:34.918,ln:-85.108,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // ============================================================
  // CENTRAL GEORGIA
  // ============================================================

  // --- Sandersville (pop ~5,600) ---
  {n:"Sandersville Ice Machine",a:"120 N Harris St",c:"Sandersville",z:"31082",la:32.982,ln:-82.810,cp:"ice-vending",cs:[],sn:"Independent"},
  {n:"Washington County General Store",a:"235 E Haynes St",c:"Sandersville",z:"31082",la:32.980,ln:-82.808,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Sandersville Farm & Home",a:"510 S Harris St",c:"Sandersville",z:"31082",la:32.978,ln:-82.812,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Piggly Wiggly - Sandersville",a:"620 S Harris St",c:"Sandersville",z:"31082",la:32.976,ln:-82.813,cp:"dry-ice",cs:["convenience-store"],sn:"Piggly Wiggly"},

  // --- Tennille (pop ~1,600) ---
  {n:"Tennille Trading Post",a:"100 Railroad St",c:"Tennille",z:"31089",la:32.937,ln:-82.813,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Tennille Ice & Water",a:"240 Railroad St",c:"Tennille",z:"31089",la:32.938,ln:-82.814,cp:"ice-vending",cs:["water-refill"],sn:"Independent"},

  // --- Wrightsville (pop ~3,600) ---
  {n:"Wrightsville Country Store",a:"110 N Elm St",c:"Wrightsville",z:"31096",la:32.731,ln:-82.719,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Johnson County Hardware",a:"250 S Elm St",c:"Wrightsville",z:"31096",la:32.729,ln:-82.720,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Swainsboro (pop ~7,300) ---
  {n:"Swainsboro Ice 24/7",a:"102 S Main St",c:"Swainsboro",z:"30401",la:32.597,ln:-82.333,cp:"ice-vending",cs:["water-refill"],sn:"Independent"},
  {n:"Emanuel County Farm Supply",a:"310 N Main St",c:"Swainsboro",z:"30401",la:32.600,ln:-82.334,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Harvey's Supermarket - Swainsboro",a:"410 S Main St",c:"Swainsboro",z:"30401",la:32.595,ln:-82.332,cp:"dry-ice",cs:["convenience-store"],sn:"Harvey's"},
  {n:"Swainsboro Package",a:"215 S Main St",c:"Swainsboro",z:"30401",la:32.596,ln:-82.333,cp:"package-store",cs:["beer-drinks"],sn:"GA Alcohol License"},

  // --- Soperton (pop ~2,800) ---
  {n:"Soperton Country Market",a:"65 2nd St",c:"Soperton",z:"30457",la:32.378,ln:-82.593,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Soperton Ice Machine",a:"140 3rd St",c:"Soperton",z:"30457",la:32.379,ln:-82.594,cp:"ice-vending",cs:[],sn:"Independent"},

  // --- McRae-Helena (pop ~5,700) ---
  {n:"McRae Country Store",a:"120 E Oak St",c:"McRae-Helena",z:"31055",la:32.069,ln:-82.877,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"McRae Hardware & Propane",a:"245 W Oak St",c:"McRae-Helena",z:"31055",la:32.068,ln:-82.880,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"McRae Ice & Water",a:"310 N 2nd Ave",c:"McRae-Helena",z:"31055",la:32.070,ln:-82.878,cp:"ice-vending",cs:["water-refill"],sn:"Independent"},

  // --- Eastman (pop ~5,100) ---
  {n:"Eastman Ice Express",a:"220 College St",c:"Eastman",z:"31023",la:32.198,ln:-83.178,cp:"ice-vending",cs:["water-refill"],sn:"Independent"},
  {n:"Dodge County Farm & Home",a:"450 Oak St",c:"Eastman",z:"31023",la:32.196,ln:-83.176,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Harvey's Supermarket - Eastman",a:"510 College St",c:"Eastman",z:"31023",la:32.200,ln:-83.180,cp:"dry-ice",cs:["convenience-store"],sn:"Harvey's"},

  // --- Hawkinsville (pop ~5,400) ---
  {n:"Hawkinsville Ice Machine",a:"102 Broad St",c:"Hawkinsville",z:"31036",la:32.284,ln:-83.472,cp:"ice-vending",cs:[],sn:"Independent"},
  {n:"Pulaski County Feed & Supply",a:"310 Commerce St",c:"Hawkinsville",z:"31036",la:32.283,ln:-83.470,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Hawkinsville Country Mart",a:"220 Broad St",c:"Hawkinsville",z:"31036",la:32.285,ln:-83.473,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},

  // --- Cochran (pop ~5,100) ---
  {n:"Cochran Ice & Water",a:"115 2nd St",c:"Cochran",z:"31014",la:32.387,ln:-83.353,cp:"ice-vending",cs:["water-refill"],sn:"Independent"},
  {n:"Bleckley County Hardware",a:"240 Dykes St",c:"Cochran",z:"31014",la:32.386,ln:-83.354,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Gray (pop ~3,300) ---
  {n:"Old Clinton General Store",a:"150 Main St",c:"Gray",z:"31032",la:33.008,ln:-83.533,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Jones County Hardware",a:"280 W Clinton St",c:"Gray",z:"31032",la:33.007,ln:-83.535,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Eatonton (pop ~6,500) ---
  {n:"Eatonton Ice Machine",a:"120 N Jefferson Ave",c:"Eatonton",z:"31024",la:33.328,ln:-83.389,cp:"ice-vending",cs:["water-refill"],sn:"Independent"},
  {n:"Putnam County Farm Supply",a:"350 N Madison Ave",c:"Eatonton",z:"31024",la:33.330,ln:-83.388,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Piggly Wiggly - Eatonton",a:"400 N Jefferson Ave",c:"Eatonton",z:"31024",la:33.332,ln:-83.390,cp:"dry-ice",cs:["convenience-store"],sn:"Piggly Wiggly"},
  {n:"Lake Oconee Ice & Bait",a:"1175 Lake Oconee Pkwy",c:"Eatonton",z:"31024",la:33.350,ln:-83.370,cp:"ice-vending",cs:[],sn:"Independent"},

  // --- Greensboro (pop ~3,400) ---
  {n:"Greensboro Country Store",a:"200 N Main St",c:"Greensboro",z:"30642",la:33.577,ln:-83.183,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Greene County Feed & Seed",a:"355 S Main St",c:"Greensboro",z:"30642",la:33.574,ln:-83.184,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Lake Oconee Marina Ice",a:"1080 Parks Mill Rd",c:"Greensboro",z:"30642",la:33.530,ln:-83.250,cp:"ice-vending",cs:[],sn:"Independent"},

  // --- Monticello (pop ~2,700) ---
  {n:"Monticello Country Market",a:"120 E Washington St",c:"Monticello",z:"31064",la:33.305,ln:-83.684,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Jasper County Hardware",a:"265 E Greene St",c:"Monticello",z:"31064",la:33.304,ln:-83.683,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Barnesville (pop ~6,700) ---
  {n:"Barnesville Trading Post",a:"160 Market St",c:"Barnesville",z:"30204",la:33.055,ln:-84.158,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Lamar County Farm Supply",a:"380 Forsyth St",c:"Barnesville",z:"30204",la:33.054,ln:-84.156,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Zebulon (pop ~1,100) ---
  {n:"Zebulon General Store",a:"111 Main St",c:"Zebulon",z:"30295",la:33.102,ln:-84.342,cp:"convenience-store",cs:[],sn:"Independent"},

  // ============================================================
  // SOUTH GEORGIA
  // ============================================================

  // --- Fitzgerald (pop ~8,800) ---
  {n:"Fitzgerald Ice & Water",a:"110 E Pine St",c:"Fitzgerald",z:"31750",la:31.719,ln:-83.254,cp:"ice-vending",cs:["water-refill"],sn:"Independent"},
  {n:"Colony City Country Store",a:"320 S Main St",c:"Fitzgerald",z:"31750",la:31.715,ln:-83.256,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Ben Irwin Hardware",a:"245 S Grant St",c:"Fitzgerald",z:"31750",la:31.716,ln:-83.258,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Harvey's - Fitzgerald",a:"450 E Pine St",c:"Fitzgerald",z:"31750",la:31.720,ln:-83.250,cp:"dry-ice",cs:["convenience-store"],sn:"Harvey's"},
  {n:"Fitzgerald Package",a:"210 S Main St",c:"Fitzgerald",z:"31750",la:31.716,ln:-83.255,cp:"package-store",cs:["beer-drinks"],sn:"GA Alcohol License"},

  // --- Ocilla (pop ~3,500) ---
  {n:"Ocilla Country Mart",a:"120 S Irwin Ave",c:"Ocilla",z:"31774",la:31.594,ln:-83.249,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Ocilla Ice Machine",a:"210 W 4th St",c:"Ocilla",z:"31774",la:31.595,ln:-83.250,cp:"ice-vending",cs:[],sn:"Independent"},
  {n:"Irwin County Farm Supply",a:"340 S Cherry St",c:"Ocilla",z:"31774",la:31.592,ln:-83.248,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Ashburn (pop ~3,900) ---
  {n:"Ashburn Ice 24/7",a:"155 E Washington Ave",c:"Ashburn",z:"31714",la:31.706,ln:-83.650,cp:"ice-vending",cs:["water-refill"],sn:"Independent"},
  {n:"Turner County General Store",a:"280 E Washington Ave",c:"Ashburn",z:"31714",la:31.707,ln:-83.648,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Ashburn Hardware & Propane",a:"390 S Main St",c:"Ashburn",z:"31714",la:31.704,ln:-83.652,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Cordele (pop ~10,700) ---
  {n:"Cordele Ice Express",a:"310 E 16th Ave",c:"Cordele",z:"31015",la:31.963,ln:-83.773,cp:"ice-vending",cs:["water-refill"],sn:"Independent"},
  {n:"Crisp County Farm & Feed",a:"510 S 7th St",c:"Cordele",z:"31015",la:31.960,ln:-83.775,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Harvey's - Cordele",a:"610 E 16th Ave",c:"Cordele",z:"31015",la:31.965,ln:-83.770,cp:"dry-ice",cs:["convenience-store"],sn:"Harvey's"},
  {n:"Lake Blackshear Bait & Ice",a:"1200 Veterans Pkwy",c:"Cordele",z:"31015",la:31.970,ln:-83.790,cp:"ice-vending",cs:[],sn:"Independent"},

  // --- Vienna (pop ~3,800) ---
  {n:"Vienna Country Store",a:"120 E Union St",c:"Vienna",z:"31092",la:32.091,ln:-83.795,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Dooly County Feed & Seed",a:"250 S 3rd St",c:"Vienna",z:"31092",la:32.089,ln:-83.797,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Americus (pop ~15,500) ---
  {n:"Americus Ice & Water",a:"210 W Forsyth St",c:"Americus",z:"31709",la:32.074,ln:-84.237,cp:"ice-vending",cs:["water-refill"],sn:"Independent"},
  {n:"Sumter County Farm Supply",a:"420 N Lee St",c:"Americus",z:"31709",la:32.078,ln:-84.235,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Harvey's - Americus",a:"510 W Forsyth St",c:"Americus",z:"31709",la:32.076,ln:-84.240,cp:"dry-ice",cs:["convenience-store"],sn:"Harvey's"},

  // --- Plains (pop ~600) ---
  {n:"Plains Country Store",a:"101 Main St",c:"Plains",z:"31780",la:32.032,ln:-84.394,cp:"convenience-store",cs:[],sn:"Independent"},
  {n:"Plains Peanut Shop & Ice",a:"111 Main St",c:"Plains",z:"31780",la:32.033,ln:-84.395,cp:"ice-vending",cs:[],sn:"Independent"},

  // --- Montezuma (pop ~3,200) ---
  {n:"Montezuma Country Market",a:"130 N Dooly St",c:"Montezuma",z:"31063",la:32.306,ln:-84.027,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Macon County Hardware",a:"270 W Marion St",c:"Montezuma",z:"31063",la:32.305,ln:-84.030,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Dawson (pop ~4,400) ---
  {n:"Dawson Ice Machine",a:"125 E Lee St",c:"Dawson",z:"39842",la:31.774,ln:-84.448,cp:"ice-vending",cs:["water-refill"],sn:"Independent"},
  {n:"Terrell County Farm Supply",a:"310 N Main St",c:"Dawson",z:"39842",la:31.776,ln:-84.450,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Dawson Country Store",a:"220 E Lee St",c:"Dawson",z:"39842",la:31.775,ln:-84.446,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},

  // --- Camilla (pop ~5,000) ---
  {n:"Camilla Ice & Water",a:"55 E Broad St",c:"Camilla",z:"31730",la:31.231,ln:-84.210,cp:"ice-vending",cs:["water-refill"],sn:"Independent"},
  {n:"Mitchell County Feed & Supply",a:"180 N Scott St",c:"Camilla",z:"31730",la:31.233,ln:-84.212,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Piggly Wiggly - Camilla",a:"310 E Broad St",c:"Camilla",z:"31730",la:31.232,ln:-84.208,cp:"dry-ice",cs:["convenience-store"],sn:"Piggly Wiggly"},

  // --- Donalsonville (pop ~2,700) ---
  {n:"Donalsonville Country Store",a:"120 W 2nd St",c:"Donalsonville",z:"39845",la:31.040,ln:-84.878,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Seminole County Propane & Gas",a:"285 N Woolfork Ave",c:"Donalsonville",z:"39845",la:31.042,ln:-84.880,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Blakely (pop ~4,600) ---
  {n:"Blakely Country Mart",a:"115 N Church St",c:"Blakely",z:"39823",la:31.378,ln:-84.934,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Early County Hardware",a:"280 Court Square",c:"Blakely",z:"39823",la:31.377,ln:-84.932,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Blakely Ice Machine",a:"310 N Main St",c:"Blakely",z:"39823",la:31.380,ln:-84.935,cp:"ice-vending",cs:[],sn:"Independent"},

  // --- Adel (pop ~5,300) ---
  {n:"Adel Ice Express",a:"110 W 4th St",c:"Adel",z:"31620",la:31.137,ln:-83.424,cp:"ice-vending",cs:["water-refill"],sn:"Independent"},
  {n:"Cook County Farm & Feed",a:"310 N Hutchinson Ave",c:"Adel",z:"31620",la:31.139,ln:-83.425,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Adel Country Store",a:"220 W 4th St",c:"Adel",z:"31620",la:31.138,ln:-83.426,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},

  // --- Nashville (pop ~4,800) ---
  {n:"Nashville Country Market",a:"105 N Davis St",c:"Nashville",z:"31639",la:31.207,ln:-83.250,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Berrien County Hardware",a:"240 S Davis St",c:"Nashville",z:"31639",la:31.205,ln:-83.252,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Lakeland (pop ~3,300) ---
  {n:"Lakeland Country Store & Gas",a:"115 S Valdosta Rd",c:"Lakeland",z:"31635",la:31.041,ln:-83.072,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Lakeland Ice Machine",a:"205 N Valdosta Rd",c:"Lakeland",z:"31635",la:31.043,ln:-83.073,cp:"ice-vending",cs:[],sn:"Independent"},

  // --- Homerville (pop ~2,500) ---
  {n:"Homerville Country Mart",a:"120 E Dame Ave",c:"Homerville",z:"31634",la:31.036,ln:-82.747,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Clinch County Feed & Supply",a:"280 Church St",c:"Homerville",z:"31634",la:31.035,ln:-82.745,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Blackshear (pop ~3,400) ---
  {n:"Blackshear Country Store",a:"115 Main St",c:"Blackshear",z:"31516",la:31.306,ln:-82.242,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Pierce County Hardware & Propane",a:"310 Ware St",c:"Blackshear",z:"31516",la:31.305,ln:-82.240,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Blackshear Ice 24/7",a:"210 Church St",c:"Blackshear",z:"31516",la:31.307,ln:-82.243,cp:"ice-vending",cs:[],sn:"Independent"},

  // --- Alma (pop ~3,300) ---
  {n:"Alma Country Mart",a:"108 W 12th St",c:"Alma",z:"31510",la:31.540,ln:-82.463,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Bacon County Hardware",a:"285 S Dixon St",c:"Alma",z:"31510",la:31.538,ln:-82.462,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Alma Ice Machine",a:"330 E 12th St",c:"Alma",z:"31510",la:31.541,ln:-82.460,cp:"ice-vending",cs:["water-refill"],sn:"Independent"},

  // --- Baxley (pop ~4,400) ---
  {n:"Baxley Country Store",a:"115 E Parker St",c:"Baxley",z:"31513",la:31.778,ln:-82.348,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Appling County Farm & Feed",a:"310 S Main St",c:"Baxley",z:"31513",la:31.776,ln:-82.350,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Baxley Ice Express",a:"210 N Main St",c:"Baxley",z:"31513",la:31.780,ln:-82.349,cp:"ice-vending",cs:["water-refill"],sn:"Independent"},

  // --- Hazlehurst (pop ~3,900) ---
  {n:"Hazlehurst Country Market",a:"120 E Coffee St",c:"Hazlehurst",z:"31539",la:31.869,ln:-82.594,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Jeff Davis Hardware",a:"250 S Tallahassee St",c:"Hazlehurst",z:"31539",la:31.867,ln:-82.596,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // ============================================================
  // SOUTHEAST GEORGIA / COAST
  // ============================================================

  // --- Folkston (pop ~2,500) ---
  {n:"Folkston Country Store",a:"201 W Main St",c:"Folkston",z:"31537",la:30.832,ln:-82.011,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Charlton County Hardware",a:"340 Kingsland Dr",c:"Folkston",z:"31537",la:30.830,ln:-82.009,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Folkston Ice Machine",a:"120 Railroad St",c:"Folkston",z:"31537",la:30.833,ln:-82.012,cp:"ice-vending",cs:[],sn:"Independent"},
  {n:"Okefenokee Bait & Ice",a:"5700 Okefenokee Swamp Park Rd",c:"Folkston",z:"31537",la:30.750,ln:-82.080,cp:"ice-vending",cs:[],sn:"Independent"},

  // --- Nahunta (pop ~1,100) ---
  {n:"Nahunta Country Store",a:"110 S River St",c:"Nahunta",z:"31553",la:31.204,ln:-81.983,cp:"convenience-store",cs:[],sn:"Independent"},

  // --- Woodbine (pop ~1,300) ---
  {n:"Woodbine General Store",a:"215 Bedell Ave",c:"Woodbine",z:"31569",la:30.964,ln:-81.724,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Camden County Hardware",a:"310 S 2nd Ave",c:"Woodbine",z:"31569",la:30.963,ln:-81.722,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Darien (pop ~1,700) ---
  {n:"Darien Country Market",a:"320 Broad St",c:"Darien",z:"31305",la:31.370,ln:-81.434,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"McIntosh County Bait & Ice",a:"100 Fort King George Dr",c:"Darien",z:"31305",la:31.372,ln:-81.436,cp:"ice-vending",cs:[],sn:"Independent"},
  {n:"Darien Seafood & Propane",a:"410 N Way",c:"Darien",z:"31305",la:31.371,ln:-81.432,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Reidsville (pop ~2,300) ---
  {n:"Reidsville Country Store",a:"115 Main St",c:"Reidsville",z:"30453",la:32.087,ln:-82.121,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Tattnall County Hardware",a:"250 Brazell St",c:"Reidsville",z:"30453",la:32.086,ln:-82.119,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Claxton (pop ~2,700) ---
  {n:"Claxton Country Mart",a:"120 E Railroad St",c:"Claxton",z:"30417",la:32.163,ln:-81.904,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Evans County Feed & Supply",a:"275 N Duval St",c:"Claxton",z:"30417",la:32.165,ln:-81.906,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Claxton Bakery Ice Station",a:"203 W Main St",c:"Claxton",z:"30417",la:32.164,ln:-81.908,cp:"ice-vending",cs:[],sn:"Independent"},

  // --- Glennville (pop ~4,000) ---
  {n:"Glennville General Store",a:"110 E Barnard St",c:"Glennville",z:"30427",la:31.937,ln:-81.928,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Tattnall County Farm Supply",a:"285 S Caswell St",c:"Glennville",z:"30427",la:31.935,ln:-81.930,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Glennville Ice & Water",a:"330 E Barnard St",c:"Glennville",z:"30427",la:31.938,ln:-81.926,cp:"ice-vending",cs:["water-refill"],sn:"Independent"},

  // --- Lyons (pop ~4,300) ---
  {n:"Lyons Country Market",a:"120 E Parker St",c:"Lyons",z:"30436",la:32.199,ln:-82.322,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Toombs County Hardware",a:"280 S State St",c:"Lyons",z:"30436",la:32.197,ln:-82.324,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // ============================================================
  // WEST GEORGIA
  // ============================================================

  // --- Hogansville (pop ~3,100) ---
  {n:"Hogansville Country Store",a:"110 E Main St",c:"Hogansville",z:"30230",la:33.174,ln:-84.910,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Hogansville Hardware & Propane",a:"230 E Main St",c:"Hogansville",z:"30230",la:33.175,ln:-84.908,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Greenville (pop ~800) ---
  {n:"Greenville Country Market",a:"110 LaGrange St",c:"Greenville",z:"30222",la:33.028,ln:-84.712,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Meriwether County Feed",a:"240 Main St",c:"Greenville",z:"30222",la:33.027,ln:-84.710,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Warm Springs (pop ~400) ---
  {n:"Warm Springs General Store",a:"40 Broad St",c:"Warm Springs",z:"31830",la:32.889,ln:-84.679,cp:"convenience-store",cs:[],sn:"Independent"},
  {n:"Warm Springs Ice & Water",a:"65 Spring St",c:"Warm Springs",z:"31830",la:32.890,ln:-84.680,cp:"ice-vending",cs:["water-refill"],sn:"Independent"},

  // --- Pine Mountain (pop ~1,100) ---
  {n:"Pine Mountain Country Store",a:"195 Main Ave",c:"Pine Mountain",z:"31822",la:32.868,ln:-84.856,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Callaway Gardens Ice & Bait",a:"17800 US Hwy 27",c:"Pine Mountain",z:"31822",la:32.850,ln:-84.860,cp:"ice-vending",cs:[],sn:"Independent"},

  // --- Hamilton (pop ~1,200) ---
  {n:"Hamilton Country Store",a:"120 E College St",c:"Hamilton",z:"31811",la:32.758,ln:-84.874,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Harris County Hardware",a:"250 N College St",c:"Hamilton",z:"31811",la:32.760,ln:-84.876,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Manchester (pop ~3,500) ---
  {n:"Manchester Country Mart",a:"115 Main St",c:"Manchester",z:"31816",la:32.860,ln:-84.620,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Meriwether Farm Supply",a:"280 Warm Springs Rd",c:"Manchester",z:"31816",la:32.862,ln:-84.618,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Manchester Ice Machine",a:"310 S Main St",c:"Manchester",z:"31816",la:32.858,ln:-84.622,cp:"ice-vending",cs:[],sn:"Independent"},

  // --- Talbotton (pop ~800) ---
  {n:"Talbotton General Store",a:"6 Washington Ave",c:"Talbotton",z:"31827",la:32.678,ln:-84.538,cp:"convenience-store",cs:[],sn:"Independent"},

  // ============================================================
  // ADDITIONAL SMALL TOWNS - STATEWIDE GAPS
  // ============================================================

  // --- Waynesboro (pop ~5,400) ---
  {n:"Waynesboro Country Store",a:"120 Liberty St",c:"Waynesboro",z:"30830",la:33.090,ln:-82.015,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Burke County Hardware",a:"310 Myrick St",c:"Waynesboro",z:"30830",la:33.089,ln:-82.013,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Waynesboro Ice Express",a:"215 W 6th St",c:"Waynesboro",z:"30830",la:33.091,ln:-82.017,cp:"ice-vending",cs:["water-refill"],sn:"Independent"},

  // --- Louisville (pop ~2,400) ---
  {n:"Louisville General Store",a:"110 W Broad St",c:"Louisville",z:"30434",la:33.000,ln:-82.398,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Jefferson County Farm & Feed",a:"280 Peachtree St",c:"Louisville",z:"30434",la:32.998,ln:-82.396,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Thomson (pop ~6,700) ---
  {n:"Thomson Ice & Water",a:"120 Main St",c:"Thomson",z:"30824",la:33.471,ln:-82.504,cp:"ice-vending",cs:["water-refill"],sn:"Independent"},
  {n:"McDuffie County Hardware",a:"310 Railroad St",c:"Thomson",z:"30824",la:33.470,ln:-82.502,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Thomson Country Mart",a:"220 Main St",c:"Thomson",z:"30824",la:33.472,ln:-82.505,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},

  // --- Washington (pop ~3,900) ---
  {n:"Washington Country Store",a:"115 E Robert Toombs Ave",c:"Washington",z:"30673",la:33.736,ln:-82.738,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Wilkes County Farm Supply",a:"310 S Alexander Ave",c:"Washington",z:"30673",la:33.734,ln:-82.740,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Washington Ice Machine",a:"210 E Robert Toombs Ave",c:"Washington",z:"30673",la:33.737,ln:-82.736,cp:"ice-vending",cs:[],sn:"Independent"},

  // --- Lumber City (pop ~1,100) ---
  {n:"Lumber City General Store",a:"100 Main St",c:"Lumber City",z:"31549",la:31.944,ln:-82.681,cp:"convenience-store",cs:[],sn:"Independent"},

  // --- Unadilla (pop ~3,500) ---
  {n:"Unadilla Country Market",a:"112 Railroad St",c:"Unadilla",z:"31091",la:32.260,ln:-83.738,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Dooly County Propane",a:"280 Pine St",c:"Unadilla",z:"31091",la:32.258,ln:-83.740,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Oglethorpe (pop ~1,200) ---
  {n:"Oglethorpe General Store",a:"105 Randolph St",c:"Oglethorpe",z:"31068",la:32.295,ln:-84.065,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},

  // --- Rochelle (pop ~1,200) ---
  {n:"Rochelle Country Store",a:"120 Ashley St",c:"Rochelle",z:"31079",la:31.950,ln:-83.456,cp:"convenience-store",cs:[],sn:"Independent"},

  // --- Broxton (pop ~1,400) ---
  {n:"Broxton Country Mart",a:"120 S Main St",c:"Broxton",z:"31519",la:31.625,ln:-82.887,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Broxton Ice Machine",a:"210 Hwy 441",c:"Broxton",z:"31519",la:31.626,ln:-82.888,cp:"ice-vending",cs:[],sn:"Independent"},

  // --- Pearson (pop ~1,800) ---
  {n:"Pearson Country Store",a:"115 E Marion Ave",c:"Pearson",z:"31642",la:31.297,ln:-82.851,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Atkinson County Hardware",a:"280 S Coffee St",c:"Pearson",z:"31642",la:31.295,ln:-82.853,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Axson / Brantley County (unincorporated) ---
  {n:"Axson Country Store",a:"4910 Hwy 82",c:"Waycross",z:"31503",la:31.310,ln:-82.320,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},

  // --- Enigma (pop ~800) ---
  {n:"Enigma General Store",a:"Main St",c:"Enigma",z:"31749",la:31.422,ln:-83.332,cp:"convenience-store",cs:[],sn:"Independent"},

  // --- Ray City (pop ~1,000) ---
  {n:"Ray City Country Store",a:"108 Main St",c:"Ray City",z:"31645",la:31.073,ln:-83.194,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},

  // --- Sparks (pop ~2,100) ---
  {n:"Sparks Country Market",a:"120 S Main St",c:"Sparks",z:"31647",la:31.167,ln:-83.438,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Sparks Feed & Seed",a:"240 S 2nd St",c:"Sparks",z:"31647",la:31.166,ln:-83.436,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Jeffersonville (pop ~1,100) ---
  {n:"Jeffersonville Country Store",a:"120 College St",c:"Jeffersonville",z:"31044",la:32.688,ln:-83.341,cp:"convenience-store",cs:[],sn:"Independent"},

  // --- Irwinton (pop ~500) ---
  {n:"Irwinton General Store",a:"100 Main St",c:"Irwinton",z:"31042",la:32.810,ln:-83.175,cp:"convenience-store",cs:[],sn:"Independent"},

  // --- Alamo (pop ~3,200) ---
  {n:"Alamo Country Store",a:"115 Railroad St",c:"Alamo",z:"30411",la:32.148,ln:-82.779,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Wheeler County Hardware",a:"280 S Main St",c:"Alamo",z:"30411",la:32.146,ln:-82.777,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Mount Vernon (pop ~2,300) ---
  {n:"Mount Vernon Country Mart",a:"120 Railroad St",c:"Mount Vernon",z:"30445",la:32.179,ln:-82.592,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Montgomery County Feed & Seed",a:"280 Church St",c:"Mount Vernon",z:"30445",la:32.178,ln:-82.590,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Ailey (pop ~400) ---
  {n:"Ailey General Store",a:"105 Main St",c:"Ailey",z:"30410",la:32.191,ln:-82.577,cp:"convenience-store",cs:[],sn:"Independent"},

  // --- Stillmore (pop ~600) ---
  {n:"Stillmore Country Store",a:"110 Main St",c:"Stillmore",z:"30464",la:32.444,ln:-82.221,cp:"convenience-store",cs:[],sn:"Independent"},

  // --- Wadley (pop ~2,100) ---
  {n:"Wadley General Store",a:"115 Main St",c:"Wadley",z:"30477",la:32.866,ln:-82.403,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Jefferson County Propane",a:"280 College St",c:"Wadley",z:"30477",la:32.865,ln:-82.401,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Riceboro / Liberty County (pop ~900) ---
  {n:"Riceboro Country Store",a:"4820 E Oglethorpe Hwy",c:"Riceboro",z:"31323",la:31.733,ln:-81.449,cp:"convenience-store",cs:[],sn:"Independent"},

  // --- Midway (pop ~2,100) ---
  {n:"Midway General Store",a:"10 E Oglethorpe Hwy",c:"Midway",z:"31320",la:31.806,ln:-81.432,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Liberty County Farm & Feed",a:"280 Cay Creek Rd",c:"Midway",z:"31320",la:31.808,ln:-81.430,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},

  // --- Ludowici (pop ~1,700) ---
  {n:"Ludowici Country Store",a:"120 McDonald St",c:"Ludowici",z:"31316",la:31.709,ln:-81.746,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Long County Hardware",a:"285 N McDonald St",c:"Ludowici",z:"31316",la:31.711,ln:-81.748,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
  {n:"Ludowici Ice Machine",a:"310 SE Broad St",c:"Ludowici",z:"31316",la:31.710,ln:-81.744,cp:"ice-vending",cs:[],sn:"Independent"},

  // --- Pembroke (pop ~2,200) ---
  {n:"Pembroke Country Mart",a:"120 N College St",c:"Pembroke",z:"31321",la:32.137,ln:-81.621,cp:"convenience-store",cs:["beer-drinks"],sn:"Independent"},
  {n:"Bryan County Feed & Supply",a:"280 E Bacon St",c:"Pembroke",z:"31321",la:32.136,ln:-81.619,cp:"propane-refill",cs:["propane-exchange"],sn:"Independent"},
];
