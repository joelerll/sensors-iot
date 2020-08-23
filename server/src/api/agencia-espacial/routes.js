const moment = require('moment-timezone');
const tmp = require('tmp');
const _ = require("lodash")
moment().tz("America/Guayaquil").format();

const sleep = (time = 3000) => {
    return new Promise((resolve, reject)=> {
        setTimeout(() => resolve(true), time);
    })
}

const headers = {
    AgenciaEspecialHeaders: [
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
    ],
    AgenciaEspecialHeadersExtra: [
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
}


const order = [
    {
        type: "AgenciaEspecialHeaders",
        name: "Temperatura",
        value: "TEMPERATURA (C) INST"
    },
    {
        type: "AgenciaEspecialHeadersExtra",
        name: "Temperatura máxima",
        value: "TEMPERATURA (C) MAX"
    },
    {
        type: "AgenciaEspecialHeadersExtra",
        name: "Temperatura mínima",
        value: "TEMPERATURA (C) MIN"
    },
    {
        type: "AgenciaEspecialHeaders",
        name: "Humedad",
        value: "HUMEDAD (%) INST"
    },
    {
        type: "AgenciaEspecialHeadersExtra",
        name: "Humedad máxima",
        value: "HUMEDAD (%) MAX"
    },
    {
        type: "AgenciaEspecialHeadersExtra",
        name: "Humedad mínima",
        value: "HUMEDAD (%) MIN"
    },
    {
        type: "AgenciaEspecialHeaders",
        name: "Punto de condensación",
        value: "PUNTO DE CONDENSASIÓN (C) INST"
    },
    {
        type: "AgenciaEspecialHeadersExtra",
        name: "Máximo PDC",
        value: "PUNTO DE CONDENSASIÓN (C) MAX"
    },
    {
        type: "AgenciaEspecialHeadersExtra",
        name: "Mínimo PDC",
        value: "PUNTO DE CONDENSASIÓN (C) MIN"
    },
]

module.exports = (api) => {
    api.post("/page", async (req, res) => {
        const current = moment();
        const init = current.clone().subtract(1, "d");
        const { body } = req
        const { cached = true, clean_cache = false, download = false, init_date = init, end_date = current } = body
        // const isCached = await req.DB.Redis.GetCacheInamhi(body);
        // if (isCached) {
        //     return res.json({ status: 'OK', data: JSON.parse(isCached) })
        // }
        // // await sleep();
        const data = await req.DB.Mongo.AgenciaEspacial.find({}).sort( { fecha: -1 } );
        const dataClean = []
        for (const iterator of data) {
            let dataclean = {
                fecha: iterator.fecha,
                headers: [],
                data: [],
                _id: iterator._id
            }
            dataclean.headers.push('FECHA')
            dataclean.data.push(iterator.fecha)
            for (const list of order) {
                dataclean.headers.push(list.value)
                if (list.type === 'AgenciaEspecialHeaders') {
                    dataclean.data.push(iterator.data[_.indexOf(headers[list.type], list.name)])
                } else {
                    dataclean.data.push(iterator.data_extra[_.indexOf(headers[list.type], list.name)])
                } 
            }
            dataClean.push(dataclean)
        }
        // if(cached) {
        //     await req.DB.Redis.SetCacheInamhi(body, data);
        // }
        // if (clean_cache) {
        //     await req.DB.Redis.Clean();
        // }

        // if (download) {
        //     const fileTmp = tmp.fileSync();
        //     const workbook = new Excel.Workbook();
        //     const options = {};
        //     await workbook.csv.writeFile(fileTmp.name, options);
        // }
        return res.json({ status: 'OK', data: dataClean })
    })
    return api;
};
