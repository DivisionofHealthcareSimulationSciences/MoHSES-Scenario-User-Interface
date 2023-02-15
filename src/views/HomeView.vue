<template>
<v-main>
  <v-row class="justify-center">
      <v-col cols="12" sm="8" md="6">
      <!-- v-if="type === 'Medical Doctor' || type === 'Paramedic'" -->
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        
        <v-select
          v-model="patient_props['type']"
          :items="types"
          :rules="[v => !!v || 'Type is required']"
          label="Instructor Type"
          required
        ></v-select>

        <v-expansion-panels v-model="expanded">

          <v-expansion-panel>
          <v-expansion-panel-title>
            Scenario Properties
          </v-expansion-panel-title>
          
          <v-expansion-panel-text>
            <v-text-field
              v-model="scenario_props['name']"
              label="Scenario Name"
              required
            ></v-text-field>
          </v-expansion-panel-text>

          <v-expansion-panel-text>
            <v-combobox
              v-model="scenario_props['authors']"
              label="Authors"
              required
              multiple
              chips
              hint='Click "enter" to add multiple items'
            ></v-combobox>
          </v-expansion-panel-text>

          </v-expansion-panel>

          <v-expansion-panel>
          <v-expansion-panel-title>
            Patient Properties
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-text-field
              v-model="patient_props['name']"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>
          </v-expansion-panel-text>

          <v-expansion-panel-text>
            <v-text-field
              v-model="patient_props['title']"
              :rules="nameRules"
              label="Title or Rank"
              required
            ></v-text-field>
          </v-expansion-panel-text>

          <v-expansion-panel-text>
            <v-text-field
              v-model="patient_props['age']"
              :rules="nameRules"
              label="Age"
              required
            ></v-text-field>
          </v-expansion-panel-text>

          <v-expansion-panel-text>
            <v-select
              v-model="patient_props['gender']"
              :items="genders"
              :rules="[v => !!v || 'Gender is required']"
              label="Gender"
              required
            ></v-select>
          </v-expansion-panel-text>

          <v-expansion-panel-text>
            <v-text-field
              v-model="patient_props['height']"
              :rules="nameRules"
              label="Height [cm]"
              required
              ></v-text-field>
          </v-expansion-panel-text>

          <v-expansion-panel-text>
            <v-text-field
              v-model="patient_props['weight']"
              :rules="nameRules"
              label="Weight [kg]"
              required
            ></v-text-field>
          </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
          <v-expansion-panel-title>
            Environment Properties
          </v-expansion-panel-title>

          <v-expansion-panel-text>
            <v-textarea
              v-model="environment_props['surrounding']"
              label="Surrounding"
            ></v-textarea>
          </v-expansion-panel-text>

          <v-expansion-panel-text>
            <v-text-field
              v-model="environment_props['altitude']"
              :rules="nameRules"
              label="Altitude or Elevation"
              required
            ></v-text-field>
          </v-expansion-panel-text>

          <v-expansion-panel-text>
            <v-text-field
              v-model="environment_props['temperature']"
              :rules="nameRules"
              label="Temperature [C]"
              required
            ></v-text-field>
          </v-expansion-panel-text>

          <v-expansion-panel-text>
            <v-text-field
              v-model="environment_props['pressure']"
              :rules="nameRules"
              label="Pressure [mmHg]"
              required
            ></v-text-field>
          </v-expansion-panel-text>

          <v-expansion-panel-text>
            <v-text-field
              v-model="environment_props['co2']"
              :rules="nameRules"
              label="Ambient CO2 [fraction]"
              required
            ></v-text-field>
          </v-expansion-panel-text>

          <v-expansion-panel-text>
            <v-combobox
              v-model="environment_props['sounds']"
              label="Ambient Sounds"
              multiple
              chips
              hint='Click "enter" to add multiple items'
            ></v-combobox>
          </v-expansion-panel-text>

          <v-expansion-panel-text>
            <v-combobox
              v-model="environment_props['smells']"
              label="Smells"
              multiple
              chips
              hint='Click "enter" to add multiple items'
            ></v-combobox>
          </v-expansion-panel-text>

          </v-expansion-panel>

          <v-expansion-panel>
          <v-expansion-panel-title>
            Educational Encounter Properties
          </v-expansion-panel-title>

          <v-expansion-panel-text>
            <v-textarea
              v-model="ed_props['instruction']"
              label="Instructions"
            ></v-textarea>
          </v-expansion-panel-text>

          <v-expansion-panel-text>
            <v-textarea
              v-model="ed_props['narrative']"
              label="Narrative"
            ></v-textarea>
          </v-expansion-panel-text>

          <v-expansion-panel-text>
            <v-text-field
              v-model="ed_props['learnerCount']"
              label="Number of Learners"
            ></v-text-field>
          </v-expansion-panel-text>

          <v-expansion-panel-text>
            <v-text-field
              v-model="ed_props['role']"
              label="Roles"
            ></v-text-field>
          </v-expansion-panel-text>

          <v-expansion-panel-text>
            <v-combobox
              v-model="ed_props['setup_checklist']"
              label="Setup Checklist"
              multiple
              chips
              hint='Click "enter" to add multiple items'
            ></v-combobox>
          </v-expansion-panel-text>

          <v-expansion-panel-text>
            <v-combobox
              v-model="ed_props['equipment']"
              label="Equipment"
              multiple
              chips
              hint='Click "enter" to add multiple items'
            ></v-combobox>
          </v-expansion-panel-text>

          <v-expansion-panel-text>
            <v-combobox
              v-model="ed_props['supplies']"
              label="Supplies"
              multiple
              chips
              hint='Click "enter" to add multiple items'
            ></v-combobox>
          </v-expansion-panel-text>

          <v-expansion-panel-text>
            <v-text-field
              v-model="ed_props['duration']"
              label="Estimated Duration"
            ></v-text-field>
          </v-expansion-panel-text>

          <v-expansion-panel-text>
            <v-text-field
              v-model="ed_props['scenario_type']"
              label="Scenario Type"
            ></v-text-field>
          </v-expansion-panel-text>

          <v-expansion-panel-text>
            <v-text-field
              v-model="ed_props['assessment_type']"
              label="Assessment Type"
            ></v-text-field>
          </v-expansion-panel-text>

          <v-expansion-panel-text>
            <v-text-field
              v-model="ed_props['learner_group']"
              label="Learner Group"
            ></v-text-field>
          </v-expansion-panel-text>

          <v-expansion-panel-text>
            <v-combobox
              v-model="ed_props['objectives']"
              label="Learning Objectives"
              multiple
              chips
              hint='Click "enter" to add multiple items'
            ></v-combobox>
          </v-expansion-panel-text>

          <v-expansion-panel-text>
            <v-combobox
              v-model="ed_props['task']"
              label="Task Descriptions"
              multiple
              chips
              hint='Click "enter" to add multiple items'
            ></v-combobox>
          </v-expansion-panel-text>

          <v-expansion-panel-text>
            <v-combobox
              v-model="ed_props['conditions']"
              label="Performance Conditions"
              multiple
              chips
              hint='Click "enter" to add multiple items'
            ></v-combobox>
          </v-expansion-panel-text>

          <v-expansion-panel-text>
            <v-combobox
              v-model="ed_props['exit_criteria']"
              label="Exit Criteria"
              multiple
              chips
              hint='Click "enter" to add multiple items'
            ></v-combobox>
          </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
          <v-expansion-panel-title>
            Capabilities
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div v-for="(exp, index) in capability" :key="index">
              <v-checkbox-btn v-model="exp.required" label="Required"></v-checkbox-btn>
              <v-text-field v-model="exp.name" label="Capability Name"></v-text-field>
              <v-text-field v-model="exp.data" label="Configuration Data"></v-text-field>
              <v-text-field v-model="exp.propertyName" label="Property Name"></v-text-field>
              <v-select v-model="exp.dataType" label="Data Type" :items="['string', 'number', 'boolean', 'option']"></v-select>
              <v-file-input v-model="exp.value" label="Value"></v-file-input>
              <v-btn @click="removeCapability(index)">Remove Capability</v-btn>
              <br>
              <br>
            </div>
            <v-btn @click="addCapability">Add Capability</v-btn>
          </v-expansion-panel-text>
          </v-expansion-panel>


        </v-expansion-panels>
        <br>
        <br>


        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="saveXML"
        >
          Submit
        </v-btn>

        <v-btn
          color="error"
          class="mr-4"
          @click="reset"
        >
          Reset Form
        </v-btn>

      </v-form>
      </v-col>
      </v-row>

    </v-main>
