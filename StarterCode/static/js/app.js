
  var datafile = 'samples.json';
  d3.json(datafile).then(function(data) {
    console.log(data);
    var sample_values = data['samples'][0]['sample_values'];
    var otu_ids = data['samples'][0]['otu_ids'];
    var otu_labels = data['samples'][0]['otu_labels'];
    var hbar = {
      x: sample_values,
      y: otu_ids,
      text: otu_labels,
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
});
