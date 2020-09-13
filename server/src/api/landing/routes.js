module.exports = (api) => {
    api.post("/", async (req, res) => {
        const { body } = req
        await req.DB.Mongo.Landing.create(body);
        // const current = moment();
        // const init = current.clone().subtract(1, "d");
        // const { body } = req
        // const { cached = true, clean_cache = false, enable_cache = true, download = false, init_date = init, end_date = current, type = 'METEOROLOGICA', id_esta = 63813 } = body
        // const isCached = await req.DB.Redis.GetCacheInamhi(body);
        // console.log(isCached)
        // if (isCached && enable_cache) {
        //     return res.json({ status: 'OK', data: JSON.parse(isCached) })
        // }
        // // await sleep();
        // const data = await req.DB.Mongo.Inamhi.find({ type, id_esta, fecha: {
        //     $gte: init_date,
        //     $lt: end_date
        // }}).sort( { fecha: -1 } );
        // console.log(data)
        // if(enable_cache) {
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
        return res.json({ status: 'OK' })
    })
    api.get("/", async (req, res) => {
        const data = await req.DB.Mongo.Landing.findRow()
        return res.json({ status: 'OK', data })
    })
    return api;
};
