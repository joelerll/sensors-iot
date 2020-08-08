<template>
  <div id="Navbar">
    <v-app-bar :app="is_logged" color="transparent" flat height="75" hide-on-scroll>
      <v-toolbar v-show="is_logged" dark flat outlined tile>
        <!-- <v-app-bar-nav-icon @click.native="sideNav = !sideNav"></v-app-bar-nav-icon> -->

        <v-toolbar-title>{{current_path_name}}</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-toolbar>
    </v-app-bar>
    <v-navigation-drawer v-show="is_logged" permanent :app="is_logged">
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <img :src="user.avatar" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{user.first_name}} {{user.last_name}}</v-list-item-title>
          <!-- <v-list-item-subtitle>Admin</v-list-item-subtitle> -->
        </v-list-item-content>
      </v-list-item>

      <v-list>
        <!-- home -->
        <v-list-item link @click="goToHome">
          <v-list-item-icon>
            <v-icon>mdi-home-city</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="goTousers">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <!-- modules -->
        <v-list-item link @click="goToInamhi">
          <v-list-item-icon>
            <v-icon>mdi-weather-lightning</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Inamhi</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logout" color="error">Salir</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      sideNav: false,
      current_path_name: "",
    };
  },
  computed: {
    is_logged: function () {
      return this.$store.getters["auth/isAuthenticated"];
    },
    user: function () {
      return this.$store.getters["auth/userGet"];
    },
  },
  mounted() {
    this.current_path_name = this.$router.currentRoute.name;
  },
  methods: {
    logout: function () {
      this.$store.dispatch("auth/logout");
      this.sideNav = false;
      this.$router.push("/");
    },
    goTousers: function () {
      this.$router.push("/users");
      this.current_path_name = this.$router.currentRoute.name;
    },
    goToHome: function () {
      this.$router.push("/home");
      this.current_path_name = this.$router.currentRoute.name;
    },
    goToInamhi: function () {
      this.$router.push("/inamhi");
      this.current_path_name = this.$router.currentRoute.name;
    },
    goToModule: function () {
      const module = "/TableShow";
      this.$router.push(module);
    },
  },
};
</script>
