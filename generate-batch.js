#!/usr/bin/env node

// Batch generator for Georgia location listings
// Usage: node generate-batch.js <startId> <count>
// Example: node generate-batch.js 1141 500

const START_ID = parseInt(process.argv[2] || "1141", 10);
const COUNT = parseInt(process.argv[3] || "500", 10);

// ======== COMPREHENSIVE GEORGIA CITY DATABASE ========
const cities = {
  metroAtlanta: [
    { name: "Sandy Springs", zip: "30328", lat: 33.9304, lng: -84.3733, density: [7,10] },
    { name: "Roswell", zip: "30075", lat: 34.0232, lng: -84.3616, density: [7,10] },
    { name: "Alpharetta", zip: "30009", lat: 34.0754, lng: -84.2941, density: [7,10] },
    { name: "Johns Creek", zip: "30097", lat: 34.0289, lng: -84.1984, density: [7,10] },
    { name: "Dunwoody", zip: "30338", lat: 33.9462, lng: -84.3346, density: [7,10] },
    { name: "Brookhaven", zip: "30319", lat: 33.8654, lng: -84.3365, density: [7,10] },
    { name: "Tucker", zip: "30084", lat: 33.8554, lng: -84.2171, density: [7,9] },
    { name: "Lilburn", zip: "30047", lat: 33.8901, lng: -84.1430, density: [7,9] },
    { name: "Snellville", zip: "30078", lat: 33.8573, lng: -84.0199, density: [7,9] },
    { name: "Lawrenceville", zip: "30046", lat: 33.9562, lng: -83.9880, density: [7,9] },
    { name: "Duluth", zip: "30096", lat: 34.0029, lng: -84.1446, density: [7,9] },
    { name: "Suwanee", zip: "30024", lat: 34.0515, lng: -84.0713, density: [7,9] },
    { name: "Buford", zip: "30518", lat: 34.1207, lng: -83.9910, density: [6,8] },
    { name: "Flowery Branch", zip: "30542", lat: 34.1851, lng: -83.9252, density: [5,7] },
    { name: "Gainesville", zip: "30501", lat: 34.2979, lng: -83.8241, density: [5,7] },
    { name: "Winder", zip: "30680", lat: 33.9926, lng: -83.7202, density: [4,6] },
    { name: "Monroe", zip: "30655", lat: 33.7948, lng: -83.7133, density: [4,6] },
    { name: "Conyers", zip: "30012", lat: 33.6676, lng: -84.0177, density: [7,9] },
    { name: "Covington", zip: "30014", lat: 33.5968, lng: -83.8602, density: [5,7] },
    { name: "McDonough", zip: "30253", lat: 33.4473, lng: -84.1469, density: [7,9] },
    { name: "Stockbridge", zip: "30281", lat: 33.5443, lng: -84.2338, density: [7,9] },
    { name: "Jonesboro", zip: "30236", lat: 33.5215, lng: -84.3538, density: [7,9] },
    { name: "Riverdale", zip: "30274", lat: 33.5724, lng: -84.4133, density: [7,9] },
    { name: "College Park", zip: "30337", lat: 33.6534, lng: -84.4494, density: [7,9] },
    { name: "East Point", zip: "30344", lat: 33.6795, lng: -84.4393, density: [7,9] },
    { name: "Hapeville", zip: "30354", lat: 33.6601, lng: -84.4102, density: [7,9] },
    { name: "Smyrna", zip: "30080", lat: 33.8839, lng: -84.5144, density: [7,10] },
    { name: "Vinings", zip: "30339", lat: 33.8651, lng: -84.4681, density: [7,9] },
    { name: "Mableton", zip: "30126", lat: 33.8156, lng: -84.5819, density: [7,9] },
    { name: "Austell", zip: "30106", lat: 33.8126, lng: -84.6344, density: [7,9] },
    { name: "Powder Springs", zip: "30127", lat: 33.8595, lng: -84.6838, density: [7,9] },
    { name: "Kennesaw", zip: "30144", lat: 34.0234, lng: -84.6155, density: [7,10] },
    { name: "Acworth", zip: "30101", lat: 34.0651, lng: -84.6769, density: [6,8] },
    { name: "Woodstock", zip: "30188", lat: 34.1015, lng: -84.5194, density: [7,9] },
    { name: "Canton", zip: "30114", lat: 34.2368, lng: -84.4908, density: [6,8] },
    { name: "Holly Springs", zip: "30115", lat: 34.1740, lng: -84.5024, density: [6,8] },
    { name: "Ball Ground", zip: "30107", lat: 34.3382, lng: -84.3758, density: [4,6] },
    { name: "Peachtree City", zip: "30269", lat: 33.3968, lng: -84.5957, density: [7,9] },
    { name: "Fayetteville", zip: "30214", lat: 33.4498, lng: -84.4549, density: [7,9] },
    { name: "Newnan", zip: "30263", lat: 33.3807, lng: -84.7997, density: [6,8] },
    { name: "Carrollton", zip: "30117", lat: 33.5801, lng: -85.0766, density: [5,7] },
    { name: "Dallas", zip: "30132", lat: 33.9243, lng: -84.8410, density: [6,8] },
    { name: "Hiram", zip: "30141", lat: 33.8757, lng: -84.7663, density: [6,8] },
    // Additional metro Atlanta
    { name: "Decatur", zip: "30030", lat: 33.7748, lng: -84.2963, density: [8,10] },
    { name: "Stone Mountain", zip: "30083", lat: 33.8081, lng: -84.1702, density: [7,9] },
    { name: "Clarkston", zip: "30021", lat: 33.8095, lng: -84.2399, density: [7,9] },
    { name: "Avondale Estates", zip: "30002", lat: 33.7712, lng: -84.2671, density: [7,9] },
    { name: "Pine Lake", zip: "30072", lat: 33.7905, lng: -84.2099, density: [6,8] },
    { name: "Redan", zip: "30074", lat: 33.7451, lng: -84.1332, density: [7,9] },
    { name: "Lithonia", zip: "30058", lat: 33.7112, lng: -84.1052, density: [7,9] },
    { name: "Ellenwood", zip: "30294", lat: 33.6351, lng: -84.2755, density: [7,9] },
    { name: "Rex", zip: "30273", lat: 33.5880, lng: -84.2730, density: [6,8] },
    { name: "Morrow", zip: "30260", lat: 33.5832, lng: -84.3394, density: [7,9] },
    { name: "Forest Park", zip: "30297", lat: 33.6218, lng: -84.3691, density: [7,9] },
    { name: "Lake City", zip: "30260", lat: 33.6065, lng: -84.3355, density: [6,8] },
    { name: "Lovejoy", zip: "30250", lat: 33.4365, lng: -84.3147, density: [6,8] },
    { name: "Hampton", zip: "30228", lat: 33.3851, lng: -84.2830, density: [5,7] },
    { name: "Locust Grove", zip: "30248", lat: 33.3465, lng: -84.1094, density: [5,7] },
    { name: "Griffin", zip: "30223", lat: 33.2468, lng: -84.2641, density: [5,7] },
    { name: "Senoia", zip: "30276", lat: 33.3018, lng: -84.5547, density: [5,7] },
    { name: "Tyrone", zip: "30290", lat: 33.4729, lng: -84.5961, density: [6,8] },
    { name: "Fairburn", zip: "30213", lat: 33.5671, lng: -84.5797, density: [6,8] },
    { name: "Palmetto", zip: "30268", lat: 33.5182, lng: -84.6672, density: [5,7] },
    { name: "Union City", zip: "30291", lat: 33.5868, lng: -84.5424, density: [7,9] },
    { name: "Peachtree Corners", zip: "30092", lat: 33.9701, lng: -84.2215, density: [7,10] },
    { name: "Norcross", zip: "30093", lat: 33.9413, lng: -84.2135, density: [7,9] },
    { name: "Doraville", zip: "30340", lat: 33.8984, lng: -84.2835, density: [7,9] },
    { name: "Chamblee", zip: "30341", lat: 33.8879, lng: -84.3046, density: [7,9] },
    { name: "Buckhead", zip: "30305", lat: 33.8384, lng: -84.3788, density: [8,10] },
    { name: "Midtown Atlanta", zip: "30308", lat: 33.7866, lng: -84.3841, density: [9,10] },
    { name: "Downtown Atlanta", zip: "30303", lat: 33.7537, lng: -84.3901, density: [9,10] },
    { name: "West End", zip: "30310", lat: 33.7359, lng: -84.4127, density: [7,9] },
    { name: "East Atlanta", zip: "30316", lat: 33.7397, lng: -84.3407, density: [7,9] },
    { name: "Grant Park", zip: "30312", lat: 33.7400, lng: -84.3709, density: [7,9] },
    { name: "Kirkwood", zip: "30317", lat: 33.7570, lng: -84.3310, density: [7,9] },
    { name: "Edgewood", zip: "30307", lat: 33.7552, lng: -84.3396, density: [7,9] },
    { name: "Virginia-Highland", zip: "30306", lat: 33.7847, lng: -84.3519, density: [8,10] },
    { name: "Druid Hills", zip: "30329", lat: 33.7812, lng: -84.3311, density: [7,9] },
    { name: "North Druid Hills", zip: "30329", lat: 33.8168, lng: -84.3133, density: [7,9] },
    { name: "Emory", zip: "30322", lat: 33.7908, lng: -84.3259, density: [7,9] },
    { name: "Candler Park", zip: "30307", lat: 33.7618, lng: -84.3358, density: [7,9] },
    { name: "Inman Park", zip: "30307", lat: 33.7609, lng: -84.3553, density: [8,10] },
    { name: "Old Fourth Ward", zip: "30308", lat: 33.7682, lng: -84.3650, density: [8,10] },
    { name: "Cabbagetown", zip: "30312", lat: 33.7506, lng: -84.3637, density: [7,9] },
    { name: "Vine City", zip: "30314", lat: 33.7564, lng: -84.4127, density: [7,9] },
    { name: "Bankhead", zip: "30318", lat: 33.7799, lng: -84.4469, density: [6,8] },
    { name: "Collier Hills", zip: "30309", lat: 33.8054, lng: -84.4102, density: [7,9] },
    { name: "Bolton", zip: "30318", lat: 33.7949, lng: -84.4706, density: [6,8] },
    { name: "Cascade Heights", zip: "30311", lat: 33.7108, lng: -84.4595, density: [6,8] },
    { name: "Ben Hill", zip: "30311", lat: 33.6939, lng: -84.4697, density: [6,8] },
    { name: "Camp Creek", zip: "30331", lat: 33.6508, lng: -84.5122, density: [6,8] },
    { name: "Lithia Springs", zip: "30122", lat: 33.7940, lng: -84.6606, density: [6,8] },
    { name: "Douglasville", zip: "30134", lat: 33.7515, lng: -84.7477, density: [6,8] },
    { name: "Villa Rica", zip: "30180", lat: 33.7318, lng: -84.9192, density: [5,7] },
    { name: "Temple", zip: "30179", lat: 33.7368, lng: -85.0377, density: [3,5] },
    { name: "Tallapoosa", zip: "30176", lat: 33.7445, lng: -85.2888, density: [2,4] },
    { name: "Bremen", zip: "30110", lat: 33.7212, lng: -85.1455, density: [3,5] },
    { name: "Loganville", zip: "30052", lat: 33.8387, lng: -83.9008, density: [6,8] },
    { name: "Grayson", zip: "30017", lat: 33.8934, lng: -83.9544, density: [6,8] },
    { name: "Dacula", zip: "30019", lat: 33.9888, lng: -83.8977, density: [6,8] },
    { name: "Auburn", zip: "30011", lat: 34.0143, lng: -83.8277, density: [5,7] },
    { name: "Bethlehem", zip: "30620", lat: 33.9451, lng: -83.7274, density: [4,6] },
    { name: "Statham", zip: "30666", lat: 33.9651, lng: -83.5963, density: [4,6] },
    { name: "Bogart", zip: "30622", lat: 33.9501, lng: -83.5340, density: [4,6] },
    { name: "Watkinsville", zip: "30677", lat: 33.8632, lng: -83.4085, density: [4,6] },
    { name: "Winterville", zip: "30683", lat: 33.9714, lng: -83.2794, density: [3,5] },
  ],
  augustaArea: [
    { name: "Augusta", zip: "30901", lat: 33.4735, lng: -81.9748, density: [5,7] },
    { name: "Evans", zip: "30809", lat: 33.5340, lng: -82.1307, density: [6,8] },
    { name: "Martinez", zip: "30907", lat: 33.5182, lng: -82.0765, density: [6,8] },
    { name: "Grovetown", zip: "30813", lat: 33.4526, lng: -82.1963, density: [5,7] },
    { name: "Harlem", zip: "30814", lat: 33.4146, lng: -82.3132, density: [3,5] },
    { name: "Thomson", zip: "30824", lat: 33.4707, lng: -82.5043, density: [3,5] },
    { name: "Waynesboro", zip: "30830", lat: 33.0899, lng: -82.0154, density: [3,5] },
    { name: "Louisville", zip: "30434", lat: 32.9985, lng: -82.4112, density: [2,4] },
    { name: "Wrens", zip: "30833", lat: 33.2076, lng: -82.3918, density: [2,3] },
    { name: "Wadley", zip: "30477", lat: 32.8668, lng: -82.4040, density: [1,3] },
    { name: "Swainsboro", zip: "30401", lat: 32.5946, lng: -82.3340, density: [3,5] },
    { name: "Millen", zip: "30442", lat: 32.8040, lng: -81.9496, density: [2,3] },
    { name: "Hephzibah", zip: "30815", lat: 33.3110, lng: -82.0979, density: [5,7] },
    { name: "Fort Eisenhower", zip: "30905", lat: 33.4196, lng: -82.0596, density: [4,6] },
    { name: "North Augusta", zip: "29841", lat: 33.5018, lng: -81.9651, density: [5,7] },
  ],
  savannahArea: [
    { name: "Savannah", zip: "31401", lat: 32.0835, lng: -81.0998, density: [6,8] },
    { name: "Savannah Midtown", zip: "31405", lat: 32.0548, lng: -81.1248, density: [6,8] },
    { name: "Savannah Southside", zip: "31419", lat: 31.9856, lng: -81.1101, density: [5,7] },
    { name: "Pooler", zip: "31322", lat: 32.1046, lng: -81.2468, density: [5,7] },
    { name: "Rincon", zip: "31326", lat: 32.2960, lng: -81.2354, density: [4,6] },
    { name: "Garden City", zip: "31408", lat: 32.0836, lng: -81.1592, density: [5,7] },
    { name: "Port Wentworth", zip: "31407", lat: 32.1488, lng: -81.1632, density: [4,6] },
    { name: "Bloomingdale", zip: "31302", lat: 32.1335, lng: -81.3005, density: [4,6] },
    { name: "Guyton", zip: "31312", lat: 32.3268, lng: -81.3924, density: [3,5] },
    { name: "Springfield", zip: "31329", lat: 32.3668, lng: -81.2793, density: [3,5] },
    { name: "Tybee Island", zip: "31328", lat: 32.0005, lng: -80.8456, density: [3,5] },
    { name: "Thunderbolt", zip: "31404", lat: 32.0335, lng: -81.0498, density: [5,7] },
    { name: "Isle of Hope", zip: "31406", lat: 31.9818, lng: -81.0598, density: [4,6] },
    { name: "Skidaway Island", zip: "31411", lat: 31.9551, lng: -81.0473, density: [4,6] },
    { name: "Georgetown", zip: "31419", lat: 31.9598, lng: -81.1298, density: [5,7] },
    { name: "Richmond Hill", zip: "31324", lat: 31.9387, lng: -81.3035, density: [4,6] },
    { name: "Pembroke", zip: "31321", lat: 32.1335, lng: -81.6233, density: [2,4] },
    { name: "Statesboro", zip: "30458", lat: 32.4488, lng: -81.7832, density: [4,6] },
    { name: "Claxton", zip: "30417", lat: 32.1618, lng: -81.9040, density: [2,3] },
    { name: "Sylvania", zip: "30467", lat: 32.7529, lng: -81.6360, density: [2,3] },
    { name: "Metter", zip: "30439", lat: 32.3974, lng: -82.0617, density: [2,4] },
  ],
  maconArea: [
    { name: "Macon", zip: "31201", lat: 32.8407, lng: -83.6324, density: [5,7] },
    { name: "Macon North", zip: "31210", lat: 32.8901, lng: -83.7101, density: [5,7] },
    { name: "Warner Robins", zip: "31093", lat: 32.6130, lng: -83.6524, density: [5,7] },
    { name: "Perry", zip: "31069", lat: 32.4588, lng: -83.7316, density: [4,6] },
    { name: "Fort Valley", zip: "31030", lat: 32.5535, lng: -83.8874, density: [3,5] },
    { name: "Centerville", zip: "31028", lat: 32.6301, lng: -83.6899, density: [4,6] },
    { name: "Bonaire", zip: "31005", lat: 32.5896, lng: -83.5899, density: [4,6] },
    { name: "Kathleen", zip: "31047", lat: 32.5740, lng: -83.6260, density: [4,6] },
    { name: "Byron", zip: "31008", lat: 32.6535, lng: -83.7563, density: [3,5] },
    { name: "Gray", zip: "31032", lat: 32.9885, lng: -83.5332, density: [3,5] },
    { name: "Forsyth", zip: "31029", lat: 33.0343, lng: -83.9382, density: [3,5] },
    { name: "Barnesville", zip: "30204", lat: 33.0546, lng: -84.1566, density: [2,4] },
    { name: "Milledgeville", zip: "31061", lat: 33.0801, lng: -83.2321, density: [3,5] },
    { name: "Eatonton", zip: "31024", lat: 33.3268, lng: -83.3885, density: [2,3] },
    { name: "Sandersville", zip: "31082", lat: 32.9815, lng: -82.8104, density: [2,3] },
    { name: "Irwinton", zip: "31042", lat: 32.8118, lng: -83.1724, density: [1,3] },
  ],
  columbusArea: [
    { name: "Columbus", zip: "31901", lat: 32.4610, lng: -84.9877, density: [5,7] },
    { name: "Columbus North", zip: "31909", lat: 32.5201, lng: -84.9420, density: [5,7] },
    { name: "Phenix City", zip: "36867", lat: 32.4710, lng: -85.0007, density: [5,7] },
    { name: "Fort Moore", zip: "31905", lat: 32.3593, lng: -84.9493, density: [4,6] },
    { name: "Midland", zip: "31820", lat: 32.4404, lng: -84.8669, density: [4,6] },
    { name: "LaGrange", zip: "30240", lat: 33.0362, lng: -85.0322, density: [4,6] },
    { name: "West Point", zip: "31833", lat: 32.8779, lng: -85.1835, density: [2,4] },
    { name: "Hogansville", zip: "30230", lat: 33.0732, lng: -84.9146, density: [2,3] },
    { name: "Pine Mountain", zip: "31822", lat: 32.8633, lng: -84.8547, density: [2,4] },
    { name: "Hamilton", zip: "31811", lat: 32.7568, lng: -84.8744, density: [1,3] },
    { name: "Manchester", zip: "31816", lat: 32.8601, lng: -84.6199, density: [2,3] },
    { name: "Warm Springs", zip: "31830", lat: 32.8874, lng: -84.6794, density: [1,2] },
    { name: "Talbotton", zip: "31827", lat: 32.6782, lng: -84.5370, density: [1,2] },
    { name: "Cusseta", zip: "31805", lat: 32.3063, lng: -84.7725, density: [1,3] },
    { name: "Buena Vista", zip: "31803", lat: 32.3190, lng: -84.5165, density: [1,3] },
  ],
  athensArea: [
    { name: "Athens", zip: "30601", lat: 33.9519, lng: -83.3576, density: [5,7] },
    { name: "Athens West", zip: "30606", lat: 33.9469, lng: -83.4076, density: [5,7] },
    { name: "Athens East", zip: "30605", lat: 33.9369, lng: -83.3076, density: [5,7] },
    { name: "Watkinsville", zip: "30677", lat: 33.8632, lng: -83.4085, density: [4,6] },
    { name: "Winterville", zip: "30683", lat: 33.9714, lng: -83.2794, density: [3,5] },
    { name: "Bogart", zip: "30622", lat: 33.9501, lng: -83.5340, density: [4,6] },
    { name: "Danielsville", zip: "30633", lat: 34.1268, lng: -83.2224, density: [2,3] },
    { name: "Elberton", zip: "30635", lat: 34.1112, lng: -82.8688, density: [3,5] },
    { name: "Washington", zip: "30673", lat: 33.7357, lng: -82.7393, density: [2,4] },
    { name: "Lexington", zip: "30648", lat: 33.8684, lng: -83.1125, density: [2,3] },
    { name: "Crawford", zip: "30630", lat: 33.9043, lng: -83.1627, density: [1,3] },
    { name: "Oglethorpe", zip: "31068", lat: 32.2940, lng: -84.0633, density: [1,3] },
    { name: "Madison", zip: "30650", lat: 33.5946, lng: -83.4685, density: [3,5] },
    { name: "Social Circle", zip: "30025", lat: 33.6568, lng: -83.7191, density: [3,5] },
  ],
  northGA: [
    { name: "Dahlonega", zip: "30533", lat: 34.5323, lng: -83.9849, density: [2,4] },
    { name: "Blue Ridge", zip: "30513", lat: 34.8640, lng: -84.3244, density: [2,4] },
    { name: "Ellijay", zip: "30540", lat: 34.6948, lng: -84.4822, density: [2,4] },
    { name: "Jasper", zip: "30143", lat: 34.4676, lng: -84.4294, density: [3,5] },
    { name: "Dawsonville", zip: "30534", lat: 34.4212, lng: -84.1191, density: [3,5] },
    { name: "Cleveland", zip: "30528", lat: 34.5971, lng: -83.7632, density: [2,4] },
    { name: "Helen", zip: "30545", lat: 34.7029, lng: -83.7282, density: [2,4] },
    { name: "Toccoa", zip: "30577", lat: 34.5773, lng: -83.3324, density: [3,5] },
    { name: "Cornelia", zip: "30531", lat: 34.5118, lng: -83.5271, density: [2,4] },
    { name: "Clarkesville", zip: "30523", lat: 34.6126, lng: -83.5249, density: [2,3] },
    { name: "Hartwell", zip: "30643", lat: 34.3529, lng: -82.9321, density: [2,4] },
    { name: "Royston", zip: "30662", lat: 34.2871, lng: -83.1102, density: [2,3] },
    { name: "Lavonia", zip: "30553", lat: 34.4351, lng: -83.1071, density: [2,3] },
    { name: "Commerce", zip: "30529", lat: 34.2040, lng: -83.4572, density: [3,5] },
    { name: "Jefferson", zip: "30549", lat: 34.1132, lng: -83.6023, density: [3,5] },
    { name: "Braselton", zip: "30517", lat: 34.1084, lng: -83.7627, density: [5,7] },
    { name: "Hoschton", zip: "30548", lat: 34.0965, lng: -83.7613, density: [5,7] },
    { name: "Blairsville", zip: "30512", lat: 34.8762, lng: -83.9585, density: [2,4] },
    { name: "Hiawassee", zip: "30546", lat: 34.9498, lng: -83.7574, density: [1,3] },
    { name: "Young Harris", zip: "30582", lat: 34.9338, lng: -83.8480, density: [1,3] },
    { name: "McCaysville", zip: "30555", lat: 34.9829, lng: -84.3713, density: [1,3] },
    { name: "Chatsworth", zip: "30705", lat: 34.7698, lng: -84.7699, density: [3,5] },
    { name: "Dalton", zip: "30720", lat: 34.7698, lng: -84.9702, density: [4,6] },
    { name: "Calhoun", zip: "30701", lat: 34.5026, lng: -84.9513, density: [3,5] },
    { name: "Fairmount", zip: "30139", lat: 34.4387, lng: -84.7019, density: [2,3] },
    { name: "Adairsville", zip: "30103", lat: 34.3684, lng: -84.9341, density: [3,5] },
    { name: "Cartersville", zip: "30120", lat: 34.1651, lng: -84.7999, density: [4,6] },
    { name: "Euharlee", zip: "30145", lat: 34.1451, lng: -84.9322, density: [3,5] },
    { name: "Ringgold", zip: "30736", lat: 34.9146, lng: -85.1091, density: [3,5] },
    { name: "Fort Oglethorpe", zip: "30742", lat: 34.9490, lng: -85.2568, density: [3,5] },
    { name: "Chickamauga", zip: "30707", lat: 34.8712, lng: -85.2913, density: [2,4] },
    { name: "LaFayette", zip: "30728", lat: 34.7098, lng: -85.2822, density: [3,5] },
    { name: "Summerville", zip: "30747", lat: 34.4762, lng: -85.3477, density: [2,4] },
    { name: "Trion", zip: "30753", lat: 34.5446, lng: -85.3113, density: [2,3] },
    { name: "Rome", zip: "30161", lat: 34.2570, lng: -85.1647, density: [4,6] },
    { name: "Cedartown", zip: "30125", lat: 34.0118, lng: -85.2549, density: [3,5] },
    { name: "Rockmart", zip: "30153", lat: 34.0010, lng: -85.0441, density: [3,5] },
    { name: "Calhoun", zip: "30701", lat: 34.5026, lng: -84.9513, density: [3,5] },
    { name: "Cisco", zip: "30708", lat: 34.9662, lng: -84.7499, density: [1,3] },
    { name: "Talking Rock", zip: "30175", lat: 34.5148, lng: -84.4758, density: [1,3] },
    { name: "Cherry Log", zip: "30522", lat: 34.7748, lng: -84.4358, density: [1,3] },
    { name: "Morganton", zip: "30560", lat: 34.8698, lng: -84.2412, density: [1,3] },
    { name: "Suches", zip: "30572", lat: 34.7351, lng: -84.0751, density: [1,2] },
    { name: "Clayton", zip: "30525", lat: 34.8782, lng: -83.4010, density: [2,4] },
    { name: "Dillard", zip: "30537", lat: 34.9668, lng: -83.3815, density: [1,3] },
    { name: "Mountain City", zip: "30562", lat: 34.9198, lng: -83.3815, density: [1,3] },
    { name: "Tiger", zip: "30576", lat: 34.8532, lng: -83.4260, density: [1,2] },
    { name: "Tallulah Falls", zip: "30573", lat: 34.7376, lng: -83.3931, density: [1,3] },
  ],
  middleGA: [
    { name: "Dublin", zip: "31021", lat: 32.5404, lng: -82.9037, density: [3,5] },
    { name: "Eastman", zip: "31023", lat: 32.1976, lng: -83.1785, density: [2,3] },
    { name: "Cochran", zip: "31014", lat: 32.3868, lng: -83.3543, density: [2,3] },
    { name: "Hawkinsville", zip: "31036", lat: 32.2838, lng: -83.4722, density: [2,3] },
    { name: "Cordele", zip: "31015", lat: 31.9635, lng: -83.7741, density: [3,5] },
    { name: "Americus", zip: "31709", lat: 32.0724, lng: -84.2327, density: [3,5] },
    { name: "Plains", zip: "31780", lat: 32.0335, lng: -84.3933, density: [1,2] },
    { name: "Greensboro", zip: "30642", lat: 33.5751, lng: -83.1824, density: [2,3] },
    { name: "Sparta", zip: "31087", lat: 33.2751, lng: -83.1349, density: [1,3] },
    { name: "Wrightsville", zip: "31096", lat: 32.7285, lng: -82.7196, density: [2,3] },
    { name: "Soperton", zip: "30457", lat: 32.3757, lng: -82.5918, density: [1,3] },
    { name: "McRae-Helena", zip: "31055", lat: 32.0668, lng: -82.9007, density: [2,3] },
    { name: "Mount Vernon", zip: "30445", lat: 32.1807, lng: -82.5943, density: [2,3] },
    { name: "Tennille", zip: "31089", lat: 32.9368, lng: -82.8104, density: [2,3] },
    { name: "Metter", zip: "30439", lat: 32.3974, lng: -82.0617, density: [2,4] },
    { name: "Vienna", zip: "31092", lat: 32.0907, lng: -83.7951, density: [2,3] },
    { name: "Unadilla", zip: "31091", lat: 32.2618, lng: -83.7374, density: [2,3] },
    { name: "Montezuma", zip: "31063", lat: 32.3007, lng: -84.0274, density: [2,3] },
    { name: "Oglethorpe", zip: "31068", lat: 32.2940, lng: -84.0633, density: [1,3] },
    { name: "Ellaville", zip: "31806", lat: 32.2368, lng: -84.3074, density: [1,3] },
    { name: "Butler", zip: "31006", lat: 32.5568, lng: -84.2377, density: [1,3] },
    { name: "Reynolds", zip: "31076", lat: 32.5568, lng: -84.0893, density: [1,3] },
    { name: "Roberta", zip: "31078", lat: 32.7235, lng: -84.0118, density: [1,3] },
    { name: "Thomaston", zip: "30286", lat: 32.8882, lng: -84.3266, density: [3,5] },
    { name: "Zebulon", zip: "30295", lat: 33.1024, lng: -84.3429, density: [1,3] },
    { name: "Monticello", zip: "31064", lat: 33.3032, lng: -83.6885, density: [2,3] },
    { name: "Jackson", zip: "30233", lat: 33.2946, lng: -83.9659, density: [3,5] },
  ],
  southGA: [
    { name: "Valdosta", zip: "31601", lat: 30.8327, lng: -83.2785, density: [4,6] },
    { name: "Valdosta North", zip: "31602", lat: 30.8727, lng: -83.2685, density: [4,6] },
    { name: "Waycross", zip: "31501", lat: 31.2135, lng: -82.3540, density: [3,5] },
    { name: "Douglas", zip: "31533", lat: 31.5088, lng: -82.8496, density: [3,5] },
    { name: "Fitzgerald", zip: "31750", lat: 31.7149, lng: -83.2527, density: [2,4] },
    { name: "Ocilla", zip: "31774", lat: 31.5941, lng: -83.2496, density: [1,3] },
    { name: "Nashville", zip: "31639", lat: 31.2074, lng: -83.2502, density: [2,3] },
    { name: "Adel", zip: "31620", lat: 31.1371, lng: -83.4238, density: [2,4] },
    { name: "Hahira", zip: "31632", lat: 30.9913, lng: -83.3724, density: [2,4] },
    { name: "Lake Park", zip: "31636", lat: 30.6874, lng: -83.1821, density: [2,3] },
    { name: "Quitman", zip: "31643", lat: 30.7852, lng: -83.5599, density: [1,3] },
    { name: "Baxley", zip: "31513", lat: 31.7779, lng: -82.3485, density: [2,3] },
    { name: "Jesup", zip: "31545", lat: 31.6074, lng: -81.8854, density: [3,5] },
    { name: "Vidalia", zip: "30474", lat: 32.2177, lng: -82.4135, density: [3,5] },
    { name: "Lyons", zip: "30436", lat: 32.2043, lng: -82.3224, density: [2,3] },
    { name: "Reidsville", zip: "30453", lat: 32.0874, lng: -82.1199, density: [1,3] },
    { name: "Hazlehurst", zip: "31539", lat: 31.8688, lng: -82.5943, density: [2,3] },
    { name: "Alma", zip: "31510", lat: 31.5399, lng: -82.4624, density: [2,3] },
    { name: "Blackshear", zip: "31516", lat: 31.3060, lng: -82.2418, density: [2,3] },
    { name: "Tifton", zip: "31794", lat: 31.4505, lng: -83.5085, density: [3,5] },
    { name: "Moultrie", zip: "31768", lat: 31.1799, lng: -83.7893, density: [3,5] },
    { name: "Thomasville", zip: "31792", lat: 30.8366, lng: -83.9785, density: [3,5] },
    { name: "Cairo", zip: "39828", lat: 30.8777, lng: -84.2052, density: [2,4] },
    { name: "Bainbridge", zip: "39819", lat: 30.9038, lng: -84.5752, density: [2,4] },
    { name: "Camilla", zip: "31730", lat: 31.2318, lng: -84.2102, density: [2,3] },
    { name: "Pelham", zip: "31779", lat: 31.1274, lng: -84.1522, density: [2,3] },
    { name: "Sylvester", zip: "31791", lat: 31.5321, lng: -83.8343, density: [2,4] },
    { name: "Ashburn", zip: "31714", lat: 31.7066, lng: -83.6531, density: [2,4] },
    { name: "Pearson", zip: "31642", lat: 31.2977, lng: -82.8518, density: [1,3] },
    { name: "Homerville", zip: "31634", lat: 31.0366, lng: -82.7474, density: [1,3] },
    { name: "Folkston", zip: "31537", lat: 30.8310, lng: -82.0085, density: [2,3] },
    { name: "Nahunta", zip: "31553", lat: 31.2046, lng: -81.9835, density: [1,3] },
    { name: "Donalsonville", zip: "39845", lat: 31.0418, lng: -84.8785, density: [1,3] },
    { name: "Blakely", zip: "39823", lat: 31.3774, lng: -84.9340, density: [2,3] },
    { name: "Colquitt", zip: "39837", lat: 31.1699, lng: -84.7335, density: [1,3] },
    { name: "Dawson", zip: "39842", lat: 31.7743, lng: -84.4385, density: [2,3] },
    { name: "Albany", zip: "31701", lat: 31.5785, lng: -84.1557, density: [4,6] },
    { name: "Albany East", zip: "31705", lat: 31.5585, lng: -84.1057, density: [4,6] },
    { name: "Leesburg", zip: "31763", lat: 31.7321, lng: -84.1702, density: [2,4] },
    { name: "Smithville", zip: "31787", lat: 31.8974, lng: -84.2502, density: [1,3] },
  ],
  coastal: [
    { name: "Brunswick", zip: "31520", lat: 31.1499, lng: -81.4915, density: [4,6] },
    { name: "St. Simons Island", zip: "31522", lat: 31.1536, lng: -81.3695, density: [3,5] },
    { name: "Jekyll Island", zip: "31527", lat: 31.0556, lng: -81.4209, density: [2,4] },
    { name: "Darien", zip: "31305", lat: 31.3702, lng: -81.4340, density: [2,3] },
    { name: "Hinesville", zip: "31313", lat: 31.8468, lng: -81.5959, density: [4,6] },
    { name: "Ludowici", zip: "31316", lat: 31.7082, lng: -81.7416, density: [1,3] },
    { name: "Midway", zip: "31320", lat: 31.8068, lng: -81.4319, density: [2,4] },
    { name: "Riceboro", zip: "31323", lat: 31.7235, lng: -81.4418, density: [1,3] },
    { name: "Woodbine", zip: "31569", lat: 30.9643, lng: -81.7246, density: [2,3] },
    { name: "Kingsland", zip: "31548", lat: 30.7999, lng: -81.6896, density: [3,5] },
    { name: "St. Marys", zip: "31558", lat: 30.7308, lng: -81.5465, density: [3,5] },
    { name: "Waynesville", zip: "31566", lat: 31.2118, lng: -81.8285, density: [1,3] },
  ],
};

