let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function (data) {
  console.log(data);
  // Assuming you have otu_ids defined or passed as an argument
  calculateTopOTUs(data, otu_ids);
});

// calculate top otus
function calculateTopOTUs(data, otu_ids) {
  let filterData = filterDataByTopOTUs(data, otu_ids);

  let OTUCounts = {}; // Initialize an empty object to store incident counts

  filterData.forEach(entry => {
    let sample_values = entry.sample_value; // Assuming there's a sample_value property in your data
    OTUCounts[sample_values] = (OTUCounts[sample_values] || 0) + 1;
  });

  console.log(OTUCounts);

  return OTUCounts;
}


// bubble chart
function bubbleChart(OTUCounts) {
  let labels = Object.otu_ids(OTUCounts);
  let values = Object.sample_values(OTUCounts);

  let trace = {
      x: labels, 
      y: values,
      mode: 'markers',
      marker: {
          size: values, // Use incident counts for marker size
          sizemode: 'area',
          color: values,
          colorscale: 'Jet',
          opacity: 0.5
      }
  };

  let data = [trace];

  let layout = {
    title: 'OTU Bubble Chart',
    xaxis: {
        title: 'OTU Type'
    },
    yaxis: {
        title: 'Sample Values'
    }
};

Plotly.newPlot('bubble', data, layout);
}

// bar chart

