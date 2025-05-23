
function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}

/* Mappings */

const sectionMapping = {
	0: "Global",  // Bar 10 highlights Australia
	1: "Social capital, trust and organizational membership",  // Bar 1 highlights United States
	2: "Ethical values and norms",  // Bar 2 highlights Canada
	3: "Social values, attitudes and stereotypes",  // Bar 3 highlights Spain
  };

const countryISOMapping = {
  AFG: "AF",
  ALB: "AL",
  DZA: "DZ",
  ASM: "AS",
  AND: "AD",
  AGO: "AO",
  AIA: "AI",
  ATA: "AQ",
  ATG: "AG",
  ARG: "AR",
  ARM: "AM",
  ABW: "AW",
  AUS: "AU",
  AUT: "AT",
  AZE: "AZ",
  BHS: "BS",
  BHR: "BH",
  BGD: "BD",
  BRB: "BB",
  BLR: "BY",
  BEL: "BE",
  BLZ: "BZ",
  BEN: "BJ",
  BMU: "BM",
  BTN: "BT",
  BOL: "BO",
  BES: "BQ",
  BIH: "BA",
  BWA: "BW",
  BVT: "BV",
  BRA: "BR",
  IOT: "IO",
  BRN: "BN",
  BGR: "BG",
  BFA: "BF",
  BDI: "BI",
  CPV: "CV",
  KHM: "KH",
  CMR: "CM",
  CAN: "CA",
  CYM: "KY",
  CAF: "CF",
  TCD: "TD",
  CHL: "CL",
  CHN: "CN",
  CXR: "CX",
  CCK: "CC",
  COL: "CO",
  COM: "KM",
  COD: "CD",
  COG: "CG",
  COK: "CK",
  CRI: "CR",
  HRV: "HR",
  CUB: "CU",
  CUW: "CW",
  CYP: "CY",
  CZE: "CZ",
  CIV: "CI",
  DNK: "DK",
  DJI: "DJ",
  DMA: "DM",
  DOM: "DO",
  ECU: "EC",
  EGY: "EG",
  SLV: "SV",
  GNQ: "GQ",
  ERI: "ER",
  EST: "EE",
  SWZ: "SZ",
  ETH: "ET",
  FLK: "FK",
  FRO: "FO",
  FJI: "FJ",
  FIN: "FI",
  FRA: "FR",
  GUF: "GF",
  PYF: "PF",
  ATF: "TF",
  GAB: "GA",
  GMB: "GM",
  GEO: "GE",
  DEU: "DE",
  GHA: "GH",
  GIB: "GI",
  GRC: "GR",
  GRL: "GL",
  GRD: "GD",
  GLP: "GP",
  GUM: "GU",
  GTM: "GT",
  GGY: "GG",
  GIN: "GN",
  GNB: "GW",
  GUY: "GY",
  HTI: "HT",
  HMD: "HM",
  VAT: "VA",
  HND: "HN",
  HKG: "HK",
  HUN: "HU",
  ISL: "IS",
  IND: "IN",
  IDN: "ID",
  IRN: "IR",
  IRQ: "IQ",
  IRL: "IE",
  IMN: "IM",
  ISR: "IL",
  ITA: "IT",
  JAM: "JM",
  JPN: "JP",
  JEY: "JE",
  JOR: "JO",
  KAZ: "KZ",
  KEN: "KE",
  KIR: "KI",
  PRK: "KP",
  KOR: "KR",
  KWT: "KW",
  KGZ: "KG",
  LAO: "LA",
  LVA: "LV",
  LBN: "LB",
  LSO: "LS",
  LBR: "LR",
  LBY: "LY",
  LIE: "LI",
  LTU: "LT",
  LUX: "LU",
  MAC: "MO",
  MDG: "MG",
  MWI: "MW",
  MYS: "MY",
  MDV: "MV",
  MLI: "ML",
  MLT: "MT",
  MHL: "MH",
  MTQ: "MQ",
  MRT: "MR",
  MUS: "MU",
  MYT: "YT",
  MEX: "MX",
  FSM: "FM",
  MDA: "MD",
  MCO: "MC",
  MNG: "MN",
  MNE: "ME",
  MSR: "MS",
  MAR: "MA",
  MOZ: "MZ",
  MMR: "MM",
  NAM: "NA",
  NRU: "NR",
  NPL: "NP",
  NLD: "NL",
  NCL: "NC",
  NZL: "NZ",
  NIC: "NI",
  NER: "NE",
  NGA: "NG",
  NIU: "NU",
  NFK: "NF",
  MNP: "MP",
  NOR: "NO",
  OMN: "OM",
  PAK: "PK",
  PLW: "PW",
  PSE: "PS",
  PAN: "PA",
  PNG: "PG",
  PRY: "PY",
  PER: "PE",
  PHL: "PH",
  PCN: "PN",
  POL: "PL",
  PRT: "PT",
  PRI: "PR",
  QAT: "QA",
  MKD: "MK",
  ROU: "RO",
  RUS: "RU",
  RWA: "RW",
  REU: "RE",
  BLM: "BL",
  SHN: "SH",
  KNA: "KN",
  LCA: "LC",
  MAF: "MF",
  SPM: "PM",
  VCT: "VC",
  WSM: "WS",
  SMR: "SM",
  STP: "ST",
  SAU: "SA",
  SEN: "SN",
  SRB: "RS",
  SYC: "SC",
  SLE: "SL",
  SGP: "SG",
  SXM: "SX",
  SVK: "SK",
  SVN: "SI",
  SLB: "SB",
  SOM: "SO",
  ZAF: "ZA",
  SGS: "GS",
  SSD: "SS",
  ESP: "ES",
  LKA: "LK",
  SDN: "SD",
  SUR: "SR",
  SJM: "SJ",
  SWE: "SE",
  CHE: "CH",
  SYR: "SY",
  TWN: "TW",
  TJK: "TJ",
  TZA: "TZ",
  THA: "TH",
  TLS: "TL",
  TGO: "TG",
  TKL: "TK",
  TON: "TO",
  TTO: "TT",
  TUN: "TN",
  TUR: "TR",
  TKM: "TM",
  TCA: "TC",
  TUV: "TV",
  UGA: "UG",
  UKR: "UA",
  ARE: "AE",
  GBR: "GB",
  UMI: "UM",
  USA: "US",
  URY: "UY",
  UZB: "UZ",
  VUT: "VU",
  VEN: "VE",
  VNM: "VN",
  VGB: "VG",
  VIR: "VI",
  WLF: "WF",
  ESH: "EH",
  YEM: "YE",
  ZMB: "ZM",
  ZWE: "ZW",
  ALA: "AX"
};

