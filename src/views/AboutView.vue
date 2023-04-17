<template>
  <v-main>

  <v-row class="justify-center">
  <v-col cols="12" sm="8" md="6">
    <p>
    This is the MoHSES Scenario and State File Design Web Interface developed by Jake Flynn, Sanika Joshi, and Megan Luu for their 2023 Bioengineering Capstone project.
    This project was developed under the mentorship of Dr. David Hananel, Dr. Rainer Leuschke, and Dr. Austin Baird from the UW CREST Lab. The purpose
    of this tool is to allow for an accessible, easy-to-use interface for users to design customized patient scenario files that are compatible with the CREST
    Advanced Modular Manikin (AMM). 
    </p>
    <br>
    <p>
    The process to generate these patient scenario files is two-fold. First, users will use the BioGears Patient Creation Tool tab to configure a patient and
    generate a BioGears patient state XML file. Then, users will input this generated BioGears patient state file into the MoHSES Scenario Creation tool tab
    to generate a MoHSES-compatible scenario file. 
  </p>
  <br>
  </v-col>
  </v-row>
  </v-main>
</template>

<script>
export default {
}
</script>

<style scoped>
@media (hover: hover) {
  svg:hover {
    cursor: pointer;
  }
  svg path:hover {
    opacity: 0.8;
  }
}
#HeadNeck.active {
  fill: rgb(255, 0, 0);
}
#Chest.active {
  fill: rgb(163, 0, 0);
}
#Extremities.active {
  fill: rgb(89, 0, 0);
}
#Back.active {
  fill: rgb(255, 138, 138);
}
#AbdomenPelvis.active {
  fill: rgb(255, 135, 37);
}

.active {
    fill: #0004ff;
  }
.noClick {
  pointer-events: none;
}
</style>