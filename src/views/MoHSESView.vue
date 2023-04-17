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
                    <v-select v-model="patient_props['type']" :items="types" label="Instructor Type" required clearable></v-select>
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
                  <p style="font-size: 20px">Please enter patient properties:</p>
                  <br>
                  <v-text-field v-model="patient_props['name']" label="Name" required clearable></v-text-field>
                  <v-text-field v-model="patient_props['title']" label="Title or Rank" required clearable></v-text-field>
                  <v-select v-model="patient_props['gender']" :items="genders" label="Sex" required clearable></v-select>
                  <v-slider v-model="patient_props['age']" label="Age" class="align-center" :max="age_max" :min="age_min" :step="1">
                    <template v-slot:append>
                      <v-text-field v-model="patient_props['age']" hide-details single-line density="compact" type="number" suffix="years" style="width: 120px"></v-text-field>
                    </template>
                  </v-slider>
                  <v-slider v-model="patient_props['height']" label="Height" class="align-center" :max="height_max" :min="height_min" :step="0.1">
                    <template v-slot:append>
                      <v-text-field v-model="patient_props['height']" hide-details single-line density="compact" type="number" suffix="cm" style="width: 110px"></v-text-field>
                    </template>
                  </v-slider>
                  <v-slider v-model="patient_props['weight']" label="Weight" class="align-center" :max="weight_max" :min="weight_min" :step="0.1">
                    <template v-slot:append>
                      <v-text-field v-model="patient_props['weight']" hide-details single-line density="compact" type="number" suffix="kg" style="width: 110px"></v-text-field>
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
                  <p style="font-size: 20px">Please enter environment properties:</p>
                  <br>
                  <v-textarea v-model="environment_props['surrounding']" label="Surrounding" clearable></v-textarea>
                  <v-combobox v-model="environment_props['sounds']" label="Ambient Sounds" multiple clearable chips hint='Click "enter" to add multiple items'></v-combobox>
                  <v-combobox v-model="environment_props['smells']" label="Smells" multiple clearable chips hint='Click "enter" to add multiple items'></v-combobox>
                  <v-slider v-model="environment_props['altitude']" label="Altitude" required clearable class="align-center" :max="altitude_max" :min="altitude_min" :step="0.1">
                    <template v-slot:append>
                      <v-text-field v-model="environment_props['altitude']" hide-details clearable single-line density="compact" type="number" suffix="m" style="width: 140px"></v-text-field>
                    </template>
                  </v-slider>
                  <v-slider v-model="environment_props['temperature']" label="Temperature" required clearable class="align-center" :max="temperature_max" :min="temperature_min" :step="0.1">
                    <template v-slot:append>
                      <v-text-field v-model="environment_props['temperature']" hide-details clearable single-line density="compact" type="number" suffix="Celsius" style="width: 180px"></v-text-field>
                    </template>
                  </v-slider>
                  <v-slider v-model="environment_props['pressure']" label="Pressure" required clearable class="align-center" :max="pressure_max" :min="pressure_min" :step="0.1">
                    <template v-slot:append>
                      <v-text-field v-model="environment_props['pressure']" hide-details clearable single-line density="compact" type="number" suffix="mmHg" style="width: 180px"></v-text-field>
                    </template>
                  </v-slider>
                  <v-slider v-model="environment_props['co2']" label="Ambient CO2 [fraction]" required clearable class="align-center" :max="co2_max" :min="co2_min" :step="0.1">
                    <template v-slot:append>
                      <v-text-field v-model="environment_props['co2']" hide-details clearable single-line density="compact" type="number" style="width: 140px"></v-text-field>
                    </template>
                  </v-slider>
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
                  <p style="font-size: 20px">Please enter educational encounter properties:</p>
                  <br>
                  <v-textarea v-model="ed_props['instruction']" label="Instructions" clearable></v-textarea>
                  <v-textarea v-model="ed_props['narrative']" label="Narrative" clearable></v-textarea>
                  <v-text-field v-model="ed_props['role']" label="Roles" clearable></v-text-field>
                  <v-combobox v-model="ed_props['setup_checklist']" label="Setup Checklist" multiple clearable chips hint='Click "enter" to add multiple items'></v-combobox>
                  <v-combobox v-model="ed_props['equipment']" label="Equipment" multiple clearable chips hint='Click "enter" to add multiple items'></v-combobox>
                  <v-combobox v-model="ed_props['supplies']" label="Supplies" multiple clearable chips hint='Click "enter" to add multiple items'></v-combobox>
                  <v-text-field v-model="ed_props['scenario_type']" label="Scenario Type" clearable></v-text-field>
                  <v-text-field v-model="ed_props['assessment_type']" label="Assessment Type" clearable></v-text-field>
                  <v-text-field v-model="ed_props['learner_group']" label="Learner Group" clearable></v-text-field>
                  <v-combobox v-model="ed_props['objectives']" label="Learning Objectives" multiple clearable chips hint='Click "enter" to add multiple items'></v-combobox>
                  <v-combobox v-model="ed_props['task']" label="Task Descriptions" multiple clearable chips hint='Click "enter" to add multiple items'></v-combobox>
                  <v-combobox v-model="ed_props['conditions']" label="Performance Conditions" multiple clearable chips hint='Click "enter" to add multiple items'></v-combobox>
                  <v-combobox v-model="ed_props['exit_criteria']" label="Exit Criteria" multiple clearable chips hint='Click "enter" to add multiple items'></v-combobox>
                  <v-slider v-model="ed_props['duration']" label="Estimated Duration" clearable class="align-center" :max="100" :min="0" :step="1">
                    <template v-slot:append>
                      <v-text-field v-model="ed_props['duration']" hide-details clearable single-line density="compact" type="number" suffix="min" style="width: 180px"></v-text-field>
                    </template>
                  </v-slider>
                  <v-slider v-model="ed_props['learnerCount']" label="Number of Learners" clearable class="align-center" :max="100" :min="0" :step="1">
                    <template v-slot:append>
                      <v-text-field v-model="ed_props['learnerCount']" hide-details clearable single-line density="compact" type="number" style="width: 180px"></v-text-field>
                    </template>
                  </v-slider>

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
              <v-card flat>
              <v-card-text>
               <p style="font-size: 20px">Please enter scenario capabilities:</p>
               <br>
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
              </v-card-text>
              </v-card>
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
        altitude_min: 0,
        altitude_max: 10000,
        temperature_min: 0,
        temperature_max: 100,
        pressure_min: 0,
        pressure_max: 1000,
        co2_min: 0,
        co2_max: 1,
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
          "altitude": 0,
          "temperature": 20,
          "pressure": 760,
          "co2": 0.04,
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
          const Scenario = xml.ele('Scenario')
          Scenario.att({'name':this.scenario_props['name']})
          const metadata = Scenario.ele('metadata')
          for (var key1 in this.patient_props) {
            if (Array.isArray(this.patient_props[key1])) {
              for (var item1 in this.patient_props[key1]) {
                metadata.ele(key1, this.patient_props[key1][item1])
              }
            } else {
              const element = metadata.ele(key1, this.patient_props[key1])
              if (key1 == 'age') {
                element.att('units', 'years')
              }
              if (key1 == 'height') {
                element.att('units', 'centimeters')
              }
              if (key1 == 'weight') {
                element.att('units', 'kilograms')
              }
            }
          }
          for (var key2 in this.environment_props) {
            if (Array.isArray(this.environment_props[key2])) {
              for (var item2 in this.environment_props[key2]) {
                metadata.ele(key2, this.environment_props[key2][item2])
              }
            } else {
              const element = metadata.ele(key2, this.environment_props[key2])
              if (key2 == 'altitude') {
                element.att('units', 'meters')
              }
              if (key2 == 'temperature') {
                element.att('units', 'celsius')
              }
              if (key2 == 'pressure') {
                element.att('units', 'mmHg')
              }
            }
          }
          for (var key3 in this.ed_props) {
            if (Array.isArray(this.ed_props[key3])) {
              for (var item3 in this.ed_props[key3]) {
                metadata.ele(key3, this.ed_props[key3][item3])
              }
            } else {
              const element = metadata.ele(key3, this.ed_props[key3])
              if (key3 == 'duration') {
                element.att('units', 'minutes')
              }
            }
          }
          const caps = Scenario.ele('capabilities')
          for (var item4 in this.capability) {
            const cap = caps.ele('capability')
            for (var key4 in this.capability[item4]) {
              cap.ele(key4, this.capability[item4][key4])
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