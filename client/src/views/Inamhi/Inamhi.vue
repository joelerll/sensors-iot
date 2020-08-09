<template>
  <div id="Inamhi">
    <v-container fluid>
      <v-select :items="items" label="Seleccionar" dense v-model="selector" @change="select"></v-select>
      <v-data-table :headers="headers" :items="data" :items-per-page="8" class="elevation-1">
        <template v-slot:item.fecha="{ item }">
          <v-chip dark>{{ item.fecha | moment("DD/MM, h a") }}</v-chip>
        </template>
      </v-data-table>
      <v-container fluid v-show="current_type === 'METEOROLOGICA'">
        <v-row>
          <v-col cols="18" sm="6">
            <v-card class="rounded-lg" tile>
              <v-card-title>Presión Atmosférica</v-card-title>
              <line-chart
                :chartData="presion_atmosferica_data"
                :options="presion_atmosferica_options"
              />
            </v-card>
          </v-col>
          <v-col cols="18" sm="6">
            <v-card class="rounded-lg" tile>
              <v-card-title>Humedad Relativa del aire</v-card-title>
              <line-chart
                :chartData="humedad_relativa_aire_data"
                :options="presion_atmosferica_options"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-container fluid v-show="current_type === 'METEOROLOGICA'">
        <v-row>
          <v-col cols="18" sm="6">
            <v-card class="rounded-lg" tile>
              <v-card-title>Precipitación</v-card-title>
              <bar-chart :chartData="precipitacion_data" :options="precipitacion_options" />
            </v-card>
          </v-col>
          <v-col cols="18" sm="6"></v-col>
        </v-row>
      </v-container>
      <v-container fluid v-show="current_type === 'HIDROLOGICA'">
        <v-row>
          <v-col cols="18" sm="6">
            <v-card class="rounded-lg" tile>
              <v-card-title>NIVEL DEL AGUA</v-card-title>
              <bar-chart :chartData="nive_agua_data" :options="nive_agua_options" />
            </v-card>
          </v-col>
          <v-col cols="18" sm="6"></v-col>
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import LineChart from "../../components/charts/LineChart";
import BarChart from "../../components/charts/BarChart";
// import chartjs from 'chart.js';
export default {
  components: {
    LineChart,
    BarChart,
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
    precipitacionChar(labels, data) {
      return {
        labels,
        datasets: [
          {
            label: "Precipitación (mm)",
            backgroundColor: "#36a2eb",
            borderColor: "#36a2eb",
            data,
            fill: false,
          },
        ],
      };
    },
    nivelAguaChar(labels, data) {
      return {
        labels,
        datasets: [
          {
            label: "Nivel agua(INST)",
            backgroundColor: "#36a2eb",
            borderColor: "#36a2eb",
            data,
            fill: false,
          },
        ],
      };
    },
    humedadRelativaAireChar(labels, datacharinst, datacharmax, datacharmin) {
      return {
        labels,
        datasets: [
          {
            label: "HUMEDAD RELATIVA DEL AIRE (%) INST",
            backgroundColor: "#ffce56",
            borderColor: "#ffce56",
            data: datacharinst,
            fill: false,
          },
          {
            label: "HUMEDAD RELATIVA DEL AIRE (%) MAX",
            backgroundColor: "#ff6384",
            borderColor: "#ff6384",
            data: datacharmax,
            fill: false,
          },
          {
            label: "HUMEDAD RELATIVA DEL AIRE (%) MIN",
            backgroundColor: "#36a2eb",
            borderColor: "#36a2eb",
            data: datacharmin,
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
    humedad_relativa_aire_data() {
      const data = this.$store.getters["inamhi/inamhi_page_get"];
      const labels = [];
      const datacharinst = [];
      const datacharmax = [];
      const datacharmin = [];
      for (let index = 0; index < data.length; index++) {
        const head = {};
        for (let y = 0; y < data[index].headers.length; y++) {
          if (y === 0) {
            head.fecha = data[index].data[y];
            labels.push(head.fecha);
            continue;
          }
          if (data[index].headers[y] === "HUMEDAD RELATIVA DEL AIRE (%) INST") {
            datacharinst.push(data[index].data[y]);
          }
          if (data[index].headers[y] === "HUMEDAD RELATIVA DEL AIRE (%) MAX") {
            datacharmax.push(data[index].data[y]);
          }
          if (data[index].headers[y] === "HUMEDAD RELATIVA DEL AIRE (%) MIN") {
            datacharmin.push(data[index].data[y]);
          }
        }
      }
      const res = this.humedadRelativaAireChar(
        labels,
        datacharinst,
        datacharmax,
        datacharmin
      );
      return res;
    },
    precipitacion_data() {
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
          if (data[index].headers[y] === "PRECIPITACION (mm) SUM") {
            datachar.push(data[index].data[y]);
          }
        }
      }
      const res = this.precipitacionChar(labels, datachar);
      return res;
    },
    nive_agua_data() {
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
          if (data[index].headers[y] === "NIVEL DEL AGUA (m) INST") {
            datachar.push(data[index].data[y]);
          }
        }
      }
      const res = this.nivelAguaChar(labels, datachar);
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
        return [];
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
      humedad_relativa_aire_options: {
        responsive: true,
        title: {
          display: false,
          text: "HUMEDAD RELATIVA DEL AIRE",
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
                labelString: "HUMEDAD RELATIVA DEL AIRE (%) ",
              },
            },
          ],
        },
      },
      precipitacion_options: {
        responsive: true,
        title: {
          display: false,
          text: "PRECIPITACION(mm)",
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
      nive_agua_options: {
        responsive: true,
        title: {
          display: false,
          text: "NIVEL DEL AGUA (mm)",
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
                labelString: "NIVEL DEL AGUA INST",
              },
            },
          ],
        },
      },
      // delete
    };
  },
};
</script>