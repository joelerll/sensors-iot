const mongoose = require("mongoose");
const _ = require("lodash");
const { DATABASE, ENV } = require("../../constants");

const Inamhi = require("./models/inamhi");

const build = (config) => {
  if (config.url) {
    return config.url;
  }
  if (config.port) {
    return `mongodb://${config.host}/${config.database}`;
  }
  return `mongodb://${config.host}:${config.port}/${config.database}`;
};

class Mongo {
  constructor(config = {}) {
    this.config = _.defaultsDeep(
      {
        database: DATABASE[ENV],
      },
      config
    );
    this.Inamhi = Inamhi;
  }

  connect() {
    return new Promise((resolve, reject) => {
      mongoose.connect(build(this.config.database), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      const db = mongoose.connection;

      db.on("error", () => {
        return reject(new Error("Connection error"));
      });

      db.once("open", () => {
        console.info("MongoDB connected!!!");
        resolve(db);
      });

      db.on("disconnected", function () {
        return reject(new Error("Disconnect Database"));
      });
    });
  }

  close() {
    mongoose.connection.close()
  }
 
}

module.exports = Mongo;
