<template>
    <v-toolbar style="color: white" color="#08564D">
       <v-toolbar-title>BioGears Plotting Tool</v-toolbar-title>
    </v-toolbar>
    <v-card class="text-center">
       <v-card-text>
          This is the BioGears Plotting Tool.
       </v-card-text>
       <v-file-input
        v-model="file"
        accept=".csv"
        label="Upload CSV"
        @change="onFileSelected"
    ></v-file-input>
    </v-card>
  </template>
  <script>
    export default {
      data: () => ({
      })
    }
  </script>