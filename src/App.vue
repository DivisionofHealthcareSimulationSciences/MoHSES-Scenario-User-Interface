<template>
  <v-app>
    <v-app-bar
      absolute
      dark
      shrink-on-scroll
      scroll-target="#scrolling-techniques-2"
    >

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>MoHSES Scenario User Interface</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
    >
      <v-list nav>
        <v-list-item title="Home" to="/"></v-list-item>
        <v-list-item title="MoHSES Scenario Creation Tool" to="/MoHSES"></v-list-item>
        <v-list-item title="BioGears Scenario Creation Tool" to="/BioGears"></v-list-item>
        <v-list-item title="About" to="/about"></v-list-item>
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