// The following code is used to create a map of the ethnicities of the participants in the survey.
// Each country has its own ethnic groups with different ids, we thus asked ChatGPT to create a mapping
// for each ethnic group to 6 categories: White, Black, South Asian, East Asian, Arabic/Central Asian, Other.

/**
 * Map a raw Q290 label to one of:
 *   'white', 'black', 'southAsian', 'eastAsian',
 *   'arabicCentralAsian', or 'other'
 */
export function mapEthnicity(rawLabel) {
    if (!rawLabel || typeof rawLabel !== 'string') return 'other';
  
    const s = rawLabel.toLowerCase();
  
    // 1) WHITE
    if (/\b(white|caucasian|european|british|slovak|poland|ukrainian|irish|welsh|scottish)\b/.test(s)) {
      return 'white';
    }
  
    // 2) BLACK
    if (/\b(black|negro|african)\b/.test(s)) {
      return 'black';
    }
  
    // 3) SOUTH ASIAN
    if (/\b(indian|pakistani|bangladeshi|sri lankan|punjabi|bengali|baluch|hindu|chakma|pashto)\b/.test(s)) {
      return 'southAsian';
    }
  
    // 4) EAST ASIAN
    if (/\b(chinese|japanese|korean|east asian|oriental|hakka|minnanese)\b/.test(s)) {
      return 'eastAsian';
    }
  
    // 5) ARABIC / CENTRAL ASIAN
    if (/\b(arab(ic)?|persian|afghan|iranian|turk(ish)?|azer(i)?|kurd|tajik(istan)?|uzbek|kazakh|bashkir|baluch)\b/.test(s)) {
      return 'arabicCentralAsian';
    }
  
    // 6) FALLBACK
    return 'other';
  }
  

  // countryNameMap.js

export const countryNameMap = {
  AND: 'Andorra',
  ARG: 'Argentina',
  AUS: 'Australia',
  BGD: 'Bangladesh',
  ARM: 'Armenia',
  BOL: 'Bolivia',
  BRA: 'Brazil',
  MMR: 'Myanmar',
  CAN: 'Canada',
  CHL: 'Chile',
  CHN: 'China',
  DEU: 'Germany',
  TWN: 'Taiwan',
  COL: 'Colombia',
  CYP: 'Cyprus',
  CZE: 'Czechia',
  ECU: 'Ecuador',
  ETH: 'Ethiopia',
  GRC: 'Greece',
  GTM: 'Guatemala',
  HKG: 'Hong Kong',
  IND: 'India',
  IDN: 'Indonesia',
  IRN: 'Iran',
  IRQ: 'Iraq',
  JOR: 'Jordan',
  JPN: 'Japan',
  KAZ: 'Kazakhstan',
  KEN: 'Kenya',
  KOR: 'South Korea',
  KGZ: 'Kyrgyzstan',
  LBN: 'Lebanon',
  LBY: 'Libya',
  MAC: 'Macao',
  MYS: 'Malaysia',
  MDV: 'Maldives',
  MEX: 'Mexico',
  MNG: 'Mongolia',
  MAR: 'Morocco',
  NLD: 'Netherlands',
  NIC: 'Nicaragua',
  NGA: 'Nigeria',
  NZL: 'New Zealand',
  PAK: 'Pakistan',
  PER: 'Peru',
  PHL: 'Philippines',
  PRI: 'Puerto Rico',
  ROU: 'Romania',
  RUS: 'Russia',
  SRB: 'Serbia',
  SGP: 'Singapore',
  SVK: 'Slovakia',
  TUR: 'Turkey',
  VNM: 'Vietnam',
  ZWE: 'Zimbabwe',
  TJK: 'Tajikistan',
  THA: 'Thailand',
  TUN: 'Tunisia',
  UKR: 'Ukraine',
  EGY: 'Egypt',
  GBR: 'United Kingdom',
  USA: 'United States',
  URY: 'Uruguay',
  UZB: 'Uzbekistan',
  VEN: 'Venezuela',
  NIR: 'Northern Ireland'
};
