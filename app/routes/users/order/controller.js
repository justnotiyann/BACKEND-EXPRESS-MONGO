const Users = require("../../../models/Users");

exports.makeOrder = async (req, res, next) => {
  try {
    const { book_title, author, publisher } = req.body;
    const UserSession = req.session.user_data;
    if (!UserSession) {
      res.status(401).json({ msg: "Please login first !" });
    }
    const { user_id, email, username } = UserSession;
    const checkUser = await Users.findById(user_id);
    if (!checkUser) {
      res.status(404).json({ msg: "User not found !" });
    }
    const result = await Users.findByIdAndUpdate(user_id, {
      email,
      username,
      password: checkUser.password,
      favorite_books: {
        book_title,
        author,
        publisher,
      },
    });
    if (!result) {
      res.sendStatus(500);
    }
    res.status(201).json({ msg: "created !" });
  } catch (e) {
    console.log(e);
  }
};
