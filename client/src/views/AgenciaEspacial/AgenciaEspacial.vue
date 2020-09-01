<template>
  <div name="AgenciaEspacial"  style="margin: 15px;">
    <v-container fluid>
      <v-data-table :headers="headers" :items="data" :items-per-page="10" class="elevation-1">
        <template v-slot:item.fecha="{ item }">
          <v-chip dark>{{ item.fecha | moment("DD/MM, h a") }}</v-chip>
        </template>
      </v-data-table>
    </v-container>
    <v-container fluid>
        <v-row>
          <v-col cols="18" sm="6">
            <v-card class="rounded-lg" tile>
              <v-card-title>INDICE TEMPERATURA HUMEDAD-VIENTO</v-card-title>
              <line-chart :chartData="humedad_relativa_aire_data" title="HUMEDAD" xtitle="Fecha" ytitle="HUMEDAD" number="1"/>
            </v-card>
          </v-col>
          <v-col cols="18" sm="6"></v-col>
        </v-row>
      </v-container>
  </div>
</template>

<script>
import moment from "moment";
import _ from "lodash";
// import data from "./data.json"
import LineChart from "../../components/charts/LineChart";
export default {
  name: "AgenciaEspacial",
  components: {
    LineChart,
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData () {
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
  },
  computed: {
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
            labels.push(head.fecha);
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
    }
  },
  data() {
    return {
      agencia: {},
      table_loading: false,
      initial_date: moment().subtract(1, "d").format("YYYY-MM-DD"),
      end_date: moment().format("YYYY-MM-DD"),
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