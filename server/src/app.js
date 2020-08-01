const express = require("express");
const http = require("http");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const api = require("./api");

const app = express();
app.use(cors());
app.use(morgan("tiny"));

const server = http.createServer(app);

const DB = require("./db");

app.all("/**", (req, res, next) => {
  req.DB = DB;
  next();
});

app.use("/api", api);

app.use("/", express.static(path.resolve(__dirname, "dist")));

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
  DB,
};