const codeISOMapping = {
  'AF': 'Afghanistan',
  'AL': 'Albania',
  'DZ': 'Algeria',
  'AS': 'American Samoa',
  'AD': 'Andorra',
  'AO': 'Angola',
  'AI': 'Anguilla',
  'AQ': 'Antarctica',
  'AG': 'Antigua and Barbuda',
  'AR': 'Argentina',
  'AM': 'Armenia',
  'AW': 'Aruba',
  'AU': 'Australia',
  'AT': 'Austria',
  'AZ': 'Azerbaijan',
  'BS': 'Bahamas (the)',
  'BH': 'Bahrain',
  'BD': 'Bangladesh',
  'BB': 'Barbados',
  'BY': 'Belarus',
  'BE': 'Belgium',
  'BZ': 'Belize',
  'BJ': 'Benin',
  'BM': 'Bermuda',
  'BT': 'Bhutan',
  'BO': 'Bolivia (Plurinational State of)',
  'BQ': 'Bonaire, Sint Eustatius and Saba',
  'BA': 'Bosnia and Herzegovina',
  'BW': 'Botswana',
  'BV': 'Bouvet Island',
  'BR': 'Brazil',
  'IO': 'British Indian Ocean Territory (the)',
  'BN': 'Brunei Darussalam',
  'BG': 'Bulgaria',
  'BF': 'Burkina Faso',
  'BI': 'Burundi',
  'CV': 'Cabo Verde',
  'KH': 'Cambodia',
  'CM': 'Cameroon',
  'CA': 'Canada',
  'KY': 'Cayman Islands (the)',
  'CF': 'Central African Republic (the)',
  'TD': 'Chad',
  'CL': 'Chile',
  'CN': 'China',
  'CX': 'Christmas Island',
  'CC': 'Cocos (Keeling) Islands (the)',
  'CO': 'Colombia',
  'KM': 'Comoros (the)',
  'CD': 'Congo (the Democratic Republic of the)',
  'CG': 'Congo (the)',
  'CK': 'Cook Islands (the)',
  'CR': 'Costa Rica',
  'HR': 'Croatia',
  'CU': 'Cuba',
  'CW': 'Curaçao',
  'CY': 'Cyprus',
  'CZ': 'Czechia',
  'CI': 'Côte d\'Ivoire',
  'DK': 'Denmark',
  'DJ': 'Djibouti',
  'DM': 'Dominica',
  'DO': 'Dominican Republic (the)',
  'EC': 'Ecuador',
  'EG': 'Egypt',
  'SV': 'El Salvador',
  'GQ': 'Equatorial Guinea',
  'ER': 'Eritrea',
  'EE': 'Estonia',
  'SZ': 'Eswatini',
  'ET': 'Ethiopia',
  'FK': 'Falkland Islands (the) [Malvinas]',
  'FO': 'Faroe Islands (the)',
  'FJ': 'Fiji',
  'FI': 'Finland',
  'FR': 'France',
  'GF': 'French Guiana',
  'PF': 'French Polynesia',
  'TF': 'French Southern Territories (the)',
  'GA': 'Gabon',
  'GM': 'Gambia (the)',
  'GE': 'Georgia',
  'DE': 'Germany',
  'GH': 'Ghana',
  'GI': 'Gibraltar',
  'GR': 'Greece',
  'GL': 'Greenland',
  'GD': 'Grenada',
  'GP': 'Guadeloupe',
  'GU': 'Guam',
  'GT': 'Guatemala',
  'GG': 'Guernsey',
  'GN': 'Guinea',
  'GW': 'Guinea-Bissau',
  'GY': 'Guyana',
  'HT': 'Haiti',
  'HM': 'Heard Island and McDonald Islands',
  'VA': 'Holy See (the)',
  'HN': 'Honduras',
  'HK': 'Hong Kong',
  'HU': 'Hungary',
  'IS': 'Iceland',
  'IN': 'India',
  'ID': 'Indonesia',
  'IR': 'Iran (Islamic Republic of)',
  'IQ': 'Iraq',
  'IE': 'Ireland',
  'IM': 'Isle of Man',
  'IL': 'Israel',
  'IT': 'Italy',
  'JM': 'Jamaica',
  'JP': 'Japan',
  'JE': 'Jersey',
  'JO': 'Jordan',
  'KZ': 'Kazakhstan',
  'KE': 'Kenya',
  'KI': 'Kiribati',
  'KP': 'Korea (the Democratic People\'s Republic of)',
  'KR': 'Korea (the Republic of)',
  'KW': 'Kuwait',
  'KG': 'Kyrgyzstan',
  'LA': 'Lao People\'s Democratic Republic (the)',
  'LV': 'Latvia',
  'LB': 'Lebanon',
  'LS': 'Lesotho',
  'LR': 'Liberia',
  'LY': 'Libya',
  'LI': 'Liechtenstein',
  'LT': 'Lithuania',
  'LU': 'Luxembourg',
  'MO': 'Macao',
  'MG': 'Madagascar',
  'MW': 'Malawi',
  'MY': 'Malaysia',
  'MV': 'Maldives',
  'ML': 'Mali',
  'MT': 'Malta',
  'MH': 'Marshall Islands (the)',
  'MQ': 'Martinique',
  'MR': 'Mauritania',
  'MU': 'Mauritius',
  'YT': 'Mayotte',
  'MX': 'Mexico',
  'FM': 'Micronesia (Federated States of)',
  'MD': 'Moldova (the Republic of)',
  'MC': 'Monaco',
  'MN': 'Mongolia',
  'ME': 'Montenegro',
  'MS': 'Montserrat',
  'MA': 'Morocco',
  'MZ': 'Mozambique',
  'MM': 'Myanmar',
  'NA': 'Namibia',
  'NR': 'Nauru',
  'NP': 'Nepal',
  'NL': 'Netherlands (the)',
  'NC': 'New Caledonia',
  'NZ': 'New Zealand',
  'NI': 'Nicaragua',
  'NE': 'Niger (the)',
  'NG': 'Nigeria',
  'NU': 'Niue',
  'NF': 'Norfolk Island',
  'MP': 'Northern Mariana Islands (the)',
  'NO': 'Norway',
  'OM': 'Oman',
  'PK': 'Pakistan',
  'PW': 'Palau',
  'PS': 'Palestine, State of',
  'PA': 'Panama',
  'PG': 'Papua New Guinea',
  'PY': 'Paraguay',
  'PE': 'Peru',
  'PH': 'Philippines (the)',
  'PN': 'Pitcairn',
  'PL': 'Poland',
  'PT': 'Portugal',
  'PR': 'Puerto Rico',
  'QA': 'Qatar',
  'MK': 'Republic of North Macedonia',
  'RO': 'Romania',
  'RU': 'Russian Federation (the)',
  'RW': 'Rwanda',
  'RE': 'Réunion',
  'BL': 'Saint Barthélemy',
  'SH': 'Saint Helena, Ascension and Tristan da Cunha',
  'KN': 'Saint Kitts and Nevis',
  'LC': 'Saint Lucia',
  'MF': 'Saint Martin (French part)',
  'PM': 'Saint Pierre and Miquelon',
  'VC': 'Saint Vincent and the Grenadines',
  'WS': 'Samoa',
  'SM': 'San Marino',
  'ST': 'Sao Tome and Principe',
  'SA': 'Saudi Arabia',
  'SN': 'Senegal',
  'RS': 'Serbia',
  'SC': 'Seychelles',
  'SL': 'Sierra Leone',
  'SG': 'Singapore',
  'SX': 'Sint Maarten (Dutch part)',
  'SK': 'Slovakia',
  'SI': 'Slovenia',
  'SB': 'Solomon Islands',
  'SO': 'Somalia',
  'ZA': 'South Africa',
  'GS': 'South Georgia and the South Sandwich Islands',
  'SS': 'South Sudan',
  'ES': 'Spain',
  'LK': 'Sri Lanka',
  'SD': 'Sudan (the)',
  'SR': 'Suriname',
  'SJ': 'Svalbard and Jan Mayen',
  'SE': 'Sweden',
  'CH': 'Switzerland',
  'SY': 'Syrian Arab Republic',
  'TW': 'Taiwan (Province of China)',
  'TJ': 'Tajikistan',
  'TZ': 'Tanzania, United Republic of',
  'TH': 'Thailand',
  'TL': 'Timor-Leste',
  'TG': 'Togo',
  'TK': 'Tokelau',
  'TO': 'Tonga',
  'TT': 'Trinidad and Tobago',
  'TN': 'Tunisia',
  'TR': 'Turkey',
  'TM': 'Turkmenistan',
  'TC': 'Turks and Caicos Islands (the)',
  'TV': 'Tuvalu',
  'UG': 'Uganda',
  'UA': 'Ukraine',
  'AE': 'United Arab Emirates (the)',
  'GB': 'United Kingdom of Great Britain and Northern Ireland (the)',
  'UM': 'United States Minor Outlying Islands (the)',
  'US': 'United States of America (the)',
  'UY': 'Uruguay',
  'UZ': 'Uzbekistan',
  'VU': 'Vanuatu',
  'VE': 'Venezuela (Bolivarian Republic of)',
  'VN': 'Viet Nam',
  'VG': 'Virgin Islands (British)',
  'VI': 'Virgin Islands (U.S.)',
  'WF': 'Wallis and Futuna',
  'EH': 'Western Sahara',
  'YE': 'Yemen',
  'ZM': 'Zambia',
  'ZW': 'Zimbabwe',
  'AX': 'Åland Islands',
};

