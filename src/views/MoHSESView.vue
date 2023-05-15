<template>
	<v-tabs large v-model="tab" color="#4b0082">
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
	<v-toolbar color="#3c2d70" style="color: white">
		<v-toolbar-title class="text-center" :style="{ fontSize: '38px', fontWeight: 'bold', transform: 'translateX(-10px)' }">MoHSES Scenario Creation Tool</v-toolbar-title>
	</v-toolbar>
	<div v-if="tab === 'home'" :style="{
  position: 'relative',
  backgroundImage: `url(${require('@/assets/crest_vh_gold_purple_dt.png')})`,
  backgroundSize: '75%',
  backgroundPosition: 'top center',
  height: '340px',
  width: '100%',
  backgroundColor: 'rgba(60, 45, 112)',
}">
		<div :style="{
    content: '',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(60, 45, 112, 0.5)', /* Set the desired opacity, e.g., 0.5 for 50% */
  }"></div>
	</div>
	<v-main class="bg-grey-lighten-3">
		<v-container>
			<v-window v-model="tab" class="mt-n12">
				<v-form ref="form" v-model="valid">
					<v-window-item value="home">
						<v-card flat>
							<v-card-text>
								<p style="font-size: 14px"> This tool is designed to simplify the process of generating a MoHSES scenario file, which can be used with the MoHSES manikin at the CREST lab. To get started, you will need to use the BioGears Scenario Creation Tool to generate a patient state file and BioGears scenario file, and run BioGears using these files to generate a state file. Once you have your state file, you can use our tool to create your MoHSES scenario file. Simply upload your state file, select the desired parameters, and let the tool do the rest! With our user-friendly interface, you can quickly generate a MoHSES scenario file to use with the MoHSES manikin. </p>
							</v-card-text>
						</v-card>
						<v-col class="text-center" cols="auto">
							<v-btn @click="nextTab('option-1')" density="compact" icon="mdi-arrow-right"></v-btn>
						</v-col>
					</v-window-item>
					<v-window-item value="option-1">
						<v-card flat>
							<v-card-text>
								<p style="font-size: 20px">Please enter scenario properties:</p>
								<br />
								<v-row>
									<v-col cols="10">
										<v-file-input label="Upload BioGears State File" v-model="state_file" prepend-icon="mdi-upload" @change="handleFileUpload"></v-file-input>
									</v-col>
									<v-col>
										<v-btn style="color: white" color="#3c2d70" @click="parseXML">Parse File</v-btn>
									</v-col>
								</v-row>
								<v-combobox v-model="scenario_props['authors']" label="Authors" clearable multiple chips hint='Click "enter" to add multiple authors'></v-combobox>
								<v-combobox v-model="scenario_props['emails']" label="Emails" clearable multiple chips hint='Click "enter" to add multiple emails'></v-combobox>
								<v-select v-model="patient_props['type']" :items="types" label="Instructor Type" clearable></v-select>
								<v-text-field v-model="scenario_props['name']" label="Scenario Name" clearable></v-text-field>
							</v-card-text>
						</v-card>
						<br />
						<v-row justify="center">
							<v-col cols="auto">
								<v-btn @click="nextTab('home')" density="compact" icon="mdi-arrow-left"></v-btn>
							</v-col>
							<v-col cols="auto">
								<v-btn @click="nextTab('option-2')" density="compact" icon="mdi-arrow-right"></v-btn>
							</v-col>
						</v-row>
						<br />
					</v-window-item>
					<v-window-item value="option-2">
						<v-card flat>
							<v-card-text>
								<p style="font-size: 20px">Please enter patient properties:</p>
								<br />
								<v-text-field v-model="patient_props['name']" label="Name" clearable></v-text-field>
								<v-text-field v-model="patient_props['title']" label="Title or Rank" clearable></v-text-field>
								<v-select v-model="patient_props['gender']" :items="genders" label="Sex" clearable></v-select>
								<v-slider v-model="patient_props['age']" label="Age" class="align-center" :max="age_max" :min="age_min" :step="1">
									<template v-slot:append>
										<v-text-field v-model="patient_props['age']" hide-details single-line density="compact" type="number" suffix="years" style="width: 180px"></v-text-field>
									</template>
								</v-slider>
								<v-slider v-model="patient_props['height']" label="Height" class="align-center" :max="height_max" :min="height_min" :step="0.1">
									<template v-slot:append>
										<v-text-field v-model="patient_props['height']" hide-details single-line density="compact" type="number" style="width: 90px"></v-text-field>
										<v-select v-model="height_unit" hide-details single-line density="compact" :items="height_units" style="width: 90px"></v-select>
									</template>
								</v-slider>
								<v-slider v-model="patient_props['weight']" label="Weight" class="align-center" :max="weight_max" :min="weight_min" :step="0.1">
									<template v-slot:append>
										<v-text-field v-model="patient_props['weight']" hide-details single-line density="compact" type="number" style="width: 90px"></v-text-field>
										<v-select v-model="weight_unit" hide-details single-line density="compact" :items="weight_units" style="width: 90px"></v-select>
									</template>
								</v-slider>
							</v-card-text>
						</v-card>
						<br />
						<v-row justify="center">
							<v-col cols="auto">
								<v-btn @click="nextTab('option-1')" density="compact" icon="mdi-arrow-left"></v-btn>
							</v-col>
							<v-col cols="auto">
								<v-btn @click="nextTab('option-3')" density="compact" icon="mdi-arrow-right"></v-btn>
							</v-col>
						</v-row>
						<br />
					</v-window-item>
					<v-window-item value="option-3">
						<v-card flat>
							<v-card-text>
								<p style="font-size: 20px"> Please enter environment properties: </p>
								<br />
								<v-textarea v-model="environment_props['surrounding']" label="Surrounding" clearable></v-textarea>
								<v-combobox v-model="environment_props['sounds']" label="Ambient Sounds" multiple clearable chips hint='Click "enter" to add multiple sounds'></v-combobox>
								<v-combobox v-model="environment_props['smells']" label="Smells" multiple clearable chips hint='Click "enter" to add multiple smells'></v-combobox>
								<v-slider v-model="environment_props['altitude']" label="Altitude" clearable class="align-center" :max="altitude_max" :min="altitude_min" :step="0.1">
									<template v-slot:append>
										<v-text-field v-model="environment_props['altitude']" hide-details clearable single-line density="compact" type="number" suffix="m" style="width: 180px"></v-text-field>
									</template>
								</v-slider>
								<v-slider v-model="environment_props['temperature']" label="Temperature" clearable class="align-center" :max="temperature_max" :min="temperature_min" :step="0.1">
									<template v-slot:append>
										<v-text-field v-model="environment_props['temperature']" hide-details clearable single-line density="compact" type="number" suffix="Celsius" style="width: 180px"></v-text-field>
									</template>
								</v-slider>
								<v-slider v-model="environment_props['pressure']" label="Pressure" clearable class="align-center" :max="pressure_max" :min="pressure_min" :step="0.1">
									<template v-slot:append>
										<v-text-field v-model="environment_props['pressure']" hide-details clearable single-line density="compact" type="number" suffix="mmHg" style="width: 180px"></v-text-field>
									</template>
								</v-slider>
								<v-slider v-model="environment_props['co2']" label="Ambient CO2" clearable class="align-center" :max="co2_max" :min="co2_min" :step="1">
									<template v-slot:append>
										<v-text-field v-model="environment_props['co2']" hide-details clearable single-line density="compact" type="number" suffix="%" style="width: 180px"></v-text-field>
									</template>
								</v-slider>
							</v-card-text>
						</v-card>
						<br />
						<v-row justify="center">
							<v-col cols="auto">
								<v-btn @click="nextTab('option-2')" density="compact" icon="mdi-arrow-left"></v-btn>
							</v-col>
							<v-col cols="auto">
								<v-btn @click="nextTab('option-4')" density="compact" icon="mdi-arrow-right"></v-btn>
							</v-col>
						</v-row>
						<br />
					</v-window-item>
					<v-window-item value="option-4">
						<v-card flat>
							<v-card-text>
								<p style="font-size: 20px"> Please enter educational encounter properties: </p>
								<br />
								<v-textarea v-model="ed_props['instruction']" label="Instructions" clearable></v-textarea>
								<v-textarea v-model="ed_props['narrative']" label="Narrative" clearable></v-textarea>
								<v-text-field v-model="ed_props['role']" label="Roles" clearable></v-text-field>
								<v-combobox v-model="ed_props['setup_checklist']" label="Setup Checklist" multiple clearable chips hint='Click "enter" to add multiple checklists'></v-combobox>
								<v-combobox v-model="ed_props['equipment']" label="Equipment" multiple clearable chips hint='Click "enter" to add multiple equipment'></v-combobox>
								<v-combobox v-model="ed_props['supplies']" label="Supplies" multiple clearable chips hint='Click "enter" to add multiple supplies'></v-combobox>
								<v-text-field v-model="ed_props['scenario_type']" label="Scenario Type" clearable></v-text-field>
								<v-text-field v-model="ed_props['assessment_type']" label="Assessment Type" clearable></v-text-field>
								<v-text-field v-model="ed_props['learner_group']" label="Learner Group" clearable></v-text-field>
								<v-combobox v-model="ed_props['objectives']" label="Learning Objectives" multiple clearable chips hint='Click "enter" to add multiple objectives'></v-combobox>
								<v-combobox v-model="ed_props['task']" label="Task Descriptions" multiple clearable chips hint='Click "enter" to add multiple tasks'></v-combobox>
								<v-combobox v-model="ed_props['conditions']" label="Performance Conditions" multiple clearable chips hint='Click "enter" to add multiple conditions'></v-combobox>
								<v-combobox v-model="ed_props['exit_criteria']" label="Exit Criteria" multiple clearable chips hint='Click "enter" to add multiple exit criteria'></v-combobox>
								<v-slider v-model="ed_props['duration']" label="Estimated Duration" clearable class="align-center" :max="time_max" :min="time_min" :step="1">
									<template v-slot:append>
										<v-text-field v-model="ed_props['duration']" hide-details clearable single-line density="compact" type="number" suffix="min" style="width: 180px"></v-text-field>
									</template>
								</v-slider>
								<v-slider v-model="ed_props['learnerCount']" label="Number of Learners" clearable class="align-center" :max="50" :min="0" :step="1">
									<template v-slot:append>
										<v-text-field v-model="ed_props['learnerCount']" hide-details clearable single-line density="compact" type="number" suffix="learners" style="width: 180px"></v-text-field>
									</template>
								</v-slider>
							</v-card-text>
						</v-card>
						<br />
						<v-row justify="center">
							<v-col cols="auto">
								<v-btn @click="nextTab('option-3')" density="compact" icon="mdi-arrow-left"></v-btn>
							</v-col>
							<v-col cols="auto">
								<v-btn @click="nextTab('option-5')" density="compact" icon="mdi-arrow-right"></v-btn>
							</v-col>
						</v-row>
						<br />
					</v-window-item>
					<v-window-item value="option-5">
						<v-card flat>
							<v-card-text>
								<p style="font-size: 20px"> Please enter scenario capabilities: </p>
								<br />
								<div v-for="(exp, index) in capability" :key="index">
									<v-checkbox-btn v-model="exp.required" label="Required"></v-checkbox-btn>
									<v-text-field clearable v-model="exp.name" label="Capability Name"></v-text-field>
									<v-text-field clearable v-model="exp.propertyName" label="Property Name"></v-text-field>
									<v-select clearable v-model="exp.dataType" label="Data Type" :items="['string', 'number', 'boolean', 'option']"></v-select>
									<v-file-input v-if="exp.dataType==='string'" clearable v-model="exp.value" label="Value"></v-file-input>
									<v-select v-if="exp.dataType==='boolean'" :items="['true', 'false']" clearable v-model="exp.value" label="Value"></v-select>
									<v-text-field v-if="exp.dataType==='number'" clearable v-model="exp.value" label="Value"></v-text-field>
									<v-text-field v-if="exp.dataType==='option'" clearable v-model="exp.value" label="Value"></v-text-field>
									<v-btn @click="removeCapability(index)">Remove Capability</v-btn>
									<br />
									<br />
								</div>
								<v-btn color="#3c2d70" style="color: white" @click="addCapability">Add Capability</v-btn>
								<br />
								<br />
								<v-row>
									<v-col cols="auto" class="mr-2">
										<v-dialog v-model="dialog1" persistent width="auto">
											<template v-slot:activator="{ props }">
												<v-btn color="success" v-bind="props"> Submit </v-btn>
											</template>
											<v-card>
												<v-card-title class="text-h5"> Submission Confirmation </v-card-title>
												<v-card-text>Are you sure you would like to submit your form?</v-card-text>
												<v-card-actions>
													<v-btn color="green-darken-1" variant="text" @click="dialog1 = false"> Dismiss </v-btn>
													<v-btn color="success" class="mr-4" @click="saveXML(); dialog1=false"> Submit </v-btn>
												</v-card-actions>
											</v-card>
										</v-dialog>
									</v-col>
									<v-col cols="auto">
										<v-dialog v-model="dialog" persistent width="auto">
											<template v-slot:activator="{ props }">
												<v-btn color="error" v-bind="props"> Reset Form </v-btn>
											</template>
											<v-card>
												<v-card-title class="text-h5"> Reset Confirmation </v-card-title>
												<v-card-text>Are you sure you would like to reset your form?</v-card-text>
												<v-card-actions>
													<v-spacer></v-spacer>
													<v-btn color="green-darken-1" variant="text" @click="dialog = false"> Dismiss </v-btn>
													<v-btn color="error" class="mr-4" @click="reset(); dialog=false"> Reset Form </v-btn>
												</v-card-actions>
											</v-card>
										</v-dialog>
									</v-col>
								</v-row>
								<br />
							</v-card-text>
						</v-card>
						<br />
						<br />
						<v-row justify="center">
							<v-col cols="auto">
								<v-btn @click="nextTab('option-4')" density="compact" icon="mdi-arrow-left"></v-btn>
							</v-col>
						</v-row>
						<br />
						<br />
					</v-window-item>
				</v-form>
			</v-window>
		</v-container>
	</v-main>
