<template>
  <v-app>
    <v-app-bar
      absolute
      dark
      shrink-on-scroll
      scroll-target="#scrolling-techniques-2"
    >

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>CRESTing Healthcare Education</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
    >
      <v-list nav>
        <v-list-item title="Home" to="/"></v-list-item>
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