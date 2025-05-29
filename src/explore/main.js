import { drawGenericDonut, getAgeCounts, getSexCounts, getReligionCounts, getEducationCounts, getEconClassCounts, getEthnicityCounts, renderDonutLegend} from './demographics.js';
import { countryNameMap } from './dataMaps.js';
let chartInstance = null;

const sexMap = { 1: 'Male', 2: 'Female' };
const religionMap = {
  0: 'None',
  1: 'Roman Catholic',
  2: 'Protestant',
  3: 'Orthodox',
  4: 'Jew',
  5: 'Muslim',
  6: 'Hindu',
  7: 'Buddhist',
  8: 'Other'
};
const educationMap = {
  0: 'None/Pre-primary',
  1: 'Primary',
  2: 'Lower secondary',
  3: 'Upper secondary',
  4: 'Post-secondary',
  5: 'Short-cycle tertiary',
  6: 'University',
  7: 'University',
  8: 'University'
};
const econClassMap = {
  1: 'Upper class',
  2: 'Upper middle',
  3: 'Lower middle',
  4: 'Working class',
  5: 'Lower class'
};
const ethnicityMap = {
  1: 'White',
  2: 'Black',
  3: 'South Asian',
  4: 'East Asian',
  5: 'Arabic/Central Asian',
  6: 'Southeast Asian',
  7: 'Indigenous',
  8: 'Other'
};

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const data = await d3.csv('../../data/DF_Clean.csv', d3.autoType);

    const data_ethnicity = await d3.csv('../../data/Q290_with_categories.csv', d3.autoType);


    function updateDemographicChart() {
      const selected = document.querySelector('input[name="demCategory"]:checked').value;
      // Remove previous chart if it exists
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
      if (selected === 'age') {
        const { labels, values } = getAgeCounts(data);
        chartInstance = drawGenericDonut({
          labels,
          values,
          colors: [' #66001a', ' #e91e63', ' #ffb6c1', ' #b23a9a', ' #2e0854', ' #8e44ad']
        });
        renderDonutLegend(labels, [' #66001a', ' #e91e63', ' #ffb6c1', ' #b23a9a', ' #2e0854', ' #8e44ad']);
      } else if (selected === 'sex') {
        const { labels, values } = getSexCounts(data);
        chartInstance = drawGenericDonut({
        labels,
        values,
        colors: [' #e91e63', 'rgb(150, 126, 255)']
    });
      renderDonutLegend(labels, [' #e91e63', 'rgb(150, 126, 255)']);

    } else if (selected === 'religion') {
    const { labels, values } = getReligionCounts(data);
    chartInstance = drawGenericDonut({
      labels,
      values,
      colors: [
        'rgb(16, 6, 122)', // None
        'rgb(51, 56, 197)', // Roman Catholic
        'rgb(19, 77, 147)', // Protestant
        'rgb(48, 147, 233)', // Orthodox
        'rgb(154, 214, 240)', // Jew
        'rgb(34, 193, 156)', // Muslim
        'rgb(56, 142, 109)', // Hindu
        'rgb(11, 61, 68)', // Buddhist
        'rgb(181, 237, 180)'  // Other
      ]
    });
    renderDonutLegend(labels, [
      'rgb(16, 6, 122)', // None
        'rgb(51, 56, 197)', // Roman Catholic
        'rgb(19, 77, 147)', // Protestant
        'rgb(48, 147, 233)', // Orthodox
        'rgb(154, 214, 240)', // Jew
        'rgb(34, 193, 156)', // Muslim
        'rgb(56, 142, 109)', // Hindu
        'rgb(11, 61, 68)', // Buddhist
        'rgb(181, 237, 180)'  // Other
    ]);
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
    renderDonutLegend(labels, [
      'rgb(145, 145, 145)', // None/Pre-primary
      'rgb(241, 15, 192)', // Primary
      'rgb(150, 8, 93)', // Lower secondary
      'rgb(55, 4, 31)', // Upper secondary
      'rgb(103, 22, 135)', // Post-secondary non-tertiary
      'rgb(160, 83, 191)', // Short-cycle tertiary
      'rgb(220, 163, 235)'  // University
    ]);
  } else if (selected === 'econClass') {
    const { labels, values } = getEconClassCounts(data);
    chartInstance = drawGenericDonut({
      labels,
      values,
      colors: [
        ' #587b7f',  // Upper class
        ' #1E2019',  // Upper middle
        ' #394032',    // Lower middle
        ' #8DAB7F',   // Working class
        ' #CFEE9E'    // Lower class
      ]
    });
    renderDonutLegend(labels, [
      ' #587b7f',  // Upper class
      ' #1E2019',  // Upper middle
      ' #394032',    // Lower middle
      ' #8DAB7F',   // Working class
      ' #CFEE9E'    // Lower class
    ]); 
  } else if (selected === 'ethnicity') {
    const { labels, values } = getEthnicityCounts(data_ethnicity);
    chartInstance = drawGenericDonut({
      labels,
      values,
      colors: [
        'rgb(163, 123, 13)', // White
        'rgb(236, 177, 125)', // Black
        'rgb(248, 107, 107)', // South Asian
        'rgb(255, 69, 63)', // East Asian
        'rgb(174, 22, 22)', // Arabic/Central Asian
        'rgb(108, 4, 4)', // Southeast Asian
        'rgb(53, 8, 8)', // Indigenous
        'rgb(118, 68, 68)'  // Other
      ]
    });
    renderDonutLegend(labels, [
      'rgb(163, 123, 13)', // White
      'rgb(236, 177, 125)', // Black
      'rgb(248, 107, 107)', // South Asian
      'rgb(255, 69, 63)', // East Asian
      'rgb(174, 22, 22)', // Arabic/Central Asian
      'rgb(108, 4, 4)', // Southeast Asian
      'rgb(53, 8, 8)', // Indigenous
      'rgb(118, 68, 68)'  // Other
    ]);
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

    // COUNTRIES SIMILARITIES

    d3.json('../../data/country_embeddings.json').then(data => {
      if (!Array.isArray(data)) {
        data = Object.entries(data).map(([country, coords]) => ({
          country,
          ...coords
        }));
      }

   
      const minR = 25, maxR = 30;
      const sizeExtent = d3.extent(data, d => d.size || 1);
      const rScale = d3.scaleSqrt()
        .domain(sizeExtent)
        .range([minR, maxR]);

      const width = 2150, height = 950;
      const svg = d3.select('#countryBubbles')
        .attr('height', height);

      // Create tooltip div
      const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('background-color', 'rgb(17, 0, 255)')
        .style('color', 'white')
        .style('padding', '12px')
        .style('border-radius', '8px')
        .style('font-family', 'Charter, serif')
        .style('font-size', '35px');

      // Add zoom behavior
      const zoom = d3.zoom()
        .scaleExtent([0.5, 8])
        .on('zoom', (event) => {
          g.attr('transform', event.transform);
        });

      // Create a group for all zoomable elements
      const g = svg.append('g');

      // Apply zoom behavior to the SVG
      //svg.call(zoom);

      // Find min/max for scaling
      const xExtent = d3.extent(data, d => d.x);
      const yExtent = d3.extent(data, d => d.y);

      const xScale = d3.scaleLinear()
        .domain(xExtent)
        .range([maxR, width - maxR]);
      const yScale = d3.scaleLinear()
        .domain(yExtent)
        .range([maxR, height - maxR]);

      // Draw bubbles
      g.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.x))
        .attr('cy', d => yScale(d.y))
        .attr('r', d => rScale(d.size || 1))
        .attr('fill', 'rgb(17, 0, 255)')
        .attr('opacity', 0.8)
        .on('mouseover', function(event, d) {
          d3.select(this).attr('opacity', 1);
          tooltip
            .style('visibility', 'visible')
            .html(countryNameMap[d.country] || d.country)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', function() {
          d3.select(this).attr('opacity', 0.8);
          tooltip.style('visibility', 'hidden');
        });

      // Add country labels
      g.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('x', d => xScale(d.x))
        .attr('y', d => yScale(d.y))
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .attr('fill', '#fff')
        .attr('font-family', 'Charter, serif')
        .attr('font-size', 24)
        .text(d => d.country || d.country)
        .on('mouseover', function(event, d) {
          d3.select(this).attr('opacity', 1);
          tooltip
            .style('visibility', 'visible')
            .html(countryNameMap[d.country] || d.country)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 28) + 'px');
          })
          .on('mouseout', function() {
            d3.select(this).attr('opacity', 0.8);
            tooltip.style('visibility', 'hidden');
          });
    });

    // Demographic visualization of individuals with color options
    Promise.all([
      d3.json('../../data/individuals_embeddings.json'),
      d3.csv('../../data/individuals_clusters.csv')
    ]).then(([embeddings_individuals, demographics_individuals]) => {
      
      // Sample 30% of the data
      const sampleSize = Math.floor(embeddings_individuals.length * 0.3);
      const sampleIndices = d3.shuffle(d3.range(embeddings_individuals.length)).slice(0, sampleSize);
      
      // Get sampled data
      const sampledEmbeddings = sampleIndices.map(i => embeddings_individuals[i]);
      const sampledDemographics = sampleIndices.map(i => demographics_individuals[i]);
      
      // Join the data
      const data_individuals = sampledEmbeddings.map((d, i) => ({
        ...d,
        age: +sampledDemographics[i].Q262,
        sex: +sampledDemographics[i].Q260,
        religion: +sampledDemographics[i].Q289,
        education: +sampledDemographics[i].Q275,
        econClass: +sampledDemographics[i].Q287,
        ethnicity: +sampledDemographics[i].mapped_category,
        country: sampledDemographics[i].B_COUNTRY_ALPHA
      }));
      
      
      // Color scales based on demographics.js
      const colorScales = {
        age: d => {
          const age = d.age;
          if (age >= 18 && age <= 24) return ' #66001a';
          if (age >= 25 && age <= 34) return ' #e91e63';
          if (age >= 35 && age <= 44) return ' #ffb6c1';
          if (age >= 45 && age <= 54) return ' #b23a9a';
          if (age >= 55 && age <= 64) return ' #2e0854';
          if (age >= 65) return ' #8e44ad';
          return '#66001a'; // Default for unknown values (usually <18 => set to first age category)
        },
        sex: d => {
          if (d.sex === 1) return ' #e91e63'; // Male
          if (d.sex === 2) return 'rgb(150, 126, 255)'; // Female
          return '#ccc'; // Default for unknown values
        },
        religion: d => {
          const religionColors = {
            0: 'rgb(16, 6, 122)',   // None
            1: 'rgb(51, 56, 197)',  // Roman Catholic
            2: 'rgb(87, 155, 238)', // Protestant
            3: 'rgb(48, 147, 233)', // Orthodox
            4: 'rgb(154, 214, 240)', // Jew
            5: 'rgb(34, 193, 156)', // Muslim
            6: 'rgb(56, 142, 109)', // Hindu
            7: 'rgb(11, 61, 68)',   // Buddhist
            8: 'rgb(181, 237, 180)' // Other
          };
          return religionColors[d.religion] || '#ccc';
        },
        education: d => {
          const educationColors = {
            0: 'rgb(145, 145, 145)', // None/Pre-primary
            1: 'rgb(241, 15, 192)', // Primary
            2: 'rgb(150, 8, 93)', // Lower secondary
            3: 'rgb(55, 4, 31)', // Upper secondary
            4: 'rgb(103, 22, 135)', // Post-secondary non-tertiary
            5: 'rgb(160, 83, 191)', // Short-cycle tertiary
            6: 'rgb(220, 163, 235)', // University (Bachelor)
            7: 'rgb(220, 163, 235)', // University (Master)
            8: 'rgb(220, 163, 235)'  // University (Doctoral)
          };
          return educationColors[d.education] || '#ccc';
        },
        econClass: d => {
          const econColors = {
            1: ' #587b7f',  // Upper class
            2: ' #1E2019',  // Upper middle
            3: ' #394032',    // Lower middle
            4: ' #8DAB7F',   // Working class
            5: ' #CFEE9E'    // Lower class
          };
          return econColors[d.econClass] || '#ccc';
        },
        ethnicity: d => {
          // Convert to integer if it's a floating point (1.0 → 1)
          const ethnicityValue = Math.floor(d.ethnicity);
          const ethnicityColors = {
            1: 'rgb(163, 123, 13)', // White
            2: 'rgb(236, 177, 125)', // Black
            3: 'rgb(248, 107, 107)', // South Asian
            4: 'rgb(255, 69, 63)',   // East Asian
            5: 'rgb(174, 22, 22)',   // Arabic/Central Asian
            6: 'rgb(108, 4, 4)',     // Southeast Asian
            7: 'rgb(53, 8, 8)',      // Indigenous
            8: 'rgb(118, 68, 68)'    // Other
          };
          const color = ethnicityColors[ethnicityValue];
          return color || '#ccc';
        }
      };
      
      // Draw function to update the visualization
      function drawIndividuals(colorBy) {
        
        // Get SVG
        const svg = d3.select('#individualsBubbles');
        
        // Check if SVG exists
        if (svg.empty()) {
          console.error("SVG element #individualsBubbles not found");
          return;
        }
        
        // Clear existing content
        svg.selectAll('*').remove();
        
        // Set up scales
        const width = 2150, height = 700;
        const xExtent = d3.extent(data_individuals, d => d.x);
        const yExtent = d3.extent(data_individuals, d => d.y);
        
        const xScale = d3.scaleLinear()
          .domain(xExtent)
          .range([50, width - 50]);
        const yScale = d3.scaleLinear()
          .domain(yExtent)
          .range([50, height - 50]);
        
        
        // Draw points with selected color scheme
        svg.selectAll('circle')
          .data(data_individuals)
          .enter()
          .append('circle')
          .attr('cx', d => xScale(d.x))
          .attr('cy', d => yScale(d.y))
          .attr('r', 4.5)
          .attr('fill', d => colorScales[colorBy](d))
          .attr('opacity', 0.7);
          
        updateLegend(colorBy);

        // Remove any existing tooltip div
        d3.selectAll('.bubble-tooltip').remove();

        // Tooltip div
        const tooltip = d3.select('body').append('div')
          .attr('class', 'bubble-tooltip')
          .style('position', 'absolute')
          .style('background', ' #b23a9a')
          .style('color', '#fff')
          .style('padding', '12px 16px')
          .style('border-radius', '8px')
          .style('pointer-events', 'none')
          .style('opacity', 0)
          .style('font-family', 'Charter, serif')
          .style('font-size', '25px');

        svg.selectAll('circle')
          .on('mouseover', function(event, d) {
            const bubbleColor = colorScales[colorBy](d);
            d3.select(this).attr('stroke', '#FFD700').attr('stroke-width', 3);
            tooltip.transition().duration(200).style('opacity', 0.95);
            tooltip.html(
              `Age: ${d.age}<br>
              Gender: ${sexMap[d.sex] || d.sex}<br>
              Country: ${countryNameMap[d.country] || d.country}<br>
              Religion: ${religionMap[d.religion] || d.religion}<br>
              Education: ${educationMap[d.education] || d.education}<br>
              Economic class: ${econClassMap[d.econClass] || d.econClass}<br>
              Ethnicity: ${ethnicityMap[d.ethnicity] || d.ethnicity}`
            )
            .style('background', bubbleColor)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 28) + 'px');
          })
          .on('mouseout', function() {
            d3.select(this).attr('stroke', null);
            tooltip.transition().duration(300).style('opacity', 0);
          });
      }
      
      // Initial draw
      drawIndividuals('age');
      
      // Set up event listeners for the radio buttons
      d3.selectAll('input[name="colorBy"]').on('change', function() {
        drawIndividuals(this.value);
      });
      
    }).catch(error => {
      console.error("Error in individuals visualization:", error);
    });

    const legends = {
      age: [
        { color: ' #66001a', label: '18-24' },
        { color: ' #e91e63', label: '25-34' },
        { color: ' #ffb6c1', label: '35-44' },
        { color: ' #b23a9a', label: '45-54' },
        { color: ' #2e0854', label: '55-64' },
        { color: ' #8e44ad', label: '65+' }
      ],
      sex: [
        { color: ' #e91e63', label: 'Male' },
        { color: 'rgb(150, 126, 255)', label: 'Female' }
      ],
      religion: [
        { color: 'rgb(16, 6, 122)', label: 'None' },
        { color: 'rgb(51, 56, 197)', label: 'Roman Catholic' },
        { color: 'rgb(87, 155, 238)', label: 'Protestant' },
        { color: 'rgb(48, 147, 233)', label: 'Orthodox' },
        { color: 'rgb(154, 214, 240)', label: 'Jew' },
        { color: 'rgb(34, 193, 156)', label: 'Muslim' },
        { color: 'rgb(56, 142, 109)', label: 'Hindu' },
        { color: 'rgb(11, 61, 68)', label: 'Buddhist' },
        { color: 'rgb(181, 237, 180)', label: 'Other' }
      ],
      education: [
        { color: 'rgb(145, 145, 145)', label: 'None/Pre-primary' },
        { color: 'rgb(241, 15, 192)', label: 'Primary' },
        { color: 'rgb(150, 8, 93)', label: 'Lower secondary' },
        { color: 'rgb(55, 4, 31)', label: 'Upper secondary' },
        { color: 'rgb(103, 22, 135)', label: 'Post-secondary' },
        { color: 'rgb(160, 83, 191)', label: 'Short-cycle tertiary' },
        { color: 'rgb(220, 163, 235)', label: 'University' }
      ],
      econClass: [
        { color: ' #587b7f', label: 'Upper class' },
        { color: ' #1E2019', label: 'Upper middle' },
        { color: ' #394032', label: 'Lower middle' },
        { color: ' #8DAB7F', label: 'Working class' },
        { color: ' #CFEE9E', label: 'Lower class' }
      ],
      ethnicity: [
        { color: 'rgb(163, 123, 13)', label: 'White' },
        { color: 'rgb(236, 177, 125)', label: 'Black' },
        { color: 'rgb(248, 107, 107)', label: 'South Asian' },
        { color: 'rgb(255, 69, 63)', label: 'East Asian' },
        { color: 'rgb(174, 22, 22)', label: 'Arabic/Central Asian' },
        { color: 'rgb(108, 4, 4)', label: 'Southeast Asian' },
        { color: 'rgb(53, 8, 8)', label: 'Indigenous' },
        { color: 'rgb(118, 68, 68)', label: 'Other' }
      ]
    };

    function updateLegend(category) {
      const legendDiv = document.getElementById('individual-legend');
      legendDiv.innerHTML = legends[category].map(item =>
        `<div class="legend-item">
          <span class="legend-color" style="background:${item.color}"></span>
          <span class="legend-label">${item.label}</span>
        </div>`
      ).join('');
    }

  } catch (err) {
    console.error('Failed to load data or render charts:', err);
  }
});
