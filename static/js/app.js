const jsonUrl = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Use d3.json to fetch the data
d3.json(jsonUrl)
  .then((data) => {
    // Data has been successfully loaded
    console.log('Data loaded:', data);

    // Extract relevant data for the chart
    const otuIds = data.samples[0].otu_ids;
    const sampleValues = data.samples[0].sample_values;
    const otuLabels = data.samples[0].otu_labels;

    // Set up the SVG container
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const svg = d3.select('body').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Set up scales
    const xScale = d3.scaleLinear().domain([0, d3.max(otuIds)]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, d3.max(sampleValues)]).range([height, 0]);
    const sizeScale = d3.scaleLinear().domain([0, d3.max(sampleValues)]).range([5, 20]);
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Create circles
    svg.selectAll('circle')
      .data(otuIds)
      .enter()
      .append('circle')
      .attr('cx', (d, i) => xScale(d))
      .attr('cy', (d, i) => yScale(sampleValues[i]))
      .attr('r', (d, i) => sizeScale(sampleValues[i]))
      .attr('fill', (d, i) => colorScale(i));

    // Add labels
    svg.selectAll('text')
      .data(otuIds)
      .enter()
      .append('text')
      .attr('x', (d, i) => xScale(d))
      .attr('y', (d, i) => yScale(sampleValues[i]))
      .text((d, i) => otuLabels[i])
      .attr('font-size', '10px')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle');

    // Add X axis
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale));

    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(yScale));

    // Add axis labels
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height + margin.bottom - 10) + ')')
      .text('OTU IDs');

    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90) translate(' + (-margin.left) + ',' + (height / 2) + ')')
      .text('Sample Values');
  })
  .catch((error) => {
    // Handle errors if the data fails to load
    console.error('Error loading data:', error);
  });
