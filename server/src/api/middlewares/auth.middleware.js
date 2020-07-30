module.exports = {
  init: () => {},
  logout: () => {},
  is_authenticated: () => {},
  protect: (req, res, next) => {
    if (req.session) {
      return next();
    }
    req.status(401).json({ status: false, message: "Unauthorized" });
  },
};