const allCountries = am5geodata_worldLow.features.map(f => ({
  id:      f.id,       
  value:   0           
}));

/*

This section contains the code to compute the similarity associated to each country w.r.t. responses.

*/

async function loadData() {
  try {
    const data_clean = await d3.csv("data/subset_df_clean.csv", d3.autoType);
	const data_answers = await d3.csv("data/handwritten_answers.csv", d3.autoType);
    console.log("Data loaded successfully:", data_answers.slice(0, 5)); // Log first 5 rows
    return {data_clean,data_answers};
  } catch (error) {
    console.error("Error loading the CSV file:", error);
    throw error;
  }
}

function sampleFromArray(arr, n) {
  // Helper: Randomly sample n elements from an array without replacement
  const result = [];
  const tempArr = [...arr]; // make a shallow copy
  const count = Math.min(n, tempArr.length);
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * tempArr.length);
    result.push(tempArr[randomIndex]);
    tempArr.splice(randomIndex, 1);
  }
  return result;
}

function selectRandomQuestionsAndClean(dfMetaAnswers, dfClean, selectedTopic, nbrOfQuestions = 5) {
  // Filter questions based on selected topic.
  let filteredQuestions;
  if (selectedTopic === 'Global') {
    // For Global, exclude questions from the Demographics topic.
    filteredQuestions = dfMetaAnswers.filter(question => question.topic !== 'Demographics');
  } else {
    filteredQuestions = dfMetaAnswers.filter(question => question.topic === selectedTopic);
  }
  console.log("Filtered questions:", filteredQuestions);

  // Randomly sample the desired number of questions.
  const selectedQuestions = sampleFromArray(filteredQuestions, nbrOfQuestions);
  console.log("Selected questions:", selectedQuestions);

  // Build a list of keys: the question indices plus the country column.
  const meaningfulFeatures = selectedQuestions.map(question => question.index);
  meaningfulFeatures.push('B_COUNTRY_ALPHA');
  console.log("Meaningful features:", meaningfulFeatures);

  // Create a new dataset limited to only the columns of interest.
  let validAnswers = dfClean.map(row => {
    const newRow = {};
    meaningfulFeatures.forEach(feature => {
      newRow[feature] = row[feature];
    });
    return newRow;
  });
  console.log("Mapped responses (before filtering):", validAnswers);

  const originalCount = validAnswers.length;
  // Filter rows: for every feature except the country, convert to number
  // and ensure it is not NaN and is >= 0.
  validAnswers = validAnswers.filter(row =>
    meaningfulFeatures.every(feature => {
      if (feature === 'B_COUNTRY_ALPHA') return true;
      const value = row[feature];
      const num = Number(value);
      return !isNaN(num) && num >= 0;
    })
  );

  const removedParticipants = originalCount - validAnswers.length;
  console.log(`Removed ${removedParticipants} participants who did not answer all selected questions.`);

  // Initialize column distance to 0
  validAnswers.forEach(user => {
    user.distance = 0; // set cumulative distance to 0
  });
  return { selectedQuestions, validAnswers };
}

