const assert = require("assert");
const session = require("supertest-session");

const { DB, app } = require("../../app");

describe("Auth", function () {
  before(async () => {
    await DB.Mysql.authenticate();
    await DB.Mongo.connect();
    // await DB.Redis.connect();
    request = session(app);
  });

  after(async () => {
    await DB.Mysql.close();
    await DB.Mongo.close();
  });

  describe("Inamhi GET ALL", () => {
    it("GET ALL", async () => {
      const { body } = await request.post("/api/inamhi/page").send({
        init_date: "2020-08-16 19:00:00.000-05:00",
        end_date: "2020-08-16 20:00:00.000-05:00",
        type: 'METEOROLOGICA',
        id_esta: 63813
      });
    //   console.log(body);
    });
  });
});
