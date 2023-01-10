const CustomApiError = require("./custom-api-errors");
const { StatusCodes } = require("http-status-codes");

class Unauthorized extends CustomApiError {
  constructor(m) {
    super(m);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = Unauthorized;
