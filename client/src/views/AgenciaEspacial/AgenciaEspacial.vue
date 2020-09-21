<template>
  <div name="AgenciaEspacial" style="margin: 15px;">
    <v-row class="mb-6">
      <v-col class="pa-2">
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
          <v-date-picker
            v-model="initial_date"
            @input="$refs.menu_initial_date.save(initial_date); menu_initial_date = false"
          >
            <v-spacer></v-spacer>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col class="pa-2">
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
          <v-date-picker
            v-model="end_date"
            @input="$refs.menu_end_date.save(end_date); menu_end_date = false"
          >
            <v-spacer></v-spacer>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col class="pa-2" justify="center" align="center" align-self="center">
        <!-- <v-btn small color="primary" @click="select">Buscar</v-btn> -->
        <v-row justify="center" align="center" align-self="center">
          <v-col cols="8" sm="4" md="4">
            <v-btn small color="primary" @click="getData">Buscar</v-btn>
          </v-col>
          <v-col cols="8" sm="4" md="4">
            <v-btn color="blue" class="ma-2 white--text" fab @click="download">
              <v-icon dark>mdi-cloud-download</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <h1 v-show="same_date" style="color: red;">Exa no esta actualizada</h1>
    <v-card class="rounded-lg" tile>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Climatológica EXA-ISS-1, Guayaquil</v-list-item-title>
          <v-list-item-subtitle>{{ end_date | moment("dddd, MMMM Do YYYY") }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-card-text>
        <v-row align="center">
          <v-col class="display-3" cols="6">{{resume.temperatura_inst}}&deg;C</v-col>
          <v-col cols="6">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sun.png"
              alt="Sunny image"
              width="92"
            ></v-img>
          </v-col>
        </v-row>
      </v-card-text>
      <v-list class="transparent">
        <v-row>
          <v-col cols="18" sm="6">
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-white-balance-sunny</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Temperatura Max/Min</v-list-item-title>

              <v-list-item-subtitle
                class="text-right"
              >{{resume.temperatura_min}}/{{resume.temperatura_max}}</v-list-item-subtitle>
            </v-list-item>
          </v-col>
          <v-col cols="18" sm="6">
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-white-balance-sunny</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Humedad instantanea (%)</v-list-item-title>
              <v-list-item-subtitle class="text-right">{{resume.humedad_inst}}</v-list-item-subtitle>
            </v-list-item>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="18" sm="6">
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-white-balance-sunny</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Humedad Max/Min</v-list-item-title>
              <v-list-item-subtitle class="text-right">{{resume.humedad_max}}/{{resume.humedad_min}}</v-list-item-subtitle>
            </v-list-item>
          </v-col>
          <v-col cols="18" sm="6">
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-white-balance-sunny</v-icon>
              </v-list-item-icon>
              <v-list-item-title>PDC mín/máx</v-list-item-title>
              <v-list-item-subtitle class="text-right">{{resume.minimo_pdc}}/{{resume.maximo_pdc}}</v-list-item-subtitle>
            </v-list-item>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="18" sm="6">
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-white-balance-sunny</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Presión (mm)</v-list-item-title>
              <v-list-item-subtitle class="text-right">{{resume.presion_atm}}</v-list-item-subtitle>
            </v-list-item>
          </v-col>
          <v-col cols="18" sm="6">
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-white-balance-sunny</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Índice de radiación UV</v-list-item-title>
              <img src="@/assets/uviscale.png" width="200" height="30" />
              <v-list-item-subtitle class="text-right">{{resume.indice_radiacion_uv}} de 10</v-list-item-subtitle>
            </v-list-item>
          </v-col>
        </v-row>
      </v-list>
    </v-card>

    <v-container fluid>
      <v-row>
        <v-col cols="18" sm="6">
          <v-card class="rounded-lg" tile>
            <v-card-title>Temperatura instantánea</v-card-title>
            <line-chart
              :chartData="temperatura_instantanea_data"
              :options="temperatura_instantanea_options"
            />
          </v-card>
        </v-col>
        <v-col cols="18" sm="6">
          <v-card-title>Humedad instantánea</v-card-title>
          <line-chart :chartData="humedad_instantanea_data" :options="humedad_instantanea_options" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="18" sm="6">
          <v-card class="rounded-lg" tile>
            <v-card-title>Punto de condensación instantánea</v-card-title>
            <line-chart
              :chartData="punto_condensacion_instantanea_data"
              :options="punto_condensacion_options"
            />
          </v-card>
        </v-col>
        <v-col cols="18" sm="6">
          <v-card-title>Índice de radiación UV instantanea</v-card-title>
          <line-chart :chartData="uv_instantanea_data" :options="uv_instantanea_options" />
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-data-table :headers="headers" :items="data" :items-per-page="10" class="elevation-1">
        <template v-slot:item.fecha="{ item }">
          <v-chip dark>{{ item.fecha | moment("DD/MM, h a") }}</v-chip>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";
import _ from "lodash";
import Papa from "papaparse";
// import data from "./data.json"
import LineChart from "../../components/charts/LineChart";
export default {
  name: "AgenciaEspacial",
  components: {
    LineChart,
  },
  mounted() {
    this.getData();
  },
  methods: {
    download() {
      const cleanData = [];
      for (const data of this.data) {
        let tmp = [];
        for (const key in data) {
          tmp.push(data[key]);
        }
        cleanData.push(tmp);
      }
      const csv = Papa.unparse(
        {
          fields: _.map(this.headers, "text"),
          data: cleanData,
        },
        {}
      );
      const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(csvData);
      let anchor = document.createElement("a");
      anchor.download = `agencia-espacial.csv`;
      anchor.href = url;
      anchor.click();
    },
    getData() {
      this.table_loading = true;
      this.$store
        .dispatch("agencia/agencia_page", {
          init_date: this.format_date_initial,
          end_date: this.format_date_end,
        })
        .then((data) => {
          this.table_loading = false;
          this.agencia = data;
        })
        .catch((err) => {
          this.table_loading = false;
          console.error(err);
        });
    },
    humedadRelativaAireChar(labels, datacharinst, datacharmax, datacharmin) {
      return {
        labels: _.reverse(labels),
        datasets: [
          {
            label: "HUMEDAD (%) INST",
            backgroundColor: "#ffce56",
            borderColor: "#ffce56",
            data: _.reverse(datacharinst),
            fill: false,
          },
          {
            label: "HUMEDAD (%) MAX",
            backgroundColor: "#ff6384",
            borderColor: "#ff6384",
            data: _.reverse(datacharmax),
            fill: false,
          },
          {
            label: "HUMEDAD (%) MIN",
            backgroundColor: "#36a2eb",
            borderColor: "#36a2eb",
            data: _.reverse(datacharmin),
            fill: false,
          },
        ],
      };
    },
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
    temperaturaInstantaneaChar(labels, data) {
      return {
        labels: _.reverse(labels),
        datasets: [
          {
            label: "Temperatura Instantanea",
            backgroundColor: "#ffce56",
            borderColor: "#ffce56",
            data: _.reverse(data),
            fill: false,
          },
        ],
      };
    },
    humedadInstantaneaChar(labels, data) {
      return {
        labels: _.reverse(labels),
        datasets: [
          {
            label: "Humedad Instantanea",
            backgroundColor: "#36a2eb",
            borderColor: "#36a2eb",
            data: _.reverse(data),
            fill: false,
          },
        ],
      };
    },
    puntoCondesacionInstantaneaChar(labels, data) {
      return {
        labels: _.reverse(labels),
        datasets: [
          {
            label: "Punto Condensación",
            backgroundColor: "#ff6384",
            borderColor: "#ff6384",
            data: _.reverse(data),
            fill: false,
          },
        ],
      };
    },
    uvInstantaneaChar(labels, data) {
      return {
        labels: _.reverse(labels),
        datasets: [
          {
            label: "Índice de radiación UV instantanea",
            backgroundColor: "#36a2eb",
            borderColor: "#36a2eb",
            data: _.reverse(data),
            fill: false,
          },
        ],
      };
    },
  },
  computed: {
    same_date() {
      const data = this.$store.getters["agencia/same_data"];
      // console.log(data);
      return data == "true" || data == true ? true : false;
      // return
    },
    temperatura_instantanea_data() {
      const data = this.$store.getters["agencia/agencia_page_get"];
      const labels = [];
      const datachar = [];
      for (let index = 0; index < data.length; index++) {
        const head = {};
        for (let y = 0; y < data[index].headers.length; y++) {
          if (y === 0) {
            head.fecha = data[index].data[y];
            labels.push(moment(head.fecha).format("YYYY-MM-DD HH:mm"));
            continue;
          }
          if (data[index].headers[y] === "TEMPERATURA (C) INST") {
            datachar.push(data[index].data[y]);
          }
        }
      }
      const res = this.temperaturaInstantaneaChar(labels, datachar);
      return res;
    },
    humedad_instantanea_data() {
      const data = this.$store.getters["agencia/agencia_page_get"];
      const labels = [];
      const datachar = [];
      for (let index = 0; index < data.length; index++) {
        const head = {};
        for (let y = 0; y < data[index].headers.length; y++) {
          if (y === 0) {
            head.fecha = data[index].data[y];
            labels.push(moment(head.fecha).format("YYYY-MM-DD HH:mm"));
            continue;
          }
          if (data[index].headers[y] === "HUMEDAD (%) INST") {
            datachar.push(data[index].data[y]);
          }
        }
      }
      const res = this.humedadInstantaneaChar(labels, datachar);
      return res;
    },
    punto_condensacion_instantanea_data() {
      const data = this.$store.getters["agencia/agencia_page_get"];
      const labels = [];
      const datachar = [];
      for (let index = 0; index < data.length; index++) {
        const head = {};
        for (let y = 0; y < data[index].headers.length; y++) {
          if (y === 0) {
            head.fecha = data[index].data[y];
            labels.push(moment(head.fecha).format("YYYY-MM-DD HH:mm"));
            continue;
          }
          if (data[index].headers[y] === "PUNTO DE CONDENSASIÓN (C) INST") {
            datachar.push(data[index].data[y]);
          }
        }
      }
      const res = this.puntoCondesacionInstantaneaChar(labels, datachar);
      return res;
    },
    uv_instantanea_data() {
      const data = this.$store.getters["agencia/agencia_page_get"];
      const labels = [];
      const datachar = [];
      for (let index = 0; index < data.length; index++) {
        const head = {};
        for (let y = 0; y < data[index].headers.length; y++) {
          if (y === 0) {
            head.fecha = data[index].data[y];
            labels.push(moment(head.fecha).format("YYYY-MM-DD HH:mm"));
            continue;
          }
          if (data[index].headers[y] === "ÍNDICE DE RADIACIÓN UV") {
            datachar.push(data[index].data[y]);
          }
        }
      }
      const res = this.uvInstantaneaChar(labels, datachar);
      return res;
    },
    resume() {
      const data = this.$store.getters["agencia/agencia_page_get"];
      try {
        return {
          temperatura_inst: _.head(data).data[1],
          temperatura_max: _.last(data).data[2],
          temperatura_min: _.last(data).data[3],
          humedad_inst: _.last(data).data[4],
          humedad_max: _.last(data).data[5],
          humedad_min: _.last(data).data[6],
          indice_radiacion_uv: _.last(data).data[19],
          presion_atm: _.last(data).data[10],
          minimo_pdc: _.last(data).data[9],
          maximo_pdc: _.last(data).data[8],
          // velocidad_viento: _.last(data).data[9],
          // direccion_viento: _.last(data).data[10],
        };
      } catch (error) {
        return {
          temperatura_inst: "",
          temperatura_max: "",
          temperatura_min: "",
          humedad_inst: "",
          humedad_max: "",
          humedad_min: "",
          indice_radiacion_uv: "",
          presion_atm: "",
          minimo_pdc: "",
          maximo_pdc: "",
        };
      }
    },
    data() {
      const data = this.$store.getters["agencia/agencia_page_get"];
      const parse = [];
      const labels = [];
      // const datachar = [];
      for (let index = 0; index < data.length; index++) {
        const head = {};
        for (let y = 0; y < data[index].headers.length; y++) {
          if (y === 0) {
            head.fecha = data[index].data[y];
            labels.push(head.fecha);
            continue;
          }
          head[data[index].headers[y]] = data[index].data[y];
        }
        parse.push(head);
      }
      return parse;
    },
    headers() {
      const data = this.$store.getters["agencia/agencia_page_get"];
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
    humedad_relativa_aire_data() {
      const data = this.$store.getters["agencia/agencia_page_get"];
      const labels = [];
      const datacharinst = [];
      const datacharmax = [];
      const datacharmin = [];
      for (let index = 0; index < data.length; index++) {
        const head = {};
        for (let y = 0; y < data[index].headers.length; y++) {
          if (y === 0) {
            head.fecha = data[index].data[y];
            labels.push(moment(head.fecha).format("YYYY-DD-MM HH:mm"));
            continue;
          }
          if (data[index].headers[y] === "HUMEDAD (%) INST") {
            datacharinst.push(data[index].data[y]);
          }
          if (data[index].headers[y] === "HUMEDAD (%) MAX") {
            datacharmax.push(data[index].data[y]);
          }
          if (data[index].headers[y] === "HUMEDAD (%) MIN") {
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
    format_date_initial() {
      const m = moment();
      const roundDown = m.startOf("hour");
      return `${this.initial_date} ${roundDown.format("HH:mm:ss")}`;
    },
    format_date_end() {
      const m = moment();
      const roundUp =
        m.minute() || m.second() || m.millisecond()
          ? m.add(1, "hour").startOf("hour")
          : m.startOf("hour");
      return `${this.end_date} ${roundUp.format("HH:mm:ss")}`;
    },
    temperatura_data() {
      const data = this.$store.getters["agencia/agencia_page_get"];
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
          if (data[index].headers[y] === "Índice Temperatura-Humedad-Viento") {
            datachar.push(data[index].data[y]);
          }
        }
      }
      const res = this.temperaturaChar(labels, datachar);
      return res;
    },
  },
  data() {
    return {
      menu_initial_date: false,
      menu_end_date: false,
      agencia: {},
      table_loading: false,
      initial_date: moment().subtract(1, "d").format("YYYY-MM-DD"),
      end_date: moment().format("YYYY-MM-DD"),
      temperatura_instantanea_options: {
        responsive: true,
        title: {
          display: false,
          text: "Temperatura instantánea",
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
                labelString: "Temperatura instantánea",
              },
            },
          ],
        },
      },
      humedad_instantanea_options: {
        responsive: true,
        title: {
          display: false,
          text: "Humedad instantánea",
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
                labelString: "Humedad instantánea",
              },
            },
          ],
        },
      },
      punto_condensacion_options: {
        responsive: true,
        title: {
          display: false,
          text: "Punto de condensación instantánea",
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
                labelString: "Punto de condensación instantánea",
              },
            },
          ],
        },
      },
      uv_instantanea_options: {
        responsive: true,
        title: {
          display: false,
          text: "Índice de radiación UV instantanea",
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
                labelString: "Índice de radiación UV instantanea",
              },
            },
          ],
        },
      },
      // headers: [
      //   {
      //     text: "HORA",
      //     value: "HORA",
      //   },
      //   {
      //     text: "TEMPERATURA ",
      //     value: "TEMPERATURA ",
      //   },
      //   {
      //     text: "HUMEDAD",
      //     value: "HUMEDAD",
      //   },
      //   {
      //     text: "PUNTO DE CONDENSACIÓN",
      //     value: "PUNTO DE CONDENSACIÓN",
      //   },
      //   {
      //     text: "PRESIÓN ATMOSFERICA",
      //     value: "PRESIÓN ATMOSFERICA",
      //   },
      //   {
      //     text: "SENSACION TERMICA DEL VIENTO",
      //     value: "SENSACION TERMICA DEL VIENTO",
      //   },
      //   {
      //     text: "INDICE TEMPERATURA HUMEDAD-VIENTO",
      //     value: "INDICE TEMPERATURA HUMEDAD-VIENTO",
      //   },
      //   {
      //     text: "INDICE DE CALOR",
      //     value: "INDICE DE CALOR",
      //   },
      //   {
      //     text: "INDICE DE RADIACIÓN UV",
      //     value: "INDICE DE RADIACIÓN UV",
      //   },
      //   {
      //     text: "RADIACION SOLAR",
      //     value: "RADIACION SOLAR",
      //   },
      // ],
      // data
    };
  },
};
</script>