async function run_quiz(topic, containerId, globe) {
  // Load data and select questions
  const { data_clean, data_answers } = await loadData();
  const { selectedQuestions, validAnswers } = selectRandomQuestionsAndClean(data_answers, data_clean, topic);

  // Initialize dist_by_country for heatmap
  const distanceByCountry = {};

  console.log("Selected questions:", selectedQuestions);

  // Helper function that resets (or creates) the container.
  function resetContainer(id) {
    let container = document.getElementById(id);
    if (!container) {
      container = document.createElement("div");
      container.id = id;
      document.body.appendChild(container);
    } else {
      container.innerHTML = "";
    }
    return container;
  }

  // Function to show a single question and wait for a bar click.
  async function showQuestion(question) {
      const container = resetContainer(containerId);

      // Create a dedicated interactive bar container inside our main container.
      const barContainer = document.createElement("div");
      barContainer.id = "interactivebar";
      barContainer.classList.add("module");
      container.appendChild(barContainer);

      // Return a promise that resolves when a bar is clicked.
      return new Promise(resolve => {
        create_interactive_bar(
          globe,
          question.overall_question,
          question.specific_question,
          question.possible_answers,
          selectedKey => {
            resolve(selectedKey);
          }
        );
      });
    }
  // Initialize distances see what kind of object
  // Where each individual is at dist 0
  // Loop through questions one at a time.
  let question_nbr = 1;
  for (const question of selectedQuestions) {
    console.log("Processing question:", question);
    const selectedKey = await showQuestion(question);
    console.log("User selected:", selectedKey);
    console.log("With corresponds to answer:", selectedKey[1]);
    console.log(validAnswers[0].distance);
    const answer = selectedKey[1];
    const question_idx = question.index;

    // Compute distance with other users
    /*
    validAnswers.forEach(user => {
    const userAnswer = parseInt(user[question_idx], 10);
    const country = user.B_COUNTRY_ALPHA;

    if (!user.hasOwnProperty("distance")) {
      user.distance = 0;
    }

    const diff = Math.abs(userAnswer - answer) / Object.keys(question.possible_answers).length;
    user.distance += diff;
    const normalized_dist = user.distance / question_nbr;

    if (!distanceByCountry[country]) {
      distanceByCountry[country] = { totalDistance: 0, count: 0 };
    }

    const previousAvgDistance = distanceByCountry[country].totalDistance;
    const numPreviousUsers = distanceByCountry[country].count;
    const currentUserDistance = normalized_dist;

    distanceByCountry[country].totalDistance = (previousAvgDistance * numPreviousUsers + currentUserDistance) / (numPreviousUsers + 1);
    distanceByCountry[country].count += 1;
  });


  */
  
  const questionScores = Object.values(validAnswers).reduce((byC, user) => {
    const userAnswer = parseInt(user[question_idx], 10);
    const diff = Math.abs(userAnswer - answer) / Object.keys(question.possible_answers).length;
    user.distance += diff;
    const country = user.B_COUNTRY_ALPHA;
    const norm = user.distance / question_nbr;      // partial distance
    const entry = byC[country] ||= { total:0, count:0 };
    entry.total   += norm;
    entry.count   += 1;
    return byC;
  }, {});
  for (let c in questionScores) {
    distanceByCountry[c] = questionScores[c];
    distanceByCountry[c].totalDistance = distanceByCountry[c].total/distanceByCountry[c].count
  }
  console.log("dist_by_country", distanceByCountry);

  // Derive the per-country heatmap score
  let heatmapScore = Object()
  const [minScore, maxScore] = ((v) => [Math.min(...v), Math.max(...v)])(
    Object.values(distanceByCountry).map(o => o.totalDistance)
  );
  for (let [countryCode,countryValues] of Object.entries(distanceByCountry)){
    heatmapScore[countryISOMapping[countryCode]] = 1-(countryValues.totalDistance-minScore)/(maxScore-minScore);
  } 
  console.log("formatedValues", heatmapScore);
  update_countries(globe.polygonSeries,heatmapScore)

  // Increment question count after processing all users for this question
  question_nbr += 1;

  }
  // Find the country with the smallest totalDistance
  const closestCountry = Object.entries(distanceByCountry).reduce((closest, [country, data]) => {
    return data.totalDistance < closest.totalDistance ? { country, totalDistance: data.totalDistance } : closest;
  }, { country: null, totalDistance: Infinity });

  console.log("Country with smallest distance:", closestCountry);
  console.log("with a final score of:", compute_final_score(closestCountry.totalDistance), "%")
  console.log("Quiz complete!");

  globe.chart.showBestMatch({ name: codeISOMapping[countryISOMapping[closestCountry.country]], score: closestCountry.totalDistance });
  console.log(globe.panel.current_country)

}

