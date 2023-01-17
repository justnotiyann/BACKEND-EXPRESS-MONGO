const mongoose = require("mongoose");
const { Schema } = mongoose;

const ordersModel = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    email: {
      type: String,
    },
    username: {
      type: String,
    },
    order_books: {
      type: mongoose.Types.ObjectId,
      ref: "books",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", ordersModel);

module.exports = Order;
