var mongoose = require("mongoose");

exports.connect = async () => {
  mongoose
    .connect(process.env.MONGO_URI_LOCALHOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connected to database"))
    .catch((e) => console.log("terjadi kesalahan"));
};
