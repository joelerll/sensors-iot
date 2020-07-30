const assert = require("assert");
const session = require("supertest-session");

const { DB, app } = require("../../app");

describe("Auth", function () {
  before(async () => {
    await DB.Mysql.authenticate();
    request = session(app);
  });

  after(async () => {
    await DB.Mysql.close();
  });

  describe("Login", () => {
    it("Login Success", async () => {
      const { body } = await request.post("/api/auth/login").send({
        username: "admin_admin",
        password: "s0/P4$$w0rD",
      });
      console.log(body);
    });

    it("Login Fail", async () => {
      const { body } = await request.post("/api/auth/login").send({
        username: "admin_admin",
        password: "s0/P4$$w0r",
      });
    });
  });

  describe("Logout", () => {
    it("Logout Success", async () => {
      const { body } = await request.post("/api/auth/logout");
      console.log(body);
    });
  });
});
