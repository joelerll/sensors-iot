<template>
  <div name="AgenciaEspacial">
    <v-container fluid>
      <v-data-table :headers="headers" :items="data" :items-per-page="8" class="elevation-1"></v-data-table>
    </v-container>
    <v-container fluid>
        <v-row>
          <v-col cols="18" sm="6">
            <v-card class="rounded-lg" tile>
              <v-card-title>INDICE TEMPERATURA HUMEDAD-VIENTO</v-card-title>
              <line-chart :chartData="temperatura_data" title="INDICE TEMPERATURA HUMEDAD-VIENTO" xtitle="Fecha" ytitle="INDICE TEMPERATURA HUMEDAD-VIENTO" number="1"/>
            </v-card>
          </v-col>
          <v-col cols="18" sm="6"></v-col>
        </v-row>
      </v-container>
  </div>
</template>

<script>
import data from "./data.json"
import LineChart from "../../components/charts/LineChart";
export default {
  name: "AgenciaEspacial",
  components: {
    LineChart,
  },
  methods: {
    temperaturaChar(labels, data) {
      return {
        labels,
        datasets: [
          {
            label: "INDICE TEMPERATURA HUMEDAD-VIENTO",
            backgroundColor: "#36a2eb",
            borderColor: "#36a2eb",
            data,
            fill: false,
          },
        ],
      };
    },
  },
  computed: {
    temperatura_data() {
      const labels = []
      const data = []
      for (const iterator of this.data) {
        labels.push(iterator['HORA'])
          data.push(iterator['INDICE TEMPERATURA HUMEDAD-VIENTO'])
      }
      const res = this.temperaturaChar(labels, data)
      return res;
    }
  },
  data() {
    return {
      headers: [
        {
          text: "HORA",
          value: "HORA",
        },
        {
          text: "TEMPERATURA ",
          value: "TEMPERATURA ",
        },
        {
          text: "HUMEDAD",
          value: "HUMEDAD",
        },
        {
          text: "PUNTO DE CONDENSACIÓN",
          value: "PUNTO DE CONDENSACIÓN",
        },
        {
          text: "PRESIÓN ATMOSFERICA",
          value: "PRESIÓN ATMOSFERICA",
        },
        {
          text: "SENSACION TERMICA DEL VIENTO",
          value: "SENSACION TERMICA DEL VIENTO",
        },
        {
          text: "INDICE TEMPERATURA HUMEDAD-VIENTO",
          value: "INDICE TEMPERATURA HUMEDAD-VIENTO",
        },
        {
          text: "INDICE DE CALOR",
          value: "INDICE DE CALOR",
        },
        {
          text: "INDICE DE RADIACIÓN UV",
          value: "INDICE DE RADIACIÓN UV",
        },
        {
          text: "RADIACION SOLAR",
          value: "RADIACION SOLAR",
        },
      ],
      data
    };
  },
};
</script>