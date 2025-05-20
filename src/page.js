
function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}


const barCountryMapping = {
	0: "AU",  // Bar 10 highlights Australia
	1: "US",  // Bar 1 highlights United States
	2: "CA",  // Bar 2 highlights Canada
	3: "ES",  // Bar 3 highlights Spain
	4: "FR",  // Bar 4 highlights France
	5: "DE",  // Bar 5 highlights Germany
	6: "BR",  // Bar 6 highlights Brazil
	7: "RU",  // Bar 7 highlights Russia
	8: "IN",  // Bar 8 highlights India
	9: "CH",  // Bar 9 highlights Switzerland
  };

const sectionMapping = {
	0: "Global",  // Bar 10 highlights Australia
	1: "Social capital, trust and organizational membership",  // Bar 1 highlights United States
	2: "Ethical values and norms",  // Bar 2 highlights Canada
	3: "Social values and stereotypes",  // Bar 3 highlights Spain
  };


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
			paddingBottom: 20,
			paddingTop: 20,
			paddingLeft: 20,
			paddingRight: 20
		}));

		// Create main polygon series for countries
		// (We no longer set a hover state or tooltip on hover.)
		const polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
			geoJSON: am5geodata_worldLow
		}));

		// Remove tooltip on hover and disable hover fill (or comment them out)
		polygonSeries.mapPolygons.template.setAll({
			// tooltipText: "{name}", // Optional: if you want tooltips on activation, you can leave it.
			toggleKey: "active",
			interactive: true
		});

		polygonSeries.mapPolygons.template.states.create("active", {
			// Use a fill color of your choice
			fill: root.interfaceColors.get("primaryButtonHover")
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
		resolve({ root, chart, polygonSeries });
		});
  });
}

