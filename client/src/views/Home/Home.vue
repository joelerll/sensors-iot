<template>
  <div id="Home" class="full-parent grey lighten-5">
    <!-- <line-chart :chart-data="data"></line-chart> -->
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="4">
          <chart-card-number
            amount="5"
            title="Usuarios"
            icon="mdi-account"
          ></chart-card-number>
        </v-col>
        <v-col cols="12" sm="4">
          <chart-card-number
            amount="5"
            title="Usuarios"
            icon="mdi-account"
          ></chart-card-number>
        </v-col>
        <v-col cols="12" sm="4">
          <chart-card-number
            amount="5"
            title="Usuarios"
            icon="mdi-account"
          ></chart-card-number>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ChartCardNumber from "../../components/charts/CardNumber";
// import LineChart from "../../components/charts/LineChart";

export default {
  name: "Home",
  components: {
    // LineChart,
    ChartCardNumber,
  },
};
</script>

<style lang="css">
.full-parent {
  width: 100%;
  height: 100%;
}
</style>
