const Users = require("../../models/Users");

exports.getAllUsers = async (req, res, next) => {
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
