// call all databases engines

const Mongo = require("./mongo");
const Redis = require("./redis");
const Mysql = require("./redis");

module.exports = {
  Mongo: new Mongo(),
  Redis,
  Mysql,
};
