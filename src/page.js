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
  'IR': 'Iran',
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
  'MDA': 'Moldova (the Republic of)',
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
  'NLD': 'Netherlands (the)',
  'NCL': 'New Caledonia',
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

function ReverseCountryISOMapping(object, value) {
  for (const key in object) {
    // Ensure the property belongs to the object itself, not inherited
    if (object.hasOwnProperty(key) && object[key] === value) {
      return key; // Return the key as soon as a match is found
    }
  }
  return undefined; // Return undefined if the value is not found
}

const allCountries = am5geodata_worldLow.features.map(f => ({
  id:      f.id,       
  value:   0           
}));

const Exploration_questions = {'How important is religion?': 'Q6', 'How important is family?': 'Q1', 'How important are friends?': 'Q2', 'How important is leisure time?': 'Q3', 'How important is politics?': 'Q4', 'How important is work?': 'Q5', 'Men make better political leaders than women – agree?': 'Q29', 'Having children is a duty to society – agree?': 'Q37', 'Work should come before free time – agree?': 'Q41', 'Trust in your family?': 'Q59', 'Trust in your neighborhood?': 'Q60', 'Trust in other nationalities?': 'Q63', 'Confidence in universities?': 'Q75','Should global orgs prioritize effectiveness or democracy?': 'Q90'}

// Mapping objects for histogram data
const genderMap = { 1: "Male", 2: "Female" };
const ageMap = {
  1: '15-24', 2: '25-34', 3: '35-44',
  4: '45-54', 5: '55-64', 6: '65+'
};
const religionMap = {
  0: 'No Religion',
  1: 'Roman Catholic',
  2: 'Protestant',
  3: 'Orthodox',
  4: 'Jew',
  5: 'Muslim',
  6: 'Hindu',
  7: 'Buddhist'
};

/*

This section contains the code to compute the similarity associated to each country w.r.t. responses.

*/

async function loadData() {
  try {
    const data_clean = await d3.csv("data/subset_df_clean.csv", d3.autoType);
    const data_answers = await d3.csv("data/handwritten_answers.csv", d3.autoType);
    console.log("Data loaded successfully:", data_answers.slice(4, 8)); // Log first 5 rows
    
    // Transform the data into the format expected by the histogram
    surveyDatasets = {
      "Global Survey": transformDataForHistogram(data_answers.filter(q => q.topic !== 'Demographics')),
      "Social capital and trust survey": transformDataForHistogram(data_answers.filter(q => q.topic === 'Social capital and trust')),
      "Ethical values and norms survey": transformDataForHistogram(data_answers.filter(q => q.topic === 'Ethical values and norms')),
      "Social values and stereotypes survey": transformDataForHistogram(data_answers.filter(q => q.topic === 'Social values and stereotypes'))
    };
    
    return { data_clean, data_answers, surveyDatasets };
  } catch (error) {
    console.error("Error loading the CSV file:", error);
    throw error;
  }
}

