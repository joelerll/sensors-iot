const bcrypt = require("bcrypt");
module.exports = {
  Login: async (req, res) => {
    const { username, password } = req.body;
    const user = await req.DB.Mysql.users.findOne({
      where: { username },
    });

    if (!user) {
      return res.status(303).json({ status: false, message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(303)
        .json({ status: false, message: "Password incorrect" });
    }

    req.session.user = user;

    res.json({ status: true, data: user });
  },
  Logout: (req, res) => {
    req.session = null;
    res.json({ status: true, message: "Logout Success" });
  },
};
