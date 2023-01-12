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

// exports.create = async (req, res, next) => {
//   // try {
//   //   const { book_title, author, publisher } = req.body;
//   //   const users = req.session.
//   // } catch (e) {
//   //   next(e);
//   // }
// };
