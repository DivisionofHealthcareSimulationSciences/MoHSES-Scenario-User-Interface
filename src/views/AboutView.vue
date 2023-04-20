<template>
  <v-toolbar style="color: white" color="#4b0082">
     <v-toolbar-title>About</v-toolbar-title>
  </v-toolbar>
  <v-main class="bg-grey-lighten-3">
     <v-container>
        <v-card class="mt-n12">
           <v-card-text>
              This is the MoHSES Scenario and State File Design Web Interface developed by Jake Flynn, Sanika Joshi, and Megan Luu for their 2023 Bioengineering Capstone project.
              This project was developed under the mentorship of Dr. David Hananel, Dr. Rainer Leuschke, and Dr. Austin Baird from the UW CREST Lab. The purpose
              of this tool is to allow for an accessible, easy-to-use interface for users to design customized patient scenario files that are compatible with the CREST
              Advanced Modular Manikin (AMM). The process to generate these patient scenario files is two-fold. First, users will use the BioGears Patient Creation Tool tab to configure a patient and
              generate a BioGears patient state XML file. Then, users will input this generated BioGears patient state file into the MoHSES Scenario Creation tool tab
              to generate a MoHSES-compatible scenario file. 
           </v-card-text>
           <br>
           <v-row justify="center">
              <v-card flat>
                 <v-img
                    src="https://drive.google.com/uc?id=1TZ4ns3VtWhXufqp8dISwIPGemcR0eK9i"
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
                    src="https://drive.google.com/uc?id=14EJA5hv8Mf8aV2WDKoy2PPP6ywtqI6w6"
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
                    src="https://drive.google.com/uc?id=1VihlXqvV87uxiPJFRlAIVvAaH9J9ATN4"
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