function compute_final_score(dist){
  return(((1 - dist) * 100).toFixed(2))
}

function fixMappingString(mapping) {
  // Convert keys enclosed in single quotes to double quotes.
  let valid = mapping.replace(/'([^']+)'\s*:/g, '"$1":');
  // Also replace string values enclosed in single quotes.
  valid = valid.replace(/:\s*'([^']+?)'/g, ': "$1"');
  return valid;
}

/* 

This section contains the different functions that allow the dynamic and interactive visualizations.

*/


function create_interactive_globe(container_id){
	return new Promise(resolve => {
		// --------------------
		// Interactive Earth Globe Code (amCharts 5)
		// --------------------
		am5.ready(function() {

		// Create root element
		const root = am5.Root.new(container_id);

		// Set themes
		root.setThemes([
			am5themes_Animated.new(root)
		]);

		// Create the map chart with orthographic projection
		const chart = root.container.children.push(am5map.MapChart.new(root, {
			panX: "rotateX",
			panY: "rotateY",
			projection: am5map.geoOrthographic(),
			paddingBottom: 30,
			paddingTop: 20,
			paddingLeft: 20,
			paddingRight: 20
		}));

		// Create main polygon series for countries
		// (We no longer set a hover state or tooltip on hover.)
		const polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
			geoJSON: am5geodata_worldLow,
      valueField: "value",
      idField:    "id"
		}));

    // Create heatmap
		polygonSeries.set("heatRules", [{
			target: polygonSeries.mapPolygons.template, 
			dataField: "value",            // data field to read :contentReference[oaicite:1]{index=1}
			key: "fill",                   // which visual property to drive
			min: am5.color(0xeeeeee),      // color at the low end
			max: am5.color(0x0052cc),       // color at the high end
			minValue: 0,                   // enforce lowest domain
      maxValue: 1,                    // enforce highest domain :contentReference[oaicite:0]{index=0}
      customFunction: (sprite, minValue, maxValue, value) => {
        let newColor;
          if (value == -1){
              newColor = am5.color(0x000000)
          }
          else{
              // calculate normalized 0–1
              const percent = (value - minValue) / (maxValue - minValue);
              // interpolate to your two endpoint colors
              newColor = am5.Color.interpolate(
              percent,
              am5.color(0xeeeeee),
              am5.color(0x0052cc)
              );  // uses am5.Color.interpolate under the hood :contentReference[oaicite:1]{index=1}
            }
          // animate the fill property over 1s
          sprite.animate({
            key:      "fill",
            to:       newColor,
            duration: 3000,
            easing:   am5.ease.out(am5.ease.cubic)
          });
			  }
		  }]);

    // Create associated legend
		const heatLegend = chart.children.push(
			am5.HeatLegend.new(root, {
			  orientation: "vertical",
			  startColor: am5.color(0xeeeeee),
			  endColor: am5.color(0x0052cc),
        startText:  "Low ",
        endText:    "High"
			})
    );

    heatLegend.startLabel.setAll({
      fill: am5.color(0xffffff),     // white text
      fontSize: "0.75em",            // optional: tweak size
      fontWeight: "500"              // optional: tweak weight
    });

    heatLegend.endLabel.setAll({
      fill: am5.color(0xffffff),     // white text
      fontSize: "0.75em",            // optional: tweak size
      fontWeight: "500"              // optional: tweak weight
    });

		// Remove tooltip on hover and disable hover fill (or comment them out)
		polygonSeries.mapPolygons.template.setAll({
			// tooltipText: "{name}", // Optional: if you want tooltips on activation, you can leave it.
			toggleKey: "active",
			interactive: true
		});

		polygonSeries.mapPolygons.template.states.create("active", {
			// Use a fill color of your choice
			//fill: root.interfaceColors.get("primaryButtonHover")
		});

		// Create series for background fill
		const backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
		backgroundSeries.mapPolygons.template.setAll({
			fill: root.interfaceColors.get("alternativeBackground"),
			fillOpacity: 0.1,
			strokeOpacity: 0
		});
		backgroundSeries.data.push({
			geometry: am5map.getGeoRectangle(90, 180, -90, -180)
		});

		// Create graticule series
		const graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
		graticuleSeries.mapLines.template.setAll({ 
			strokeOpacity: 0.1, 
			stroke: root.interfaceColors.get("alternativeBackground")
		});

		// Rotate animation for the globe
		chart.animate({
			key: "rotationX",
			from: 0,
			to: 360,
			duration: 30000,
			loops: Infinity
		});
		// Animate chart appearance on load
		chart.appear(1000, 100);


    // animation
    const panel = root.container.children.push(
      am5.Container.new(root, {
        x: am5.percent(85),
        centerX: am5.percent(50),
        y: am5.percent(3),
        centerY: am5.percent(0),
        width: 200,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 12,
        paddingRight: 12,
        background: am5.RoundedRectangle.new(root, {
          fill: am5.color(0xffffff),
          fillOpacity: 0.9,
          cornerRadius: 8
        }),
        opacity: 0 // start hidden
      })
    );
    panel.current_country = ''
    
    const panelLabel = panel.children.push(
      am5.Label.new(root, {
        text: "",               // we’ll fill this in later
        fontSize: 14,
        fill: am5.color(0x000000),

        // **NEW PROPS** to center it perfectly:
        width: am5.percent(100),    // span full width of panel
        textAlign: "center",        // center the text inside that width
        x: am5.percent(50),         // position the label’s left x at 50%
        centerX: am5.percent(50)    // align its center to that x
          })
    );

    // trigger function
    chart.showBestMatch = function(bestCountry) {
      // 1) shrink the globe
      /*
      this.chartContainer.animate({
        key: "scale",
        to: 0.8,
        duration: 600,
        easing: am5.ease.out(am5.ease.cubic)
      });
      */
      // 2) set panel text
      panelLabel.set("text", 
        `Best Match:\n${bestCountry.name}\nScore: ${bestCountry.score.toFixed(2)}`
      );
      // 3) fade panel in
      panel.animate({
        key: "opacity",
        to: 1,
        duration: 400,
        easing: am5.ease.out(am5.ease.cubic)
      });
    };

    // clickable country
    polygonSeries.mapPolygons.template.events.on("click", ev => {
      // ev.target is the Sprite that was clicked
      const data = ev.target.dataItem.dataContext;
      const countryId   = data.id;       // your alpha-2 code
      const countryName = data.name;     // human-readable name
      
      console.log(`Clicked: ${countryName} (${countryId})`);
      
      // — example: update your panel with details —
      panelLabel.set("text",
        `Country:\n${countryName}\nCode: ${countryId}`
      );
      panel.current_country = data.id
    });


		//resolve({ root, chart, polygonSeries });
    resolve({ root, chart, polygonSeries, panel, panelLabel });
		});
  });
}

