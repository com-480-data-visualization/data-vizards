const Chart = window.Chart;
let chartInstance = null;

export function drawGenericDonut({
  labels,
  values,
  colors,
  fontFamily = 'Charter, serif'
}) {
  const ctx = document.getElementById('demoDonut').getContext('2d');
  if (chartInstance) {
    chartInstance.destroy();
  }
  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
     aspectRatio: 1,
      layout: {
        padding: 20
      },
      plugins: {
        legend: {
          position: 'left',
          align: 'center',
          labels: {
            color: '#fff',
            font: {
              family: fontFamily,
              size: 24
            },
            usePointStyle: true,
            pointStyle: 'rect',
            padding: 20,
            boxWidth: 25,
            boxHeight: 25
          },
          display: false,
          fullSize: false,
          rtl: false,
          reverse: false
        },
        tooltip: {
          enabled: true,
          titleFont: {
            size: 22,
            family: fontFamily
          },
          bodyFont: {
            size: 22,
            family: fontFamily
          },
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.raw || 0;
              return `${label}: ${value} respondents`;
            }
          }
        }
      }
    }
  });
  return chartInstance;
}
  
export function getAgeCounts(data) {
  const ageGroups = [
    { label: '18-24', min: 18, max: 24 },
    { label: '25-34', min: 25, max: 34 },
    { label: '35-44', min: 35, max: 44 },
    { label: '45-54', min: 45, max: 54 },
    { label: '55-64', min: 55, max: 64 },
    { label: '65+',   min: 65, max: Infinity }
  ];
  const counts = {};
  ageGroups.forEach(g => counts[g.label] = 0);
  data.forEach(person => {
    const age = Number(person.Q262);
    if (!isNaN(age)) {
      const bucket = ageGroups.find(g => age >= g.min && age <= g.max);
      if (bucket) counts[bucket.label]++;
    }
  });
  const labels = ageGroups.map(g => g.label);
  const values = labels.map(l => counts[l]);
  return { labels, values };
}
  

export function getSexCounts(data) {
  const valueMap = { 1: 'Male', 2: 'Female' };
  const counts = { Male: 0, Female: 0 };
  data.forEach(person => {
    const label = valueMap[person.Q260];
    if (label) counts[label]++;
  });
  const labels = Object.values(valueMap);
  const values = labels.map(l => counts[l]);
  return { labels, values };
}

export function getReligionCounts(data) {
  const valueMap = {
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
  // Initialize counts
  const counts = {};
  Object.values(valueMap).forEach(label => counts[label] = 0);

  data.forEach(person => {
    const val = Number(person.Q289);
    if (val >= 0 && val <= 8) {
      const label = valueMap[val];
      if (label) counts[label]++;
    }
  });

  const labels = Object.values(valueMap);
  const values = labels.map(l => counts[l]);
  return { labels, values };
}

export function getEducationCounts(data) {
  const groupMap = {
    0: 'None/Pre-primary',
    1: 'Primary',
    2: 'Lower secondary',
    3: 'Upper secondary',
    4: 'Post-secondary',
    5: 'Short-cycle tertiary',
    6: 'University', // Bachelor or equivalent
    7: 'University', // Master or equivalent
    8: 'University' // Doctoral or equivalent
  };

  // Initialize counts
  const groupLabels = [
    'None/Pre-primary',
    'Primary',
    'Lower secondary',
    'Upper secondary',
    'Post-secondary',
    'Short-cycle tertiary',
    'University'
  ];
  const counts = {};
  groupLabels.forEach(label => counts[label] = 0);

  data.forEach(person => {
    const val = Number(person.Q275);
    if (val >= 0 && val <= 8) {
      const group = groupMap[val];
      if (group) counts[group]++;
    }
  });

  const labels = groupLabels;
  const values = labels.map(l => counts[l]);
  return { labels, values };
}

export function getEconClassCounts(data) {
  const valueMap = {
    1: 'Upper class',
    2: 'Upper middle',
    3: 'Lower middle',
    4: 'Working class',
    5: 'Lower class'
  };
  // Initialize counts
  const counts = {};
  Object.values(valueMap).forEach(label => counts[label] = 0);

  data.forEach(person => {
    const val = Number(person.Q287);
    if (val >= 1 && val <= 5) {
      const label = valueMap[val];
      if (label) counts[label]++;
    }
  });

  const labels = Object.values(valueMap);
  const values = labels.map(l => counts[l]);
  return { labels, values };
}

export function getEthnicityCounts(data) {
  const valueMap = {
    1: 'White',
    2: 'Black',
    3: 'South Asian',
    4: 'East Asian',
    5: 'Arabic/Central Asian',
    6: 'Southeast Asian',
    7: 'Indigenous',
    8: 'Other'
  };
  // Initialize counts
  const counts = {};
  Object.values(valueMap).forEach(label => counts[label] = 0);

  data.forEach(person => {
    const val = Number(person.mapped_category);
    if (val >= 1 && val <= 8) {
      const label = valueMap[val];
      if (label) counts[label]++;
    }
  });

  const labels = Object.values(valueMap);
  const values = labels.map(l => counts[l]);
  return { labels, values };
}

/* Plot donut and legend separately otherwise display is not as desired */ 
export function renderDonutLegend(labels, colors) {
  const legendDiv = document.getElementById('demoDonutLegend');
  legendDiv.style.display = 'flex';
  legendDiv.style.flexWrap = 'wrap';
  legendDiv.style.justifyContent = 'center';
  legendDiv.style.alignItems = 'center';
  legendDiv.style.marginTop = '18px';
  legendDiv.innerHTML = labels.map((label, i) => `
    <span style="display:inline-flex;align-items:center;margin-right:18px;margin-bottom:8px;">
      <span style="
        display:inline-block;
        width:18px;
        height:18px;
        background:${colors[i]};
        border-radius:50%;
        border:2px solid #fff;
        margin-right:8px;
      "></span>
      <span style="font-family:Charter,serif;font-size:24px;color:#fff;">${label}</span>
    </span>
  `).join('');
}
