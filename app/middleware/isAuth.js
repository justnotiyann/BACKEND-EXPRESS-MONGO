const isAuth = (req, res, next) => {
  if (!req.session || !req.session.user_data) {
    res.status(401).json({ msg: "login first !" });
  }
  next();
};

module.exports = { isAuth };
