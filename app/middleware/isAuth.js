const isAuth = (req, res, next) => {
  if (!req.session) {
    res.status(401).json({ msg: "login first !" });
  }
  next();
};

module.exports = { isAuth };