// Helper: Randomly sample n elements from an array without replacement
function sampleFromArray(arr, n) {
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

function selectRandomQuestionsAndClean(dfMetaAnswers, dfClean, selectedTopic, nbrOfQuestions = 2) {
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
  
  return { selectedQuestions, validAnswers };
}


/*
async function run_quiz(topic,container_id, globe){
	// Load data
	const {data_clean,data_answers} = await loadData()

	// Select questions and remove participants with invalid answers for these specific ones
	const {selectedQuestions, validAnswers} = selectRandomQuestionsAndClean(data_answers, data_clean, topic)
	console.log("selected questions:", selectedQuestions)
	//console.log("valid answers:", validAnswers.slice(1, 5))
	selectedQuestions.forEach((question, index) => {
	console.log(`Question ${index + 1}:`);
	console.log(`Index: ${question.index}`);
	console.log(`Specific question: ${question.specific_question}`);
	console.log(`Overall question: ${question.overall_question}`);
	//console.log(`Possible answers: ${question.possible_answers}`);
	// Here you can add any additional processing for each question.
	const oldDiv = document.getElementById(container_id);
	///// Problem with oldDiv
	const parent = oldDiv.parentNode;
	const newDiv = document.createElement("div");
	newDiv.id = "interactivebar";
	newDiv.classList.add("module");
	parent.replaceChild(newDiv, oldDiv);
	d3.select(container_id).remove();
	d = create_interactive_bar(globe,question.overall_question, question.specific_question, question.possible_answers);
	console.log(d);
	});

	
}

// VERSION 2
async function run_quiz(topic, container_id, globe) {
  // Load data
  const { data_clean, data_answers } = await loadData();

  // Select questions and clean answers
  const { selectedQuestions, validAnswers } = selectRandomQuestionsAndClean(data_answers, data_clean, topic);
  console.log("selected questions:", selectedQuestions);

  let currentIndex = 0;

  // Function to display a single question and wait for a bar selection.
  async function showQuestion(question) {
    // Replace the container content
    const oldDiv = document.getElementById(container_id);
    const parent = oldDiv.parentNode;
    const newDiv = document.createElement("div");
    newDiv.id = "interactivebar";
    newDiv.classList.add("module");
    parent.replaceChild(newDiv, oldDiv);
    d3.select(container_id).remove();

    // Return a promise that resolves when a bar is clicked.
    return new Promise(resolve => {
      create_interactive_bar(globe, question.overall_question, question.specific_question, question.possible_answers, (d) => {
        // Resolve the promise when a bar is selected.
        resolve(d);
      });
    });
  }

  // Loop through each question sequentially.
  while (currentIndex < selectedQuestions.length) {
    const question = selectedQuestions[currentIndex];
    console.log(`Question ${currentIndex + 1}:`, question);
    
    const selectedBar = await showQuestion(question);
    console.log("Bar selected for current question:", selectedBar);

    // You can now save the user's response or perform additional logic here before moving on.
    
    currentIndex++;
  }

  console.log("Quiz complete!");
}
*/
async function run_quiz(topic, container_id, globe) {
  // Load data
  const { data_clean, data_answers } = await loadData();

  // Select questions and clean answers
  const { selectedQuestions, validAnswers } = selectRandomQuestionsAndClean(data_answers, data_clean, topic);
  console.log("selected questions:", selectedQuestions);

  let currentIndex = 0;

  // Function to display a single question and wait for a bar selection
  async function showQuestion(question) {
  // Ensure the container exists or create/clear it appropriately.
  let container = document.getElementById(container_id);
  if (!container) {
    container = document.createElement("div");
    container.id = container_id;
    document.body.appendChild(container);
  } else {
    container.innerHTML = "";
  }
  
  const newDiv = document.createElement("div");
  newDiv.id = "interactivebar";
  newDiv.classList.add("module");
  container.appendChild(newDiv);

  // Return a promise that resolves when a bar is clicked.
  return new Promise(resolve => {
    create_interactive_bar(
      globe,
      question.overall_question,
      question.specific_question,
      question.possible_answers,
      (selectedKey) => {  // now selectedKey is d[0], the key corresponding to the clicked bar.
        console.log("Selected answer key:", selectedKey);
        resolve(selectedKey);
      }
    );
  });
}


  // Create a loop to iterate through questions one at a time
  while (currentIndex < selectedQuestions.length) {
    const question = selectedQuestions[currentIndex];
    console.log(`Question ${currentIndex + 1}:`, question);
    
    // Wait for the bar click on the current question.
    const selectedBar = await showQuestion(question);
    console.log("Bar selected for current question:", selectedBar);

    // (store the answer or perform additional processing.)
	
    currentIndex++;
  }

  console.log("Quiz complete!");
}


function fixMappingString(mapping) {
  // Replace keys enclosed in single quotes with double quotes.
  // This regex looks for keys in the form: 'key':
  let valid = mapping.replace(/'([^']+)'\s*:/g, '"$1":');

  // Optionally, if you also have string values enclosed in single quotes,
  // you can uncomment the following line to replace them with double quotes:
  valid = valid.replace(/:\s*'([^']+?)'/g, ': "$1"');

  return valid;
}

