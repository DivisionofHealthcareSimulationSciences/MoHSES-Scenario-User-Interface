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
            <v-file-input v-model="file"></v-file-input>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </template>
  <script>
  </script>