function update_countries(polygonSeries,countryValues) {
  const newData = allCountries.map(d => ({
		     id:    d.id,
		     value: countryValues[d.id] != null ? countryValues[d.id] : -1
		   }));
	polygonSeries.data.setAll(newData);
  }

function create_interactive_bar(globe, name, subtitle, mapping, onBarClick) {
  console.log("Loaded mapping", mapping);
  // Parse mapping with fixed JSON formatting.
  const dict_mapping = JSON.parse(fixMappingString(mapping));
  console.log("Now as a dict:", dict_mapping);

  // Invert the mapping and build a data array of [label, numericScore] pairs.
  const invertedMapping = Object.fromEntries(
    Object.entries(dict_mapping).map(([key, value]) => [value, isNaN(key) ? key : Number(key)])
  );
  console.log("Inverted mapping:", invertedMapping);

  const data = Object.entries(invertedMapping)
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([score, label]) => [label, Number(score)]);

  // Define layout constants.
  const width = 900 ,
        height = 500,
        barHeight = 7,
        offsetLeft = 50,
        offsetTop = 80,
        barGap = 30;

  // Use D3 to insert a title container in the interactive bar container.
  const container = d3.select("#interactivebar");
  const titleContainer = container.insert("div", ":first-child")
    .attr("id", "module-title");

  titleContainer.append("div")
    .attr("class", "main-title")
    .text(name);
    
  titleContainer.append("div")
    .attr("class", "module-subtitle")
    .text(subtitle);

  // Create an SVG element.
  const svg = container.append("svg")
    .attr("width", width)
    .attr("height", height);

  // Define a linear scale for the bar lengths.
  const maxVal = d3.max(data, d => d[1]);
  const xScale = d3.scaleLinear()
    .domain([0, maxVal])
    .range([offsetLeft, (width + offsetLeft)*0.6]);

  // Append the bars.
  svg.selectAll("rect")
    .data(data)
    .enter().append("rect")
      .attr("x", offsetLeft)
      .attr("y", (d, i) => offsetTop + i * (barHeight + barGap))
      .attr("width", d => xScale(d[1]))
      .attr("height", barHeight - 4)
      .attr("fill", "gray")
      .attr('stroke', 'transparent')     // make the stroke invisible
      .attr('stroke-width',  20)
      .style('cursor', 'pointer')     
      .on("mouseover", function() {
          d3.select(this).attr("fill", "white");
      })
      .on("mouseout", function() {
          d3.select(this).attr("fill", "gray");
      })
      .on("click", (event, d) => {
      console.log("Bar clicked, full d:", d); // Inspect the full array
      if (d && d.length > 0) {
        console.log("Passing label:", d[0]);
        if (typeof onBarClick === 'function') {
          onBarClick(data[d]);
        }
      } else {
        console.warn("Clicked bar data is missing the label:", d);
        if (typeof onBarClick === 'function') {
          onBarClick(data[d]);
        }
      }
    });


  // Append the descriptive labels at the end of each bar.
  svg.selectAll("text.label")
    .data(data)
    .enter().append("text")
      .attr("class", "label")
      .attr("x", d => offsetLeft + xScale(d[1]) + 10)
      .attr("y", (d, i) => offsetTop + i * (barHeight + barGap) + (barHeight / 2) + 1)
      .attr("alignment-baseline", "middle")
      .attr("fill", "#ccc")
      .style("font-size", "12px")
      .text(d => d[0]);

  // Append the numeric values on the left of each bar.
  /*
  svg.selectAll("text.number")
    .data(data)
    .enter().append("text")
      .attr("class", "number")
      .attr("x", offsetLeft - 10)
      .attr("y", (d, i) => offsetTop + i * (barHeight + barGap) + (barHeight / 2) + 1)
      .attr("text-anchor", "end")
      .attr("alignment-baseline", "middle")
      .attr("fill", "#ccc")
      .style("font-size", "12px")
      .text(d => d[1]);
  */

  return data;
}