// Street name templates
const streetNames = [
  "Main St", "Oak St", "Elm St", "Maple Ave", "Pine St", "Cedar Ln",
  "Church St", "Broad St", "Market St", "Washington St", "Jefferson St",
  "MLK Jr Blvd", "Industrial Blvd", "Commerce Dr", "Peachtree St",
  "College Ave", "Park Ave", "Spring St", "Railroad St", "Depot St",
  "Courthouse Sq", "Magnolia St", "Pecan St", "Dogwood Dr", "Azalea Ln",
  "Lakewood Dr", "Riverside Dr", "Mountain View Rd", "Old Mill Rd",
  "Heritage Dr", "Liberty St", "Academy St", "Center St", "Front St",
  "Walnut St", "Cherry St", "Poplar St", "Mulberry St", "Chestnut St",
  "Hickory Ln", "Birch Ave", "Willow St", "Sycamore Dr", "Holly St",
  "Ivy Ln", "Jasmine Ct", "Laurel Dr", "Mimosa Ln", "Rose Ave",
  "Camellia Way", "Wisteria Ln", "Crepe Myrtle Dr", "Foxglove Ct",
  "Gardenia Ln", "Honeysuckle Dr", "Iris Way", "Juniper St", "Lily Ct",
  "Marigold Dr", "Orchid Ln", "Primrose Way", "Sunflower Dr", "Tulip Ct",
  "Violet St", "Zinnia Ln", "Cypress Dr", "Sassafras Ln", "Sweetgum Way",
  "Persimmon St", "Cottonwood Dr", "Hemlock Ct", "Redbud Ln",
  "First St", "Second St", "Third St", "Fourth St", "Fifth St",
  "Sixth St", "Seventh St", "Eighth St", "Ninth St", "Tenth St",
  "First Ave", "Second Ave", "Third Ave", "State St", "King St",
  "Queen St", "Prince St", "Duke St", "Grant St", "Lee St",
  "Jackson St", "Lincoln St", "Davis St", "Taylor St", "Wilson St",
  "Johnson Ave", "Thompson Rd", "Harris St", "Clark St", "Young St",
  "Bell St", "Green St", "White St", "Brown Ave", "Smith Rd",
  "Jones St", "Williams Ave", "Anderson Rd", "Baker St", "Cooper Ln",
];

