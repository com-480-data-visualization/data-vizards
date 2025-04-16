
function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}

const barCountryMapping = {
	1: "USA",  // Bar 1 highlights United States
	2: "CAN",  // Bar 2 highlights Canada
	3: "GBR",  // Bar 3 highlights United Kingdom
	4: "FRA",  // Bar 4 highlights France
	5: "DEU",  // Bar 5 highlights Germany
	6: "BRA",  // Bar 6 highlights Brazil
	7: "RUS",  // Bar 7 highlights Russia
	8: "IND",  // Bar 8 highlights India
	9: "CHN",  // Bar 9 highlights China
	10: "AUS"  // Bar 10 highlights Australia
  };

//const MARGIN = { top: 10, right: 10, bottom: 10, left: 10 };

function interactive_globe(polygonSeries){
	// --------------------
	// Interactive Earth Globe Code (amCharts 5)
	// --------------------
	am5.ready(function() {

	// Create root element
	var root = am5.Root.new("chartdiv");

	// Set themes
	root.setThemes([
		am5themes_Animated.new(root)
	]);

	// Create the map chart with orthographic projection
	var chart = root.container.children.push(am5map.MapChart.new(root, {
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
	polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
		geoJSON: am5geodata_worldLow
	}));

	// Remove tooltip on hover and disable hover fill (or comment them out)
	polygonSeries.mapPolygons.template.setAll({
		// tooltipText: "{name}", // Optional: if you want tooltips on activation, you can leave it.
		toggleKey: "active",
		interactive: true
	});

	// Commenting out the hover state so that hover does not trigger highlighting:
	// polygonSeries.mapPolygons.template.states.create("hover", {
	//   fill: root.interfaceColors.get("primaryButtonHover")
	// });

	// Create series for background fill
	var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
	backgroundSeries.mapPolygons.template.setAll({
		fill: root.interfaceColors.get("alternativeBackground"),
		fillOpacity: 0.1,
		strokeOpacity: 0
	});
	backgroundSeries.data.push({
		geometry: am5map.getGeoRectangle(90, 180, -90, -180)
	});

	// Create graticule series
	var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
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
	});
}

function interactive_bar(){
	// Global variables for use in both amCharts and D3 code
	let polygonSeries;  // Will be set in the am5.ready block
	interactive_globe(polygonSeries)

	const data = d3.range(10, 0, -1);

	// Set up dimensions
	const width = 300, height = 500, barHeight = 7, offsetLeft = 50, offsetTop = 20;
	const barGap = 30;
	
	//setup title
	d3.select("#module-container")
	.insert("div", ":first-child")
	.attr("id", "module-title")
	.style("width", "100%")             // Ensure full width if needed
	.style("text-align", "center")      // Center the text horizontally
	.style("padding-top", "20px")       // Adjust vertical position
	.style("color", "white")            // Set text color to white
	.style("font-size", "24px")         // Increase the font size
	.text("Ethical Value X");

	// Create an SVG
	const svg = d3.select("#module-container")
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
		// Click action
		//.on("click", (event, d) => {
		//  alert("You clicked the bar for " + (10-d));
		//});
		.on("click", (event, d) => {
			// Clear previous active state from all countries
			polygonSeries.mapPolygons.each(function(polygon) {
			  polygon.set("active", false);
			});
			
			// Lookup the country associated with this bar value.
			// For simplicity, assume d (bar value) maps directly.
			const countryID = barCountryMapping[d];
			
			if (countryID) {
			  // Get the polygon by its id; this method depends on how amCharts IDs are set in your geoJSON.
			  let polygon = polygonSeries.getPolygonById(countryID);
			  if (polygon) {
				// Toggle the active state: this highlights the country.
				polygon.set("active", true);
				// Optionally, you can force the tooltip to show:
				// polygon.showTooltip();
			  } else {
				console.warn("Country polygon not found for id: " + countryID);
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

whenDocumentLoaded(() => {

	// create title
	d3.select("body")
    .append("div")
    .attr("id", "main-title")
    .text("World Value Survey");
	// create image divider
	const newDiv = document.createElement("div");
	newDiv.id = "image-container";
	newDiv.classList.add("middle-left");
	document.body.appendChild(newDiv);
	// select container
	const domElement = d3.select("#image-container");
	const imagePath = '/Figures/raw_map_asset.png';
	domElement.append('img').attr('src', imagePath);
	// Interactive bar
	const module_div = document.createElement("div");
	module_div.id = "module-container";
	document.body.appendChild(module_div);
	interactive_bar()
	console.log('working');

});

