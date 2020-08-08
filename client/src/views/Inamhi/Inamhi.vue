<template>
  <div id="Inamhi">
    <v-container fluid>
      <v-select :items="items" label="Seleccionar" dense v-model="selector" @change="select"></v-select>
      <v-data-table :headers="headers" :items="data" :items-per-page="8" class="elevation-1">
        <template v-slot:item.fecha="{ item }">
          <v-chip dark>{{ item.fecha | moment("DD/MM, h a") }}</v-chip>
        </template>
      </v-data-table>
      <v-container fluid>
        <v-row v-show="current_type === 'METEOROLOGICA'">
          <v-col cols="18" sm="6">
            <v-card class="rounded-lg" tile>
              <v-card-title>Presión Atmosférica</v-card-title>
              <line-chart
                :chartData="presion_atmosferica_data"
                :options="presion_atmosferica_options"
              />
            </v-card>
          </v-col>
          <!-- <v-col cols="18" sm="6">
            <v-card class="rounded-lg" tile>
              <v-card-title>Humedad Relativa del aire</v-card-title>
              <line-chart   :chartdata="chartdata" :options="optionsBar"/>
            </v-card>
          </v-col>-->
        </v-row>
      </v-container>
      <!-- <v-container fluid>
        <v-row>
          <v-col cols="18" sm="6">
            <v-card class="rounded-lg" tile>
              <v-card-title>Temperatura Aire</v-card-title>
              <bar-chart  :chartdata="barData" :options="optionsBar"/>
            </v-card>
          </v-col>
          <v-col cols="18" sm="6">
          </v-col>
        </v-row>
      </v-container>-->
    </v-container>
  </div>
</template>

