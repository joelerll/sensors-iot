const cheerio = require('cheerio')
const fs = require('fs');
const path = require('path');
const _ = require("lodash")
const config = require("./config")
const axios = require("axios");

module.exports = {
    Inamhi: async (DB) => {
        for (const city of config.cities) {
            const table_headers = city.table
            const url = `${config.url}/${config.path}?esta__id=${city.id_esta}&estanomb=${city.name}&tipo=${city.type}`
            const { data } = await axios.get(url)
            const $ = cheerio.load(data);
            const tbody = $("#miyazaki > tbody")
            for (const row of tbody[0].childNodes) {
                let cont = 0
                const new_cell = {}
                new_cell.data = {}
                for (const cell of row.children) {
                    const cell_html = $(cell).html()
                    if (cont == 0) {
                        const exists = await DB.Mongo.Inamhi.findRow({
                            fecha: cell_html, 
                            id_esta: city.id_esta,
                            type: city.type
                        })
                        if (exists) {
                            break;
                        }
                        new_cell['id_esta'] = city.id_esta
                        new_cell['type'] = city.type
                        new_cell['name'] = city.name
                        new_cell['fecha'] = cell_html
                    }
                    new_cell['data'][table_headers[cont].id] = _.trim(cell_html)
                    cont++
                }
                new_cell.headers = table_headers
                if (!_.isEmpty(new_cell.data)) {
                    DB.Mongo.Inamhi.create(new_cell);
                }
            }
            console.log("==== finish load city: ", city)
        }
    }
}