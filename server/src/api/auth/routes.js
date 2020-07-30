const User = require("./controllers/user.controller");

module.exports = (api) => {
  api.post("/login", User.Login);
  api.post("/logout", User.Logout);
  return api;
};
