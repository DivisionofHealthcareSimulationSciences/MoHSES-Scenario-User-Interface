<template>
  <v-toolbar style="color: white" color="#3c2d70">
     <v-toolbar-title>About</v-toolbar-title>
  </v-toolbar>
  <v-main class="bg-grey-lighten-3">
     <v-container>
        <v-card class="mt-n12">
           <v-card-text>
              This is the MoHSES Scenario and State File Design Web Interface developed by Jake Flynn, Sanika Joshi, and Megan Luu for their 2023 Bioengineering Capstone project.
              This project was developed under the mentorship of Dr. David Hananel, Dr. Rainer Leuschke, and Dr. Austin Baird from the UW CREST Lab. The purpose
              of this tool is to allow for an accessible, easy-to-use interface for users to design customized patient scenario files that are compatible with the CREST
              Advanced Modular Manikin (AMM). The process to generate these patient scenario files is two-fold. First, users will use the BioGears Scenario Creation Tool tab to configure a patient and
              generate a BioGears Scenario XML file. After running this BioGears Scenario file on Biogears, users will have a MoHSES-compatible patient state file, which will be used to generate
              a MoHSES Scenario file using the MoHSES Scenario Creation tool tab. 
           </v-card-text>
           <br>
           <v-row justify="center">
              <v-card flat>
                 <v-img
                    src="@/assets/jake.jpeg"
                    alt="Jake Flynn"
                    width="350"
                    height="350"
                    ></v-img>
                 <v-card-title class="text-center">
                    Jake Flynn
                    <br>
                    <a
                       href="https://twitter.com/JakeRFlynn"
                       target="_blank"
                       rel="noopener noreferrer"
                       >
                       <v-icon
                          class="mdi mdi-twitter"
                          ></v-icon>
                    </a>
                    <a
                       href="https://github.com/jakeflynn56"
                       target="_blank"
                       rel="noopener noreferrer"
                       >
                       <v-icon
                          class="mdi mdi-github"
                          ></v-icon>
                    </a>
                    <a
                       href="https://www.linkedin.com/in/jake-flynn/"
                       target="_blank"
                       rel="noopener noreferrer"
                       >
                       <v-icon
                          class="mdi mdi-linkedin"
                          ></v-icon>
                    </a>
                 </v-card-title>
              </v-card>
              <v-card flat>
                 <v-img
                    src="@/assets/megan.png"
                    alt="Megan Luu"
                    width="350"
                    height="350"
                    ></v-img>
                 <v-card-title class="text-center">
                    Megan Luu
                    <br>
                    <a
                       href="https://www.linkedin.com/in/megan-luu-profile/"
                       target="_blank"
                       rel="noopener noreferrer"
                       >
                       <v-icon
                          class="mdi mdi-linkedin"
                          ></v-icon>
                    </a>
                 </v-card-title>
              </v-card>
              <v-card flat>
                 <v-img
                    src="@/assets/sanika.png"
                    alt="Sanika Joshi"
                    width="350"
                    height="350"
                    ></v-img>
                 <v-card-title class="text-center">
                    Sanika Joshi
                    <br>
                    <a
                       href="https://www.linkedin.com/in/sanika-joshi-0b940a194/"
                       target="_blank"
                       rel="noopener noreferrer"
                       >
                       <v-icon
                          class="mdi mdi-linkedin"
                          ></v-icon>
                    </a>
                 </v-card-title>
              </v-card>
           </v-row>
           <br>
           <br>
        </v-card>
     </v-container>
  </v-main>
</template>
<script>
  export default {
    data: () => ({
    })
  }
</script>