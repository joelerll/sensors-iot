const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cookieSession = require("cookie-session");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: ["username"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

const auth = require("./auth");
app.use("/auth", auth);

module.exports = app;