function create_section_selector(container_id,globe){
	console.log("container_id", container_id)
	const data = d3.range(0, Object.keys(sectionMapping).length, 1);
	const width = 750, height = 500, barHeight = 7, offsetLeft = 50, offsetTop = 80;
	const bar_width = 10, barGap = 60;

	//setup title
	d3.select("#"+container_id)
	.insert("div", ":first-child")
	.attr("id", "module-title")
	.style("width", "100%")             // Ensure full width if needed
	.style("text-align", "center")      // Center the text horizontally
	.style("padding-top", "20px")       // Adjust vertical position
	.style("color", "white")            // Set text color to white
	.style("font-size", "24px")         // Increase the font size
	.text("Section Selection");

	// Create an SVG
	const svg = d3.select("#"+container_id)
	  .append("svg")
	  .attr("width", width)
	  .attr("height", height);

	// Append bars
	svg.selectAll("rect")
	  .data(data)
	  .enter().append("rect")
		.attr("x", offsetLeft)
		.attr("y", (d, i) => offsetTop + i * (barHeight + barGap))
		.attr("width", d => bar_width)
		.attr("height", barHeight - 4) // slight gap
		.attr("fill", "gray")

	// Append the text at the tip of each bar
	svg.selectAll("text")
	  .data(data)
	  .enter().append("text")
		.attr("x", d => offsetLeft + bar_width + 10)
		.attr("y", (d, i) => offsetTop + i * (barHeight + barGap) + (barHeight / 2) +  5)
		.attr("text-anchor", "start")
		.attr("fill", "gray")
		.style("cursor", "pointer")
		.style("font-size", "24px") 
		.text(d => sectionMapping[d])
		.on("mouseover", function() {
			d3.select(this).attr("fill", "white");
		  })
		.on("mouseout", function() {
			d3.select(this).attr("fill", "gray");
		})
		.on("click", (event, d) => {
			console.log('Selected: '+ sectionMapping[d])
			//
			run_quiz(sectionMapping[d],container_id, globe)
		});
		
}

