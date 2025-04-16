
function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}

const TEST_TEMPERATURES = [13, 18, 21, 19, 26, 25, 16];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

//const MARGIN = { top: 10, right: 10, bottom: 10, left: 10 };

function interactive_bar(){

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
		.on("click", (event, d) => {
		  alert("You clicked the bar for " + (10-d));
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
	const imagePath = 'Figures/raw_map_asset.png';
	domElement.append('img').attr('src', imagePath);
	// Interactive bar
	const module_div = document.createElement("div");
	module_div.id = "module-container";
	document.body.appendChild(module_div);
	interactive_bar()
	console.log('working');

});

