const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const Users = require("../../../models/Users");

exports.index = async (req, res, next) => {
  try {
    const result = await Users.find({}).select(" -__v -password");
    if (!result) {
      res.sendStatus(500);
    }
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Users.findByIdAndDelete(id);
    if (!result) {
      res.status(404).json({ msg: "user not found !" });
    }
    res.status(200).json({
      msg: `user with username : ${result.username} has sucessfully deleted`,
    });
  } catch (e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { email, username, password } = req.body;
    const options = { new: true };

    const checkUser = await Users.findById(id);
    if (!checkUser) {
      res.status(404).json({ msg: "user not found" });
    }

    const hashPass = await bcrypt.hash(password, 12);
    if (!hashPass) {
      res.sendStatus(500);
    }

    const result = await Users.findByIdAndUpdate(
      id,
      {
        email: email ? email : checkUser.email,
        username: username ? username : checkUser.username,
        password: password ? hashPass : checkUser.password,
      },
      options
    );

    if (!result) {
      res.sendStatus(500);
    }

    res.status(200).json({ msg: "updated" });
  } catch (e) {
    next(e);
  }
};

exports.show = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Users.findById(id).select("-password");

    if (!result) {
      res.status(404).json({ msg: "user not found !" });
    }

    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

exports.getAllOrders = async (req, res, next) => {
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
