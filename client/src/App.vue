<template>
  <v-app>
    <navbar v-show="is_logged"></navbar>
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
// import navbar from "./components/Navbar";
import navbar from "./components/Navbar-landing";

export default {
  name: "App",
  components: {
    navbar,
  },
  computed: {
    is_logged: function () {
      return this.$store.getters["auth/isAuthenticated"];
    },
  },
};
</script>