</template>
<script>
	import xmlbuilder from 'xmlbuilder'
	export default {
		data: () => ({
			fileName: '',
			state_file: null,
			state_file2: null,
			dialog1: false,
			dialog: false,
			altitude_min: 0,
			altitude_max: 10000,
			temperature_min: 0,
			temperature_max: 100,
			pressure_min: 0,
			pressure_max: 1000,
			co2_min: 0,
			co2_max: 10,
			age_min: 0,
			age_max: 120,
			height_min: 55,
			height_max: 190,
			height_units: ['cm', 'in'],
			height_unit: 'cm',
			weight_min: 20,
			weight_max: 250,
			weight_units: ['kg', 'lb'],
			weight_unit: 'kg',
			time_min: 0,
			time_max: 60,
			tab: 'home',
			name: [],
			drawer: false,
			valid: true,
			expanded: [0],
			capability: [{
				required: [],
				name: [],
				propertyName: [],
				dataType: [],
				value: []
			}, ],
			scenario_props: {
				"name": [],
				"authors": [],
				"emails": []
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
				"co2": 4,
				"sounds": [],
				"smells": []
			},
			ed_props: {
				'instruction': [],
				'narrative': [],
				'learnerCount': [0],
				'role': [],
				'setup_checklist': [],
				'equipment': [],
				'supplies': [],
				'duration': [0],
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
			handleFileUpload(e) {
				this.state_file2 = e.target.files[0];
				this.fileName = this.state_file2.name;
			},
			parseXML() {
				if (!this.state_file2) {
					alert('Please upload an XML file first');
					return;
				}
				const reader = new FileReader();
				reader.onload = (e) => {
					const xmlString = e.target.result;
					const parser = new DOMParser();
					const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
					const patient = xmlDoc.querySelector('Patient');
					const name = patient.querySelector('Name').textContent;
					const sex = patient.querySelector('Sex').textContent;
					const age = patient.querySelector('Age').getAttribute('value');
					const height = patient.querySelector('Height').getAttribute('value');
					const weight = patient.querySelector('Weight').getAttribute('value');
					const ambientTemperatureElement = xmlDoc.querySelector('AmbientTemperature');
					const ambientTemperatureValue = ambientTemperatureElement.getAttribute('value');
					const atmosphericPressureElement = xmlDoc.querySelector('AtmosphericPressure');
					const atmosphericPressureValue = atmosphericPressureElement.getAttribute('value');
					const carbonDioxideElement = xmlDoc.querySelector('AmbientGas[Name="CarbonDioxide"]');
					// Access the FractionAmount element and its value attribute
					const fractionAmountElement = carbonDioxideElement.querySelector('FractionAmount');
					const fractionAmountValue = fractionAmountElement.getAttribute('value');
					this.patient_props['name'] = name;
					this.patient_props['age'] = age;
					this.patient_props['gender'] = sex;
					this.patient_props['height'] = height;
					this.patient_props['weight'] = weight;
					this.environment_props['co2'] = fractionAmountValue * 100; // Convert to %
					this.environment_props['temperature'] = ambientTemperatureValue;
					this.environment_props['pressure'] = atmosphericPressureValue;
					this.scenario_props['name'] = this.fileName;
				};
				reader.readAsText(this.state_file2);
			},
			addCapability() {
				this.capability.push({
					required: '',
					name: '',
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
			reset() {
				this.$refs.form.reset();
				this.capability = [{
					required: [],
					name: [],
					propertyName: [],
					dataType: [],
					value: []
				}, ];
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
				xml.att({
					'xmlns:xsd':'http://www.w3.org/2001/XMLSchema',
					'xmlns:xsi':'http://www.w3.org/2001/XMLSchema-instance'
				})
				const Scenario = xml.ele('Scenario')
				Scenario.att({
					'name': this.scenario_props['name']
				})
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
				const authors = Scenario.ele('authors');
				for (var author in this.scenario_props['authors']) {
					authors.text(this.scenario_props['authors'][author]);
				}
				const emails = Scenario.ele('emails');
				for (var email in this.scenario_props['emails']) {
					emails.text(this.scenario_props['emails'][email]);
				}
				const caps = Scenario.ele('capabilities')
				for (var item4 in this.capability) {
					const cap = caps.ele('capability');
					const config_data = cap.ele('configuration_data');
					const config_data_data = config_data.ele('data');
					for (var key4 in this.capability[item4]) {
						if (key4 == 'name') {
							cap.att(key4, this.capability[item4][key4])
						} else if (key4 == 'required') {
							cap.att(key4, this.capability[item4][key4])
						} else if (key4 == 'value' & this.capability[item4][key4] == "[object File]") {
							config_data_data.att(key4, this.capability[item4][key4][0].name)
						} else {
							config_data_data.att(key4, this.capability[item4][key4])
						}
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
        if (this.scenario_props['name'].length > 0) {
          link.download = this.scenario_props['name']
        } else {
          link.download = 'MohsesScenario'
        }
				link.click()
			}
		},
	}
</script>