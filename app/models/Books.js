const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookSchema = new Schema({
  books_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  book_title: {
    type: String,
    trim: true,
  },
  author: {
    type: String,
    trim: true,
  },
  publisher: {
    type: String,
  },
});

mongoose.model("book", BookSchema);

module.exports = BookSchema;
