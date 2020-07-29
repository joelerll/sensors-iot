<template>
  <div id="Home" class="full-parent grey lighten-5">
    <!-- <line-chart :chart-data="data"></line-chart> -->
    <v-container class="" fluid>
      <v-row>
        <v-col cols="12" sm="4">
          <v-card class="rounded-lg" tile>
            <v-card-title primary-title>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="headline">5</v-list-item-title>
                  <v-list-item-subtitle>Usuarios</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-avatar tile size="60"
                  ><v-icon size="80">mdi-account</v-icon></v-list-item-avatar
                >
              </v-list-item>
            </v-card-title>
            <v-card-text> </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card class="pa-2" outlined tile>
            <v-card-text>
              <div>Word of the Day</div>
              <p class="display-1 text--primary">
                be•nev•o•lent
              </p>
              <p>adjective</p>
              <div class="text--primary">
                well meaning and kindly.<br />
                "a benevolent smile"
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card class="pa-2" outlined tile>
            <v-card-text>
              <div>Word of the Day</div>
              <p class="display-1 text--primary">
                be•nev•o•lent
              </p>
              <p>adjective</p>
              <div class="text--primary">
                well meaning and kindly.<br />
                "a benevolent smile"
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import LineChart from "../../components/charts/LineChart";

export default {
  name: "Home",
  components: {
    // LineChart,
  },
  data() {
    return {
      data: {
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [5, 10],
          },
        ],
      },
    };
  },
  mounted() {},
};
</script>

<style lang="css">
.full-parent {
  width: 100%;
  height: 100%;
}
</style>