function transformDataForHistogram(questions) {
  // Transform the questions data into the format expected by the histogram
  return questions.map(q => ({
    attribute: q.overall_question,
    values: [
      { range: '1-3', value: q.values_1_3 || 0 },
      { range: '4-6', value: q.values_4_6 || 0 },
      { range: '7-10', value: q.values_7_10 || 0 }
    ]
  }));
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

// Shared variable across make_histograms and interactive globe
let selected_country_code = null;

function make_histograms(selectedQuestions, data_clean, data_answers) {
  if (!selected_country_code) {
    console.warn("No country selected.");
    return;
  }

  // Get mapping from first selected question
  const questionIndex = selectedQuestions[0].index;
  const questionData = data_answers.find(row => row.index === questionIndex);

  let possibleAnswersMapping = {};
  if (questionData && questionData.possible_answers) {
    const rawMapping = JSON.parse(fixMappingString(questionData.possible_answers));
    for (const label in rawMapping) {
      possibleAnswersMapping[Number(rawMapping[label])] = label;
    }
  }

  // Recompute datasets with the new country
  datasets.Gender = computeBinnedDataset(data_clean, selected_country_code, questionIndex, 'Q260', genderMap);
  datasets.Age = computeBinnedDataset(data_clean, selected_country_code, questionIndex, 'Q287', ageMap);
  datasets.Religion = computeBinnedDataset(data_clean, selected_country_code, questionIndex, 'Q289', religionMap);

  selectedDataset = "Gender";

  // Reset button highlights
  Array.from(buttonsContainer.children).forEach(b => {
    b.style.opacity = (b.textContent === "Gender") ? "1" : "0.7";
  });

  // Redraw histogram
  draw_histogram("histogram-container", datasets[selectedDataset], possibleAnswersMapping);
}

function build_histograms(containerId, selected_country, data_clean, data_answers) {
  // Create histogram module directly in the container
  const histogramModule = document.createElement("div");
  histogramModule.id = "histogram-module";
  histogramModule.style.flexGrow = "1";
  histogramModule.style.marginRight = "20px";
  document.getElementById(containerId).appendChild(histogramModule);

  // Dropdown for questions (Exploration_questions)
  const dropdownContainer = document.createElement("div");
  dropdownContainer.id = "dropdown-container";
  dropdownContainer.style.margin = "0";
  dropdownContainer.style.marginBottom = "24px";

  const questionSelect = document.createElement("select");
  questionSelect.id = "question-select";
  questionSelect.style.padding = "10px";
  questionSelect.style.fontSize = "16px";
  questionSelect.style.marginRight = "0";

  Object.keys(Exploration_questions).forEach((key) => {
    const option = document.createElement("option");
    option.value = Exploration_questions[key];  // Use the question code as value
    option.text = key;
    questionSelect.appendChild(option);
  });

  dropdownContainer.appendChild(questionSelect);
  histogramModule.appendChild(dropdownContainer);   // Dropdown on top

  // Buttons for datasets (Gender, Age, Religion)
  const buttonsContainer = document.createElement("div");
  buttonsContainer.id = "buttons-container";
  buttonsContainer.style.display = "flex";
  buttonsContainer.style.flexDirection = "row";
  buttonsContainer.style.gap = "12px";
  buttonsContainer.style.marginBottom = "24px";
  histogramModule.appendChild(buttonsContainer);

  // Initialize datasets object
  const datasets = {
    Gender: [],
    Age: [],
    Religion: []
  };

  // Get the selected question
  const selected_question = questionSelect.value;

  // Find the possible answers string for the selected question
  const questionData = data_answers.find(row => row.index === selected_question);
  console.log("question data", questionData);
  let possibleAnswersMapping = {};
  if (questionData && questionData.possible_answers) {
    // Parse and invert the possible_answers string
    const rawMapping = JSON.parse(fixMappingString(questionData.possible_answers));
    for (const text in rawMapping) {
      possibleAnswersMapping[rawMapping[text]] = text; // Create mapping from number to text
    }
  }

  console.log("Debug - Computing datasets with:");
  console.log("- Country:", selected_country);
  console.log("- Question:", selected_question);
  console.log("- Possible Answers Mapping:", possibleAnswersMapping);
  console.log("- Category keys:", { gender: 'Q260', age: 'Q287', religion: 'Q289' });

  // Dynamically build datasets after a country/question is chosen
  datasets.Gender = computeBinnedDataset(data_clean, selected_country, selected_question, 'Q260', genderMap);
  console.log("Debug - Gender dataset:", datasets.Gender);

  datasets.Age = computeBinnedDataset(data_clean, selected_country, selected_question, 'Q287', ageMap);
  console.log("Debug - Age dataset:", datasets.Age);

  datasets.Religion = computeBinnedDataset(data_clean, selected_country, selected_question, 'Q289', religionMap);
  console.log("Debug - Religion dataset:", datasets.Religion);

  const datasetKeys = Object.keys(datasets);
  let selectedDataset = datasetKeys[0]; // Default

  datasetKeys.forEach((key) => {
    const btn = document.createElement("button");
    btn.textContent = key;
    btn.style.margin = "0";
    btn.style.padding = "10px 15px";
    btn.style.fontSize = "16px";
    btn.style.border = "none";
    btn.style.borderRadius = "6px";
    btn.style.backgroundColor = "#6c63ff";
    btn.style.color = "white";
    btn.style.cursor = "pointer";
    btn.style.opacity = key === selectedDataset ? "1" : "0.7";
    btn.onclick = () => {
      selectedDataset = key;
      Array.from(buttonsContainer.children).forEach(b => b.style.opacity = "0.7");
      btn.style.opacity = "1";
      updateHistogram();
    };
    buttonsContainer.appendChild(btn);
  });

  // Histogram chart container (where the SVG is drawn)
  const histogramChartContainer = document.createElement("div");
  histogramChartContainer.id = "histogram-chart-container";
  histogramModule.appendChild(histogramChartContainer);

  // Update histogram when dropdown or button changes
  function updateHistogram() {
    console.log("Debug - Drawing histogram for dataset:", selectedDataset);
    console.log("Debug - Dataset content:", datasets[selectedDataset]);
    // Pass the ID of the specific chart container to draw_histogram
    draw_histogram("histogram-chart-container", datasets[selectedDataset], possibleAnswersMapping);
  }

  // Dropdown event
  questionSelect.addEventListener("change", () => {
    const newQuestion = questionSelect.value;
    console.log("Debug - Question changed to:", newQuestion);

    // Find the possible answers mapping for the new question
    const questionData = data_answers.find(row => row.index === newQuestion);
    possibleAnswersMapping = {};

    const rawMapping = JSON.parse(fixMappingString(questionData.possible_answers));
    for (const text in rawMapping) {
        possibleAnswersMapping[rawMapping[text]] = text; // Create mapping from number to text
    }

    console.log("Debug - New Possible Answers Mapping:", possibleAnswersMapping);

    datasets.Gender = computeBinnedDataset(data_clean, selected_country, newQuestion, 'Q260', genderMap);
    datasets.Age = computeBinnedDataset(data_clean, selected_country, newQuestion, 'Q287', ageMap);
    datasets.Religion = computeBinnedDataset(data_clean, selected_country, newQuestion, 'Q289', religionMap);
    console.log("homemade question mapping", questionData)
    // Pass the updated possibleAnswersMapping to updateHistogram
    console.log("📊 About to draw histogram with mapping:");
    console.log(possibleAnswersMapping);

    updateHistogram(); // updateHistogram will now use the latest selected_question and generate the mapping internally
  });

  // Initial draw
  console.log("Debug - Performing initial histogram draw");
  // Find the initial possible answers mapping
  const initialQuestionData = data_answers.find(row => row.index === questionSelect.value);
  let initialPossibleAnswersMapping = {};
  if (initialQuestionData && initialQuestionData.possible_answers) {
    const rawMapping = JSON.parse(fixMappingString(initialQuestionData.possible_answers));
    for (const text in rawMapping) {
      initialPossibleAnswersMapping[rawMapping[text]] = text; // Create mapping from number to text
    }
  }
  // Pass the initial possibleAnswersMapping to draw_histogram, targeting the chart container
  draw_histogram("histogram-chart-container", datasets[Object.keys(datasets)[0]], initialPossibleAnswersMapping);
}

async function run_quiz(topic, containerId, globe) {
  // Load data and select questions
  const { data_clean, data_answers, surveyDatasets } = await loadData();
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

  // Initialize distances
  let question_nbr = 1;
  for (const question of selectedQuestions) {
    console.log("Processing question:", question);
    const selectedKey = await showQuestion(question);
    console.log("User selected:", selectedKey);
    const answer = selectedKey[1];
    const question_idx = question.index;

    const questionScores = Object.values(validAnswers).reduce((byC, user) => {
      const userAnswer = parseInt(user[question_idx], 10);
      const diff = Math.abs(userAnswer - answer) / Object.keys(question.possible_answers).length;
      user.distance += diff;
      const country = user.B_COUNTRY_ALPHA;
      const norm = user.distance / question_nbr;
      const entry = byC[country] ||= { total: 0, count: 0 };
      entry.total += norm;
      entry.count += 1;
      return byC;
    }, {});

    for (let c in questionScores) {
      distanceByCountry[c] = questionScores[c];
      distanceByCountry[c].totalDistance = distanceByCountry[c].total / distanceByCountry[c].count;
    }

    console.log("Debug: distanceByCountry object after calculation:", distanceByCountry);

    // Derive the per-country heatmap score
    const [minScore, maxScore] = ((v) => [Math.min(...v), Math.max(...v)])(
      Object.values(distanceByCountry).map(o => o.totalDistance)
    );

    let heatmapScore = {};
    for (let [countryCode, countryValues] of Object.entries(distanceByCountry)) {
      heatmapScore[countryISOMapping[countryCode]] = 1 - (countryValues.totalDistance - minScore) / (maxScore - minScore);
    }

    console.log("formatedValues", heatmapScore);
    update_countries(globe.polygonSeries, heatmapScore);

    question_nbr += 1;
  }

  // Find best match
  const closestCountry = Object.entries(distanceByCountry).reduce((closest, [country, data]) => {
    return data.totalDistance < closest.totalDistance ? { country, totalDistance: data.totalDistance } : closest;
  }, { country: null, totalDistance: Infinity });

  console.log("Country with smallest distance:", closestCountry);
  console.log("with a final score of:", compute_final_score(closestCountry.totalDistance), "%")
  console.log("Quiz complete!");

  // Get the container that held the quiz questions (which is the sectionSelector div)
  const quizContainerElement = document.getElementById(containerId);

  // Create the quiz results panel
  const quizResultsPanel = document.createElement("div");
  quizResultsPanel.id = "quiz-results-panel";
  quizResultsPanel.classList.add("module"); // Add the module class for styling
  quizResultsPanel.style.flexGrow = "1"; // Allow it to take up available space

  // Add best match information to the quiz results panel
  const bestMatchText = document.createElement("div");
  bestMatchText.id = "best-match-text";
  bestMatchText.style.color = "white"; // Set text color
  bestMatchText.style.fontSize = "18px";
  bestMatchText.style.marginBottom = "20px";

  if (closestCountry && closestCountry.country) {
    bestMatchText.innerHTML = `<h2>Best Match: ${codeISOMapping[countryISOMapping[closestCountry.country]]}</h2><p>Score: ${compute_final_score(closestCountry.totalDistance)}%</p>`;
    // Show best match on the globe panel only if a match was found
    globe.chart.showBestMatch({
      name: codeISOMapping[countryISOMapping[closestCountry.country]],
      score: closestCountry.totalDistance
    });
  } else {
    bestMatchText.innerHTML = `<h2>No Best Match Found</h2><p>Could not calculate a compatibility score.</p>`;
    console.warn("No closest country found after quiz.");
  }

  quizResultsPanel.appendChild(bestMatchText);

  // Replace the quiz container element with the quiz results panel
  if (quizContainerElement && quizContainerElement.parentNode) {
      quizContainerElement.parentNode.replaceChild(quizResultsPanel, quizContainerElement);
  } else {
      console.error("Could not find quiz container element or its parent to replace.");
  }

  console.log("Debug - Selected Country:", closestCountry.country);
  console.log("Debug - First few rows of data_clean:", data_clean.slice(0, 3));

  // Build histograms within the quiz results panel
  build_histograms("quiz-results-panel", closestCountry.country, data_clean, data_answers);
}

function compute_final_score(dist){
  return(((1 - dist) * 100).toFixed(2))
}

function draw_histogram(containerId, data, possibleAnswersMapping = {}) {

  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear previous content

  const svg = d3.select(`#${containerId}`)
    .append("svg")
    .attr("width", 600)
    .attr("height", 600);

  const width = 600;
  const height = 600;
  const innerRadius = 0;
  const outerRadius = 100;

  const g = svg.append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  // Assign each group a base color from a palette
  const colorPalette = [
    '#3a015c', // purple
    '#2b59c3', // blue
    '#16c172', // green
    '#f6c90e', // yellow
    '#ff8811', // orange
    '#ff4d6d', // red
    '#9d4edd',  // violet
    '#00b7c2', // teal/cyan — pairs beautifully with purple and green
    '#ff66c4'  // bubblegum pink — adds a fresh, vibrant contrast to blue and red
  ];







  const groupColor = d3.scaleOrdinal()
    .domain(data.map(d => d.attribute))
    .range(colorPalette.slice(0, data.length)); // just enough colors

  const radius = d3.scaleLinear()
    .domain([0, 100])
    .range([innerRadius, outerRadius]);

  const angle = d3.scaleBand()
    .domain(data.map(d => d.attribute))
    .range([0, 2 * Math.PI]);

  data.forEach(group => {
    const startAngle = angle(group.attribute);
    const endAngle = startAngle + angle.bandwidth();
    let cumulative = 0;

    // Sort values descending so darker slices are inside
    const sortedValues = [...group.values].sort((a, b) => b.value - a.value);

    const base = d3.hcl(groupColor(group.attribute));
    const totalSlices = sortedValues.length;

    sortedValues.forEach((d, i) => {
      const norm = i / (totalSlices - 1 || 1);
      const lightness = 80 - norm * 40; // 80 → 40, lightest to darkest
      const shadedColor = d3.hcl(base.h, base.c, lightness).toString();

      const arc = d3.arc()
        .innerRadius(radius(cumulative))
        .outerRadius(radius(cumulative + d.value))
        .startAngle(startAngle)
        .endAngle(endAngle);

      g.append("path")
        .attr("d", arc)
        .attr("fill", shadedColor)
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.5);

      g.append("title")
        .text(`${group.attribute}: ${possibleAnswersMapping[d.range] || d.range} - ${d.value}%`);

      cumulative += d.value;
    });
  });

  // Group Labels
  const labelOffset = outerRadius + 40;
  g.selectAll("text.attribute-label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "attribute-label")
    .attr("x", d => Math.cos(angle(d.attribute) + angle.bandwidth() / 2 - Math.PI / 2) * labelOffset)
    .attr("y", d => Math.sin(angle(d.attribute) + angle.bandwidth() / 2 - Math.PI / 2) * labelOffset)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text(d => d.attribute)
    .style("font-size", "12px")
    .style("fill", "white");

    console.log("🎯 Inside draw_histogram, mapping received:");
console.table(possibleAnswersMapping);

  // Legend (optional)
const uniqueRanges = Array.from(
    new Set(data.flatMap(d => d.values.map(v => Number(v.range))))
  ).sort(d3.ascending);

  // Improved dynamic legend with actual colors used per group
const legend = svg.append("g")
  .attr("class", "legend")
  .attr("transform", `translate(20, ${height - 80})`); // Adjust position as needed

// 1. Extract full range of unique answer values (sorted)
const fullRange = Array.from(
  new Set(data.flatMap(group => group.values.map(d => Number(d.range))))
).sort(d3.ascending);

// 2. Create <defs> for the gray gradient
const defs = svg.append("defs");

const grayGradient = defs.append("linearGradient")
  .attr("id", "gray-gradient")
  .attr("x1", "0%")
  .attr("x2", "100%");

fullRange.forEach((rangeVal, i) => {
  const norm = i / (fullRange.length - 1 || 1);
  const lightness = 80 - norm * 40; // 80 (light gray) to 40 (dark gray)
  const color = d3.hcl(0, 0, lightness).toString(); // HCL gray tone

  grayGradient.append("stop")
    .attr("offset", `${norm * 100}%`)
    .attr("stop-color", color);
});

// 3. Draw the legend container group
const legendGroup = svg.append("g")
  .attr("class", "gray-legend")
  .attr("transform", `translate(${width / 2 - 500 / 2}, ${height - 50})`);

const gradientWidth = 500;
const gradientHeight = 15;

// 4. Draw the gray gradient bar
legendGroup.append("rect")
  .attr("width", gradientWidth)
  .attr("height", gradientHeight)
  .attr("fill", "url(#gray-gradient)")
  .attr("stroke", "#ccc")
  .attr("stroke-width", 0.5);

// 5. Add ticks and labels
const tickGroup = legendGroup.append("g")
  .attr("transform", `translate(0, ${gradientHeight})`);

fullRange.forEach((rangeVal, i) => {
  const norm = i / (fullRange.length - 1 || 1);
  const x = norm * gradientWidth;
  const label = possibleAnswersMapping[rangeVal] || rangeVal;

  // Tick line
  tickGroup.append("line")
    .attr("x1", x)
    .attr("x2", x)
    .attr("y1", 0)
    .attr("y2", 6)
    .attr("stroke", "#ccc")
    .attr("stroke-width", 1);

  // Tick label
  tickGroup.append("text")
    .attr("x", x)
    .attr("y", 18)
    .attr("text-anchor", "middle")
    .text(label)
    .style("fill", "#fff")
    .style("font-size", "12px");
});


}

function computeBinnedDataset(data_clean, selected_country, selected_question, category_key, labelMap = {}) {
  // Filter data for the selected country and ensure all required columns have positive values
  const valid = data_clean.filter(row => {
    const countryMatch = row.B_COUNTRY_ALPHA === selected_country;
    const questionMatch = row[selected_question] > 0;
    let categoryMatch = row[category_key] > 0;

    // Special filtering for Religion (Q289) to include keys 0 through 7
    if (category_key === 'Q289') {
      const religionValue = Number(row[category_key]);
      categoryMatch = religionValue >= 0 && religionValue <= 7;
    }

    return countryMatch && questionMatch && categoryMatch;
  });

  // Group the data by category and question value
  const grouped = {};
  valid.forEach(row => {
    const groupVal = row[category_key];
    const questionVal = row[selected_question];
    
    if (!grouped[groupVal]) {
      grouped[groupVal] = {};
    }
    if (!grouped[groupVal][questionVal]) {
      grouped[groupVal][questionVal] = 0;
    }
    grouped[groupVal][questionVal]++;
  });

  // Calculate percentages for each group
  const result = [];
  for (const [groupVal, counts] of Object.entries(grouped)) {
    // Ensure the groupVal is within the desired range for Religion before processing
    if (category_key === 'Q289' && (Number(groupVal) < 0 || Number(groupVal) > 7)) {
        continue; // Skip if it's Religion and outside the desired keys
    }

    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
    
    // Use the label map, falling back to string value if not found
    const label = labelMap[groupVal] !== undefined ? labelMap[groupVal] : String(groupVal);

    const groupDict = {
      attribute: label,
      values: []
    };

    // Sort question values to ensure consistent order
    const sortedValues = Object.keys(counts).sort((a, b) => Number(a) - Number(b));
    
    for (const questionVal of sortedValues) {
      const percent = (counts[questionVal] / total * 100).toFixed(2);
      groupDict.values.push({
        range: String(questionVal),
        value: Number(percent) // Convert to number
      });
    }
    
    result.push(groupDict);
  }

  return result;
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


function create_interactive_globe(container_id, onCountryClick){
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
			dataField: "value",            
			key: "fill",                   
			min: am5.color(0xeeeeee),       
			max: am5.color(0x0052cc),        
			minValue: 0,                    
      maxValue: 1,                     
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
              );  
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
        startText:  "Low Similarity",
        endText:    "High Similarity"
			})
    );

    heatLegend.startLabel.setAll({
      fill: am5.color(0xffffff),     
      fontSize: "0.75em",            
      fontWeight: "500"              
    });

    heatLegend.endLabel.setAll({
      fill: am5.color(0xffffff),     
      fontSize: "0.75em",            
      fontWeight: "500"              
    });

		// Remove tooltip on hover and disable hover fill (or comment them out)
		polygonSeries.mapPolygons.template.setAll({
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
        text: "",               
        fontSize: 14,
        fill: am5.color(0x000000),
        width: am5.percent(100),    
        textAlign: "center",        
        x: am5.percent(50),         
        centerX: am5.percent(50)    
          })
    );

    // trigger function
    chart.showBestMatch = function(bestCountry) {
      panelLabel.set("text", 
        `Best Match:\n${bestCountry.name}\nScore: ${compute_final_score(bestCountry.score.toFixed(2))}%`
      );
      panel.animate({
        key: "opacity",
        to: 1,
        duration: 400,
        easing: am5.ease.out(am5.ease.cubic)
      });
    };

    // clickable country
    polygonSeries.mapPolygons.template.events.on("click", ev => {
      const data = ev.target.dataItem.dataContext;
      const contryFinalScore = (data.value * 100).toFixed(2);
      const countryId = data.id;       // your alpha-2 code
      const countryName = data.name;     // human-readable name
      
      console.log(`Clicked: ${countryName} (${countryId})`);

      // Get the 3-letter country code using the reverse mapping
      const threeLetterCode = getKeyByValue(countryISOMapping, countryId);

      if (threeLetterCode && typeof onCountryClick === 'function') {
        onCountryClick(threeLetterCode); // Pass the 3-letter code to the callback
      }
      
      panelLabel.set("text",
        `${countryName}\nScore: ${contryFinalScore}%`
      );
      panel.current_country = data.id;
    });

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
	.text("Select Your Topic");

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
	const svg = d3.select("#"+container_id)
	  .append("svg")
	  .attr("width", 500)
	  .attr("height", 500);

	const introText = [
	  "Hello!  Welcome in the Data-Vizards lair!",
	  "Have you ever wondered whether you'd get along with people if you",
	  "moved abroad? We have—and that's exactly where this project began.",
	  "Our aim was to quantify how well someone might fit in when they",
	  "relocate to another country.",
	  "So we rolled up our sleeves and dove into the World Values Survey,",
	  "mining questions about trust, tolerance, and friendship to calculate a",
	  '"cultural compatibility" score for every nation on the map.',
	  "But we didn't stop at a single number. We wanted you to explore how",
	  "different groups see the world, too—a woman moving abroad might",
	  "care most about what other women think, just as age, religion,",
	  "economic class, and more can shape your experience.",
	  "That's why we give you the option to choose from multiple survey",
	  "filters, view an interactive map of your best-match countries, and then",
	  "drill down into the detailed responses of each country and",
	  "demographic group."
	].join("\n");

	const formatedText = introText.split("\n");

	const text = svg.append("text")
	  .attr("x", 20)
	  .attr("y", 20)
	  .attr("class", "intro_text")
	  .attr('fill','white')
	  .attr('text-align','center')

	text.selectAll("tspan")
	  .data(formatedText)
	  .enter().append("tspan")
	  .attr("x", text.attr("x"))           // reset x each line
	  .attr("dy", (d,i) => i === 0 ? 0 : "1.2em")  // first line at y, others shifted
	  .text(d => d);

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
	const { data_clean, data_answers, surveyDatasets } = await loadData();
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
    .on("click", () => {
      console.log('Explore');
      window.location.href = 'src/explore/explore.html'
    });
	// Create main dashboard
	const dashboard = document.createElement("div");
	dashboard.id = "dashboard";
	document.body.appendChild(dashboard);
	// Left Panel (Globe)
	const chartDiv = document.createElement("div");
	chartDiv.id = "chartdiv";
  chartDiv.classList.add("module");
	dashboard.appendChild(chartDiv);

  // Right Panel (Initially Introduction, later Quiz Results/Histogram)
  const introductionDiv = document.createElement("div");
  introductionDiv.id = "introduction";
  introductionDiv.classList.add("module");
  dashboard.appendChild(introductionDiv);

  // Function to handle country selection (both initial and clicks)
  const handleCountrySelection = (countryCode) => {
    // Find the quiz results panel (it replaces the introduction panel after the quiz)
    const quizResultsPanel = document.getElementById("quiz-results-panel");
    if (quizResultsPanel) {
       // Clear previous histogram and build new one within the existing quiz results panel
      // Note: We are targeting the quizResultsPanel to append the histogram module to.
      const histogramModule = document.getElementById("histogram-module");
      if (histogramModule) {
         histogramModule.remove(); // Remove the old histogram module
      }
      build_histograms("quiz-results-panel", countryCode, data_clean, data_answers);
    }
    // If quizResultsPanel doesn't exist, it means the quiz hasn't finished yet,
    // so we don't build histograms on country click at this stage.
  };

  // Create the globe with the country selection handler
  const globe = await create_interactive_globe("chartdiv", handleCountrySelection);

	// Create the introduction content within the introduction panel
	create_introduction("introduction", globe);

	// verify that everything ran smoothly
	console.log('working');
});

// Helper function to get object key by value
function getKeyByValue(object, value) {
  for (const key in object) {
    if (object.hasOwnProperty(key) && object[key] === value) {
      return key;
    }
  }
  return undefined;
}

