const moment = require('moment-timezone');
const Excel = require('exceljs');
const tmp = require('tmp');
moment().tz("America/Guayaquil").format();

const sleep = (time = 3000) => {
    return new Promise((resolve, reject)=> {
        setTimeout(() => resolve(true), time);
    })
}

module.exports = (api) => {
    api.post("/page", async (req, res) => {
        const current = moment();
        const init = current.clone().subtract(1, "d");
        const { body } = req
        const { cached = true, clean_cache = false, enable_cache = true, download = false, init_date = init, end_date = current, type = 'METEOROLOGICA', id_esta = 63813 } = body
        const isCached = await req.DB.Redis.GetCacheInamhi(body);
        console.log(isCached)
        if (isCached && enable_cache) {
            return res.json({ status: 'OK', data: JSON.parse(isCached) })
        }
        // await sleep();
        const data = await req.DB.Mongo.Inamhi.find({ type, id_esta, fecha: {
            $gte: init_date,
            $lt: end_date
        }}).sort( { fecha: -1 } );
        console.log(data)
        if(enable_cache) {
            await req.DB.Redis.SetCacheInamhi(body, data);
        }
        if (clean_cache) {
            await req.DB.Redis.Clean();
        }

        if (download) {
            const fileTmp = tmp.fileSync();
            const workbook = new Excel.Workbook();
            const options = {};
            await workbook.csv.writeFile(fileTmp.name, options);
        }
        return res.json({ status: 'OK', data })
    })
    return api;
};