const highways = [
  "Hwy 41", "Hwy 19", "Hwy 27", "Hwy 441", "Hwy 23", "Hwy 129",
  "Hwy 78", "Hwy 316", "Hwy 400", "Hwy 53", "Hwy 92", "Hwy 278",
  "Hwy 20", "Hwy 138", "Hwy 54", "Hwy 74", "Hwy 85", "Hwy 16",
  "Hwy 341", "Hwy 301", "Hwy 82", "Hwy 84", "Hwy 1", "Hwy 17",
  "Hwy 25", "Hwy 80", "Hwy 280", "Hwy 319", "Hwy 41 N", "Hwy 41 S",
  "US-1", "US-19", "US-41", "US-441", "US-80", "US-82", "US-84",
  "GA-400", "GA-316", "GA-20", "GA-53", "GA-365", "GA-120", "GA-9",
  "GA-5", "GA-515", "GA-2", "GA-136", "GA-3", "GA-75", "GA-17",
  "Hwy 29", "Hwy 278 W", "Hwy 278 E", "Hwy 41 Bypass",
  "Hwy 15", "Hwy 11", "Hwy 29 N", "Hwy 29 S", "Hwy 341 N",
];

const commercialStreets = [
  "Veterans Pkwy", "Bypass Rd", "Connector Rd", "Frontage Rd",
  "Shopping Center Dr", "Plaza Dr", "Mall Blvd", "Crossroads Dr",
  "Merchants Way", "Trade Center Blvd", "Business Park Dr",
  "Gateway Blvd", "Marketplace Dr", "Towne Center Dr", "Village Way",
  "Promenade Blvd", "Station Dr", "Exchange Blvd", "Campus Dr",
  "Innovation Way", "Technology Pkwy", "Corporate Blvd", "Executive Dr",
  "Professional Pkwy", "Outlet Blvd", "Factory Stores Blvd",
];

