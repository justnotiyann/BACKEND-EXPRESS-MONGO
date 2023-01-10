const Users = require("../../models/Users");
const bcrypt = require("bcryptjs");

// CREATE READ UPDATE DELETE FIND_ID

// READ
exports.getAllUsers = async (req, res, next) => {
  try {
    const result = await Users.find({});

    if (!result) {
      res.sendStatus(500);
    }

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
      const hashPass = await bcrypt.hash(password, 12);
      const result = new Users({ email, username, password: hashPass }).save();

      if (!result) {
        res.sendStatus(500);
      }

      res.send(201).json({ msg: "Created !" });
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
      }
    }
  } catch (e) {
    next(e);
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
