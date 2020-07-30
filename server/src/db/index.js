const Mongo = require("./mongo");
const Redis = require("./redis");
const Mysql = require("./mysql");
module.exports = {
  Mongo: new Mongo(),
  Redis,
  Mysql,
};
