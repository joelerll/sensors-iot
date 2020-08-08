const DB = require("./index")

const init = async () => {
  await DB.Mysql.authenticate();
};

init();