// Business name templates by category
function getBusinessName(category, cityName) {
  const iceNames = [
    `Twice the Ice - ${cityName}`,
    `Kooler Ice - ${cityName}`,
    `Quick Ice ${cityName}`,
    `${cityName} Ice House`,
    `Ice Express - ${cityName}`,
    `Bag of Ice ${cityName}`,
    `Crystal Ice - ${cityName}`,
    `Arctic Ice - ${cityName}`,
    `EZ Ice ${cityName}`,
    `Ice Box - ${cityName}`,
    `Ice Station ${cityName}`,
    `${cityName} Ice & Water`,
    `Fresh Ice ${cityName}`,
    `Pure Ice - ${cityName}`,
    `Ice King ${cityName}`,
    `Polar Ice - ${cityName}`,
    `Glacier Ice - ${cityName}`,
    `Ice Palace ${cityName}`,
    `Cool Cube Ice - ${cityName}`,
    `Iceberg - ${cityName}`,
    `Frosty's Ice - ${cityName}`,
    `Ice Factory - ${cityName}`,
    `${cityName} Ice Works`,
    `Diamond Ice - ${cityName}`,
    `${cityName} Ice Shack`,
    `Sub Zero Ice - ${cityName}`,
    `Snowflake Ice - ${cityName}`,
    `Clear Ice - ${cityName}`,
    `${cityName} Cold Box`,
    `Freeze Zone - ${cityName}`,
    `Ice Depot - ${cityName}`,
    `${cityName} Ice Spot`,
    `Penguin Ice - ${cityName}`,
    `Chill Ice - ${cityName}`,
    `${cityName} Ice Vault`,
  ];

  const waterNames = [
    `${cityName} Water Refill Station`,
    `Pure Water ${cityName}`,
    `WaterMill Express - ${cityName}`,
    `Crystal Clear Water - ${cityName}`,
    `Primo Water - ${cityName}`,
    `${cityName} Water Depot`,
    `Fresh Water Station - ${cityName}`,
    `Aqua Pure - ${cityName}`,
    `Water Tree - ${cityName}`,
    `${cityName} Water Store`,
    `Blue Water Refill - ${cityName}`,
    `AquaSafe - ${cityName}`,
    `${cityName} H2O Station`,
    `Glacier Water - ${cityName}`,
    `Spring Water - ${cityName}`,
    `${cityName} Water Works`,
    `Cool Springs Water - ${cityName}`,
    `Water Express - ${cityName}`,
  ];

  const dryIceNames = [
    `${cityName} Dry Ice Supply`,
    `Penguin Dry Ice - ${cityName}`,
    `Continental Carbonic - ${cityName}`,
    `${cityName} Dry Ice Depot`,
    `Polar Dry Ice - ${cityName}`,
    `Airgas Dry Ice - ${cityName}`,
    `${cityName} CO2 Supply`,
    `Cool Blast Dry Ice - ${cityName}`,
    `SubZero Dry Ice - ${cityName}`,
    `${cityName} Dry Ice Co`,
    `Arctic Dry Ice - ${cityName}`,
    `Frost King Dry Ice - ${cityName}`,
  ];

  const propaneRefillNames = [
    `${cityName} Propane`,
    `Georgia Gas & Propane - ${cityName}`,
    `${cityName} Propane Refill`,
    `Southern Propane - ${cityName}`,
    `AmeriGas - ${cityName}`,
    `Blossman Gas - ${cityName}`,
    `${cityName} Fuel & Propane`,
    `Peach State Propane - ${cityName}`,
    `U-Haul Propane - ${cityName}`,
    `Tractor Supply Propane - ${cityName}`,
    `${cityName} Gas & Grill`,
    `Heritage Propane - ${cityName}`,
    `Suburban Propane - ${cityName}`,
    `${cityName} LP Gas`,
    `Pinnacle Propane - ${cityName}`,
    `Thompson Gas - ${cityName}`,
  ];

  const propaneExchangeNames = [
    `Blue Rhino Exchange - ${cityName}`,
    `AmeriGas Exchange - ${cityName}`,
    `${cityName} Propane Exchange`,
    `Quick Propane - ${cityName}`,
    `Flame King Exchange - ${cityName}`,
    `${cityName} Tank Exchange`,
    `Swap-A-Tank - ${cityName}`,
    `${cityName} Grill Gas`,
    `EZ Propane - ${cityName}`,
    `Ready Flame - ${cityName}`,
    `${cityName} BBQ Gas Exchange`,
    `Propane Plus - ${cityName}`,
  ];

  const convenienceNames = [
    `${cityName} Quick Stop`,
    `Corner Mart - ${cityName}`,
    `${cityName} Express Mart`,
    `Pit Stop - ${cityName}`,
    `Flash Foods - ${cityName}`,
    `Parker's - ${cityName}`,
    `Circle K - ${cityName}`,
    `${cityName} Food Mart`,
    `Murphy Express - ${cityName}`,
    `QuikTrip - ${cityName}`,
    `RaceTrac - ${cityName}`,
    `Mapco - ${cityName}`,
    `BP - ${cityName}`,
    `Shell - ${cityName}`,
    `Chevron - ${cityName}`,
    `Citgo - ${cityName}`,
    `Marathon - ${cityName}`,
    `${cityName} Convenience`,
    `Kangaroo Express - ${cityName}`,
    `Enmarket - ${cityName}`,
    `Sprint Mart - ${cityName}`,
    `${cityName} One Stop`,
    `Gate - ${cityName}`,
    `Pilot - ${cityName}`,
    `Love's - ${cityName}`,
    `Buc-ee's - ${cityName}`,
    `${cityName} Gas & Go`,
    `Texaco - ${cityName}`,
    `Sunoco - ${cityName}`,
    `Valero - ${cityName}`,
  ];

  const beerNames = [
    `${cityName} Beverage Mart`,
    `${cityName} Beer & Wine`,
    `Cold Beer Barn - ${cityName}`,
    `Georgia Spirits - ${cityName}`,
    `${cityName} Craft Beer Hub`,
    `Hop City - ${cityName}`,
    `${cityName} Bottle Shop`,
    `Ale House - ${cityName}`,
    `${cityName} Brews`,
    `Peach State Beverages - ${cityName}`,
    `Growler Fill - ${cityName}`,
    `${cityName} Tap & Pour`,
    `Craft Cellar - ${cityName}`,
    `${cityName} Beer Depot`,
    `Southern Sips - ${cityName}`,
  ];

  const packageNames = [
    `${cityName} Package Store`,
    `${cityName} Liquor & Wine`,
    `Spirits of ${cityName}`,
    `Georgia Package - ${cityName}`,
    `${cityName} Wine & Spirits`,
    `${cityName} Liquor Store`,
    `Green's - ${cityName}`,
    `Tower - ${cityName}`,
    `Total Wine - ${cityName}`,
    `ABC Liquor - ${cityName}`,
    `${cityName} Discount Liquor`,
    `${cityName} Fine Wines`,
    `Beverage World - ${cityName}`,
    `Liquor Land - ${cityName}`,
  ];

  const map = {
    "ice-vending": iceNames,
    "water-refill": waterNames,
    "dry-ice": dryIceNames,
    "propane-refill": propaneRefillNames,
    "propane-exchange": propaneExchangeNames,
    "convenience-store": convenienceNames,
    "beer-drinks": beerNames,
    "package-store": packageNames,
  };

  const names = map[category] || iceNames;
  return names[Math.floor(Math.random() * names.length)];
}