/*
function create_interactive_bar(globe, name , subtitle, mapping) {
  console.log("Loaded mapping",mapping);			
  // Define your mapping dictionary.
  //const mapping = {
  //  "Trust completely": 1,
  //  "Trust somewhat": 2,
  //  "Do not trust very much": 3,
  //  "Do not trust at all": 4
  //};
  const dict_mapping =JSON.parse(fixMappingString(mapping));
  console.log("Now as a dict:", dict_mapping)
  // Ensure proper key conversion before inversion
  const invertedMapping = Object.fromEntries(
  Object.entries(dict_mapping).map(([key, value]) => [value, isNaN(key) ? key : Number(key)])
  );

  console.log("inverted mapping", invertedMapping);

  // Create data as an array of [label, value] pairs.
  // Sort descending by numeric value, e.g., highest value first.
  const data = Object.entries(invertedMapping)
  .sort((a, b) => Number(b[0]) - Number(a[0]))  // sort using the numeric score
  .map(([score, label]) => [label, Number(score)]);  // reformat to [label, numericScore]

  // Set up dimensions
  const width = 500, height = 500;
  const barHeight = 7, offsetLeft = 50, offsetTop = 80;
  const barGap = 30;

  // Setup title
  const titleContainer = d3.select("#interactivebar")
    .insert("div", ":first-child")
    .attr("id", "module-title");

  titleContainer.append("div")
    .attr("class", "main-title")
    .text(name);

  titleContainer.append("div")
    .attr("class", "module-subtitle")
    .text(subtitle);

  // Create an SVG
  const svg = d3.select("#interactivebar")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Scale for bar lengths (using the numeric value d[1])
  const maxVal = d3.max(data, d => d[1]);
  const xScale = d3.scaleLinear()
    .domain([0, maxVal])
    .range([0, width - offsetLeft - 30]);  // subtracting a margin

  // Append the bars
  svg.selectAll("rect")
    .data(data)
    .enter().append("rect")
      .attr("x", offsetLeft)
      .attr("y", (d, i) => offsetTop + i * (barHeight + barGap))
      .attr("width", d => xScale(d[1]))
      .attr("height", barHeight - 4)  // slight gap for clarity
      .attr("fill", "gray")
      // Highlight on hover
      .on("mouseover", function() {
          d3.select(this).attr("fill", "white");
      })
      .on("mouseout", function() {
          d3.select(this).attr("fill", "gray");
      })
      .on("click", (event, d) => {
          // Clear previous active state from all countries.
		  console.log(d)
          if (globe.polygonSeries) {
              globe.polygonSeries.mapPolygons.each(function(polygon) {
                  polygon.set("active", false);
              });
          }
          // Look up the country associated with this bar's numeric value.
          const countryID = barCountryMapping[d];
          if (countryID && globe.polygonSeries) {
              let dataItem = globe.polygonSeries.getDataItemById(countryID);
              if (dataItem) {
                  let polygon = dataItem.get("mapPolygon");
                  if (polygon) {
                      polygon.set("active", true);
                  } else {
                      console.warn("No polygon found for country: " + countryID);
                  }
              } else {
                  console.warn("No data item found for id: " + countryID);
              }
          } else {
              console.warn("No country mapping defined for bar value: " + countryID);
          }
      });

  // Append the descriptive text at the tip of each bar (to the right)
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

  // Append the numeric value on the left of each bar
  svg.selectAll("text.number")
    .data(data)
    .enter().append("text")
      .attr("class", "number")
      .attr("x", offsetLeft - 10)
      .attr("y", (d, i) => offsetTop + i * (barHeight + barGap) + (barHeight / 2) + 1)
      .attr("text-anchor", "end")  // right-align the numbers
      .attr("alignment-baseline", "middle")
      .attr("fill", "#ccc")
      .style("font-size", "12px")
      .text(d => d[1]);

  return data;
}
*/

