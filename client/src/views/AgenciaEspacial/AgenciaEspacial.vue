<template>
  <div name="AgenciaEspacial">
    <v-container fluid>
      <v-data-table :headers="headers" :items="data" :items-per-page="8" class="elevation-1"></v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "AgenciaEspacial",
  data() {
    return {
      headers: [
        {
          text: "Temperatura máxima",
          value: "Temperatura máxima",
        },
        {
          text: "Temperatura mínima",
          value: "Temperatura mínima",
        },
        {
          text: "Humedad máxima",
          value: "Humedad máxima",
        },
        {
          text: "Humedad mínima",
          value: "Humedad mínima",
        },
        {
          text: "Máximo PDC",
          value: "Máximo PDC",
        },
        {
          text: "Mínimo PDC",
          value: "Mínimo PDC",
        },
        {
          text: "Máxima Barómetro",
          value: "Máxima Barómetro",
        },
        {
          text: "Mínimo Barómetro",
          value: "Mínimo Barómetro",
        },
        {
          text: "Máxima tasa de lluvia",
          value: "Máxima tasa de lluvia",
        },
        {
          text: "Minima STV",
          value: "Minima STV",
        },
        {
          text: "Minima STV",
          value: "Minima STV",
        },
        {
          text: "Minima STV",
          value: "Minima STV",
        },
        {
          text: "Minima STV",
          value: "Minima STV",
        },
      ],
      // headers: [
      //   {
      //     text: "Temperatura",
      //     value: "Temperatura",
      //   },
      //   {
      //     text: "Humedad",
      //     value: "Humedad",
      //   },
      //   {
      //     text: "Punto de condensación(PDC)",
      //     value: "Punto de condensación(PDC)",
      //   },
      //   {
      //     text: "Viento",
      //     value: "Viento",
      //   },
      //   {
      //     text: "Presión Atmosférica",
      //     value: "Presión Atmosférica",
      //   },
      //   {
      //     text: "Lluvia de hoy",
      //     value: "Lluvia de hoy",
      //   },
      //   {
      //     text: "Lluvia de hoy",
      //     value: "Lluvia de hoy",
      //   },
      //   {
      //     text: "Total Tormenta",
      //     value: "Total Tormenta",
      //   },
      //   {
      //     text: "Lluvia Mensual",
      //     value: "Lluvia Mensual",
      //   },
      //   {
      //     text: "Lluvia Anual",
      //     value: "Lluvia Anual",
      //   },
      //   {
      //     text: "Sensación térmica del viento (STV)",
      //     value: "Sensación térmica del viento (STV)",
      //   },
      //   {
      //     text: "Índice Temperatura-humedad-Viento (THV)",
      //     value: "Índice Temperatura-Humedad-Viento (THV)",
      //   },
      //   {
      //     text: "Índice de Calor",
      //     value: "Índice de Calor",
      //   },
      //   {
      //     text: "Índice de radiación UV",
      //     value: "Radiación Solar",
      //   },
      // ],
      data: [],
    };
  },
};
</script>