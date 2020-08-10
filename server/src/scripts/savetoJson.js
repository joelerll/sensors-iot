const Excel = require("exceljs");
const path = require("path");
const _ = require("lodash")
const fs = require("fs")

const init = async () => {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(path.join(__dirname, "../../../data/observatorio.xlsx"));
    const worksheet = workbook.worksheets[0];
    let rows_zise = _.compact(worksheet.getColumn(1).values).length
    const rows = []
    
    const headers_ = []
    for (let index = 1; index <= rows_zise; index++) {
        let cont = 0
        let headers = {}
        for (const value of _.compact(worksheet.getRow(index).values)) {
            if (index === 1) {
                headers_.push(value)
                continue;
            }
            // console.log(value)
            headers[headers_[cont]] = value
            cont++;
        }
        rows.push(headers)
    }
    fs.writeFileSync("output.json", JSON.stringify(rows, null, 2), 'utf8')
}

init()