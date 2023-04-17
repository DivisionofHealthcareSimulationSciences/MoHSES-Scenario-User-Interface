<template>
    <v-toolbar color="green">
      <v-toolbar-title>MoHSES Scenario Creation Tool</v-toolbar-title>
    </v-toolbar>
    <v-row>
      <v-col cols="3">
        <v-tabs v-model="tab" direction="vertical" color="green">
          <v-tab value="home">
            <v-icon start> mdi-home </v-icon> About this page
          </v-tab>
          <v-tab value="option-1">
            <v-icon start> mdi-form-textbox </v-icon> Scenario Properties
          </v-tab>
          <v-tab value="option-2">
            <v-icon start> mdi-account </v-icon> Patient Properties
          </v-tab>
          <v-tab value="option-3">
            <v-icon start> mdi-access-point </v-icon> Environment Properties
          </v-tab>
          <v-tab value="option-4">
            <v-icon start> mdi-list-status </v-icon> Educational Encounter Properties
          </v-tab>
          <v-tab value="option-5">
            <v-icon start> mdi-tools </v-icon> Capabilities
          </v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="8" class="my-content">
        <v-window v-model="tab">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-main>
              <v-window-item value="home" transition="scale" reverse-transition="scale">
                <p>This is the home page.</p>
                <v-col cols="auto">
                  <v-btn @click="nextTab('option-1')" density="compact" icon="mdi-arrow-right"></v-btn>
                </v-col>
              </v-window-item>
              <v-window-item value="option-1" transition="scale" reverse-transition="scale">
                <v-card flat>
                  <v-card-text>
                    <v-select v-model="patient_props['type']" :items="types" :rules="[v => !!v || 'Type is required']" label="Instructor Type" required clearable></v-select>
                    <v-text-field v-model="scenario_props['name']" label="Scenario Name" required clearable></v-text-field>
                    <v-combobox v-model="scenario_props['authors']" label="Authors" required clearable multiple chips hint='Click "enter" to add multiple items'></v-combobox>
                  </v-card-text>
                </v-card>
                <br>
                <v-row justify="center">
                  <v-col cols="auto">
                    <v-btn @click="nextTab('home')" density="compact" icon="mdi-arrow-left"></v-btn>
                  </v-col>
                  <v-col cols="auto">
                    <v-btn @click="nextTab('option-2')" density="compact" icon="mdi-arrow-right"></v-btn>
                  </v-col>
                </v-row>
                <br>
              </v-window-item>
            </v-main>
            <v-window-item value="option-2" transition="scale" reverse-transition="scale">
              <v-card flat>
                <v-card-text>
                  <v-text-field v-model="patient_props['name']" :rules="nameRules" label="Name" required clearable></v-text-field>
                  <v-text-field v-model="patient_props['title']" :rules="nameRules" label="Title or Rank" required clearable></v-text-field>
                  <v-select v-model="patient_props['gender']" :items="genders" :rules="[v => !!v || 'Sex is required']" label="Sex" required clearable></v-select>
                  <v-slider v-model="patient_props['age']" label="Age" class="align-center" :max="age_max" :min="age_min" :step="1" clearable>
                    <template v-slot:append>
                      <v-text-field v-model="patient_props['age']" hide-details single-line density="compact" type="number" clearable style="width: 110px"></v-text-field>
                    </template>
                  </v-slider>
                  <v-slider v-model="patient_props['height']" label="Height [cm]" class="align-center" :max="height_max" :min="height_min" :step="0.1" clearable>
                    <template v-slot:append>
                      <v-text-field v-model="patient_props['height']" hide-details clearable single-line density="compact" type="number" style="width: 110px"></v-text-field>
                    </template>
                  </v-slider>
                  <v-slider v-model="patient_props['weight']" label="Weight [kg]" class="align-center" :max="weight_max" :min="weight_min" :step="0.1" clearable>
                    <template v-slot:append>
                      <v-text-field v-model="patient_props['weight']" hide-details single-line clearable density="compact" type="number" style="width: 110px"></v-text-field>
                    </template>
                  </v-slider>
                </v-card-text>
              </v-card>
              <br>
              <v-row justify="center">
                <v-col cols="auto">
                  <v-btn @click="nextTab('option-1')" density="compact" icon="mdi-arrow-left"></v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn @click="nextTab('option-3')" density="compact" icon="mdi-arrow-right"></v-btn>
                </v-col>
              </v-row>
              <br>
            </v-window-item>
            <v-window-item value="option-3" transition="scale" reverse-transition="scale">
              <v-card flat>
                <v-card-text>
                  <v-textarea v-model="environment_props['surrounding']" label="Surrounding" clearable></v-textarea>
                  <v-text-field v-model="environment_props['altitude']" :rules="nameRules" label="Altitude or Elevation" required clearable></v-text-field>
                  <v-text-field v-model="environment_props['temperature']" :rules="nameRules" label="Temperature [C]" required clearable></v-text-field>
                  <v-text-field v-model="environment_props['pressure']" :rules="nameRules" label="Pressure [mmHg]" required clearable></v-text-field>
                  <v-text-field v-model="environment_props['co2']" :rules="nameRules" label="Ambient CO2 [fraction]" required clearable></v-text-field>
                  <v-combobox v-model="environment_props['sounds']" label="Ambient Sounds" multiple clearable chips hint='Click "enter" to add multiple items'></v-combobox>
                  <v-combobox v-model="environment_props['smells']" label="Smells" multiple clearable chips hint='Click "enter" to add multiple items'></v-combobox>
                </v-card-text>
              </v-card>
              <br>
              <v-row justify="center">
                <v-col cols="auto">
                  <v-btn @click="nextTab('option-2')" density="compact" icon="mdi-arrow-left"></v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn @click="nextTab('option-4')" density="compact" icon="mdi-arrow-right"></v-btn>
                </v-col>
              </v-row>
              <br>
            </v-window-item>
            <v-window-item value="option-4" transition="scale" reverse-transition="scale">
              <v-card flat>
                <v-card-text>
                  <v-textarea v-model="ed_props['instruction']" label="Instructions" clearable></v-textarea>
                  <v-textarea v-model="ed_props['narrative']" label="Narrative" clearable></v-textarea>
                  <v-text-field v-model="ed_props['learnerCount']" label="Number of Learners" clearable></v-text-field>
                  <v-text-field v-model="ed_props['role']" label="Roles" clearable></v-text-field>
                  <v-combobox v-model="ed_props['setup_checklist']" label="Setup Checklist" multiple clearable chips hint='Click "enter" to add multiple items'></v-combobox>
                  <v-combobox v-model="ed_props['equipment']" label="Equipment" multiple clearable chips hint='Click "enter" to add multiple items'></v-combobox>
                  <v-combobox v-model="ed_props['supplies']" label="Supplies" multiple clearable chips hint='Click "enter" to add multiple items'></v-combobox>
                  <v-text-field v-model="ed_props['duration']" label="Estimated Duration" clearable></v-text-field>
                  <v-text-field v-model="ed_props['scenario_type']" label="Scenario Type" clearable></v-text-field>
                  <v-text-field v-model="ed_props['assessment_type']" label="Assessment Type" clearable></v-text-field>
                  <v-text-field v-model="ed_props['learner_group']" label="Learner Group" clearable></v-text-field>
                  <v-combobox v-model="ed_props['objectives']" label="Learning Objectives" multiple clearable chips hint='Click "enter" to add multiple items'></v-combobox>
                  <v-combobox v-model="ed_props['task']" label="Task Descriptions" multiple clearable chips hint='Click "enter" to add multiple items'></v-combobox>
                  <v-combobox v-model="ed_props['conditions']" label="Performance Conditions" multiple clearable chips hint='Click "enter" to add multiple items'></v-combobox>
                  <v-combobox v-model="ed_props['exit_criteria']" label="Exit Criteria" multiple clearable chips hint='Click "enter" to add multiple items'></v-combobox>
                </v-card-text>
              </v-card>
              <br>
              <v-row justify="center">
                <v-col cols="auto">
                  <v-btn @click="nextTab('option-3')" density="compact" icon="mdi-arrow-left"></v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn @click="nextTab('option-5')" density="compact" icon="mdi-arrow-right"></v-btn>
                </v-col>
              </v-row>
              <br>
            </v-window-item>
            <v-window-item value="option-5" transition="scale" reverse-transition="scale">
              <div v-for="(exp, index) in capability" :key="index">
                <v-checkbox-btn v-model="exp.required" label="Required"></v-checkbox-btn>
                <v-text-field clearable v-model="exp.name" label="Capability Name"></v-text-field>
                <v-text-field clearable v-model="exp.data" label="Configuration Data"></v-text-field>
                <v-text-field clearable v-model="exp.propertyName" label="Property Name"></v-text-field>
                <v-select clearable v-model="exp.dataType" label="Data Type" :items="['string', 'number', 'boolean', 'option']"></v-select>
                <v-file-input clearable v-model="exp.value" label="Value"></v-file-input>
                <v-btn @click="removeCapability(index)">Remove Capability</v-btn>
                <br>
                <br>
              </div>
              <v-btn @click="addCapability">Add Capability</v-btn>
              <br>
              <v-row justify="center">
                <v-col cols="auto">
                  <v-btn @click="nextTab('option-4')" density="compact" icon="mdi-arrow-left"></v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn @click="nextTab('option-6')" density="compact" icon="mdi-arrow-right"></v-btn>
                </v-col>
              </v-row>
              <br>
              <v-btn :disabled="!valid" color="success" class="mr-4" @click="saveXML"> Submit </v-btn>
              <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
              <br>
            </v-window-item>
          </v-form>
        </v-window>
      </v-col>
    </v-row>
  </template>
  <script>
    import xmlbuilder from 'xmlbuilder'
    export default {
      data: () => ({
        age_min: 0,
        age_max: 120,
        height_min: 0,
        height_max: 200,
        weight_min: 0,
        weight_max: 200,
        tab: 'home',
        name: [],
        drawer: false,
        valid: true,
        expanded: [0],
        capability: [{
          required: [],
          name: [],
          data: [],
          propertyName: [],
          dataType: [],
          value: []
        }, ],
        scenario_props: {
          "name": [],
          "authors": []
        },
        patient_props: {
          "type": [],
          "name": [],
          "title": [],
          "age": 50,
          "gender": [],
          "height": 150,
          "weight": 75,
        },
        environment_props: {
          "surrounding": [],
          "altitude": [],
          "temperature": [],
          "pressure": [],
          "co2": [],
          "sounds": [],
          "smells": []
        },
        ed_props: {
          'instruction': [],
          'narrative': [],
          'learnerCount': [],
          'role': [],
          'setup_checklist': [],
          'equipment': [],
          'supplies': [],
          'duration': [],
          'scenario_type': [],
          'assessment_type': [],
          'learner_group': [],
          'objectives': [],
          'task': [],
          'conditions': [],
          'exit_criteria': []
        },
        nameRules: [
          v => !!v || 'Name is required',
        ],
        genders: ['Male', 'Female'],
        types: ['Medical Doctor', 'Paramedic', 'Nurse'],
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
        nextTab(id) {
          this.tab = id;
        },
        removeCapability(index) {
          this.capability.splice(index, 1);
        },
        validate() {
          this.$refs.form.validate()
        },
        reset() {
          this.$refs.form.reset()
        },
        pathClicked(id) {
          let pathElement = document.getElementById(id);
          if (this.name.some(x => Object.keys(x).includes(id))) {
            this.name = this.name.filter(x => !Object.keys(x).includes(id));
          } else {
            this.name.push({
              [id]: ''
            })
          }
          if (pathElement.classList.contains("active")) {
            pathElement.classList.remove("active");
          } else {
            pathElement.classList.add("active");
          }
        },
        saveXML() {
          const xml = xmlbuilder.create('AMMConfiguration', {
            encoding: 'UTF-8'
          })
          xml.att({'xmlns:xsd':'http://www.w3.org/2001/XMLSchema', 'xmlns:xsi':'http://www.w3.org/2001/XMLSchema-instance'})
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
          var xmlString = xml.end({
            pretty: true
          });
          const blob = new Blob([xmlString], {
            type: 'text/xml'
          })
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = 'data.xml'
          link.click()
        }
      },
    }
  </script>