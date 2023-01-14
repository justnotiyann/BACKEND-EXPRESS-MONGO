const { Books } = require("../../../models/Books");

exports.index = async (req, res, next) => {
  try {
    const result = await Books.find({});
    if (!result) {
      res.sendStatus(500);
    }
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

exports.store = async (req, res, next) => {
  try {
    const { book_title, author, publisher } = req.body;
    if (!book_title || !author || !publisher) {
      res.status(400).json({ msg: "Please fill all datas !" });
    }
    const result = new Books(req.body).save();
    if (!result) {
      res.sendStatus(500);
    }
    res.status(200).json({ msg: "created !" });
  } catch (e) {
    next(e);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Books.findByIdAndDelete(id);
    if (!result) {
      res.status(400).json({ msg: "book id not found" });
    }
    res.status(200).json({ msg: "deleted !" });
  } catch (e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { book_title, author, publisher } = req.body;

    const checkBook = await Books.findById(id);
    if (!checkBook) {
      res.status(400).json({ msg: "book not found !" });
    }

    const result = await Books.findByIdAndUpdate(id, {
      book_title: book_title ? book_title : checkBook.book_title,
      author: author ? author : checkBook.author,
      publisher: publisher ? publisher : checkBook.publisher,
    });

    if (!result) {
      res.sendStatus(500);
    }
    res.status(200).json({ msg: "updated !" });
  } catch (e) {
    next(e);
  }
};

exports.show = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await Books.findById(id);
    if (!result) {
      res.status(400).json({ msg: "book not found" });
    }

    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};
