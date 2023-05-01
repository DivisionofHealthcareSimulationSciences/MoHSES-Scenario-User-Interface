<template>
  <v-toolbar style="color: white" color="#3c2d70">
    <v-toolbar-title>BioGears Plotting Tool</v-toolbar-title>
  </v-toolbar>
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <v-card class="mt-n12">
        <v-card-text>
          <p style="font-size: 20px">Please upload your .CSV:</p>
          <br>
          <v-file-input v-model="chosenFile"></v-file-input>
          <v-btn color="success" @click="importFile">Import File</v-btn>
          <br>
          <br>
          <v-row v-if="array2D">
            <v-col cols="12">
              <v-select label="Please select a variable." v-model="selectPlot" id="selectButton" :items="allGroup.slice(1)"></v-select>
            </v-col>
          <v-row>
<v-col v-if="selectPlot" cols="auto"> <!-- Use cols="auto" to make the column's width adjust to the content -->
  <v-btn @click="plotSelectedChart">Plot Chart</v-btn>
  <br>
              
</v-col>
<v-col v-if="selectPlot" cols="auto">
              <v-btn @click="downloadChart">Download Chart</v-btn>
              <br>
</v-col>
</v-row>

          </v-row>
        </v-card-text>
        <v-row justify="center">
          <div ref="chart"></div>
          <br>
          <br>
        </v-row>
        <br>
      </v-card>
    </v-container>
  </v-main>
</template>
<script>
  // import * as d3 from 'd3';
  import vegaEmbed from 'vega-embed';
  export default {
    data: () => ({
      currentSpec: null,
      chosenFile: null,
      data: null,
      columnData: [],
      array2D: null,
      allGroup: [],
      selectPlot: null
    }),
    methods: {
      async downloadChart() {
          if (!this.currentSpec) {
  return; // Exit the method if no chart has been plotted
}

// Get the Vega view instance from the vegaEmbed function
const { view } = await vegaEmbed(this.$refs.chart, this.currentSpec, {
  actions: false,
});

// Generate the PNG image data URL
const dataUrl = await view.toImageURL('png');

// Create a temporary link element for downloading the chart
const link = document.createElement('a');
link.href = dataUrl;
link.download = 'chart.png';
link.style.display = 'none';

// Add the link to the DOM, click it, and remove it
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
},
      importFile() {
        if (this.chosenFile === null) {
          this.data = "No File Chosen"
        } else {
          var reader = new FileReader();
          var file = this.chosenFile[0]
          // Use the javascript reader object to load the contents
          // of the file in the v-model prop
          reader.readAsText(file);
          reader.onload = () => {
            this.data = reader.result;
            const rows = this.data.split('\n')
            this.array2D = Array.from({
              length: rows[0].split(',').length
            }, () => []);
            for (let i = 0; i < rows.length; i++) {
              const columns = rows[i].split(',');
              for (let j = 0; j < columns.length; j++) {
                this.array2D[j].push(columns[j]);
              }
            }
            for (let i = 0; i < this.array2D.length; i++) {
              this.allGroup.push(this.array2D[i][0])
              this.array2D[i] = this.array2D[i].slice(1).map(str => parseFloat(str));
            }
            console.log(this.allGroup)
            console.log(this.array2D)
            console.log(this.array2D)
          }
        }
      },
      plotChart(data) {
          const xAxisData = this.array2D[0];
  const yAxisData = data;
  
  const dataset = xAxisData.map((value, index) => ({
    xValue: value,
    yValue: yAxisData[index]
  }));

  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    data: { values: dataset },
    mark: 'line',
    title: {
  text: this.selectPlot + ' Versus Time (s)', // Set the title text
  anchor: 'middle', // Position the title (start, middle, or end)
  fontSize: 16, // Set the font size
  fontWeight: 'bold', // Set the font weight
  dy: -10, // Adjust the vertical distance between the title and the chart
},
    encoding: {
      x: { field: 'xValue', type: 'quantitative', title: 'Time (s)' },
      y: { field: 'yValue', type: 'quantitative', title: this.selectPlot },
      tooltip: [
        { field: 'xValue', type: 'quantitative', title: 'Time (s)' },
        { field: 'yValue', type: 'quantitative', title: this.selectPlot },
      ],
    },
    selection: {
  mySelection: {
    type: 'interval',
    bind: 'scales', // Bind the selection to the chart scales
    encodings: ['x', 'y'], // Apply the selection to both x and y axes
    zoom: true, // Enable zooming
    translate: true, // Enable panning
  },
},
    width: 700, // Add the desired width
height: 550, // Add the desired height
  };
    vegaEmbed(this.$refs.chart, spec, { actions: false });
    return spec
},


  plotSelectedChart() {
    if (this.array2D && this.allGroup && this.selectPlot) {
      this.currentSpec = this.plotChart(this.array2D[this.allGroup.indexOf(this.selectPlot)]);
    }
  },
     
      }
  }
</script>