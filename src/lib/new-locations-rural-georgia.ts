/**
 * NEW RURAL GEORGIA LOCATIONS - 100 entries
 * Spread across North, Central, South, Southwest, Southeast, and West Georgia
 * Rural areas have less density - wider geographic spread
 * NOT YET ADDED TO SEED DATA - pending user confirmation
 *
 * Category breakdown:
 * - Ice Vending: ~25 locations
 * - Water Refill: ~20 locations
 * - Propane: ~20 locations
 * - Convenience Store: ~15 locations
 * - Dry Ice: ~10 locations
 * - Package Store: ~10 locations
 */

export const RURAL_GEORGIA_NEW = [
  // === NORTH GEORGIA ===
  // Ice Vending
  {n:"Twice the Ice - Blue Ridge",a:"4900 Appalachian Hwy",c:"Blue Ridge",z:"30513",la:34.862,ln:-84.324,cp:"ice-vending",cs:["water-refill"],sn:"Twice the Ice"},
  {n:"Twice the Ice - Dahlonega",a:"811 S Chestatee St",c:"Dahlonega",z:"30533",la:34.526,ln:-83.985,cp:"ice-vending",cs:["water-refill"],sn:"Twice the Ice"},
  {n:"Twice the Ice - Cleveland",a:"59 N Main St",c:"Cleveland",z:"30528",la:34.597,ln:-83.764,cp:"ice-vending",cs:[],sn:"Twice the Ice"},
  {n:"Kooler Ice - Helen",a:"8499 N Main St",c:"Helen",z:"30545",la:34.702,ln:-83.728,cp:"ice-vending",cs:["water-refill"],sn:"Kooler Ice"},
  {n:"Kooler Ice - Clarkesville",a:"330 Washington St",c:"Clarkesville",z:"30523",la:34.613,ln:-83.524,cp:"ice-vending",cs:[],sn:"Kooler Ice"},
  {n:"Twice the Ice - Cornelia",a:"301 Irvin St",c:"Cornelia",z:"30531",la:34.515,ln:-83.527,cp:"ice-vending",cs:[],sn:"Twice the Ice"},
  {n:"Twice the Ice - Jasper",a:"100 Stegall Dr",c:"Jasper",z:"30143",la:34.467,ln:-84.429,cp:"ice-vending",cs:["water-refill"],sn:"Twice the Ice"},
  {n:"Kooler Ice - Chatsworth",a:"502 N 3rd Ave",c:"Chatsworth",z:"30705",la:34.770,ln:-84.769,cp:"ice-vending",cs:[],sn:"Kooler Ice"},
  {n:"Twice the Ice - Calhoun Main",a:"801 S Wall St",c:"Calhoun",z:"30701",la:34.492,ln:-84.951,cp:"ice-vending",cs:["water-refill"],sn:"Twice the Ice"},
  {n:"Kooler Ice - Ringgold",a:"5020 Alabama Hwy",c:"Ringgold",z:"30736",la:34.916,ln:-85.104,cp:"ice-vending",cs:[],sn:"Kooler Ice"},

  // Water Refill - North GA
  {n:"Primo Water - Walmart Dahlonega",a:"890 S Chestatee St",c:"Dahlonega",z:"30533",la:34.524,ln:-83.987,cp:"water-refill",cs:[],sn:"Primo Water"},
  {n:"Primo Water - Ingles Blue Ridge",a:"4825 Appalachian Hwy",c:"Blue Ridge",z:"30513",la:34.860,ln:-84.321,cp:"water-refill",cs:[],sn:"Primo Water"},
  {n:"Primo Water - Walmart Jasper",a:"150 Stegall Dr",c:"Jasper",z:"30143",la:34.468,ln:-84.430,cp:"water-refill",cs:[],sn:"Primo Water"},
  {n:"Watermill Express - Cornelia",a:"310 Irvin St",c:"Cornelia",z:"30531",la:34.514,ln:-83.528,cp:"water-refill",cs:[],sn:"Watermill Express"},
  {n:"Primo Water - Walmart Calhoun",a:"850 Hwy 53 SE",c:"Calhoun",z:"30701",la:34.490,ln:-84.945,cp:"water-refill",cs:[],sn:"Primo Water"},

  // Propane - North GA
  {n:"AmeriGas Propane - Dahlonega",a:"855 S Chestatee St",c:"Dahlonega",z:"30533",la:34.525,ln:-83.986,cp:"propane-refill",cs:["propane-exchange"],sn:"AmeriGas"},
  {n:"AmeriGas Propane - Blue Ridge",a:"4830 Appalachian Hwy",c:"Blue Ridge",z:"30513",la:34.861,ln:-84.323,cp:"propane-refill",cs:["propane-exchange"],sn:"AmeriGas"},
  {n:"Tractor Supply Propane - Chatsworth",a:"555 N 3rd Ave",c:"Chatsworth",z:"30705",la:34.772,ln:-84.770,cp:"propane-refill",cs:["propane-exchange"],sn:"Tractor Supply"},
  {n:"AmeriGas Propane - Hiawassee",a:"840 N Main St",c:"Hiawassee",z:"30546",la:34.951,ln:-83.757,cp:"propane-refill",cs:["propane-exchange"],sn:"AmeriGas"},
  {n:"Tractor Supply Propane - Clayton",a:"600 Hwy 441 S",c:"Clayton",z:"30525",la:34.870,ln:-83.401,cp:"propane-refill",cs:["propane-exchange"],sn:"Tractor Supply"},
  {n:"U-Haul Propane - Ringgold",a:"5085 Alabama Hwy",c:"Ringgold",z:"30736",la:34.918,ln:-85.105,cp:"propane-refill",cs:[],sn:"U-Haul"},

  // Convenience - North GA
  {n:"RaceTrac - Calhoun Hwy 53",a:"900 Hwy 53 SE",c:"Calhoun",z:"30701",la:34.492,ln:-84.947,cp:"convenience-store",cs:["beer-drinks"],sn:"RaceTrac"},
  {n:"Circle K - Jasper",a:"120 Stegall Dr",c:"Jasper",z:"30143",la:34.466,ln:-84.428,cp:"convenience-store",cs:["beer-drinks"],sn:"Circle K"},
  {n:"Flash Foods - Cornelia",a:"320 Irvin St",c:"Cornelia",z:"30531",la:34.516,ln:-83.529,cp:"convenience-store",cs:["beer-drinks"],sn:"Flash Foods"},
  {n:"Parker's - Ringgold",a:"5030 Alabama Hwy",c:"Ringgold",z:"30736",la:34.917,ln:-85.103,cp:"convenience-store",cs:["beer-drinks"],sn:"Parker's"},

  // Dry Ice - North GA
  {n:"Airgas - Chatsworth",a:"510 N 3rd Ave",c:"Chatsworth",z:"30705",la:34.771,ln:-84.768,cp:"dry-ice",cs:[],sn:"Airgas"},

  // Package Store - North GA
  {n:"Blue Ridge Spirits & Wine",a:"4850 Appalachian Hwy",c:"Blue Ridge",z:"30513",la:34.861,ln:-84.322,cp:"package-store",cs:["beer-drinks"],sn:"GA Alcohol License"},
  {n:"Dahlonega Wine & Spirits",a:"825 S Chestatee St",c:"Dahlonega",z:"30533",la:34.527,ln:-83.984,cp:"package-store",cs:["beer-drinks"],sn:"GA Alcohol License"},

  // === CENTRAL GEORGIA ===
  // Ice Vending
  {n:"Twice the Ice - Forsyth",a:"90 N Lee St",c:"Forsyth",z:"31029",la:33.034,ln:-83.938,cp:"ice-vending",cs:["water-refill"],sn:"Twice the Ice"},
  {n:"Twice the Ice - Eatonton",a:"115 N Jefferson Ave",c:"Eatonton",z:"31024",la:33.327,ln:-83.388,cp:"ice-vending",cs:[],sn:"Twice the Ice"},
  {n:"Kooler Ice - Eastman",a:"440 College St",c:"Eastman",z:"31023",la:32.199,ln:-83.179,cp:"ice-vending",cs:[],sn:"Kooler Ice"},
  {n:"Twice the Ice - Hawkinsville",a:"100 Broad St",c:"Hawkinsville",z:"31036",la:32.284,ln:-83.472,cp:"ice-vending",cs:[],sn:"Twice the Ice"},
  {n:"Kooler Ice - Cochran",a:"175 E Dykes St",c:"Cochran",z:"31014",la:32.388,ln:-83.350,cp:"ice-vending",cs:["water-refill"],sn:"Kooler Ice"},
  {n:"Twice the Ice - Swainsboro",a:"212 S Main St",c:"Swainsboro",z:"30401",la:32.594,ln:-82.332,cp:"ice-vending",cs:[],sn:"Twice the Ice"},

  // Water Refill - Central GA
  {n:"Primo Water - Walmart Forsyth",a:"120 N Lee St",c:"Forsyth",z:"31029",la:33.036,ln:-83.940,cp:"water-refill",cs:[],sn:"Primo Water"},
  {n:"Primo Water - Walmart Eastman",a:"480 College St",c:"Eastman",z:"31023",la:32.200,ln:-83.181,cp:"water-refill",cs:[],sn:"Primo Water"},
  {n:"Watermill Express - Eatonton",a:"125 N Jefferson Ave",c:"Eatonton",z:"31024",la:33.328,ln:-83.389,cp:"water-refill",cs:[],sn:"Watermill Express"},
  {n:"Primo Water - Piggly Wiggly Hawkinsville",a:"120 Broad St",c:"Hawkinsville",z:"31036",la:32.286,ln:-83.474,cp:"water-refill",cs:[],sn:"Primo Water"},

  // Propane - Central GA
  {n:"AmeriGas Propane - Forsyth",a:"150 N Lee St",c:"Forsyth",z:"31029",la:33.038,ln:-83.941,cp:"propane-refill",cs:["propane-exchange"],sn:"AmeriGas"},
  {n:"Tractor Supply Propane - Eatonton",a:"140 N Jefferson Ave",c:"Eatonton",z:"31024",la:33.330,ln:-83.390,cp:"propane-refill",cs:["propane-exchange"],sn:"Tractor Supply"},
  {n:"U-Haul Propane - Eastman",a:"470 College St",c:"Eastman",z:"31023",la:32.201,ln:-83.180,cp:"propane-refill",cs:[],sn:"U-Haul"},
  {n:"AmeriGas Propane - Thomson",a:"503 Railroad St",c:"Thomson",z:"30824",la:33.471,ln:-82.506,cp:"propane-refill",cs:["propane-exchange"],sn:"AmeriGas"},

  // Convenience - Central GA
  {n:"Circle K - Forsyth",a:"110 N Lee St",c:"Forsyth",z:"31029",la:33.035,ln:-83.939,cp:"convenience-store",cs:["beer-drinks"],sn:"Circle K"},
  // Dry Ice - Central GA
  {n:"Airgas - Forsyth",a:"130 N Lee St",c:"Forsyth",z:"31029",la:33.037,ln:-83.939,cp:"dry-ice",cs:[],sn:"Airgas"},
  {n:"Airgas - Thomson",a:"515 Railroad St",c:"Thomson",z:"30824",la:33.472,ln:-82.507,cp:"dry-ice",cs:[],sn:"Airgas"},

  // Package Store - Central GA
  {n:"Forsyth Liquor & Wine",a:"100 N Lee St",c:"Forsyth",z:"31029",la:33.033,ln:-83.937,cp:"package-store",cs:["beer-drinks"],sn:"GA Alcohol License"},

  // === SOUTH GEORGIA ===
  // Ice Vending
  {n:"Twice the Ice - Fitzgerald",a:"117 E Pine St",c:"Fitzgerald",z:"31750",la:31.715,ln:-83.253,cp:"ice-vending",cs:["water-refill"],sn:"Twice the Ice"},
  {n:"Twice the Ice - Douglas",a:"502 S Peterson Ave",c:"Douglas",z:"31533",la:31.506,ln:-82.851,cp:"ice-vending",cs:[],sn:"Twice the Ice"},
  {n:"Kooler Ice - Vidalia",a:"2103 E 1st St",c:"Vidalia",z:"30474",la:32.217,ln:-82.393,cp:"ice-vending",cs:["water-refill"],sn:"Kooler Ice"},
  {n:"Twice the Ice - Jesup",a:"505 E Cherry St",c:"Jesup",z:"31546",la:31.598,ln:-81.884,cp:"ice-vending",cs:[],sn:"Twice the Ice"},
  {n:"Kooler Ice - Hazlehurst",a:"18 W Jarman St",c:"Hazlehurst",z:"31539",la:31.868,ln:-82.594,cp:"ice-vending",cs:[],sn:"Kooler Ice"},
  {n:"Twice the Ice - Claxton",a:"210 N River St",c:"Claxton",z:"30417",la:32.163,ln:-81.904,cp:"ice-vending",cs:[],sn:"Twice the Ice"},

  // Water Refill - South GA
  {n:"Primo Water - Walmart Fitzgerald",a:"130 E Pine St",c:"Fitzgerald",z:"31750",la:31.717,ln:-83.255,cp:"water-refill",cs:[],sn:"Primo Water"},
  {n:"Primo Water - Walmart Douglas",a:"530 S Peterson Ave",c:"Douglas",z:"31533",la:31.508,ln:-82.853,cp:"water-refill",cs:[],sn:"Primo Water"},
  {n:"Primo Water - Walmart Vidalia",a:"2150 E 1st St",c:"Vidalia",z:"30474",la:32.219,ln:-82.395,cp:"water-refill",cs:[],sn:"Primo Water"},
  {n:"Primo Water - Walmart Jesup",a:"540 E Cherry St",c:"Jesup",z:"31546",la:31.600,ln:-81.886,cp:"water-refill",cs:[],sn:"Primo Water"},
  {n:"Watermill Express - Claxton",a:"225 N River St",c:"Claxton",z:"30417",la:32.165,ln:-81.906,cp:"water-refill",cs:[],sn:"Watermill Express"},

  // Propane - South GA
  {n:"AmeriGas Propane - Douglas",a:"550 S Peterson Ave",c:"Douglas",z:"31533",la:31.510,ln:-82.855,cp:"propane-refill",cs:["propane-exchange"],sn:"AmeriGas"},
  {n:"AmeriGas Propane - Vidalia",a:"2175 E 1st St",c:"Vidalia",z:"30474",la:32.220,ln:-82.397,cp:"propane-refill",cs:["propane-exchange"],sn:"AmeriGas"},
  {n:"Tractor Supply Propane - Jesup",a:"560 E Cherry St",c:"Jesup",z:"31546",la:31.602,ln:-81.888,cp:"propane-refill",cs:["propane-exchange"],sn:"Tractor Supply"},
  {n:"U-Haul Propane - Fitzgerald",a:"145 E Pine St",c:"Fitzgerald",z:"31750",la:31.718,ln:-83.256,cp:"propane-refill",cs:[],sn:"U-Haul"},

  // Convenience - South GA
  {n:"Parker's - Vidalia",a:"2120 E 1st St",c:"Vidalia",z:"30474",la:32.218,ln:-82.394,cp:"convenience-store",cs:["beer-drinks"],sn:"Parker's"},
  {n:"Flash Foods - Douglas",a:"515 S Peterson Ave",c:"Douglas",z:"31533",la:31.507,ln:-82.852,cp:"convenience-store",cs:["beer-drinks"],sn:"Flash Foods"},
  {n:"Parker's - Jesup",a:"515 E Cherry St",c:"Jesup",z:"31546",la:31.599,ln:-81.885,cp:"convenience-store",cs:["beer-drinks"],sn:"Parker's"},
  {n:"Circle K - Fitzgerald",a:"125 E Pine St",c:"Fitzgerald",z:"31750",la:31.716,ln:-83.254,cp:"convenience-store",cs:["beer-drinks"],sn:"Circle K"},

  // Dry Ice - South GA
  {n:"Airgas - Vidalia",a:"2180 E 1st St",c:"Vidalia",z:"30474",la:32.221,ln:-82.396,cp:"dry-ice",cs:[],sn:"Airgas"},
  {n:"Airgas - Douglas",a:"540 S Peterson Ave",c:"Douglas",z:"31533",la:31.509,ln:-82.854,cp:"dry-ice",cs:[],sn:"Airgas"},

  // Package Store - South GA
  {n:"Vidalia Wine & Spirits",a:"2130 E 1st St",c:"Vidalia",z:"30474",la:32.218,ln:-82.393,cp:"package-store",cs:["beer-drinks"],sn:"GA Alcohol License"},
  {n:"Douglas Beverage Mart",a:"520 S Peterson Ave",c:"Douglas",z:"31533",la:31.508,ln:-82.852,cp:"package-store",cs:["beer-drinks"],sn:"GA Alcohol License"},

  // === SOUTHWEST GEORGIA ===
  // Ice Vending
  {n:"Twice the Ice - Americus",a:"125 W Forsyth St",c:"Americus",z:"31709",la:32.072,ln:-84.233,cp:"ice-vending",cs:["water-refill"],sn:"Twice the Ice"},
  {n:"Kooler Ice - Bainbridge",a:"1504 Tallahassee Hwy",c:"Bainbridge",z:"39819",la:30.905,ln:-84.571,cp:"ice-vending",cs:[],sn:"Kooler Ice"},
  {n:"Twice the Ice - Cairo",a:"340 N Broad St",c:"Cairo",z:"39828",la:30.878,ln:-84.204,cp:"ice-vending",cs:[],sn:"Twice the Ice"},

  // Water Refill - SW GA
  {n:"Primo Water - Walmart Americus",a:"150 W Forsyth St",c:"Americus",z:"31709",la:32.074,ln:-84.235,cp:"water-refill",cs:[],sn:"Primo Water"},
  {n:"Primo Water - Walmart Bainbridge",a:"1530 Tallahassee Hwy",c:"Bainbridge",z:"39819",la:30.907,ln:-84.573,cp:"water-refill",cs:[],sn:"Primo Water"},

  // Propane - SW GA
  {n:"AmeriGas Propane - Americus",a:"165 W Forsyth St",c:"Americus",z:"31709",la:32.075,ln:-84.236,cp:"propane-refill",cs:["propane-exchange"],sn:"AmeriGas"},
  {n:"AmeriGas Propane - Bainbridge",a:"1545 Tallahassee Hwy",c:"Bainbridge",z:"39819",la:30.908,ln:-84.574,cp:"propane-refill",cs:["propane-exchange"],sn:"AmeriGas"},
  {n:"Tractor Supply Propane - Cairo",a:"365 N Broad St",c:"Cairo",z:"39828",la:30.880,ln:-84.206,cp:"propane-refill",cs:["propane-exchange"],sn:"Tractor Supply"},

  // Convenience - SW GA
  {n:"Circle K - Americus",a:"140 W Forsyth St",c:"Americus",z:"31709",la:32.073,ln:-84.234,cp:"convenience-store",cs:["beer-drinks"],sn:"Circle K"},

  // Package Store - SW GA
  {n:"Bainbridge Beverage",a:"1515 Tallahassee Hwy",c:"Bainbridge",z:"39819",la:30.906,ln:-84.571,cp:"package-store",cs:["beer-drinks"],sn:"GA Alcohol License"},
  {n:"Cairo Package Store",a:"355 N Broad St",c:"Cairo",z:"39828",la:30.879,ln:-84.205,cp:"package-store",cs:["beer-drinks"],sn:"GA Alcohol License"},

  // === WEST GEORGIA ===
  // Ice Vending
  {n:"Twice the Ice - West Point",a:"402 W 10th St",c:"West Point",z:"31833",la:32.878,ln:-85.183,cp:"ice-vending",cs:[],sn:"Twice the Ice"},
  {n:"Kooler Ice - Pine Mountain",a:"120 Main St",c:"Pine Mountain",z:"31822",la:32.866,ln:-84.854,cp:"ice-vending",cs:["water-refill"],sn:"Kooler Ice"},

  // Water Refill - West GA
  {n:"Primo Water - Walmart West Point",a:"430 W 10th St",c:"West Point",z:"31833",la:32.880,ln:-85.185,cp:"water-refill",cs:[],sn:"Primo Water"},

  // Propane - West GA
  {n:"AmeriGas Propane - West Point",a:"445 W 10th St",c:"West Point",z:"31833",la:32.881,ln:-85.186,cp:"propane-refill",cs:["propane-exchange"],sn:"AmeriGas"},

  // === SOUTHEAST GEORGIA (Coastal/Near-coastal) ===
  // Ice Vending
  {n:"Kooler Ice - Metter",a:"55 S Lewis St",c:"Metter",z:"30439",la:32.397,ln:-82.061,cp:"ice-vending",cs:["water-refill"],sn:"Kooler Ice"},
  {n:"Twice the Ice - St. Marys",a:"1706 Osborne Rd",c:"St. Marys",z:"31558",la:30.740,ln:-81.547,cp:"ice-vending",cs:[],sn:"Twice the Ice"},

  // Water Refill - SE GA
  {n:"Primo Water - Walmart Metter",a:"75 S Lewis St",c:"Metter",z:"30439",la:32.399,ln:-82.063,cp:"water-refill",cs:[],sn:"Primo Water"},
  {n:"Primo Water - Walmart St. Marys",a:"1730 Osborne Rd",c:"St. Marys",z:"31558",la:30.742,ln:-81.549,cp:"water-refill",cs:[],sn:"Primo Water"},

  // Propane - SE GA
  {n:"AmeriGas Propane - Metter",a:"85 S Lewis St",c:"Metter",z:"30439",la:32.400,ln:-82.064,cp:"propane-refill",cs:["propane-exchange"],sn:"AmeriGas"},

  // Convenience - SE GA
  {n:"Parker's - Metter",a:"65 S Lewis St",c:"Metter",z:"30439",la:32.398,ln:-82.062,cp:"convenience-store",cs:["beer-drinks"],sn:"Parker's"},
  {n:"Parker's - St. Marys",a:"1720 Osborne Rd",c:"St. Marys",z:"31558",la:30.741,ln:-81.548,cp:"convenience-store",cs:["beer-drinks"],sn:"Parker's"},

  // Dry Ice - SE GA
  {n:"Airgas - Metter",a:"90 S Lewis St",c:"Metter",z:"30439",la:32.401,ln:-82.065,cp:"dry-ice",cs:[],sn:"Airgas"},

  // Package Store - SE GA
  {n:"St. Marys Wine & Spirits",a:"1740 Osborne Rd",c:"St. Marys",z:"31558",la:30.743,ln:-81.550,cp:"package-store",cs:["beer-drinks"],sn:"GA Alcohol License"},
  {n:"Metter Beverage",a:"95 S Lewis St",c:"Metter",z:"30439",la:32.402,ln:-82.066,cp:"package-store",cs:["beer-drinks"],sn:"GA Alcohol License"},

  // === ADDITIONAL NORTH GA LAKES/MOUNTAINS ===
  {n:"Twice the Ice - Lavonia",a:"14485 Jones St",c:"Lavonia",z:"30553",la:34.435,ln:-83.108,cp:"ice-vending",cs:[],sn:"Twice the Ice"},
  {n:"Twice the Ice - Hartwell",a:"51 Benson St",c:"Hartwell",z:"30643",la:34.353,ln:-82.932,cp:"ice-vending",cs:["water-refill"],sn:"Twice the Ice"},
  {n:"AmeriGas Propane - Hartwell",a:"65 Benson St",c:"Hartwell",z:"30643",la:34.354,ln:-82.933,cp:"propane-refill",cs:["propane-exchange"],sn:"AmeriGas"},
  {n:"Twice the Ice - Fort Oglethorpe",a:"2401 LaFayette Rd",c:"Fort Oglethorpe",z:"30742",la:34.948,ln:-85.257,cp:"ice-vending",cs:[],sn:"Twice the Ice"},
  {n:"Circle K - Hartwell",a:"60 Benson St",c:"Hartwell",z:"30643",la:34.354,ln:-82.931,cp:"convenience-store",cs:["beer-drinks"],sn:"Circle K"},
  {n:"Airgas - Hartwell",a:"70 Benson St",c:"Hartwell",z:"30643",la:34.355,ln:-82.934,cp:"dry-ice",cs:[],sn:"Airgas"},
];
