const { StatusCodes } = require("http-status-codes");
const notFound = (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json({
    msg: "routes tidak ditemukan",
  });
};

module.exports = notFound;
