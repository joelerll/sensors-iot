const express = require("express");
const http = require("http");
const morgan = require("morgan");
const cors = require("cors");
const path = require("cross-env");

const app = express();
app.use(cors());
app.use(morgan("tiny"));

const server = http.createServer(app);

const DB = require("./db");

// inject databases into request
app.all("/**", (req, res, next) => {
  req.DB = DB;
  next();
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use((req, res, next) => {
  res.status(404);
  res.send("NOT FOUND");
});

module.exports = {
  app,
  server,
};