
init();

function init() {
  var datafile = 'samples.json';
  var dropdownMenu = d3.select("#selDataset");
  d3.json(datafile).then(function(data) {
    var samples = data['samples'];
    var sampleNames = data['names'];
    var metadata = data['metadata'];
    var firstSample = metadata[0];
    sampleNames.forEach((sample) => {
      var row = dropdownMenu.append("option");
      row.text(sample);
    var panel = d3.select("#sample-metadata");
      panel.html("");
      Object.entries(firstSample).forEach(([key, value]) => {
        panel.append("div").text(`${key}: ${value}`);
      });
    })
})
}

function optionChanged(sample) {
  d3.json("samples.json").then(function(data) {
    var samples = data['samples'];
    var metadata = data['metadata'];
    var newSample = samples.filter(sampleObj => sampleObj.id == sample);
    var newMetadata = metadata.filter(sampleObj => sampleObj.id == sample);
    var firstSample = newMetadata[0];
    var sample_values = newSample[0]['sample_values'];
    var values_sliced = sample_values.slice(0, 10).reverse();
    var otu_ids = newSample[0]['otu_ids'];
    var ids_sliced = otu_ids.map(id => `OTU${id}`).slice(0, 10).reverse();
    var otu_labels = newSample[0]['otu_labels'];
    var labels_sliced = otu_labels.slice(0, 10).reverse();
    var panel = d3.select("#sample-metadata");
      panel.html("");
      Object.entries(firstSample).forEach(([key, value]) => {
        panel.append("div").text(`${key}: ${value}`);
      });
    var hbar = {
      x: values_sliced,
      y: ids_sliced,
      text: labels_sliced,
      type: "bar",
      orientation: "h"
    }
    var bubble = {
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids
      },
      text: otu_labels
    }

    var hbar_chart = [hbar];
    var bubble_chart = [bubble];

    var layout_hbar = {
      title: "Top 10 OTUs Present",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };
    var layout_bubble = {
      title: "Bubble Chart",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };
    Plotly.newPlot("bar", hbar_chart, layout_hbar);
    Plotly.newPlot("bubble", bubble_chart, layout_bubble);
  })
};
