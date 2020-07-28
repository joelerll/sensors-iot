<template>
  <v-app>
    <v-app-bar app color="primary" dark v-show="is_logged">
      <div class="d-flex align-center"></div>
      <v-spacer></v-spacer>
      <v-btn @click="logout" target="_blank" text>
        <span class="mr-2">Salir</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  computed: {
    is_logged: function () {
      return this.$store.getters["auth/isAuthenticated"];
    },
  },
  methods: {
    logout: function () {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
  },
};
</script>
