const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
    },
    password: String,
    order_books: {
      type: mongoose.Types.ObjectId,
      ref: "books",
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("user", UserSchema);

module.exports = Users;
