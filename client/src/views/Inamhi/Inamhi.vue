<template>
  <div id="Inamhi">
    <v-container fluid>
      <v-row>
        <v-col cols="8" sm="8" md="4">
          <v-menu
            ref="menu_initial_date"
            v-model="menu_initial_date"
            :close-on-content-click="false"
            :return-value.sync="initial_date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="format_date_initial"
                label="Fecha Inicial"
                prepend-icon="mdi-event"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="initial_date" @input="$refs.menu_initial_date.save(initial_date); menu_initial_date = false">
              <v-spacer></v-spacer>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="8" sm="8" md="4">
          <v-menu
            ref="menu_end_date"
            v-model="menu_end_date"
            :close-on-content-click="false"
            :return-value.sync="end_date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="format_date_end"
                label="Fecha Final"
                prepend-icon="mdi-event"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="end_date"  @input="$refs.menu_end_date.save(end_date); menu_end_date = false">
              <v-spacer></v-spacer>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="8" sm="8" md="4">
          <v-select :items="items" label="Seleccionar" v-model="selector"></v-select>
        </v-col>
      </v-row>
      <v-row>
      <v-col cols="8" sm="4" md="4">
        <v-btn small color="primary" @click="select">Buscar</v-btn>
      </v-col>
      <v-col cols="8" sm="4" md="4">
        <v-btn
          color="blue"
          class="ma-2 white--text"
          fab
          @click="download"
        >
          <v-icon dark>mdi-cloud-download</v-icon>
        </v-btn>
      </v-col>
      </v-row>
      <v-data-table :loading="table_loading" :headers="headers" :items="data" :items-per-page="8" class="elevation-1">
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
import dayjs from "dayjs"
import moment from "moment"
import Papa from 'papaparse'
dayjs.locale('es')

export default {
  components: {
    LineChart,
    BarChart,
  },
  name: "Inamhi",
  methods: {
    download() {
      const csv = Papa.unparse({
        fields: ["Nombre"],
        data: [["Joel"]],
      }, {});
      const csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
      const url = window.URL.createObjectURL(csvData);
      let anchor = document.createElement("a");
      anchor.download = "file.csv";
      anchor.href = url;
      anchor.click();
    },
    getByRange (date) {
      console.log(date)
    },
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
    select() {
      this.table_loading = true
      this.current_type = this.selector.type;
      this.$store
        .dispatch("inamhi/inamhi_page", {
          id_esta: this.selector.id_esta,
          name: this.selector.name,
          type: this.selector.type,
          init_date: this.format_date_initial,
          end_date: this.format_date_end
        })
        .then((data) => {
          this.table_loading = false
          this.inamhi = data;
        })
        .catch((err) => {
          this.table_loading = false
          console.error(err);
        });
    },
  },
  mounted() {
    this.select()
  },
  computed: {
    format_date_initial () {
      const m = moment();
      const roundDown = m.startOf('hour');
      return `${this.initial_date} ${roundDown.format('HH:mm:ss')}`
    },
    format_date_end () {
      const m = moment();
      const roundUp = m.minute() || m.second() || m.millisecond() ? m.add(1, 'hour').startOf('hour') : m.startOf('hour')
      return `${this.end_date} ${roundUp.format('HH:mm:ss')}`
    },
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
      table_loading: false,
      menu_initial_date: false,
      menu_end_date: false,
      initial_date: moment().subtract(1, "d").format('YYYY-MM-DD'), 
      end_date: moment().format('YYYY-MM-DD'),
      selector: {
        text: "GUAYAQUIL (FACULTAD CCNN) - METEOROLOGICA",
        value: {
          id_esta: 63813,
          name: "GUAYAQUIL (FACULTAD CCNN)",
          type: "METEOROLOGICA",
        },
        id_esta: 63813,
        name: "GUAYAQUIL (FACULTAD CCNN)",
        type: "METEOROLOGICA",
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
          text: "COE-MONTE BELLO - METEOROLOGICA",
          value: {
            id_esta: 63806,
            name: "COE-MONTE BELLO",
            type: "METEOROLOGICA",
          },
        },
        {
          text: "PUERTO HONDO - METEOROLOGICA",
          value: {
            id_esta: 63802,
            name: "PUERTO HONDO",
            type: "METEOROLOGICA",
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