function randomFloat(min, max, decimals = 4) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getAddress() {
  const num = randomInt(100, 9999);
  const allStreets = [...streetNames, ...highways, ...commercialStreets];
  const street = allStreets[Math.floor(Math.random() * allStreets.length)];
  return `${num} ${street}`;
}

function getRating() {
  return parseFloat((Math.random() * 1.5 + 3.5).toFixed(1));
}

function getDensityScore(densityRange) {
  return randomInt(densityRange[0], densityRange[1]);
}

// Build the distribution plan — same proportions scaled to COUNT
const categoryRatios = {
  "ice-vending": 0.40,
  "water-refill": 0.12,
  "dry-ice": 0.08,
  "propane-refill": 0.10,
  "propane-exchange": 0.10,
  "convenience-store": 0.10,
  "beer-drinks": 0.06,
  "package-store": 0.04,
};

const categoryPlan = [];
let remaining = COUNT;
const entries = Object.entries(categoryRatios);
for (let i = 0; i < entries.length; i++) {
  const [cat, ratio] = entries[i];
  const n = i === entries.length - 1 ? remaining : Math.round(COUNT * ratio);
  for (let j = 0; j < n; j++) categoryPlan.push(cat);
  remaining -= n;
}

// Shuffle
for (let i = categoryPlan.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [categoryPlan[i], categoryPlan[j]] = [categoryPlan[j], categoryPlan[i]];
}

