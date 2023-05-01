<template>
  <v-app>
    <v-app-bar
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>MoHSES Scenario User Interface</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-avatar size="160">
        <a href="https://crest.washington.edu/">
      <img :src="require('@/assets/image-asset.png')" alt="Logo" style="max-width: 90%; max-height: 90%; filter: grayscale(100%) invert(1);">
    </a>
    </v-avatar>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
    >
      <v-list nav>
        <v-list-item title="BioGears Scenario Creation Tool" to="/"></v-list-item>
        <v-list-item title="MoHSES Scenario Creation Tool" to="/MoHSES"></v-list-item>
        <v-list-item title="BioGears Plotting Tool" to="/PlottingTool"></v-list-item>
        <v-list-item title="About" to="/About"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: false
    })
  }
</script>