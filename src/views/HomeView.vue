<template>
	<v-toolbar color="primary">
		<v-toolbar-title>Scenario Creation Tool</v-toolbar-title>
	</v-toolbar>
	<v-row>
		<v-col cols="3">
			<v-tabs v-model="tab" direction="vertical" color="primary">
				<v-tab value="home">
					<v-icon start> mdi-home </v-icon> About this page </v-tab>
				<v-tab value="option-1">
					<v-icon start> mdi-form-textbox </v-icon> Scenario Properties </v-tab>
				<v-tab value="option-2">
					<v-icon start> mdi-account </v-icon> Patient Properties </v-tab>
				<v-tab value="option-3">
					<v-icon start> mdi-access-point </v-icon> Environment Properties </v-tab>
				<v-tab value="option-4">
					<v-icon start> mdi-list-status </v-icon> Educational Encounter Properties </v-tab>
				<v-tab value="option-5">
					<v-icon start> mdi-tools </v-icon> Capabilities </v-tab>
				<v-tab value="option-6">
					<v-icon start> mdi-account-alert </v-icon> Head-to-toe </v-tab>
			</v-tabs>
		</v-col>
		<v-col cols="8" class="my-content">
			<v-window v-model="tab">
				<v-main>
					<v-window-item value="home" :transition="false" :reverse-transition="false">
						<p>This is the home page.</p>
						<v-col cols="auto">
							<v-btn @click="nextTab('option-1')" density="compact" icon="mdi-arrow-right"></v-btn>
						</v-col>
					</v-window-item>
					<v-window-item value="option-1" :transition="false" :reverse-transition="false">
						<v-card>
							<v-card-text>
								<v-form ref="form" v-model="valid" lazy-validation>
									<v-select v-model="patient_props['type']" :items="types" :rules="[v => !!v || 'Type is required']" label="Instructor Type" required></v-select>
								</v-form>
								<v-text-field v-model="scenario_props['name']" label="Scenario Name" required></v-text-field>
								<v-combobox v-model="scenario_props['authors']" label="Authors" required multiple chips hint='Click "enter" to add multiple items'></v-combobox>
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
						<br> </v-window-item>
				</v-main>
				<v-window-item value="option-2" :transition="false" :reverse-transition="false">
					<v-card flat>
						<v-card-text>
							<v-text-field v-model="patient_props['name']" :rules="nameRules" label="Name" required></v-text-field>
							<v-text-field v-model="patient_props['title']" :rules="nameRules" label="Title or Rank" required></v-text-field>
							<v-select v-model="patient_props['gender']" :items="genders" :rules="[v => !!v || 'Sex is required']" label="Sex" required></v-select>
							<v-slider v-model="patient_props['age']" label="Age" class="align-center" :max="age_max" :min="age_min" :step="1">
								<template v-slot:append>
									<v-text-field v-model="patient_props['age']" hide-details single-line density="compact" type="number" style="width: 90px"></v-text-field>
								</template>
							</v-slider>
							<v-slider v-model="patient_props['height']" label="Height [cm]" class="align-center" :max="height_max" :min="height_min" :step="0.1">
								<template v-slot:append>
									<v-text-field v-model="patient_props['height']" hide-details single-line density="compact" type="number" style="width: 90px"></v-text-field>
								</template>
							</v-slider>
							<v-slider v-model="patient_props['weight']" label="Weight [kg]" class="align-center" :max="weight_max" :min="weight_min" :step="0.1">
								<template v-slot:append>
									<v-text-field v-model="patient_props['weight']" hide-details single-line density="compact" type="number" style="width: 90px"></v-text-field>
								</template>
							</v-slider>
							<v-combobox v-model="patient_props['meds']" :rules="nameRules" :items="med_options" multiple chips hint='Click "enter" to add multiple items' label="Meds" required></v-combobox>
							<v-combobox v-model="patient_props['history']" :rules="nameRules" label="Medical History" required multiple chips hint='Click "enter" to add multiple items'></v-combobox>
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
					<br> </v-window-item>
				<v-window-item value="option-3" :transition="false" :reverse-transition="false">
					<v-card flat>
						<v-card-text>
							<v-textarea v-model="environment_props['surrounding']" label="Surrounding"></v-textarea>
							<v-text-field v-model="environment_props['altitude']" :rules="nameRules" label="Altitude or Elevation" required></v-text-field>
							<v-text-field v-model="environment_props['temperature']" :rules="nameRules" label="Temperature [C]" required></v-text-field>
							<v-text-field v-model="environment_props['pressure']" :rules="nameRules" label="Pressure [mmHg]" required></v-text-field>
							<v-text-field v-model="environment_props['co2']" :rules="nameRules" label="Ambient CO2 [fraction]" required></v-text-field>
							<v-combobox v-model="environment_props['sounds']" label="Ambient Sounds" multiple chips hint='Click "enter" to add multiple items'></v-combobox>
							<v-combobox v-model="environment_props['smells']" label="Smells" multiple chips hint='Click "enter" to add multiple items'></v-combobox>
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
					<br> </v-window-item>
				<v-window-item value="option-4" :transition="false" :reverse-transition="false">
					<v-card flat>
						<v-card-text>
							<v-textarea v-model="ed_props['instruction']" label="Instructions"></v-textarea>
							<v-textarea v-model="ed_props['narrative']" label="Narrative"></v-textarea>
							<v-text-field v-model="ed_props['learnerCount']" label="Number of Learners"></v-text-field>
							<v-text-field v-model="ed_props['role']" label="Roles"></v-text-field>
							<v-combobox v-model="ed_props['setup_checklist']" label="Setup Checklist" multiple chips hint='Click "enter" to add multiple items'></v-combobox>
							<v-combobox v-model="ed_props['equipment']" label="Equipment" multiple chips hint='Click "enter" to add multiple items'></v-combobox>
							<v-combobox v-model="ed_props['supplies']" label="Supplies" multiple chips hint='Click "enter" to add multiple items'></v-combobox>
							<v-text-field v-model="ed_props['duration']" label="Estimated Duration"></v-text-field>
							<v-text-field v-model="ed_props['scenario_type']" label="Scenario Type"></v-text-field>
							<v-text-field v-model="ed_props['assessment_type']" label="Assessment Type"></v-text-field>
							<v-text-field v-model="ed_props['learner_group']" label="Learner Group"></v-text-field>
							<v-combobox v-model="ed_props['objectives']" label="Learning Objectives" multiple chips hint='Click "enter" to add multiple items'></v-combobox>
							<v-combobox v-model="ed_props['task']" label="Task Descriptions" multiple chips hint='Click "enter" to add multiple items'></v-combobox>
							<v-combobox v-model="ed_props['conditions']" label="Performance Conditions" multiple chips hint='Click "enter" to add multiple items'></v-combobox>
							<v-combobox v-model="ed_props['exit_criteria']" label="Exit Criteria" multiple chips hint='Click "enter" to add multiple items'></v-combobox>
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
					<br> </v-window-item>
				<v-window-item value="option-5" :transition="false" :reverse-transition="false">
					<div v-for="(exp, index) in capability" :key="index">
						<v-checkbox-btn v-model="exp.required" label="Required"></v-checkbox-btn>
						<v-text-field v-model="exp.name" label="Capability Name"></v-text-field>
						<v-text-field v-model="exp.data" label="Configuration Data"></v-text-field>
						<v-text-field v-model="exp.propertyName" label="Property Name"></v-text-field>
						<v-select v-model="exp.dataType" label="Data Type" :items="['string', 'number', 'boolean', 'option']"></v-select>
						<v-file-input v-model="exp.value" label="Value"></v-file-input>
						<v-btn @click="removeCapability(index)">Remove Capability</v-btn>
						<br>
						<br> </div>
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
					<br> </v-window-item>
				<v-window-item value="option-6" :transition="false" :reverse-transition="false">
					<v-main>
						<v-row>
							<v-col>
								<svg width="550px" height="600px" viewBox="15 0 20 100" version="1.1" id="svg46" sodipodi:docname="human.svg" inkscape:version="1.2.2 (b0a84865, 2022-12-01)" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
									<defs id="defs50" />
									<path @click="pathClicked('Chest')" id="Chest" d="m 3.376574,20.674083 -1.7294199,3.09103 -1.89345995,0.94785 1.15295,0.90662 0.90585995,2.63773 2.0996699,0.86537 3.34636,-1.655 -0.83462,-6.50527 z m 8.98624,0 1.72942,3.09103 1.89346,0.94785 -1.15295,0.90662 -0.90604,2.63773 -2.09968,0.86537 -3.34524,-1.655 0.83425,-6.50527 z" />
									<path @click="pathClicked('AbdomenPelvis')" id="AbdomenPelvis" d="m 1.6511841,42.958003 v 4.21363 l 2.9451699,5.8253 1.86028,5.78349 -0.19366,-4.0072 z m 3.2488699,13.42559 0.0647,0.15485 1.21294,2.90207 -0.78307,7.18803 -1.23618,-0.66102 1.0714,-6.69273 z m 1.52977,-7.75493 0.0221,-0.0277 -0.14866,-0.37945 -3.10172,-3.40449 -0.23283,-0.0825 2.05918,5.32009 z m -1.17263,2.01833 1.27705,3.29948 0.42631,-4.04862 -0.25196,-0.64303 z m 4.05219,-2.01795 -0.0221,-0.0281 0.14867,-0.37926 3.10171,-3.40449 0.23246,-0.0825 -2.05843,5.3199 z m 1.17263,2.01795 -1.27706,3.29948 -0.42631,-4.04843 0.25197,-0.64303 z m -6.05729,-20.90604 3.11202,-1.40603 -0.0937,2.27965 -2.80138,1.4364 z m -1.93508,1.6685 1.29355,0.72139 -0.14997,-1.70899 z m 1.05303,-1.637 -2.4793099,-1.03259 0.93361,2.52148 z m -1.5316399,1.73729 1.6900499,1.03372 0.28871,2.06743 -1.64881,-1.07515 z m 2.9114199,1.10421 0.0623,1.62387 2.30327,-0.49961 0.12448,-2.21703 z m 0.15561,2.40432 -0.0309,1.99844 2.20973,0.59353 0.0311,-3.1227 z m -2.6546,-0.98516 1.48384,1.0339 0.20622,2.10905 -1.64975,-1.32355 z m 5.23795,14.47521 -0.60647,-5.91209 -0.015,-3.84879 -2.18479,-1.07533 -0.24746,7.03017 z m 0.41581,-5.7e-4 0.60628,-5.91209 0.0154,-3.84915 2.18404,-1.07515 0.24746,7.03017 z m -4.00588,-10.21155 -1.81341,-1.36479 -0.15748,1.83347 -1.28567985,2.37432 1.98044985,2.73595 1.03109,0.16554 0.37119,-3.88721 z m 7.24294,-8.55562 -3.11202,-1.40604 0.0937,2.27965 2.80119,1.43603 z m 1.93471,1.66849 -1.29355,0.7212 0.14997,-1.70898 z m -1.05303,-1.63718 2.47968,-1.03241 -0.9336,2.52093 z m 1.53164,1.73729 -1.69005,1.03372 -0.28871,2.0678 1.64975,-1.07533 z m -2.91143,1.10421 -0.0622,1.62387 -2.30308,-0.49961 -0.12448,-2.21722 z m -0.1556,2.4045 0.0311,1.99844 -2.20953,0.59391 -0.0311,-3.1227 z m 2.65459,-0.98535 -1.48383,1.03372 -0.20622,2.10905 1.64862,-1.32355 z m -1.64787,4.26366 1.81341,-1.36479 0.15748,1.83347 1.28642,2.37338 -1.98044,2.73652 -1.03109,0.16554 -0.37026,-3.88816 z m 2.42129,4.66199 v 4.21363 l -2.94574,5.82511 -1.86027,5.78349 0.19365,-4.0072 z m -3.24944,13.42596 -0.0649,0.15467 -1.21294,2.90207 0.78325,7.18803 1.23619,-0.66122 -1.0714,-6.69272 z" />
									<path @click="pathClicked('HeadNeck')" id="HeadNeck" d="m 44.395054,15.693663 -2.35767,-1.55045 -1.47119,-3.95143 -0.60741,0.0403 0.27409,1.82447 0.97635,0.33932 0.7613,2.21572 0.33017,1.06849 0.0895,2.14894 1.16448,0.008 0.10563,-0.70833 0.54716,-0.0606 z m 1.01793,1.47595 0.23768,0.64982 1.38107,-0.004 0.01,-2.38784 0.25971,-0.79061 0.57215,-2.1698 0.76359,-0.41018 0.25158,-1.78416 -0.62859,0.0193 -1.08488,3.89981 -2.39725,1.46684 0.2768,1.48507 z m -5.23017,-7.2224797 0.44208,-0.14964 0.16111,0.16427 1.48163,4.0475097 2.32401,1.45118 2.39971,-1.52387 0.97577,-3.68969 0.52752,-0.5590797 0.23367,0.0981 0.24198,-3.34467 -2.03129,-2.31103 -2.84509,-0.51629 -2.20422,0.52915 -1.93631,2.63077 z m -34.85279,5.5519597 1.64975,2.35202 0.74426,2.62159 -1.73486,-1.38354 -0.86649,-2.97104 z m 5.08047,0 -1.64975,2.35202 -0.74538,2.62234 1.73486,-1.38354 0.86649,-2.97104 z m 1.36369,-5.20701 0.0203,-2.2074697 -3.96689,-2.7637 -3.74099,2.23559 -0.006,2.6352797 -0.60741,0.0403 0.27408,1.82447 0.97635,0.33932 0.44244,2.18029 1.82222,2.06556 2.03518,-0.0607 1.79223,-1.94408 0.35957,-2.24066 0.97616,-0.33932 0.25159,-1.78416 z m -8.07719,-0.3449497 -0.0482,-2.59085 4.20648,-2.46806 4.42769,2.95361 -0.0405,1.94408 0.24197,-3.34467 -2.03129,-2.31103 -2.84508,-0.51629 -2.20423,0.52915 -1.9363,2.63077 z" />
									<path @click="pathClicked('Extremities')" id="Extremities" d="m 46.044664,67.662573 1.20605,3.01461 -0.70737,0.26558 -0.89755,3.51771 0.55802,-4.01191 z m 5.08496,-3.15003 -0.63355,1.8609 -0.16813,2.03261 -0.61313,1.93117 0.90584,-0.0851 0.28534,2.15982 z m -4.3014,6.58834 -1.27664,4.99697 0.28984,3.02284 0.67869,10.06546 1.66325,0.63506 3.504,-11.96959 -1.24986,-7.17525 z m -0.54053,20.8287 -0.85194,1.3581 -0.37189,0.79238 0.15589,1.21774 0.76983,0.74446 1.51186,0.12543 1.12989,-0.29192 0.24225,-0.95894 -0.80765,-1.30405 0.22563,-0.85987 -0.29679,-0.84153 0.0194,-1.81524 -1.53568,-0.54817 z m 1.19598,0.4675 -0.15943,1.25776 0.6023,0.97431 m 0.54436,0.29544 -1.06474,0.40084 -1.55326,-0.65137 m 3.56525,-39.90247 -3.97962,-1.70224 -0.56389,0.27131 -0.0528,1.79746 -0.075,4.64669 1.97837,6.04282 -0.47612,1.41403 1.42813,3.29446 1.7661,-0.30111 0.50079,-2.11605 0.1695,-1.75674 2.42102,-8.15763 0.009,-3.68308 z m 4.26465,-23.93238 -0.32785,-1.05121 -1.27383,-2.05489 1.38708,-2.96476 2.28579,0.91634 1.83971,1.74245 0.53937,1.78549 -0.26073,4.30868 z m 2.64394,15.3417 1.51839,0.0828 0.78033,-0.65476 1.16673,2.18281 0.79187,3.34623 -0.49843,0.21064 -0.55144,-2.21453 -0.50541,0.24292 0.30356,2.5012 -0.62882,0.23021 -0.36124,-2.50014 -0.56203,0.16666 0.16765,2.77019 -0.77603,0.30634 -0.19719,-2.87245 -0.45732,-0.0278 -0.22215,2.64829 -0.66539,0.24928 0.0254,-4.56692 -0.3374,-0.20146 -1.38845,1.65469 -0.32098,-0.35041 0.76973,-2.03928 z m 0.97685,-0.1799 1.43335,-0.74932 0.29002,-7.01054 c 0,0 -0.65,-2.77789 -0.64401,-3.06126 l -0.61212,-1.21783 -3.98124,-2.57566 1.0222,1.93525 -0.38967,4.82212 1.8218,7.69308 z m -20.53539,-2.72339 5.48374,1.86457 2.27386,1.3378 2.74195,-1.74412 4.51804,-1.28077 0.90009,2.29721 0.675,3.4346 -0.81272,5.02838 -2.82636,0.16819 -4.11256,-1.67581 -1.00814,0.39118 -0.95849,-0.39888 -4.44053,1.94411 -2.77023,-0.51478 -0.95181,-6.15325 0.36754,-2.7864 z m 6.4333,24.38495 -1.20605,3.01461 0.70738,0.26558 0.89754,3.51771 -0.55801,-4.01191 z m -5.08496,-3.15003 0.63355,1.8609 0.16813,2.03261 0.61314,1.93117 -0.90585,-0.0851 -0.28534,2.15982 z m 4.3014,6.58834 1.27664,4.99697 -0.28984,3.02284 -0.67869,10.06546 -1.66325,0.63506 -3.50399,-11.96959 1.24985,-7.17525 z m 0.54053,20.8287 0.85194,1.3581 0.37189,0.79238 -0.15588,1.21774 -0.76984,0.74446 -1.51185,0.12543 -1.1299,-0.29192 -0.24225,-0.95894 0.80765,-1.30405 -0.22562,-0.85987 0.29679,-0.84153 -0.0194,-1.81524 1.53568,-0.54817 z m -1.19598,0.4675 0.15943,1.25776 -0.6023,0.97431 m -0.54436,0.29544 1.06474,0.40084 1.55326,-0.65137 m -4.19331,-39.53466 4.55099,-2.03879 0.63802,0.23079 0.0353,1.80672 0.075,4.64669 -1.97837,6.04282 0.47612,1.41403 -1.42812,3.29446 -1.76611,-0.30111 -0.50079,-2.11605 -0.1695,-1.75674 -2.42102,-8.15763 -0.34279,-3.64687 z m -3.98895,-24.48137 0.4297,-1.4164 1.30458,-1.68577 -1.39393,-2.96155 -2.28367,0.92162 -1.83567,1.7467 -0.53524,1.78673 0.27068,4.30806 z m -2.46869,15.35539 -1.5182,0.0863 -0.78184,-0.65295 -1.16168,2.1855 -0.78414,3.34805 0.49892,0.20949 0.54632,-2.2158 0.50597,0.24175 -0.29779,2.5019 0.62936,0.22875 0.35546,-2.50096 0.56242,0.16536 -0.16126,2.77057 0.77674,0.30455 0.19056,-2.87291 0.45724,-0.0289 0.22827,2.64778 0.66597,0.24774 -0.0359,-4.56685 0.33693,-0.20224 1.39227,1.65147 0.32017,-0.35115 -0.77444,-2.03749 z m -0.97726,-0.17765 -1.43509,-0.746 -0.30622,-7.00985 c 0,0 0.64359,-2.77938 0.63694,-3.06274 l 0.6093,-1.21924 3.62552,-2.56583 -0.68276,1.9919 0.41561,4.74788 -1.80402,7.69727 z m -12.59945,1.31596 1.5198,0.0506 0.76631,-0.67111 1.21262,2.15766 0.86245,3.32873 -0.49386,0.22113 -0.59815,-2.20238 -0.50016,0.25356 0.35639,2.49422 -0.62382,0.24345 -0.41402,-2.49194 -0.55839,0.17851 0.2262,2.76603 -0.76938,0.32268 -0.25788,-2.86764 -0.4578,-0.0181 -0.16611,2.6524 -0.65997,0.26329 -0.0712,-4.56643 -0.34158,-0.19428 -1.35316,1.68368 -0.32832,-0.34355 0.72644,-2.0551 z m 1.18497,-16.19302 -0.005,3.09419 0.57959,1.91184 0.54538,-2.41185 z m -23.9347699,16.19302 -1.5198,0.0506 -0.76631,-0.67112 -1.2126199,2.15767 -0.86245,3.32873 0.49386,0.22113 0.5981499,-2.20238 0.50016,0.25356 -0.35639,2.49422 0.62382,0.24345 0.41402,-2.49194 0.55839,0.17851 -0.2262,2.76603 0.76938,0.32268 0.25788,-2.86764 0.4578,-0.0181 0.16611,2.65239 0.65997,0.2633 0.0712,-4.56643 0.34158,-0.19428 1.35316,1.68367 0.32832005,-0.34354 -0.72644005,-2.0551 z m -1.18497,-16.19302 0.005,3.09419 -0.57959,1.91184 -0.54539,-2.41185 z m 7.0789299,37.41425 -0.12448,1.12295 0.87118,1.08171 0.29058,1.70599 0.58116,0.24933 0.49774,-2.57866 0.33182,-0.91486 -0.29058,-0.58247 z m 3.85854,0.0832 -0.62241,1.74685 -1.32767,2.57867 0.33182,2.37095 0.95423,-2.66209 0.78832,-1.4964 z m -4.9786799,-2.37058 0.9542299,5.11609 -0.6223999,-0.33313 -0.49793,1.6638 z m 4.2734099,7.94395 -0.29058,0.91486 -0.62241,3.86828 -0.0829,5.15733 0.87174,5.03304 -0.0418,-6.44714 0.91298,-2.57848 0.1243,-2.82837 z m -1.99151,2.32914 0.20735,7.73637 1.65968,6.23904 -1.80497,-0.85299 -3.00797985,-10.83584 1.03727995,-6.82095 z m 2.98717,15.09818 -0.12448,3.45228 -0.29058,1.20637 h -0.87118 l -0.24877,-0.83181 -0.29059,-0.0416 0.0623,0.83181 -1.09934,-0.33333 -0.29058,-0.16629 -1.2448,-0.27033 -0.0412,-0.97747 1.2031899,-2.03781 0.82975,-1.04009 2.03294,-0.83181 z m -6.16386985,-37.46914 0.15504,4.75053 2.40262985,6.60968 -0.73638,1.90021 -2.36400985,-8.34435 z m 0.58117,-11.60768 0.15502995,4.00684 -1.31753995,7.93154 -0.61978,-6.40308 z m 0.38768995,5.1223 2.7515099,6.07239 0.61997,4.87425 -1.16232,6.85771 -2.51904985,-6.98163 -0.15504,-7.18801 z m 12.1663099,20.87063 0.1243,1.12295 -0.87118,1.08171 -0.29058,1.70599 -0.58116,0.24933 -0.49774,-2.57866 -0.33182,-0.91486 0.29058,-0.58247 z m -3.85853,0.0832 0.6224,1.74685 1.3273,2.57867 -0.33182,2.37095 -0.95423,-2.66209 -0.78738,-1.49734 z m 4.97811,-2.37039 -0.95423,5.11609 0.62241,-0.33295 0.49773,1.66381 z m -4.27284,7.94394 0.29058,0.91486 0.6224,3.8681 0.0829,5.15733 -0.87136,5.03304 0.0412,-6.44714 -0.91242,-2.57848 -0.12561,-2.82837 z m 1.9915,2.32915 -0.20753,7.73637 -1.65949,6.23904 1.80478,-0.853 3.00816,-10.83583 -1.03727,-6.82095 z m -2.98698,15.09817 0.1243,3.45228 0.28983,1.20638 h 0.87136 l 0.24897,-0.83181 0.29058,-0.0416 -0.0624,0.83181 1.09914,-0.33332 0.29058,-0.16629 1.24444,-0.27033 0.0416,-0.97748 -1.20319,-2.03743 -0.82974,-1.0399 -2.03294,-0.83181 z m 6.16312,-37.46932 -0.15504,4.75091 -2.40263,6.60949 0.7362,1.90021 2.36401,-8.34435 z m -0.58154,-11.60825 -0.15485,4.00722 1.31793,7.93154 0.61977,-6.40308 z m -0.38731,5.12268 -2.75152,6.07258 -0.62015,4.87425 1.16232,6.85771 2.51886,-6.98144 0.15504,-7.18764 z m -17.8748999,-10.94443 -1.30083,10.28927 1.10778,0.01 1.89387,-7.99609 -0.19174,-4.53719 z m -1.21978,-1.94971 0.58728,2.58635 -1.11875,9.15614 -0.55849,-0.21663 -0.2304,-6.77018 z m 0.71916,-0.2047 0.33838,1.70499 1.81931,-2.54418 0.66289,-1.26895 z m 2.8527,-2.6096 c 0.0259,-0.0144 0.0536,-0.0254 0.0824,-0.0324 l 1.48332,-4.95503 -1.00455,-2.08428 -1.6550901,1.74532 -2.2303399,6.67667 -0.0415,0.93739 c 1.06528,-0.84215 2.18961,-1.60679 3.36433,-2.28803 z m -1.6945,-5.75654 -1.64891,6.43421 0.36468,-4.92266 z m 21.7225799,10.52055 1.30083,10.28927 -1.10778,0.01 -1.89387,-7.99609 0.19174,-4.53719 z m 1.21978,-1.94971 -0.58729,2.58635 1.11876,9.15614 0.55849,-0.21663 0.2304,-6.77018 z m -0.55354,-0.2047 -0.33838,1.70499 -1.81932,-2.54418 -0.6629,-1.26895 z m -2.85271,-2.6096 c -0.0259,-0.0144 -0.0536,-0.0254 -0.0824,-0.0324 l -1.48333,-4.95503 1.00456,-2.08428 1.65511,1.74532 2.23034,6.67667 0.0415,0.93739 c -1.06528,-0.84215 -2.18962,-1.60679 -3.36434,-2.28803 z m 1.6945,-5.75654 1.64893,6.43421 -0.36469,-4.92266 z m -13.83867,-9.20021 -3.5574599,1.97916 -0.72652995,-0.35074 z m 0.107,0.43288 0.37119,1.73073 -2.18459,0.53561 -1.4011499,-0.49436 z m -3.98148985,1.97595 -0.75814,-0.41 -2.40806005,1.66799 -1.17364,1.50707 -0.62662,1.56259 0.0464,3.70195 1.3284,-1.72153 -0.0407,-2.59376 0.48843,-0.5005 c 0,0 3.09777005,-3.19057 3.14370005,-3.214 z m 0.24089995,0.10873 c 0.002,0.0525 -3.32987,3.54733 -3.32987,3.54733 l -0.10067,3.10396 1.15426,-1.97782 2.22547005,-0.94804 1.56574985,-2.88481 z m 10.0565999,-2.51756 3.55748,1.97916 0.72653,-0.35074 z m -0.107,0.43288 -0.37119,1.73073 2.1846,0.53561 1.40116,-0.49436 z m 3.98151,1.97595 0.75814,-0.41 2.40806,1.66799 1.17364,1.50707 0.62662,1.5626 -0.0464,3.70194 -1.3284,-1.72153 0.0407,-2.59376 -0.48842,-0.50049 c 0,0 -3.09778,-3.19058 -3.14371,-3.21401 z m -0.2409,0.10873 c -10e-4,0.0525 3.32987,3.54733 3.32987,3.54733 l 0.10067,3.10396 -1.15426,-1.97782 -2.22547,-0.94804 -1.56576,-2.88481 z" />
									<path @click="pathClicked('Back')" id="Back" d="m 41.650534,18.217913 0.063,-2.62462 -0.71441,1.15181 -4.37994,1.49796 4.97857,8.36746 1.83043,5.08188 -0.21949,-13.55362 z m -7.42423,1.95717 -1.57473,1.56517 -0.81404,2.06905 -0.38603,2.52859 1.83679,-1.23927 2.76223,-1.15538 1.84691,3.4342 1.13679,5.49715 0.0767,5.8593 4.07066,1.10938 -0.10355,-7.94098 -1.94107,-4.90022 -5.04395,-8.19334 z m 13.23814,-1.85796 -0.063,-2.62463 0.71441,1.15181 4.37994,1.49796 -4.97857,8.36746 -1.83043,5.08189 0.21949,-13.55362 z m 7.42423,1.95716 1.57473,1.56518 0.81404,2.06904 0.0384,2.52859 -1.48921,-1.23926 -2.76223,-1.15539 -1.84691,3.4342 -1.13679,5.49715 -0.0767,5.8593 -4.07066,1.10938 0.10355,-7.94098 1.94107,-4.90021 5.04395,-8.19335 z m -11.12961,-1.89714 0.53876,25.33066 0.48967,-0.0297 0.65658,-25.3387 -0.28147,-0.84188 -1.25059,-4.9e-4 z m 0.08474,22.52102 0.14418,2.97292 1.15984,-0.0241 0.048,-2.96488 2.80867,-0.81981 2.34029,-0.7541 1.34121,3.73319 -4.77886,1.36455 -2.33301,1.2158 -2.37536,-1.2333 -5.45663,-1.37716 1.51961,-3.95743 z" /> </svg>
							</v-col>
							<!-- <div v-if="showTextBox"> -->
							<v-col>
								<v-form ref="form" v-model="valid" lazy-validation>
									<!-- <v-text-field :label="name[name.length -1]" placeholder="Enter your condition here"></v-text-field> -->
									<v-text-field v-for="(item, index) in name" :key="index" :label="Object.keys(item)[0]" v-model="item[Object.keys(item)[0]]" placeholder="Enter your condition here" /> </v-form>
							</v-col>
						</v-row>
						<v-row class="justify-center">
							<v-form>
								<v-slider v-model="patient_props['age']" label="Age" class="align-center" :max="age_max" :min="age_min" :step="1"> </v-slider>
								<v-btn :disabled="!valid" color="success" class="mr-4"> Submit </v-btn>
								<v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
							</v-form>
						</v-row>
						<br> </v-main>
				</v-window-item>
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
		med_options: ['A', 'B', 'C'],
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
			"meds": [],
			"history": []
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
			// reset () {
			//   this.$refs.form.reset()
			// },
			reset() {
				// Select all SVG path elements on the page
				let paths = document.querySelectorAll("svg path");
				// Loop through each path element and remove the "active" class
				paths.forEach(path => {
					if(path.classList.contains("active")) {
						path.classList.remove("active");
					}
				});
				this.name = []
			},
			pathClicked(id) {
				let pathElement = document.getElementById(id);
				if(this.name.some(x => Object.keys(x).includes(id))) {
					this.name = this.name.filter(x => !Object.keys(x).includes(id));
				} else {
					this.name.push({
						[id]: ''
					})
				}
				if(pathElement.classList.contains("active")) {
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
					'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
					'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
				})
				const metadata = xml.ele('metadata')
				for(var key1 in this.patient_props) {
					if(Array.isArray(this.patient_props[key1])) {
						for(var item1 in this.patient_props[key1]) {
							metadata.ele(key1, this.patient_props[key1][item1])
						}
					} else {
						metadata.ele(key1, this.patient_props[key1])
					}
				}
				for(var key2 in this.environment_props) {
					if(Array.isArray(this.environment_props[key2])) {
						for(var item2 in this.environment_props[key2]) {
							metadata.ele(key2, this.environment_props[key2][item2])
						}
					} else {
						metadata.ele(key2, this.environment_props[key2])
					}
				}
				for(var key3 in this.ed_props) {
					if(Array.isArray(this.ed_props[key3])) {
						for(var item3 in this.ed_props[key3]) {
							metadata.ele(key3, this.ed_props[key3][item3])
						}
					} else {
						metadata.ele(key3, this.ed_props[key3])
					}
				}
				for(var item4 in this.capability) {
					for(var key4 in this.capability[item4]) {
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
	computed: {
		showPartsMerged() {
			return {
				'head': true,
				'face': true,
				'neck': true,
				'shoulder-left': true,
				'shoulder-right': true,
				'arm-left': true,
				'forearm-left': true,
				'arm-right': true,
				'forearm-right': true,
				'chest-left': true,
				'chest-right': true,
				'belly-left': true,
				'ribs-left': true,
				'belly-right': true,
				'belly': true,
				'ribs-right': true,
				'thigh-left': true,
				'innerthigh-left': true,
				'feet-left': true,
				'calf-left': true,
				'knee-left': true,
				'thigh-right': true,
				'genitalia': true,
				'innerthigh-right': true,
				'right-feet': true,
				'calf-right': true,
				'knee-right': true,
				'elbow-right': true,
				'hand-right': true,
				'elbow-left': true,
				'hands-left': true,
				'armback-left': true,
				'leg-left': true,
				'buttock': true,
				'loin': true,
				'column': true,
				'head-back': true,
				'nape': true,
				'armback-right': true,
				'leg-right': true,
				'back-right': true,
				'clavicule-right': true,
				'back-left': true,
				'clavicule-left': true
			}
		}
	}
}
</script>
<style>
.my-content {
	margin-top: -50px;
	/* Adjust the top margin */
	/* padding-left: 16px; Adjust the left padding */
}

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