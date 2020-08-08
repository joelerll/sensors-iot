"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config/config.js")[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname + "/models")
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname + "/models", file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.authenticate = () => {
  try {
    console.info("MysqlDB connected!!!");
    return sequelize.authenticate();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

db.sync = async () => {
  await sequelize.sync({ force: true });
  console.log("The table for the User model was just (re)created!");
};

db.close = () => {
  return sequelize.close();
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