<script>
import LineChart from "../../components/charts/LineChart";
// import BarChart from "../../components/charts/BarChart";
// import chartjs from 'chart.js';
export default {
  components: {
    LineChart,
    // BarChart
  },
  name: "Inamhi",
  methods: {
    presionAtmosfericaChar(labels, data) {
      return {
        labels,
        datasets: [
          {
            label: "Presión Atmosférica",
            backgroundColor: "#ffce56",
            borderColor: "#ffce56",
            data,
            fill: false,
          },
        ],
      };
    },
    select(data) {
      this.current_type = data.type;
      this.$store
        .dispatch("inamhi/inamhi_page", {
          id_esta: data.id_esta,
          name: data.name,
          type: data.type,
        })
        .then((data) => {
          this.inamhi = data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  mounted() {
    this.$store
      .dispatch("inamhi/inamhi_page", {})
      .then((data) => {
        this.inamhi = data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  computed: {
    presion_atmosferica_data() {
      const data = this.$store.getters["inamhi/inamhi_page_get"];
      const labels = [];
      const datachar = [];
      for (let index = 0; index < data.length; index++) {
        const head = {};
        for (let y = 0; y < data[index].headers.length; y++) {
          if (y === 0) {
            head.fecha = data[index].data[y];
            labels.push(head.fecha);
            continue;
          }
          if (data[index].headers[y] === "PRESION ATMOSFERICA (hPa) INST") {
            datachar.push(data[index].data[y]);
          }
        }
      }
      const res = this.presionAtmosfericaChar(labels, datachar);
      return res;
    },
    data() {
      const data = this.$store.getters["inamhi/inamhi_page_get"];
      const parse = [];
      const labels = [];
      const datachar = [];
      for (let index = 0; index < data.length; index++) {
        const head = {};
        for (let y = 0; y < data[index].headers.length; y++) {
          if (y === 0) {
            head.fecha = data[index].data[y];
            labels.push(head.fecha);
            continue;
          }
          if (data[index].headers[y] === "PRESION ATMOSFERICA (hPa) INST") {
            datachar.push(data[index].data[y]);
          }
          head[data[index].headers[y]] = data[index].data[y];
        }
        parse.push(head);
      }
      return parse;
    },
    headers() {
      const data = this.$store.getters["inamhi/inamhi_page_get"];
      const parse = [];
      let cont = 0;
      if (!data[0]) {
        return []
      }
      for (const head of data[0].headers) {
        if (cont === 0) {
          parse.push({
            text: head,
            value: "fecha",
          });
          cont++;
          continue;
        }
        parse.push({
          text: head,
          value: head,
        });
        cont++;
      }
      return parse;
    },
  },
  data() {
    return {
      selector: {
        text: "GUAYAQUIL (FACULTAD CCNN) - METEOROLOGICA",
        value: {
          id_esta: 63813,
          name: "GUAYAQUIL (FACULTAD CCNN)",
          type: "METEOROLOGICA",
        },
      },
      current_type: "METEOROLOGICA",
      items: [
        {
          text: "GUAYAQUIL (FACULTAD CCNN) - METEOROLOGICA",
          value: {
            id_esta: 63813,
            name: "GUAYAQUIL (FACULTAD CCNN)",
            type: "METEOROLOGICA",
          },
        },
        {
          text: "SAN PABLO EN PALMAR - HIDROLOGICA",
          value: {
            id_esta: 61826,
            name: "SAN PABLO EN PALMAR",
            type: "HIDROLOGICA",
          },
        },
        {
          text: "ESMERALDAS DJ SADE - HIDROLOGICA",
          value: {
            name: "ESMERALDAS DJ SADE",
            id_esta: 61699,
            type: "HIDROLOGICA",
          },
        },
        {
          text: "PUERTO ILA - METEOROLOGICA",
          value: {
            name: "PUERTO ILA",
            id_esta: 57,
            type: "METEOROLOGICA",
          },
        },
        {
          text: "AGUARICO EN NUEVA LOJA (LA GABARRA) - HIDROLOGICA",
          value: {
            name: "AGUARICO EN NUEVA LOJA (LA GABARRA)",
            id_esta: 63965,
            type: "HIDROLOGICA",
          },
        },
      ],
      presion_atmosferica_options: {
        responsive: true,
        title: {
          display: false,
          text: "PRESION ATMOSFERICA",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Fecha",
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "PRESION ATMOSFERICA(hPa) INST",
              },
            },
          ],
        },
      },

      // delete
      date: new Date().toISOString().substr(0, 10),
      // dateFormatted: formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      menu2: false,
      loaded: true,
      HumData: {
        labels: [
          "2020-08-05 00:00:00",
          "2020-08-04 23:00:00",
          "2020-08-04 22:00:00",
          "2020-08-04 21:00:00",
          "2020-08-04 20:00:00",
          "2020-08-04 19:00:00",
          "2020-08-04 18:00:00",
          "2020-08-04 17:00:00",
          "2020-08-04 16:00:00",
          "2020-08-04 15:00:00",
          "2020-08-04 14:00:00",
          "2020-08-04 13:00:00",
          "2020-08-04 12:00:00",
          "2020-08-04 11:00:00",
          "2020-08-04 10:00:00",
          "2020-08-04 09:00:00",
          "2020-08-04 08:00:00",
          "2020-08-04 07:00:00",
          "2020-08-04 06:00:00",
          "2020-08-04 05:00:00",
          "2020-08-04 04:00:00",
          "2020-08-04 03:00:00",
          "2020-08-04 02:00:00",
          "2020-08-04 01:00:00",
        ],
        datasets: [
          {
            label: "Temperatura aire(INST)",
            backgroundColor: "#ffce56",
            borderColor: "#ffce56",
            data: [
              569.8,
              552.8,
              610.5,
              616.4,
              657.8,
              715.6,
              885.2,
              842.3,
              833.7,
              802.8,
              814.9,
              783.5,
              752.6,
              734.9,
              668.9,
              687.6,
              593.2,
              607.2,
              596.7,
              573.7,
              608.4,
              618.6,
              899.3,
              677.9,
            ],
            fill: false,
          },
        ],
      },
      barData: {
        labels: [
          "2020-08-05 00:00:00",
          "2020-08-04 23:00:00",
          "2020-08-04 22:00:00",
          "2020-08-04 21:00:00",
          "2020-08-04 20:00:00",
          "2020-08-04 19:00:00",
          "2020-08-04 18:00:00",
          "2020-08-04 17:00:00",
          "2020-08-04 16:00:00",
          "2020-08-04 15:00:00",
          "2020-08-04 14:00:00",
          "2020-08-04 13:00:00",
          "2020-08-04 12:00:00",
          "2020-08-04 11:00:00",
          "2020-08-04 10:00:00",
          "2020-08-04 09:00:00",
          "2020-08-04 08:00:00",
          "2020-08-04 07:00:00",
          "2020-08-04 06:00:00",
          "2020-08-04 05:00:00",
          "2020-08-04 04:00:00",
          "2020-08-04 03:00:00",
          "2020-08-04 02:00:00",
          "2020-08-04 01:00:00",
        ],
        datasets: [
          {
            label: "Temperatura aire(INST)",
            backgroundColor: "#36a2eb",
            borderColor: "#36a2eb",
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0.1,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
            ],
            fill: false,
          },
        ],
      },
      optionsBar: {
        responsive: true,
        title: {
          display: false,
          text: "Temperatura Aire",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Fecha",
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Precipitación (mm)",
              },
            },
          ],
        },
      },
      chartdata: {
        labels: [
          "2020-08-05 00:00:00",
          "2020-08-04 23:00:00",
          "2020-08-04 22:00:00",
          "2020-08-04 21:00:00",
          "2020-08-04 20:00:00",
          "2020-08-04 19:00:00",
          "2020-08-04 18:00:00",
          "2020-08-04 17:00:00",
          "2020-08-04 16:00:00",
          "2020-08-04 15:00:00",
          "2020-08-04 14:00:00",
          "2020-08-04 13:00:00",
          "2020-08-04 12:00:00",
          "2020-08-04 11:00:00",
          "2020-08-04 10:00:00",
          "2020-08-04 09:00:00",
          "2020-08-04 08:00:00",
          "2020-08-04 07:00:00",
          "2020-08-04 06:00:00",
          "2020-08-04 05:00:00",
          "2020-08-04 04:00:00",
          "2020-08-04 03:00:00",
          "2020-08-04 02:00:00",
          "2020-08-04 01:00:00",
        ],
        datasets: [
          {
            label: "Temperatura aire(INST)",
            backgroundColor: "#ff6384",
            borderColor: "#ff6384",
            data: [
              82,
              79,
              73,
              67,
              63,
              60,
              62,
              58,
              55,
              51,
              50,
              47,
              53,
              56,
              64,
              70,
              83,
              90,
              91,
              91,
              90,
              87,
              86,
              83,
            ],
            fill: false,
          },
          {
            label: "Temperatura aire(MAX)",
            fill: false,
            backgroundColor: "#36a2eb",
            borderColor: "#36a2eb",
            data: [
              0,
              81,
              79,
              73,
              67,
              67,
              65,
              62,
              60,
              56,
              54,
              52,
              55,
              58,
              67,
              72,
              84,
              90,
              92,
              92,
              92,
              90,
              87,
              86,
            ],
          },
          {
            label: "Temperatura aire(MIN)",
            fill: false,
            backgroundColor: "#cc65fe",
            borderColor: "#cc65fe",
            data: [
              0,
              79,
              72,
              67,
              63,
              59,
              55,
              51,
              50,
              49,
              45,
              45,
              50,
              54,
              61,
              69,
              82,
              90,
              91,
              90,
              87,
              86,
              83,
            ],
          },
        ],
      },
      id: 63813,
      type: "METEOROLOGICA",
      estanomb: "GUAYAQUIL (FACULTAD CCNN)",
    };
  },
};
</script>