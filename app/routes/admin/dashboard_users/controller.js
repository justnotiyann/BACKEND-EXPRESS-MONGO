const bcryptjs = require("bcryptjs");
const Users = require("../../../models/Users");

exports.index = async (req, res, next) => {
  try {
    const result = await Users.find({}).select("-_id -__v -password");

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
      res.sendStatus(500);
    }

    res.status(204).json({
      msg: `user with username : ${result.username} has sucessfully deleted`,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { email, username, password } = req.body;

    const checkUser = await Users.findById(id);

    if (!checkUser) {
      res.status(404).json({ msg: "user not found" });
    }

    const hashPass = await bcryptjs.hash(password, 12);
    const result = await Users.findByIdAndUpdate(
      id,
      { email, username, password: hashPass },
      { new: true }
    );

    if (!result) {
      res.sendStatus(500);
    }

    res.status(200).json({ msg: "updated !" });
  } catch (e) {
    console.log(e);
  }
};

exports.show = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Users.findById(id);

    if (!result) {
      res.status(404).json({ msg: "user not found !" });
    }

    res.status(200).json({ data: result });
  } catch (e) {
    console.log(e);
  }
};
