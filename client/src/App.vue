<template>
  <v-app>
    <navbar></navbar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer class="secondary" app>
      <v-layout row wrap align-center>
        <v-flex xs12>
          <div class="white--text ml-3">2020</div>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    navbar,
  },
};
</script>
