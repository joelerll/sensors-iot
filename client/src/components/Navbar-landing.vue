<template>
  <div id="Navbar-landing"></div>
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
