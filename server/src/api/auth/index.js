const express = require("express");

const api = express();

api.all("/**", (req, resp, next) => {
  next();
});

api.get("/ping", (req, res) => {
  res.send("pong login");
});

const routes = require("./routes")(api);

module.exports = routes;