// Flatten all cities
const allCities = [];
for (const [region, cityList] of Object.entries(cities)) {
  for (const city of cityList) {
    allCities.push({ ...city, region });
  }
}

// Distribute listings across cities with geographic coverage
const assignments = [];
const shuffledCities = [...allCities].sort(() => Math.random() - 0.5);

// First pass: give each city at least 1 listing
for (let i = 0; i < Math.min(COUNT, shuffledCities.length); i++) {
  assignments.push(shuffledCities[i]);
}

// Second pass: fill remaining slots — weighted toward bigger areas
const extraCount = COUNT - assignments.length;
const metroRegions = ["metroAtlanta", "savannahArea", "augustaArea", "maconArea", "columbusArea", "athensArea"];
for (let i = 0; i < extraCount; i++) {
  if (Math.random() < 0.55) {
    // Pick from metro regions
    const regionKey = metroRegions[Math.floor(Math.random() * metroRegions.length)];
    const regionCities = cities[regionKey];
    assignments.push({ ...regionCities[Math.floor(Math.random() * regionCities.length)], region: regionKey });
  } else {
    assignments.push(allCities[Math.floor(Math.random() * allCities.length)]);
  }
}

// Shuffle assignments
for (let i = assignments.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [assignments[i], assignments[j]] = [assignments[j], assignments[i]];
}

