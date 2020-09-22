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

const init = async () => {
  await DB.Mongo.connect()
  await Jobs.Inamhi(DB)
  await Jobs.AgenciaEspacial(DB)
}

init()
