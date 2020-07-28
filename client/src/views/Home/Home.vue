<template>
  <div id="Home">
    <line-chart :chart-data="data"></line-chart>
    <v-container fill-height fluid></v-container>
  </div>
</template>

<script>
import LineChart from "../../components/charts/LineChart";

export default {
  name: "Home",
  components: {
    LineChart,
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