// Track used names to avoid duplicates
const usedNames = new Set();

// Generate listings
const listings = [];
for (let i = 0; i < COUNT; i++) {
  const id = (START_ID + i).toString();
  const category = categoryPlan[i];
  const cityData = assignments[i];

  // Generate unique name
  let name;
  let attempts = 0;
  do {
    name = getBusinessName(category, cityData.name);
    attempts++;
    if (attempts > 30) {
      name = name + ` #${randomInt(2, 99)}`;
    }
  } while (usedNames.has(name));
  usedNames.add(name);

  // Secondary categories
  const categorySecondary = [];
  if (category === "ice-vending" && Math.random() < 0.3) categorySecondary.push("water-refill");
  if (category === "propane-refill" && Math.random() < 0.4) categorySecondary.push("propane-exchange");
  if (category === "convenience-store" && Math.random() < 0.35) categorySecondary.push("beer-drinks");

  // Hours and 24h flag
  let hours, open24h;
  if (category === "ice-vending" || category === "water-refill") {
    if (Math.random() < 0.85) { hours = "24/7"; open24h = true; }
    else { hours = "6:00 AM - 10:00 PM"; open24h = false; }
  } else if (category === "convenience-store") {
    if (Math.random() < 0.3) { hours = "24/7"; open24h = true; }
    else {
      hours = `${randomInt(5, 7)}:00 AM - ${randomInt(9, 11)}:00 PM`;
      open24h = false;
    }
  } else if (category === "package-store" || category === "beer-drinks") {
    hours = `${randomInt(8, 10)}:00 AM - ${randomInt(9, 11)}:00 PM`;
    open24h = false;
  } else {
    hours = `${randomInt(6, 8)}:00 AM - ${randomInt(5, 7)}:00 PM`;
    open24h = false;
  }

  // Payment
  const paymentTypes = ["card", "cash"];
  if ((category === "ice-vending" || category === "water-refill") && Math.random() < 0.15) {
    paymentTypes.splice(1, 1);
  }

  // Boolean flags
  const hasWaterRefill = category === "water-refill" || categorySecondary.includes("water-refill") || (category === "ice-vending" && Math.random() < 0.2);
  const hasDryIce = category === "dry-ice" || (["convenience-store", "package-store"].includes(category) && Math.random() < 0.15);
  const hasPropaneRefill = category === "propane-refill" || (category === "convenience-store" && Math.random() < 0.1);
  const hasPropaneExchange = category === "propane-exchange" || categorySecondary.includes("propane-exchange") || (["convenience-store", "propane-refill"].includes(category) && Math.random() < 0.2);
  const alcoholLicenseNearby = ["beer-drinks", "package-store"].includes(category) || (["convenience-store"].includes(category) && Math.random() < 0.4) || Math.random() < 0.15;
  const convenienceStoreNearby = category === "convenience-store" || (["ice-vending", "propane-exchange"].includes(category) && Math.random() < 0.4) || Math.random() < 0.1;

  // Lat/lng with small random offset
  const lat = randomFloat(cityData.lat - 0.02, cityData.lat + 0.02, 4);
  const lng = randomFloat(cityData.lng - 0.02, cityData.lng + 0.02, 4);

  const listing = {
    id,
    name,
    category_primary: category,
    category_secondary: categorySecondary,
    address: getAddress(),
    city: cityData.name,
    state: "GA",
    zip: cityData.zip,
    lat,
    lng,
    phone: "",
    website: "",
    hours,
    open_24h: open24h,
    payment_types: paymentTypes,
    has_water_refill: hasWaterRefill,
    has_dry_ice: hasDryIce,
    has_propane_refill: hasPropaneRefill,
    has_propane_exchange: hasPropaneExchange,
    alcohol_license_nearby: alcoholLicenseNearby,
    convenience_store_nearby: convenienceStoreNearby,
    source_name: "Independent",
    source_url: "",
    source_priority: 2,
    last_verified_at: "2025-12-01",
    status: "active",
    photos: [],
    rating: getRating(),
    density_score: getDensityScore(cityData.density),
  };

  listings.push(listing);
}

// Output one per line, comma-prefixed
for (const listing of listings) {
  process.stdout.write("," + JSON.stringify(listing) + "\n");
}

process.stderr.write(`Generated ${listings.length} listings (IDs ${START_ID}-${START_ID + COUNT - 1})\n`);
process.stderr.write(`Unique cities: ${new Set(listings.map(l => l.city)).size}\n`);
process.stderr.write(`Categories: ${JSON.stringify(Object.fromEntries(
  Object.keys(categoryRatios).map(c => [c, listings.filter(l => l.category_primary === c).length])
))}\n`);
