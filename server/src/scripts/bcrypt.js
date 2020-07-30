const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0/P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

const init = () => {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
      console.log("===== hash: ", hash);
    });
  });
};

init();
