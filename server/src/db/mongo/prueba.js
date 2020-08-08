const Mongo = require("./index");
const cheerio = require('cheerio')
const fs = require('fs');
const path = require('path');

// const User = require("./models/user");

const init = async () => {
    const data = fs.readFileSync(path.join(__dirname, 'inamhi.dumb.html'), 'utf8')
    const $ = cheerio.load(data);
    $("#miyazaki").map(function (index, elem) {
        $(this).find('td').each(function(){
            const $data = $(this).html();
            console.log($data)
        })
    });
    // const DB = new Mongo();
    // await DB.connect();
    // const silence = new DB.Inamhi({ humedad_relativa_aire_inst: 50 });
    // silence.save()
    // console.log(silence);
};

init();