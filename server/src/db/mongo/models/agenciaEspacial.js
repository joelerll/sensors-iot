const AgenciaEspecialHeaders = [
    "Fecha",
    "Temperatura",
    "Humedad",
    "Punto de condensación",
    "Viento",
    "Presión Atmosférica",
    "Lluvia",
    "Tasa de lluvia",
    "Total Tormenta",
    "Lluvia Mensual",
    "Lluvia Anual",
    "Sensación térmica del viento",
    "Índice Temperatura-Humedad-Viento",
    "Índice de Calor",
    "Índice de radiación UV",
    "Radiación Solar"
]

const AgenciaEspecialHeadersExtra = [
    "Fecha",
    "Temperatura máxima",
    "Temperatura mínima",
    "Humedad máxima",
    "Humedad mínima",
    "Máximo PDC",
    "Mínimo PDC",
    "Máxima Barómetro",
    "Mínimo Barómetro",
    "Máxima tasa de lluvia",
    "Minima STV",
    "Máximo índice de calor",
    "Máxima UV",
    "Máxima radiación solar"
]

const _ = require("lodash")
const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const AgenciaEspacialSchema = Schema(
    {
        headers: { type: Array, default: AgenciaEspecialHeaders },
        headers_extra: {  type: Array, default: AgenciaEspecialHeadersExtra },
        data: { type: Array, },
        data_extra: { type: Array },
        fecha: { type: Date },
    },
    { timestamps: true, versionKey: false, collection: "agencia-espacial" }
);

AgenciaEspacialSchema.statics = {
    findRow({ fecha }) {
        const self = this
        return new Promise(function(resolve) {
          resolve(self.findOne({ fecha }))
        })
    },
}

AgenciaEspacialSchema.methods = {
    create() {
        console.log('crate')
      return new Promise((resolve) => {
        resolve(this.save())
      })
    }
}  

module.exports = mongoose.model("AgenciaEspacial", AgenciaEspacialSchema);