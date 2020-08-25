const express = require("express");
const http = require("http");
const app = express();

const server = http.createServer(app);

app.set("port", 8000);

app.get("/", (req, res) => {
    console.log("==")
    res.send("OK")
})

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const port = process.env.PORT;
  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
  switch (error.code) {
    case "EACCES":
      console.info(`${bind} don't valid port`);
      process.exit(1);
    case "EADDRINUSE":
      console.info(`${bind} el puerto ya esta en uso client`);
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `Pipe ${addr}` : `Port ${addr.port}`;
  if (process.env.NODE_ENV !== "testing") {
    console.info(`Server running on: ${bind}`);
  }
}

const init = async () => {
  server.on("error", onError);
  server.on("listening", onListening);
  server.listen(app.get("port"));
};

init();