function create_interactive_bar(globe, name, subtitle, mapping, onBarClick) {
  console.log("Loaded mapping", mapping);           
  // Parse and reformat the mapping
  const dict_mapping = JSON.parse(fixMappingString(mapping));
  console.log("Now as a dict:", dict_mapping);
  
  // Invert mapping if needed and create data as array of [label, numericScore] pairs
  const invertedMapping = Object.fromEntries(
    Object.entries(dict_mapping).map(([key, value]) => [value, isNaN(key) ? key : Number(key)])
  );
  console.log("inverted mapping", invertedMapping);
  
  const data = Object.entries(invertedMapping)
    .sort((a, b) => Number(b[0]) - Number(a[0]))  // sort using the numeric score
    .map(([score, label]) => [label, Number(score)]);  // reformat to [label, numericScore]

  // Set up dimensions
  const width = 500, height = 500;
  const barHeight = 7, offsetLeft = 50, offsetTop = 80;
  const barGap = 30;

  // Setup title
  const titleContainer = d3.select("#interactivebar")
    .insert("div", ":first-child")
    .attr("id", "module-title");

  titleContainer.append("div")
    .attr("class", "main-title")
    .text(name);
  titleContainer.append("div")
    .attr("class", "module-subtitle")
    .text(subtitle);

  // Create an SVG
  const svg = d3.select("#interactivebar")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Scale for bar lengths
  const maxVal = d3.max(data, d => d[1]);
  const xScale = d3.scaleLinear()
    .domain([0, maxVal])
    .range([0, width - offsetLeft - 30]);

  // Append the bars with a click handler that calls the onBarClick callback
  svg.selectAll("rect")
    .data(data)
    .enter().append("rect")
      .attr("x", offsetLeft)
      .attr("y", (d, i) => offsetTop + i * (barHeight + barGap))
      .attr("width", d => xScale(d[1]))
      .attr("height", barHeight - 4)
      .attr("fill", "gray")
      // Highlight on hover
      .on("mouseover", function() {
          d3.select(this).attr("fill", "white");
      })
      .on("mouseout", function() {
          d3.select(this).attr("fill", "gray");
      })
      .on("click", (event, d) => {
          console.log("Bar clicked:", d);
          // Clear previous active state from all polygons.
          if (globe.polygonSeries) {
              globe.polygonSeries.mapPolygons.each(function(polygon) {
                  polygon.set("active", false);
              });
          }
          // Look up the country associated with this bar's numeric score.
          const score = d[1];
          const countryID = barCountryMapping ? barCountryMapping[score] : undefined;
          if (countryID && globe.polygonSeries) {
              let dataItem = globe.polygonSeries.getDataItemById(countryID);
              if (dataItem) {
                  let polygon = dataItem.get("mapPolygon");
                  if (polygon) {
                      polygon.set("active", true);
                  } else {
                      console.warn("No polygon found for country: " + countryID);
                  }
              } else {
                  console.warn("No data item found for id: " + countryID);
              }
          } else {
              console.warn("No country mapping defined for score: " + score);
          }
          // **NEW** Call the callback function to signal that a bar was clicked
          if (typeof onBarClick === 'function') {
              onBarClick(d);
          }
      });

  // Append the descriptive text at the tip of each bar
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

  // Append the numeric value on the left of each bar
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

  return data;
}

function create_section_selector(container_id,globe){
	console.log("container_id", container_id)
	const data = d3.range(0, Object.keys(sectionMapping).length, 1);
	const width = 500, height = 500, barHeight = 7, offsetLeft = 50, offsetTop = 80;
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

async function loadData() {
  try {
    const data_clean = await d3.csv("data/df_clean.csv", d3.autoType);
	const data_answers = await d3.csv("data/handwritten_answers.csv", d3.autoType);
    console.log("Data loaded successfully:", data_answers.slice(0, 5)); // Log first 5 rows
    return {data_clean,data_answers};
  } catch (error) {
    console.error("Error loading the CSV file:", error);
    throw error;
  }
}




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
	// Interactive globe
	const char_div = document.createElement("div");
	char_div.id = "chartdiv";
	dashboard.appendChild(char_div);
	const globe = await create_interactive_globe("chartdiv");
	// Interactive bar
	/*
	const bar = document.createElement("div");
	bar.id = "interactivebar";
	dashboard.appendChild(bar);
	create_interactive_bar(globe);
	*/
	// Interactive bar
	const sections = document.createElement("div");
	sections.id = "sectionSelector";
	dashboard.appendChild(sections);
	create_section_selector("sectionSelector",globe);
	// verify that everything ran smoothly
	char_div.classList.add("module");
	//bar.classList.add("module");
	sections.classList.add("module")
	console.log('working');

});

