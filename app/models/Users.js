const mongoose = require("mongoose");
const { Schema } = mongoose;
const { BookSchema } = require("./Books");

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
    favorite_books: BookSchema,
  },
  { timestamps: true }
);

const Users = mongoose.model("user", UserSchema);

module.exports = Users;