function create_introduction(container_id,globe){
	//setup title
	d3.select("#"+container_id)
	.insert("div", ":first-child")
	.attr("id", "module-title")
	.style("width", "100%")             
	.style("text-align", "center")      
	.style("padding-top", "20px")      
	.style("color", "white")          
	.style("font-size", "24px")        
	.text("Introduction");

	//
	const width = 900, height = 500;
	const svg = d3.select("#"+container_id)
	  .append("svg")
	  .attr("width", width)
	  .attr("height", height);

	svg.append("text")
      .attr("x", 20)
      .attr("y", 20)
	  .attr("class", "intro_text")
	  .attr('fill','white')
      .text("Hello!  Welcome in the Data-Vizards lair!");

	const btnGroup = svg.append("g")
      .attr("transform", "translate(400,400)")
      .style("cursor", "pointer")
      .on("click", () => console.log("SVG button clicked!"));
	
	btnGroup.append("rect")
      .attr("class", "btn-rect")
      .attr("width", 100)
      .attr("height", 40)
	  .attr('fill', 'grey')
      .attr("rx", 5)    // rounded corners
      .on("mouseover", function() { d3.select(this).attr("fill", "white"); })
      .on("mouseout",  function() { d3.select(this).attr("fill", "grey"); })
	  .on("click", (event, d) => {
		const oldDiv = document.getElementById(container_id);
		const parent = oldDiv.parentNode;
		const newDiv = document.createElement("div");
		newDiv.id = "sectionSelector";
		newDiv.classList.add("module");
		parent.replaceChild(newDiv, oldDiv);
		d3.select(container_id).remove();
		create_section_selector("sectionSelector",globe);
	});

	btnGroup.append("text")
      .attr("class", "btn-txt")
      .attr("x", 50)    // half of 100
      .attr("y", 25)    // a bit more than half of 40
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .text("Start");

}

// Main Function

whenDocumentLoaded(async () => {
	// Load the data
	const surveyData = await loadData();
	// create header
	const header = d3.select("body")
    .insert("div", ":first-child")
    .attr("id", "page-header");
	// create title
	header.append("div")
    .attr("id", "main-title")
    .text("World Value Survey")
	.style("cursor", "pointer")
	.on("click", (event, d) => {
		location.reload(true);
	});
	//
	header.append("div")
    .attr("id", "explore-title")
    .style("cursor", "pointer")
    .text("Explore")
    .on("click", () => console.log('Explore'));
	// Create main dashboard
	const dashboard = document.createElement("div");
	dashboard.id = "dashboard";
	document.body.appendChild(dashboard);
	// Left Panel
	const chartDiv = document.createElement("div");
	chartDiv.id = "chartdiv";
  chartDiv.classList.add("module");
	dashboard.appendChild(chartDiv);
	const globe = await create_interactive_globe("chartdiv");
	// Right Panel
	const introduction = document.createElement("div");
	introduction.id = "introduction";
  introduction.classList.add("module");
	dashboard.appendChild(introduction);
	create_introduction("introduction",globe);
	// verify that everything ran smoothly
	console.log('working');
});

