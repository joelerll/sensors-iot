const cheerio = require('cheerio')
const fs = require('fs');
const path = require('path');
const _ = require("lodash")
const config = require("./config")
const axios = require("axios");

module.exports = {
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
                const tbody = $("#miyazaki > tbody")
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