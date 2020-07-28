<template>
  <div id="Navbar">
    <v-toolbar dense v-show="is_logged" dark class="hidden-xs-only">
      <v-app-bar-nav-icon
        @click.native="sideNav = !sideNav"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Client APP</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>
    <v-navigation-drawer app clipped v-model="sideNav">
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/men/81.jpg" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Andres Lopez</v-list-item-title>
          <v-list-item-subtitle>Admin</v-list-item-subtitle>
        </v-list-item-content>
        <v-btn icon>
          <v-icon @click="sideNav = !sideNav">mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-list>
        <!-- home -->
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-home-city</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <!-- modules -->
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-weather-lightning</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Empresa Electrica</v-list-item-title>
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
    };
  },
  computed: {
    is_logged: function() {
      return this.$store.getters["auth/isAuthenticated"];
    },
  },
  methods: {
    logout: function() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
  },
};
</script>
