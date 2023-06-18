// Assign the url to the url variable
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';
// Create the promise
const datapromise = d3.json(url);
console.log('Data Promise', datapromise);
// Read in the data from the url
function init(){
d3.json(url).then(function(data) {
    // Separate the names from the data
    let names = data.names
    console.log(names)
    // Create the dropdown menu
    let dropDownMenu = d3.select('#selDataset')
    // Append the names to the dropdown menu
    for (i = 0; i < names.length; i++){
        dropDownMenu.append('option').text(names[i]).property('value', names[i]);

    }
    let sample = names[0];
    // Make the functions run when the page is loaded
    demo(sample);
    barChart(sample);
    bubbleChart(sample);
    
})
};
// Create the demographics table
function demo(sampleid){
    d3.json(url).then(function(data1){
        // Get the metadata
        let meta = data1.metadata;
    //    Put the metadata in an array
        let metaarray = meta.filter(x => x.id == sampleid)
        let value = metaarray[0]
        console.log(value)
    //    Attach the metadata to the html
        d3.select('#sample-metadata').html('')
        Object.entries(value).forEach(([key, value]) => {
            d3.select('#sample-metadata').append('p').text(`${key}: ${value}`)
        })})
    };
// Create the bar chart
function barChart(sampleid){
    d3.json(url).then(function(data2){
        // Separate the samples from the data
        let samples = data2.samples;
        // Put the samples in an array
        let samplearray = samples.filter(x => x.id == sampleid)
        let samplevalue = samplearray[0]
        console.log(samplevalue)
        // Get the otu ids, labels, and sample values
        let otu_ids = samplevalue.otu_ids
        let otu_labels = samplevalue.otu_labels
        let sample_values = samplevalue.sample_values
        
        // Create the labels for the chart
        let yticks = otu_ids.slice(0,10).map(x => `OTU ${x}`).reverse()
        let trace = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            text: otu_labels.slice(0,10).reverse(),
            type: 'bar',
            orientation: 'h'
        }
        let data = [trace]
        let layout = {
            title: 'Top 10 OTUs'
        }
    //    Plot the chart
        Plotly.newPlot('bar', data, layout)
    })
};

// Create the bubble chart
function bubbleChart(sampleid){
    d3.json(url).then(function(data3){
        // Separate the samples from the data
        let samples = data3.samples;
        // Put the samples in an array
        let samplearray = samples.filter(x => x.id == sampleid)
        let samplevalue = samplearray[0]
        console.log(samplevalue)
    //    Get the otu ids, labels, and sample values
        let otu_ids = samplevalue.otu_ids
        let otu_labels = samplevalue.otu_labels
        let sample_values = samplevalue.sample_values
        
    //    Trace the chart
        let trace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: otu_ids,
                size: sample_values
            }
        }
        let data = [trace]
        let layout = {
            title: 'Top 10 OTUs'
        }
    //    Plot the chart
        Plotly.newPlot('bubble', data, layout)
    })
};


// Create the option changed function
function optionChanged(newsample){
    demo(newsample);
    barChart(newsample);
    bubbleChart(newsample);
  
};
// Call the init function
init();



