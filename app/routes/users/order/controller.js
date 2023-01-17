const { Users, Orders } = require("../../../models/");

exports.makeOrder = async (req, res, next) => {
  try {
    const { book_title, author, publisher } = req.body;
    const { user_id, email, username } = req.session.user_data || req.session;

    const checkUser = await Users.findById(user_id);
    if (!checkUser) {
      res.status(404).json({ msg: "User not found !" });
    }
    // const result = await Users.findByIdAndUpdate(user_id, {
    //   email,
    //   username,
    //   password: checkUser.password,
    //   order_books: {
    //     book_title,
    //     author,
    //     publisher,
    //   },
    // });

    const result = new Orders({
      email,
      username,
      order_books: {
        book_title,
        author,
        publisher,
      },
    });
    if (!result) {
      res.sendStatus(500);
    }
    res.status(201).json({ msg: "order created !" });
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
