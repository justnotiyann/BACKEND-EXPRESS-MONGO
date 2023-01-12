const Users = require("../../../models/Users");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

// CREATE READ UPDATE DELETE FIND_ID

// READ
exports.getAllUsers = async (req, res, next) => {
  try {
    const result = await Users.find({}).select("-password");

    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

// CREATE
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

// UPDATE
exports.update = async (req, res, next) => {
  try {
    const { id, email, username, password } = req.body;
  } catch (e) {
    next(e);
  }
};

// DELETE

exports.delete = async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
};