</template>

<script>
  import xmlbuilder from 'xmlbuilder'

  export default {
    data: () => ({
      drawer: false,
      valid: true,
      expanded: [0],
      capability: [
        { required: [],
          name: [],
          data: [],
          propertyName: [],
          dataType: [],
          value: [] },
      ],
      scenario_props: {
        "name":[],
        "authors":[]
      },
      patient_props: {
        "type": [],
        "name": [],
        "title": [],
        "age": [],
        "gender": [],
        "height": [],
        "weight": [],
      },
      environment_props: {
        "surrounding": [],
        "altitude":[],
        "temperature":[],
        "pressure":[],
        "co2":[],
        "sounds":[],
        "smells":[]
      },
      ed_props: {
        'instruction':[],
        'narrative':[],
        'learnerCount':[],
        'role':[],
        'setup_checklist':[],
        'equipment':[],
        'supplies':[],
        'duration':[],
        'scenario_type':[],
        'assessment_type':[],
        'learner_group':[],
        'objectives':[],
        'task':[],
        'conditions':[],
        'exit_criteria':[]
      },
      nameRules: [
        v => !!v || 'Name is required',
      ],
      genders: [
        'Male',
        'Female'
      ],
      types: [
        'Medical Doctor',
        'Paramedic',
        'Nurse'
      ],
    }),
    methods: {
      addCapability() {
        this.capability.push({
          required: '',
          name: '',
          data: '',
          propertyName: '',
          dataType: '',
          value: ''
          });
      },
      removeCapability(index) {
        this.capability.splice(index, 1);
      },
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      saveXML () {
        const xml = xmlbuilder.create('AMMConfiguration', {encoding: 'UTF-8'})
          xml.att({'xmlns:xsd':'http://www.w3.org/2001/XMLSchema',
                'xmlns:xsi':'http://www.w3.org/2001/XMLSchema-instance'
          })
          const metadata = xml.ele('metadata')
            for (var key1 in this.patient_props) {
              if (Array.isArray(this.patient_props[key1])) {
                for (var item1 in this.patient_props[key1]) {
                  metadata.ele(key1, this.patient_props[key1][item1])
                }
              } else {
                metadata.ele(key1, this.patient_props[key1])
              }
            }
  
            for (var key2 in this.environment_props) {
              if (Array.isArray(this.environment_props[key2])) {
                for (var item2 in this.environment_props[key2]) {
                  metadata.ele(key2, this.environment_props[key2][item2])
                }
              } else {
                metadata.ele(key2, this.environment_props[key2])
              }
            }
            for (var key3 in this.ed_props) {
              if (Array.isArray(this.ed_props[key3])) {
                for (var item3 in this.ed_props[key3]) {
                  metadata.ele(key3, this.ed_props[key3][item3])
                }
              } else {
                metadata.ele(key3, this.ed_props[key3])
              }
            }
            for (var item4 in this.capability) {
              for (var key4 in this.capability[item4]) {
                  metadata.ele(key4, this.capability[item4][key4])
                }
            }
        var xmlString = xml.end({ pretty: true });
        const blob = new Blob([xmlString], {type:'text/xml'})
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'data.xml'
        link.click()
      }
    }
  }
  </script>