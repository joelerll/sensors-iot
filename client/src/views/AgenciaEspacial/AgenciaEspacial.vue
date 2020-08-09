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
          text: "Fecha",
          value: "Fecha",
        },
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
      data: [
        {
          Fecha: "2020/08/01 02:05:00",
          "Temperatura máxima": "30.9°C",
          "Temperatura mínima": "20.6°C",
          "Humedad máxima": "91%",
          "Humedad mínima": "69%",
          "Máximo PDC": "25.0°C",
          "Mínimo PDC": "18.9°C",
          "Máxima Barómetro": "1013.3 mb",
          "Mínimo Barómetro": "1009.0 mb",
          "Máxima tasa de lluvia": "0.0 mm/hr",
          "Minima STV": "20.6°C",
          "Máximo índice de calor": "37.2°C",
          "Máxima UV": "7.3 index",
          "Máxima radiación solar": "853 W/m²",
        },
        {
          Fecha: "2020/08/01 02:10:00",
          "Temperatura máxima": "32.9°C",
          "Temperatura mínima": "25.6°C",
          "Humedad máxima": "95%",
          "Humedad mínima": "60%",
          "Máximo PDC": "22.0°C",
          "Mínimo PDC": "19.9°C",
          "Máxima Barómetro": "1014.3 mb",
          "Mínimo Barómetro": "1011.0 mb",
          "Máxima tasa de lluvia": "0.0 mm/hr",
          "Minima STV": "23.6°C",
          "Máximo índice de calor": "39.2°C",
          "Máxima UV": "7.5 index",
          "Máxima radiación solar": "953 W/m²",
        },
        {
          Fecha: "2020/08/01 02:15:00",
          "Temperatura máxima": "33.9°C",
          "Temperatura mínima": "22.6°C",
          "Humedad máxima": "84%",
          "Humedad mínima": "65%",
          "Máximo PDC": "23.0°C",
          "Mínimo PDC": "19.9°C",
          "Máxima Barómetro": "1013.5 mb",
          "Mínimo Barómetro": "1010.0 mb",
          "Máxima tasa de lluvia": "0.0 mm/hr",
          "Minima STV": "21.6°C",
          "Máximo índice de calor": "33.2°C",
          "Máxima UV": "7.3 index",
          "Máxima radiación solar": "859 W/m²",
        },
        {
          Fecha: "2020/08/01 02:05:00",
          "Temperatura máxima": "34.9°C",
          "Temperatura mínima": "25.6°C",
          "Humedad máxima": "96%",
          "Humedad mínima": "63%",
          "Máximo PDC": "23.4°C",
          "Mínimo PDC": "17.4°C",
          "Máxima Barómetro": "1012.3 mb",
          "Mínimo Barómetro": "1009.0 mb",
          "Máxima tasa de lluvia": "0.0 mm/hr",
          "Minima STV": "20.6°C",
          "Máximo índice de calor": "37.2°C",
          "Máxima UV": "7.3 index",
          "Máxima radiación solar": "853 W/m²",
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
    };
  },
};
</script>