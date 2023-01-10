const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: String,
    password: String,
    username: {
      type: String,
      unique: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Users = mongoose.model("user", UserSchema);

module.exports = Users;
