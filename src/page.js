
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
	0: "Global Survey",  // Bar 10 highlights Australia
	1: "Social capital and trust survey",  // Bar 1 highlights United States
	2: "Ethical values and norms survey",  // Bar 2 highlights Canada
	3: "Social values and stereotypes survey",  // Bar 3 highlights Spain
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

function create_interactive_bar(globe){
	// Set up dimensions
	const data = d3.range(10, 0, -1);
	const width = 300, height = 500, barHeight = 7, offsetLeft = 50, offsetTop = 20;
	const barGap = 30;
	
	//setup title
	d3.select("#interactivebar")
	.insert("div", ":first-child")
	.attr("id", "module-title")
	.style("width", "100%")             // Ensure full width if needed
	.style("text-align", "center")      // Center the text horizontally
	.style("padding-top", "20px")       // Adjust vertical position
	.style("color", "white")            // Set text color to white
	.style("font-size", "24px")         // Increase the font size
	.text("Ethical Value X");

	// Create an SVG
	const svg = d3.select("#interactivebar")
	  .append("svg")
	  .attr("width", width)
	  .attr("height", height);
	
	// Scale for bar lengths (longer bars for higher numbers)
	const xScale = d3.scaleLinear()
	  .domain([0, d3.max(data)])
	  .range([0, width - offsetLeft - 20]); // 20 is just a small margin
	
	// Append bars
	svg.selectAll("rect")
	  .data(data)
	  .enter().append("rect")
		.attr("x", offsetLeft)
		.attr("y", (d, i) => offsetTop + i * (barHeight + barGap))
		.attr("width", d => xScale(d))
		.attr("height", barHeight - 4) // slight gap
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
			if (globe.polygonSeries) {
				globe.polygonSeries.mapPolygons.each(function(polygon) {
				polygon.set("active", false);
			  });
			}
			// Look up the country associated with this bar's value.
			const countryID = barCountryMapping[d];
			if (countryID && globe.polygonSeries) {
			  // Use getDataItemById to retrieve the data item for the country.
			  let dataItem = globe.polygonSeries.getDataItemById(countryID);
			  if (dataItem) {
				// Then get the mapPolygon from the data item.
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
			  console.warn("No country mapping defined for bar value: " + d);
			}
		  });
	
	// Append the text at the tip of each bar
	svg.selectAll("text")
	  .data(data)
	  .enter().append("text")
		.attr("x", d => offsetLeft + xScale(d) + 10)
		.attr("y", (d, i) => offsetTop + i * (barHeight + barGap) + (barHeight / 2) - 2)
		.attr("alignment-baseline", "middle")
		.attr("fill", "#ccc")
		.style("font-size", "12px") 
		.text(d => d);
}

function create_section_selector(container_id){
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
			console.log('Selected: '+sectionMapping[d])
		});
		
}

whenDocumentLoaded(async () => {
	// create title
	d3.select("body")
    .append("div")
    .attr("id", "main-title")
    .text("World Value Survey")
	.style("cursor", "pointer")
	.on("click", (event, d) => {
		location.reload(true);
	});
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
	create_section_selector("sectionSelector");
	// verify that everything ran smoothly
	char_div.classList.add("module");
	//bar.classList.add("module");
	sections.classList.add("module")
	console.log('working');

});

