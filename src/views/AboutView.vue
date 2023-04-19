<template>
  <v-toolbar style="color: white" color="red">
     <v-toolbar-title>About</v-toolbar-title>
  </v-toolbar>
  <v-card class="text-center">
     <v-card-text>
        This is the MoHSES Scenario and State File Design Web Interface developed by Jake Flynn, Sanika Joshi, and Megan Luu for their 2023 Bioengineering Capstone project.
        This project was developed under the mentorship of Dr. David Hananel, Dr. Rainer Leuschke, and Dr. Austin Baird from the UW CREST Lab. The purpose
        of this tool is to allow for an accessible, easy-to-use interface for users to design customized patient scenario files that are compatible with the CREST
        Advanced Modular Manikin (AMM). 
     </v-card-text>
     <v-card-text>
        The process to generate these patient scenario files is two-fold. First, users will use the BioGears Patient Creation Tool tab to configure a patient and
        generate a BioGears patient state XML file. Then, users will input this generated BioGears patient state file into the MoHSES Scenario Creation tool tab
        to generate a MoHSES-compatible scenario file. 
     </v-card-text>
  </v-card>
</template>
<script>
  export default {
    data: () => ({
    })
  }
</script>