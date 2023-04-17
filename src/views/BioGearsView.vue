<template>
    <v-toolbar
      color="primary"
    >
      <v-toolbar-title>BioGears Scenario Creation Tool</v-toolbar-title>
    </v-toolbar>
    <v-row>
    <v-col cols="3">
      <v-tabs
        v-model="tab"
        direction="vertical"
        color="primary"
      >
        <v-tab value="home">
          <v-icon start>
            mdi-home
          </v-icon>
          About this page
        </v-tab>
        <v-tab value="option-1">
          <v-icon start>
            mdi-account
          </v-icon>
          Patient Information
        </v-tab>
        <v-tab value="option-2">
          <v-icon start>
            mdi-access-point
          </v-icon>
          Patient Vitals
        </v-tab>
        <v-tab value="option-3">
          <v-icon start>
            mdi-list-status
          </v-icon>
          Head-to-toe
        </v-tab>

        
      </v-tabs>
    
    </v-col>
  </v-row>


    </template>
<script>
  export default {
    data: () => ({
      drawer: false
    })
  }
</script>