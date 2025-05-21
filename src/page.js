
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
  question_nbr = 1;
  for (const question of selectedQuestions) {
    console.log("Processing question:", question);
    const selectedKey = await showQuestion(question);
    console.log("User selected:", selectedKey);
    console.log("With corresponds to answer:", selectedKey[1]);
    console.log(validAnswers[0].distance);
    const answer = selectedKey[1];
    const question_idx = question.index;

    // Compute distance with other users

    validAnswers.forEach(user => {
      // Get the user's answer (str) for this question and convert it to a number.
      const userAnswer = parseInt(user[question_idx], 10);
      const country = user.B_COUNTRY_ALPHA;
      // Compute the normalized absolute difference.
      const diff = Math.abs(userAnswer - answer) / question.possible_answers.length;
      // Accumulate the distance.
      user.distance += diff;

      if (!distanceByCountry[country]) {
        distanceByCountry[country] = { totalDistance: 0, count: 0 };
      }

      // If you want to use the cumulative distance computed in the loop,
      // use either user.distance (if still cumulative) or user.avgDistance if already divided.
      distanceByCountry[country].totalDistance = user.distance / question_nbr;
      distanceByCountry[country].count += 1;
        });
      console.log(distanceByCountry);


    console.log(validAnswers[0].distance);

    // question_count
    question_nbr += 1;
	  //validAnswers += abs(validAnswers[question_idx] - answer) / len(question.possible_answers)
	//Average over the countries
	//top_matches = df_distance.groupby('B_COUNTRY_ALPHA').mean(numeric_only=True).reset_index()
	// Average over nbr of questions
	//const dist = (1 - (top_matches['Distance'] /i)) * 100
  }
  console.log("Quiz complete!");
}


function fixMappingString(mapping) {
  // Convert keys enclosed in single quotes to double quotes.
  let valid = mapping.replace(/'([^']+)'\s*:/g, '"$1":');
  // Also replace string values enclosed in single quotes.
  valid = valid.replace(/:\s*'([^']+?)'/g, ': "$1"');
  return valid;
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
  const width = 500,
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
    .range([0, width - offsetLeft - 30]);

  // Append the bars.
  svg.selectAll("rect")
    .data(data)
    .enter().append("rect")
      .attr("x", offsetLeft)
      .attr("y", (d, i) => offsetTop + i * (barHeight + barGap))
      .attr("width", d => xScale(d[1]))
      .attr("height", barHeight - 4)
      .attr("fill", "gray")
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

