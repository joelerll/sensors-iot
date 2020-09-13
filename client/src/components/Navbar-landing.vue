<template>
  <div id="Navbar-landing">
    <v-card class="mx-auto">
      <v-toolbar class="white">
        <v-app-bar-nav-icon @click.stop="drawer"></v-app-bar-nav-icon>
        <img
          link
          @click="goToLanding"
          src="@/assets/guayaquil.png"
          alt="Vuetify.js"
          height="50px"
          width="60px"
        />
        <!-- </v-toolbar-side-icon> -->
        <v-spacer></v-spacer>
        <v-toolbar-title class="mx-0">
          <!-- <h3>Datos Guayaquil</h3> -->
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-menu open-on-hover bottom offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">Datos Disponibles</v-btn>
            </template>
            <v-list>
              <v-list-item link @click="goToInamhi">
                <v-list-item-icon>
                  <img src="@/assets/logo_inamhi_2.png" width="40" height="30" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Inamhi</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link @click="goToAgenciaEspacial">
                <v-list-item-icon>
                  <img src="@/assets/agencia_espacial.png" width="40" height="30" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Agencia Espacial</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link @click="goToWifi">
                <v-list-item-icon>
                  <img src="@/assets/wifi.png" width="40" height="30" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Puntos internet gratuito</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
          <!--<v-btn flat>Blog</v-btn>-->
          <!-- <v-btn class="pink lighten-3">Ingresar</v-btn> -->
        </v-toolbar-items>
      </v-toolbar>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Navbar-landing",
  methods: {
    goToInamhi: function () {
      this.$router.push("/inamhi");
      this.current_path_name = this.$router.currentRoute.name;
    },
    goToAgenciaEspacial: function () {
      this.$router.push("/agencia-espacial");
      this.current_path_name = this.$router.currentRoute.name;
    },
    goToWifi: function () {
      this.$router.push("/wifi");
      this.current_path_name = this.$router.currentRoute.name;
    },
    goToLanding: function () {
      this.$router.push("/");
    },
    is_logged: function () {
      return this.$store.getters["auth/isAuthenticated"];
    },
    drawer: function () {
      return this.$store.dispatch("drawer");
    },
  },
  data() {
    return {
      logo:
        "https://i.pinimg.com/originals/a4/73/45/a47345c7bcff5c8be7240a2574058dc6.png",
    };
  },
};
</script>