module.exports = (api) => {
    api.post("/page", async (req, res) => {
        const { init_date, end_date, name = 'GUAYAQUIL (FACULTAD CCNN)', type = 'METEOROLOGICA', id_esta = 63813 } = req.body
        const data = await req.DB.Mongo.Inamhi.find({ type, id_esta }).sort( { fecha: -1 } );
        return res.json({ status: 'OK', data })
    })
    return api;
};
