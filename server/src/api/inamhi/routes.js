module.exports = (api) => {
    api.get("/page", async (req, resp) => {
        const data = await req.DB.Mongo.Inamhi.find();
        return resp.json({ status: 'OK', data })
    })
    return api;
};
