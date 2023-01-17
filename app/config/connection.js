var mongoose = require("mongoose");
const { MONGO_URI } = process.env;

exports.connect = async () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connected to database"))
    .catch((e) => console.log("terjadi kesalahan"));
};
