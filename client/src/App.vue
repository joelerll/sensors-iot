<template>
  <v-app>
    <!-- <v-app-bar app color="primary" dark>
      <div class="d-flex align-center"></div>

      <v-spacer></v-spacer>
    </v-app-bar>-->

    <v-main>
      <login></login>
    </v-main>
  </v-app>
</template>

<script>
import Login from "./views/Login/Login";

export default {
  name: "App",

  components: {
    login: Login,
  },

  data: () => ({
    //
  }),
};
</script>
