 const jsonUrl = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';
 const margin = { top: 20, right: 20, bottom: 50, left: 100 };
 const width = 800 - margin.left - margin.right;
 const height = 400 - margin.top - margin.bottom;
    
 
  // Bar Chart code
 // Use d3.json to fetch the data
    d3.json(jsonUrl)
      .then((data) => {
       console.log('Data loaded:', data);
    
        
        const otuIds = data.samples[0].otu_ids;
        const sampleValues = data.samples[0].sample_values;
        const otuLabels = data.samples[0].otu_labels;
    
        const combinedData = otuIds.map((id, index) => ({
          otu_id: id,
          sample_value: sampleValues[index],
          otu_label: otuLabels[index],
        }));
    
        // Sort the data by sample_values in descending order
        const sortedData = combinedData.sort((a, b) => b.sample_value - a.sample_value);
    
        // Take the top 10 OTUs
        const top10Data = sortedData.slice(0, 10);
    
        // Set up the SVG container for the horizontal bar chart
        const margin = { top: 20, right: 20, bottom: 50, left: 100 };
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;
    
        const svgBarChart = d3.select('body').append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    
        // Set up scales for the bar chart
        const xScale = d3.scaleLinear()
          .domain([0, d3.max(top10Data, d => d.sample_value)])
          .range([0, width]);
    
        const yScale = d3.scaleBand()
          .domain(top10Data.map(d => d.otu_id))
          .range([0, height])
          .padding(0.1);
    
        // Create horizontal bars
        svgBarChart.selectAll('rect')
          .data(top10Data)
          .enter()
          .append('rect')
          .attr('x', 0)
          .attr('y', d => yScale(d.otu_id))
          .attr('width', d => xScale(d.sample_value))
          .attr('height', yScale.bandwidth())
          .attr('fill', 'steelblue');
    
        // Add labels
        svgBarChart.selectAll('text')
          .data(top10Data)
          .enter()
          .append('text')
          .attr('x', d => xScale(d.sample_value) + 5)
          .attr('y', d => yScale(d.otu_id) + yScale.bandwidth() / 2)
          .text(d => d.otu_label)
          .attr('font-size', '10px')
          .attr('text-anchor', 'start')
          .attr('alignment-baseline', 'middle');
    
        // Add X axis
        svgBarChart.append('g')
          .attr('transform', 'translate(0,' + height + ')')
          .call(d3.axisBottom(xScale));
    
        // Add Y axis
        svgBarChart.append('g')
          .call(d3.axisLeft(yScale));
    
        // Add axis labels
        svgBarChart.append('text')
          .attr('text-anchor', 'middle')
          .attr('transform', 'translate(' + (width / 2) + ',' + (height + margin.bottom - 10) + ')')
          .text('Sample Values');
    
        svgBarChart.append('text')
          .attr('text-anchor', 'middle')
          .attr('transform', 'rotate(-90) translate(' + (-margin.left) + ',' + (height / 2) + ')')
          .text('OTU IDs');
      })
      .catch((error) => {
        // Handle errors
        console.error('Error loading data:', error);
      });
    
      //Bubble Chart code
// Use d3.json to fetch the data
d3.json(jsonUrl)
  .then((data) => {
   
    console.log('Data loaded:', data);

    // Extract data
    const otuIds = data.samples[0].otu_ids;
    const sampleValues = data.samples[0].sample_values;
    const otuLabels = data.samples[0].otu_labels;

    
    const svgBubbleChart = d3.select('body').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Set up scales for the bubble chart
    const xBubbleScale = d3.scaleLinear().domain([0, d3.max(otuIds)]).range([0, width]);
    const yBubbleScale = d3.scaleLinear().domain([0, d3.max(sampleValues)]).range([height, 0]);
    const sizeBubbleScale = d3.scaleLinear().domain([0, d3.max(sampleValues)]).range([5, 20]);
    const colorBubbleScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Create circles for the bubble chart
    svgBubbleChart.selectAll('circle')
      .data(otuIds)
      .enter()
      .append('circle')
      .attr('cx', (d, i) => xBubbleScale(d))
      .attr('cy', (d, i) => yBubbleScale(sampleValues[i]))
      .attr('r', (d, i) => sizeBubbleScale(sampleValues[i]))
      .attr('fill', (d, i) => colorBubbleScale(i));

    // Add labels for the bubble chart
    svgBubbleChart.selectAll('text')
      .data(otuIds)
      .enter()
      .append('text')
      .attr('x', (d, i) => xBubbleScale(d))
      .attr('y', (d, i) => yBubbleScale(sampleValues[i]))
      .text((d, i) => otuLabels[i])
      .attr('font-size', '10px')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle');

    // Add X axis for the bubble chart
    svgBubbleChart.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xBubbleScale));

    // Add Y axis for the bubble chart
    svgBubbleChart.append('g')
      .call(d3.axisLeft(yBubbleScale));

    // Add axis labels for the bubble chart
    svgBubbleChart.append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height + margin.bottom - 10) + ')')
      .text('OTU IDs');

    svgBubbleChart.append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90) translate(' + (-margin.left) + ',' + (height / 2) + ')')
      .text('Sample Values');
  })
  .catch((error) => {
    // Handle errors if the data fails to load
    console.error('Error loading data:', error);
  });
