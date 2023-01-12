const Users = require("../../../models/Users");
const bcrypt = require("bcryptjs");

exports.register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    if (email == "" || username == "" || password == "") {
      res.status(400).json({ msg: "please fill in all data" });
    } else {
      const checkUsername = await Users.findOne({ username });
      if (checkUsername) {
        res.status(400).json({ msg: "username already registered" });
      } else {
        const hashPass = await bcrypt.hash(password, 12);
        const result = new Users({
          email,
          username,
          password: hashPass,
        }).save();

        if (!result) {
          res.sendStatus(500);
        }

        res.send(201).json({ msg: "Created !" });
      }
    }
  } catch (e) {
    next(e);
  }
};

// LOGIN
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email == "" || password == "") {
      res.status(400).json({ msg: "please fill in all data" });
    }

    const checkEmail = await Users.findOne({ email });
    if (!checkEmail) {
      res.status(400).json({ msg: "invalid credentials" });
    } else {
      const compare = await bcrypt.compare(password, checkEmail.password);
      if (!compare) {
        res.status(400).json({ msg: "invalid credentials" });
      } else {
        let data = {
          user_id: checkEmail._id,
          username: checkEmail.username,
          user_email: checkEmail.email,
          isLogin: true,
        };

        req.session.user_data = data;

        res.status(200).json({ msg: "Logged", login: true });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

exports.checkSession = async (req, res, next) => {
  try {
    const result = req.session.user_data;

    if (!result) {
      res.status(404).json({ msg: "No Data" });
    }

    res.status(200).json({ data: result });
  } catch (e) {
    console.log(e);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    req.session.destroy();

    res.status(200).json({ msg: "Loggout", login: false });
  } catch (e) {
    console.log(e);
  }
};
