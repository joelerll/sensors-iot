const assert = require("assert");
const session = require("supertest-session");
const axios = require("axios");
const cheerio = require('cheerio')
const fs = require('fs');
const path = require('path');
const { DB } = require("../app");
const config = require("./config")
const _ = require("lodash")

const Jobs = require("./index")

describe("Auth", function () {
  before(async () => {
    await DB.Mongo.connect();
    // request = session(app);
  });

  after(async () => {
    await DB.Mongo.close();
  });

  describe("Login", () => {
    it("Login Success", async () => {
      await Jobs.Inamhi(DB)
        // const config = {
        //     url: "http://186.42.174.236",
        //     path: "InamhiEmas/datos.php",
        //     id_esta: 63813,
        //     name: "GUAYAQUIL (FACULTAD CCNN)",
        //     type: "METEOROLOGICA"
        // }
        
    });
  });
});
