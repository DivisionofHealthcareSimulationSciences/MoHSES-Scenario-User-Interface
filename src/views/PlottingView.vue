<template>
    <v-toolbar style="color: white" color="#4b0082">
      <v-toolbar-title>BioGears Plotting Tool</v-toolbar-title>
    </v-toolbar>
    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-card class="mt-n12">
          <v-card-text>
            <p style="font-size: 20px">Please upload your .CSV:</p>
            <br>
            <v-file-input v-model="chosenFile"></v-file-input>
            <v-spacer></v-spacer>
            <v-btn @click="importFile">Import File</v-btn>
            <br>
            <br>
            <v-row v-if="array2D">
              <v-col cols="12">
                <v-select label="Please select a variable." v-model="selectPlot" id="selectButton" :items="allGroup.slice(1)"></v-select>
              </v-col>
              <v-col v-if="selectPlot" cols="12">
                <v-btn @click="plotChart(array2D[allGroup.indexOf(selectPlot)])">Plot Chart</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-row justify="center">
            <div ref="chart"></div>
            <br>
          </v-row>
        </v-card>
      </v-container>
    </v-main>
  </template>
  <script>
    import * as d3 from 'd3';
    export default {
      data: () => ({
        chosenFile: null,
        data: null,
        columnData: [],
        array2D: null,
        allGroup: [],
        selectPlot: null
      }),
      methods: {
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
          const margin = {
            top: 100,
            right: 50,
            bottom: 100,
            left: 50
          };
          const width = 800 - margin.left - margin.right;
          const height = 600 - margin.top - margin.bottom;
          console.log(data)
          d3.select(this.$refs.chart).select('svg').remove();
          // Define the scales for the X and Y axes
          const xScale = d3.scaleLinear().domain([d3.min(this.array2D[0]), d3.max(this.array2D[0])]).range([0, width]);
          const yScale = d3.scaleLinear().domain([0, d3.max(data)]).range([height, 0]);
          // Create the SVG element
          const svg = d3.select(this.$refs.chart).append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);
          // Define the line function
          const line = d3.line().x((d, i) => xScale(this.array2D[0][i])).y((d, i) => yScale(data[i]));
          // Add the title
          let title = this.selectPlot + " versus Time (s)"
          svg.append('text').attr('x', width / 2).attr('y', 0 - margin.top / 2).attr('text-anchor', 'middle').attr('font-size', '24px').text(title);
          // Create the line path
          svg.append('path').datum(this.array2D[0]).attr('d', line).attr('fill', 'none').attr('stroke', 'steelblue').attr('stroke-width', 2);
          // Add the X axis label
          svg.append('text').attr('transform', `translate(${width / 2}, ${height + margin.bottom / 1.5})`).attr('text-anchor', 'middle').attr('font-size', '16px').text('Time (s)');
          // Add the Y axis label
          svg.append('text').attr('transform', 'rotate(-90)').attr('x', 0 - height / 2).attr('y', 0 - margin.left).attr('dy', '1em').attr('text-anchor', 'middle').attr('font-size', '16px').text(this.selectPlot);
          // Create the X and Y axes
          const xAxis = d3.axisBottom(xScale);
          const yAxis = d3.axisLeft(yScale);
          svg.append('g').attr('transform', `translate(0, ${height})`).call(xAxis);
          svg.append('g').call(yAxis);
          // Add legend
          svg.append('rect').attr('x', width - 200).attr('y', 50).attr('width', 10).attr('height', 10).style('fill', 'steelblue');
          svg.append('text').attr('x', width - 185).attr('y', 60).text(this.selectPlot);
        }
      },
    }
  </script>