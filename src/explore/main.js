import { drawGenericDonut, getAgeCounts, getSexCounts, getReligionCounts, getEducationCounts, getEconClassCounts, getEthnicityCounts} from './demographics.js';
import { countryNameMap } from './dataMaps.js';
let chartInstance = null;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    console.log(typeof d3);
    // ─── 1) LOAD THE DATA ───────────────────────────────
    // This path is relative to your server root (/data/DF_Clean.csv),
    // so make sure you're serving from the project root.
    const data = await d3.csv('/data/DF_Clean.csv', d3.autoType);
    console.log(`Loaded ${data.length} respondents`);

    const data_ethnicity = await d3.csv('/data/Q290_with_category.csv', d3.autoType);
    console.log("Loaded data:", data_ethnicity.slice(0, 5)); // Show first 5 rows

    function updateDemographicChart() {
      const selected = document.querySelector('input[name="demCategory"]:checked').value;
      // Remove previous chart if it exists
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
      if (selected === 'age') {
        //chartInstance = drawDonut(data);
        const { labels, values } = getAgeCounts(data);
        chartInstance = drawGenericDonut({
          labels,
          values,
          colors: ['#66001a', '#e91e63', '#ffb6c1', '#b23a9a', '#2e0854', '#8e44ad']
        });
      } else if (selected === 'sex') {
        const { labels, values } = getSexCounts(data);
        chartInstance = drawGenericDonut({
        labels,
        values,
        colors: [' #e91e63', ' #2e0854']
});

  } else if (selected === 'religion') {
  const { labels, values } = getReligionCounts(data);
  chartInstance = drawGenericDonut({
    labels,
    values,
    colors: [
      'rgb(16, 6, 122)', // None
      'rgb(51, 56, 197)', // Roman Catholic
      'rgb(87, 155, 238)', // Protestant
      'rgb(48, 147, 233)', // Orthodox
      'rgb(154, 214, 240)', // Jew
      'rgb(34, 193, 156)', // Muslim
      'rgb(56, 142, 109)', // Hindu
      'rgb(11, 61, 68)', // Buddhist
      'rgb(181, 237, 180)'  // Other
    ]
  });
} else if (selected === 'education') {
  const { labels, values } = getEducationCounts(data);
  chartInstance = drawGenericDonut({
    labels,
    values,
    colors: [
      'rgb(145, 145, 145)', // None/Pre-primary
      'rgb(241, 15, 192)', // Primary
      'rgb(150, 8, 93)', // Lower secondary
      'rgb(55, 4, 31)', // Upper secondary
      'rgb(103, 22, 135)', // Post-secondary non-tertiary
      'rgb(160, 83, 191)', // Short-cycle tertiary
      'rgb(220, 163, 235)'  // University
    ]
  });
} else if (selected === 'econClass') {
  const { labels, values } = getEconClassCounts(data);
  chartInstance = drawGenericDonut({
    labels,
    values,
    colors: [
      'rgb(0, 229, 255)', // Upper class
      'rgb(5, 126, 139)', // Upper middle
      'rgb(3, 47, 52)', // Lower middle
      'rgb(6, 94, 121)', // Working class
      'rgb(8, 84, 159)'  // Lower class
    ]
  });
} else if (selected === 'ethnicity') {
  const { labels, values } = getEthnicityCounts(data_ethnicity);
  chartInstance = drawGenericDonut({
    labels,
    values,
    colors: [
      'rgb(241, 226, 186)', // White
      'rgb(236, 177, 125)', // Black
      'rgb(248, 107, 107)', // South Asian
      'rgb(255, 69, 63)', // East Asian
      'rgb(174, 22, 22)', // Arabic/Central Asian
      'rgb(108, 4, 4)', // Southeast Asian
      'rgb(53, 8, 8)', // Indigenous
      'rgb(118, 68, 68)'  // Other
    ]
  });
} else {
        // Clear the canvas for other categories
        const ctx = document.getElementById('demoDonut').getContext('2d');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      }
    }

    // Listen for changes on the radio buttons
    document.querySelectorAll('input[name="demCategory"]').forEach(radio => {
      radio.addEventListener('change', updateDemographicChart);
    });

    // Draw the initial chart if "age" is selected
    updateDemographicChart();

    // ─── (Later) you can call your other viz functions here:
    // import { drawSimilarity } from './similarity.js';
    // import { drawClusters   } from './clusters.js';
    // drawSimilarity(data);
    // drawClusters(data);


    d3.json('../../data/country_embeddings.json').then(data => {
      console.log(data);
      // If your data is an object, convert to array
      if (!Array.isArray(data)) {
        data = Object.entries(data).map(([country, coords]) => ({
          country,
          ...coords
        }));
      }

      // Optional: If you have a 'size' property, use it; otherwise, default
      const minR = 15, maxR = 50;
      const sizeExtent = d3.extent(data, d => d.size || 1);
      const rScale = d3.scaleSqrt()
        .domain(sizeExtent)
        .range([minR, maxR]);

      const width = 1500, height = 700;
      const svg = d3.select('#countryBubbles')
        .attr('width', width)
        .attr('height', height);

      // Find min/max for scaling
      const xExtent = d3.extent(data, d => d.x);
      const yExtent = d3.extent(data, d => d.y);

      const xScale = d3.scaleLinear()
        .domain(xExtent)
        .range([maxR, width - maxR]);
      const yScale = d3.scaleLinear()
        .domain(yExtent)
        .range([maxR, height - maxR]);

      // Tooltip div
      const tooltip = d3.select('body').append('div')
        .attr('class', 'bubble-tooltip')
        .style('position', 'absolute')
        .style('background', '#222')
        .style('color', '#fff')
        .style('padding', '8px 12px')
        .style('border-radius', '6px')
        .style('pointer-events', 'none')
        .style('opacity', 0);

      // Draw bubbles
      svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.x) + (Math.random() - 0.5) * 20)
        .attr('cy', d => yScale(d.y) + (Math.random() - 0.5) * 20)
        .attr('r', d => rScale(d.size || 1))
        .attr('fill', 'blue')
        .attr('opacity', 0.8)
        .on('mouseover', function(event, d) {
          d3.select(this).attr('stroke', '#FFD700').attr('stroke-width', 4);
          tooltip.transition().duration(200).style('opacity', 0.95);
          tooltip.html(`<strong>${countryNameMap[d.country] || d.country}</strong>`)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', function() {
          d3.select(this).attr('stroke', '#fff').attr('stroke-width', 2);
          tooltip.transition().duration(300).style('opacity', 0);
        });

      // Add country labels
      svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('x', d => xScale(d.x))
        .attr('y', d => yScale(d.y))
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .attr('fill', '#fff')
        .attr('font-family', 'Charter, serif')
        .attr('font-size', 12)
        .text(d => countryNameMap[d.country] || d.country);
    });

    d3.csv('data/Q290.csv').then(data => {
      // Count occurrences of each code
      const counts = {};
      data.forEach(row => {
        const code = row.Q290;
        counts[code] = (counts[code] || 0) + 1;
      });
    });

  } catch (err) {
    console.error('Failed to load data or render charts:', err);
  }
});
