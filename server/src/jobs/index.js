const cheerio = require('cheerio')
const fs = require('fs');
const path = require('path');
const _ = require("lodash")
const config = require("./config")
const axios = require("axios");
const moment = require("moment-timezone")
moment.tz("America/Guayaquil")

function hasNumber(myString) {
    return /\d/.test(myString);
}

module.exports = {
    AgenciaEspacial: async (DB) => {
        try {
            // const data = fs.readFileSync(path.join(__dirname, 'agencia.espacial.html'), 'utf8');
            const url = `${config.agencia.url}/${config.agencia.path}`
            const { data } = await axios.get(url)
            const $ = cheerio.load(data, { decodeEntities: false });
            const trs = $("table > tbody");
            let values = []
            let values_extra = []
            for (let tr of trs[0].children) {
                let $tr = $(tr)
                if (!$tr || !$tr.html()) {
                    continue;
                }
                let value = ""
                if ($tr.find('small')[1]) {
                    value = _.head($tr.find('small')[1].children).data
                    if (value && hasNumber(value)) {
                        values.push(value.replace(/[^\d.-]/g, ''))
                        continue;
                    }
                }
                
                if ($tr.find('font')[1] && $tr.find('font')[3]) {
                    value = _.head($tr.find('font')[3].children).data
                    if (value && hasNumber(value)) {
                        values.push(value.replace(/[^\d.-]/g, ''))
                    }
                }
                
                if ($tr.find('font[color="#ff4500"] > small > p')[0]) {
                    value = _.head($tr.find('font[color="#ff4500"] > small > p')[0].children)
                    if (value.data && hasNumber(value.data)) {
                        values_extra.push(value.data.replace(/[^\d.-]/g, ''))
                    }
                }

                if ($tr.find('font[color="#ff4500"] > small > p')[1]) {
                    value = _.head($tr.find('font[color="#ff4500"] > small > p')[1].children)
                    if (value.data && hasNumber(value.data)) {
                        values_extra.push(value.data.replace(/[^\d.-]/g, ''))
                    }
                }

                if ($tr.find('font[color="#ff4500"] > strong > small > p')[0]) {
                    value = _.head($tr.find('font[color="#ff4500"] > strong > small > p')[0].children)
                    if (value.data && hasNumber(value.data)) {
                        values_extra.push(value.data.replace(/[^\d.-]/g, ''))
                    }
                }

                if ($tr.find('font[color="#ff4500"] > strong > small > p')[1]) {
                    value = _.head($tr.find('font[color="#ff4500"] > strong > small > p')[1].children)
                    if (value.data && hasNumber(value.data)) {
                        values_extra.push(value.data.replace(/[^\d.-]/g, ''))
                    }
                }
            }
            const fecha = moment().format('YYYY-MM-DD hh:mm:ss')
            values = [fecha, ...values]
            values_extra = [fecha, ...values_extra]
            const new_cell = {
                data: values,
                data_extra: values_extra,
                fecha
            }
            await DB.Mongo.AgenciaEspacial.create(new_cell);
            console.log("saving table : ", new_cell)
        } catch (error) {
            console.error(error)
        }
    },
    Inamhi: async (DB) => {
        try {
            for (const city of config.cities) {
                const url = `${config.url}/${config.path}?esta__id=${city.id_esta}&estanomb=${city.name}&tipo=${city.type}`
                const { data } = await axios.get(url)
                const $ = cheerio.load(data);
                const thead = $("#miyazaki > thead")
                const table_headers = []
                for (const row of thead[0].childNodes) {
                    for (const cell of row.children) {
                        const cell_html = $(cell).html()
                        table_headers.push(_.trim(cell_html.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g,' ')))
                    }
                }
                const [tbody] = $("#miyazaki > tbody")
                for (const row of tbody[0].childNodes) {
                    let cont = 0
                    const new_cell = {}
                    new_cell.data = []
                    let noData = false
                    let fecha = ""
                    for (const cell of row.children) {
                        const cell_html = $(cell).html()
                        if (cell_html.includes('No existen datos para esta estaci')) {
                            console.info("Migration no data for: ", city)
                            noData = true
                            break;
                        }
                        if (cont == 0) {
                            new_cell['id_esta'] = city.id_esta
                            new_cell['type'] = city.type
                            new_cell['name'] = city.name
                            new_cell['fecha'] = cell_html
                            fecha = new_cell['fecha']
                        }
                        new_cell['data'].push(_.trim(cell_html))
                        cont++
                    }
                    if (noData) {
                        break
                    }
                    new_cell.headers = table_headers
                    const findQuery = {
                        fecha, 
                        id_esta: city.id_esta,
                        type: city.type
                    }
                    const exists = await DB.Mongo.Inamhi.findRow(findQuery)
                    if (exists) {
                        await DB.Mongo.Inamhi.updateOne(findQuery, { $set: { headers:  new_cell.headers, data: new_cell.data } });
                    } else {
                        await DB.Mongo.Inamhi.create(new_cell);
                    }
                }
                console.log("==== finish load city: ", city)  
            }
        } catch (error) {
            console.error("Migration Inamhi", error)
        }
    }
}